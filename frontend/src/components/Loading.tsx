import React from "react";

function Loading() {
  return (
    <div className="min-h-screen px-4 py-8 text-ink">
      <div className="mx-auto w-full max-w-5xl">
        <div className="h-96 animate-pulse rounded-3xl border border-clay/40 bg-white/70" />
      </div>
    </div>
  );
}

export default Loading;
