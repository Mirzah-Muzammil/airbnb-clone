import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Intentionally empty: UI fallback only.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen px-4 py-8 text-ink">
          <div className="mx-auto w-full max-w-3xl rounded-3xl border border-clay/40 bg-white/80 p-8">
            <h1 className="text-2xl font-semibold text-ink">
              Something went wrong
            </h1>
            <p className="mt-2 text-sm text-ink/70">
              Please refresh the page or return to the listings.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-coral"
            >
              ← Back to Listings
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
