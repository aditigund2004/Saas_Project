import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ChevronDown, Search, ArrowRight } from 'lucide-react';

import { Link } from 'react-router-dom';

export function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(0);

  const faqs = [
    {
      category: 'Clinic Setup & Onboarding',
      q: 'How fast can a multi-doctor clinic go live on ClinicOS?',
      a: 'A new clinic can complete self-serve onboarding in less than 3 minutes. Doctors, branch locations, treatment tariffs, and front-desk reception logins can be configured right away with automated WhatsApp templates enabled out-of-the-box.'
    },
    {
      category: 'Clinic Setup & Onboarding',
      q: 'Does ClinicOS support multi-branch clinic chains?',
      a: 'Yes. Growth, Professional, and Enterprise plans feature unified multi-branch switching. Clinic owners and administrators can monitor consolidated OPD footfalls, inventory restock alerts, and daily revenue collection across all branches with a single click.'
    },
    {
      category: 'Digital Prescriptions & Legal Compliance',
      q: 'How do digital prescriptions prevent tampering and fraud?',
      a: 'Every finalized prescription generated on ClinicOS embeds a unique cryptographic hash and dynamic QR verification badge. Patients and partner pharmacies can scan the QR code to instantly verify doctor credentials, issuing clinic details, and prescription authenticity.'
    },
    {
      category: 'WhatsApp & Patient Communication',
      q: 'Does ClinicOS require a separate WhatsApp Business API account?',
      a: 'No. ClinicOS provides a pre-configured WhatsApp Cloud adapter out-of-the-box. Patient booking confirmations, appointment reminders, and follow-up notices are dispatched automatically without complex webhook setup.'
    },
    {
      category: 'Pricing, Billing & India-First Localization',
      q: 'What payment modes are supported for patient OPD collections?',
      a: 'ClinicOS supports dynamic UPI QR generation, credit/debit card swipe logging, cash counter registers, and cashless TPA insurance billing. All patient invoices generate GST-compliant tax invoices with customizable clinic logos.'
    },
    {
      category: 'Data Privacy & Security',
      q: 'How is patient medical data isolated across different clinics?',
      a: 'ClinicOS operates a robust multi-tenant data architecture where each clinic tenant has isolated data scopes. Role-based access control ensures that doctors only view clinical charts for their scheduled patients, while receptionists manage appointments and queue tokens.'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 space-y-10 transition-colors">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wide">
          Frequently Asked Questions
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Everything You Need to Know About ClinicOS
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">

          Clear answers on clinic onboarding, digital prescription verification, multi-branch operations, and SaaS subscription tiers.
        </p>

        {/* Search */}
        <div className="relative max-w-lg mx-auto pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g. multi-branch, WhatsApp, prescriptions)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"

          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = expandedIndex === index;
          return (
            <Card
              key={index}
              className={`p-5 transition-all border ${
                isOpen
                  ? 'border-blue-300 dark:border-blue-700 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'

              }`}
            >
              <button
                onClick={() => setExpandedIndex(isOpen ? -1 : index)}
                className="w-full text-left flex items-start justify-between gap-4 cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-1">
                    {faq.category}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">{faq.q}</h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                    isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''

                  }`}
                />
              </button>

              {isOpen && (
                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">

                  {faq.a}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* CTA Box */}
      <Card className="p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl text-center space-y-4 shadow-xl border-slate-800">
        <h2 className="text-xl sm:text-2xl font-black text-white">Ready to modernise your healthcare clinic?</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Start your 14-day fully featured free trial or explore the interactive prototype across 4 roles.

        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/register/clinic">
            <Button variant="primary" size="md">
              Start 14-Day Free Trial <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
          <Link to="/clinic/dashboard">
            <Button variant="outline-white" size="md">
              Explore Clinic Demo
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

