import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PlusCircle, Clock, Tag } from 'lucide-react';

export function ClinicServicesPage() {
  const { activeClinic, showToast } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Clinical Catalog</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Services & Procedure Tariffs</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure procedural pricing, standard consultation lengths, and billing line items.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={PlusCircle}
          onClick={() => showToast('Service creator dialog opened.')}
        >
          Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeClinic.services.map((srv) => (
          <Card key={srv.id} className="p-5 border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">{srv.name}</h3>
                <Badge variant="Active">{srv.category}</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{srv.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Slot Duration: {srv.durationMinutes} mins</span>
              </span>
              <span className="text-base font-extrabold text-slate-900 font-mono">
                ₹{srv.fee.toLocaleString('en-IN')}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

