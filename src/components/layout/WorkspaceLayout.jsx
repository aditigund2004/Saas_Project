<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> origin/main
import { Outlet } from 'react-router-dom';
import { WorkspaceHeader } from './WorkspaceHeader';
import { WorkspaceSidebar } from './WorkspaceSidebar';
import { WhatsAppModal } from './WhatsAppModal';
import { PrescriptionModal } from './PrescriptionModal';
import { AIPreviewAssistant } from '../ui/AIPreviewAssistant';
import { ToastContainer } from '../ui/DemoNotice';
<<<<<<< HEAD
import { MedicalMotionBackground } from './MedicalMotionBackground';
=======
>>>>>>> origin/main
import { useApp } from '../../context/AppContext';

export function WorkspaceLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useApp();

<<<<<<< HEAD
  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B0F19] text-[#172033] dark:text-slate-100 font-sans antialiased flex flex-col transition-colors relative">
      <MedicalMotionBackground variant="workspace" />
      <div className="flex-1 flex relative z-10">
        <WorkspaceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 lg:pl-[280px] flex flex-col min-w-0">
          <WorkspaceHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-[1720px] mx-auto">
=======
  useEffect(() => {
    if (!sidebarOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [sidebarOpen]);

  return (
    <div className="workspace-layout min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      <WorkspaceHeader
        onToggleSidebar={() => setSidebarOpen((open) => !open)}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex-1 flex">
        <WorkspaceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
          <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full">
>>>>>>> origin/main
            <Outlet />
          </main>
        </div>
      </div>
      <WhatsAppModal />
      <PrescriptionModal />
      <AIPreviewAssistant />
      <ToastContainer toast={toast} />
    </div>
  );
}
