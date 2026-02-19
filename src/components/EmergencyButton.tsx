import React, { useState } from 'react';
import { AlertTriangle, Phone, MapPin, X, Heart, Shield, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Language, getTranslation } from '../utils/translations';

interface EmergencyButtonProps {
  onEmergency: (emergencyData: any) => void;
  language?: Language;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onEmergency, language = 'en' }) => {
  const t = (key: string) => getTranslation(language, key);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emergencyTypes = [
    {
      id: 'medical',
      name: 'Medical Emergency',
      icon: Heart,
      color: 'bg-red-500 hover:bg-red-600',
      description: 'Health issues, injuries, or medical assistance needed'
    },
    {
      id: 'security',
      name: 'Security Issue',
      icon: Shield,
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'Safety concerns, suspicious activity, or security help'
    },
    {
      id: 'lost',
      name: 'Lost & Found',
      icon: Search,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Missing person, lost items, or need directions'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedType || !location || !contactNumber) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const emergencyData = {
        type: selectedType,
        location,
        description,
        contactNumber,
        timestamp: new Date().toISOString(),
        userId: 'user_' + Date.now() // Mock user ID
      };

      onEmergency(emergencyData);
      
      // Reset form
      setSelectedType('');
      setLocation('');
      setDescription('');
      setContactNumber('');
      setIsOpen(false);
      
    } catch (error) {
      alert('Failed to submit emergency request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`);
        },
        (error) => {
          setLocation('Location unavailable - please describe your location');
        }
      );
    } else {
      setLocation('GPS not supported - please describe your location');
    }
  };

  return (
    <>
      {/* Floating SOS Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 shadow-lg border-4 border-white animate-pulse"
        size="lg"
      >
        <div className="flex flex-col items-center">
          <AlertTriangle className="h-6 w-6 text-white" />
          <span className="text-xs text-white font-bold">SOS</span>
        </div>
      </Button>

      {/* Emergency Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Emergency Assistance
            </DialogTitle>
            <DialogDescription>
              Select the type of emergency and provide details. Help will be dispatched immediately.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Emergency Type Selection */}
            <div className="space-y-3">
              <Label>Select Emergency Type *</Label>
              <div className="grid gap-2">
                {emergencyTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <Card
                      key={type.id}
                      className={`cursor-pointer transition-all ${
                        selectedType === type.id
                          ? 'ring-2 ring-red-500 bg-red-50'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedType(type.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${type.color} text-white`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{type.name}</h4>
                            <p className="text-xs text-gray-600">{type.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Location Input */}
            <div className="space-y-2">
              <Label htmlFor="location">Your Location *</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="Describe your current location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={getCurrentLocation}
                  className="px-3"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number *</Label>
              <Input
                id="contact"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Additional Details</Label>
              <Textarea
                id="description"
                placeholder="Briefly describe the emergency situation..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Emergency Contacts Display */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-3">
                <h4 className="font-medium mb-2">Emergency Contacts</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span>🚑 Medical Emergency:</span>
                    <span className="font-medium">108</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>👮 Security/Police:</span>
                    <span className="font-medium">100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>🔥 Fire Emergency:</span>
                    <span className="font-medium">101</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-red-500 hover:bg-red-600"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Send Alert
                  </div>
                )}
              </Button>
            </div>
          </form>

          {/* Important Notice */}
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-800">
              <strong>Important:</strong> This system is for genuine emergencies only. 
              Misuse of emergency services may result in penalties. For non-urgent matters, 
              please use the Help section or contact regular support channels.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyButton;