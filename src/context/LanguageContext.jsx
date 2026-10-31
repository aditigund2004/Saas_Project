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
  }
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    try {
      localStorage.setItem('clinicos_lang', 'en');
    } catch {}
  }, []);

  const setLanguage = () => {
    setLanguageState('en');
    try {
      localStorage.setItem('clinicos_lang', 'en');
    } catch {}
  };

  const t = (key, defaultText) => {
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) return TRANSLATIONS.en[key];
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language: 'en', setLanguage, t }}>
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
