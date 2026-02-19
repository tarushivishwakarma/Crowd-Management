/**
 * Application Configuration
 * Centralized configuration for the Temple Insight 360 app
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000/api',
  WS_URL: 'ws://localhost:8000/ws',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

// Temple Configuration
export const TEMPLES = {
  somnath: {
    id: 'somnath',
    name: 'Somnath Temple',
    location: 'Veraval, Gir Somnath',
    coordinates: { lat: 20.8880, lng: 70.4013 },
    zones: ['mainDarshan', 'garbhaGriha', 'pradakshina', 'museum'],
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop&crop=temple',
  },
  dwarka: {
    id: 'dwarka',
    name: 'Dwarkadhish Temple',
    location: 'Dwarka, Devbhumi Dwarka',
    coordinates: { lat: 22.2395, lng: 68.9685 },
    zones: ['mainDarshan', 'garbhaGriha', 'pradakshina', 'gomtiGhat'],
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d636dc?w=800&h=600&fit=crop&crop=temple',
  },
  ambaji: {
    id: 'ambaji',
    name: 'Ambaji Temple',
    location: 'Ambaji, Banaskantha',
    coordinates: { lat: 24.3309, lng: 72.8431 },
    zones: ['mainDarshan', 'garbhaGriha', 'pradakshina', 'gabbarHill'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=temple',
  },
  pavagadh: {
    id: 'pavagadh',
    name: 'Kalika Mata Temple',
    location: 'Pavagadh, Panchmahal',
    coordinates: { lat: 22.4839, lng: 73.5316 },
    zones: ['mainDarshan', 'garbhaGriha', 'pradakshina', 'ropeway'],
    image: 'https://images.unsplash.com/photo-1605106901227-991bd663255c?w=800&h=600&fit=crop&crop=temple',
  },
} as const;

// Zone Names Mapping
export const ZONE_NAMES = {
  mainDarshan: 'Main Darshan Hall',
  garbhaGriha: 'Garbha Griha',
  pradakshina: 'Pradakshina Path',
  museum: 'Museum & Exhibition',
  gomtiGhat: 'Gomti Ghat',
  gabbarHill: 'Gabbar Hill Path',
  ropeway: 'Ropeway Station',
} as const;

// Time Slots
export const TIME_SLOTS = [
  '06:00-08:00',
  '08:00-10:00',
  '10:00-12:00',
  '12:00-14:00',
  '14:00-16:00',
  '16:00-18:00',
  '18:00-20:00',
  '20:00-22:00',
] as const;

// App Settings
export const APP_CONFIG = {
  NAME: 'Temple Insight 360',
  VERSION: '1.0.0',
  DESCRIPTION: 'Gujarat Temple Assistance System',
  DEVELOPER_MODE: true, // Set to true for mock data - enabled for demo
};

// Mock Data for Development
export const MOCK_DATA = {
  // Mock user for testing
  DEMO_USERS: {
    pilgrim: {
      email: 'pilgrim@temple360.com',
      password: 'Pilgrim@123',
      full_name: 'Demo Pilgrim',
      role: 'pilgrim',
    },
    authority: {
      email: 'admin@temple360.com',
      password: 'Temple@360',
      full_name: 'Temple Authority',
      role: 'authority',
    },
    admin: {
      email: 'admin@temple360.com',
      password: 'Temple@360',
      full_name: 'System Admin',
      role: 'admin',
    },
  },

  // Mock bookings
  SAMPLE_BOOKINGS: [
    {
      id: 'BK1234567890',
      booking_id: 'BK1234567890',
      temple_id: 'somnath',
      temple_name: 'Somnath Temple',
      zone: 'mainDarshan',
      booking_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      time_slot: '08:00-10:00',
      number_of_people: 2,
      status: 'confirmed',
      qr_code_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjYwIiB5PSI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9IkFyaWFsIj5RUiBDT0RFPC90ZXh0Pjx0ZXh0IHg9IjYwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI4IiBmb250LWZhbWlseT0iQXJpYWwiPkJLMTIzNDU2Nzg5MDwvdGV4dD48L3N2Zz4=',
      pilgrim_name: 'Demo Pilgrim',
      created_at: new Date().toISOString(),
    },
  ],

  // Mock crowd data
  SAMPLE_CROWD_DATA: {
    somnath: {
      temple_id: 'somnath',
      temple_name: 'Somnath Temple',
      zones: [
        {
          zone_id: 'mainDarshan',
          zone_name: 'Main Darshan Hall',
          density: 45,
          current_count: 23,
          max_capacity: 50,
          wait_time_minutes: 15,
          status: 'moderate',
          last_updated: new Date().toISOString(),
        },
        {
          zone_id: 'garbhaGriha',
          zone_name: 'Garbha Griha',
          density: 78,
          current_count: 39,
          max_capacity: 50,
          wait_time_minutes: 25,
          status: 'high',
          last_updated: new Date().toISOString(),
        },
      ],
      total_crowd: 62,
      timestamp: new Date().toISOString(),
    },
  },
};

// Utility function to check if running in development mode
export const isDevelopment = () => {
  return APP_CONFIG.DEVELOPER_MODE || window.location.hostname === 'localhost';
};

// Utility function to get API URL with fallback
export const getApiUrl = (endpoint: string = '') => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Utility function to get WebSocket URL
export const getWsUrl = () => {
  return API_CONFIG.WS_URL;
};