import React, { useState } from 'react';
import { SlidersHorizontal, Eye, EyeOff, ArrowUp, ArrowDown, RotateCcw, Check, LayoutGrid } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export function CustomizableDashboardHeader({
  widgets = [],
  onToggleWidget,
  onMoveWidget,
  onResetLayout
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-xs transition-all cursor-pointer"
        title="Customize dashboard cards, order and visibility"
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span>Customize View</span>
      </button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Customize Dashboard Layout"
          size="md"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-500 dark:text-slate-400">
              Personalize your workspace. Toggle visibility or reorder sections to focus on what matters most. Layout preferences are automatically saved to your browser.
            </p>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              {widgets.map((widget, idx) => (
                <div
                  key={widget.id}
                  className={`p-3 flex items-center justify-between transition-colors ${
                    widget.visible
                      ? 'bg-white dark:bg-slate-900'
                      : 'bg-slate-50/70 dark:bg-slate-950/40 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => onToggleWidget(widget.id)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        widget.visible
                          ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/60 dark:border-blue-800'
                          : 'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800'
                      }`}
                      title={widget.visible ? 'Hide section' : 'Show section'}
                    >
                      {widget.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs">{widget.title}</div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{widget.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => onMoveWidget(widget.id, 'up')}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === widgets.length - 1}
                      onClick={() => onMoveWidget(widget.id, 'down')}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onResetLayout}
                className="inline-flex items-center space-x-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default Layout</span>
              </button>

              <Button variant="primary" size="sm" onClick={() => setIsOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
