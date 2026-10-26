import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { WhatsAppModal } from './WhatsAppModal';
import { PrescriptionModal } from './PrescriptionModal';
import { ToastContainer } from '../ui/DemoNotice';
import { useApp } from '../../context/AppContext';

export function PublicLayout() {
  const { toast } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8F6] text-[#17211B] font-sans antialiased w-full max-w-full overflow-x-clip">
      <PublicHeader />
      <main className="flex-1 w-full overflow-x-clip">
        <Outlet />
      </main>
      <PublicFooter />
      <WhatsAppModal />
      <PrescriptionModal />
      <ToastContainer toast={toast} />
    </div>
  );
}
