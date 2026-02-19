import React, { useState } from 'react';
import { AlertTriangle, Bell, CheckCircle, Clock, Users, Send, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { toast } from 'sonner@2.0.3';

const AlertsManagement = ({ templeData, selectedTemple, events, setEvents }) => {
  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: 1,
      type: 'crowd',
      severity: 'high',
      location: 'Main Darshan Hall',
      message: 'Crowd density exceeded 85% threshold',
      timestamp: new Date(Date.now() - 300000),
      status: 'active',
      assignedTo: 'Security Team A'
    },
    {
      id: 2,
      type: 'medical',
      severity: 'medium',
      location: 'Pradakshina Path',
      message: 'Medical assistance requested',
      timestamp: new Date(Date.now() - 600000),
      status: 'resolved',
      assignedTo: 'Medical Team'
    }
  ]);

  const [newAlert, setNewAlert] = useState({
    type: '',
    severity: '',
    location: '',
    message: '',
    assignTo: ''
  });

  const currentTemple = templeData[selectedTemple];

  const alertTypes = {
    crowd: { label: 'Crowd Management', color: 'bg-orange-100 text-orange-800', icon: Users },
    medical: { label: 'Medical Emergency', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
    security: { label: 'Security Alert', color: 'bg-purple-100 text-purple-800', icon: AlertTriangle },
    maintenance: { label: 'Maintenance Issue', color: 'bg-blue-100 text-blue-800', icon: AlertTriangle },
    weather: { label: 'Weather Alert', color: 'bg-gray-100 text-gray-800', icon: AlertTriangle }
  };

  const severityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800'
  };

  const statusColors = {
    active: 'bg-red-100 text-red-800',
    acknowledged: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800'
  };

  const handleCreateAlert = () => {
    if (!newAlert.type || !newAlert.severity || !newAlert.message) {
      toast.error('Please fill all required fields');
      return;
    }

    const alert = {
      id: Date.now(),
      ...newAlert,
      timestamp: new Date(),
      status: 'active'
    };

    setActiveAlerts(prev => [alert, ...prev]);
    
    // Add to events log
    const event = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      message: `🚨 Alert Created: ${newAlert.type} - ${newAlert.message}`,
      type: 'emergency'
    };
    setEvents(prev => [event, ...prev.slice(0, 9)]);

    setNewAlert({ type: '', severity: '', location: '', message: '', assignTo: '' });
    toast.success('Alert created and dispatched successfully');
  };

  const handleAlertAction = (alertId, action) => {
    setActiveAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: action }
          : alert
      )
    );

    const event = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      message: `Alert ${action}: ID ${alertId}`,
      type: 'alert'
    };
    setEvents(prev => [event, ...prev.slice(0, 9)]);

    toast.success(`Alert ${action} successfully`);
  };

  const activeCount = activeAlerts.filter(alert => alert.status === 'active').length;
  const criticalCount = activeAlerts.filter(alert => alert.severity === 'critical' && alert.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-3xl font-bold text-red-600">{activeCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                <p className="text-3xl font-bold text-red-700">{criticalCount}</p>
              </div>
              <Bell className="h-8 w-8 text-red-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                <p className="text-3xl font-bold text-green-600">12</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response</p>
                <p className="text-3xl font-bold text-blue-600">3.2m</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create New Alert */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-violet-600" />
            Create New Alert
          </CardTitle>
          <CardDescription>Manually create and dispatch alerts to response teams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Alert Type *</Label>
              <Select value={newAlert.type} onValueChange={(value) => setNewAlert(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select alert type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(alertTypes).map(([key, type]) => (
                    <SelectItem key={key} value={key}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Severity Level *</Label>
              <Select value={newAlert.severity} onValueChange={(value) => setNewAlert(prev => ({ ...prev, severity: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Select value={newAlert.location} onValueChange={(value) => setNewAlert(prev => ({ ...prev, location: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(currentTemple.zones).map((zone) => (
                    <SelectItem key={zone.name} value={zone.name}>{zone.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Assign To</Label>
              <Select value={newAlert.assignTo} onValueChange={(value) => setNewAlert(prev => ({ ...prev, assignTo: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Security Team A">Security Team A</SelectItem>
                  <SelectItem value="Security Team B">Security Team B</SelectItem>
                  <SelectItem value="Medical Team">Medical Team</SelectItem>
                  <SelectItem value="Maintenance Team">Maintenance Team</SelectItem>
                  <SelectItem value="Crowd Control">Crowd Control</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Alert Message *</Label>
              <Textarea
                value={newAlert.message}
                onChange={(e) => setNewAlert(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Describe the alert details..."
                className="min-h-[80px]"
              />
            </div>
          </div>

          <Button 
            onClick={handleCreateAlert}
            className="mt-4 bg-violet-600 hover:bg-violet-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Create & Dispatch Alert
          </Button>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-violet-600" />
            Alert Management - {currentTemple.name}
          </CardTitle>
          <CardDescription>Monitor and manage all active and recent alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeAlerts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No Active Alerts</h3>
                <p className="text-sm text-gray-500">All systems are operating normally</p>
              </div>
            ) : (
              activeAlerts.map((alert) => {
                const AlertIcon = alertTypes[alert.type]?.icon || AlertTriangle;
                
                return (
                  <Card key={alert.id} className="border-l-4 border-l-violet-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-violet-100 rounded-lg">
                            <AlertIcon className="h-4 w-4 text-violet-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={alertTypes[alert.type]?.color || 'bg-gray-100 text-gray-800'}>
                                {alertTypes[alert.type]?.label || alert.type}
                              </Badge>
                              <Badge className={severityColors[alert.severity]}>
                                {alert.severity.toUpperCase()}
                              </Badge>
                              <Badge className={statusColors[alert.status]}>
                                {alert.status.toUpperCase()}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-gray-900">{alert.message}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span>📍 {alert.location}</span>
                              <span>👥 {alert.assignedTo}</span>
                              <span>🕒 {alert.timestamp.toLocaleTimeString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        {alert.status === 'active' && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAlertAction(alert.id, 'acknowledged')}
                            >
                              Acknowledge
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAlertAction(alert.id, 'resolved')}
                              className="text-green-600 border-green-200 hover:bg-green-50"
                            >
                              Resolve
                            </Button>
                          </div>
                        )}
                      </div>

                      {alert.severity === 'critical' && alert.status === 'active' && (
                        <Alert className="bg-red-50 border-red-200 mt-3">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-700">
                            <strong>Critical Alert:</strong> Immediate attention required. All available resources should be mobilized.
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsManagement;