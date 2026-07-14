"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[AppErrorBoundary]", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#090806] px-6 py-24 text-white md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-red-400/25 bg-red-500/10 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-red-200/90">
            Rendering Error
          </p>
          <h1 className="mt-4 font-serif text-3xl text-[#fff7ea] md:text-4xl">
            Unable to load this section
          </h1>
          <p className="mt-4 text-sm leading-7 text-red-100/90">
            A runtime error occurred while loading this page. Check the server logs for the exact Cloudinary error.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 rounded-full border border-red-200/60 px-6 py-3 text-sm uppercase tracking-[0.18em] text-red-50 transition hover:bg-red-500/20"
          >
            Retry
          </button>
        </div>
      </body>
    </html>
  );
}
