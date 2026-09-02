import { Link } from "@tanstack/react-router";
import type { Course } from "@/data/courses";

export function CourseCard({ course, eager = false }: { course: Course; eager?: boolean }) {
  return (
    <article className="flex h-full flex-col border-[3px] border-ink bg-paper shadow-brutal">
      <img
        src={course.thumbnail}
        alt={course.thumbnailAlt}
        width={1280}
        height={720}
        loading={eager ? "eager" : "lazy"}
        className="aspect-video w-full border-b-[3px] border-ink object-cover"
      />

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="border-[3px] border-ink bg-green px-2.5 py-1 font-display text-[0.65rem] font-bold tracking-widest uppercase">
            Live training
          </span>
          <span className="font-display text-[0.65rem] font-bold tracking-widest text-ink/55 uppercase">
            {course.category}
          </span>
        </div>

        <h3 className="font-display text-xl leading-tight uppercase sm:text-2xl">
          {course.shortTitle}
        </h3>

        <p className="font-display text-xs font-bold tracking-widest text-ink/60 uppercase">
          {course.level}
        </p>

        <p className="text-sm leading-relaxed text-ink/75">{course.description}</p>

        <dl className="mt-auto grid grid-cols-3 border-[3px] border-ink text-center">
          <div className="border-r-[3px] border-ink px-2 py-3">
            <dt className="sr-only">Modules</dt>
            <dd className="font-display text-sm font-bold">{course.modules} MOD</dd>
          </div>
          <div className="border-r-[3px] border-ink px-2 py-3">
            <dt className="sr-only">Duration</dt>
            <dd className="font-display text-sm font-bold">{course.duration}</dd>
          </div>
          <div className="bg-yellow px-2 py-3">
            <dt className="sr-only">Format</dt>
            <dd className="font-display text-sm font-bold">100% LIVE</dd>
          </div>
        </dl>

        <Link
          to="/courses/$slug"
          params={{ slug: course.slug }}
          className="brutal-press inline-flex items-center justify-center gap-2 border-[3px] border-ink bg-blue px-5 py-3 font-display text-sm font-bold tracking-wider uppercase shadow-brutal-sm"
        >
          View course →
        </Link>
      </div>
    </article>
  );
}
