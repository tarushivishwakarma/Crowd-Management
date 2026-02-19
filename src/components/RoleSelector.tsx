import React, { useState } from 'react';
import { Users, Shield, ArrowRight, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface RoleSelectorProps {
  onRoleSelect: (role: 'pilgrim' | 'authority') => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelect }) => {
  const [language, setLanguage] = useState('en');

  const text = {
    en: {
      appName: 'Temple Insight 360',
      tagline: 'Your Divine Journey, Digitally Enhanced',
      selectRole: 'Choose your access type to continue',
      pilgrimTitle: 'Pilgrim Access',
      pilgrimDesc: 'Book darshan, get crowd updates, access temple services',
      pilgrimFeatures: [
        'Book Darshan Tokens & QR Codes',
        'Historical Incident Reports',
        'Crowd Avoidance Recommendations',
        'Special Assistance Services',
        'Real-time Updates & Alerts'
      ],
      pilgrimEnter: 'Enter as Pilgrim',
      authorityTitle: 'Authority Access',
      authorityDesc: 'Temple management, crowd monitoring, emergency response',
      authorityFeatures: [
        'Crowd Heat Maps & Analytics',
        'Real-time Alert Management',
        'Resource Management Dashboard',
        'Footfall Count & Statistics',
        'Smart Monitoring Controls'
      ],
      authorityEnter: 'Access Authority Portal',
      secureNote: 'Secure • Real-time • Trusted by Gujarat Temple Board',
      demoNote: 'Demo Mode: All data is simulated for demonstration purposes'
    },
    hi: {
      appName: 'मंदिर इनसाइट 360',
      tagline: 'आपकी दिव्य यात्रा, डिजिटल रूप से बेहतर',
      selectRole: 'जारी रखने के लिए अपना एक्सेस प्रकार चुनें',
      pilgrimTitle: 'तीर्थयात्री पहुंच',
      pilgrimDesc: 'दर्शन बुक करें, भीड़ अपडेट प्राप्त करें, मंदिर सेवाओं तक पहुंच',
      pilgrimFeatures: [
        'दर्शन टोकन और QR कोड बुक करें',
        'ऐतिहासिक घटना रिपोर्ट',
        'भीड़ से बचने की सिफारिशें',
        'विशेष सहायता सेवाएं',
        'रीयल-टाइम अपडेट और अलर्ट'
      ],
      pilgrimEnter: 'तीर्थयात्री के रूप में प्रवेश करें',
      authorityTitle: 'प्राधिकरण पहुंच',
      authorityDesc: 'मंदिर प्रबंधन, भीड़ निगरानी, आपातकालीन प्रतिक्रिया',
      authorityFeatures: [
        'भीड़ हीट मैप्स और एनालिटिक्स',
        'रीयल-टाइम अलर्ट प्रबंधन',
        'संसाधन प्रबंधन डैशबोर्ड',
        'फुटफॉल काउंट और सांख्यिकी',
        'स्मार्ट मॉनिटरिंग नियंत्रण'
      ],
      authorityEnter: 'प्राधिकरण पोर्टल एक्सेस करें',
      secureNote: 'सुरक्षित • रीयल-टाइम • गुजरात मंदिर बोर्ड द्वारा विश्वसनीय',
      demoNote: 'डेमो मोड: सभी डेटा प्रदर्शन उद्देश्यों के लिए सिम्युलेटेड है'
    },
    gu: {
      appName: 'મંદિર ઇનસાઇટ 360',
      tagline: 'તમારી દિવ્ય યાત્રા, ડિજિટલ રીતે વિકસિત',
      selectRole: 'ચાલુ રાખવા માટે તમારો પ્રવેશ પ્રકાર પસંદ કરો',
      pilgrimTitle: 'યાત્રી પ્રવેશ',
      pilgrimDesc: 'દર્શન બુક કરો, ભીડના અપડેટ મેળવો, મંદિર સેવાઓ મેળવો',
      pilgrimFeatures: [
        'દર્શન ટોકન અને QR કોડ બુક કરો',
        'ઐતિહાસિક ઘટના રિપોર્ટ્સ',
        'ભીડ ટાળવાની ભલામણો',
        'વિશેષ સહાયતા સેવાઓ',
        'રીઅલ-ટાઇમ અપડેટ્સ અને અલર્ટ્સ'
      ],
      pilgrimEnter: 'યાત્રી તરીકે પ્રવેશ કરો',
      authorityTitle: 'અધિકૃત પ્રવેશ',
      authorityDesc: 'મંદિર વ્યવસ્થાપન, ભીડ નિરીક્ષણ, કટોકટી પ્રતિસાદ',
      authorityFeatures: [
        'ભીડ હીટ મેપ્સ અને એનાલિટિક્સ',
        'રીઅલ-ટાઇમ અલર્ટ મેનેજમેન્ટ',
        'રિસોર્સ મેનેજમેન્ટ ડેશબોર્ડ',
        'ફૂટફોલ કાઉન્ટ અને આંકડાકીય માહિતી',
        'સ્માર્ટ મોનિટરિંગ કંટ્રોલ્સ'
      ],
      authorityEnter: 'અધિકૃત પોર્ટલ એક્સેસ કરો',
      secureNote: 'સુરક્ષિત • રીઅલ-ટાઇમ • ગુજરાત મંદિર બોર્ડ દ્વારા વિશ્વસનીય',
      demoNote: 'ડેમો મોડ: બધો ડેટા પ્રદર્શન હેતુઓ માટે સિમ્યુલેટેડ છે'
    }
  };

  const t = text[language as keyof typeof text];
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-end mb-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-40">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="gu">ગુજરાતી</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-primary-foreground text-2xl font-bold">TI</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.appName}</h1>
          <p className="text-lg text-muted-foreground">{t.tagline}</p>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>{t.selectRole}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pilgrim Interface */}
          <Card className="hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-violet-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">{t.pilgrimTitle}</CardTitle>
              <CardDescription className="text-gray-600">
                {t.pilgrimDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm text-gray-700">
                {t.pilgrimFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={() => onRoleSelect('pilgrim')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                size="lg"
              >
                {t.pilgrimEnter}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Authority Interface */}
          <Card className="hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-violet-600" />
              </div>
              <CardTitle className="text-xl">{t.authorityTitle}</CardTitle>
              <CardDescription className="text-gray-600">
                {t.authorityDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm text-gray-700">
                {t.authorityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={() => onRoleSelect('authority')}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                size="lg"
              >
                {t.authorityEnter}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>{t.secureNote}</p>
          <div className="mt-2 text-xs">
            <p>{t.demoNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;