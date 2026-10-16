import type { Metadata } from "next";
import Navbar from "@/components/awake/Navbar";
import CtaBand from "@/components/awake/CtaBand";
import { contact, profile } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} — email ${contact.email}, phone ${contact.phone}, or find me on GitHub and LinkedIn. Based in ${profile.location}.`,
};

const channels = [
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    external: false,
  },
  {
    label: "Phone",
    value: contact.phone,
    href: `tel:${contact.phoneRaw}`,
    external: false,
  },
  {
    label: "GitHub",
    value: contact.links[0].handle,
    href: contact.links[0].href,
    external: true,
  },
  {
    label: "LinkedIn",
    value: contact.links[1].handle,
    href: contact.links[1].href,
    external: true,
  },
  {
    label: "Résumé",
    value: "PDF — Rakesh_Kumar_Resume.pdf",
    href: profile.resume,
    external: true,
  },
];

const faqs = [
  {
    q: "Are you available for internships?",
    a: "Yes — I'm a final-year student graduating in 2027 and actively looking for internship or junior full-stack roles, ideally somewhere I can work on both the product and the backend.",
  },
  {
    q: "Do you take freelance work?",
    a: "Yes. Small sites, landing pages, Supabase backends and Python automation jobs are all things I've done. Send a brief and I'll come back with an estimate.",
  },
  {
    q: "What's your stack?",
    a: "Next.js, React and Tailwind on the front; Node and Express or Supabase behind it; Python for anything that should run on a schedule. Deployed to Vercel or Netlify.",
  },
  {
    q: "Can you work remotely?",
    a: "Yes. I'm in Bengaluru and comfortable working across time zones, though I keep to IST-friendly hours.",
  },
];

export default function ContactPage() {
  return (
    <>
      <div className="page-page">
        <div className="page-navRow">
          <Navbar variant="dev" />
        </div>

        <div className="page-inner">
          <h1 className="page-title">
            Tell me what you&rsquo;re building
            <span className="page-dot">.</span>
          </h1>

          <p className="page-intro">
            Based in {profile.location}. {profile.availableFor} — I usually reply within a day, and
            sooner if it&rsquo;s something fun.
          </p>

          <dl className="page-metaRow">
            {channels.map((channel) => (
              <div className="page-metaItem" key={channel.label}>
                <dt className="page-metaLabel">{channel.label}</dt>
                <dd className="page-metaValue">
                  <a
                    href={channel.href}
                    className="page-metaLink"
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {channel.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="prose-section">
        <div className="prose">
          <h2>Common questions</h2>
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand variant="page" />
    </>
  );
}
