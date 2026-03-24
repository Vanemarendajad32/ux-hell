type InfoCardProps = {
  className?: string;
  description?: string;
  label: string;
  tone?: string;
  value: string;
  valueClassName?: string;
};

export default function InfoCard({
  className = "",
  description,
  label,
  tone = "bg-white",
  value,
  valueClassName = "mt-4 break-words text-2xl font-bold tracking-tight text-slate-900 [overflow-wrap:anywhere]",
}: InfoCardProps) {
  return (
    <article
      className={`min-w-0 rounded-3xl border border-rose-200 ${tone} ${className}`.trim()}
    >
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className={valueClassName}>{value}</p>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      ) : null}
    </article>
  );
}
