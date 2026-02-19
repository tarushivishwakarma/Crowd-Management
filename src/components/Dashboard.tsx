import React from 'react';
import { Calendar, Users, Clock, TrendingUp, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import TempleSelector from './TempleSelector';
import { Language, getTranslation, getTempleTranslation, getStatusTranslation } from '../utils/translations';

interface DashboardProps {
  templeData: any;
  selectedTemple: string;
  onTempleChange: (temple: string) => void;
  onBookDarshan: () => void;
  language?: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ templeData, selectedTemple, onTempleChange, onBookDarshan, language = 'en' }) => {
  const t = (key: string) => getTranslation(language, key);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const currentTemple = templeData[selectedTemple];
  const crowdData = currentTemple.zones;
  const totalPilgrims = Object.values(crowdData).reduce((sum: number, zone: any) => sum + zone.density, 0);
  const avgWaitTime = Math.round(Object.values(crowdData).reduce((sum: number, zone: any) => sum + parseInt(zone.waitTime), 0) / 4);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <h2>Welcome to Gujarat's Sacred Temples</h2>
            <MapPin className="h-5 w-5" />
          </div>
          <p className="text-orange-100 mb-2">Currently viewing: <strong>{getTempleTranslation(language, selectedTemple)}</strong></p>
          <p className="text-orange-100 mb-4">Your spiritual journey companion for a blessed darshan experience</p>
          <Button 
            onClick={onBookDarshan}
            size="lg"
            className="bg-white text-orange-600 hover:bg-orange-50"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book Darshan Token
          </Button>
        </CardContent>
      </Card>

      {/* Temple Selection */}
      <TempleSelector 
        templeData={templeData}
        selectedTemple={selectedTemple}
        onTempleChange={onTempleChange}
        language={language}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Pilgrims</p>
                <p className="text-2xl">{Math.round(totalPilgrims * 100)}</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                <p className="text-2xl">{avgWaitTime} min</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Peak Status</p>
                <p className="text-2xl">{t('status.moderate')}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Crowd Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            Live Crowd Status - {getTempleTranslation(language, selectedTemple)}
          </CardTitle>
          <CardDescription>Real-time updates • {currentTemple.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(crowdData).map(([zone, data]: [string, any]) => (
              <div key={zone} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(data.status)}`}></div>
                    <h3>{data.name}</h3>
                  </div>
                  <Badge variant="outline">{getStatusTranslation(language, data.status)}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Density</span>
                    <span>{Math.round(data.density)}%</span>
                  </div>
                  <Progress value={data.density} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Est. Wait</span>
                    <span className="font-medium">{data.waitTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for your temple visit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2" onClick={onBookDarshan}>
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Book Token</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Find Queue</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm">Check Times</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">Live Stats</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;