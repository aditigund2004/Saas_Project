import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DemoRoleBar } from './DemoRoleBar';
import { WorkspaceHeader } from './WorkspaceHeader';
import { WorkspaceSidebar } from './WorkspaceSidebar';
import { WhatsAppModal } from './WhatsAppModal';
import { PrescriptionModal } from './PrescriptionModal';
import { AIPreviewAssistant } from '../ui/AIPreviewAssistant';
import { ToastContainer } from '../ui/DemoNotice';
import { useApp } from '../../context/AppContext';

export function WorkspaceLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useApp();

  return (
    <div className="workspace-layout min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      <DemoRoleBar />
      <div className="flex-1 flex">
        <WorkspaceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
          <WorkspaceHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
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
