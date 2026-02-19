import React, { useState, useEffect } from 'react';
import { Eye, Camera, Thermometer, Mic, Wifi, Zap, Activity, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Switch } from '../ui/switch';
import { Alert, AlertDescription } from '../ui/alert';

const SmartMonitoring = ({ templeData, selectedTemple, events }) => {
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState(1);
  
  const currentTemple = templeData[selectedTemple];

  // Real-time monitoring data
  const [monitoringData, setMonitoringData] = useState({
    cameras: [
      { id: 1, location: 'Main Entrance', status: 'active', quality: 'HD', angle: 45 },
      { id: 2, location: 'Garbha Griha', status: 'active', quality: 'HD', angle: 0 },
      { id: 3, location: 'Pradakshina Path', status: 'active', quality: 'HD', angle: 90 },
      { id: 4, location: 'Exit Gate', status: 'maintenance', quality: 'SD', angle: 180 },
      { id: 5, location: 'Parking Area', status: 'active', quality: 'HD', angle: 270 },
      { id: 6, location: 'Security Office', status: 'active', quality: 'HD', angle: 315 }
    ],
    sensors: {
      temperature: { value: 28, unit: '°C', status: 'normal', threshold: 35 },
      humidity: { value: 65, unit: '%', status: 'normal', threshold: 80 },
      noise: { value: 55, unit: 'dB', status: 'normal', threshold: 70 },
      airQuality: { value: 42, unit: 'AQI', status: 'good', threshold: 100 },
      crowd: { value: 67, unit: '%', status: 'moderate', threshold: 85 }
    },
    network: {
      bandwidth: 95,
      latency: 12,
      devices: 156,
      status: 'optimal'
    },
    security: {
      activeAlerts: 2,
      resolvedToday: 8,
      responseTime: '2.3 min',
      staffOnline: 24
    }
  });

  // Simulate real-time updates
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      setMonitoringData(prev => ({
        ...prev,
        sensors: {
          ...prev.sensors,
          temperature: {
            ...prev.sensors.temperature,
            value: Math.max(20, Math.min(40, prev.sensors.temperature.value + (Math.random() - 0.5) * 2))
          },
          humidity: {
            ...prev.sensors.humidity,
            value: Math.max(30, Math.min(90, prev.sensors.humidity.value + (Math.random() - 0.5) * 5))
          },
          noise: {
            ...prev.sensors.noise,
            value: Math.max(30, Math.min(80, prev.sensors.noise.value + (Math.random() - 0.5) * 3))
          },
          crowd: {
            ...prev.sensors.crowd,
            value: Math.max(0, Math.min(100, prev.sensors.crowd.value + (Math.random() - 0.5) * 10))
          }
        }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const getSensorStatus = (value, threshold) => {
    if (value >= threshold) return 'critical';
    if (value >= threshold * 0.8) return 'warning';
    return 'normal';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': case 'normal': case 'good': case 'optimal': 
        return 'bg-green-100 text-green-800';
      case 'warning': case 'moderate': 
        return 'bg-yellow-100 text-yellow-800';
      case 'critical': case 'maintenance': 
        return 'bg-red-100 text-red-800';
      default: 
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (value, threshold) => {
    const percentage = (value / threshold) * 100;
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-violet-600" />
                Smart Monitoring System - {currentTemple.name}
              </CardTitle>
              <CardDescription>
                Real-time surveillance and environmental monitoring
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">System Status:</span>
              <Switch 
                checked={isMonitoring}
                onCheckedChange={setIsMonitoring}
              />
              <Badge className={isMonitoring ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {isMonitoring ? 'ACTIVE' : 'INACTIVE'}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Cameras</p>
                <p className="text-3xl font-bold text-violet-600">
                  {monitoringData.cameras.filter(c => c.status === 'active').length}
                </p>
              </div>
              <Camera className="h-8 w-8 text-violet-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Network Status</p>
                <p className="text-3xl font-bold text-green-600">{monitoringData.network.bandwidth}%</p>
              </div>
              <Wifi className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected Devices</p>
                <p className="text-3xl font-bold text-blue-600">{monitoringData.network.devices}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Security Status</p>
                <p className="text-3xl font-bold text-green-600">SECURE</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Camera Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-violet-600" />
            Live Camera Feed
          </CardTitle>
          <CardDescription>Real-time video surveillance across temple premises</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Camera List */}
            <div className="space-y-3">
              <h4 className="font-medium">Camera Locations</h4>
              {monitoringData.cameras.map((camera) => (
                <div 
                  key={camera.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedCamera === camera.id ? 'bg-violet-50 border-violet-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCamera(camera.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Camera {camera.id}</span>
                    <Badge className={getStatusColor(camera.status)}>
                      {camera.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>{camera.location}</div>
                    <div>Quality: {camera.quality} | Angle: {camera.angle}°</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Feed Simulation */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative">
                <div className="text-white text-center">
                  <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">
                    Camera {selectedCamera} - Live Feed
                  </h3>
                  <p className="text-sm opacity-75">
                    {monitoringData.cameras.find(c => c.id === selectedCamera)?.location}
                  </p>
                </div>
                
                {/* Overlay Information */}
                <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded text-xs">
                  🔴 LIVE | {new Date().toLocaleTimeString()}
                </div>
                
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded text-xs">
                  HD 1080p | 30 FPS
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline">
                  <Zap className="h-4 w-4 mr-2" />
                  PTZ Control
                </Button>
                <Button size="sm" variant="outline">
                  📹 Record
                </Button>
                <Button size="sm" variant="outline">
                  📷 Snapshot
                </Button>
                <Button size="sm" variant="outline">
                  🔍 Zoom
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Sensors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-violet-600" />
            Environmental Monitoring
          </CardTitle>
          <CardDescription>Real-time environmental conditions and air quality</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(monitoringData.sensors).map(([sensor, data]) => (
              <Card key={sensor} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium capitalize">{sensor.replace(/([A-Z])/g, ' $1')}</h4>
                  <Badge className={getStatusColor(getSensorStatus(data.value, data.threshold))}>
                    {getSensorStatus(data.value, data.threshold)}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-violet-600">
                      {data.value.toFixed(1)}{data.unit}
                    </div>
                    <div className="text-sm text-gray-600">
                      Threshold: {data.threshold}{data.unit}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Progress 
                      value={(data.value / data.threshold) * 100} 
                      className="h-3"
                    />
                    <div 
                      className={`absolute top-0 left-0 h-3 rounded-full transition-all ${
                        getProgressColor(data.value, data.threshold)
                      }`}
                      style={{ width: `${Math.min((data.value / data.threshold) * 100, 100)}%` }}
                    />
                  </div>
                  
                  {data.value >= data.threshold * 0.8 && (
                    <Alert className="bg-yellow-50 border-yellow-200 py-2">
                      <AlertDescription className="text-xs text-yellow-700">
                        Approaching threshold limit
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network & System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-violet-600" />
              Network Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Bandwidth Usage</span>
                <span className="font-medium">{monitoringData.network.bandwidth}%</span>
              </div>
              <Progress value={monitoringData.network.bandwidth} className="h-3" />
              
              <div className="flex justify-between items-center">
                <span>Network Latency</span>
                <span className="font-medium">{monitoringData.network.latency}ms</span>
              </div>
              <Progress value={monitoringData.network.latency} max={50} className="h-3" />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <div className="font-medium text-violet-600">{monitoringData.network.devices}</div>
                  <div className="text-sm text-gray-600">Connected Devices</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-green-600">{monitoringData.network.status}</div>
                  <div className="text-sm text-gray-600">Network Status</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-violet-600" />
              Security Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="font-medium text-red-600">{monitoringData.security.activeAlerts}</div>
                  <div className="text-sm text-gray-600">Active Alerts</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-green-600">{monitoringData.security.resolvedToday}</div>
                  <div className="text-sm text-gray-600">Resolved Today</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-blue-600">{monitoringData.security.responseTime}</div>
                  <div className="text-sm text-gray-600">Avg Response</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-violet-600">{monitoringData.security.staffOnline}</div>
                  <div className="text-sm text-gray-600">Staff Online</div>
                </div>
              </div>
              
              <Alert className="bg-green-50 border-green-200">
                <Shield className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  All security systems operational. No threats detected.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events from Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-violet-600" />
            Monitoring Log
          </CardTitle>
          <CardDescription>Recent events detected by the monitoring system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`w-2 h-2 rounded-full ${
                    event.type === 'emergency' ? 'bg-red-500' :
                    event.type === 'crowd' ? 'bg-orange-500' : 'bg-blue-500'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{event.message}</p>
                  <p className="text-xs text-gray-500">{event.timestamp}</p>
                </div>
              </div>
            ))}
            
            {events.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No recent monitoring events</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartMonitoring;