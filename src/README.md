# Pilgrims Window - Frontend

A comprehensive React application for temple assistance services across Gujarat's 4 major temples: Somnath, Dwarka, Ambaji, and Pavagadh.

## Features

### 🙏 Pilgrim Interface
- **Darshan Booking System** - Book time slots with QR code generation
- **Real-time Crowd Monitoring** - Live density updates for all temple zones
- **Interactive Facilities Map** - Navigate temple complexes with ease
- **Transport Assistance** - Live shuttle tracking and route information
- **Emergency SOS** - One-click emergency assistance with location sharing
- **Historical Incidents** - Learn from past events for better planning
- **Special Assistance** - Support for elderly, children, and differently-abled

### 🛡️ Authority Interface
- **Admin Authentication** - Secure role-based access control
- **Crowd Heat Maps** - Visual representation of crowd patterns
- **Emergency Management** - Monitor and respond to emergency situations
- **Resource Management** - Track temple resources and facilities
- **Footfall Analytics** - Detailed visitor statistics and trends
- **Smart Monitoring** - Real-time system health and alerts

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: Shadcn/ui component library
- **Authentication**: JWT-based with role management
- **Real-time**: WebSocket connections for live updates
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: Sonner toast library

## Quick Start

### Prerequisites

- Node.js 16 or higher
- npm or yarn package manager

### Installation

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Configure environment**:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start development server**:
```bash
npm start
```

4. **Build for production**:
```bash
npm run build
```

## Environment Configuration

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_WS_URL=ws://localhost:8000/ws

# Application Settings
REACT_APP_APP_NAME=Pilgrims Window
REACT_APP_VERSION=1.0.0
REACT_APP_DEFAULT_TEMPLE=somnath
REACT_APP_DEBUG=false
```

## Authentication

The app supports three user roles:

### 🙏 **Pilgrim** (Default)
- Book darshan slots
- View crowd information
- Access transport services
- Report emergencies
- View historical incidents

### 🛡️ **Authority** (Temple Staff)
- Monitor crowd conditions
- Manage alerts and resources
- Respond to emergencies
- View analytics dashboard
- Administrative controls

### 👑 **Admin** (System Administrator)
- Full system access
- User management
- System configuration
- Advanced analytics

## Component Structure

```
components/
├── auth/                  # Authentication components
│   ├── LoginForm.tsx     # User login interface
│   └── RegisterForm.tsx  # User registration
├── pilgrim/              # Pilgrim-specific features
│   ├── PilgrimInterface.tsx
│   ├── CrowdAvoidance.tsx
│   ├── HistoricalIncidents.tsx
│   └── SpecialAssistance.tsx
├── authority/            # Authority-specific features
│   ├── AuthorityInterface.tsx
│   ├── CrowdHeatmap.tsx
│   ├── AlertsManagement.tsx
│   ├── ResourceManagement.tsx
│   ├── FootfallAnalytics.tsx
│   └── SmartMonitoring.tsx
├── ui/                   # Reusable UI components (Shadcn)
└── ...                   # Shared components
```

## Key Features

### 🎫 QR Code Booking System
- Secure booking with unique QR codes
- Downloadable booking confirmations
- Real-time slot availability
- Automatic booking management

### 📊 Real-time Crowd Monitoring
- Live density updates every 5 seconds
- Zone-specific crowd information
- Predictive crowd analytics
- Smart recommendations

### 🚨 Emergency System
- One-click SOS with GPS location
- Automatic authority notifications
- Emergency type categorization
- Real-time status tracking

### 🚐 Transport Assistance
- Live shuttle GPS tracking
- Route information and ETAs
- Capacity monitoring
- Multiple route support

### 📈 Analytics Dashboard
- Visitor footfall trends
- Peak time analysis
- Emergency incident reports
- Resource utilization metrics

## API Integration

The frontend integrates with a Python FastAPI backend:

```typescript
// Example API usage
import { bookingsApi, crowdApi } from './services/api';

// Create a booking
const booking = await bookingsApi.createBooking(bookingData);

// Get crowd data
const crowdData = await crowdApi.getCurrentCrowdData('somnath');
```

### Real-time Updates

WebSocket connections provide live updates:

```typescript
import { wsService } from './services/api';

// Connect and subscribe to updates
wsService.connect((data) => {
  if (data.type === 'crowd_update') {
    // Handle crowd density updates
  }
});

wsService.subscribe('crowd', 'somnath');
```

## Temples Supported

### 🏛️ **Somnath Temple**
- Location: Veraval, Gir Somnath
- Zones: Main Darshan, Garbha Griha, Pradakshina, Museum

### 🏛️ **Dwarkadhish Temple**
- Location: Dwarka, Devbhumi Dwarka
- Zones: Main Darshan, Garbha Griha, Pradakshina, Gomti Ghat

### 🏛️ **Ambaji Temple**
- Location: Ambaji, Banaskantha
- Zones: Main Darshan, Garbha Griha, Pradakshina, Gabbar Hill

### 🏛️ **Kalika Mata Temple**
- Location: Pavagadh, Panchmahal
- Zones: Main Darshan, Garbha Griha, Pradakshina, Ropeway

## Design System

### Color Palette
- **Primary**: Space Cadet (#302f4d)
- **Secondary**: Puce (#b98ea7)
- **Accent**: Thistle (#f0d3f7)
- **Tertiary**: Mountbatten Pink (#a57982)
- **Background**: Russian Violet (#120d31)

### Typography
- Custom font sizing and weights
- Consistent line heights
- Responsive text scaling

## Contributing

1. **Code Style**: Follow TypeScript and React best practices
2. **Components**: Use functional components with hooks
3. **Styling**: Use Tailwind CSS classes
4. **Icons**: Use Lucide React icons
5. **Testing**: Write unit tests for new features

## Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
npm run preview  # Preview production build
```

### Docker Deployment
```bash
docker build -t pilgrims-window-frontend .
docker run -p 3000:3000 pilgrims-window-frontend
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Lazy loading for images
- **Bundle Size**: Optimized with tree shaking
- **Caching**: Service worker for offline support

## Security

- **Authentication**: JWT-based secure authentication
- **Data Validation**: Client-side and server-side validation
- **HTTPS**: Secure communication with backend
- **CORS**: Properly configured cross-origin requests

## Support

For technical support or feature requests:
- Check the backend API documentation
- Review component documentation
- Test with demo credentials provided in login

## License

[Your License Here]

---

**Built with ❤️ for Gujarat's Sacred Temples**