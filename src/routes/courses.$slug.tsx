import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import instructorImg from "@/assets/instructor.jpg";
import { Accordion } from "@/components/Accordion";
import { EnrollmentModal } from "@/components/EnrollmentModal";
import { SiteLayout } from "@/components/SiteLayout";
import {
  BrutalButton,
  Divider,
  Eyebrow,
  SectionHeading,
  Stars,
  Stat,
} from "@/components/ui-kit";
import { getCourse } from "@/data/courses";
import { SITE_URL, courseFaqs, instructor } from "@/data/site";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Course not found | Naitik Here" }, { name: "robots", content: "noindex" }],
      };
    }
    const { course } = loaderData;
    const url = `${SITE_URL}/courses/${course.slug}/`;
    return {
      meta: [
        { title: course.seoTitle },
        { name: "description", content: course.metaDescription },
        { property: "og:title", content: course.seoTitle },
        { property: "og:description", content: course.metaDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: course.seoTitle },
        { name: "twitter:description", content: course.metaDescription },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Course",
                name: course.title,
                description: course.metaDescription,
                url,
                courseMode: "online",
                educationalLevel: course.level,
                provider: { "@type": "Organization", name: "Learn by Naitik Here", url: SITE_URL },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                  { "@type": "ListItem", position: 2, name: "Courses", item: `${SITE_URL}/courses/` },
                  { "@type": "ListItem", position: 3, name: course.shortTitle, item: url },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: courseFaqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ],
          }),
        },
      ],
    };
  },
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { course } = Route.useLoaderData();
  const [enrollOpen, setEnrollOpen] = useState(false);

  return (
    <SiteLayout>
      {/* BREADCRUMBS + HERO */}
      <section className="border-b-[3px] border-ink">
        <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 font-display text-[0.7rem] font-bold tracking-widest text-ink/55 uppercase">
              <li>
                <Link to="/" className="hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/courses" className="hover:text-ink">
                  Courses
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {course.shortTitle}
              </li>
            </ol>
          </nav>
        </div>

        <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:py-16">
          <img
            src={course.thumbnail}
            alt={course.thumbnailAlt}
            width={1280}
            height={720}
            className="w-full border-[3px] border-ink bg-paper shadow-brutal"
          />
          <div className="space-y-6">
            <span className="inline-block border-[3px] border-ink bg-green px-3 py-1 font-display text-xs font-bold tracking-widest uppercase">
              Live training
            </span>
            <h1 className="text-[2.2rem] leading-[1] uppercase sm:text-4xl lg:text-5xl">
              {course.shortTitle}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink/80">{course.description}</p>
            <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 font-display text-xs font-bold tracking-widest uppercase">
              <li>{course.duration}</li>
              <li>{course.modules} modules</li>
              <li>{course.lessons} lessons</li>
              <li>{course.level}</li>
            </ul>
            <BrutalButton onClick={() => setEnrollOpen(true)}>Enroll now →</BrutalButton>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <h2 className="sr-only">Course at a glance</h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            <Stat value={course.duration} label="Live hours" />
            <Stat value={String(course.modules)} label="Modules" />
            <Stat value={String(course.lessons)} label="Lessons" />
            <Stat value="100%" label="Live format" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* SUMMARY */}
        <section className="py-14 lg:py-20">
          <SectionHeading eyebrow="Overview" title="What is this course?" />
          <div className="mt-8 max-w-2xl space-y-5">
            {course.summary.map((p) => (
              <p key={p} className="text-base leading-relaxed text-ink/75">
                {p}
              </p>
            ))}
          </div>
        </section>

        <Divider />

        {/* OUTCOMES */}
        <section className="py-14 lg:py-20">
          <SectionHeading
            eyebrow="Outcomes"
            title="What you'll be able to do"
            description="Concrete skills you should walk out of the batch with."
          />
          <ul className="mt-12 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
            {course.outcomes.map((o, i) => (
              <li key={o} className="border-[3px] border-ink bg-paper p-6">
                <p className="font-display text-sm font-bold text-blue">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-sm leading-relaxed">{o}</p>
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* AUDIENCE + PREREQUISITES */}
        <section className="grid gap-14 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <SectionHeading eyebrow="Audience" title="Who is this for?" />
            <ul className="mt-8 flex list-none flex-wrap gap-3 p-0">
              {course.audience.map((a) => (
                <li
                  key={a}
                  className="border-[3px] border-ink bg-yellow px-3 py-2 font-display text-xs font-bold tracking-widest uppercase"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Prerequisites" title="No advanced experience required" />
            <ul className="mt-8 list-none space-y-3 p-0">
              {course.requirements.map((r) => (
                <li key={r} className="flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden="true" className="font-display font-bold text-green">
                    ✓
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Divider />

        {/* CURRICULUM */}
        <section className="py-14 lg:py-20">
          <SectionHeading
            eyebrow="Curriculum"
            title="Course curriculum"
            description={`${course.modules} live modules • ${course.lessons} lessons. Open a module to see what happens inside it.`}
          />
          <div className="mt-12">
            <Accordion
              numbered
              defaultOpen={0}
              items={course.curriculum.map((m) => ({
                title: m.title,
                meta: m.duration,
                content: (
                  <ol className="m-0 list-none space-y-3 p-0">
                    {m.lessons.map((l, li) => (
                      <li
                        key={l.title}
                        className="flex items-baseline justify-between gap-4 border-b border-dashed border-ink/25 pb-3"
                      >
                        <span className="text-sm">
                          <span className="mr-3 font-display text-xs font-bold text-ink/45">
                            {String(li + 1).padStart(2, "0")}
                          </span>
                          {l.title}
                        </span>
                        <span className="eyebrow shrink-0 text-ink/50">{l.duration}</span>
                      </li>
                    ))}
                  </ol>
                ),
              }))}
            />
          </div>
        </section>
      </div>

      {/* LIVE TRAINING EXPERIENCE */}
      <section className="border-y-[3px] border-ink bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-24">
          <div className="space-y-6">
            <p className="eyebrow text-yellow">Live training experience</p>
            <h2 className="text-4xl leading-[1.02] uppercase sm:text-5xl">Live means live.</h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-cream/80">
            <p>No recorded lecture library. No "watch whenever" course model.</p>
            <p>
              You join the scheduled class. The instructor teaches live. You ask questions live. You
              practise live.
            </p>
            <p className="font-display text-xl font-bold text-cream uppercase">
              And yes — one student is enough to run the class.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* BATCH + ACTIVE ENROLLMENTS */}
        <section className="grid gap-8 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
          <div className="border-[3px] border-ink bg-paper p-7 shadow-brutal">
            <p className="eyebrow text-ink/55">Next batch</p>
            <p className="mt-3 font-display text-3xl font-bold uppercase">
              {course.schedule.nextBatch}
            </p>
            <dl className="mt-7 space-y-4 border-t-[3px] border-dashed border-ink/30 pt-6">
              {[
                ["Days", course.schedule.days],
                ["Time", course.schedule.time],
                ["Session", course.schedule.sessionLength],
                ["Mode", course.schedule.mode],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-wrap justify-between gap-3">
                  <dt className="eyebrow text-ink/55">{label}</dt>
                  <dd className="font-display text-sm font-bold uppercase">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-[3px] border-ink bg-blue p-7 shadow-brutal">
            {course.activeStudents > 0 ? (
              <>
                <p className="eyebrow text-ink/70">Current batch</p>
                <p className="mt-3 font-display text-6xl font-bold">
                  {String(course.activeStudents).padStart(2, "0")}
                </p>
                <p className="eyebrow mt-2 text-ink/70">Active learners</p>
              </>
            ) : (
              <>
                <p className="eyebrow text-ink/70">New batch</p>
                <p className="mt-3 font-display text-3xl font-bold uppercase">Just opened</p>
              </>
            )}
            <p className="mt-6 border-t-[3px] border-ink pt-5 text-sm leading-relaxed">
              Currently accepting enrollments.
            </p>
          </div>
        </section>

        <Divider />

        {/* STUDENT FEEDBACK */}
        <section className="py-14 lg:py-20">
          <SectionHeading
            eyebrow="Student feedback"
            title="From learners in this course"
            description="Sample feedback from previous live batches."
          />
          <ul className="mt-12 grid list-none gap-6 p-0 lg:grid-cols-3">
            {course.reviews.map((r) => (
              <li key={r.name} className="border-[3px] border-ink bg-paper p-6">
                <Stars rating={r.rating} />
                <blockquote className="mt-4 text-sm leading-relaxed text-ink/80">
                  “{r.quote}”
                </blockquote>
                <p className="mt-5 font-display text-xs font-bold tracking-widest uppercase">
                  — {r.name}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* INSTRUCTOR */}
        <section className="grid gap-10 py-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14 lg:py-20">
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
            <h2 className="text-3xl leading-[1.05] uppercase sm:text-4xl">
              Learn directly
              <br />
              from the instructor
            </h2>
            {instructor.bio.map((p) => (
              <p key={p} className="max-w-xl text-base leading-relaxed text-ink/75">
                {p}
              </p>
            ))}
            <dl className="grid gap-x-8 gap-y-5 border-t-[3px] border-ink pt-6 sm:grid-cols-2">
              {instructor.highlights.map((h) => (
                <div key={h.label}>
                  <dt className="eyebrow text-ink/55">{h.label}</dt>
                  <dd className="mt-1.5 font-display text-sm font-bold">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Divider />

        {/* FAQ */}
        <section className="max-w-4xl py-14 lg:py-20">
          <SectionHeading eyebrow="FAQ" title="Questions about this course" />
          <div className="mt-12">
            <Accordion
              items={courseFaqs.map((f) => ({
                title: f.q,
                content: <p className="text-sm leading-relaxed text-ink/75">{f.a}</p>,
              }))}
            />
          </div>
        </section>
      </div>

      {/* FINAL CTA */}
      <section className="border-t-[3px] border-ink bg-blue">
        <div className="mx-auto max-w-4xl px-5 py-20 pb-28 text-center sm:px-8 lg:pb-20">
          <p className="eyebrow justify-center text-ink/70">Ready to learn live?</p>
          <h2 className="mt-5 text-4xl leading-[1.02] uppercase sm:text-5xl">
            Stop watching.
            <br />
            Start practising.
          </h2>
          <div className="mt-10 flex justify-center">
            <BrutalButton variant="ink" onClick={() => setEnrollOpen(true)}>
              Enroll now →
            </BrutalButton>
          </div>
        </div>
      </section>

      {/* MOBILE STICKY CTA */}
      {!enrollOpen ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t-[3px] border-ink bg-cream p-3 lg:hidden">
          <BrutalButton className="w-full" onClick={() => setEnrollOpen(true)}>
            Enroll now →
          </BrutalButton>
        </div>
      ) : null}

      <EnrollmentModal
        course={course}
        open={enrollOpen}
        onClose={() => setEnrollOpen(false)}
      />
    </SiteLayout>
  );
}
