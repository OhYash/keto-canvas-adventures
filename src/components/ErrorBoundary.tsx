import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  sectionName?: string;
  onNavigateHome?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Uncaught error in section [${this.props.sectionName || 'unknown'}]:`, error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-[95vw] sm:w-[90vw] md:w-[600px] max-w-[600px] bg-slate-900/90 text-white rounded-2xl p-6 border border-red-500/40 shadow-2xl backdrop-blur-md text-center space-y-4">
          <div className="text-3xl">⚠️</div>
          <h2 className="text-xl font-bold text-red-400">Something went wrong</h2>
          <p className="text-sm text-slate-300">
            {this.props.sectionName ? `Unable to display ${this.props.sectionName}.` : 'An unexpected error occurred.'}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={this.handleReset}
              className="bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-600"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            {this.props.onNavigateHome && (
              <Button
                variant="default"
                size="sm"
                onClick={this.props.onNavigateHome}
                className="bg-cyan-600 hover:bg-cyan-500 text-white"
              >
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
