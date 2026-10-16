import Reveal from "./Reveal";

type Props = {
  index: string;
  label: string;
  title: React.ReactNode;
  note?: string;
};

export default function SectionHead({ index, label, title, note }: Props) {
  return (
    <div className="mb-10 md:mb-14">
      <Reveal>
        <div className="rule-double">
          <div className="flex items-baseline gap-4 pt-3">
            <span className="micro-sm text-terra">{index}</span>
            <span className="micro-sm text-ink-3">{label}</span>
            <span className="micro-sm ml-auto hidden text-ink-4 sm:block">{note}</span>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-6 max-w-3xl text-h2">{title}</h2>
      </Reveal>
    </div>
  );
}
