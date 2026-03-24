type StatCardProps = {
  className?: string;
  label: string;
  tone?: string;
  value: number | string;
};

export default function StatCard({
  className = "",
  label,
  tone = "border-slate-200 bg-white",
  value,
}: StatCardProps) {
  return (
    <article className={`rounded-3xl border ${tone} ${className}`.trim()}>
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>
    </article>
  );
}
