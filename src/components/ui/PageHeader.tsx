export default function PageHeader({
  index,
  label,
  title,
  lede,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  lede?: string;
}) {
  return (
    <section className="shell pt-28 pb-12 md:pt-40 md:pb-16">
      <div className="rule-double">
        <div className="flex items-baseline gap-4 pt-3">
          <span className="micro-sm text-terra">§ {index}</span>
          <span className="micro-sm text-ink-3">{label}</span>
        </div>
      </div>
      <h1 className="mt-7 max-w-4xl text-h2">{title}</h1>
      {lede && (
        <p className="mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-2 md:text-lg">
          {lede}
        </p>
      )}
    </section>
  );
}
