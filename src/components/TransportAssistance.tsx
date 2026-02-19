import React, { useState, useEffect } from 'react';
import { Bus, Car, MapPin, Clock, Users, Battery, Navigation } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';

const TransportAssistance = ({ selectedTemple, templeData }) => {
  const currentTemple = templeData[selectedTemple];
  
  const [shuttles, setShuttles] = useState([
    {
      id: 'SH001',
      route: `${currentTemple.name} Circuit`,
      currentLocation: 'Main Gate',
      nextStop: 'Main Darshan Hall',
      eta: '5 min',
      capacity: 40,
      occupied: 28,
      type: 'Electric Bus',
      status: 'active'
    },
    {
      id: 'SH002',
      route: 'Parking Shuttle',
      currentLocation: 'Main Parking',
      nextStop: 'Temple Entrance',
      eta: '8 min',
      capacity: 25,
      occupied: 15,
      type: 'E-Auto',
      status: 'active'
    },
    {
      id: 'SH003',
      route: 'Express Route',
      currentLocation: 'Bus Terminal',
      nextStop: 'Temple Complex',
      eta: '12 min',
      capacity: 50,
      occupied: 45,
      type: 'Bus',
      status: 'full'
    }
  ]);

  const [parkingAreas, setParkingAreas] = useState([
    { id: 'PA', name: 'Parking Area A', total: 200, occupied: 120, status: 'available' },
    { id: 'PB', name: 'Parking Area B', total: 150, occupied: 135, status: 'nearly_full' },
    { id: 'PC', name: 'Parking Area C', total: 100, occupied: 100, status: 'full' },
    { id: 'PD', name: 'VIP Parking', total: 50, occupied: 30, status: 'available' }
  ]);

  const [selectedRoute, setSelectedRoute] = useState('');
  const [bookingSeats, setBookingSeats] = useState(1);

  // Simulate real-time shuttle updates
  useEffect(() => {
    const interval = setInterval(() => {
      setShuttles(prev => prev.map(shuttle => ({
        ...shuttle,
        occupied: Math.min(shuttle.capacity, Math.max(0, shuttle.occupied + Math.floor(Math.random() * 6) - 3)),
        eta: Math.max(1, parseInt(shuttle.eta) + Math.floor(Math.random() * 3) - 1) + ' min'
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'full': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getParkingStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'nearly_full': return 'bg-yellow-100 text-yellow-800';
      case 'full': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOccupancyPercentage = (occupied, total) => {
    return Math.round((occupied / total) * 100);
  };

  const handleShuttleBooking = () => {
    if (!selectedRoute) {
      alert('Please select a route');
      return;
    }

    const selectedShuttle = shuttles.find(s => s.route === selectedRoute);
    if (selectedShuttle && (selectedShuttle.occupied + bookingSeats) <= selectedShuttle.capacity) {
      setShuttles(prev => prev.map(shuttle => 
        shuttle.route === selectedRoute 
          ? { ...shuttle, occupied: shuttle.occupied + bookingSeats }
          : shuttle
      ));
      alert(`Successfully booked ${bookingSeats} seat(s) on ${selectedRoute}`);
      setSelectedRoute('');
      setBookingSeats(1);
    } else {
      alert('Not enough seats available on this shuttle');
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Shuttle Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bus className="h-5 w-5 text-orange-500" />
            Live Shuttle Tracking - {currentTemple.name}
          </CardTitle>
          <CardDescription>Real-time location and availability of shuttle services at {currentTemple.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {shuttles.map((shuttle) => (
              <Card key={shuttle.id} className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {shuttle.type === 'Electric Bus' && <Battery className="h-4 w-4 text-green-500" />}
                          {shuttle.type === 'E-Auto' && <Car className="h-4 w-4 text-blue-500" />}
                          {shuttle.type === 'Bus' && <Bus className="h-4 w-4 text-gray-500" />}
                          <h3 className="font-medium">{shuttle.route}</h3>
                        </div>
                        <Badge className={getStatusColor(shuttle.status)}>
                          {shuttle.status}
                        </Badge>
                        <Badge variant="outline">{shuttle.id}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>At: {shuttle.currentLocation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Navigation className="h-4 w-4 text-gray-500" />
                          <span>Next: {shuttle.nextStop}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>ETA: {shuttle.eta}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:w-48">
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <span>Occupancy:</span>
                        <span>{shuttle.occupied}/{shuttle.capacity}</span>
                      </div>
                      <Progress 
                        value={getOccupancyPercentage(shuttle.occupied, shuttle.capacity)} 
                        className="h-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {shuttle.capacity - shuttle.occupied} seats available
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shuttle Booking */}
      <Card>
        <CardHeader>
          <CardTitle>Book Shuttle Seats</CardTitle>
          <CardDescription>Reserve your seats on upcoming shuttles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Route</label>
              <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose shuttle route" />
                </SelectTrigger>
                <SelectContent>
                  {shuttles.filter(s => s.status === 'active').map((shuttle) => (
                    <SelectItem key={shuttle.route} value={shuttle.route}>
                      {shuttle.route} - {shuttle.capacity - shuttle.occupied} seats left
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Seats</label>
              <Select value={bookingSeats.toString()} onValueChange={(value) => setBookingSeats(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Seat' : 'Seats'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button onClick={handleShuttleBooking} className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Book Seats
              </Button>
            </div>
          </div>
          
          <Alert className="bg-blue-50 border-blue-200">
            <Clock className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              Shuttle bookings are valid for the next departure. Please arrive at the stop 5 minutes early.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Parking Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-orange-500" />
            Parking Availability
          </CardTitle>
          <CardDescription>Real-time parking space availability across all areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parkingAreas.map((area) => (
              <Card key={area.id} className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{area.name}</h3>
                    <Badge className={getParkingStatusColor(area.status)}>
                      {area.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Occupied:</span>
                      <span>{area.occupied}/{area.total}</span>
                    </div>
                    <Progress 
                      value={getOccupancyPercentage(area.occupied, area.total)} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{area.total - area.occupied} spaces free</span>
                      <span>{getOccupancyPercentage(area.occupied, area.total)}% full</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transport Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Transport Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Shuttle Services</h4>
              <ul className="text-sm space-y-2 text-gray-600">
                <li>• Shuttles run every 10-15 minutes during peak hours</li>
                <li>• Priority seating for elderly and disabled pilgrims</li>
                <li>• Free shuttle service for all registered pilgrims</li>
                <li>• Last shuttle departs 30 minutes after temple closing</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Parking Information</h4>
              <ul className="text-sm space-y-2 text-gray-600">
                <li>• Parking fees: ₹20 for 2-wheelers, ₹50 for 4-wheelers</li>
                <li>• VIP parking available for ₹200 (advance booking required)</li>
                <li>• Security provided 24/7 in all parking areas</li>
                <li>• Electric vehicle charging stations available</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransportAssistance;