import React from 'react';
<<<<<<< HEAD
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
=======
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';
import { Button } from './Button';
>>>>>>> origin/main

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
<<<<<<< HEAD
    console.error('ErrorBoundary caught:', error, errorInfo);
=======
    console.error('[ClinicOS ErrorBoundary caught exception]:', error, errorInfo);
>>>>>>> origin/main
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
<<<<<<< HEAD
    window.location.reload();
=======
>>>>>>> origin/main
  };

  render() {
    if (this.state.hasError) {
<<<<<<< HEAD
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-2xl shadow-sm">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            Rendering Recovered
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Page View Encountered an Issue
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md font-mono bg-slate-100 dark:bg-slate-800 p-3 rounded-xl break-all">
            {this.state.error?.message || 'Unknown view render error'}
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={this.handleReset}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reload View
            </button>
            <Link
              to="/patient/dashboard"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              Patient Home
            </Link>
=======
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-xs">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-md">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Clinical Workspace Error Encountered
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              An unexpected render error occurred in this view. Your session data and draft entries in local storage remain secure.
            </p>
            {this.state.error?.message && (
              <div className="mt-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300 text-left overflow-x-auto">
                {this.state.error.message}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3 pt-2">
            <Button variant="outline" size="sm" onClick={this.handleReset}>
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Try Again
            </Button>
            <a href="/">
              <Button variant="primary" size="sm">
                <Home className="w-3.5 h-3.5 mr-1" /> Return to Homepage
              </Button>
            </a>
>>>>>>> origin/main
          </div>
        </div>
      );
    }
<<<<<<< HEAD
=======

>>>>>>> origin/main
    return this.props.children;
  }
}

