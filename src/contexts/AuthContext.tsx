/**
 * Authentication Context for Temple Insight 360
 * Manages user authentication state and provides auth methods
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, User, LoginCredentials, RegisterData } from '../services/api';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  quickLogin: (userType: 'pilgrim' | 'authority') => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAuthority: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing auth token on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          const userData = await authApi.getCurrentUser();
          setUser(userData);
        } catch (error) {
          // Token is invalid, remove it
          localStorage.removeItem('auth_token');
          console.error('Auth check failed:', error);
        }
      }
      
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authApi.login(credentials);
      
      // Store token
      localStorage.setItem('auth_token', response.access_token);
      
      // Set user data
      setUser(response.user);
      
      toast.success(`Welcome back, ${response.user.full_name}!`);
      return true;
    } catch (error: any) {
      console.error('Login failed:', error);
      
      // Show specific error messages
      if (error.status === 401) {
        toast.error('Invalid credentials. Please check your email and password.');
      } else {
        toast.error(error.message || 'Login failed. Please check your connection.');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Quick login method for demo/default credentials
  const quickLogin = async (userType: 'pilgrim' | 'authority'): Promise<boolean> => {
    const demoCredentials = {
      pilgrim: {
        email: 'pilgrim@temple360.com',
        password: 'Pilgrim@123',
      },
      authority: {
        email: 'admin@temple360.com',
        password: 'Temple@360',
      },
    };

    return login(demoCredentials[userType]);
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setLoading(true);
      const newUser = await authApi.register(userData);
      
      // Auto-login after registration
      const loginSuccess = await login({
        email: userData.email,
        password: userData.password,
      });
      
      if (loginSuccess) {
        toast.success('Account created successfully!');
      }
      
      return loginSuccess;
    } catch (error: any) {
      console.error('Registration failed:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    quickLogin,
    register,
    logout,
    isAuthenticated: !!user,
    isAuthority: user?.role === 'authority' || user?.role === 'admin',
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};