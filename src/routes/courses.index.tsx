import { createFileRoute } from "@tanstack/react-router";
import { CourseCard } from "@/components/CourseCard";
import { SiteLayout } from "@/components/SiteLayout";
import { Eyebrow } from "@/components/ui-kit";
import { courses } from "@/data/courses";
import { SITE_URL } from "@/data/site";

const TITLE = "All Live Cybersecurity Courses | Naitik Here";
const DESCRIPTION =
  "Browse every live, instructor-led course: cybersecurity foundations, web pentesting, bug bounty fundamentals and API security.";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/courses/` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/courses/` }],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  return (
    <SiteLayout>
      <section className="border-b-[3px] border-ink">
        <div className="mx-auto max-w-6xl space-y-7 px-5 py-16 sm:px-8 lg:py-20">
          <Eyebrow>Course catalog</Eyebrow>
          <h1 className="text-[2.6rem] leading-[0.95] uppercase sm:text-6xl">All courses</h1>
          <p className="font-display text-lg font-bold uppercase">
            Live. Practical. Instructor-led.
          </p>
          <p className="max-w-xl text-base leading-relaxed text-ink/75">
            Choose a course and start building real-world cybersecurity skills. Every batch runs
            live — even for a single student.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <h2 className="sr-only">Available live courses</h2>
        <ul className="grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <li key={course.id}>
              <CourseCard course={course} eager={i === 0} />
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
