import React, { useState } from 'react';
import { Home, Map, Calendar, Truck, HelpCircle, AlertTriangle, Users, LogOut, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import { Language, getTranslation, getTempleTranslation } from '../../utils/translations';

import Dashboard from '../Dashboard';
import DarshanBooking from '../DarshanBooking';
import FacilitiesMap from '../FacilitiesMap';
import TransportAssistance from '../TransportAssistance';
import MyBookings from '../MyBookings';
import EmergencyButton from '../EmergencyButton';
import EventLog from '../EventLog';
import DemoBanner from '../DemoBanner';
import HistoricalIncidents from './HistoricalIncidents';
import CrowdAvoidance from './CrowdAvoidance';
import SpecialAssistance from './SpecialAssistance';
import TempleInfo from '../TempleInfo';

interface PilgrimInterfaceProps {
  templeData: any;
  selectedTemple: string;
  onTempleChange: (temple: string) => void;
  events: any[];
  setEvents: (events: any[]) => void;
  bookings: any[];
  handleBooking: (bookingData: any) => void;
  handleEmergency: (emergencyData: any) => void;
  onBackToRoleSelector: () => void;
}

const PilgrimInterface: React.FC<PilgrimInterfaceProps> = ({
  templeData,
  selectedTemple,
  onTempleChange,
  events,
  setEvents,
  bookings,
  handleBooking,
  handleEmergency,
  onBackToRoleSelector
}) => {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => getTranslation(language, key);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">TI</span>
              </div>
              <div>
                <h1 className="text-xl text-gray-900">{t('appName')}</h1>
                <p className="text-sm text-gray-600">{t('tagline')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                <SelectTrigger className="w-32">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="gu">ગુજરાતી</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Users className="h-3 w-3 mr-1" />
                {t('pilgrim.title')}
              </Badge>
              <Button
                onClick={onBackToRoleSelector}
                variant="outline"
                size="sm"
                className="text-orange-600 border-orange-200 hover:bg-orange-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t('back')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <DemoBanner language={language} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-flex bg-white border border-orange-200">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">{t('home')}</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{t('bookings')}</span>
            </TabsTrigger>
            <TabsTrigger value="assistance" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{t('assistance')}</span>
            </TabsTrigger>
            <TabsTrigger value="incidents" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">{t('incidents')}</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">{t('facilitiesLabel')}</span>
            </TabsTrigger>
            <TabsTrigger value="transport" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">{t('transportLabel')}</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <TabsContent value="home" className="space-y-6">
                <Dashboard
                  templeData={templeData}
                  selectedTemple={selectedTemple}
                  onTempleChange={onTempleChange}
                  onBookDarshan={() => setActiveTab('bookings')}
                  language={language}
                />
                <TempleInfo
                  templeData={templeData}
                  selectedTemple={selectedTemple}
                  language={language}
                />
              </TabsContent>

              <TabsContent value="bookings" className="space-y-6">
                <div className="space-y-6">
                  <DarshanBooking
                    onBooking={handleBooking}
                    templeData={templeData}
                    selectedTemple={selectedTemple}
                    onTempleChange={onTempleChange}
                    language={language}
                  />
                  <MyBookings
                    bookings={bookings}
                    language={language}
                  />
                </div>
              </TabsContent>

              <TabsContent value="assistance" className="space-y-6">
                <div className="space-y-6">
                  <SpecialAssistance
                    selectedTemple={selectedTemple}
                    templeData={templeData}
                    language={language}
                  />
                  <CrowdAvoidance
                    templeData={templeData}
                    selectedTemple={selectedTemple}
                    language={language}
                  />
                </div>
              </TabsContent>

              <TabsContent value="incidents" className="space-y-6">
                <HistoricalIncidents
                  selectedTemple={selectedTemple}
                  templeData={templeData}
                  language={language}
                />
              </TabsContent>

              <TabsContent value="map" className="space-y-6">
                <FacilitiesMap
                  selectedTemple={selectedTemple}
                  templeData={templeData}
                  language={language}
                />
              </TabsContent>

              <TabsContent value="transport" className="space-y-6">
                <TransportAssistance
                  selectedTemple={selectedTemple}
                  templeData={templeData}
                  language={language}
                />
              </TabsContent>
            </div>

            {/* Event Log Sidebar */}
            <div className="lg:col-span-1">
              <EventLog
                events={events}
                language={language}
              />
            </div>
          </div>
        </Tabs>
      </div>

      {/* Emergency SOS Button */}
      <EmergencyButton
        onEmergency={handleEmergency}
        language={language}
      />
    </div>
  );
};

export default PilgrimInterface;