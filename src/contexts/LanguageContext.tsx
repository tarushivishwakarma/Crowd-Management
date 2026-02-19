/**
 * Language Context for Temple Insight 360
 * Supports multilingual interface with Hindi, Gujarati, and English
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'gu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: { code: Language; name: string; nativeName: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Comprehensive translations for the temple app
const translations = {
  en: {
    // Common
    'app.name': 'Temple Insight 360',
    'app.tagline': 'Discover • Connect • Experience Divine Gujarat',
    'common.back': 'Back',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.save': 'Save',
    'common.close': 'Close',
    'common.refresh': 'Refresh',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.select': 'Select',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.status': 'Status',
    'common.name': 'Name',
    'common.email': 'Email',
    'common.phone': 'Phone',
    'common.password': 'Password',
    'common.submit': 'Submit',

    // Authentication
    'auth.login': 'Sign In',
    'auth.register': 'Create Account',
    'auth.logout': 'Sign Out',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.phoneNumber': 'Phone Number',
    'auth.role': 'Role',
    'auth.pilgrim': 'Pilgrim',
    'auth.authority': 'Authority',
    'auth.loginSuccess': 'Welcome back!',
    'auth.loginError': 'Login failed. Please check your credentials.',
    'auth.registerSuccess': 'Account created successfully!',
    'auth.registerError': 'Registration failed. Please try again.',
    'auth.logoutSuccess': 'Logged out successfully',
    'auth.accessDenied': 'Access Denied',
    'auth.noPermission': "You don't have authority permissions.",
    'auth.defaultCredentials': 'Default Credentials',
    'auth.demoPilgrim': 'Demo Pilgrim',
    'auth.demoAuthority': 'Demo Authority',
    'auth.useDemo': 'Use demo buttons above to try the app with sample data',
    'auth.noAccount': "Don't have an account?",
    'auth.createAccount': 'Create Account',
    'auth.backToRoles': 'Back to Role Selection',
    'auth.quickLogin': 'Quick Login with Default Credentials',

    // Role Selection
    'role.select': 'Select Your Role',
    'role.pilgrim.title': 'Pilgrim Access',
    'role.pilgrim.desc': 'Book darshan, get crowd updates, access temple services',
    'role.pilgrim.features.booking': 'Book Darshan Tokens & QR Codes',
    'role.pilgrim.features.incidents': 'Historical Incident Reports',
    'role.pilgrim.features.crowd': 'Crowd Avoidance Recommendations',
    'role.pilgrim.features.assistance': 'Special Assistance Services',
    'role.pilgrim.features.updates': 'Real-time Updates & Alerts',
    'role.pilgrim.enter': 'Enter as Pilgrim',
    'role.authority.title': 'Authority Access',
    'role.authority.desc': 'Temple management, crowd monitoring, emergency response',
    'role.authority.features.heatmaps': 'Crowd Heat Maps & Analytics',
    'role.authority.features.alerts': 'Real-time Alert Management',
    'role.authority.features.resources': 'Resource Management Dashboard',
    'role.authority.features.footfall': 'Footfall Count & Statistics',
    'role.authority.features.monitoring': 'Smart Monitoring Controls',
    'role.authority.enter': 'Access Authority Portal',
    'role.selectRole': 'Choose your access type to continue',
    'role.secureNote': 'Secure • Real-time • Trusted by Gujarat Temple Board',
    'role.demoNote': 'Demo Mode: All data is simulated for demonstration purposes',

    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.home': 'Home',
    'nav.booking': 'Book Darshan',
    'nav.bookings': 'Bookings',
    'nav.myBookings': 'My Bookings',
    'nav.crowdInfo': 'Crowd Info',
    'nav.facilities': 'Facilities Map',
    'nav.transport': 'Transport',
    'nav.emergency': 'Emergency',
    'nav.templeInfo': 'Temple Info',
    'nav.assistance': 'Assistance',
    'nav.specialAssistance': 'Special Assistance',
    'nav.incidents': 'Incidents',
    'nav.historicalIncidents': 'Historical Incidents',
    'nav.crowdAvoidance': 'Crowd Avoidance',

    // Temples
    'temple.somnath': 'Somnath Temple',
    'temple.dwarka': 'Dwarkadhish Temple',
    'temple.ambaji': 'Ambaji Temple',
    'temple.pavagadh': 'Kalika Mata Temple',
    'temple.select': 'Select Temple',
    'temple.location': 'Location',
    'temple.info': 'Temple Information',

    // Crowd Monitoring
    'crowd.density': 'Crowd Density',
    'crowd.waitTime': 'Wait Time',
    'crowd.status.low': 'Low',
    'crowd.status.moderate': 'Moderate',
    'crowd.status.high': 'High',
    'crowd.status.critical': 'Critical',
    'crowd.currentStatus': 'Current Status',
    'crowd.liveUpdates': 'Live Updates',
    'crowd.zones': 'Temple Zones',
    'crowd.mainDarshan': 'Main Darshan Hall',
    'crowd.garbhaGriha': 'Garbha Griha',
    'crowd.pradakshina': 'Pradakshina Path',
    'crowd.museum': 'Museum & Exhibition',
    'crowd.gomtiGhat': 'Gomti Ghat',
    'crowd.gabbarHill': 'Gabbar Hill Path',
    'crowd.ropeway': 'Ropeway Station',

    // Booking
    'booking.darshan': 'Darshan Booking',
    'booking.selectZone': 'Select Zone',
    'booking.selectDate': 'Select Date',
    'booking.selectTime': 'Select Time Slot',
    'booking.numberOfPeople': 'Number of People',
    'booking.pilgrimName': 'Pilgrim Name',
    'booking.pilgrimPhone': 'Pilgrim Phone',
    'booking.specialAssistance': 'Special Assistance',
    'booking.bookNow': 'Book Now',
    'booking.confirmed': 'Booking Confirmed',
    'booking.qrCode': 'QR Code',
    'booking.bookingId': 'Booking ID',
    'booking.downloadQR': 'Download QR Code',
    'booking.status.pending': 'Pending',
    'booking.status.confirmed': 'Confirmed',
    'booking.status.cancelled': 'Cancelled',
    'booking.status.completed': 'Completed',

    // Emergency
    'emergency.report': 'Report Emergency',
    'emergency.type': 'Emergency Type',
    'emergency.description': 'Description',
    'emergency.location': 'Location',
    'emergency.contactInfo': 'Contact Information',
    'emergency.reportNow': 'Report Now',
    'emergency.alertSent': 'Emergency alert sent to authorities',

    // Demo Mode
    'demo.title': 'Demo Mode Active',
    'demo.description': 'All bookings stored locally, real-time updates simulated',
    'demo.welcome': 'Welcome to Temple Insight 360 - Gujarat Temple Assistance System',

    // Dashboard
    'dashboard.welcome': 'Welcome to Gujarat\'s Sacred Temples',
    'dashboard.currentlyViewing': 'Currently viewing:',
    'dashboard.spiritualJourney': 'Your spiritual journey companion for a blessed darshan experience',
    'dashboard.bookToken': 'Book Darshan Token',
    'dashboard.activePilgrims': 'Active Pilgrims',
    'dashboard.avgWaitTime': 'Avg Wait Time',
    'dashboard.zonesAvailable': 'Zones Available',
    'dashboard.liveCrowdStatus': 'Live Crowd & Queue Status',
    'dashboard.realTimeUpdates': 'Real-time updates every 5 seconds',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.commonTasks': 'Common tasks for pilgrims',
    'dashboard.findQueue': 'Find Queue',
    'dashboard.checkTimes': 'Check Times',
    'dashboard.liveStats': 'Live Stats',
    'dashboard.density': 'Density:',
    'dashboard.estWait': 'Est. Wait:',

    // Language
    'language.select': 'Select Language',
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.gujarati': 'ગુજરાતી',

    // Authority Interface
    'authority.interface.title': 'Authority Dashboard',
    'authority.role': 'Authority',
    'status.active': 'Active',
    'authority.nav.heatmap': 'Heat Map',
    'authority.nav.alerts': 'Alerts',
    'authority.nav.resources': 'Resources', 
    'authority.nav.analytics': 'Analytics',
    'authority.nav.monitoring': 'Monitoring',
  },

  hi: {
    // Common
    'app.name': 'मंदिर इनसाइट 360',
    'app.tagline': 'खोजें • जुड़ें • दिव्य गुजरात का अनुभव करें',
    'common.back': 'वापस',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.cancel': 'रद्द करें',
    'common.confirm': 'पुष्टि करें',
    'common.save': 'सहेजें',
    'common.close': 'बंद करें',
    'common.refresh': 'ताज़ा करें',
    'common.search': 'खोजें',
    'common.filter': 'फ़िल्टर',
    'common.select': 'चुनें',
    'common.date': 'दिनांक',
    'common.time': 'समय',
    'common.status': 'स्थिति',
    'common.name': 'नाम',
    'common.email': 'ईमेल',
    'common.phone': 'फ़ोन',
    'common.password': 'पासवर्ड',
    'common.submit': 'जमा करें',

    // Authentication
    'auth.login': 'साइन इन',
    'auth.register': 'खाता बनाएं',
    'auth.logout': 'साइन आउट',
    'auth.email': 'ईमेल पता',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'auth.fullName': 'पूरा नाम',
    'auth.phoneNumber': 'फ़ोन नंबर',
    'auth.role': 'भूमिका',
    'auth.pilgrim': 'तीर्थयात्री',
    'auth.authority': 'प्राधिकरण',
    'auth.loginSuccess': 'वापसी पर स्वागत है!',
    'auth.loginError': 'लॉगिन असफल। कृपया अपनी साख की जांच करें।',
    'auth.registerSuccess': 'खाता सफलतापूर्वक बनाया गया!',
    'auth.registerError': 'पंजीकरण असफल। कृपया पुनः प्रयास करें।',
    'auth.logoutSuccess': 'सफलतापूर्वक लॉग आउट',
    'auth.accessDenied': 'पहुंच से इनकार',
    'auth.noPermission': 'आपके पास प्राधिकरण अनुमति नहीं है।',
    'auth.defaultCredentials': 'डिफ़ॉल्ट क्रेडेंशियल',
    'auth.demoPilgrim': 'डेमो तीर्थयात्री',
    'auth.demoAuthority': 'डेमो प्राधिकरण',
    'auth.useDemo': 'नमूना डेटा के साथ ऐप आज़माने के लिए ऊपर डेमो बटन का उपयोग करें',
    'auth.noAccount': 'कोई खाता नहीं है?',
    'auth.createAccount': 'खाता बनाएं',
    'auth.backToRoles': 'भूमिका चयन पर वापस',
    'auth.quickLogin': 'डिफ़ॉल्ट क्रेडेंशियल के साथ त्वरित लॉगिन',

    // Role Selection
    'role.select': 'अपनी भूमिका चुनें',
    'role.pilgrim.title': 'तीर्थयात्री पहुंच',
    'role.pilgrim.desc': 'दर्शन बुक करें, भीड़ अपडेट प्राप्त करें, मंदिर सेवाओं तक पहुंच',
    'role.pilgrim.features.booking': 'दर्शन टोकन और QR कोड बुक करें',
    'role.pilgrim.features.incidents': 'ऐतिहासिक घटना रिपोर्ट',
    'role.pilgrim.features.crowd': 'भीड़ से बचने की सिफारिशें',
    'role.pilgrim.features.assistance': 'विशेष सहायता सेवाएं',
    'role.pilgrim.features.updates': 'रीयल-टाइम अपडेट और अलर्ट',
    'role.pilgrim.enter': 'तीर्थयात्री के रूप में प्रवेश करें',
    'role.authority.title': 'प्राधिकरण पहुंच',
    'role.authority.desc': 'मंदिर प्रबंधन, भीड़ निगरानी, आपातकालीन प्रतिक्रिया',
    'role.authority.features.heatmaps': 'भीड़ हीट मैप्स और एनालिटिक्स',
    'role.authority.features.alerts': 'रीयल-टाइम अलर्ट प्रबंधन',
    'role.authority.features.resources': 'संसाधन प्रबंधन डैशबोर्ड',
    'role.authority.features.footfall': 'फुटफॉल काउंट और सांख्यिकी',
    'role.authority.features.monitoring': 'स्मार्ट मॉनिटरिंग नियंत्रण',
    'role.authority.enter': 'प्राधिकरण पोर्टल एक्सेस करें',
    'role.selectRole': 'जारी रखने के लिए अपना एक्सेस प्रकार चुनें',
    'role.secureNote': 'सुरक्षित • रीयल-टाइम • गुजरात मंदिर बोर्ड द्वारा विश्वसनीय',
    'role.demoNote': 'डेमो मोड: सभी डेटा प्रदर्शन उद्देश्यों के लिए सिम्युलेटेड है',

    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.home': 'होम',
    'nav.booking': 'दर्शन बुक करें',
    'nav.bookings': 'बुकिंग',
    'nav.myBookings': 'मेरी बुकिंग',
    'nav.crowdInfo': 'भीड़ की जानकारी',
    'nav.facilities': 'सुविधाएं मानचित्र',
    'nav.transport': 'परिवहन',
    'nav.emergency': 'आपातकाल',
    'nav.templeInfo': 'मंदिर की जानकारी',
    'nav.assistance': 'सहायता',
    'nav.specialAssistance': 'विशेष सहायता',
    'nav.incidents': 'घटनाएं',
    'nav.historicalIncidents': 'ऐतिहासिक घटनाएं',
    'nav.crowdAvoidance': 'भीड़ से बचाव',

    // Temples
    'temple.somnath': 'सोमनाथ मंदिर',
    'temple.dwarka': 'द्वारकाधीश मंदिर',
    'temple.ambaji': 'अंबाजी मंदिर',
    'temple.pavagadh': 'कालिका माता मंदिर',
    'temple.select': 'मंदिर चुनें',
    'temple.location': 'स्थान',
    'temple.info': 'मंदिर की जानकारी',

    // Crowd Monitoring
    'crowd.density': 'भीड़ की घनत्व',
    'crowd.waitTime': 'प्रतीक्षा समय',
    'crowd.status.low': 'कम',
    'crowd.status.moderate': 'मध्यम',
    'crowd.status.high': 'उच्च',
    'crowd.status.critical': 'गंभीर',
    'crowd.currentStatus': 'वर्तमान स्थिति',
    'crowd.liveUpdates': 'लाइव अपडेट',
    'crowd.zones': 'मंदिर क्षेत्र',
    'crowd.mainDarshan': 'मुख्य दर्शन हॉल',
    'crowd.garbhaGriha': 'गर्भगृह',
    'crowd.pradakshina': 'प्रदक्षिणा पथ',
    'crowd.museum': 'संग्रहालय और प्रदर्शनी',
    'crowd.gomtiGhat': 'गोमती घाट',
    'crowd.gabbarHill': 'गब्बर हिल पथ',
    'crowd.ropeway': 'रोपवे स्टेशन',

    // Booking
    'booking.darshan': 'दर्शन बुकिंग',
    'booking.selectZone': 'क्षेत्र चुनें',
    'booking.selectDate': 'दिनांक चुनें',
    'booking.selectTime': 'समय स्लॉट चुनें',
    'booking.numberOfPeople': 'लोगों की संख्या',
    'booking.pilgrimName': 'तीर्थयात्री का नाम',
    'booking.pilgrimPhone': 'तीर्थयात्री का फ़ोन',
    'booking.specialAssistance': 'विशेष सहायता',
    'booking.bookNow': 'अभी बुक करें',
    'booking.confirmed': 'बुकिंग पुष्ट',
    'booking.qrCode': 'QR कोड',
    'booking.bookingId': 'बुकिंग आईडी',
    'booking.downloadQR': 'QR कोड डाउनलोड करें',
    'booking.status.pending': 'लंबित',
    'booking.status.confirmed': 'पुष्ट',
    'booking.status.cancelled': 'रद्द',
    'booking.status.completed': 'पूर्ण',

    // Emergency
    'emergency.report': 'आपातकाल की रिपोर्ट करें',
    'emergency.type': 'आपातकाल प्रकार',
    'emergency.description': 'विवरण',
    'emergency.location': 'स्थान',
    'emergency.contactInfo': 'संपर्क जानकारी',
    'emergency.reportNow': 'अभी रिपोर्ट करें',
    'emergency.alertSent': 'अधिकारियों को आपातकालीन अलर्ट भेजा गया',

    // Demo Mode
    'demo.title': 'डेमो मोड सक्रिय',
    'demo.description': 'सभी बुकिंग स्थानीय रूप से संग्रहीत, वास्तविक समय अपडेट सिम्युलेटेड',
    'demo.welcome': 'टेम्पल इनसाइट 360 में आपका स्वागत है - गुजरात मंदिर सहायता प्रणाली',

    // Dashboard
    'dashboard.welcome': 'गुजरात के पवित्र मंदिरों में आपका स्वागत है',
    'dashboard.currentlyViewing': 'वर्तमान में देख रहे हैं:',
    'dashboard.spiritualJourney': 'आपका आध्यात्मिक यात्रा साथी एक धन्य दर्शन अनुभव के लिए',
    'dashboard.bookToken': 'दर्शन टोकन बुक करें',
    'dashboard.activePilgrims': 'सक्रिय तीर्थयात्री',
    'dashboard.avgWaitTime': 'औसत प्रतीक्षा समय',
    'dashboard.zonesAvailable': 'उपलब्ध क्षेत्र',
    'dashboard.liveCrowdStatus': 'लाइव भीड़ और कतार स्थिति',
    'dashboard.realTimeUpdates': 'हर 5 सेकंड में रीयल-टाइम अपडेट',
    'dashboard.quickActions': 'त्वरित क्रियाएं',
    'dashboard.commonTasks': 'तीर्थयात्रियों के लिए सामान्य कार्य',
    'dashboard.findQueue': 'कतार खोजें',
    'dashboard.checkTimes': 'समय जांचें',
    'dashboard.liveStats': 'लाइव आंकड़े',
    'dashboard.density': 'घनत्व:',
    'dashboard.estWait': 'अनुमानित प्रतीक्षा:',

    // Language
    'language.select': 'भाषा चुनें',
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.gujarati': 'ગુજરાતી',

    // Authority Interface
    'authority.interface.title': 'प्राधिकरण डैशबोर्ड',
    'authority.role': 'प्राधिकरण',
    'status.active': 'सक्रिय',
    'authority.nav.heatmap': 'हीट मैप',
    'authority.nav.alerts': 'अलर्ट',
    'authority.nav.resources': 'संसाधन',
    'authority.nav.analytics': 'एनालिटिक्स',
    'authority.nav.monitoring': 'निगरानी',
  },

  gu: {
    // Common
    'app.name': 'મંદિર ઇનસાઇટ 360',
    'app.tagline': 'શોધો • જોડાવો • દિવ્ય ગુજરાતનો અનુભવ કરો',
    'common.back': 'પાછળ',
    'common.loading': 'લોડ થઈ રહ્યું છે...',
    'common.error': 'ભૂલ',
    'common.success': 'સફળતા',
    'common.cancel': 'રદ કરો',
    'common.confirm': 'પુષ્ટિ કરો',
    'common.save': 'સેવ કરો',
    'common.close': 'બંધ કરો',
    'common.refresh': 'રિફ્રેશ કરો',
    'common.search': 'શોધો',
    'common.filter': 'ફિલ્ટર',
    'common.select': 'પસંદ કરો',
    'common.date': 'તારીખ',
    'common.time': 'સમય',
    'common.status': 'સ્થિતિ',
    'common.name': 'નામ',
    'common.email': 'ઇમેઇલ',
    'common.phone': 'ફોન',
    'common.password': 'પાસવર્ડ',
    'common.submit': 'સબમિટ કરો',

    // Authentication
    'auth.login': 'સાઇન ઇન',
    'auth.register': 'ખાતું બનાવો',
    'auth.logout': 'સાઇન આઉટ',
    'auth.email': 'ઇમેઇલ સરનામું',
    'auth.password': 'પાસવર્ડ',
    'auth.confirmPassword': 'પાસવર્ડની પુષ્ટિ કરો',
    'auth.fullName': 'પૂરું નામ',
    'auth.phoneNumber': 'ફોન નંબર',
    'auth.role': 'ભૂમિકા',
    'auth.pilgrim': 'યાત્રી',
    'auth.authority': 'અધિકૃત',
    'auth.loginSuccess': 'પાછા આવવા બદલ સ્વાગત છે!',
    'auth.loginError': 'લૉગિન નિષ્ફળ. કૃપા કરીને તમારી માન્યતાઓ તપાસો.',
    'auth.registerSuccess': 'ખાતું સફળતાપૂર્વક બનાવ્યું!',
    'auth.registerError': 'નોંધણી નિષ્ફળ. કૃપા કરીને ફરીથી પ્રયાસ કરો.',
    'auth.logoutSuccess': 'સફળતાપૂર્વક લૉગ આઉટ',
    'auth.accessDenied': 'પ્રવેશ નકારાયો',
    'auth.noPermission': 'તમારી પાસે અધિકૃત પરવાનગીઓ નથી.',
    'auth.defaultCredentials': 'ડિફોલ્ટ ક્રેડેન્શિયલ્સ',
    'auth.demoPilgrim': 'ડેમો યાત્રી',
    'auth.demoAuthority': 'ડેમો અધિકૃત',
    'auth.useDemo': 'નમૂના ડેટા સાથે એપ્લિકેશન અજમાવવા માટે ઉપરના ડેમો બટનોનો ઉપયોગ કરો',
    'auth.noAccount': 'કોઈ ખાતું નથી?',
    'auth.createAccount': 'ખાતું બનાવો',
    'auth.backToRoles': 'ભૂમિકા પસંદગી પર પાછા',
    'auth.quickLogin': 'ડિફોલ્ટ ક્રેડેન્શિયલ્સ સાથે ઝડપી લૉગિન',

    // Role Selection
    'role.select': 'તમારી ભૂમિકા પસંદ કરો',
    'role.pilgrim.title': 'યાત્રી પ્રવેશ',
    'role.pilgrim.desc': 'દર્શન બુક કરો, ભીડના અપડેટ મેળવો, મંદિર સેવાઓ મેળવો',
    'role.pilgrim.features.booking': 'દર્શન ટોકન અને QR કોડ બુક કરો',
    'role.pilgrim.features.incidents': 'ઐતિહાસિક ઘટના રિપોર્ટ્સ',
    'role.pilgrim.features.crowd': 'ભીડ ટાળવાની ભલામણો',
    'role.pilgrim.features.assistance': 'વિશેષ સહાયતા સેવાઓ',
    'role.pilgrim.features.updates': 'રીઅલ-ટાઇમ અપડેટ્સ અને અલર્ટ્સ',
    'role.pilgrim.enter': 'યાત્રી તરીકે પ્રવેશ કરો',
    'role.authority.title': 'અધિકૃત પ્રવેશ',
    'role.authority.desc': 'મંદિર વ્યવસ્થાપન, ભીડ નિરીક્ષણ, કટોકટી પ્રતિસાદ',
    'role.authority.features.heatmaps': 'ભીડ હીટ મેપ્સ અને એનાલિટિક્સ',
    'role.authority.features.alerts': 'રીઅલ-ટાઇમ અલર્ટ મેનેજમેન્ટ',
    'role.authority.features.resources': 'રિસોર્સ મેનેજમેન્ટ ડેશબોર્ડ',
    'role.authority.features.footfall': 'ફૂટફોલ કાઉન્ટ અને આંકડાકીય માહિતી',
    'role.authority.features.monitoring': 'સ્માર્ટ મોનિટરિંગ કંટ્રોલ્સ',
    'role.authority.enter': 'અધિકૃત પોર્ટલ એક્સેસ કરો',
    'role.selectRole': 'ચાલુ રાખવા માટે તમારો પ્રવેશ પ્રકાર પસંદ કરો',
    'role.secureNote': 'સુરક્ષિત • રીઅલ-ટાઇમ • ગુજરાત મંદિર બોર્ડ દ્વારા વિશ્વસનીય',
    'role.demoNote': 'ડેમો મોડ: બધો ડેટા પ્રદર્શન હેતુઓ માટે સિમ્યુલેટેડ છે',

    // Navigation
    'nav.dashboard': 'ડેશબોર્ડ',
    'nav.home': 'હોમ',
    'nav.booking': 'દર્શન બુક કરો',
    'nav.bookings': 'બુકિંગ્સ',
    'nav.myBookings': 'મારી બુકિંગ્સ',
    'nav.crowdInfo': 'ભીડની માહિતી',
    'nav.facilities': 'સુવિધાઓ નકશો',
    'nav.transport': 'પરિવહન',
    'nav.emergency': 'કટોકટી',
    'nav.templeInfo': 'મંદિરની માહિતી',
    'nav.assistance': 'સહાયતા',
    'nav.specialAssistance': 'વિશેષ સહાયતા',
    'nav.incidents': 'ઘટનાઓ',
    'nav.historicalIncidents': 'ઐતિહાસિક ઘટનાઓ',
    'nav.crowdAvoidance': 'ભીડ ટાળવું',

    // Temples
    'temple.somnath': 'સોમનાથ મંદિર',
    'temple.dwarka': 'દ્વારકાધીશ મંદિર',
    'temple.ambaji': 'અંબાજી મંદિર',
    'temple.pavagadh': 'કાલિકા માતા મંદિર',
    'temple.select': 'મંદિર પસંદ કરો',
    'temple.location': 'સ્થળ',
    'temple.info': 'મંદિરની માહિતી',

    // Crowd Monitoring
    'crowd.density': 'ભીડની ઘનતા',
    'crowd.waitTime': 'રાહ જોવાનો સમય',
    'crowd.status.low': 'નીચું',
    'crowd.status.moderate': 'મધ્યમ',
    'crowd.status.high': 'ઊંચું',
    'crowd.status.critical': 'ગંભીર',
    'crowd.currentStatus': 'વર્તમાન સ્થિતિ',
    'crowd.liveUpdates': 'લાઇવ અપડેટ્સ',
    'crowd.zones': 'મંદિર વિસ્તારો',
    'crowd.mainDarshan': 'મુખ્ય દર્શન હોલ',
    'crowd.garbhaGriha': 'ગર્ભગૃહ',
    'crowd.pradakshina': 'પ્રદક્ષિણા પથ',
    'crowd.museum': 'સંગ્રહાલય અને પ્રદર્શન',
    'crowd.gomtiGhat': 'ગોમતી ઘાટ',
    'crowd.gabbarHill': 'ગબ્બર હિલ પથ',
    'crowd.ropeway': 'રોપવે સ્ટેશન',

    // Booking
    'booking.darshan': 'દર્શન બુકિંગ',
    'booking.selectZone': 'વિસ્તાર પસંદ કરો',
    'booking.selectDate': 'તારીખ પસંદ કરો',
    'booking.selectTime': 'સમય સ્લોટ પસંદ કરો',
    'booking.numberOfPeople': 'લોકોની સંખ્યા',
    'booking.pilgrimName': 'યાત્રીનું નામ',
    'booking.pilgrimPhone': 'યાત્રીનો ફોન',
    'booking.specialAssistance': 'વિશેષ સહાયતા',
    'booking.bookNow': 'હવે બુક કરો',
    'booking.confirmed': 'બુકિંગ પુષ્ટિ',
    'booking.qrCode': 'QR કોડ',
    'booking.bookingId': 'બુકિંગ આઇડી',
    'booking.downloadQR': 'QR કોડ ડાઉનલોડ કરો',
    'booking.status.pending': 'પેન્ડિંગ',
    'booking.status.confirmed': 'પુષ્ટિ',
    'booking.status.cancelled': 'રદ',
    'booking.status.completed': 'પૂર્ણ',

    // Emergency
    'emergency.report': 'કટોકટીની જાણ કરો',
    'emergency.type': 'કટોકટીનો પ્રકાર',
    'emergency.description': 'વર્ણન',
    'emergency.location': 'સ્થળ',
    'emergency.contactInfo': 'સંપર્ક માહિતી',
    'emergency.reportNow': 'હવે જાણ કરો',
    'emergency.alertSent': 'અધિકારીઓને કટોકટીની ચેતવણી મોકલાઈ',

    // Demo Mode
    'demo.title': 'ડેમો મોડ સક્રિય',
    'demo.description': 'બધી બુકિંગ્સ સ્થાનિક રીતે સંગ્રહિત, રીઅલ-ટાઇમ અપડેટ્સ સિમ્યુલેટેડ',
    'demo.welcome': 'ટેમ્પલ ઇનસાઇટ 360 માં આપનું સ્વાગત છે - ગુજરાત મંદિર સહાયતા સિસ્ટમ',

    // Dashboard
    'dashboard.welcome': 'ગુજરાતના પવિત્ર મંદિરોમાં તમારું સ્વાગત છે',
    'dashboard.currentlyViewing': 'હાલમાં જોઈ રહ્યા છો:',
    'dashboard.spiritualJourney': 'તમારા આધ્યાત્મિક પ્રવાસનો સાથી આશીર્વાદિત દર્શન અનુભવ માટે',
    'dashboard.bookToken': 'દર્શન ટોકન બુક કરો',
    'dashboard.activePilgrims': 'સક્રિય યાત્રીઓ',
    'dashboard.avgWaitTime': 'સરેરાશ રાહ સમય',
    'dashboard.zonesAvailable': 'ઉપલબ્ધ વિસ્તારો',
    'dashboard.liveCrowdStatus': 'લાઇવ ભીડ અને કતાર સ્થિતિ',
    'dashboard.realTimeUpdates': 'દર 5 સેકન્ડે રીઅલ-ટાઇમ અપડેટ્સ',
    'dashboard.quickActions': 'ઝડપી ક્રિયાઓ',
    'dashboard.commonTasks': 'યાત્રીઓ માટે સામાન્ય કાર્યો',
    'dashboard.findQueue': 'કતાર શોધો',
    'dashboard.checkTimes': 'સમય તપાસો',
    'dashboard.liveStats': 'લાઇવ આંકડાઓ',
    'dashboard.density': 'ઘનતા:',
    'dashboard.estWait': 'અંદાજિત રાહ:',

    // Language
    'language.select': 'ભાષા પસંદ કરો',
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.gujarati': 'ગુજરાતી',

    // Authority Interface
    'authority.interface.title': 'અધિકૃત ડેશબોર્ડ',
    'authority.role': 'અધિકૃત',
    'status.active': 'સક્રિય',
    'authority.nav.heatmap': 'હીટ મેપ',
    'authority.nav.alerts': 'અલર્ટ્સ',
    'authority.nav.resources': 'રિસોર્સ',
    'authority.nav.analytics': 'એનાલિટિક્સ',
    'authority.nav.monitoring': 'મોનિટરિંગ',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load language preference from localStorage
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('app_language') as Language;
      if (savedLanguage && ['en', 'hi', 'gu'].includes(savedLanguage)) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.warn('Failed to load language preference from localStorage');
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save language preference to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('app_language', lang);
    } catch (error) {
      console.warn('Failed to save language preference to localStorage');
    }
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if no translation found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const languages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'gu' as Language, name: 'Gujarati', nativeName: 'ગુજરાતી' },
  ];

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    languages,
  };

  // Show loading until initialized to prevent hydration issues
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};