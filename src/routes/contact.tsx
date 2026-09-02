import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BrutalAnchor, BrutalLink, Eyebrow } from "@/components/ui-kit";
import { SITE_URL, enrollmentConfig, mailtoUrl, whatsappUrl } from "@/data/site";

const TITLE = "Contact — WhatsApp & Email Support | Naitik Here";
const DESCRIPTION =
  "Questions about a live cybersecurity course, enrollment or payment verification? Reach out on WhatsApp or by email.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/contact/` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact/` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="border-b-[3px] border-ink">
        <div className="mx-auto max-w-4xl space-y-7 px-5 py-16 sm:px-8 lg:py-20">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-[2.4rem] leading-[0.97] uppercase sm:text-5xl">Have a question?</h1>
          <p className="max-w-xl text-base leading-relaxed text-ink/75">
            Course content, batch timings, enrollment or payment verification — message directly and
            you'll get a real answer, usually within 24 hours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
        <h2 className="sr-only">Contact channels</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <article className="border-[3px] border-ink bg-paper p-7 shadow-brutal">
            <p className="eyebrow text-ink/55">WhatsApp</p>
            <h3 className="mt-3 font-display text-2xl uppercase">Fastest reply</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Best for quick questions about batches, timings or payment verification status.
            </p>
            <p className="mt-5 font-display text-sm font-bold">+{enrollmentConfig.whatsappNumber}</p>
            <div className="mt-6">
              <BrutalAnchor
                variant="green"
                href={whatsappUrl("Hi, I have a question about a live course")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp →
              </BrutalAnchor>
            </div>
          </article>

          <article className="border-[3px] border-ink bg-paper p-7 shadow-brutal">
            <p className="eyebrow text-ink/55">Email</p>
            <h3 className="mt-3 font-display text-2xl uppercase">Detailed queries</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Best for enrollment issues, payment proof follow-ups or anything that needs
              attachments.
            </p>
            <p className="mt-5 font-display text-sm font-bold break-all">
              {enrollmentConfig.supportEmail}
            </p>
            <div className="mt-6">
              <BrutalAnchor variant="primary" href={mailtoUrl("Course question")}>
                Email support →
              </BrutalAnchor>
            </div>
          </article>
        </div>

        <div className="mt-12 border-[3px] border-ink bg-cream p-7">
          <h3 className="font-display text-lg uppercase">Payment verification</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">
            Verification is manual and normally takes up to 24 hours after you submit your payment
            proof. If you haven't heard back after that, message on WhatsApp with your UTR /
            transaction ID.
          </p>
        </div>

        <div className="mt-12">
          <BrutalLink to="/courses" variant="ink">
            Explore courses →
          </BrutalLink>
        </div>
      </section>
    </SiteLayout>
  );
}
