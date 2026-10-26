import React from 'react';
import { Outlet } from 'react-router-dom';
import { DemoRoleBar } from './DemoRoleBar';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { WhatsAppModal } from './WhatsAppModal';
import { PrescriptionModal } from './PrescriptionModal';
import { ToastContainer } from '../ui/DemoNotice';
import { useApp } from '../../context/AppContext';

export function PublicLayout() {
  const { toast } = useApp();

  return (
    <div className="public-layout min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      <DemoRoleBar />
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
      <WhatsAppModal />
      <PrescriptionModal />
      <ToastContainer toast={toast} />
    </div>
  );
}
