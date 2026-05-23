import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen px-4 py-8 text-ink">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-clay/40 bg-white/80 p-8">
        <h1 className="text-2xl font-semibold text-ink">Property not found</h1>
        <p className="mt-2 text-sm text-ink/70">
          The stay you are looking for does not exist or has been removed.
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

export default NotFound;
