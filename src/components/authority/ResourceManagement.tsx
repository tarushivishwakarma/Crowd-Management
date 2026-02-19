import React, { useState } from 'react';
import { Settings, Users, Camera, Wifi, Battery, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Switch } from '../ui/switch';
import { Alert, AlertDescription } from '../ui/alert';

const ResourceManagement = ({ templeData, selectedTemple, onTempleChange }) => {
  const currentTemple = templeData[selectedTemple];

  // Resource status data
  const [resources, setResources] = useState({
    staff: {
      security: { assigned: 28, required: 30, status: 'adequate', shift: 'Day' },
      medical: { assigned: 8, required: 10, status: 'low', shift: 'Day' },
      cleaning: { assigned: 15, required: 15, status: 'optimal', shift: 'Day' },
      guides: { assigned: 12, required: 15, status: 'low', shift: 'Day' },
      tech: { assigned: 5, required: 5, status: 'optimal', shift: 'Day' }
    },
    equipment: {
      cameras: { operational: 24, total: 28, maintenance: 2, offline: 2 },
      sensors: { operational: 45, total: 48, maintenance: 1, offline: 2 },
      speakers: { operational: 16, total: 18, maintenance: 1, offline: 1 },
      displays: { operational: 12, total: 15, maintenance: 2, offline: 1 }
    },
    facilities: {
      water: { operational: 8, total: 10, status: 'good' },
      toilets: { operational: 6, total: 8, status: 'adequate' },
      medical: { operational: 2, total: 2, status: 'optimal' },
      parking: { operational: 4, total: 5, status: 'good' }
    },
    utilities: {
      power: { status: 'stable', load: 78, backup: 'ready' },
      network: { status: 'stable', speed: 95, connectivity: 'excellent' },
      water: { status: 'normal', pressure: 85, quality: 'good' },
      hvac: { status: 'optimal', temperature: 24, humidity: 55 }
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'bg-green-100 text-green-800';
      case 'good': case 'adequate': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'optimal': case 'good': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'adequate': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'low': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleEquipmentToggle = (category, item) => {
    // Simulate equipment control
    console.log(`Toggling ${category} - ${item}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-violet-600" />
            Resource Management - {currentTemple.name}
          </CardTitle>
          <CardDescription>
            Monitor and manage all temple resources, staff, and equipment
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Staff Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-violet-600" />
            Staff Deployment
          </CardTitle>
          <CardDescription>Current staff allocation and requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(resources.staff).map(([role, data]) => (
              <Card key={role} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium capitalize">{role}</h4>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(data.status)}
                    <Badge className={getStatusColor(data.status)}>
                      {data.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Assigned</span>
                    <span className="font-medium">{data.assigned}/{data.required}</span>
                  </div>
                  <Progress value={(data.assigned / data.required) * 100} className="h-2" />
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Current Shift</span>
                    <span>{data.shift}</span>
                  </div>
                </div>

                {data.status === 'low' && (
                  <Alert className="mt-3 bg-yellow-50 border-yellow-200">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-700 text-xs">
                      Additional {data.required - data.assigned} staff needed
                    </AlertDescription>
                  </Alert>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Equipment Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-violet-600" />
            Equipment & Technology
          </CardTitle>
          <CardDescription>Real-time equipment status and control</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(resources.equipment).map(([equipment, data]) => (
              <Card key={equipment} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium capitalize">{equipment}</h4>
                  <Switch 
                    checked={data.operational > 0}
                    onCheckedChange={() => handleEquipmentToggle('equipment', equipment)}
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-green-600">{data.operational}</div>
                      <div className="text-gray-600">Online</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-yellow-600">{data.maintenance}</div>
                      <div className="text-gray-600">Maintenance</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-red-600">{data.offline}</div>
                      <div className="text-gray-600">Offline</div>
                    </div>
                  </div>
                  
                  <Progress value={(data.operational / data.total) * 100} className="h-2" />
                  
                  <div className="text-center text-sm text-gray-600">
                    {data.operational}/{data.total} Operational ({Math.round((data.operational / data.total) * 100)}%)
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Facilities Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-violet-600" />
            Facility Operations
          </CardTitle>
          <CardDescription>Current status of all temple facilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(resources.facilities).map(([facility, data]) => (
              <Card key={facility} className="p-4 text-center">
                <div className="mb-3">
                  <h4 className="font-medium capitalize mb-2">{facility} Points</h4>
                  <div className="text-2xl font-bold text-violet-600">
                    {data.operational}/{data.total}
                  </div>
                </div>
                
                <Badge className={getStatusColor(data.status)}>
                  {data.status}
                </Badge>
                
                <Progress 
                  value={(data.operational / data.total) * 100} 
                  className="mt-3 h-2" 
                />
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Utilities Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Battery className="h-5 w-5 text-violet-600" />
            Utilities & Infrastructure
          </CardTitle>
          <CardDescription>Real-time monitoring of essential utilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(resources.utilities).map(([utility, data]) => (
              <Card key={utility} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium capitalize">{utility}</h4>
                  <Badge className={getStatusColor(data.status)}>
                    {data.status}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {utility === 'power' && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>Load</span>
                        <span className="font-medium">{data.load}%</span>
                      </div>
                      <Progress value={data.load} className="h-2" />
                      <div className="text-sm text-gray-600">
                        Backup: <span className="font-medium text-green-600">{data.backup}</span>
                      </div>
                    </>
                  )}
                  
                  {utility === 'network' && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>Speed</span>
                        <span className="font-medium">{data.speed}%</span>
                      </div>
                      <Progress value={data.speed} className="h-2" />
                      <div className="text-sm text-gray-600">
                        Quality: <span className="font-medium text-green-600">{data.connectivity}</span>
                      </div>
                    </>
                  )}
                  
                  {utility === 'water' && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>Pressure</span>
                        <span className="font-medium">{data.pressure}%</span>
                      </div>
                      <Progress value={data.pressure} className="h-2" />
                      <div className="text-sm text-gray-600">
                        Quality: <span className="font-medium text-green-600">{data.quality}</span>
                      </div>
                    </>
                  )}
                  
                  {utility === 'hvac' && (
                    <>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">{data.temperature}°C</div>
                          <div className="text-gray-600">Temperature</div>
                        </div>
                        <div>
                          <div className="font-medium">{data.humidity}%</div>
                          <div className="text-gray-600">Humidity</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Emergency controls and system management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-16 flex-col">
              <AlertTriangle className="h-5 w-5 mb-1" />
              Emergency Mode
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Users className="h-5 w-5 mb-1" />
              Call All Staff
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Camera className="h-5 w-5 mb-1" />
              Camera Control
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Wifi className="h-5 w-5 mb-1" />
              System Restart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceManagement;