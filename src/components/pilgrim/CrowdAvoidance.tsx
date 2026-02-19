import React, { useState } from 'react';
import { TrendingDown, Clock, Calendar, Users, Sun, Moon, Star, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';

const CrowdAvoidance = ({ templeData, selectedTemple }) => {
  const [selectedDay, setSelectedDay] = useState('today');
  
  const currentTemple = templeData[selectedTemple];

  // Crowd patterns and recommendations
  const crowdPatterns = {
    somnath: {
      peakHours: ['6:00-8:00', '18:00-20:00'],
      lowHours: ['10:00-12:00', '14:00-16:00'],
      festivalDays: ['Maha Shivratri', 'Shravan Monday', 'Kartik Purnima'],
      bestVisitDays: ['Tuesday', 'Wednesday', 'Thursday'],
      avoidDays: ['Monday', 'Saturday', 'Sunday'],
      seasonalTrends: {
        winter: 85, // High crowd
        summer: 45, // Low crowd
        monsoon: 30 // Lowest crowd
      }
    },
    dwarka: {
      peakHours: ['5:00-7:00', '17:30-19:30'],
      lowHours: ['9:00-11:00', '13:00-15:00'],
      festivalDays: ['Janmashtami', 'Diwali', 'Holi'],
      bestVisitDays: ['Tuesday', 'Thursday', 'Friday'],
      avoidDays: ['Sunday', 'Monday', 'Saturday'],
      seasonalTrends: {
        winter: 80,
        summer: 40,
        monsoon: 25
      }
    },
    ambaji: {
      peakHours: ['5:30-7:30', '18:00-20:00'],
      lowHours: ['10:00-12:00', '15:00-17:00'],
      festivalDays: ['Navratri', 'Ambaji Fair', 'Chaitra Navratri'],
      bestVisitDays: ['Wednesday', 'Thursday', 'Friday'],
      avoidDays: ['Saturday', 'Sunday', 'Tuesday'],
      seasonalTrends: {
        winter: 75,
        summer: 50,
        monsoon: 35
      }
    },
    pavagadh: {
      peakHours: ['6:00-8:00', '16:00-18:00'],
      lowHours: ['11:00-13:00', '14:00-15:00'],
      festivalDays: ['Navratri', 'Mahashivratri', 'Dussehra'],
      bestVisitDays: ['Monday', 'Wednesday', 'Thursday'],
      avoidDays: ['Saturday', 'Sunday', 'Friday'],
      seasonalTrends: {
        winter: 70,
        summer: 35,
        monsoon: 20
      }
    }
  };

  const currentPattern = crowdPatterns[selectedTemple];

  // Weekly crowd prediction
  const weeklyForecast = [
    { day: 'Monday', crowd: 65, recommendation: 'Avoid', reason: 'Weekend spillover effect' },
    { day: 'Tuesday', crowd: 35, recommendation: 'Best', reason: 'Typically low crowd' },
    { day: 'Wednesday', crowd: 40, recommendation: 'Good', reason: 'Mid-week advantage' },
    { day: 'Thursday', crowd: 38, recommendation: 'Best', reason: 'Optimal visiting day' },
    { day: 'Friday', crowd: 55, recommendation: 'Moderate', reason: 'Weekend preparation' },
    { day: 'Saturday', crowd: 85, recommendation: 'Avoid', reason: 'Weekend rush' },
    { day: 'Sunday', crowd: 90, recommendation: 'Avoid', reason: 'Peak weekend day' }
  ];

  // Hourly forecast for today
  const hourlyForecast = [
    { time: '05:00', crowd: 15, status: 'Low' },
    { time: '06:00', crowd: 75, status: 'High' },
    { time: '07:00', crowd: 90, status: 'Peak' },
    { time: '08:00', crowd: 85, status: 'High' },
    { time: '09:00', crowd: 60, status: 'Moderate' },
    { time: '10:00', crowd: 35, status: 'Low' },
    { time: '11:00', crowd: 30, status: 'Low' },
    { time: '12:00', crowd: 40, status: 'Moderate' },
    { time: '13:00', crowd: 25, status: 'Low' },
    { time: '14:00', crowd: 30, status: 'Low' },
    { time: '15:00', crowd: 35, status: 'Low' },
    { time: '16:00', crowd: 50, status: 'Moderate' },
    { time: '17:00', crowd: 70, status: 'High' },
    { time: '18:00', crowd: 85, status: 'High' },
    { time: '19:00', crowd: 95, status: 'Peak' },
    { time: '20:00', crowd: 80, status: 'High' },
    { time: '21:00', crowd: 45, status: 'Moderate' }
  ];

  const getRecommendationColor = (recommendation) => {
    switch (recommendation.toLowerCase()) {
      case 'best': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'avoid': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCrowdStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'low': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'peak': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-purple-600" />
            Crowd Avoidance Guide - {currentTemple.name}
          </CardTitle>
          <CardDescription>
            Smart recommendations to help you avoid crowds and plan the perfect visit
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Best Time Today</span>
            </div>
            <p className="font-bold text-green-900">{currentPattern.lowHours[0]}</p>
            <p className="text-xs text-green-700">Expected crowd: 30%</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Best Day This Week</span>
            </div>
            <p className="font-bold text-blue-900">{currentPattern.bestVisitDays[0]}</p>
            <p className="text-xs text-blue-700">Typically 35% crowd</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Best Season</span>
            </div>
            <p className="font-bold text-purple-900">Monsoon</p>
            <p className="text-xs text-purple-700">Lowest yearly crowd</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Avoid Today</span>
            </div>
            <p className="font-bold text-orange-900">{currentPattern.peakHours[1]}</p>
            <p className="text-xs text-orange-700">Peak evening rush</p>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-600" />
            Today's Hourly Crowd Forecast
          </CardTitle>
          <CardDescription>Real-time predictions for the next 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-medium">{hour.time}</span>
                  <Badge variant="outline" className={getCrowdStatusColor(hour.status)}>
                    {hour.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={hour.crowd} className="w-16 h-2" />
                  <span className="text-sm text-gray-600">{hour.crowd}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Weekly Crowd Forecast
          </CardTitle>
          <CardDescription>Plan your visit for the entire week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyForecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium">{day.day}</span>
                    <Badge className={getRecommendationColor(day.recommendation)}>
                      {day.recommendation}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{day.reason}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={day.crowd} className="w-24 h-3" />
                  <span className="font-medium text-gray-700">{day.crowd}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Festival Alerts */}
      <Alert className="bg-red-50 border-red-200">
        <Star className="h-4 w-4 text-red-600" />
        <AlertDescription>
          <strong>Festival Alert:</strong> During festivals like {currentPattern.festivalDays.join(', ')}, 
          expect 200-300% higher crowds. Consider visiting 2-3 days before or after festival dates for a peaceful darshan.
        </AlertDescription>
      </Alert>

      {/* Seasonal Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-purple-600" />
            Seasonal Crowd Trends
          </CardTitle>
          <CardDescription>Historical data to help you plan long-term visits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(currentPattern.seasonalTrends).map(([season, crowd]) => (
              <div key={season} className="p-4 border rounded-lg">
                <h4 className="font-medium capitalize mb-2">{season}</h4>
                <Progress value={crowd} className="mb-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average Crowd</span>
                  <span className="font-medium">{crowd}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrowdAvoidance;