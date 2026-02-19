import React, { useState } from 'react';
import { BarChart3, Users, AlertTriangle, Settings, Activity, Shield, Eye, ArrowLeft, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Language, getTranslation, getTempleTranslation } from '../../utils/translations';

import CrowdHeatmap from './CrowdHeatmap';
import AlertsManagement from './AlertsManagement';
import ResourceManagement from './ResourceManagement';
import FootfallAnalytics from './FootfallAnalytics';
import SmartMonitoring from './SmartMonitoring';
import AuthorityDashboard from './AuthorityDashboard';

interface AuthorityInterfaceProps {
  templeData: any;
  selectedTemple: string;
  onTempleChange: (temple: string) => void;
  events: any[];
  setEvents: (events: any[]) => void;
  onBackToRoleSelector: () => void;
}

const AuthorityInterface: React.FC<AuthorityInterfaceProps> = ({ 
  templeData, 
  selectedTemple, 
  onTempleChange, 
  events, 
  setEvents, 
  onBackToRoleSelector 
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string) => getTranslation(language, key);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-violet-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
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
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{t('authority.subtitle')}</p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                    <Shield className="h-3 w-3 mr-1" />
                    {t('authority.title')}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Activity className="h-3 w-3 mr-1" />
                    {t('authority.active')}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={onBackToRoleSelector}
                  variant="outline"
                  size="sm"
                  className="text-violet-600 border-violet-200 hover:bg-violet-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t('back')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-flex bg-white border border-violet-200">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">{t('dashboard')}</span>
            </TabsTrigger>
            <TabsTrigger value="heatmap" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">{t('authority.heatmapTab')}</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">{t('alerts')}</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">{t('resources')}</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">{t('analytics')}</span>
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">{t('monitoring')}</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <div className="space-y-6">
            <TabsContent value="dashboard">
              <AuthorityDashboard 
                templeData={templeData}
                selectedTemple={selectedTemple}
                onTempleChange={onTempleChange}
                events={events}
                language={language}
              />
            </TabsContent>

            <TabsContent value="heatmap">
              <CrowdHeatmap 
                templeData={templeData}
                selectedTemple={selectedTemple}
                onTempleChange={onTempleChange}
                language={language}
              />
            </TabsContent>

            <TabsContent value="alerts">
              <AlertsManagement 
                templeData={templeData}
                selectedTemple={selectedTemple}
                events={events}
                setEvents={setEvents}
                language={language}
              />
            </TabsContent>

            <TabsContent value="resources">
              <ResourceManagement 
                templeData={templeData}
                selectedTemple={selectedTemple}
                onTempleChange={onTempleChange}
                language={language}
              />
            </TabsContent>

            <TabsContent value="analytics">
              <FootfallAnalytics 
                templeData={templeData}
                selectedTemple={selectedTemple}
                onTempleChange={onTempleChange}
                language={language}
              />
            </TabsContent>

            <TabsContent value="monitoring">
              <SmartMonitoring 
                templeData={templeData}
                selectedTemple={selectedTemple}
                events={events}
                language={language}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthorityInterface;