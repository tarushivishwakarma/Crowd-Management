import React from 'react';
import { Activity, Users, AlertTriangle, TrendingUp, Clock, Shield, Eye, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import TempleSelector from '../TempleSelector';

const AuthorityDashboard = ({ templeData, selectedTemple, onTempleChange, events }) => {
  const currentTemple = templeData[selectedTemple];
  const crowdData = currentTemple.zones;

  // Calculate statistics
  const totalCrowdLevel = Math.round(
    Object.values(crowdData).reduce((sum, zone) => sum + zone.density, 0) / 4
  );
  
  const criticalZones = Object.values(crowdData).filter(zone => zone.status === 'critical').length;
  const highAlertZones = Object.values(crowdData).filter(zone => zone.status === 'high').length;
  
  const todayFootfall = Math.floor(Math.random() * 5000) + 15000; // Simulated data
  const weeklyFootfall = todayFootfall * 7 + Math.floor(Math.random() * 10000);

  // Recent activity from events
  const recentAlerts = events.filter(event => event.type === 'emergency').slice(0, 3);

  // System status
  const systemStatus = {
    cameras: { active: 24, total: 28, status: 'operational' },
    sensors: { active: 45, total: 48, status: 'operational' },
    staff: { present: 87, total: 95, status: 'adequate' },
    facilities: { operational: 31, total: 35, status: 'good' }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'low': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'operational': case 'good': case 'adequate': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Temple Selection */}
      <TempleSelector 
        templeData={templeData}
        selectedTemple={selectedTemple}
        onTempleChange={onTempleChange}
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Crowd Level</p>
                <p className="text-3xl font-bold text-gray-900">{totalCrowdLevel}%</p>
                <p className="text-xs text-gray-500 mt-1">
                  {totalCrowdLevel > 70 ? 'High' : totalCrowdLevel > 40 ? 'Moderate' : 'Low'} Density
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <Progress value={totalCrowdLevel} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-3xl font-bold text-gray-900">{criticalZones + highAlertZones}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {criticalZones} Critical, {highAlertZones} High
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-3 flex gap-1">
              {criticalZones > 0 && (
                <Badge className="bg-red-100 text-red-800 text-xs">
                  {criticalZones} Critical
                </Badge>
              )}
              {highAlertZones > 0 && (
                <Badge className="bg-orange-100 text-orange-800 text-xs">
                  {highAlertZones} High
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Footfall</p>
                <p className="text-3xl font-bold text-gray-900">{todayFootfall.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">↗ +12% from yesterday</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Status</p>
                <p className="text-3xl font-bold text-green-600">98.5%</p>
                <p className="text-xs text-gray-500 mt-1">All systems operational</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Zone Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-violet-600" />
            Live Zone Monitoring - {currentTemple.name}
          </CardTitle>
          <CardDescription>Real-time crowd density and status across all temple zones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(crowdData).map(([zoneId, zone]) => (
              <Card key={zoneId} className="border-l-4 border-l-violet-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{zone.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(zone.status)} animate-pulse`}></div>
                      <Badge variant="outline" className={getStatusBadgeColor(zone.status)}>
                        {zone.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Crowd Density</span>
                      <span className="font-medium">{Math.round(zone.density)}%</span>
                    </div>
                    <Progress value={zone.density} className="h-2" />
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Wait Time</span>
                      <span>{zone.waitTime}</span>
                    </div>
                  </div>

                  {zone.status === 'critical' && (
                    <div className="mt-3 p-2 bg-red-50 rounded border border-red-200">
                      <p className="text-xs text-red-700 font-medium">
                        ⚠ Immediate intervention required
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-violet-600" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(systemStatus).map(([system, data]) => (
                <div key={system} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="font-medium capitalize">{system}</h5>
                    <p className="text-sm text-gray-600">
                      {data.active}/{data.total} Active
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={(data.active / data.total) * 100} className="w-16 h-2" />
                    <Badge className={getStatusBadgeColor(data.status)}>
                      {data.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-violet-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    {event.type === 'emergency' && (
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                    )}
                    {event.type === 'crowd' && (
                      <Users className="h-4 w-4 text-orange-500 mt-0.5" />
                    )}
                    {event.type === 'booking' && (
                      <Activity className="h-4 w-4 text-blue-500 mt-0.5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{event.message}</p>
                    <p className="text-xs text-gray-500">{event.timestamp}</p>
                  </div>
                </div>
              ))}
              
              {events.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthorityDashboard;