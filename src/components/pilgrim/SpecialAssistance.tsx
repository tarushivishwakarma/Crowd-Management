import React, { useState } from 'react';
import { Heart, Users, Accessibility, Baby, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { Language } from '../../utils/translations';

interface SpecialAssistanceProps {
  selectedTemple: string;
  templeData: any;
  language?: Language;
}

const SpecialAssistance: React.FC<SpecialAssistanceProps> = ({ selectedTemple, templeData, language = 'en' }) => {
  const [selectedService, setSelectedService] = useState('');
  const [requestForm, setRequestForm] = useState({
    name: '',
    phone: '',
    assistanceType: '',
    requirements: '',
    preferredTime: '',
    groupSize: '1'
  });

  const currentTemple = templeData[selectedTemple];

  // Special assistance services available
  const assistanceServices = {
    elderly: {
      title: 'Elderly Assistance',
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      services: [
        'Wheelchair accessibility',
        'Priority darshan queue',
        'Medical assistance on standby',
        'Rest areas with seating',
        'Escort service if needed',
        'Special entry/exit points'
      ],
      contactNumber: '+91-279-ELDER-01'
    },
    disabled: {
      title: 'Differently Abled Support',
      icon: <Accessibility className="h-6 w-6" />,
      color: 'bg-green-100 text-green-800 border-green-200',
      services: [
        'Wheelchair rental service',
        'Accessible pathways guidance',
        'Sign language interpretation',
        'Braille information boards',
        'Audio guidance system',
        'Companion assistance'
      ],
      contactNumber: '+91-279-ACCESSIBL'
    },
    children: {
      title: 'Child & Family Care',
      icon: <Baby className="h-6 w-6" />,
      color: 'bg-pink-100 text-pink-800 border-pink-200',
      services: [
        'Child identification wristbands',
        'Family priority lanes',
        'Lost child assistance',
        'Child-friendly facilities',
        'Stroller parking areas',
        'Feeding/nursing rooms'
      ],
      contactNumber: '+91-279-FAMILY-01'
    },
    medical: {
      title: 'Medical Support',
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-red-100 text-red-800 border-red-200',
      services: [
        '24/7 medical station',
        'First aid assistance',
        'Emergency ambulance',
        'Medicine availability',
        'Doctor on call',
        'Health monitoring'
      ],
      contactNumber: '+91-279-MEDICAL-1'
    }
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();

    if (!requestForm.name || !requestForm.phone || !requestForm.assistanceType) {
      toast.error('Please fill all required fields');
      return;
    }

    // Simulate request submission
    toast.success('Special assistance request submitted successfully! You will be contacted within 30 minutes.');

    // Reset form
    setRequestForm({
      name: '',
      phone: '',
      assistanceType: '',
      requirements: '',
      preferredTime: '',
      groupSize: '1'
    });
    setSelectedService('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-600" />
            Special Assistance Services - {currentTemple.name}
          </CardTitle>
          <CardDescription>
            We ensure every pilgrim has a comfortable and safe darshan experience
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Service Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(assistanceServices).map(([key, service]) => (
          <Card
            key={key}
            className={`hover:shadow-md transition-all cursor-pointer ${selectedService === key ? 'ring-2 ring-orange-500 shadow-lg' : ''
              }`}
            onClick={() => setSelectedService(selectedService === key ? '' : key)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${service.color}`}>
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {service.services.slice(0, 3).map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {item}
                      </li>
                    ))}
                    {service.services.length > 3 && (
                      <li className="text-orange-600 font-medium">
                        +{service.services.length - 3} more services
                      </li>
                    )}
                  </ul>

                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-orange-600" />
                    <span className="font-medium">{service.contactNumber}</span>
                  </div>
                </div>
              </div>

              {selectedService === key && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Complete Services:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.services.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Request Form */}
      <Card>
        <CardHeader>
          <CardTitle>Request Special Assistance</CardTitle>
          <CardDescription>
            Fill out this form to request personalized assistance for your visit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRequestSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={requestForm.name}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={requestForm.phone}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91-XXXXX-XXXXX"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assistanceType">Assistance Type *</Label>
                <Select
                  value={requestForm.assistanceType}
                  onValueChange={(value) => setRequestForm(prev => ({ ...prev, assistanceType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select assistance type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elderly">Elderly Assistance</SelectItem>
                    <SelectItem value="disabled">Differently Abled Support</SelectItem>
                    <SelectItem value="children">Child & Family Care</SelectItem>
                    <SelectItem value="medical">Medical Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="groupSize">Group Size</Label>
                <Select
                  value={requestForm.groupSize}
                  onValueChange={(value) => setRequestForm(prev => ({ ...prev, groupSize: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'person' : 'people'}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime">Preferred Visit Time</Label>
              <Select
                value={requestForm.preferredTime}
                onValueChange={(value) => setRequestForm(prev => ({ ...prev, preferredTime: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="early-morning">Early Morning (5:00 - 7:00 AM)</SelectItem>
                  <SelectItem value="morning">Morning (7:00 - 11:00 AM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (11:00 - 4:00 PM)</SelectItem>
                  <SelectItem value="evening">Evening (4:00 - 8:00 PM)</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Special Requirements</Label>
              <Textarea
                id="requirements"
                value={requestForm.requirements}
                onChange={(e) => setRequestForm(prev => ({ ...prev, requirements: e.target.value }))}
                placeholder="Please describe any specific needs or requirements..."
                className="min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
              size="lg"
            >
              Submit Assistance Request
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Phone className="h-6 w-6 text-orange-600 mt-1" />
            <div>
              <h3 className="font-semibold text-orange-900 mb-2">24/7 Emergency Assistance</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800">Medical Emergency</Badge>
                  <span>108 | +91-279-EMERGENCY</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">Temple Security</Badge>
                  <span>100 | +91-279-SECURITY</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">Special Assistance</Badge>
                  <span>+91-279-ASSIST-24</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Alert */}
      <Alert className="bg-blue-50 border-blue-200">
        <MapPin className="h-4 w-4 text-blue-600" />
        <AlertDescription>
          <strong>Location Services:</strong> All assistance services are available at dedicated counters
          near the main entrance. Look for the orange "Special Assistance" signage or ask any temple volunteer.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SpecialAssistance;