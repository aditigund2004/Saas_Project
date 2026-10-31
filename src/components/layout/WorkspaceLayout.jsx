import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { WorkspaceHeader } from './WorkspaceHeader';
import { WorkspaceSidebar } from './WorkspaceSidebar';
import { WhatsAppModal } from './WhatsAppModal';
import { PrescriptionModal } from './PrescriptionModal';
import { AIPreviewAssistant } from '../ui/AIPreviewAssistant';
import { ToastContainer } from '../ui/DemoNotice';
import { MedicalMotionBackground } from './MedicalMotionBackground';
import { useApp } from '../../context/AppContext';

export function WorkspaceLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useApp();

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#F4F7FC] dark:bg-[#080F1E] text-slate-900 dark:text-[#F1F5F9] font-sans antialiased flex flex-col transition-colors relative">
=======
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B0F19] text-[#172033] dark:text-slate-100 font-sans antialiased flex flex-col transition-colors relative">
>>>>>>> origin/main
      <MedicalMotionBackground variant="workspace" />
      <div className="flex-1 flex relative z-10">
        <WorkspaceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 lg:pl-[280px] flex flex-col min-w-0">
          <WorkspaceHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-[1720px] mx-auto">
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
