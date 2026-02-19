/**
 * Login Form Component
 * Handles user authentication for both pilgrims and authorities
 */
import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, ShieldCheck, User, ArrowLeft, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { useAuth } from '../../contexts/AuthContext';
import { Language, getTranslation } from '../../utils/translations';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
  onBack?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister, onBack }) => {
  const { login, quickLogin, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [activeTab, setActiveTab] = useState('authority'); // Default to authority for this fix

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    const success = await login({
      email: formData.email,
      password: formData.password,
    });

    if (success) {
      onSuccess();
    }
  };

  // Handle quick login with default credentials
  const handleQuickLogin = async (userType: 'pilgrim' | 'authority') => {
    const success = await quickLogin(userType);
    if (success) {
      onSuccess();
    }
  };

  // Demo credentials for testing
  const fillDemoCredentials = (type: 'pilgrim' | 'authority') => {
    if (type === 'pilgrim') {
      setFormData({
        email: 'pilgrim@temple360.com',
        password: 'Pilgrim@123',
      });
    } else {
      setFormData({
        email: 'admin@temple360.com',
        password: 'Temple@360',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-accent/10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-between mb-4">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Role Selection
              </Button>
            )}
            <div className={`mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center ${onBack ? '' : 'ml-0'}`}>
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            {/* Language selector removed for now */}
          </div>
          <CardTitle>Temple Insight 360 Access</CardTitle>
          <CardDescription>
            Sign in to access the comprehensive temple management platform
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pilgrim" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Pilgrim
              </TabsTrigger>
              <TabsTrigger value="authority" className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Authority
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pilgrim" className="space-y-3">
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">Pilgrim Access</Badge>
                <p className="text-sm text-muted-foreground">
                  Book darshan, get crowd updates, and access temple services
                </p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs font-medium text-blue-700 mb-2">Quick Login with Default Credentials</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickLogin('pilgrim')}
                  disabled={loading}
                  className="w-full bg-blue-50 hover:bg-blue-100 border-blue-300"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Demo Pilgrim
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="authority" className="space-y-3">
              <div className="text-center">
                <Badge variant="destructive" className="mb-2">Authority Access</Badge>
                <p className="text-sm text-muted-foreground">
                  Admin access for temple authorities and staff only
                </p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs font-medium text-amber-700 mb-1">Default Credentials:</p>
                <p className="text-xs text-amber-600">Email: admin@temple360.com</p>
                <p className="text-xs text-amber-600 mb-3">Password: Temple@360</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickLogin('authority')}
                  disabled={loading}
                  className="w-full bg-amber-50 hover:bg-amber-100 border-amber-300"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Demo Authority
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-4" />
          
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">Use demo buttons above to try the app with sample data</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('pilgrim')}
                  disabled={loading}
                  className="flex-1"
                >
                  Demo Pilgrim
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('authority')}
                  disabled={loading}
                  className="flex-1"
                >
                  Demo Authority
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading || !formData.email || !formData.password}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto"
                onClick={onSwitchToRegister}
                disabled={loading}
              >
                Create Account
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;