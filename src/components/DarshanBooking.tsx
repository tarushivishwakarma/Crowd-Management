import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner';
import TempleSelector from './TempleSelector';
import { bookingsApi, useApi } from '../services/api';
import { Language, getTranslation } from '../utils/translations';

interface DarshanBookingProps {
  onBooking: (bookingData: any) => void;
  templeData: any;
  selectedTemple: string;
  onTempleChange: (temple: string) => void;
  language?: Language;
}

const DarshanBooking: React.FC<DarshanBookingProps> = ({ onBooking, templeData, selectedTemple, onTempleChange, language = 'en' }) => {
  const t = (key: string) => getTranslation(language, key);
  const { loading, execute } = useApi();
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [groupSize, setGroupSize] = useState('1');
  const [pilgramName, setPilgramName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  
  const currentTemple = templeData[selectedTemple];
  const crowdData = currentTemple.zones;

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Load available slots when temple or date changes
  useEffect(() => {
    if (selectedTemple && selectedDate) {
      loadAvailableSlots();
    }
  }, [selectedTemple, selectedDate]);

  const loadAvailableSlots = async () => {
    if (!selectedDate) return;
    
    setLoadingSlots(true);
    try {
      const slots = await execute(() => bookingsApi.getAvailableSlots(selectedTemple, selectedDate));
      setAvailableSlots(slots || []);
    } catch (error) {
      console.error('Failed to load slots:', error);
      toast.error('Failed to load available slots');
    } finally {
      setLoadingSlots(false);
    }
  };

  const getZoneRecommendation = (zone) => {
    const data = crowdData[zone];
    if (!data) return null;
    
    if (data.density < 30) return { text: t('booking.recommended'), color: 'bg-green-100 text-green-800' };
    if (data.density < 60) return { text: t('booking.moderateWait'), color: 'bg-yellow-100 text-yellow-800' };
    if (data.density < 80) return { text: t('booking.longWait'), color: 'bg-orange-100 text-orange-800' };
    return { text: t('booking.veryCrowded'), color: 'bg-red-100 text-red-800' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedZone || !selectedTime || !pilgramName || !phoneNumber || !selectedDate) {
      toast.error(t('booking.pleaseFillAllFields'));
      return;
    }

    try {
      const bookingData = {
        temple_id: selectedTemple,
        temple_name: currentTemple.name,
        zone: selectedZone,
        booking_date: selectedDate,
        time_slot: selectedTime,
        number_of_people: parseInt(groupSize),
        pilgrim_name: pilgramName,
        pilgrim_phone: phoneNumber,
      };

      // Create booking and store in localStorage for pilgrim mode
      const newBooking = {
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

      // Store in localStorage
      const existingBookings = JSON.parse(localStorage.getItem('pilgrim_bookings') || '[]');
      existingBookings.push(newBooking);
      localStorage.setItem('pilgrim_bookings', JSON.stringify(existingBookings));
      
      toast.success(t('booking.darshanBookingConfirmed'));
      
      // Reset form
      setSelectedZone('');
      setSelectedTime('');
      setGroupSize('1');
      setPilgramName('');
      setPhoneNumber('');
      
      // Refresh available slots
      await loadAvailableSlots();
      
      // Call parent callback if provided
      if (onBooking) {
        onBooking(newBooking);
      }
    } catch (error) {
      toast.error('Failed to create booking. Please try again.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-orange-500" />
          {t('booking.bookDarshanToken')}
        </CardTitle>
        <CardDescription>
          {t('pilgrim.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Temple Selection */}
        <div className="mb-6">
          <TempleSelector 
            templeData={templeData}
            selectedTemple={selectedTemple}
            onTempleChange={onTempleChange}
          />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Zone Selection */}
          <div className="space-y-3">
            <Label htmlFor="zone">Select Darshan Zone *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(crowdData).map(([zoneKey, data]) => {
                const zoneName = data.name;
                const recommendation = getZoneRecommendation(zoneKey);
                
                return (
                  <Card 
                    key={zoneKey}
                    className={`cursor-pointer transition-all ${
                      selectedZone === zoneKey 
                        ? 'ring-2 ring-orange-500 bg-orange-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedZone(zoneKey)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{zoneName}</h3>
                        {recommendation && (
                          <Badge className={recommendation.color}>
                            {recommendation.text}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Wait: {data.waitTime}</span>
                        <span>Density: {Math.round(data.density)}%</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-3">
            <Label htmlFor="date">Select Date *</Label>
            <Input
              id="date"
              type="date"
              min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // Tomorrow
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          {/* Time Slot Selection */}
          <div className="space-y-3">
            <Label htmlFor="time">Select Time Slot *</Label>
            {loadingSlots ? (
              <div className="p-4 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Loading available slots...</p>
              </div>
            ) : (
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your preferred time" />
                </SelectTrigger>
                <SelectContent>
                  {availableSlots.map((slot) => (
                    <SelectItem 
                      key={slot.time_slot} 
                      value={slot.time_slot}
                      disabled={!slot.available}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {slot.time_slot}
                        </div>
                        <div className="text-xs text-muted-foreground ml-4">
                          {slot.available ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {slot.capacity - slot.booked} left
                            </Badge>
                          ) : (
                            <Badge variant="destructive">Full</Badge>
                          )}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Group Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="groupSize">Group Size</Label>
              <Select value={groupSize} onValueChange={setGroupSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9,10].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {size} {size === 1 ? 'Person' : 'People'}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Pilgrim Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Lead Pilgrim Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter full name"
              value={pilgramName}
              onChange={(e) => setPilgramName(e.target.value)}
              required
            />
          </div>

          {/* Booking Summary */}
          {selectedZone && selectedTime && selectedDate && (
            <Alert className="bg-blue-50 border-blue-200">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                <strong>Booking Summary:</strong> {crowdData[selectedZone]?.name} at {currentTemple.name}
                <br />
                Date: {new Date(selectedDate).toLocaleDateString('en-IN')} | Time: {selectedTime} for {groupSize} {groupSize === '1' ? 'person' : 'people'}
                <br />
                <span className="text-sm text-gray-600">
                  Expected wait time: {crowdData[selectedZone]?.waitTime}
                </span>
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            disabled={loading || loadingSlots || !selectedZone || !selectedTime || !selectedDate || !pilgramName || !phoneNumber}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating Booking...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-5 w-5" />
                Confirm Darshan Booking
              </>
            )}
          </Button>
        </form>

        {/* Important Notes */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Important Guidelines:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Please arrive 15 minutes before your scheduled time</li>
            <li>• Carry a valid ID proof and your QR code</li>
            <li>• Follow dress code and maintain silence in darshan areas</li>
            <li>• Mobile phones should be on silent mode</li>
            <li>• Booking can be cancelled up to 1 hour before scheduled time</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DarshanBooking;