import { createFileRoute, Link } from "@tanstack/react-router";
import heroVisual from "@/assets/hero-visual.jpg";
import instructorImg from "@/assets/instructor.jpg";
import { Accordion } from "@/components/Accordion";
import { CourseCarousel } from "@/components/CourseCarousel";
import { SiteLayout } from "@/components/SiteLayout";
import {
  BrutalLink,
  Divider,
  Eyebrow,
  SectionHeading,
  Stars,
} from "@/components/ui-kit";
import { courses } from "@/data/courses";
import { SITE_NAME, SITE_URL, courseFaqs, instructor, testimonials } from "@/data/site";

const TITLE = "Live Cybersecurity Courses & Training | Naitik Here";
const DESCRIPTION =
  "Learn cybersecurity through live, practical instructor-led training in web security, bug bounty, VAPT and application security. No recorded lectures.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: SITE_NAME,
              url: `${SITE_URL}/`,
              description: DESCRIPTION,
            },
            {
              "@type": "Person",
              name: "Naitik",
              jobTitle: "Security Researcher & Cybersecurity Instructor",
              url: `${SITE_URL}/about/`,
            },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

const uspBlocks = [
  { n: "01", title: "100% Live", body: "Every session is taught in real time at a scheduled hour." },
  { n: "02", title: "Interactive", body: "Ask questions mid-exercise and get answered immediately." },
  { n: "03", title: "Practical", body: "You practise during class, not after watching a video." },
  { n: "04", title: "Direct guidance", body: "Small batches with direct access to the instructor." },
];

const whyLive = [
  {
    title: "Questions get answered now",
    body: "The moment something doesn't make sense, you ask. That single habit is what separates people who finish from people who quietly stop halfway.",
  },
  {
    title: "Real targets behave differently",
    body: "Recorded courses only show the happy path. Live classes deal with the target that responds unexpectedly, because we are testing it together.",
  },
  {
    title: "A schedule creates progress",
    body: "A fixed class time beats infinite access. You show up, you practise, and the course actually gets finished.",
  },
  {
    title: "One student is enough",
    body: "There is no minimum batch size. If a single person enrols, the live class still runs exactly as scheduled.",
  },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="border-b-[3px] border-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-24">
          <div className="space-y-8">
            <Eyebrow>Live cybersecurity training</Eyebrow>
            <h1 className="text-[2.6rem] leading-[0.95] uppercase sm:text-6xl lg:text-7xl">
              Learn
              <br />
              cybersecurity.
              <br />
              <span className="bg-yellow px-2">Build real-</span>
              <br />
              world skills.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">
              Practical, instructor-led cybersecurity training built around live sessions, hands-on
              learning and real-world security concepts.
            </p>
            <div className="flex flex-wrap gap-4">
              <BrutalLink to="/courses">Explore courses →</BrutalLink>
              <a
                href="#why-live"
                className="brutal-press inline-flex items-center justify-center border-[3px] border-ink bg-paper px-6 py-3.5 font-display text-sm font-bold tracking-wider uppercase shadow-brutal"
              >
                Why live training?
              </a>
            </div>
            <p className="font-display text-xs font-bold tracking-widest text-ink/60 uppercase">
              Live classes • Real guidance • No recorded lectures
            </p>
          </div>

          <div className="relative">
            <div className="absolute -right-2 -bottom-2 hidden h-full w-full border-[3px] border-ink bg-blue lg:block" />
            <img
              src={heroVisual}
              alt="Neo-brutalist illustration of a security shield, terminal window and network diagram"
              width={1024}
              height={1024}
              className="relative w-full border-[3px] border-ink bg-paper object-cover"
            />
          </div>
        </div>
      </section>

      {/* LIVE TRAINING USP */}
      <section className="border-b-[3px] border-ink bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="space-y-6">
              <p className="eyebrow text-yellow">The difference</p>
              <h2 className="text-4xl leading-[1.02] uppercase sm:text-5xl">
                This is not another
                <br />
                video course.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-cream/80">
              <p>Every class is conducted live.</p>
              <p>
                Students learn directly from the instructor, ask questions in real time and work
                through practical concepts together.
              </p>
              <p className="border-l-[3px] border-yellow pl-4 font-display font-bold text-cream uppercase">
                Even a one-student batch gets the live class.
              </p>
            </div>
          </div>

          <ul className="mt-14 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {uspBlocks.map((b) => (
              <li key={b.n} className="border-[3px] border-cream/90 bg-cream p-6 text-ink">
                <p className="font-display text-2xl font-bold text-blue">{b.n}</p>
                <h3 className="mt-3 font-display text-lg uppercase">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="border-b-[3px] border-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Courses"
            title="Explore courses"
            description={
              <>
                Choose a course.
                <br />
                Join the live batch.
                <br />
                Learn by doing.
              </>
            }
          />
          <div className="mt-14 -mx-2.5">
            <CourseCarousel courses={courses} />
          </div>
          <div className="mt-14">
            <BrutalLink to="/courses" variant="ink">
              View all courses →
            </BrutalLink>
          </div>
        </div>
      </section>

      {/* WHY LIVE LEARNING */}
      <section id="why-live" className="border-b-[3px] border-ink bg-paper scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Why live learning"
            title="Live beats recorded. Every time."
            description="Recorded courses are convenient. They are also the reason most people never finish learning security."
          />
          <Divider className="my-12" />
          <ul className="grid list-none gap-x-12 gap-y-12 p-0 md:grid-cols-2">
            {whyLive.map((item, i) => (
              <li key={item.title} className="space-y-3">
                <p className="font-display text-sm font-bold tracking-widest text-blue">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-xl uppercase">{item.title}</h3>
                <p className="max-w-md text-sm leading-relaxed text-ink/75">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="border-b-[3px] border-ink">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
          <img
            src={instructorImg}
            alt="Illustrated portrait of Naitik, cybersecurity instructor and security researcher"
            width={1024}
            height={1024}
            loading="lazy"
            className="w-full border-[3px] border-ink bg-paper shadow-brutal"
          />
          <div className="space-y-6">
            <Eyebrow>Instructor</Eyebrow>
            <h2 className="text-3xl leading-[1.05] uppercase sm:text-4xl lg:text-5xl">
              Learn directly
              <br />
              from the instructor
            </h2>
            {instructor.bio.map((p) => (
              <p key={p} className="max-w-xl text-base leading-relaxed text-ink/75">
                {p}
              </p>
            ))}
            <dl className="grid gap-x-8 gap-y-5 border-t-[3px] border-ink pt-7 sm:grid-cols-2">
              {instructor.highlights.map((h) => (
                <div key={h.label}>
                  <dt className="eyebrow text-ink/55">{h.label}</dt>
                  <dd className="mt-1.5 font-display text-sm font-bold">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* STUDENT FEEDBACK */}
      <section className="border-b-[3px] border-ink bg-green/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Student feedback"
            title="What learners say"
            description="Sample feedback from live batches."
          />
          <ul className="mt-14 grid list-none gap-6 p-0 lg:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name} className="border-[3px] border-ink bg-paper p-6 shadow-brutal">
                <Stars rating={5} />
                <blockquote className="mt-4 text-sm leading-relaxed text-ink/80">
                  “{t.quote}”
                </blockquote>
                <p className="mt-5 font-display text-xs font-bold tracking-widest uppercase">
                  — {t.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="border-b-[3px] border-ink">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="mt-12">
            <Accordion
              items={courseFaqs.slice(0, 5).map((f) => ({
                title: f.q,
                content: <p className="text-sm leading-relaxed text-ink/75">{f.a}</p>,
              }))}
              defaultOpen={0}
            />
          </div>
          <div className="mt-10">
            <Link
              to="/faq"
              className="font-display text-sm font-bold tracking-widest uppercase underline decoration-blue decoration-[3px] underline-offset-4"
            >
              Read all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-blue">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
          <p className="eyebrow justify-center text-ink/70">Ready to learn live?</p>
          <h2 className="mt-5 text-4xl leading-[1.02] uppercase sm:text-5xl">
            Stop watching.
            <br />
            Start practising.
          </h2>
          <div className="mt-10 flex justify-center">
            <BrutalLink to="/courses" variant="ink">
              Explore courses →
            </BrutalLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
