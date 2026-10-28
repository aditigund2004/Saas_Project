import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Package,
  AlertTriangle,
  Clock,
  ArrowRightLeft,
  ClipboardList,
  Plus,
  TrendingDown,
  CheckCircle2,
  Building2,
  ArrowRight
} from 'lucide-react';

export function InventoryDashboardPage() {
  const {
    inventory,
    inventoryMovements,
    stockRequests,
    suppliers,
    purchaseOrders,
    formatCurrency,
    activeClinic
  } = useApp();

  const lowStockItems = inventory.filter((i) => i.currentStock <= i.minStockLevel);
  const expiringSoonItems = inventory.filter((i) => i.status === 'Expiring Soon');
  const pendingRequests = stockRequests.filter((r) => r.status === 'Pending');

  // Total valuation
  const totalValuation = inventory.reduce((acc, curr) => acc + curr.currentStock * curr.costPerUnit, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
<<<<<<< HEAD
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wide">
              Pharmacy & Materials Inventory
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {activeClinic.name} · Central Store
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Clinical Inventory Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
=======
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Pharmacy & Materials Inventory
            </span>
            <span className="text-xs text-slate-500">
              {activeClinic.name} · Central Store
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Clinical Inventory Dashboard
          </h1>
          <p className="text-xs text-slate-500">
>>>>>>> origin/main
            Stock levels, batch expiry monitoring, internal stock requisitions, and vendor supply chain
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/inventory/catalog">
<<<<<<< HEAD
            <Button variant="primary" size="sm" className="font-semibold shadow-sm">
              <Plus className="w-4 h-4 mr-1.5" />
=======
            <Button variant="primary" size="sm">
              <Plus className="w-3.5 h-3.5 mr-1" />
>>>>>>> origin/main
              Manage Catalog & Stock
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
<<<<<<< HEAD
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Catalog SKUs</span>
            <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{inventory.length}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Active consumables & drugs</p>
        </Card>

        <Card className="p-4 border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 shadow-sm">
          <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 mb-2">
            <span className="text-xs font-semibold uppercase text-rose-800 dark:text-rose-300">Low Stock Alerts</span>
            <TrendingDown className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-rose-900 dark:text-rose-100">{lowStockItems.length}</div>
          <p className="text-xs text-rose-700 dark:text-rose-300 mt-1">Below safety reorder level</p>
        </Card>

        <Card className="p-4 border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-2">
            <span className="text-xs font-semibold uppercase text-amber-800 dark:text-amber-300">Expiring in 60d</span>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-amber-900 dark:text-amber-100">{expiringSoonItems.length}</div>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">Urgent triage required</p>
        </Card>

        <Card className="p-4 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 shadow-sm">
          <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 mb-2">
            <span className="text-xs font-semibold uppercase text-indigo-800 dark:text-indigo-300">Pending Requests</span>
            <ClipboardList className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-indigo-900 dark:text-indigo-100">{pendingRequests.length}</div>
          <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">From front-desk & doctors</p>
        </Card>

        <Card className="p-4 border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 col-span-2 lg:col-span-1 shadow-sm">
          <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 mb-2">
            <span className="text-xs font-semibold uppercase text-blue-800 dark:text-blue-300">Store Valuation</span>
            <span className="font-bold text-blue-700 dark:text-blue-400 text-sm">₹</span>
          </div>
          <div className="text-xl font-black text-blue-900 dark:text-blue-100 truncate">{formatCurrency(totalValuation)}</div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Total inventory value</p>
        </Card>
      </div>

      {/* Two Column Layout: Critical Stock Attention & Recent Movements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Critical Reorder Attention */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              Low Stock & Reorder Requirements ({lowStockItems.length})
            </h3>
            <Link to="/inventory/catalog" className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline">
=======
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <Card className="p-4 border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-semibold uppercase text-slate-500">Catalog SKUs</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{inventory.length}</div>
          <p className="text-[10px] text-slate-500 mt-0.5">Active consumables & drugs</p>
        </Card>

        <Card className="p-4 border-rose-200 bg-rose-50/40">
          <div className="flex items-center justify-between text-rose-600 mb-1.5">
            <span className="text-[11px] font-semibold uppercase text-rose-800">Low Stock Alerts</span>
            <TrendingDown className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-rose-900">{lowStockItems.length}</div>
          <p className="text-[10px] text-rose-700 mt-0.5">Below safety reorder level</p>
        </Card>

        <Card className="p-4 border-amber-200 bg-amber-50/40">
          <div className="flex items-center justify-between text-amber-600 mb-1.5">
            <span className="text-[11px] font-semibold uppercase text-amber-800">Expiring in 60d</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-amber-900">{expiringSoonItems.length}</div>
          <p className="text-[10px] text-amber-700 mt-0.5">Urgent triage required</p>
        </Card>

        <Card className="p-4 border-indigo-200 bg-indigo-50/40">
          <div className="flex items-center justify-between text-indigo-600 mb-1.5">
            <span className="text-[11px] font-semibold uppercase text-indigo-800">Pending Requests</span>
            <ClipboardList className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-indigo-900">{pendingRequests.length}</div>
          <p className="text-[10px] text-indigo-700 mt-0.5">From front-desk & doctors</p>
        </Card>

        <Card className="p-4 border-blue-200 bg-blue-50/40 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-blue-600 mb-1.5">
            <span className="text-[11px] font-semibold uppercase text-blue-800">Store Valuation</span>
            <span className="font-bold text-blue-700 text-xs">₹</span>
          </div>
          <div className="text-xl font-black text-blue-900 truncate">{formatCurrency(totalValuation)}</div>
          <p className="text-[10px] text-blue-700 mt-0.5">Total inventory value</p>
        </Card>
      </div>

      {/* Two Column Layout (Cards connected with zero gap) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left: Critical Reorder Attention */}
        <div className="space-y-0">
          <div className="flex items-center justify-between p-3.5 bg-white border border-slate-200 lg:rounded-tl-2xl lg:border-r-0 border-b-0">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              Low Stock & Reorder Requirements ({lowStockItems.length})
            </h3>
            <Link to="/inventory/catalog" className="text-xs font-semibold text-blue-700 hover:underline">
>>>>>>> origin/main
              Full Catalog
            </Link>
          </div>

<<<<<<< HEAD
          <Card className="divide-y divide-slate-100 dark:divide-slate-800 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            {lowStockItems.length === 0 ? (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-xs">
=======
          <Card className="divide-y divide-slate-100 border-slate-200 lg:rounded-r-none lg:border-r-0 rounded-none border-b-0">
            {lowStockItems.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">
>>>>>>> origin/main
                All consumables are above reorder safety thresholds.
              </div>
            ) : (
              lowStockItems.map((item) => (
<<<<<<< HEAD
                <div key={item.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
=======
                <div key={item.id} className="p-3.5 sm:p-4 flex items-center justify-between text-sm hover:bg-slate-50">
                  <div>
                    <div className="font-bold text-slate-900 text-base">{item.name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
>>>>>>> origin/main
                      <span className="font-mono">{item.sku}</span>
                      <span>·</span>
                      <span>Supplier: {item.supplier}</span>
                    </div>
                  </div>
                  <div className="text-right">
<<<<<<< HEAD
                    <div className="font-mono font-bold text-rose-700 dark:text-rose-400 text-sm">
                      {item.currentStock} {item.unit}
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 block">
=======
                    <div className="font-mono font-bold text-rose-700 text-base">
                      {item.currentStock} {item.unit}
                    </div>
                    <span className="text-xs text-slate-500 block">
>>>>>>> origin/main
                      Min Threshold: {item.minStockLevel}
                    </span>
                    <Badge variant="danger" size="sm" className="mt-1">
                      Critical Low
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </Card>

          {/* Pending Internal Requests Card */}
<<<<<<< HEAD
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Department Stock Requests ({pendingRequests.length})
              </h3>
              <Link to="/inventory/requests" className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline">
                Review Requests
              </Link>
            </div>
            <Card className="divide-y divide-slate-100 dark:divide-slate-800 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              {pendingRequests.map((req) => (
                <div key={req.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{req.itemName}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Requested by <strong className="text-slate-700 dark:text-slate-300">{req.requestedBy}</strong> ({req.department})
                    </div>
                    {req.notes && <p className="text-xs text-slate-400 dark:text-slate-500 italic mt-0.5">"{req.notes}"</p>}
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-indigo-900 dark:text-indigo-200 block text-sm">{req.quantity} {req.unit}</span>
                    <Badge variant={req.urgency === 'Urgent' ? 'danger' : 'default'} size="sm" className="mt-1">
                      {req.urgency}
                    </Badge>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>

        {/* Right: Stock Movements Log */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Recent Stock Movements Log
            </h3>
            <Link to="/inventory/movements" className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline">
=======
          <div className="p-3.5 bg-white border border-slate-200 lg:border-r-0 border-b-0 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-indigo-600" />
              Department Stock Requests ({pendingRequests.length})
            </h3>
            <Link to="/inventory/requests" className="text-xs font-semibold text-blue-700 hover:underline">
              Review Requests
            </Link>
          </div>
          <Card className="divide-y divide-slate-100 border-slate-200 lg:rounded-r-none lg:border-r-0 rounded-t-none">
            {pendingRequests.map((req) => (
              <div key={req.id} className="p-3.5 sm:p-4 flex items-center justify-between text-sm hover:bg-slate-50">
                <div>
                  <div className="font-bold text-slate-900 text-base">{req.itemName}</div>
                  <div className="text-xs text-slate-500">
                    Requested by <strong>{req.requestedBy}</strong> ({req.department})
                  </div>
                  {req.notes && <p className="text-xs text-slate-400 italic mt-0.5">"{req.notes}"</p>}
                </div>
                <div className="text-right">
                  <span className="font-bold text-indigo-900 block text-base">{req.quantity} {req.unit}</span>
                  <Badge variant={req.urgency === 'Urgent' ? 'danger' : 'default'} size="sm">
                    {req.urgency}
                  </Badge>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Right: Stock Movements Log */}
        <div className="space-y-0">
          <div className="flex items-center justify-between p-3.5 bg-white border border-slate-200 lg:rounded-tr-2xl lg:border-l-0 border-b-0">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-blue-600" />
              Recent Stock Movements Log
            </h3>
            <Link to="/inventory/movements" className="text-xs font-semibold text-blue-700 hover:underline">
>>>>>>> origin/main
              Audit Trail
            </Link>
          </div>

<<<<<<< HEAD
          <Card className="divide-y divide-slate-100 dark:divide-slate-800 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            {inventoryMovements.slice(0, 6).map((mov) => (
              <div key={mov.id} className="p-4 space-y-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{mov.itemName}</span>
                  <span
                    className={`font-mono font-bold text-sm ${
                      mov.quantity > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'
=======
          <Card className="divide-y divide-slate-100 border-slate-200 lg:rounded-l-none rounded-t-none h-full">
            {inventoryMovements.slice(0, 6).map((mov) => (
              <div key={mov.id} className="p-3.5 sm:p-4 space-y-1.5 hover:bg-slate-50 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-base line-clamp-1">{mov.itemName}</span>
                  <span
                    className={`font-mono font-bold text-sm ${
                      mov.quantity > 0 ? 'text-emerald-700' : 'text-slate-700'
>>>>>>> origin/main
                    }`}
                  >
                    {mov.quantity > 0 ? `+${mov.quantity}` : mov.quantity}
                  </span>
                </div>
<<<<<<< HEAD
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Type: <Badge variant={mov.type === 'Receipt' ? 'success' : 'default'} size="sm">{mov.type}</Badge></span>
                  <span>Balance: {mov.previousStock} ➔ <strong className="text-slate-900 dark:text-white">{mov.newStock}</strong></span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-1">
                  <span>Reason: {mov.reason}</span>
                  <span className="font-mono">{mov.date}</span>
=======
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Type: <Badge variant={mov.type === 'Receipt' ? 'success' : 'default'} size="sm">{mov.type}</Badge></span>
                  <span>Balance: {mov.previousStock} ➔ <strong className="text-slate-900">{mov.newStock}</strong></span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>Reason: {mov.reason}</span>
                  <span>{mov.date}</span>
>>>>>>> origin/main
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
