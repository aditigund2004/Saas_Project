import { Invoice, Expense, PaymentStatus } from '../types';
import { DEMO_INVOICES, DEMO_EXPENSES } from '../demo-data';

export const billingService = {
  getInvoices: async (clinicId?: string): Promise<Invoice[]> => {
    if (clinicId) {
      return DEMO_INVOICES.filter((i) => i.clinicId === clinicId);
    }
    return [...DEMO_INVOICES];
  },

  getInvoicesByPatient: async (patientId: string): Promise<Invoice[]> => {
    return DEMO_INVOICES.filter((i) => i.patientId === patientId);
  },

  createInvoice: async (payload: Omit<Invoice, 'id' | 'invoiceNumber'>): Promise<Invoice> => {
    const seq = Math.floor(400 + Math.random() * 500);
    const invoiceNumber = `INV-2026-0${seq}`;
    return {
      ...payload,
      id: `inv-${Date.now()}`,
      invoiceNumber
    };
  },

  recordPayment: async (
    invoiceId: string,
    amount: number,
    method: string
  ): Promise<{ status: PaymentStatus; amountPaid: number }> => {
    return {
      status: 'Paid',
      amountPaid: amount
    };
  },

  getExpenses: async (clinicId?: string): Promise<Expense[]> => {
    if (clinicId) {
      return DEMO_EXPENSES.filter((e) => e.clinicId === clinicId);
    }
    return [...DEMO_EXPENSES];
  },

  addExpense: async (payload: Omit<Expense, 'id'>): Promise<Expense> => {
    return {
      ...payload,
      id: `exp-${Date.now()}`
    };
  }
};

