export function PageSkeleton() {
  return (
    <main className="min-h-[60vh] bg-brand-bg px-4 py-16 text-brand-text">
      <div className="mx-auto max-w-5xl animate-pulse space-y-8">
        <div className="h-3 w-40 bg-brand-border" />
        <div className="space-y-3">
          <div className="h-10 w-full max-w-2xl bg-brand-border" />
          <div className="h-10 w-full max-w-xl bg-brand-border" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="h-40 bg-brand-card border border-brand-border" />
          <div className="h-40 bg-brand-card border border-brand-border" />
          <div className="h-40 bg-brand-card border border-brand-border" />
        </div>
      </div>
    </main>
  );
}
