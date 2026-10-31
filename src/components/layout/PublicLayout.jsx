import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { WhatsAppModal } from './WhatsAppModal';
import { PrescriptionModal } from './PrescriptionModal';
import { ToastContainer } from '../ui/DemoNotice';
import { AIPreviewAssistant } from '../ui/AIPreviewAssistant';
import { useApp } from '../../context/AppContext';
import { MedicalMotionBackground } from './MedicalMotionBackground';

export function PublicLayout() {
  const { toast } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] dark:bg-[#0B0F19] text-[#172033] dark:text-slate-100 font-sans antialiased transition-colors relative">
      <MedicalMotionBackground />
      <PublicHeader />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <PublicFooter />
      <WhatsAppModal />
      <PrescriptionModal />
      <AIPreviewAssistant />
      <ToastContainer toast={toast} />
    </div>
  );
}
