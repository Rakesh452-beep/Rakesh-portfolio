import Link from "next/link";
import { contact, profile } from "@/data/site";

export default function ContactBand({
  index = "03",
  compact = false,
}: {
  index?: string;
  compact?: boolean;
}) {
  return (
    <section className="shell pt-24 md:pt-36">
      <div className="rule-double pt-8">
        <p className="micro-sm text-terra">
          § {index} — Contact
          {compact && " — all channels"}
        </p>

        <h2 className={`mt-8 max-w-4xl ${compact ? "text-h3" : "text-display"}`}>
          {compact ? (
            <>
              Let’s <span className="italic text-terra">talk.</span>
            </>
          ) : (
            <>
              Got something that needs <span className="italic text-terra">building?</span>
            </>
          )}
        </h2>

        <a
          href={`mailto:${contact.email}?subject=${encodeURIComponent("Hello Rakesh")}`}
          className="mt-10 block break-all font-display font-semibold tracking-tight text-h2 underline-terra"
        >
          {contact.email}
        </a>

        <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ink-3">
          Open to internships and junior full-stack roles, and happy to take on freelance builds.
          Based in {profile.location} — usually replies within a day.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${contact.email}?subject=${encodeURIComponent("Hello Rakesh")}`}
            className="micro border border-terra bg-terra px-6 py-3.5 text-paper transition-colors duration-300 hover:border-ink hover:bg-ink"
          >
            Send an email
          </a>
          <Link
            href="/contact"
            className="micro border border-line-2 px-6 py-3.5 text-ink-2 transition-colors duration-300 hover:border-terra hover:text-terra"
          >
            All channels ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
