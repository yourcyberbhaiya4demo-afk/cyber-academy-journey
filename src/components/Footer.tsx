import { Link } from "@tanstack/react-router";
import { BRAND, enrollmentConfig, mailtoUrl, whatsappUrl } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="font-display text-xl font-bold uppercase">{BRAND}</p>
          <p className="max-w-xs text-sm leading-relaxed text-cream/70">
            Live cybersecurity training for practical learners. No recorded lecture library — every
            class is taught in real time.
          </p>
          <p className="font-display text-xs font-bold tracking-widest text-yellow uppercase">
            One student is enough to run the class
          </p>
        </div>

        <FooterCol title="Courses">
          <FooterLink to="/courses">All courses</FooterLink>
          <FooterLink to="/courses/$slug" params={{ slug: "cyber-security-foundations" }}>
            Cybersecurity Foundations
          </FooterLink>
          <FooterLink to="/courses/$slug" params={{ slug: "web-pentesting" }}>
            Web Pentesting
          </FooterLink>
          <FooterLink to="/courses/$slug" params={{ slug: "bug-bounty" }}>
            Bug Bounty
          </FooterLink>
          <FooterLink to="/courses/$slug" params={{ slug: "api-security" }}>
            API Security
          </FooterLink>
        </FooterCol>

        <FooterCol title="Company">
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterCol>

        <FooterCol title="Support">
          <li>
            <a className="text-sm text-cream/70 hover:text-yellow" href={whatsappUrl()}>
              WhatsApp
            </a>
          </li>
          <li>
            <a className="text-sm text-cream/70 hover:text-yellow" href={mailtoUrl()}>
              {enrollmentConfig.supportEmail}
            </a>
          </li>
          <li>
            <a className="text-sm text-cream/70 hover:text-yellow" href={mailtoUrl("Privacy policy request")}>
              Privacy policy
            </a>
          </li>
          <li>
            <a className="text-sm text-cream/70 hover:text-yellow" href={mailtoUrl("Terms request")}>
              Terms
            </a>
          </li>
          <li>
            <a className="text-sm text-cream/70 hover:text-yellow" href={mailtoUrl("Refund policy request")}>
              Refund policy
            </a>
          </li>
        </FooterCol>
      </div>

      <div className="border-t-[3px] border-cream/25">
        <p className="mx-auto max-w-6xl px-5 py-6 font-display text-xs font-bold tracking-widest text-cream/60 uppercase sm:px-8">
          © 2026 Naitik Here — Live cybersecurity training
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-display text-xs font-bold tracking-widest text-yellow uppercase">{title}</p>
      <ul className="mt-4 list-none space-y-2.5 p-0">{children}</ul>
    </div>
  );
}

function FooterLink({
  to,
  params,
  children,
}: {
  to: string;
  params?: Record<string, string>;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        to={to as any}
        params={params as never}
        className="text-sm text-cream/70 hover:text-yellow"
      >
        {children}
      </Link>
    </li>
  );
}
