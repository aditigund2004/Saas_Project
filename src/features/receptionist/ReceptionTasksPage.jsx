import React, { useState } from 'react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CheckSquare, Plus, CheckCircle, Clock, List, LayoutGrid, AlertCircle } from 'lucide-react';

import { useApp } from '../../context/AppContext';

export function ReceptionTasksPage() {
  const { showToast } = useApp();
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'


  const [tasks, setTasks] = useState([
    { id: 1, title: 'Morning Setup & OPD Waiting Room Sanitization Check', priority: 'High', dueTime: '08:45 AM', status: 'Completed', notes: 'Autoclave batches verified' },
    { id: 2, title: 'Confirm 6 Afternoon Appointments via WhatsApp', priority: 'High', dueTime: '11:00 AM', status: 'In Progress', notes: 'Waiting for 2 patient replies' },
    { id: 3, title: 'Reconcile Front-Desk Cash & Card Pos Machine Receipts', priority: 'Medium', dueTime: '02:00 PM', status: 'Pending', notes: 'Match against daily ledger' },
    { id: 4, title: 'Call 3 Post-RCT Follow-Up Patients for Recovery Check', priority: 'Medium', dueTime: '04:30 PM', status: 'Pending', notes: 'Dr. Arvind Rao cases' },
    { id: 5, title: 'Evening Register Lock & Consumables Restock Request', priority: 'Low', dueTime: '07:30 PM', status: 'Pending', notes: 'Order Articaine anesthetic pack' }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t)));
    showToast('Task status updated.');
  };

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const pendingCount = tasks.length - completedCount;
  const highPriorityPending = tasks.filter((t) => t.status !== 'Completed' && t.priority === 'High').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Front Desk Operations</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Daily Reception Checklist</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">

            Shift tasks, morning preparation, patient follow-up calls, and end-of-day billing reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Cards</span>
            </button>
          </div>

          <Button variant="outline" size="md" icon={Plus} onClick={() => showToast('New custom task created.')}>
            Add Daily Task
          </Button>
        </div>
      </div>

      {/* Progress metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Tasks</p>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{completedCount} / {tasks.length}</p>
          </div>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
            {Math.round((completedCount / tasks.length) * 100)}% Done
          </span>
        </Card>
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Action</p>
            <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{pendingCount}</p>
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Remaining</span>
        </Card>
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">High Priority Queue</p>
            <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">{highPriorityPending}</p>
          </div>
          <span className="text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-lg">Urgent</span>
        </Card>
      </div>

      {/* Main Table Structure (Default) */}
      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-3 text-center w-12">#</th>
                  <th className="py-3.5 px-3 w-12 text-center">Done</th>
                  <th className="py-3.5 px-4">Task Item & Operational Notes</th>
                  <th className="py-3.5 px-3">Priority</th>
                  <th className="py-3.5 px-3">Target Time</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {tasks.map((task, idx) => {
                  const isDone = task.status === 'Completed';

                  return (
                    <tr
                      key={task.id}
                      className={`hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors group ${
                        isDone ? 'bg-slate-50/40 dark:bg-slate-900/40' : ''
                      }`}
                    >
                      <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleTask(task.id)}
                          aria-label={`Mark task ${task.title} as completed`}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>

                      <td className="py-3.5 px-4">
                        <div
                          onClick={() => toggleTask(task.id)}
                          className={`font-bold text-base cursor-pointer transition-colors ${
                            isDone
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : 'text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                          }`}
                        >
                          {task.title}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {task.notes}
                        </p>
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            task.priority === 'High'
                              ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50'
                              : task.priority === 'Medium'
                              ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {task.priority === 'High' && '🔥 '}
                          {task.priority} Priority
                        </span>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                          <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>{task.dueTime}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-3">
                        <Badge variant={task.status}>{task.status}</Badge>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant={isDone ? 'ghost' : 'outline'}
                          size="xs"
                          onClick={() => toggleTask(task.id)}
                          className="text-xs font-semibold"
                        >
                          {isDone ? 'Mark Pending' : 'Complete'}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Shift checklist records ({tasks.length} total tasks)</span>
            <span>Click checkboxes or action buttons to update progress</span>
          </div>
        </div>
      ) : (
        /* Card View */
        <div className="space-y-3">
          {tasks.map((task) => {
            const isDone = task.status === 'Completed';

            return (
              <Card
                key={task.id}
                className={`p-4 sm:p-5 border transition-all ${
                  isDone
                    ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800'
                    : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-4 text-sm">
                  <div className="flex items-start gap-3.5">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleTask(task.id)}
                      className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div>
                      <h3 className={`font-bold text-base ${isDone ? 'line-through text-slate-400 dark:text-slate-600' : 'text-slate-900 dark:text-slate-100'}`}>
                        {task.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{task.notes}</p>
                      <div className="flex items-center gap-2.5 mt-2.5 text-xs text-slate-400 dark:text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Due: <strong className="text-slate-600 dark:text-slate-300 font-mono">{task.dueTime}</strong></span>
                        <span>•</span>
                        <span className={`font-bold ${task.priority === 'High' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-400'}`}>
                          {task.priority} Priority
                        </span>
                      </div>
                    </div>
                  </div>

                  <Badge variant={task.status}>{task.status}</Badge>
                </div>
              </Card>
            );
          })}
        </div>
      )}

    </div>
  );
}

