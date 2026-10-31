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
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B0F19] text-[#172033] dark:text-slate-100 font-sans antialiased flex flex-col transition-colors relative">
      <MedicalMotionBackground variant="workspace" />
      <div className="flex-1 flex relative z-10">
        <WorkspaceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 lg:pl-[280px] flex flex-col min-w-0">
          <WorkspaceHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-[1720px] mx-auto animate-page-enter">
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
