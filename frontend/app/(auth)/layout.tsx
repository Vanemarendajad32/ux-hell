export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cardClassName =
    "bg-white/85 backdrop-blur rounded-3xl shadow-2xl p-8 w-full max-w-xl relative border border-rose-200 flex flex-col justify-center";
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-4 text-slate-900">
      <div className={cardClassName}>{children}</div>
    </div>
  );
}
