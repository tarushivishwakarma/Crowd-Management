# Pilgrims Window Backend

Production-ready Python backend for the Pilgrims Window application - a comprehensive assistance system for Gujarat's 4 major temples: Somnath, Dwarka, Ambaji, and Pavagadh.

## Technology Stack

- **Framework**: FastAPI (Python 3.9+)
- **Database**: MongoDB 5.0+
- **Real-time**: WebSocket (Socket.IO)
- **Caching/Queue**: Redis
- **Data Visualization**: Matplotlib, Seaborn
- **Authentication**: JWT (JSON Web Tokens)
- **QR Code**: qrcode library

## Features

### 1. Darshan Booking System
- **QR Code Generation**: Automatic QR code generation for each booking
- **Slot Management**: Time-slot based booking with capacity limits
- **Real-time Availability**: Check available slots before booking
- **Booking Management**: View, cancel, and check-in bookings

### 2. Real-time Crowd Monitoring
- **Live Density Updates**: WebSocket-based real-time crowd density updates every 5 seconds
- **Zone-wise Tracking**: Monitor crowd in specific temple zones
- **Crowd Predictions**: ML-based predictions using historical data
- **Heat Maps**: Visual representation of crowd patterns

### 3. Transport Assistance
- **Shuttle Tracking**: Real-time GPS tracking of temple shuttles
- **Route Information**: Display shuttle routes and stops
- **ETA Calculations**: Estimated time of arrival for each shuttle
- **Capacity Monitoring**: Track passenger count vs capacity

### 4. Emergency SOS System
- **Instant Reporting**: Quick emergency report submission
- **Geolocation**: Automatic location capture for emergencies
- **Multi-channel Alerts**: SMS and email notifications
- **Status Tracking**: Track emergency response from report to resolution
- **Authority Response**: Acknowledge, manage, and resolve emergencies

### 5. Alerts Management
- **Broadcast System**: Temple-specific and zone-specific alerts
- **Severity Levels**: Info, Warning, and Critical alerts
- **Real-time Delivery**: WebSocket-based instant alert delivery
- **Alert History**: Track all past alerts

### 6. Resource Management
- **Inventory Tracking**: Monitor ambulances, security, facilities
- **Maintenance Scheduling**: Track maintenance schedules
- **Availability Status**: Real-time resource availability

### 7. Analytics & Reporting
- **Footfall Analytics**: Daily, weekly, monthly visitor statistics
- **Peak Hour Analysis**: Identify busiest times
- **Emergency Statistics**: Track and analyze emergency patterns
- **Visualization**: Matplotlib-based charts and graphs
- **Historical Data**: Long-term data retention and analysis

## Setup Instructions

### Prerequisites

```bash
# Python 3.9 or higher
python --version

# MongoDB 5.0 or higher
mongod --version

# Redis (optional but recommended for production)
redis-server --version
```

### Installation

1. **Clone the repository**
```bash
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv

# Activate on Linux/Mac
source venv/bin/activate

# Activate on Windows
venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. **Create storage directories**
```bash
mkdir -p storage/qrcodes storage/uploads
```

### Database Setup

1. **Start MongoDB**
```bash
mongod --dbpath /path/to/data
```

2. **MongoDB will automatically create collections on first use**

The application will create the following collections:
- `users` - User accounts
- `bookings` - Darshan bookings
- `crowd_data` - Real-time crowd monitoring data
- `shuttles` - Transport shuttle information
- `emergencies` - Emergency reports
- `alerts` - System alerts
- `resources` - Temple resources
- `footfall_data` - Visitor analytics
- `daily_analytics` - Daily aggregated statistics
- `incidents` - Historical incident reports
- `event_logs` - System event logs

### Running the Application

**Development Mode:**
```bash
uvicorn backend.api.main:app --reload --host 0.0.0.0 --port 8000
```

**Production Mode:**
```bash
uvicorn backend.api.main:app --host 0.0.0.0 --port 8000 --workers 4
```

**With Gunicorn (Production):**
```bash
gunicorn backend.api.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### API Documentation

Once the server is running, access:
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc
- **OpenAPI JSON**: http://localhost:8000/api/openapi.json

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token

### Bookings
- `POST /api/bookings/` - Create booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `GET /api/bookings/{booking_id}` - Get booking details
- `PATCH /api/bookings/{booking_id}/cancel` - Cancel booking
- `POST /api/bookings/{booking_id}/checkin` - Check-in (Authority)
- `GET /api/bookings/temple/{temple_id}/slots` - Get available slots

### Crowd Monitoring
- `GET /api/crowd/temple/{temple_id}/current` - Get current crowd data
- `GET /api/crowd/temple/{temple_id}/history` - Get crowd history
- `POST /api/crowd/temple/{temple_id}/update` - Update crowd data (Authority)
- `GET /api/crowd/temple/{temple_id}/heatmap` - Get crowd heatmap (Authority)
- `GET /api/crowd/temple/{temple_id}/predictions` - Get crowd predictions

### Emergency
- `POST /api/emergency/` - Report emergency
- `GET /api/emergency/temple/{temple_id}` - Get temple emergencies (Authority)
- `GET /api/emergency/active` - Get all active emergencies (Authority)
- `GET /api/emergency/{emergency_id}` - Get emergency details (Authority)
- `PATCH /api/emergency/{emergency_id}/acknowledge` - Acknowledge emergency (Authority)
- `PATCH /api/emergency/{emergency_id}/in-progress` - Mark in progress (Authority)
- `PATCH /api/emergency/{emergency_id}/resolve` - Resolve emergency (Authority)
- `GET /api/emergency/stats/temple/{temple_id}` - Get emergency stats (Authority)

## WebSocket Connections

Connect to WebSocket for real-time updates:

```javascript
// Using Socket.IO client
const socket = io('http://localhost:8000');

// Subscribe to crowd updates for a temple
socket.emit('subscribe', {
  channel: 'crowd',
  temple_id: 'somnath'
});

// Listen for crowd updates
socket.on('crowd_update', (data) => {
  console.log('Crowd update:', data);
});

// Subscribe to emergency alerts
socket.emit('subscribe', {
  channel: 'emergency'
});

socket.on('emergency', (data) => {
  console.log('Emergency alert:', data);
});
```

### Available WebSocket Channels
- `crowd` - Crowd density updates (5-second interval)
- `transport` - Shuttle location updates (10-second interval)
- `emergency` - Emergency alerts (instant)
- `alerts` - System alerts (instant)

## Project Structure

```
backend/
├── api/
│   ├── main.py                 # FastAPI application entry point
│   ├── dependencies.py         # Authentication dependencies
│   └── routers/
│       ├── auth.py             # Authentication endpoints
│       ├── bookings.py         # Booking management
│       ├── crowd.py            # Crowd monitoring
│       ├── emergency.py        # Emergency system
│       ├── alerts.py           # Alert management
│       ├── resources.py        # Resource management
│       ├── analytics.py        # Analytics endpoints
│       ├── incidents.py        # Historical incidents
│       ├── transport.py        # Transport assistance
│       └── users.py            # User management
├── database/
│   ├── mongodb_connection.py  # MongoDB connection manager
│   └── mongodb_schemas.py     # Pydantic data models
├── websocket/
│   └── websocket_server.py    # WebSocket server
├── scripts/
│   └── data_visualization.py  # Matplotlib visualization
├── config.py                  # Configuration settings
├── requirements.txt           # Python dependencies
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## Configuration

Key configuration options in `config.py`:

```python
# Temple Configuration
TEMPLES = {
    "somnath": {
        "name": "Somnath Temple",
        "location": "Veraval, Gir Somnath",
        "coordinates": {"lat": 20.8880, "lng": 70.4013},
        "zones": ["mainDarshan", "garbhaGriha", "pradakshina", "museum"]
    },
    # ... more temples
}

# Crowd thresholds
CROWD_THRESHOLD_LOW = 30      # Below 30% - Low
CROWD_THRESHOLD_MODERATE = 60 # 30-60% - Moderate
CROWD_THRESHOLD_HIGH = 80     # 60-80% - High
                              # Above 80% - Critical
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password storage
- **Role-based Access**: Pilgrim, Authority, and Admin roles
- **CORS Protection**: Configurable allowed origins
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Pydantic models for data validation

## Data Visualization

The backend includes comprehensive data visualization using Matplotlib:

```python
from backend.scripts.data_visualization import (
    generate_crowd_heatmap,
    generate_footfall_chart,
    generate_emergency_stats_chart
)

# Generate heatmap
heatmap_image = generate_crowd_heatmap(heatmap_data, "Somnath Temple")
# Returns base64 encoded PNG image
```

## Monitoring & Logging

- **Structured Logging**: JSON-formatted logs
- **Health Check**: `/health` endpoint
- **Prometheus Metrics**: Performance monitoring
- **Error Tracking**: Comprehensive error logging

## Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=backend tests/
```

## Deployment

### Docker Deployment

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "backend.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Production Considerations

1. **Use Environment Variables**: Never commit .env file
2. **Enable HTTPS**: Use reverse proxy (Nginx) with SSL
3. **Database Backup**: Regular MongoDB backups
4. **Redis Cluster**: For WebSocket scaling
5. **Load Balancing**: Multiple app instances
6. **Monitoring**: Set up Prometheus + Grafana
7. **Log Aggregation**: ELK stack or similar

## Contributing

When adding new features:
1. Follow PEP 8 style guidelines
2. Add type hints
3. Write comprehensive docstrings
4. Add unit tests
5. Update API documentation

## Support

For issues and questions:
- Check API documentation at `/api/docs`
- Review MongoDB logs
- Check application logs
- Verify environment configuration

## License

[Your License Here]

## Contact

[Your Contact Information]