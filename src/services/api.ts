/**
 * API Service Layer for Temple Insight 360
 * Handles all backend API calls with proper error handling and loading states
 */
import React from 'react';

import { getApiUrl, getWsUrl, isDevelopment, MOCK_DATA } from '../config/app';

const API_BASE_URL = getApiUrl();
const WS_BASE_URL = getWsUrl();

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  phone: string;
  full_name: string;
  role: 'pilgrim' | 'authority';
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'pilgrim' | 'authority' | 'admin';
  phone: string;
}

export interface BookingData {
  temple_id: string;
  temple_name: string;
  zone: string;
  booking_date: string;
  time_slot: string;
  number_of_people: number;
  pilgrim_name: string;
  pilgrim_phone: string;
  special_assistance?: string;
}

export interface Booking {
  id: string;
  booking_id: string;
  temple_name: string;
  zone: string;
  booking_date: string;
  time_slot: string;
  number_of_people: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  qr_code_url: string;
  pilgrim_name: string;
  created_at: string;
}

export type CrowdStatus = 'low' | 'moderate' | 'high' | 'critical';

export interface CrowdData {
  temple_id: string;
  temple_name: string;
  zones: Array<{
    zone_id: string;
    zone_name: string;
    density: number;
    current_count: number;
    max_capacity: number;
    wait_time_minutes: number;
    status: CrowdStatus;
    last_updated: string;
  }>;
  total_crowd: number;
  timestamp: string;
}

export interface EmergencyData {
  type: 'medical' | 'security' | 'crowd_control' | 'lost_child' | 'fire' | 'other';
  description: string;
  temple_id: string;
  temple_name: string;
  zone?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  reporter_name: string;
  reporter_phone: string;
}

// API Response wrapper
interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

// API Error class
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('auth_token');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Network error' }));
      throw new ApiError(response.status, errorData.detail || 'API Error');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, 'Network error. Please check your connection.');
  }
}

// Authentication API
export const authApi = {
  async login(credentials: LoginCredentials): Promise<{ access_token: string; user: User }> {
    // Mock authentication for development/demo
    if (isDevelopment()) {
      const mockUser = Object.values(MOCK_DATA.DEMO_USERS).find(
        user => user.email === credentials.email && user.password === credentials.password
      );
      
      if (mockUser) {
        const mockToken = `mock_token_${Date.now()}`;
        const userData: User = {
          id: `user_${Date.now()}`,
          email: mockUser.email,
          full_name: mockUser.full_name,
          role: mockUser.role as any,
          phone: '+91 98765 43210',
        };
        
        return Promise.resolve({
          access_token: mockToken,
          user: userData,
        });
      } else {
        throw new ApiError(401, 'Invalid credentials');
      }
    }

    const formData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);

    return apiCall('/auth/login', {
      method: 'POST',
      headers: {},
      body: formData,
    });
  },

  async register(userData: RegisterData): Promise<User> {
    // Mock registration for development
    if (isDevelopment()) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: userData.email,
        full_name: userData.full_name,
        role: userData.role as any,
        phone: userData.phone,
      };
      return Promise.resolve(newUser);
    }

    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async getCurrentUser(): Promise<User> {
    // Mock current user for development
    if (isDevelopment()) {
      const token = localStorage.getItem('auth_token');
      if (token && token.startsWith('mock_token_')) {
        return Promise.resolve(MOCK_DATA.DEMO_USERS.pilgrim as any);
      }
      throw new ApiError(401, 'Not authenticated');
    }

    return apiCall('/users/me');
  },

  async refreshToken(): Promise<{ access_token: string }> {
    const token = localStorage.getItem('auth_token');
    return apiCall('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ current_token: token }),
    });
  },
};

// Bookings API
export const bookingsApi = {
  async createBooking(bookingData: BookingData): Promise<Booking> {
    // Mock booking creation for development
    if (isDevelopment()) {
      const newBooking: Booking = {
        id: `BK${Date.now()}`,
        booking_id: `BK${Date.now()}`,
        temple_name: bookingData.temple_name,
        zone: bookingData.zone,
        booking_date: bookingData.booking_date,
        time_slot: bookingData.time_slot,
        number_of_people: bookingData.number_of_people,
        status: 'confirmed',
        qr_code_url: `data:image/svg+xml;base64,${btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white" stroke="black" stroke-width="2"/><text x="100" y="40" text-anchor="middle" font-size="12">TEMPLE INSIGHT 360</text><text x="100" y="60" text-anchor="middle" font-size="10">QR CODE</text><text x="100" y="80" text-anchor="middle" font-size="8">${`BK${Date.now()}`}</text><rect x="50" y="100" width="100" height="80" fill="none" stroke="black" stroke-width="1" stroke-dasharray="2,2"/></svg>`)}`,
        pilgrim_name: bookingData.pilgrim_name,
        created_at: new Date().toISOString(),
      };
      
      // Store in localStorage for persistence
      const existingBookings = JSON.parse(localStorage.getItem('mock_bookings') || '[]');
      existingBookings.push(newBooking);
      localStorage.setItem('mock_bookings', JSON.stringify(existingBookings));
      
      return Promise.resolve(newBooking);
    }

    return apiCall('/bookings/', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  async getMyBookings(status?: string): Promise<Booking[]> {
    // Mock get bookings for development
    if (isDevelopment()) {
      const storedBookings = JSON.parse(localStorage.getItem('mock_bookings') || '[]');
      const sampleBookings = [...MOCK_DATA.SAMPLE_BOOKINGS, ...storedBookings];
      
      if (status) {
        return Promise.resolve(sampleBookings.filter(b => b.status === status));
      }
      return Promise.resolve(sampleBookings);
    }

    const params = status ? `?status_filter=${status}` : '';
    return apiCall(`/bookings/my-bookings${params}`);
  },

  async getBooking(bookingId: string): Promise<Booking> {
    return apiCall(`/bookings/${bookingId}`);
  },

  async cancelBooking(bookingId: string): Promise<{ message: string }> {
    return apiCall(`/bookings/${bookingId}/cancel`, {
      method: 'PATCH',
    });
  },

  async getAvailableSlots(templeId: string, date: string): Promise<Array<{
    time_slot: string;
    available: boolean;
    booked: number;
    capacity: number;
  }>> {
    // Mock available slots for development
    if (isDevelopment()) {
      const timeSlots = [
        '06:00-08:00', '08:00-10:00', '10:00-12:00', '12:00-14:00',
        '14:00-16:00', '16:00-18:00', '18:00-20:00', '20:00-22:00'
      ];
      
      return Promise.resolve(timeSlots.map(slot => ({
        time_slot: slot,
        available: Math.random() > 0.3, // 70% chance of being available
        booked: Math.floor(Math.random() * 30),
        capacity: 50,
      })));
    }

    return apiCall(`/bookings/temple/${templeId}/slots?date=${date}`);
  },
};

// Crowd monitoring API
export const crowdApi = {
  async getCurrentCrowdData(templeId: string): Promise<CrowdData> {
    // Mock crowd data for development
    if (isDevelopment()) {
      const mockData = MOCK_DATA.SAMPLE_CROWD_DATA[templeId as keyof typeof MOCK_DATA.SAMPLE_CROWD_DATA];
      if (mockData) {
        return Promise.resolve(mockData);
      }
      
      // Generate random crowd data if no mock data exists
      const zones = ['mainDarshan', 'garbhaGriha', 'pradakshina'];
      const mockCrowdData: CrowdData = {
        temple_id: templeId,
        temple_name: templeId.charAt(0).toUpperCase() + templeId.slice(1) + ' Temple',
        zones: zones.map(zoneId => ({
          zone_id: zoneId,
          zone_name: zoneId.replace(/([A-Z])/g, ' $1').trim(),
          density: Math.floor(Math.random() * 100),
          current_count: Math.floor(Math.random() * 50),
          max_capacity: 50,
          wait_time_minutes: Math.floor(Math.random() * 30),
          status: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'moderate' : 'low',
          last_updated: new Date().toISOString(),
        })),
        total_crowd: Math.floor(Math.random() * 150),
        timestamp: new Date().toISOString(),
      };
      
      return Promise.resolve(mockCrowdData);
    }

    return apiCall(`/crowd/temple/${templeId}/current`);
  },

  async getCrowdHistory(templeId: string, hours: number = 24, zone?: string): Promise<CrowdData[]> {
    const params = new URLSearchParams({ hours: hours.toString() });
    if (zone) params.append('zone', zone);
    return apiCall(`/crowd/temple/${templeId}/history?${params}`);
  },

  async getCrowdPredictions(templeId: string): Promise<any> {
    return apiCall(`/crowd/temple/${templeId}/predictions`);
  },
};

// Emergency API
export const emergencyApi = {
  async reportEmergency(emergencyData: EmergencyData): Promise<{ id: string; emergency_id: string }> {
    return apiCall('/emergency/', {
      method: 'POST',
      body: JSON.stringify(emergencyData),
    });
  },
};

// Transport API
export const transportApi = {
  async getTempleShuttles(templeId: string): Promise<Array<{
    id: string;
    shuttle_number: string;
    route_name: string;
    current_location: { latitude: number; longitude: number };
    next_stop: string;
    eta_minutes: number;
    current_passengers: number;
    capacity: number;
  }>> {
    return apiCall(`/transport/temple/${templeId}/shuttles`);
  },

  async getShuttle(shuttleId: string): Promise<any> {
    return apiCall(`/transport/shuttle/${shuttleId}`);
  },
};

// Alerts API
export const alertsApi = {
  async getTempleAlerts(templeId: string): Promise<Array<{
    id: string;
    alert_id: string;
    title: string;
    message: string;
    severity: 'info' | 'warning' | 'critical';
    created_at: string;
  }>> {
    return apiCall(`/alerts/temple/${templeId}`);
  },

  async getAllActiveAlerts(): Promise<any[]> {
    return apiCall('/alerts/active');
  },
};

// Hook for API calls with loading and error states
export function useApi<T>() {
  const [state, setState] = React.useState<ApiResponse<T>>({
    loading: false,
  });

  const execute = async (apiFunction: () => Promise<T>) => {
    setState({ loading: true });
    
    try {
      const data = await apiFunction();
      setState({ data, loading: false });
      return data;
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'An unexpected error occurred';
      setState({ error: errorMessage, loading: false });
      throw error;
    }
  };

  return { ...state, execute };
}

// WebSocket connection for real-time updates
export class WebSocketService {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3; // Reduced attempts for dev mode
  private reconnectInterval = 5000; // Longer interval
  private isConnecting = false;
  private shouldConnect = true;

  connect(onMessage: (data: any) => void) {
    // Skip WebSocket connection in development mode or if already connecting
    if (isDevelopment() || this.isConnecting || !this.shouldConnect) {
      console.log('WebSocket connection skipped (development mode or already connecting)');
      return;
    }

    const wsUrl = WS_BASE_URL;
    this.isConnecting = true;
    
    try {
      this.socket = new WebSocket(wsUrl);
      
      this.socket.onopen = () => {
        console.log('WebSocket connected successfully');
        this.reconnectAttempts = 0;
        this.isConnecting = false;
      };
      
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      this.socket.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        this.isConnecting = false;
        if (this.shouldConnect && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.attemptReconnect(onMessage);
        }
      };
      
      this.socket.onerror = (error) => {
        console.warn('WebSocket connection failed - this is normal in development mode');
        this.isConnecting = false;
        this.shouldConnect = false; // Stop trying to connect after first error
      };
    } catch (error) {
      console.warn('Error creating WebSocket connection - running in fallback mode');
      this.isConnecting = false;
      this.shouldConnect = false;
    }
  }

  private attemptReconnect(onMessage: (data: any) => void) {
    if (this.reconnectAttempts < this.maxReconnectAttempts && this.shouldConnect) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect(onMessage);
      }, this.reconnectInterval);
    } else {
      console.log('Max reconnection attempts reached or connection disabled');
      this.shouldConnect = false;
    }
  }

  subscribe(channel: string, templeId?: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'subscribe',
        channel,
        temple_id: templeId,
      }));
    } else if (isDevelopment()) {
      console.log(`WebSocket subscription skipped (dev mode): ${channel}${templeId ? `:${templeId}` : ''}`);
    }
  }

  disconnect() {
    this.shouldConnect = false;
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.isConnecting = false;
  }

  // Method to check if WebSocket is available
  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }

  // Method to reset connection state (useful for testing)
  reset() {
    this.disconnect();
    this.reconnectAttempts = 0;
    this.shouldConnect = true;
  }
}

export const wsService = new WebSocketService();

// Error handler utility
export const handleApiError = (error: unknown, defaultMessage = 'An error occurred') => {
  if (error instanceof ApiError) {
    return error.message;
  }
  return defaultMessage;
};