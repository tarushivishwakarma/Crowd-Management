"""
WebSocket Server for Real-time Updates
Handles real-time crowd monitoring, shuttle tracking, and emergency alerts
"""
import asyncio
import json
import logging
from typing import Dict, Set
from datetime import datetime
from fastapi import WebSocket, WebSocketDisconnect
import socketio

from ..config import settings
from ..database.mongodb_connection import (
    get_crowd_data_collection,
    get_shuttles_collection,
    get_emergencies_collection,
    get_alerts_collection
)

logger = logging.getLogger(__name__)

# Socket.IO server for WebSocket connections
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=settings.ALLOWED_ORIGINS,
    ping_timeout=60,
    ping_interval=25
)

# Connection manager for WebSocket clients
class ConnectionManager:
    def __init__(self):
        # Store active connections by temple and type
        self.active_connections: Dict[str, Set[WebSocket]] = {
            "crowd": set(),
            "transport": set(),
            "emergency": set(),
            "alerts": set()
        }
        # Temple-specific subscriptions
        self.temple_subscriptions: Dict[str, Dict[str, Set[WebSocket]]] = {
            temple_id: {
                "crowd": set(),
                "transport": set(),
                "emergency": set(),
                "alerts": set()
            }
            for temple_id in settings.TEMPLES.keys()
        }
    
    async def connect(self, websocket: WebSocket, channel: str, temple_id: str = None):
        """Connect a client to a channel"""
        await websocket.accept()
        
        if channel in self.active_connections:
            self.active_connections[channel].add(websocket)
        
        if temple_id and temple_id in self.temple_subscriptions:
            if channel in self.temple_subscriptions[temple_id]:
                self.temple_subscriptions[temple_id][channel].add(websocket)
        
        logger.info(f"Client connected to {channel}" + (f" for temple {temple_id}" if temple_id else ""))
    
    def disconnect(self, websocket: WebSocket):
        """Disconnect a client from all channels"""
        for channel_connections in self.active_connections.values():
            channel_connections.discard(websocket)
        
        for temple_data in self.temple_subscriptions.values():
            for channel_connections in temple_data.values():
                channel_connections.discard(websocket)
        
        logger.info("Client disconnected")
    
    async def broadcast(self, message: dict, channel: str):
        """Broadcast message to all clients in a channel"""
        if channel not in self.active_connections:
            return
        
        disconnected = set()
        for connection in self.active_connections[channel]:
            try:
                await connection.send_json(message)
            except Exception as e:
                logger.error(f"Error broadcasting to client: {e}")
                disconnected.add(connection)
        
        # Remove disconnected clients
        for connection in disconnected:
            self.disconnect(connection)
    
    async def broadcast_to_temple(self, message: dict, channel: str, temple_id: str):
        """Broadcast message to clients subscribed to a specific temple"""
        if temple_id not in self.temple_subscriptions:
            return
        
        if channel not in self.temple_subscriptions[temple_id]:
            return
        
        disconnected = set()
        for connection in self.temple_subscriptions[temple_id][channel]:
            try:
                await connection.send_json(message)
            except Exception as e:
                logger.error(f"Error broadcasting to client: {e}")
                disconnected.add(connection)
        
        # Remove disconnected clients
        for connection in disconnected:
            self.disconnect(connection)

# Global connection manager instance
manager = ConnectionManager()

# Socket.IO event handlers
@sio.event
async def connect(sid, environ):
    """Handle Socket.IO client connection"""
    logger.info(f"Socket.IO client connected: {sid}")

@sio.event
async def disconnect(sid):
    """Handle Socket.IO client disconnection"""
    logger.info(f"Socket.IO client disconnected: {sid}")

@sio.event
async def subscribe(sid, data):
    """Subscribe to specific channels"""
    channel = data.get('channel')
    temple_id = data.get('temple_id')
    
    await sio.enter_room(sid, channel)
    if temple_id:
        await sio.enter_room(sid, f"{channel}:{temple_id}")
    
    logger.info(f"Client {sid} subscribed to {channel}" + (f" for temple {temple_id}" if temple_id else ""))
    
    await sio.emit('subscription_confirmed', {
        'channel': channel,
        'temple_id': temple_id
    }, room=sid)

@sio.event
async def unsubscribe(sid, data):
    """Unsubscribe from specific channels"""
    channel = data.get('channel')
    temple_id = data.get('temple_id')
    
    await sio.leave_room(sid, channel)
    if temple_id:
        await sio.leave_room(sid, f"{channel}:{temple_id}")
    
    logger.info(f"Client {sid} unsubscribed from {channel}")

# Background tasks for real-time updates
async def broadcast_crowd_updates():
    """Broadcast crowd density updates every 5 seconds"""
    crowd_collection = await get_crowd_data_collection()
    
    while True:
        try:
            # Get latest crowd data for all temples
            for temple_id in settings.TEMPLES.keys():
                crowd_data = await crowd_collection.find_one(
                    {"temple_id": temple_id},
                    sort=[("timestamp", -1)]
                )
                
                if crowd_data:
                    message = {
                        "type": "crowd_update",
                        "temple_id": temple_id,
                        "data": {
                            "temple_name": crowd_data.get("temple_name"),
                            "zones": crowd_data.get("zones", []),
                            "total_crowd": crowd_data.get("total_crowd", 0),
                            "timestamp": crowd_data.get("timestamp").isoformat()
                        }
                    }
                    
                    # Broadcast via Socket.IO
                    await sio.emit('crowd_update', message, room=f"crowd:{temple_id}")
                    await sio.emit('crowd_update', message, room="crowd")
            
            await asyncio.sleep(settings.CROWD_UPDATE_INTERVAL)
            
        except Exception as e:
            logger.error(f"Error broadcasting crowd updates: {e}")
            await asyncio.sleep(settings.CROWD_UPDATE_INTERVAL)

async def broadcast_shuttle_updates():
    """Broadcast shuttle location updates every 10 seconds"""
    shuttle_collection = await get_shuttles_collection()
    
    while True:
        try:
            # Get all active shuttles
            shuttles = await shuttle_collection.find({"status": "active"}).to_list(None)
            
            for shuttle in shuttles:
                # Assuming temple_id is associated with shuttle route
                temple_id = shuttle.get("temple_id")
                
                message = {
                    "type": "shuttle_update",
                    "temple_id": temple_id,
                    "data": {
                        "shuttle_id": shuttle.get("shuttle_id"),
                        "shuttle_number": shuttle.get("shuttle_number"),
                        "route_name": shuttle.get("route_name"),
                        "current_location": shuttle.get("current_location"),
                        "next_stop": shuttle.get("next_stop"),
                        "eta_minutes": shuttle.get("eta_minutes"),
                        "current_passengers": shuttle.get("current_passengers"),
                        "capacity": shuttle.get("capacity")
                    }
                }
                
                # Broadcast via Socket.IO
                if temple_id:
                    await sio.emit('shuttle_update', message, room=f"transport:{temple_id}")
                await sio.emit('shuttle_update', message, room="transport")
            
            await asyncio.sleep(settings.SHUTTLE_UPDATE_INTERVAL)
            
        except Exception as e:
            logger.error(f"Error broadcasting shuttle updates: {e}")
            await asyncio.sleep(settings.SHUTTLE_UPDATE_INTERVAL)

async def broadcast_emergency_alerts():
    """Broadcast new emergency alerts immediately"""
    # This would be triggered by emergency creation events
    # Implementation depends on event-driven architecture
    pass

async def broadcast_system_alerts():
    """Broadcast system alerts to relevant users"""
    alerts_collection = await get_alerts_collection()
    
    while True:
        try:
            # Get active alerts
            alerts = await alerts_collection.find({"active": True}).to_list(None)
            
            for alert in alerts:
                temple_id = alert.get("temple_id")
                
                message = {
                    "type": "alert",
                    "temple_id": temple_id,
                    "data": {
                        "alert_id": alert.get("alert_id"),
                        "title": alert.get("title"),
                        "message": alert.get("message"),
                        "severity": alert.get("severity"),
                        "created_at": alert.get("created_at").isoformat()
                    }
                }
                
                # Broadcast via Socket.IO
                await sio.emit('alert', message, room=f"alerts:{temple_id}")
                await sio.emit('alert', message, room="alerts")
            
            await asyncio.sleep(30)  # Check every 30 seconds
            
        except Exception as e:
            logger.error(f"Error broadcasting alerts: {e}")
            await asyncio.sleep(30)

# Initialize background tasks
async def start_background_tasks():
    """Start all background tasks"""
    tasks = [
        asyncio.create_task(broadcast_crowd_updates()),
        asyncio.create_task(broadcast_shuttle_updates()),
        asyncio.create_task(broadcast_system_alerts())
    ]
    logger.info("WebSocket background tasks started")
    return tasks

# FastAPI WebSocket endpoints
async def websocket_endpoint(websocket: WebSocket, channel: str, temple_id: str = None):
    """Generic WebSocket endpoint"""
    await manager.connect(websocket, channel, temple_id)
    
    try:
        while True:
            # Keep connection alive and handle incoming messages
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Handle different message types
            if message.get("type") == "ping":
                await websocket.send_json({"type": "pong"})
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        logger.info(f"WebSocket disconnected from {channel}")
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        manager.disconnect(websocket)

# Helper functions to trigger events
async def notify_emergency(emergency_data: dict):
    """Notify all connected clients about a new emergency"""
    temple_id = emergency_data.get("temple_id")
    
    message = {
        "type": "emergency",
        "temple_id": temple_id,
        "data": emergency_data
    }
    
    await sio.emit('emergency', message, room=f"emergency:{temple_id}")
    await sio.emit('emergency', message, room="emergency")
    
    logger.info(f"Emergency notification sent for temple {temple_id}")

async def notify_alert(alert_data: dict):
    """Notify all connected clients about a new alert"""
    temple_id = alert_data.get("temple_id")
    
    message = {
        "type": "alert",
        "temple_id": temple_id,
        "data": alert_data
    }
    
    await sio.emit('alert', message, room=f"alerts:{temple_id}")
    await sio.emit('alert', message, room="alerts")
    
    logger.info(f"Alert notification sent for temple {temple_id}")