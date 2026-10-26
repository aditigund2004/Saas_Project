import React from 'react';
import { HeartHandshake, ShieldCheck, Zap, Activity, Users, Building2, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';

export function AboutPage() {
  const values = [
    {
      title: 'Clinical Simplicity',
      desc: 'Healthcare software shouldn’t require a computer science degree. We design intuitive, uncluttered screens that doctors and receptionists love to use.',
      icon: Zap
    },
    {
      title: 'Tenant Isolation & Privacy',
      desc: 'Every clinic’s patient records, financial invoices, and doctor schedules remain strictly isolated and protected with zero cross-tenant contamination.',
      icon: ShieldCheck
    },
    {
      title: 'Continuous Patient Engagement',
      desc: 'Bridging the post-consultation gap with automated WhatsApp appointment reminders, follow-up alerts, and tamper-evident QR verified prescriptions.',
      icon: HeartHandshake
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">About CliniPulse</span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Empowering Independent Clinics with Modern SaaS Operations
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          CliniPulse was conceived to address a widespread healthcare reality: independent specialty doctors and small nursing homes are often forced to choose between cumbersome paper registers and bloated hospital legacy software.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 border-slate-200 space-y-4 bg-gradient-to-br from-blue-50/50 to-white">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            To provide independent dental, orthopedic, dermatology, and pediatric practices—as well as community nursing homes—with an accessible, cohesive digital platform that eliminates administrative paper friction and improves patient compliance.
          </p>
        </Card>

        <Card className="p-8 border-slate-200 space-y-4 bg-gradient-to-br from-blue-50/50 to-white">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            A healthcare ecosystem where even the smallest neighborhood clinic has access to enterprise-grade scheduling, tamper-evident digital prescriptions, instant WhatsApp confirmations, and structured financial reporting.
          </p>
        </Card>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900">Our Product Principles</h2>
          <p className="text-xs text-slate-500 mt-1">Guiding how we design each workflow, component, and user interaction.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <Card key={i} className="p-6 border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{v.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Architecture Integrity Notice */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-xs text-slate-600 space-y-2 max-w-3xl mx-auto">
        <p className="font-semibold text-slate-900">Architectural Note</p>
        <p>
          CliniPulse is engineered with a strict separation between UI components, typed service adapters, and domain models. When transitioning from demo mode to commercial production, service mock modules are substituted with live REST/GraphQL APIs without rewriting user-facing screens.
        </p>
      </div>
    </div>
  );
}

