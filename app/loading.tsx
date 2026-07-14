export default function Loading() {
  return (
    <main className="min-h-screen bg-[#090806] px-6 py-24 text-white md:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="h-4 w-40 rounded bg-white/15" />
        <div className="mt-6 h-12 w-full max-w-3xl rounded bg-white/10" />
        <div className="mt-4 h-12 w-full max-w-2xl rounded bg-white/10" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="h-64 rounded-3xl bg-white/10" />
          <div className="h-64 rounded-3xl bg-white/10" />
          <div className="h-64 rounded-3xl bg-white/10" />
        </div>
      </div>
    </main>
  );
}
