import React, { useState, useEffect } from 'react';
import { QrCode, Clock, MapPin, Users, Calendar, CheckCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import QRCodeDisplay from './QRCodeDisplay';
import { bookingsApi, useApi } from '../services/api';
import { toast } from 'sonner';
import { Language, getTranslation } from '../utils/translations';

interface MyBookingsProps {
  bookings?: any[];
  language?: Language;
}

const MyBookings: React.FC<MyBookingsProps> = ({ bookings: initialBookings = [], language = 'en' }) => {
  const t = (key: string) => getTranslation(language, key);
  const [bookings, setBookings] = useState(initialBookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const { loading, execute } = useApi();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Load bookings from localStorage (for pilgrim mode without auth)
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      // For development/pilgrim mode, use localStorage
      const storedBookings = JSON.parse(localStorage.getItem('pilgrim_bookings') || '[]');
      setBookings(storedBookings);
    } catch (error) {
      console.error('Failed to load bookings:', error);
      toast.error('Failed to load bookings');
    }
  };

  const getTimeUntilSlot = (booking) => {
    const bookingDate = new Date(booking.booking_date);
    const [startTime] = booking.time_slot.split('-');
    const [hours, minutes] = startTime.trim().split(':').map(Number);
    
    const slotTime = new Date(bookingDate);
    slotTime.setHours(hours, minutes, 0, 0);
    
    const timeDiff = slotTime - currentTime;
    
    if (timeDiff < 0) {
      return { expired: true, text: 'Slot Expired' };
    }
    
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (daysLeft > 0) {
      return { expired: false, text: `${daysLeft}d ${hoursLeft}h remaining` };
    } else if (hoursLeft > 0) {
      return { expired: false, text: `${hoursLeft}h ${minutesLeft}m remaining` };
    } else if (minutesLeft > 0) {
      return { expired: false, text: `${minutesLeft}m remaining` };
    } else {
      return { expired: false, text: 'Starting soon!' };
    }
  };

  const handleShowQRCode = (booking) => {
    setSelectedBooking(booking);
    setShowQRCode(true);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      // Update booking status in localStorage
      const storedBookings = JSON.parse(localStorage.getItem('pilgrim_bookings') || '[]');
      const updatedBookings = storedBookings.map(booking => 
        booking.booking_id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      );
      localStorage.setItem('pilgrim_bookings', JSON.stringify(updatedBookings));
      
      toast.success('Booking cancelled successfully');
      await loadBookings(); // Refresh bookings
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading && bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-500" />
            My Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading your bookings...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              My Bookings
            </div>
            <Button variant="outline" size="sm" onClick={loadBookings} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </CardTitle>
          <CardDescription>Your darshan token bookings will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg text-gray-600 mb-2">No bookings yet</h3>
            <p className="text-sm text-gray-500">Book your first darshan token to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              My Bookings
            </div>
            <Button variant="outline" size="sm" onClick={loadBookings} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </CardTitle>
          <CardDescription>
            {bookings.length} active booking{bookings.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => {
              const timeInfo = getTimeUntilSlot(booking);
              
              return (
                <Card key={booking.id} className="border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Booking Details */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">
                            {booking.temple_name} - {booking.zone}
                          </h3>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status === 'confirmed' ? '✓ Confirmed' : booking.status.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>{formatDate(booking.booking_date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{booking.time_slot}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span>{booking.number_of_people} {booking.number_of_people === 1 ? 'person' : 'people'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-gray-500" />
                            <span>ID: {booking.booking_id}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>Pilgrim: {booking.pilgrim_name}</span>
                        </div>
                        
                        {/* Countdown Timer */}
                        <Alert className={timeInfo.expired ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}>
                          <AlertCircle className={`h-4 w-4 ${timeInfo.expired ? 'text-red-600' : 'text-blue-600'}`} />
                          <AlertDescription>
                            <strong>
                              {timeInfo.expired ? 'Booking Expired' : 'Time Until Darshan:'}
                            </strong> {timeInfo.text}
                          </AlertDescription>
                        </Alert>
                      </div>
                      
                      {/* QR Code Preview */}
                      <div className="flex flex-col items-center space-y-2">
                        <div className="bg-white p-2 rounded-lg border-2 border-gray-200">
                          {booking.qr_code_url ? (
                            <img 
                              src={booking.qr_code_url} 
                              alt="QR Code Preview" 
                              className="w-20 h-20 object-contain"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded">
                              <QrCode className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => handleShowQRCode(booking)}
                        >
                          <QrCode className="h-3 w-3 mr-1" />
                          View QR
                        </Button>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="mt-4 flex gap-2">
                      {booking.status === 'confirmed' && !timeInfo.expired && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleCancelBooking(booking.booking_id)}
                          disabled={loading}
                        >
                          Cancel Booking
                        </Button>
                      )}
                    </div>
                    
                    {/* Important Instructions */}
                    {!timeInfo.expired && booking.status === 'confirmed' && (
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                          <strong>Remember:</strong> Arrive 15 minutes early • Carry valid ID • 
                          Keep QR code ready • Follow dress code
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* QR Code Modal */}
      {selectedBooking && (
        <QRCodeDisplay
          booking={selectedBooking}
          isOpen={showQRCode}
          onClose={() => {
            setShowQRCode(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </>
  );
};

export default MyBookings;