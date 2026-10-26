import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { WorkspaceHeader } from './WorkspaceHeader';
import { WorkspaceSidebar } from './WorkspaceSidebar';
import { WhatsAppModal } from './WhatsAppModal';
import { PrescriptionModal } from './PrescriptionModal';
import { ToastContainer } from '../ui/DemoNotice';
import { useApp } from '../../context/AppContext';

export function WorkspaceLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem('clinicos_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const { toast } = useApp();

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('clinicos_sidebar_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] text-[#17211B] font-sans antialiased flex flex-col w-full max-w-full overflow-x-clip">
      <div className="flex-1 flex w-full relative">
        <WorkspaceSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />
        <div
          className={`flex-1 flex flex-col min-w-0 w-full transition-all duration-200 ease-out ${
            isCollapsed ? 'lg:pl-20' : 'lg:pl-68'
          }`}
        >
          <WorkspaceHeader
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            isSidebarCollapsed={isCollapsed}
            onToggleCollapse={handleToggleCollapse}
          />
          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8 max-w-[1560px] w-full mx-auto animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
      <WhatsAppModal />
      <PrescriptionModal />
      <ToastContainer toast={toast} />
    </div>
  );
}
