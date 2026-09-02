import { createFileRoute } from "@tanstack/react-router";
import { Accordion } from "@/components/Accordion";
import { SiteLayout } from "@/components/SiteLayout";
import { BrutalLink, Eyebrow, SectionHeading } from "@/components/ui-kit";
import { SITE_URL } from "@/data/site";

const TITLE = "FAQ — Live Classes, Enrollment & Payment | Naitik Here";
const DESCRIPTION =
  "Answers about live class format, course content, enrollment steps, payment, verification and support for Naitik Here cybersecurity training.";

const groups: { label: string; items: { q: string; a: string }[] }[] = [
  {
    label: "General",
    items: [
      {
        q: "What is Learn by Naitik Here?",
        a: "It is a small, independent cybersecurity academy offering live, instructor-led courses in web security, bug bounty and API security.",
      },
      {
        q: "Is this a recorded course platform?",
        a: "No. There is no recorded lecture library. Every class is taught live at a scheduled time.",
      },
      {
        q: "Where do classes happen?",
        a: "Online, in a live session. You receive the joining details after your enrollment is verified.",
      },
    ],
  },
  {
    label: "Courses",
    items: [
      {
        q: "Which courses are available?",
        a: "Cybersecurity Foundations, Web Pentesting, Bug Bounty Fundamentals and API Security.",
      },
      {
        q: "Do I need previous cybersecurity experience?",
        a: "The foundations, web pentesting and bug bounty courses start from the basics. API Security assumes you are already comfortable with HTTP and the web.",
      },
      {
        q: "How long is each course?",
        a: "Between 20 and 40+ hours of live sessions depending on the course. Each course page lists its exact duration, module and lesson count.",
      },
    ],
  },
  {
    label: "Live classes",
    items: [
      {
        q: "Are the classes completely live?",
        a: "Yes. Every session is conducted live by the instructor.",
      },
      {
        q: "Are sessions recorded?",
        a: "The course is designed around attending live, so recordings are not part of the product.",
      },
      {
        q: "What happens if only one student enrolls?",
        a: "The class still runs live. There is no minimum-student requirement and batches are never cancelled for low enrollment.",
      },
      {
        q: "How long is each class?",
        a: "About 90 minutes per session, including practical work and questions.",
      },
      {
        q: "What equipment do I need?",
        a: "A laptop or desktop, a stable internet connection and the willingness to practise during class.",
      },
    ],
  },
  {
    label: "Enrollment",
    items: [
      {
        q: "How do I enroll?",
        a: "Open a course page, click ENROLL NOW, enter your details, review the course fee and complete the payment step.",
      },
      {
        q: "Where is the course fee shown?",
        a: "The fee is shown inside the enrollment flow at step two, after you enter your details.",
      },
      {
        q: "Can I change my details after starting?",
        a: "Yes. Use the BACK button inside the enrollment panel — your entered information stays intact.",
      },
    ],
  },
  {
    label: "Payment",
    items: [
      {
        q: "How does payment work?",
        a: "You pay the exact course fee by UPI or bank transfer, then submit your payment proof through the linked form.",
      },
      {
        q: "What do I need to submit as proof?",
        a: "Your name, email, WhatsApp number, course, amount paid, UTR / transaction ID and a screenshot of the successful payment.",
      },
      {
        q: "How long does payment verification take?",
        a: "Normally up to 24 hours. It is a manual check — nothing is verified automatically.",
      },
      {
        q: "How will I receive class details?",
        a: "Once verified, class details are shared using the email and WhatsApp number you provided.",
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        q: "How can I contact support?",
        a: "Message on WhatsApp or send an email using the details on the contact page.",
      },
      {
        q: "What if I don't hear back within 24 hours?",
        a: "Follow up on WhatsApp or email with your UTR / transaction ID so the payment can be traced quickly.",
      },
    ],
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/faq/` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/faq/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: groups.flatMap((g) =>
            g.items.map((i) => ({
              "@type": "Question",
              name: i.q,
              acceptedAnswer: { "@type": "Answer", text: i.a },
            })),
          ),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteLayout>
      <section className="border-b-[3px] border-ink">
        <div className="mx-auto max-w-4xl space-y-7 px-5 py-16 sm:px-8 lg:py-20">
          <Eyebrow>FAQ</Eyebrow>
          <h1 className="text-[2.4rem] leading-[0.97] uppercase sm:text-5xl">
            Questions, answered
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink/75">
            Everything about the live format, enrollment, payment and support. Still unsure? Message
            on WhatsApp.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        {groups.map((g) => (
          <section key={g.label} className="py-12 lg:py-14">
            <SectionHeading eyebrow="Category" title={g.label} />
            <div className="mt-8">
              <Accordion
                items={g.items.map((i) => ({
                  title: i.q,
                  content: <p className="text-sm leading-relaxed text-ink/75">{i.a}</p>,
                }))}
              />
            </div>
          </section>
        ))}
      </div>

      <section className="border-t-[3px] border-ink bg-yellow">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8">
          <h2 className="text-3xl leading-[1.05] uppercase sm:text-4xl">Still have a question?</h2>
          <div className="mt-8 flex justify-center gap-4">
            <BrutalLink to="/contact" variant="ink">
              Contact →
            </BrutalLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
