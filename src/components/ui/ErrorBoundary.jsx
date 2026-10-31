import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
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
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

