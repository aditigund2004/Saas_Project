import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { WhatsAppModal } from './WhatsAppModal';
import { PrescriptionModal } from './PrescriptionModal';
import { ToastContainer } from '../ui/DemoNotice';
<<<<<<< HEAD
import { AIPreviewAssistant } from '../ui/AIPreviewAssistant';
import { useApp } from '../../context/AppContext';
import { MedicalMotionBackground } from './MedicalMotionBackground';
=======
import { useApp } from '../../context/AppContext';
>>>>>>> origin/main

export function PublicLayout() {
  const { toast } = useApp();

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] dark:bg-[#0B0F19] text-[#172033] dark:text-slate-100 font-sans antialiased transition-colors relative">
      <MedicalMotionBackground />
      <PublicHeader />
      <main className="flex-1 relative z-10">
=======
    <div className="public-layout min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      <PublicHeader />
      <main className="flex-1">
>>>>>>> origin/main
        <Outlet />
      </main>
      <PublicFooter />
      <WhatsAppModal />
      <PrescriptionModal />
<<<<<<< HEAD
      <AIPreviewAssistant />
=======
>>>>>>> origin/main
      <ToastContainer toast={toast} />
    </div>
  );
}
