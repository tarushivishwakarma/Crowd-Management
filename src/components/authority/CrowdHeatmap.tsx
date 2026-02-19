import React, { useState } from 'react';
import { Activity, MapPin, Users, Clock, TrendingUp, Filter, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import TempleSelector from '../TempleSelector';

const CrowdHeatmap = ({ templeData, selectedTemple, onTempleChange }) => {
  const [timeFrame, setTimeFrame] = useState('live');
  const [viewMode, setViewMode] = useState('density');

  const currentTemple = templeData[selectedTemple];

  // Generate heatmap data for visualization
  const generateHeatmapData = () => {
    const zones = Object.entries(currentTemple.zones);
    return zones.map(([zoneId, zone], index) => ({
      id: zoneId,
      name: zone.name,
      density: zone.density,
      status: zone.status,
      waitTime: zone.waitTime,
      coordinates: {
        x: (index % 2) * 300 + 50,
        y: Math.floor(index / 2) * 200 + 50
      },
      historical: {
        '1h': zone.density + (Math.random() - 0.5) * 10,
        '6h': zone.density + (Math.random() - 0.5) * 20,
        '24h': zone.density + (Math.random() - 0.5) * 30
      }
    }));
  };

  const heatmapData = generateHeatmapData();

  // Get color based on density
  const getDensityColor = (density) => {
    if (density >= 80) return '#ef4444'; // Red
    if (density >= 60) return '#f97316'; // Orange
    if (density >= 40) return '#eab308'; // Yellow
    if (density >= 20) return '#22c55e'; // Green
    return '#06b6d4'; // Light Blue
  };

  const getDensityOpacity = (density) => {
    return Math.max(0.3, density / 100);
  };

  // Historical trend data
  const trendData = {
    hourly: [
      { time: '06:00', density: 45 },
      { time: '07:00', density: 78 },
      { time: '08:00', density: 85 },
      { time: '09:00', density: 72 },
      { time: '10:00', density: 55 },
      { time: '11:00', density: 48 },
      { time: '12:00', density: 52 },
      { time: '13:00', density: 38 },
      { time: '14:00', density: 42 },
      { time: '15:00', density: 48 },
      { time: '16:00', density: 65 },
      { time: '17:00', density: 80 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header & Temple Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-violet-600" />
            Crowd Heat Map - Real-time Monitoring
          </CardTitle>
          <CardDescription>
            Visual representation of crowd density across all temple zones
          </CardDescription>
        </CardHeader>
      </Card>

      <TempleSelector 
        templeData={templeData}
        selectedTemple={selectedTemple}
        onTempleChange={onTempleChange}
      />

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-violet-600" />
                <span className="font-medium">View:</span>
              </div>
              
              <Select value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="6h">Last 6 Hours</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                </SelectContent>
              </Select>

              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="density">Density View</SelectItem>
                  <SelectItem value="status">Status View</SelectItem>
                  <SelectItem value="waittime">Wait Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Heat Map Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-violet-600" />
            {currentTemple.name} - Zone Heat Map
          </CardTitle>
          <CardDescription>
            {timeFrame === 'live' ? 'Real-time' : `Historical data for ${timeFrame}`} crowd distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gray-50 rounded-lg p-8 min-h-[400px] overflow-hidden">
            {/* SVG Heatmap */}
            <svg width="100%" height="400" className="absolute inset-0">
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Zone heat spots */}
              {heatmapData.map((zone) => {
                const density = timeFrame === 'live' ? zone.density : zone.historical[timeFrame] || zone.density;
                const radius = Math.max(40, (density / 100) * 80);
                
                return (
                  <g key={zone.id}>
                    {/* Heat circle */}
                    <circle
                      cx={zone.coordinates.x}
                      cy={zone.coordinates.y}
                      r={radius}
                      fill={getDensityColor(density)}
                      fillOpacity={getDensityOpacity(density)}
                      className="transition-all duration-1000"
                    />
                    
                    {/* Zone label */}
                    <text
                      x={zone.coordinates.x}
                      y={zone.coordinates.y - radius - 10}
                      textAnchor="middle"
                      className="text-xs font-medium fill-gray-700"
                    >
                      {zone.name}
                    </text>
                    
                    {/* Density percentage */}
                    <text
                      x={zone.coordinates.x}
                      y={zone.coordinates.y}
                      textAnchor="middle"
                      className="text-sm font-bold fill-white"
                    >
                      {Math.round(density)}%
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md border">
              <h4 className="font-medium text-sm mb-2">Density Scale</h4>
              <div className="flex gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <span>0-20%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>20-40%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>40-60%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>60-80%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>80%+</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {heatmapData.map((zone) => {
          const density = timeFrame === 'live' ? zone.density : zone.historical[timeFrame] || zone.density;
          
          return (
            <Card key={zone.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{zone.name}</h4>
                  <Badge 
                    style={{ 
                      backgroundColor: getDensityColor(density),
                      color: 'white'
                    }}
                  >
                    {Math.round(density)}%
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Status:</span>
                    <span className="font-medium capitalize">{zone.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wait Time:</span>
                    <span className="font-medium">{zone.waitTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trend:</span>
                    <span className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-3 w-3" />
                      Stable
                    </span>
                  </div>
                </div>

                {density > 80 && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                    ⚠ Critical density level - Immediate action required
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-violet-600" />
            Hourly Trend Analysis
          </CardTitle>
          <CardDescription>Crowd density patterns throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {trendData.hourly.map((point, index) => (
              <div key={index} className="text-center p-3 border rounded-lg">
                <div className="text-sm font-medium text-gray-900">{point.time}</div>
                <div className="text-lg font-bold mt-1" style={{ color: getDensityColor(point.density) }}>
                  {point.density}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${point.density}%`,
                      backgroundColor: getDensityColor(point.density)
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrowdHeatmap;