import React from 'react';
import { Outlet } from 'react-router-dom';
<<<<<<< HEAD
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
=======
import { DemoRoleBar } from './DemoRoleBar';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { WhatsAppModal } from './WhatsAppModal';
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
import { PrescriptionModal } from './PrescriptionModal';
import { ToastContainer } from '../ui/DemoNotice';
import { useApp } from '../../context/AppContext';

export function PublicLayout() {
  const { toast } = useApp();

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
=======
    <div className="public-layout min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      <DemoRoleBar />
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
<<<<<<< HEAD
=======
      <WhatsAppModal />
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      <PrescriptionModal />
      <ToastContainer toast={toast} />
    </div>
  );
}
