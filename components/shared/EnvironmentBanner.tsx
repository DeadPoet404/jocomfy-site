export function EnvironmentBanner() {
  const environment = (
    process.env.NEXT_PUBLIC_APP_ENV || "production"
  ).toLowerCase();

  if (environment !== "staging") {
    return null;
  }

  return (
    <aside
      role="status"
      aria-label="Staging environment"
      className="fixed bottom-4 right-4 z-[9999] border-2 border-amber-950 bg-amber-300 px-4 py-2 text-xs font-black uppercase tracking-widest text-amber-950 shadow-[4px_4px_0px_0px_#451a03]"
    >
      Staging — Test data only
    </aside>
  );
}
