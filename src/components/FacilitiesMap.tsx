import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Droplets, Hospital, Bus, Coffee, Clock, Phone } from 'lucide-react';

const FacilitiesMap = ({ selectedTemple, templeData }) => {
  const mapRef = useRef(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const currentTemple = templeData[selectedTemple];

  // Temple-specific coordinates and facilities
  const templeCoordinates = {
    somnath: { lat: 20.8880, lng: 70.4011, name: 'Somnath Temple' },
    dwarka: { lat: 22.2394, lng: 68.9678, name: 'Dwarkadhish Temple' },
    ambaji: { lat: 24.2420, lng: 72.8347, name: 'Ambaji Temple' },
    pavagadh: { lat: 22.4669, lng: 73.5339, name: 'Kalika Mata Temple' }
  };

  const currentCoords = templeCoordinates[selectedTemple];

  // Temple-specific facilities data
  const facilities = {
    water: [
      { id: 'w1', name: 'Main Water Point', lat: currentCoords.lat + 0.001, lng: currentCoords.lng + 0.001, status: 'Open', hours: '24/7' },
      { id: 'w2', name: 'Parking Water Point', lat: currentCoords.lat - 0.001, lng: currentCoords.lng + 0.002, status: 'Open', hours: '24/7' },
      { id: 'w3', name: 'Queue Water Point', lat: currentCoords.lat + 0.002, lng: currentCoords.lng - 0.001, status: 'Open', hours: '24/7' }
    ],
    medical: [
      { id: 'm1', name: 'Temple Medical Center', lat: currentCoords.lat + 0.0015, lng: currentCoords.lng + 0.0015, status: 'Open', hours: '24/7', contact: '+91-279-XXX-XXXX' },
      { id: 'm2', name: 'First Aid Post', lat: currentCoords.lat - 0.0015, lng: currentCoords.lng - 0.001, status: 'Open', hours: '6:00-22:00', contact: '+91-279-XXX-XXXX' }
    ],
    transport: [
      { id: 't1', name: 'Main Bus Stop', lat: currentCoords.lat - 0.002, lng: currentCoords.lng + 0.0025, status: 'Active', routes: ['State Transport', 'Local Buses'] },
      { id: 't2', name: 'Shuttle Point', lat: currentCoords.lat + 0.0025, lng: currentCoords.lng + 0.002, status: 'Active', routes: ['Temple Shuttle'] },
      { id: 't3', name: 'Main Parking', lat: currentCoords.lat - 0.003, lng: currentCoords.lng, status: 'Available', capacity: '65%' }
    ],
    prasad: [
      { id: 'p1', name: 'Temple Prasad Counter', lat: currentCoords.lat + 0.0005, lng: currentCoords.lng + 0.0005, status: 'Open', hours: '5:00-21:00' },
      { id: 'p2', name: 'Special Prasad Center', lat: currentCoords.lat - 0.0005, lng: currentCoords.lng + 0.001, status: 'Open', hours: '6:00-20:00' }
    ],
    toilets: [
      { id: 'to1', name: 'Main Restroom Complex', lat: currentCoords.lat + 0.001, lng: currentCoords.lng - 0.0015, status: 'Clean', type: 'Male/Female/Disabled' },
      { id: 'to2', name: 'Parking Restrooms', lat: currentCoords.lat - 0.002, lng: currentCoords.lng - 0.001, status: 'Clean', type: 'Male/Female' }
    ]
  };

  useEffect(() => {
    // Load Leaflet CSS and JS
    const loadLeaflet = async () => {
      // Create CSS link
      const leafletCSS = document.createElement('link');
      leafletCSS.rel = 'stylesheet';
      leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(leafletCSS);

      // Create JS script
      const leafletJS = document.createElement('script');
      leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      leafletJS.onload = initializeMap;
      document.head.appendChild(leafletJS);
    };

    const initializeMap = () => {
      if (window.L && mapRef.current) {
        // Initialize map centered on selected temple
        const map = window.L.map(mapRef.current).setView([currentCoords.lat, currentCoords.lng], 15);

        // Add tile layer
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Custom icons
        const createIcon = (color, icon) => {
          return window.L.divIcon({
            className: 'custom-div-icon',
            html: `
              <div style="
                background-color: ${color};
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 14px;
              ">
                ${icon}
              </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });
        };

        // Add markers for each facility type
        Object.entries(facilities).forEach(([type, facilityList]) => {
          const iconConfig = {
            water: { color: '#3b82f6', icon: '💧' },
            medical: { color: '#ef4444', icon: '🏥' },
            transport: { color: '#22c55e', icon: '🚌' },
            prasad: { color: '#f59e0b', icon: '🍽️' },
            toilets: { color: '#8b5cf6', icon: '🚻' }
          };

          facilityList.forEach(facility => {
            const marker = window.L.marker([facility.lat, facility.lng], {
              icon: createIcon(iconConfig[type].color, iconConfig[type].icon)
            }).addTo(map);

            marker.on('click', () => {
              setSelectedFacility({ ...facility, type });
            });

            // Add popup
            const popupContent = `
              <div style="min-width: 200px;">
                <h3 style="margin: 0 0 8px 0; color: ${iconConfig[type].color};">${facility.name}</h3>
                <p style="margin: 4px 0;"><strong>Status:</strong> ${facility.status}</p>
                ${facility.hours ? `<p style="margin: 4px 0;"><strong>Hours:</strong> ${facility.hours}</p>` : ''}
                ${facility.contact ? `<p style="margin: 4px 0;"><strong>Contact:</strong> ${facility.contact}</p>` : ''}
                ${facility.routes ? `<p style="margin: 4px 0;"><strong>Routes:</strong> ${facility.routes.join(', ')}</p>` : ''}
                ${facility.capacity ? `<p style="margin: 4px 0;"><strong>Capacity:</strong> ${facility.capacity}</p>` : ''}
              </div>
            `;
            marker.bindPopup(popupContent);
          });
        });

        setMapLoaded(true);
      }
    };

    loadLeaflet();

    return () => {
      // Cleanup if needed
    };
  }, []);

  const getFacilityIcon = (type) => {
    const icons = {
      water: Droplets,
      medical: Hospital,
      transport: Bus,
      prasad: Coffee,
      toilets: MapPin
    };
    return icons[type] || MapPin;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
      case 'active':
      case 'clean':
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
      case 'full':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-orange-500" />
            Facilities Map - {currentTemple.name}
          </CardTitle>
          <CardDescription>
            Interactive map showing all facilities and services at {currentTemple.location}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2">
              <div 
                ref={mapRef} 
                className="w-full h-96 rounded-lg border border-gray-200 bg-gray-100"
                style={{ minHeight: '400px' }}
              >
                {!mapLoaded && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Loading interactive map...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Facilities List */}
            <div className="space-y-4">
              <h3>Facility Legend</h3>
              <div className="space-y-3">
                {Object.entries(facilities).map(([type, facilityList]) => {
                  const Icon = getFacilityIcon(type);
                  return (
                    <Card key={type} className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-4 w-4 text-orange-500" />
                        <span className="font-medium capitalize">{type.replace('_', ' ')}</span>
                        <Badge variant="outline">{facilityList.length}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        {facilityList.slice(0, 3).map(facility => (
                          <div key={facility.id} className="flex items-center justify-between">
                            <span>{facility.name}</span>
                            <Badge className={getStatusColor(facility.status)}>
                              {facility.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Facility Details */}
          {selectedFacility && (
            <div className="mt-6">
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{selectedFacility.name}</h3>
                    <Badge className={getStatusColor(selectedFacility.status)}>
                      {selectedFacility.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    {selectedFacility.hours && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{selectedFacility.hours}</span>
                      </div>
                    )}
                    
                    {selectedFacility.contact && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{selectedFacility.contact}</span>
                      </div>
                    )}
                    
                    {selectedFacility.routes && (
                      <div className="flex items-center gap-2">
                        <Bus className="h-4 w-4 text-gray-500" />
                        <span>{selectedFacility.routes.join(', ')}</span>
                      </div>
                    )}
                    
                    {selectedFacility.capacity && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>Capacity: {selectedFacility.capacity}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => setSelectedFacility(null)}
                  >
                    Close Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FacilitiesMap;