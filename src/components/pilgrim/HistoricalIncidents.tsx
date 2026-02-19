import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin, Users, TrendingDown, Filter, Calendar, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';

const HistoricalIncidents = ({ selectedTemple, templeData }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('year');

  const currentTemple = templeData[selectedTemple];

  // Historical incident data for temples
  const historicalData = {
    somnath: {
      totalIncidents: 23,
      recentTrend: 'decreasing',
      incidents: [
        {
          id: 1,
          date: '2024-01-15',
          type: 'medical',
          severity: 'minor',
          description: 'Elderly pilgrim felt dizzy during peak hours',
          location: 'Main Darshan Hall',
          crowdLevel: 78,
          resolution: 'First aid provided, pilgrim recovered quickly',
          preventiveMeasures: 'Additional water points installed'
        },
        {
          id: 2,
          date: '2024-02-03',
          type: 'crowd',
          severity: 'moderate',
          description: 'Queue management issue during festival',
          location: 'Garbha Griha entrance',
          crowdLevel: 92,
          resolution: 'Additional staff deployed for crowd control',
          preventiveMeasures: 'Digital queue system implemented'
        },
        {
          id: 3,
          date: '2024-03-10',
          type: 'safety',
          severity: 'minor',
          description: 'Wet floor caused minor slip',
          location: 'Pradakshina Path',
          crowdLevel: 45,
          resolution: 'Area cleaned and dried immediately',
          preventiveMeasures: 'Regular floor monitoring during monsoon'
        }
      ]
    },
    dwarka: {
      totalIncidents: 31,
      recentTrend: 'stable',
      incidents: [
        {
          id: 1,
          date: '2024-01-20',
          type: 'medical',
          severity: 'moderate',
          description: 'Heat exhaustion case during afternoon darshan',
          location: 'Main Darshan Hall',
          crowdLevel: 85,
          resolution: 'Medical team assisted, pilgrim recovered',
          preventiveMeasures: 'Cooling systems enhanced'
        },
        {
          id: 2,
          date: '2024-02-14',
          type: 'crowd',
          severity: 'major',
          description: 'Overcrowding during special pooja',
          location: 'Garbha Griha',
          crowdLevel: 95,
          resolution: 'Temporary entry restrictions implemented',
          preventiveMeasures: 'Pre-booking system made mandatory for special events'
        }
      ]
    },
    ambaji: {
      totalIncidents: 18,
      recentTrend: 'decreasing',
      incidents: [
        {
          id: 1,
          date: '2024-01-25',
          type: 'medical',
          severity: 'minor',
          description: 'Child separation from parents',
          location: 'Temple Complex',
          crowdLevel: 67,
          resolution: 'Security team reunited family within 15 minutes',
          preventiveMeasures: 'Child identification wristbands introduced'
        }
      ]
    },
    pavagadh: {
      totalIncidents: 15,
      recentTrend: 'decreasing',
      incidents: [
        {
          id: 1,
          date: '2024-02-08',
          type: 'transport',
          severity: 'minor',
          description: 'Ropeway temporary shutdown due to weather',
          location: 'Ropeway Station',
          crowdLevel: 58,
          resolution: 'Alternative shuttle service provided',
          preventiveMeasures: 'Weather monitoring system upgraded'
        }
      ]
    }
  };

  const currentData = historicalData[selectedTemple];

  const getIncidentColor = (type) => {
    switch (type) {
      case 'medical': return 'bg-red-100 text-red-800 border-red-200';
      case 'crowd': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'safety': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'transport': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'minor': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'major': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'decreasing': return 'text-green-600';
      case 'stable': return 'text-blue-600';
      case 'increasing': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredIncidents = currentData.incidents.filter(incident => {
    if (selectedFilter === 'all') return true;
    return incident.type === selectedFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-purple-600" />
            Historical Incidents - {currentTemple.name}
          </CardTitle>
          <CardDescription>
            Learn from past incidents to ensure a safe pilgrimage experience
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Incidents (2024)</p>
                <p className="text-2xl font-bold">{currentData.totalIncidents}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Recent Trend</p>
                <p className={`text-lg font-semibold capitalize ${getTrendColor(currentData.recentTrend)}`}>
                  {currentData.recentTrend}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Safety Score</p>
                <p className="text-2xl font-bold text-green-600">8.7/10</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-purple-600" />
              <span className="font-medium">Filters:</span>
            </div>
            
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Incident Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="crowd">Crowd Management</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Incidents List */}
      <div className="space-y-4">
        {filteredIncidents.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No incidents found</h3>
              <p className="text-sm text-gray-500">No incidents match your current filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredIncidents.map((incident) => (
            <Card key={incident.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Badge className={getIncidentColor(incident.type)}>
                        {incident.type.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                        {incident.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {new Date(incident.date).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{incident.description}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{incident.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Crowd Level: {incident.crowdLevel}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Resolution & Prevention */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Resolution:</h5>
                      <p className="text-sm text-gray-700">{incident.resolution}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Preventive Measures:</h5>
                      <p className="text-sm text-gray-700">{incident.preventiveMeasures}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Safety Information */}
      <Alert className="bg-purple-50 border-purple-200">
        <Info className="h-4 w-4 text-purple-600" />
        <AlertDescription>
          <strong>Safety Commitment:</strong> All incidents are thoroughly investigated and preventive measures 
          are implemented to ensure pilgrim safety. Our continuous improvement approach has resulted in a 
          {currentData.recentTrend === 'decreasing' ? ' significant decrease' : ' stable trend'} in incidents.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default HistoricalIncidents;