export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cardClassName = "bg-white/85 backdrop-blur rounded-3xl shadow-2xl p-12 w-full max-w-xl relative border border-rose-200";
  return (
    <div className="flex h-screen items-center justify-center px-6 py-12 text-slate-900">
      <div className={cardClassName}>
        {children}
      </div>
    </div>
  );
}
