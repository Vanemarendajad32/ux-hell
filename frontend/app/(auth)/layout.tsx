export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cardClassName =
    "bg-white/85 backdrop-blur rounded-3xl shadow-2xl p-12 w-full max-w-xl max-h-[calc(100dvh-0.5rem)] overflow-y-auto relative border border-rose-200 sm:max-h-[calc(100dvh-1rem)]";
  return (
    <div className="flex min-h-dvh items-start justify-center overflow-y-auto px-6 py-1 text-slate-900 sm:items-center sm:py-2">
      <div className={cardClassName}>{children}</div>
    </div>
  );
}
