/**
 * Demo Banner Component
 * Shows information about demo mode and features
 */
import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Language, getTranslation } from '../utils/translations';

interface DemoBannerProps {
  language?: Language;
}

const DemoBanner: React.FC<DemoBannerProps> = ({ language = 'en' }) => {
  const t = (key: string) => {
    // Simple fallback translations for demo banner
    const demoTexts = {
      en: {
        title: 'Demo Mode',
        description: 'All data is simulated for demonstration purposes. No real bookings or payments are processed.'
      },
      hi: {
        title: 'डेमो मोड',
        description: 'सभी डेटा प्रदर्शन उद्देश्यों के लिए सिम्युलेटेड है। कोई वास्तविक बुकिंग या भुगतान प्रोसेस नहीं किया जाता है।'
      },
      gu: {
        title: 'ડેમો મોડ',
        description: 'બધો ડેટા પ્રદર્શન હેતુઓ માટે સિમ્યુલેટેડ છે। કોઈ વાસ્તવિક બુકિંગ અથવા પેમેન્ટ પ્રોસેસ કરવામાં આવતું નથી।'
      }
    };
    
    const keys = key.split('.');
    if (keys.length === 2 && keys[0] === 'demo') {
      return demoTexts[language]?.[keys[1]] || demoTexts.en[keys[1]];
    }
    return key;
  };
  const [isVisible, setIsVisible] = useState(() => {
    // Check if user has dismissed the banner before
    return !localStorage.getItem('demo-banner-dismissed');
  });

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('demo-banner-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <Alert className="mx-4 mt-4 bg-blue-50 border-blue-200">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <strong>{t('demo.title')}:</strong> {t('demo.description')}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="ml-4 h-auto p-1 text-blue-600 hover:text-blue-800"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default DemoBanner;