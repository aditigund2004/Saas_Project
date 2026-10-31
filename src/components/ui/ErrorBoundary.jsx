import React from 'react';
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';
import { Button } from './Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ClinicOS ErrorBoundary caught exception]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
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
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

