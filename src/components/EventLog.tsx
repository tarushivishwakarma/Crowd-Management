import React from 'react';
import { Clock, Activity, Calendar, AlertTriangle, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Language } from '../utils/translations';

interface EventLogProps {
  events: any[];
  language?: Language;
}

const EventLog: React.FC<EventLogProps> = ({ events, language = 'en' }) => {
  const getEventIcon = (type) => {
    switch (type) {
      case 'crowd':
        return Users;
      case 'booking':
        return Calendar;
      case 'emergency':
        return AlertTriangle;
      case 'transport':
        return Activity;
      default:
        return Clock;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'crowd':
        return 'bg-blue-100 text-blue-800';
      case 'booking':
        return 'bg-green-100 text-green-800';
      case 'emergency':
        return 'bg-red-100 text-red-800';
      case 'transport':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-500" />
            Live Updates
          </CardTitle>
          <CardDescription>Real-time system events and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No recent updates</p>
            <p className="text-sm text-gray-400">Events will appear here as they happen</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-orange-500" />
          Live Updates
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto"></div>
        </CardTitle>
        <CardDescription>
          Real-time system events and notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96 px-6 pb-6">
          <div className="space-y-3">
            {events.map((event) => {
              const IconComponent = getEventIcon(event.type);
              
              return (
                <div key={event.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className={`p-1.5 rounded-full ${getEventColor(event.type)}`}>
                      <IconComponent className="h-3 w-3" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 leading-relaxed">
                      {event.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.timestamp}
                      </Badge>
                      <Badge className={`text-xs ${getEventColor(event.type)}`}>
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {events.length >= 10 && (
            <div className="text-center py-4">
              <p className="text-xs text-gray-500">
                Showing latest 10 events • Updates refresh every 5 seconds
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EventLog;