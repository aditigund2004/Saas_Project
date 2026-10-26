import React, { useState } from 'react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CheckSquare, Plus, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ReceptionTasksPage() {
  const { showToast } = useApp();

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Front Desk Operations</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Daily Reception Checklist</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Shift tasks, morning preparation, patient follow-up calls, and end-of-day billing reconciliation.
          </p>
        </div>

        <Button variant="outline" size="sm" icon={Plus} onClick={() => showToast('New custom task created.')}>
          Add Daily Task
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => {
          const isDone = task.status === 'Completed';

          return (
            <Card
              key={task.id}
              className={`p-4 border transition-all ${
                isDone ? 'bg-slate-50/70 border-slate-200' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-4 text-xs">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <div>
                    <h3 className={`font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.title}
                    </h3>
                    <p className="text-slate-500 text-[11px] mt-0.5">{task.notes}</p>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>Due: {task.dueTime}</span>
                      <span>•</span>
                      <span className={`font-bold ${task.priority === 'High' ? 'text-rose-600' : 'text-slate-600'}`}>
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
    </div>
  );
}

