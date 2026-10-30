import React, { createContext, useContext, useState, useEffect } from 'react';

const TRANSLATIONS = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.appointments': 'Appointments',
    'nav.doctors': 'Find Doctors',
    'nav.records': 'Medical Records',
    'nav.prescriptions': 'Prescriptions',
    'nav.bills': 'Bills & Invoices',
    'nav.profile': 'My Profile',
    'nav.feedback': 'Feedback',
    'nav.book': 'Book Appointment',
    'dashboard.welcome': 'Welcome back',
    'dashboard.upcoming': 'Upcoming Consultations',
    'dashboard.activeRx': 'Active Prescriptions',
    'dashboard.pendingBills': 'Pending Invoices',
    'dashboard.quickActions': 'Quick Actions',
    'action.book': 'Book Doctor',
    'action.viewRx': 'View Prescriptions',
    'action.payNow': 'Pay Bill',
    'action.records': 'Access Records',
    'records.vitalsTitle': 'Patient Vitals & Health Analytics',
    'records.vitalsSubtitle': 'Track your blood pressure, pulse, temperature and SpO2 over time',
    'records.bloodPressure': 'Blood Pressure',
    'records.heartRate': 'Heart Rate (Pulse)',
    'records.temperature': 'Body Temperature',
    'records.spO2': 'Oxygen Saturation (SpO2)',
    'common.status': 'Status',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.doctor': 'Doctor',
    'common.fee': 'Consultation Fee',
    'common.actions': 'Actions'
  },
  hi: {
    'nav.dashboard': 'डैशबोर्ड (Dashboard)',
    'nav.appointments': 'अपॉइंटमेंट्स (Appointments)',
    'nav.doctors': 'डॉक्टर खोजें (Find Doctors)',
    'nav.records': 'चिकित्सा रिकॉर्ड (Records)',
    'nav.prescriptions': 'दवा की पर्ची (Prescriptions)',
    'nav.bills': 'बिल और भुगतान (Bills)',
    'nav.profile': 'मेरी प्रोफाइल (Profile)',
    'nav.feedback': 'प्रतिक्रिया (Feedback)',
    'nav.book': 'अपॉइंटमेंट बुक करें',
    'dashboard.welcome': 'वापसी पर स्वागत है',
    'dashboard.upcoming': 'आगामी परामर्श',
    'dashboard.activeRx': 'सक्रिय दवाइयां',
    'dashboard.pendingBills': 'बकाया बिल',
    'dashboard.quickActions': 'त्वरित क्रियाएं',
    'action.book': 'डॉक्टर बुक करें',
    'action.viewRx': 'पर्चियां देखें',
    'action.payNow': 'बिल का भुगतान करें',
    'action.records': 'रिकॉर्ड देखें',
    'records.vitalsTitle': 'रोगी के विटल्स और स्वास्थ्य विश्लेषण',
    'records.vitalsSubtitle': 'अपने रक्तचाप, नाड़ी, तापमान और SpO2 की समय के साथ निगरानी करें',
    'records.bloodPressure': 'रक्तचाप (Blood Pressure)',
    'records.heartRate': 'हृदय गति (Heart Rate)',
    'records.temperature': 'शरीर का तापमान',
    'records.spO2': 'ऑक्सीजन संतृप्ति (SpO2)',
    'common.status': 'स्थिति (Status)',
    'common.date': 'दिनांक',
    'common.time': 'समय',
    'common.doctor': 'डॉक्टर',
    'common.fee': 'परामर्श शुल्क',
    'common.actions': 'कार्रवाई'
  },
  mr: {
    'nav.dashboard': 'डॅशबोर्ड (Dashboard)',
    'nav.appointments': 'भेटींची वेळ (Appointments)',
    'nav.doctors': 'डॉक्टर शोधा (Find Doctors)',
    'nav.records': 'वैद्यकीय नोंदी (Records)',
    'nav.prescriptions': 'औषधोपचार चिठ्ठी (Prescriptions)',
    'nav.bills': 'बिले आणि पावत्या (Bills)',
    'nav.profile': 'माझे प्रोफाईल (Profile)',
    'nav.feedback': 'अभिप्राय (Feedback)',
    'nav.book': 'अपॉइंटमेंट बुक करा',
    'dashboard.welcome': 'पुन्हा स्वागत आहे',
    'dashboard.upcoming': 'पुढील नियोजित भेटी',
    'dashboard.activeRx': 'सध्याची औषधे',
    'dashboard.pendingBills': 'प्रलंबित बिले',
    'dashboard.quickActions': 'जलद कृती',
    'action.book': 'डॉक्टर बुक करा',
    'action.viewRx': 'औषध चिठ्ठी पहा',
    'action.payNow': 'बिल भरा',
    'action.records': 'नोंदी पहा',
    'records.vitalsTitle': 'रुग्णाचे विटल्स आणि आरोग्य विश्लेषण',
    'records.vitalsSubtitle': 'आपला रक्तदाब, नाडी, तापमान आणि SpO2 चा मागोवा घ्या',
    'records.bloodPressure': 'रक्तदाब (Blood Pressure)',
    'records.heartRate': 'हृदय गती (Pulse)',
    'records.temperature': 'शरीराचे तापमान',
    'records.spO2': 'ऑक्सिजन पातळी (SpO2)',
    'common.status': 'स्थिती (Status)',
    'common.date': 'तारीख',
    'common.time': 'वेळ',
    'common.doctor': 'डॉक्टर',
    'common.fee': 'तपासणी शुल्क',
    'common.actions': 'कृती'
  }
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('clinicos_lang');
      if (saved === 'hi' || saved === 'mr' || saved === 'en') return saved;
      return 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('clinicos_lang', lang);
    } catch {}
  };

  const t = (key, defaultText) => {
    const currentDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (currentDict[key]) return currentDict[key];
    if (TRANSLATIONS.en[key]) return TRANSLATIONS.en[key];
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
