import { createFileRoute } from "@tanstack/react-router";
import instructorImg from "@/assets/instructor.jpg";
import { SiteLayout } from "@/components/SiteLayout";
import { BrutalLink, Divider, Eyebrow, SectionHeading } from "@/components/ui-kit";
import { SITE_URL, instructor } from "@/data/site";

const TITLE = "About the Instructor & Teaching Philosophy | Naitik Here";
const DESCRIPTION =
  "Who is Naitik Here — a security researcher teaching live, practical cybersecurity classes with a hands-on, question-driven approach.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/about/` },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about/` }],
  }),
  component: AboutPage,
});

const blocks = [
  {
    label: "Teaching philosophy",
    title: "Teach the thinking, not the tool",
    body: [
      "Tools change every year. The way you reason about a system — where trust is assumed, where input crosses a boundary, what the developer probably forgot — does not.",
      "So classes are built around understanding first and tooling second. Burp Suite is taught, but only after you know what you are looking for.",
    ],
  },
  {
    label: "Cybersecurity background",
    title: "Testing before teaching",
    body: [
      "Most of my week is spent testing web applications and APIs. The material in every course comes out of that work rather than a syllabus template.",
      "That means the examples are the ones that actually keep appearing: broken object-level authorization, logic that fails on the third request, auth flows that were never tested end to end.",
    ],
  },
  {
    label: "Security research",
    title: "Research and responsible disclosure",
    body: [
      "Vulnerability research and responsible disclosure are part of the job, and the reporting standard from that work is the standard taught in class.",
      "You learn to write a finding that a security team can reproduce, triage and fix without a follow-up call.",
    ],
  },
  {
    label: "Practical learning",
    title: "You practise during class",
    body: [
      "Every module ends with a practical exercise done inside the live session, not left as homework you will get to eventually.",
      "If something breaks or behaves unexpectedly, that is the best part of the class — we debug it together in front of everyone.",
    ],
  },
  {
    label: "Why live training",
    title: "Live means live",
    body: [
      "There is no recorded lecture library and no watch-whenever model. You join the scheduled class, the instructor teaches, you ask questions and you practise.",
      "And one student is enough to run the class. A batch is never cancelled for low enrollment.",
    ],
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="border-b-[3px] border-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div className="space-y-7">
            <Eyebrow>About</Eyebrow>
            <h1 className="text-[2.4rem] leading-[0.97] uppercase sm:text-5xl lg:text-6xl">
              Who is
              <br />
              <span className="bg-yellow px-2">Naitik Here?</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">
              A security researcher who teaches cybersecurity live, because the useful parts of this
              field happen in conversation — not in a pre-recorded lecture.
            </p>
            <dl className="grid gap-x-8 gap-y-5 border-t-[3px] border-ink pt-7 sm:grid-cols-2">
              {instructor.highlights.map((h) => (
                <div key={h.label}>
                  <dt className="eyebrow text-ink/55">{h.label}</dt>
                  <dd className="mt-1.5 font-display text-sm font-bold">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <img
            src={instructorImg}
            alt="Illustrated portrait of Naitik, cybersecurity instructor and security researcher"
            width={1024}
            height={1024}
            className="w-full border-[3px] border-ink bg-paper shadow-brutal"
          />
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        {blocks.map((b, i) => (
          <section key={b.label} className="py-14 lg:py-16">
            <SectionHeading eyebrow={b.label} title={b.title} />
            <div className="mt-7 max-w-2xl space-y-4">
              {b.body.map((p) => (
                <p key={p} className="text-base leading-relaxed text-ink/75">
                  {p}
                </p>
              ))}
            </div>
            {i < blocks.length - 1 ? <Divider className="mt-14" /> : null}
          </section>
        ))}
      </div>

      <section className="border-t-[3px] border-ink bg-blue">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8">
          <h2 className="text-3xl leading-[1.05] uppercase sm:text-4xl">
            Want to see what's running?
          </h2>
          <div className="mt-8 flex justify-center">
            <BrutalLink to="/courses" variant="ink">
              Explore courses →
            </BrutalLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
