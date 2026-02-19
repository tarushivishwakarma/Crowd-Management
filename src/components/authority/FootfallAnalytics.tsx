import React, { useState } from 'react';
import { BarChart3, Users, TrendingUp, Calendar, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const FootfallAnalytics = ({ templeData, selectedTemple, onTempleChange }) => {
  const [timeRange, setTimeRange] = useState('today');
  const [dataView, setDataView] = useState('hourly');

  const currentTemple = templeData[selectedTemple];

  // Generate analytics data
  const generateAnalyticsData = () => {
    const today = new Date();
    const todayFootfall = Math.floor(Math.random() * 5000) + 15000;
    
    return {
      summary: {
        today: todayFootfall,
        yesterday: todayFootfall - Math.floor(Math.random() * 2000) + 1000,
        thisWeek: todayFootfall * 7 + Math.floor(Math.random() * 10000),
        thisMonth: todayFootfall * 30 + Math.floor(Math.random() * 50000),
        peakHour: '07:00 - 08:00',
        peakDay: 'Sunday',
        avgDuration: '45 minutes'
      },
      hourly: Array.from({ length: 24 }, (_, i) => {
        let base = 500;
        // Peak hours simulation
        if (i >= 6 && i <= 8) base *= 3;
        if (i >= 17 && i <= 19) base *= 2.5;
        if (i >= 10 && i <= 16) base *= 1.5;
        if (i >= 0 && i <= 5) base *= 0.2;
        if (i >= 21 && i <= 23) base *= 0.5;
        
        return {
          hour: i,
          count: Math.floor(base + Math.random() * 200),
          avg: Math.floor(base * 0.8)
        };
      }),
      weekly: [
        { day: 'Mon', count: 12500, avg: 11000 },
        { day: 'Tue', count: 8900, avg: 9500 },
        { day: 'Wed', count: 9200, avg: 9800 },
        { day: 'Thu', count: 9800, avg: 10200 },
        { day: 'Fri', count: 13200, avg: 12000 },
        { day: 'Sat', count: 18500, avg: 17000 },
        { day: 'Sun', count: 22000, avg: 20000 }
      ],
      zones: Object.entries(currentTemple.zones).map(([key, zone]) => ({
        name: zone.name,
        visitors: Math.floor(Math.random() * 3000) + 1000,
        avgTime: Math.floor(Math.random() * 30) + 15,
        density: zone.density
      }))
    };
  };

  const analyticsData = generateAnalyticsData();

  const getMaxValue = (data) => Math.max(...data.map(d => d.count));

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-violet-600" />
            Footfall Analytics - {currentTemple.name}
          </CardTitle>
          <CardDescription>
            Comprehensive visitor analytics and crowd behavior insights
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Visitors</p>
                <p className="text-3xl font-bold text-violet-600">{analyticsData.summary.today.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">
                  +{Math.round(((analyticsData.summary.today - analyticsData.summary.yesterday) / analyticsData.summary.yesterday) * 100)}% from yesterday
                </p>
              </div>
              <Users className="h-8 w-8 text-violet-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weekly Total</p>
                <p className="text-3xl font-bold text-violet-600">{analyticsData.summary.thisWeek.toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-1">Peak: {analyticsData.summary.peakDay}</p>
              </div>
              <Calendar className="h-8 w-8 text-violet-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Peak Hour</p>
                <p className="text-2xl font-bold text-violet-600">{analyticsData.summary.peakHour}</p>
                <p className="text-xs text-orange-600 mt-1">Highest traffic</p>
              </div>
              <TrendingUp className="h-8 w-8 text-violet-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                <p className="text-3xl font-bold text-violet-600">{analyticsData.summary.avgDuration}</p>
                <p className="text-xs text-gray-600 mt-1">Per visitor</p>
              </div>
              <BarChart3 className="h-8 w-8 text-violet-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-violet-600" />
                <span className="font-medium">View:</span>
              </div>
              
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dataView} onValueChange={setDataView}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="zones">By Zone</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hourly Traffic Chart */}
      {dataView === 'hourly' && (
        <Card>
          <CardHeader>
            <CardTitle>Hourly Visitor Distribution</CardTitle>
            <CardDescription>Visitor count by hour of the day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.hourly.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium">
                    {String(data.hour).padStart(2, '0')}:00
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Progress 
                        value={(data.count / getMaxValue(analyticsData.hourly)) * 100} 
                        className="flex-1 h-6"
                      />
                      <span className="text-sm font-medium w-16 text-right">
                        {data.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Avg: {data.avg.toLocaleString()} visitors
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Traffic Chart */}
      {dataView === 'daily' && (
        <Card>
          <CardHeader>
            <CardTitle>Weekly Visitor Distribution</CardTitle>
            <CardDescription>Visitor count by day of the week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.weekly.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium">{data.day}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Progress 
                        value={(data.count / getMaxValue(analyticsData.weekly)) * 100} 
                        className="flex-1 h-6"
                      />
                      <span className="text-sm font-medium w-20 text-right">
                        {data.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Avg: {data.avg.toLocaleString()} visitors
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Zone-wise Analytics */}
      {dataView === 'zones' && (
        <Card>
          <CardHeader>
            <CardTitle>Zone-wise Visitor Analytics</CardTitle>
            <CardDescription>Detailed breakdown by temple zones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analyticsData.zones.map((zone, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{zone.name}</h4>
                    <Badge className="bg-violet-100 text-violet-800">
                      {zone.visitors.toLocaleString()} visitors
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Current Density</span>
                        <span className="font-medium">{Math.round(zone.density)}%</span>
                      </div>
                      <Progress value={zone.density} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-violet-600">{zone.avgTime}min</div>
                        <div className="text-gray-600">Avg Duration</div>
                      </div>
                      <div>
                        <div className="font-medium text-violet-600">{Math.round(zone.visitors / 24)}/hr</div>
                        <div className="text-gray-600">Hourly Rate</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Insights & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI Insights & Recommendations</CardTitle>
          <CardDescription>Data-driven insights for crowd management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Peak Hours Management</h4>
              <p className="text-sm text-blue-800">
                Consider implementing pre-booking slots for 7-8 AM and 6-7 PM to reduce wait times. 
                Current peak hour crowding is 40% above optimal capacity.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Optimal Visiting Times</h4>
              <p className="text-sm text-green-800">
                Promote 10 AM - 2 PM and 3 PM - 5 PM slots for better visitor experience. 
                These periods show 60% lower crowding with similar spiritual ambiance.
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">Weekend Management</h4>
              <p className="text-sm text-orange-800">
                Saturday and Sunday show 85% higher footfall. Consider additional staff deployment 
                and extended facility hours during weekends.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FootfallAnalytics;