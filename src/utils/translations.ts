// Translation utilities for Temple Insight 360
export type Language = 'en' | 'hi' | 'gu';

export const translations = {
  en: {
    // Common translations
    appName: 'Temple Insight 360',
    tagline: 'Your Divine Journey, Digitally Enhanced',
    back: 'Back',
    home: 'Home',
    bookings: 'Bookings',
    assistance: 'Assistance',
    incidents: 'Incidents',
    facilities: 'Facilities',
    transport: 'Transport',
    dashboard: 'Dashboard',
    heatMap: 'Heat Map',
    alerts: 'Alerts',
    resources: 'Resources',
    analytics: 'Analytics',
    monitoring: 'Monitoring',
    language: 'Language',
    
    // Temple names
    temples: {
      somnath: 'Somnath Temple',
      dwarka: 'Dwarkadhish Temple',
      ambaji: 'Ambaji Temple',
      pavagadh: 'Kalika Mata Temple'
    },
    
    // Zone names
    zones: {
      mainDarshan: 'Main Darshan Hall',
      garbhaGriha: 'Garbha Griha',
      pradakshina: 'Pradakshina Path',
      museum: 'Museum & Exhibition',
      gomtiGhat: 'Gomti Ghat',
      gabbarHill: 'Gabbar Hill Path',
      ropeway: 'Ropeway Station'
    },
    
    // Pilgrim Interface
    pilgrim: {
      title: 'Pilgrim',
      description: 'Your spiritual journey begins here',
      welcomeMessage: 'Welcome to your spiritual journey',
      
      // Navigation
      homeTab: 'Home',
      bookingsTab: 'Darshan Bookings',
      assistanceTab: 'Special Assistance',
      incidentsTab: 'Safety Reports',
      facilitiesTab: 'Temple Map',
      transportTab: 'Transport',
      
      // Features
      features: {
        bookDarshan: 'Book Darshan',
        viewBookings: 'My Bookings',
        crowdInfo: 'Crowd Information',
        emergencyHelp: 'Emergency Help',
        facilityMap: 'Facility Map',
        transportInfo: 'Transport Assistance'
      }
    },
    
    // Authority Interface
    authority: {
      title: 'Authority',
      subtitle: 'Authority Dashboard',
      description: 'Temple management and monitoring system',
      active: 'Active',
      
      // Navigation
      dashboardTab: 'Overview',
      heatmapTab: 'Crowd Heatmap',
      alertsTab: 'Alert Management',
      resourcesTab: 'Resource Control',
      analyticsTab: 'Footfall Analytics',
      monitoringTab: 'Live Monitoring'
    },
    
    // Status messages
    status: {
      low: 'Low',
      moderate: 'Moderate', 
      high: 'High',
      critical: 'Critical',
      waiting: 'Please wait...',
      loading: 'Loading...',
      success: 'Success',
      error: 'Error',
      warning: 'Warning'
    },
    
    // Emergency
    emergency: {
      sos: 'Emergency SOS',
      callHelp: 'Call for Help',
      reportIncident: 'Report Incident',
      medicalHelp: 'Medical Emergency',
      securityHelp: 'Security Help',
      fireEmergency: 'Fire Emergency'
    },
    
    // Booking
    booking: {
      selectTemple: 'Select Temple',
      selectZone: 'Select Zone',
      selectTime: 'Select Time',
      confirmBooking: 'Confirm Booking',
      bookingConfirmed: 'Booking Confirmed',
      qrCode: 'QR Code',
      downloadQR: 'Download QR',
      bookingDetails: 'Booking Details',
      bookDarshanToken: 'Book Darshan Token',
      selectDarshanZone: 'Select Darshan Zone',
      selectDate: 'Select Date',
      selectTimeSlot: 'Select Time Slot',
      groupSize: 'Group Size',
      phoneNumber: 'Phone Number',
      leadPilgrimName: 'Lead Pilgrim Name',
      bookingSummary: 'Booking Summary',
      expectedWaitTime: 'Expected wait time',
      confirmDarshanBooking: 'Confirm Darshan Booking',
      importantGuidelines: 'Important Guidelines',
      arrive15Minutes: 'Please arrive 15 minutes before your scheduled time',
      carryValidID: 'Carry a valid ID proof and your QR code',
      followDressCode: 'Follow dress code and maintain silence in darshan areas',
      mobileSilent: 'Mobile phones should be on silent mode',
      bookingCancelPolicy: 'Booking can be cancelled up to 1 hour before scheduled time',
      choosePreferredTime: 'Choose your preferred time',
      enterFullName: 'Enter full name',
      people: 'People',
      person: 'Person',
      loadingAvailableSlots: 'Loading available slots...',
      left: 'left',
      full: 'Full',
      recommended: 'Recommended',
      moderateWait: 'Moderate wait',
      longWait: 'Long wait',
      veryCrowded: 'Very crowded',
      wait: 'Wait',
      density: 'Density',
      pleaseFillAllFields: 'Please fill all required fields',
      darshanBookingConfirmed: 'Darshan booking confirmed! Check My Bookings for details.',
      creatingBooking: 'Creating Booking...'
    },
    
    // My Bookings
    myBookings: {
      title: 'My Bookings',
      activeBooking: 'active booking',
      activeBookings: 'active bookings',
      noBookingsYet: 'No bookings yet',
      bookFirstToken: 'Book your first darshan token to get started',
      loadingBookings: 'Loading your bookings...',
      timeUntilDarshan: 'Time Until Darshan',
      bookingExpired: 'Booking Expired',
      slotExpired: 'Slot Expired',
      daysRemaining: 'd remaining',
      hoursRemaining: 'h remaining',
      minutesRemaining: 'm remaining',
      startingSoon: 'Starting soon!',
      confirmed: 'Confirmed',
      pending: 'Pending',
      cancelled: 'Cancelled',
      completed: 'Completed',
      cancelBooking: 'Cancel Booking',
      viewQR: 'View QR',
      remember: 'Remember',
      keepQRReady: 'Keep QR code ready',
      bookingCancelled: 'Booking cancelled successfully',
      failedToCancelBooking: 'Failed to cancel booking'
    },
    
    // Facilities & Transport
    facilities: {
      facilitiesMap: 'Facilities Map',
      interactiveMap: 'Interactive map showing all facilities and services',
      facilityLegend: 'Facility Legend',
      closeDetails: 'Close Details',
      loadingMap: 'Loading interactive map...',
      water: 'Water',
      medical: 'Medical',
      transport: 'Transport',
      prasad: 'Prasad',
      toilets: 'Toilets',
      open: 'Open',
      closed: 'Closed',
      clean: 'Clean',
      available: 'Available',
      active: 'Active',
      capacity: 'Capacity'
    },
    
    transport: {
      liveShuttleTracking: 'Live Shuttle Tracking',
      realTimeLocation: 'Real-time location and availability of shuttle services',
      shuttleBooking: 'Book Shuttle Seats',
      reserveSeats: 'Reserve your seats on upcoming shuttles',
      selectRoute: 'Select Route',
      numberOfSeats: 'Number of Seats',
      bookSeats: 'Book Seats',
      parkingAvailability: 'Parking Availability',
      realTimeParkingSpace: 'Real-time parking space availability across all areas',
      transportGuidelines: 'Transport Guidelines',
      shuttleServices: 'Shuttle Services',
      parkingInformation: 'Parking Information',
      chooseShuttleRoute: 'Choose shuttle route',
      seatsLeft: 'seats left',
      seat: 'Seat',
      seats: 'Seats',
      shuttleBookingValid: 'Shuttle bookings are valid for the next departure. Please arrive at the stop 5 minutes early.',
      shuttlesRunEvery10Minutes: 'Shuttles run every 10-15 minutes during peak hours',
      prioritySeating: 'Priority seating for elderly and disabled pilgrims',
      freeShuttleService: 'Free shuttle service for all registered pilgrims',
      lastShuttleDeparture: 'Last shuttle departs 30 minutes after temple closing',
      parkingFees: 'Parking fees: ₹20 for 2-wheelers, ₹50 for 4-wheelers',
      vipParking: 'VIP parking available for ₹200 (advance booking required)',
      security247: 'Security provided 24/7 in all parking areas',
      evChargingStations: 'Electric vehicle charging stations available',
      at: 'At',
      next: 'Next',
      eta: 'ETA',
      occupancy: 'Occupancy',
      occupied: 'Occupied',
      spacesFree: 'spaces free',
      nearlyFull: 'nearly_full'
    },
    
    // Crowd Avoidance
    crowdAvoidance: {
      title: 'Crowd Avoidance Guide',
      smartRecommendations: 'Smart recommendations to help you avoid crowds and plan the perfect visit',
      bestTimeToday: 'Best Time Today',
      expectedCrowd: 'Expected crowd',
      bestDayThisWeek: 'Best Day This Week',
      typicallyCrowd: 'Typically crowd',
      bestSeason: 'Best Season',
      lowestYearlyCrowd: 'Lowest yearly crowd',
      avoidToday: 'Avoid Today',
      peakEveningRush: 'Peak evening rush',
      todaysHourlyCrowdForecast: 'Today\'s Hourly Crowd Forecast',
      realTimePredictions: 'Real-time predictions for the next 24 hours',
      weeklyCrowdForecast: 'Weekly Crowd Forecast',
      planYourVisitWeek: 'Plan your visit for the entire week',
      festivalAlert: 'Festival Alert',
      duringFestivals: 'During festivals like',
      expect200to300Higher: 'expect 200-300% higher crowds. Consider visiting 2-3 days before or after festival dates for a peaceful darshan.',
      seasonalCrowdTrends: 'Seasonal Crowd Trends',
      historicalDataForPlanning: 'Historical data to help you plan long-term visits',
      averageCrowd: 'Average Crowd',
      winter: 'Winter',
      summer: 'Summer',
      monsoon: 'Monsoon',
      best: 'Best',
      good: 'Good',
      avoid: 'Avoid',
      peak: 'Peak'
    },
    
    // Historical Incidents
    historicalIncidents: {
      title: 'Historical Incidents',
      learnFromPast: 'Learn from past incidents to ensure a safe pilgrimage experience',
      totalIncidents: 'Total Incidents (2024)',
      recentTrend: 'Recent Trend',
      safetyScore: 'Safety Score',
      filters: 'Filters',
      incidentType: 'Incident Type',
      allTypes: 'All Types',
      medical: 'Medical',
      crowdManagement: 'Crowd Management',
      safety: 'Safety',
      transportIssue: 'Transport',
      timeframe: 'Timeframe',
      lastMonth: 'Last Month',
      lastQuarter: 'Last Quarter',
      lastYear: 'Last Year',
      noIncidentsFound: 'No incidents found',
      noIncidentsMatchFilters: 'No incidents match your current filters',
      resolution: 'Resolution',
      preventiveMeasures: 'Preventive Measures',
      crowdLevel: 'Crowd Level',
      safetyCommitment: 'Safety Commitment',
      allIncidentsInvestigated: 'All incidents are thoroughly investigated and preventive measures are implemented to ensure pilgrim safety. Our continuous improvement approach has resulted in a',
      significantDecrease: 'significant decrease',
      stableTrend: 'stable trend',
      inIncidents: 'in incidents.',
      decreasing: 'Decreasing',
      stable: 'Stable',
      increasing: 'Increasing'
    },
    
    // Special Assistance
    specialAssistance: {
      title: 'Special Assistance Services',
      ensureComfortableDarshan: 'We ensure every pilgrim has a comfortable and safe darshan experience',
      elderlyAssistance: 'Elderly Assistance',
      differentlyAbledSupport: 'Differently Abled Support',
      childFamilyCare: 'Child & Family Care',
      medicalSupport: 'Medical Support',
      requestSpecialAssistance: 'Request Special Assistance',
      fillFormForAssistance: 'Fill out this form to request personalized assistance for your visit',
      fullName: 'Full Name',
      assistanceType: 'Assistance Type',
      selectAssistanceType: 'Select assistance type',
      preferredVisitTime: 'Preferred Visit Time',
      selectPreferredTimeSlot: 'Select preferred time slot',
      earlyMorning: 'Early Morning (5:00 - 7:00 AM)',
      morning: 'Morning (7:00 - 11:00 AM)',
      afternoon: 'Afternoon (11:00 - 4:00 PM)',
      evening: 'Evening (4:00 - 8:00 PM)',
      flexible: 'Flexible',
      specialRequirements: 'Special Requirements',
      describeSpecificNeeds: 'Please describe any specific needs or requirements...',
      submitAssistanceRequest: 'Submit Assistance Request',
      emergencyAssistance247: '24/7 Emergency Assistance',
      medicalEmergency: 'Medical Emergency',
      templeSecurity: 'Temple Security',
      locationServices: 'Location Services',
      assistanceServicesAvailable: 'All assistance services are available at dedicated counters near the main entrance. Look for the purple "Special Assistance" signage or ask any temple volunteer.',
      completeServices: 'Complete Services',
      moreServices: 'more services',
      assistanceRequestSubmitted: 'Special assistance request submitted successfully! You will be contacted within 30 minutes.'
    },
    
    // Dashboard
    dashboard: {
      welcomeToTemples: 'Welcome to Gujarat\'s Sacred Temples',
      currentlyViewing: 'Currently viewing',
      yourSpiritualCompanion: 'Your spiritual journey companion for a blessed darshan experience',
      activePilgrims: 'Active Pilgrims',
      avgWaitTime: 'Avg Wait Time',
      peakStatus: 'Peak Status',
      liveCrowdStatus: 'Live Crowd Status',
      realTimeUpdates: 'Real-time updates',
      quickActions: 'Quick Actions',
      commonTasks: 'Common tasks for your temple visit',
      bookToken: 'Book Token',
      findQueue: 'Find Queue',
      checkTimes: 'Check Times',
      liveStats: 'Live Stats',
      min: 'min'
    },
    
    // QR Code Display
    qrCode: {
      darshanBookingQRCode: 'Darshan Booking QR Code',
      presentQRAtEntrance: 'Present this QR code at the temple entrance for quick access',
      bookingID: 'Booking ID',
      darshanDate: 'Darshan Date',
      timeSlot: 'Time Slot',
      copy: 'Copy',
      copied: 'Copied!',
      share: 'Share',
      save: 'Save',
      keepQRCodeSafe: 'Keep this QR code safe. You\'ll need it for temple entry.',
      qrCodeLoading: 'QR Code Loading...',
      bookingDetailsCopied: 'Booking details copied to clipboard!',
      failedToCopyDetails: 'Failed to copy booking details',
      qrCodeDownloaded: 'QR code downloaded successfully!',
      failedToDownloadQR: 'Failed to download QR code',
      qrCodeNotAvailable: 'QR code not available'
    }
  },
  
  hi: {
    // Common translations
    appName: 'मंदिर इनसाइट 360',
    tagline: 'आपकी दिव्य यात्रा, डिजिटल रूप से बेहतर',
    back: 'वापस',
    home: 'होम',
    bookings: 'बुकिंग',
    assistance: 'सहायता',
    incidents: 'घटनाएं',
    facilities: 'सुविधाएं',
    transport: 'परिवहन',
    dashboard: 'डैशबोर्ड',
    heatMap: 'हीट मैप',
    alerts: 'अलर्ट',
    resources: 'संसाधन',
    analytics: 'एनालिटिक्स',
    monitoring: 'निगरानी',
    language: 'भाषा',
    
    // Temple names
    temples: {
      somnath: 'सोमनाथ मंदिर',
      dwarka: 'द्वारकाधीश मंदिर',
      ambaji: 'अम्बाजी मंदिर',
      pavagadh: 'कालिका माता मंदिर'
    },
    
    // Zone names
    zones: {
      mainDarshan: 'मुख्य दर्शन हॉल',
      garbhaGriha: 'गर्भगृह',
      pradakshina: 'प्रदक्षिणा पथ',
      museum: 'संग्रहालय और प्रदर्शनी',
      gomtiGhat: 'गोमती घाट',
      gabbarHill: 'गब्बर हिल पथ',
      ropeway: 'रोपवे स्टेशन'
    },
    
    // Pilgrim Interface
    pilgrim: {
      title: 'तीर्थयात्री',
      description: 'आपकी आध्यात्मिक यात्रा यहां शुरू होती है',
      welcomeMessage: 'आपकी आध्यात्मिक यात्रा में आपका स्वागत है',
      
      // Navigation
      homeTab: 'होम',
      bookingsTab: 'दर्शन बुकिंग',
      assistanceTab: 'विशेष सहायता',
      incidentsTab: 'सुरक्षा रिपोर्ट',
      facilitiesTab: 'मंदिर मानचित्र',
      transportTab: 'परिवहन',
      
      // Features
      features: {
        bookDarshan: 'दर्शन बुक करें',
        viewBookings: 'मेरी बुकिंग',
        crowdInfo: 'भीड़ की जानकारी',
        emergencyHelp: 'आपातकालीन सहायता',
        facilityMap: 'सुविधा मानचित्र',
        transportInfo: 'परिवहन सहायता'
      }
    },
    
    // Authority Interface
    authority: {
      title: 'प्राधिकरण',
      subtitle: 'प्राधिकरण डैशबोर्ड',
      description: 'मंदिर प्रबंधन और निगरानी प्रणाली',
      active: 'सक्रिय',
      
      // Navigation
      dashboardTab: 'अवलोकन',
      heatmapTab: 'भीड़ हीटमैप',
      alertsTab: 'अलर्ट प्रबंधन',
      resourcesTab: 'संसाधन नियंत्रण',
      analyticsTab: 'फुटफॉल एनालिटिक्स',
      monitoringTab: 'लाइव निगरानी'
    },
    
    // Status messages
    status: {
      low: 'कम',
      moderate: 'मध्यम',
      high: 'अधिक',
      critical: 'गंभीर',
      waiting: 'कृपया प्रतीक्षा करें...',
      loading: 'लोड हो रहा है...',
      success: 'सफलता',
      error: 'त्रुटि',
      warning: 'चेतावनी'
    },
    
    // Emergency
    emergency: {
      sos: 'आपातकालीन SOS',
      callHelp: 'सहायता के लिए कॉल करें',
      reportIncident: 'घटना की रिपोर्ट करें',
      medicalHelp: 'चिकित्सा आपातकाल',
      securityHelp: 'सुरक्षा सहायता',
      fireEmergency: 'अग्निशामक आपातकाल'
    },
    
    // Booking
    booking: {
      selectTemple: 'मंदिर चुनें',
      selectZone: 'क्षेत्र चुनें',
      selectTime: 'समय चुनें',
      confirmBooking: 'बुकिंग की पुष्टि करें',
      bookingConfirmed: 'बुकिंग की पुष्टि हो गई',
      qrCode: 'QR कोड',
      downloadQR: 'QR डाउनलोड करें',
      bookingDetails: 'बुकिंग विवरण',
      bookDarshanToken: 'दर्शन टोकन बुक करें',
      selectDarshanZone: 'दर्शन क्षेत्र चुनें',
      selectDate: 'तारीख चुनें',
      selectTimeSlot: 'समय स्लॉट चुनें',
      groupSize: 'समूह का आकार',
      phoneNumber: 'फोन नंबर',
      leadPilgrimName: 'मुख्य तीर्थयात्री का नाम',
      bookingSummary: 'बुकिंग सारांश',
      expectedWaitTime: 'अपेक्षित प्रतीक्षा समय',
      confirmDarshanBooking: 'दर्शन बुकिंग की पुष्टि करें',
      importantGuidelines: 'महत्वपूर्ण दिशानिर्देश',
      arrive15Minutes: 'कृपया अपने निर्धारित समय से 15 मिनट पहले पहुंचें',
      carryValidID: 'वैध आईडी प्रूफ और अपना QR कोड साथ रखें',
      followDressCode: 'ड्रेस कोड का पालन करें और दर्शन क्षेत्रों में शांति बनाए रखें',
      mobileSilent: 'मोबाइल फोन साइलेंट मोड पर होने चाहिए',
      bookingCancelPolicy: 'निर्धारित समय से 1 घंटे पहले तक बुकिंग रद्द की जा सकती है',
      choosePreferredTime: 'अपना पसंदीदा समय चुनें',
      enterFullName: 'पूरा नाम दर्ज करें',
      people: 'लोग',
      person: 'व्यक्ति',
      loadingAvailableSlots: 'उपलब्ध स्लॉट लोड हो रहे हैं...',
      left: 'बचे हैं',
      full: 'भरा हुआ',
      recommended: 'अनुशंसित',
      moderateWait: 'मध्यम प्रतीक्षा',
      longWait: 'लंबी प्रतीक्षा',
      veryCrowded: 'बहुत भीड़',
      wait: 'प्रतीक्षा',
      density: 'घनत्व',
      pleaseFillAllFields: 'कृपया सभी आवश्यक फील्ड भरें',
      darshanBookingConfirmed: 'दर्शन बुकिंग की पुष्टि हो गई! विवरण के लिए मेरी बुकिंग देखें।',
      creatingBooking: 'बुकिंग बनाई जा रही है...'
    },
    
    // My Bookings
    myBookings: {
      title: 'मेरी बुकिंग',
      activeBooking: 'सक्रिय बुकिंग',
      activeBookings: 'सक्रिय बुकिंग',
      noBookingsYet: 'अभी तक कोई बुकिंग नहीं',
      bookFirstToken: 'शुरू करने के लिए अपना पहला दर्शन टोकन बुक करें',
      loadingBookings: 'आपकी बुकिंग लोड हो रही है...',
      timeUntilDarshan: 'दर्शन तक का समय',
      bookingExpired: 'बुकिंग समाप्त हो गई',
      slotExpired: 'स्लॉट समाप्त',
      daysRemaining: 'दिन शेष',
      hoursRemaining: 'घंटे शेष',
      minutesRemaining: 'मिनट शेष',
      startingSoon: 'जल्द शुरू हो रहा है!',
      confirmed: 'पुष्टि की गई',
      pending: 'लंबित',
      cancelled: 'रद्द',
      completed: 'पूर्ण',
      cancelBooking: 'बुकिंग रद्द करें',
      viewQR: 'QR देखें',
      remember: 'याद रखें',
      keepQRReady: 'QR कोड तैयार रखें',
      bookingCancelled: 'बुकिंग सफलतापूर्वक रद्द हो गई',
      failedToCancelBooking: 'बुकिंग रद्द करने में विफल'
    },
    
    // Facilities & Transport
    facilities: {
      facilitiesMap: 'सुविधाएं मानचित्र',
      interactiveMap: 'सभी सुविधाओं और सेवाओं को दर्शाने वाला इंटरैक्टिव मानचित्र',
      facilityLegend: 'सुविधा लीजेंड',
      closeDetails: 'विवरण बंद करें',
      loadingMap: 'इंटरैक्टिव मानचित्र लोड हो रहा है...',
      water: 'पानी',
      medical: 'चिकित्सा',
      transport: 'परिवहन',
      prasad: 'प्रसाद',
      toilets: 'शौचालय',
      open: 'खुला',
      closed: 'बंद',
      clean: 'साफ',
      available: 'उपलब्ध',
      active: 'सक्रिय',
      capacity: 'क्षमता'
    },
    
    transport: {
      liveShuttleTracking: 'लाइव शटल ट्रैकिंग',
      realTimeLocation: 'शटल सेवाओं की रियल-टाइम स्थान और उपलब्धता',
      shuttleBooking: 'शटल सीटें बुक करें',
      reserveSeats: 'आगामी शटल पर अपनी सीटें आरक्षित करें',
      selectRoute: 'रूट चुनें',
      numberOfSeats: 'सीटों की संख्या',
      bookSeats: 'सीटें बुक करें',
      parkingAvailability: 'पार्किंग उपलब्धता',
      realTimeParkingSpace: 'सभी क्षेत्रों में रियल-टाइम पार्किंग स्थान उपलब्धता',
      transportGuidelines: 'परिवहन दिशानिर्देश',
      shuttleServices: 'शटल सेवाएं',
      parkingInformation: 'पार्किंग जानकारी',
      chooseShuttleRoute: 'शटल रूट चुनें',
      seatsLeft: 'सीटें बची हैं',
      seat: 'सीट',
      seats: 'सीटें',
      shuttleBookingValid: 'शटल बुकिंग अगले प्रस्थान के लिए मान्य है। कृपया स्टॉप पर 5 मिनट पहले पहुंचें।',
      shuttlesRunEvery10Minutes: 'शटल पीक घंटों के दौरान हर 10-15 मिनट में चलते हैं',
      prioritySeating: 'बुजुर्ग और विकलांग तीर्थयात्रियों के लिए प्राथमिकता सीटिंग',
      freeShuttleService: 'सभी पंजीकृत तीर्थयात्रियों के लिए मुफ्त शटल सेवा',
      lastShuttleDeparture: 'मंदिर बंद होने के 30 मिनट बाद अंतिम शटल प्रस्थान करती है',
      parkingFees: 'पार्किंग शुल्क: 2-व्हीलर के लिए ₹20, 4-व्हीलर के लिए ₹50',
      vipParking: 'VIP पार्किंग ₹200 में उपलब्ध (अग्रिम बुकिंग आवश्यक)',
      security247: 'सभी पार्किंग क्षेत्रों में 24/7 सुरक्षा प्रदान की जाती है',
      evChargingStations: 'इलेक्ट्रिक वाहन चार्जिंग स्टेशन उपलब्ध',
      at: 'पर',
      next: 'अगला',
      eta: 'अनुमानित समय',
      occupancy: 'अधिभोग',
      occupied: 'कब्जा',
      spacesFree: 'जगहें खाली',
      nearlyFull: 'लगभग भरा हुआ'
    },
    
    // Crowd Avoidance
    crowdAvoidance: {
      title: 'भीड़ बचाव गाइड',
      smartRecommendations: 'भीड़ से बचने और सही यात्रा की योजना बनाने में मदद के लिए स्मार्ट सुझाव',
      bestTimeToday: 'आज का सबसे अच्छा समय',
      expectedCrowd: 'अपेक्षित भीड़',
      bestDayThisWeek: 'इस सप्ताह का सबसे अच्छा दिन',
      typicallyCrowd: 'आम तौर पर भीड़',
      bestSeason: 'सबसे अच्छा मौसम',
      lowestYearlyCrowd: 'सबसे कम वार्षिक भीड़',
      avoidToday: 'आज बचें',
      peakEveningRush: 'शाम की पीक भीड़',
      todaysHourlyCrowdForecast: 'आज का प्रति घंटा भीड़ पूर्वानुमान',
      realTimePredictions: 'अगले 24 घंटों के लिए रियल-टाइम भविष्यवाणियां',
      weeklyCrowdForecast: 'साप्ताहिक भीड़ पूर्वानुमान',
      planYourVisitWeek: 'पूरे सप्ताह के लिए अपनी यात्रा की योजना बनाएं',
      festivalAlert: 'त्योहार अलर्ट',
      duringFestivals: 'जैसे त्योहारों के दौरान',
      expect200to300Higher: '200-300% अधिक भीड़ की अपेक्षा करें। शांतिपूर्ण दर्शन के लिए त्योहार की तारीखों से 2-3 दिन पहले या बाद में जाने पर विचार करें।',
      seasonalCrowdTrends: 'मौसमी भीड़ रुझान',
      historicalDataForPlanning: 'लंबी अवधि की यात्राओं की योजना बनाने में मदद के लिए ऐतिहासिक डेटा',
      averageCrowd: 'औसत भीड़',
      winter: 'सर्दी',
      summer: 'गर्मी',
      monsoon: 'मानसून',
      best: 'सर्वश्रेष्ठ',
      good: 'अच्छा',
      avoid: 'बचें',
      peak: 'पीक'
    },
    
    // Historical Incidents
    historicalIncidents: {
      title: 'ऐतिहासिक घटनाएं',
      learnFromPast: 'सुरक्षित तीर्थयात्रा अनुभव सुनिश्चित करने के लिए पिछली घटनाओं से सीखें',
      totalIncidents: 'कुल घटनाएं (2024)',
      recentTrend: 'हालिया रुझान',
      safetyScore: 'सुरक्षा स्कोर',
      filters: 'फ़िल्टर',
      incidentType: 'घटना प्रकार',
      allTypes: 'सभी प्रकार',
      medical: 'चिकित्सा',
      crowdManagement: 'भीड़ प्रबंधन',
      safety: 'सुरक्षा',
      transportIssue: 'परिवहन',
      timeframe: 'समय सीमा',
      lastMonth: 'पिछला महीना',
      lastQuarter: 'पिछली तिमाही',
      lastYear: 'पिछला वर्ष',
      noIncidentsFound: 'कोई घटना नहीं मिली',
      noIncidentsMatchFilters: 'कोई भी घटना आपके वर्तमान फ़िल्टर से मेल नहीं खाती',
      resolution: 'समाधान',
      preventiveMeasures: 'निवारक उपाय',
      crowdLevel: 'भीड़ स्तर',
      safetyCommitment: 'सुरक्षा प्रतिबद्धता',
      allIncidentsInvestigated: 'तीर्थयात्रियों की सुरक्षा सुनिश्चित करने के लिए सभी घटनाओं की गहन जांच की जाती है और निवारक उपाय लागू किए जाते हैं। हमारे निरंतर सुधार दृष्टिकोण के परिणामस्वरूप घटनाओं में',
      significantDecrease: 'महत्वपूर्ण कमी',
      stableTrend: 'स्थिर रुझान',
      inIncidents: 'आई है।',
      decreasing: 'घट रहा है',
      stable: 'स्थिर',
      increasing: 'बढ़ रहा है'
    },
    
    // Special Assistance
    specialAssistance: {
      title: 'विशेष सहायता सेवाएं',
      ensureComfortableDarshan: 'हम सुनिश्चित करते हैं कि प्रत्येक तीर्थयात्री को आरामदायक और सुरक्षित दर्शन अनुभव मिले',
      elderlyAssistance: 'बुजुर्ग सहायता',
      differentlyAbledSupport: 'विशेष रूप से सक्षम समर्थन',
      childFamilyCare: 'बच्चे और परिवार की देखभाल',
      medicalSupport: 'चिकित्सा सहायता',
      requestSpecialAssistance: 'विशेष सहायता का अनुरोध करें',
      fillFormForAssistance: 'अपनी यात्रा के लिए व्यक्तिगत सहायता का अनुरोध करने के लिए यह फॉर्म भरें',
      fullName: 'पूरा नाम',
      assistanceType: 'सहायता प्रकार',
      selectAssistanceType: 'सहायता प्रकार चुनें',
      preferredVisitTime: 'पसंदीदा यात्रा समय',
      selectPreferredTimeSlot: 'पसंदीदा समय स्लॉट चुनें',
      earlyMorning: 'सुबह जल्दी (5:00 - 7:00 AM)',
      morning: 'सुबह (7:00 - 11:00 AM)',
      afternoon: 'दोपहर (11:00 - 4:00 PM)',
      evening: 'शाम (4:00 - 8:00 PM)',
      flexible: 'लचीला',
      specialRequirements: 'विशेष आवश्यकताएं',
      describeSpecificNeeds: 'कृपया किसी विशिष्ट जरूरत या आवश्यकता का वर्णन करें...',
      submitAssistanceRequest: 'सहायता अनुरोध सबमिट करें',
      emergencyAssistance247: '24/7 आपातकालीन सहायता',
      medicalEmergency: 'चिकित्सा आपातकाल',
      templeSecurity: 'मंदिर सुरक्षा',
      locationServices: 'स्थान सेवाएं',
      assistanceServicesAvailable: 'सभी सहायता सेवाएं मुख्य प्रवेश द्वार के पास समर्पित काउंटरों पर उपलब्ध हैं। बैंगनी "विशेष सहायता" साइनेज देखें या किसी भी मंदिर स्वयंसेवक से पूछें।',
      completeServices: 'पूर्ण सेवाएं',
      moreServices: 'अधिक सेवाएं',
      assistanceRequestSubmitted: 'विशेष सहायता अनुरोध सफलतापूर्वक सबमिट किया गया! आपसे 30 मिनट के भीतर संपर्क किया जाएगा।'
    },
    
    // Dashboard
    dashboard: {
      welcomeToTemples: 'गुजरात के पवित्र मंदिरों में आपका स्वागत है',
      currentlyViewing: 'वर्तमान में देख रहे हैं',
      yourSpiritualCompanion: 'आपकी आध्यात्मिक यात्रा साथी एक धन्य दर्शन अनुभव के लिए',
      activePilgrims: 'सक्रिय तीर्थयात्री',
      avgWaitTime: 'औसत प्रतीक्षा समय',
      peakStatus: 'पीक स्थिति',
      liveCrowdStatus: 'लाइव भीड़ स्थिति',
      realTimeUpdates: 'रियल-टाइम अपडेट',
      quickActions: 'त्वरित क्रियाएं',
      commonTasks: 'आपकी मंदिर यात्रा के लिए सामान्य कार्य',
      bookToken: 'टोकन बुक करें',
      findQueue: 'कतार खोजें',
      checkTimes: 'समय जांचें',
      liveStats: 'लाइव आंकड़े',
      min: 'मिनट'
    },
    
    // QR Code Display
    qrCode: {
      darshanBookingQRCode: 'दर्शन बुकिंग QR कोड',
      presentQRAtEntrance: 'त्वरित पहुंच के लिए मंदिर के प्रवेश द्वार पर यह QR कोड प्रस्तुत करें',
      bookingID: 'बुकिंग ID',
      darshanDate: 'दर्शन तारीख',
      timeSlot: 'समय स्लॉट',
      copy: 'कॉपी',
      copied: 'कॉपी किया!',
      share: 'शेयर',
      save: 'सहेजें',
      keepQRCodeSafe: 'इस QR कोड को सुरक्षित रखें। मंदिर प्रवेश के लिए आपको इसकी आवश्यकता होगी।',
      qrCodeLoading: 'QR कोड लोड हो रहा है...',
      bookingDetailsCopied: 'बुकिंग विवरण क्लिपबोर्ड पर कॉपी किया गया!',
      failedToCopyDetails: 'बुकिंग विवरण कॉपी करने में विफल',
      qrCodeDownloaded: 'QR कोड सफलतापूर्वक डाउनलोड किया गया!',
      failedToDownloadQR: 'QR कोड डाउनलोड करने में विफल',
      qrCodeNotAvailable: 'QR कोड उपलब्ध नहीं है'
    }
  },
  
  gu: {
    // Common translations
    appName: 'મંદિર ઇનસાઇટ 360',
    tagline: 'તમારી દિવ્ય યાત્રા, ડિજિટલ રીતે વિકસિત',
    back: 'પાછા',
    home: 'હોમ',
    bookings: 'બુકિંગ',
    assistance: 'સહાયતા',
    incidents: 'ઘટનાઓ',
    facilities: 'સુવિધાઓ',
    transport: 'પરિવહન',
    dashboard: 'ડેશબોર્ડ',
    heatMap: 'હીટ મેપ',
    alerts: 'અલર્ટ',
    resources: 'સંસાધનો',
    analytics: 'એનાલિટિક્સ',
    monitoring: 'મોનિટરિંગ',
    language: 'ભાષા',
    
    // Temple names
    temples: {
      somnath: 'સોમનાથ મંદિર',
      dwarka: 'દ્વારકાધીશ મંદિર',
      ambaji: 'અંબાજી મંદિર',
      pavagadh: 'કાલિકા માતા મંદિર'
    },
    
    // Zone names
    zones: {
      mainDarshan: 'મુખ્ય દર્શન હોલ',
      garbhaGriha: 'ગર્ભગૃહ',
      pradakshina: 'પ્રદક્ષિણા પથ',
      museum: 'મ્યુઝિયમ અને પ્રદર્શન',
      gomtiGhat: 'ગોમતી ઘાટ',
      gabbarHill: 'ગબ્બર હિલ પાથ',
      ropeway: 'રોપવે સ્ટેશન'
    },
    
    // Pilgrim Interface
    pilgrim: {
      title: 'યાત્રી',
      description: 'તમારી આધ્યાત્મિક યાત્રા અહીંથી શરૂ થાય છે',
      welcomeMessage: 'તમારી આધ્યાત્મિક યાત્રામાં આપનું સ્વાગત છે',
      
      // Navigation
      homeTab: 'હોમ',
      bookingsTab: 'દર્શન બુકિંગ',
      assistanceTab: 'વિશેષ સહાયતા',
      incidentsTab: 'સુરક્ષા રિપોર્ટ',
      facilitiesTab: 'મંદિર નકશો',
      transportTab: 'પરિવહન',
      
      // Features
      features: {
        bookDarshan: 'દર્શન બુક કરો',
        viewBookings: 'મારી બુકિંગ',
        crowdInfo: 'ભીડની માહિતી',
        emergencyHelp: 'કટોકટી સહાય',
        facilityMap: 'સુવિધા નકશો',
        transportInfo: 'પરિવહન સહાય'
      }
    },
    
    // Authority Interface
    authority: {
      title: 'અધિકારી',
      subtitle: 'અધિકારી ડેશબોર્ડ',
      description: 'મંદિર વ્યવસ્થાપન અને મોનિટરિંગ સિસ્ટમ',
      active: 'સક્રિય',
      
      // Navigation
      dashboardTab: 'ઓવરવ્યુ',
      heatmapTab: 'ભીડ હીટમેપ',
      alertsTab: 'અલર્ટ મેનેજમેન્ટ',
      resourcesTab: 'રિસોર્સ કંટ્રોલ',
      analyticsTab: 'ફૂટફોલ એનાલિટિક્સ',
      monitoringTab: 'લાઇવ મોનિટરિંગ'
    },
    
    // Status messages
    status: {
      low: 'ઓછું',
      moderate: 'મધ્યમ',
      high: 'વધુ',
      critical: 'ગંભીર',
      waiting: 'કૃપા કરીને રાહ જુઓ...',
      loading: 'લોડ થઈ રહ્યું છે...',
      success: 'સફળતા',
      error: 'ભૂલ',
      warning: 'ચેતવણી'
    },
    
    // Emergency
    emergency: {
      sos: 'કટોકટી SOS',
      callHelp: 'મદદ માટે કોલ કરો',
      reportIncident: 'ઘટનાની જાણ કરો',
      medicalHelp: 'તબીબી કટોકટી',
      securityHelp: 'સુરક્ષા મદદ',
      fireEmergency: 'આગ કટોકટી'
    },
    
    // Booking
    booking: {
      selectTemple: 'મંદિર પસંદ કરો',
      selectZone: 'ક્ષેત્ર પસંદ કરો',
      selectTime: 'સમય પસંદ કરો',
      confirmBooking: 'બુકિંગની પુષ્ટિ કરો',
      bookingConfirmed: 'બુકિંગની પુષ્ટિ થઈ',
      qrCode: 'QR કોડ',
      downloadQR: 'QR ડાઉનલોડ કરો',
      bookingDetails: 'બુકિંગ વિગતો',
      bookDarshanToken: 'દર્શન ટોકન બુક કરો',
      selectDarshanZone: 'દર્શન ક્ષેત્ર પસંદ કરો',
      selectDate: 'તારીખ પસંદ કરો',
      selectTimeSlot: 'સમય સ્લોટ પસંદ કરો',
      groupSize: 'જૂથનું કદ',
      phoneNumber: 'ફોન નંબર',
      leadPilgrimName: 'મુખ્ય યાત્રીનું નામ',
      bookingSummary: 'બુકિંગ સારાંશ',
      expectedWaitTime: 'અપેક્ષિત રાહ જોવાનો સમય',
      confirmDarshanBooking: 'દર્શન બુકિંગની પુષ્ટિ કરો',
      importantGuidelines: 'મહત્વપૂર્ણ માર્ગદર્શિકા',
      arrive15Minutes: 'કૃપા કરીને તમારા નિર્ધારિત સમય કરતાં 15 મિનિટ પહેલાં પહોંચો',
      carryValidID: 'માન્ય ID પુરાવો અને તમારો QR કોડ સાથે રાખો',
      followDressCode: 'ડ્રેસ કોડનું પાલન કરો અને દર્શન વિસ્તારોમાં શાંતિ જાળવો',
      mobileSilent: 'મોબાઇલ ફોન સાઇલન્ટ મોડ પર હોવા જોઈએ',
      bookingCancelPolicy: 'નિર્ધારિત સમય કરતાં 1 કલાક પહેલાં બુકિંગ રદ કરી શકાય છે',
      choosePreferredTime: 'તમારો પસંદગીનો સમય પસંદ કરો',
      enterFullName: 'સંપૂર્ણ નામ દાખલ કરો',
      people: 'લોકો',
      person: 'વ્યક્તિ',
      loadingAvailableSlots: 'ઉપલબ્ધ સ્લોટ લોડ થઈ રહ્યા છે...',
      left: 'બાકી છે',
      full: 'ભરેલું',
      recommended: 'ભલામણ કરેલ',
      moderateWait: 'મધ્યમ રાહ',
      longWait: 'લાંબી રાહ',
      veryCrowded: 'ખૂબ ભીડ',
      wait: 'રાહ',
      density: 'ઘનતા',
      pleaseFillAllFields: 'કૃપા કરીને તમામ આવશ્યક ફીલ્ડ ભરો',
      darshanBookingConfirmed: 'દર્શન બુકિંગની પુષ્ટિ થઈ! વિગતો માટે મારી બુકિંગ જુઓ.',
      creatingBooking: 'બુકિંગ બનાવી રહ્યા છીએ...'
    },
    
    // My Bookings
    myBookings: {
      title: 'મારી બુકિંગ',
      activeBooking: 'સક્રિય બુકિંગ',
      activeBookings: 'સક્રિય બુકિંગ',
      noBookingsYet: 'હજી સુધી કોઈ બુકિંગ નથી',
      bookFirstToken: 'શરૂ કરવા માટે તમારું પ્રથમ દર્શન ટોકન બુક કરો',
      loadingBookings: 'તમારી બુકિંગ લોડ થઈ રહી છે...',
      timeUntilDarshan: 'દર્શન સુધીનો સમય',
      bookingExpired: 'બુકિંગ સમાપ્ત થઈ',
      slotExpired: 'સ્લોટ સમાપ્ત',
      daysRemaining: 'દિવસ બાકી',
      hoursRemaining: 'કલાક બાકી',
      minutesRemaining: 'મિનિટ બાકી',
      startingSoon: 'ટૂંક સમયમાં શરૂ થઈ રહ્યું છે!',
      confirmed: 'પુષ્ટિ થઈ',
      pending: 'બાકી',
      cancelled: 'રદ',
      completed: 'પૂર્ણ',
      cancelBooking: 'બુકિંગ રદ કરો',
      viewQR: 'QR જુઓ',
      remember: 'યાદ રાખો',
      keepQRReady: 'QR કોડ તૈયાર રાખો',
      bookingCancelled: 'બુકિંગ સફળતાપૂર્વક રદ થઈ',
      failedToCancelBooking: 'બુકિંગ રદ કરવામાં નિષ્ફળ'
    },
    
    // Facilities & Transport
    facilities: {
      facilitiesMap: 'સુવિધાઓ નકશો',
      interactiveMap: 'તમામ સુવિધાઓ અને સેવાઓ દર્શાવતો ઇન્ટરેક્ટિવ નકશો',
      facilityLegend: 'સુવિધા લીજન્ડ',
      closeDetails: 'વિગતો બંધ કરો',
      loadingMap: 'ઇન્ટરેક્ટિવ નકશો લોડ થઈ રહ્યો છે...',
      water: 'પાણી',
      medical: 'તબીબી',
      transport: 'પરિવહન',
      prasad: 'પ્રસાદ',
      toilets: 'શૌચાલય',
      open: 'ખુલ્લું',
      closed: 'બંધ',
      clean: 'સ્વચ્છ',
      available: 'ઉપલબ્ધ',
      active: 'સક્રિય',
      capacity: 'ક્ષમતા'
    },
    
    transport: {
      liveShuttleTracking: 'લાઇવ શટલ ટ્રેકિંગ',
      realTimeLocation: 'શટલ સેવાઓની રિયલ-ટાઇમ સ્થાન અને ઉપલબ્ધતા',
      shuttleBooking: 'શટલ સીટ બુક કરો',
      reserveSeats: 'આગામી શટલ પર તમારી સીટ અનામત રાખો',
      selectRoute: 'રૂટ પસંદ કરો',
      numberOfSeats: 'સીટોની સંખ્યા',
      bookSeats: 'સીટ બુક કરો',
      parkingAvailability: 'પાર્કિંગ ઉપલબ્ધતા',
      realTimeParkingSpace: 'તમામ વિસ્તારોમાં રિયલ-ટાઇમ પાર્કિંગ સ્થાન ઉપલબ્ધતા',
      transportGuidelines: 'પરિવહન માર્ગદર્શિકા',
      shuttleServices: 'શટલ સેવાઓ',
      parkingInformation: 'પાર્કિંગ માહિતી',
      chooseShuttleRoute: 'શટલ રૂટ પસંદ કરો',
      seatsLeft: 'સીટ બાકી છે',
      seat: 'સીટ',
      seats: 'સીટ',
      shuttleBookingValid: 'શટલ બુકિંગ આગામી પ્રસ્થાન માટે માન્ય છે. કૃપા કરીને સ્ટોપ પર 5 મિનિટ પહેલાં પહોંચો.',
      shuttlesRunEvery10Minutes: 'શટલ પીક કલાકો દરમિયાન દર 10-15 મિનિટે ચાલે છે',
      prioritySeating: 'વૃદ્ધ અને અપંગ યાત્રીઓ માટે પ્રાથમિકતા સીટિંગ',
      freeShuttleService: 'તમામ નોંધાયેલા યાત્રીઓ માટે મફત શટલ સેવા',
      lastShuttleDeparture: 'મંદિર બંધ થયા પછી 30 મિનિટમાં છેલ્લું શટલ પ્રસ્થાન કરે છે',
      parkingFees: 'પાર્કિંગ ફી: 2-વ્હીલર માટે ₹20, 4-વ્હીલર માટે ₹50',
      vipParking: 'VIP પાર્કિંગ ₹200 માં ઉપલબ્ધ (અગ્રિમ બુકિંગ જરૂરી)',
      security247: 'તમામ પાર્કિંગ વિસ્તારોમાં 24/7 સુરક્ષા પૂરી પાડવામાં આવે છે',
      evChargingStations: 'ઇલેક્ટ્રિક વાહન ચાર્જિંગ સ્ટેશન ઉપલબ્ધ',
      at: 'પર',
      next: 'આગળ',
      eta: 'અંદાજિત સમય',
      occupancy: 'અધિકૃતતા',
      occupied: 'કબજો',
      spacesFree: 'જગ્યાઓ ખાલી',
      nearlyFull: 'લગભગ ભરેલું'
    },
    
    // Crowd Avoidance
    crowdAvoidance: {
      title: 'ભીડ ટાળવાની માર્ગદર્શિકા',
      smartRecommendations: 'ભીડ ટાળવા અને યોગ્ય મુલાકાતની યોજના બનાવવામાં મદદ માટે સ્માર્ટ સલાહ',
      bestTimeToday: 'આજનો શ્રેષ્ઠ સમય',
      expectedCrowd: 'અપેક્ષિત ભીડ',
      bestDayThisWeek: 'આ અઠવાડિયાનો શ્રેષ્ઠ દિવસ',
      typicallyCrowd: 'સામાન્ય રીતે ભીડ',
      bestSeason: 'શ્રેષ્ઠ ઋતુ',
      lowestYearlyCrowd: 'સૌથી ઓછી વાર્ષિક ભીડ',
      avoidToday: 'આજે ટાળો',
      peakEveningRush: 'સાંજની પીક ભીડ',
      todaysHourlyCrowdForecast: 'આજનું કલાકદીઠ ભીડ અનુમાન',
      realTimePredictions: 'આગામી 24 કલાક માટે રિયલ-ટાઇમ આગાહીઓ',
      weeklyCrowdForecast: 'સાપ્તાહિક ભીડ અનુમાન',
      planYourVisitWeek: 'સંપૂર્ણ અઠવાડિયા માટે તમારી મુલાકાતની યોજના બનાવો',
      festivalAlert: 'તહેવાર ચેતવણી',
      duringFestivals: 'જેવા તહેવારો દરમિયાન',
      expect200to300Higher: '200-300% વધુ ભીડની અપેક્ષા રાખો. શાંતિપૂર્ણ દર્શન માટે તહેવારની તારીખોથી 2-3 દિવસ પહેલાં અથવા પછી જવાનું વિચારો.',
      seasonalCrowdTrends: 'મોસમી ભીડ વલણો',
      historicalDataForPlanning: 'લાંબા ગાળાની મુલાકાતોની યોજના બનાવવા માટે ઐતિહાસિક ડેટા',
      averageCrowd: 'સરેરાશ ભીડ',
      winter: 'શિયાળો',
      summer: 'ઉનાળો',
      monsoon: 'ચોમાસું',
      best: 'શ્રેષ્ઠ',
      good: 'સારું',
      avoid: 'ટાળો',
      peak: 'પીક'
    },
    
    // Historical Incidents
    historicalIncidents: {
      title: 'ઐતિહાસિક ઘટનાઓ',
      learnFromPast: 'સુરક્ષિત તીર્થયાત્રા અનુભવ સુનિશ્ચિત કરવા માટે ભૂતકાળની ઘટનાઓમાંથી શીખો',
      totalIncidents: 'કુલ ઘટનાઓ (2024)',
      recentTrend: 'તાજેતરના વલણ',
      safetyScore: 'સુરક્ષા સ્કોર',
      filters: 'ફિલ્ટર્સ',
      incidentType: 'ઘટના પ્રકાર',
      allTypes: 'બધા પ્રકાર',
      medical: 'તબીબી',
      crowdManagement: 'ભીડ વ્યવસ્થાપન',
      safety: 'સુરક્ષા',
      transportIssue: 'પરિવહન',
      timeframe: 'સમય મર્યાદા',
      lastMonth: 'છેલ્લો મહિનો',
      lastQuarter: 'છેલ્લું ત્રિમાસિક',
      lastYear: 'છેલ્લું વર્ષ',
      noIncidentsFound: 'કોઈ ઘટના મળી નથી',
      noIncidentsMatchFilters: 'કોઈ પણ ઘટના તમારા વર્તમાન ફિલ્ટર્સ સાથે મેળ ખાતી નથી',
      resolution: 'ઉકેલ',
      preventiveMeasures: 'નિવારક પગલાં',
      crowdLevel: 'ભીડ સ્તર',
      safetyCommitment: 'સુરક્ષા પ્રતિબદ્ધતા',
      allIncidentsInvestigated: 'યાત્રીઓની સુરક્ષા સુનિશ્ચિત કરવા માટે તમામ ઘટનાઓની સંપૂર્ણ તપાસ કરવામાં આવે છે અને નિવારક પગલાં લાગુ કરવામાં આવે છે. અમારા સતત સુધારા અભિગમના પરિણામે ઘટનાઓમાં',
      significantDecrease: 'નોંધપાત્ર ઘટાડો',
      stableTrend: 'સ્થિર વલણ',
      inIncidents: 'થયો છે.',
      decreasing: 'ઘટી રહ્યું છે',
      stable: 'સ્થિર',
      increasing: 'વધી રહ્યું છે'
    },
    
    // Special Assistance
    specialAssistance: {
      title: 'વિશેષ સહાય સેવાઓ',
      ensureComfortableDarshan: 'અમે સુનિશ્ચિત કરીએ છીએ કે દરેક યાત્રીને આરામદાયક અને સુરક્ષિત દર્શન અનુભવ મળે',
      elderlyAssistance: 'વૃદ્ધ સહાય',
      differentlyAbledSupport: 'વિશેષ રીતે સક્ષમ આધાર',
      childFamilyCare: 'બાળક અને કુટુંબ સંભાળ',
      medicalSupport: 'તબીબી સહાય',
      requestSpecialAssistance: 'વિશેષ સહાયની વિનંતી કરો',
      fillFormForAssistance: 'તમારી મુલાકાત માટે વ્યક્તિગત સહાયની વિનંતી કરવા માટે આ ફોર્મ ભરો',
      fullName: 'સંપૂર્ણ નામ',
      assistanceType: 'સહાય પ્રકાર',
      selectAssistanceType: 'સહાય પ્રકાર પસંદ કરો',
      preferredVisitTime: 'પસંદગીનો મુલાકાત સમય',
      selectPreferredTimeSlot: 'પસંદગીનો સમય સ્લોટ પસંદ કરો',
      earlyMorning: 'વહેલી સવાર (5:00 - 7:00 AM)',
      morning: 'સવાર (7:00 - 11:00 AM)',
      afternoon: 'બપોર (11:00 - 4:00 PM)',
      evening: 'સાંજ (4:00 - 8:00 PM)',
      flexible: 'લવચીક',
      specialRequirements: 'વિશેષ આવશ્યકતાઓ',
      describeSpecificNeeds: 'કૃપા કરીને કોઈપણ વિશિષ્ટ જરૂરિયાત અથવા આવશ્યકતાનું વર્ણન કરો...',
      submitAssistanceRequest: 'સહાય વિનંતી સબમિટ કરો',
      emergencyAssistance247: '24/7 કટોકટી સહાય',
      medicalEmergency: 'તબીબી કટોકટી',
      templeSecurity: 'મંદિર સુરક્ષા',
      locationServices: 'સ્થાન સેવાઓ',
      assistanceServicesAvailable: 'તમામ સહાય સેવાઓ મુખ્ય પ્રવેશદ્વાર પાસે સમર્પિત કાઉન્ટર પર ઉપલબ્ધ છે. જાંબલી "વિશેષ સહાય" સંકેત જુઓ અથવા કોઈપણ મંદિર સ્વયંસેવકને પૂછો.',
      completeServices: 'સંપૂર્ણ સેવાઓ',
      moreServices: 'વધુ સેવાઓ',
      assistanceRequestSubmitted: 'વિશેષ સહાય વિનંતી સફળતાપૂર્વક સબમિટ થઈ! તમને 30 મિનિટની અંદર સંપર્ક કરવામાં આવશે.'
    },
    
    // Dashboard
    dashboard: {
      welcomeToTemples: 'ગુજરાતના પવિત્ર મંદિરોમાં આપનું સ્વાગત છે',
      currentlyViewing: 'હાલમાં જોઈ રહ્યા છીએ',
      yourSpiritualCompanion: 'તમારી આધ્યાત્મિક યાત્રા સાથી એક આશીર્વાદિત દર્શન અનુભવ માટે',
      activePilgrims: 'સક્રિય યાત્રીઓ',
      avgWaitTime: 'સરેરાશ રાહ જોવાનો સમય',
      peakStatus: 'પીક સ્થિતિ',
      liveCrowdStatus: 'લાઇવ ભીડ સ્થિતિ',
      realTimeUpdates: 'રિયલ-ટાઇમ અપડેટ્સ',
      quickActions: 'ઝડપી ક્રિયાઓ',
      commonTasks: 'તમારી મંદિર મુલાકાત માટે સામાન્ય કાર્યો',
      bookToken: 'ટોકન બુક કરો',
      findQueue: 'કતાર શોધો',
      checkTimes: 'સમય તપાસો',
      liveStats: 'લાઇવ આંકડા',
      min: 'મિનિટ'
    },
    
    // QR Code Display
    qrCode: {
      darshanBookingQRCode: 'દર્શન બુકિંગ QR કોડ',
      presentQRAtEntrance: 'ઝડપી પ્રવેશ માટે મંદિર પ્રવેશદ્વાર પર આ QR કોડ રજૂ કરો',
      bookingID: 'બુકિંગ ID',
      darshanDate: 'દર્શન તારીખ',
      timeSlot: 'સમય સ્લોટ',
      copy: 'કૉપિ',
      copied: 'કૉપિ થયું!',
      share: 'શેર',
      save: 'સાચવો',
      keepQRCodeSafe: 'આ QR કોડ સુરક્ષિત રાખો. મંદિર પ્રવેશ માટે તમને તેની જરૂર પડશે.',
      qrCodeLoading: 'QR કોડ લોડ થઈ રહ્યો છે...',
      bookingDetailsCopied: 'બુકિંગ વિગતો ક્લિપબોર્ડ પર કૉપિ થઈ!',
      failedToCopyDetails: 'બુકિંગ વિગતો કૉપિ કરવામાં નિષ્ફળ',
      qrCodeDownloaded: 'QR કોડ સફળતાપૂર્વક ડાઉનલોડ થયો!',
      failedToDownloadQR: 'QR કોડ ડાઉનલોડ કરવામાં નિષ્ફળ',
      qrCodeNotAvailable: 'QR કોડ ઉપલબ્ધ નથી'
    }
  }
};

export const getTranslation = (language: Language, key: string): string => {
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

export const getTempleTranslation = (language: Language, templeKey: string): string => {
  return getTranslation(language, `temples.${templeKey}`);
};

export const getZoneTranslation = (language: Language, zoneKey: string): string => {
  return getTranslation(language, `zones.${zoneKey}`);
};

export const getStatusTranslation = (language: Language, status: string): string => {
  return getTranslation(language, `status.${status}`);
};