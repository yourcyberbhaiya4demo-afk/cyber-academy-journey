import { useCallback, useEffect, useRef, useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import type { Course } from "@/data/courses";

const AUTOPLAY_MS = 5000;
const RESUME_MS = 9000;

function usePerView() {
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return perView;
}

export function CourseCarousel({ courses }: { courses: Course[] }) {
  const perView = usePerView();
  const maxIndex = Math.max(0, courses.length - perView);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const interact = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_MS);
  }, []);

  const go = useCallback(
    (next: number) => {
      setIndex(next < 0 ? maxIndex : next > maxIndex ? 0 : next);
      interact();
    },
    [interact, maxIndex],
  );

  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = setInterval(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, maxIndex]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured live cybersecurity courses"
        tabIndex={0}
        className="overflow-hidden"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(index + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(index - 1);
          }
        }}
        onTouchStart={(e) => {
          touchStart.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchStart.current === null) return;
          const dx = (e.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
          if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
          touchStart.current = null;
        }}
      >
        <ul
          className="m-0 flex list-none p-0 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
        >
          {courses.map((course, i) => (
            <li
              key={course.id}
              aria-hidden={i < index || i >= index + perView}
              className="w-full shrink-0 px-2.5 sm:w-1/2 lg:w-1/3"
            >
              <CourseCard course={course} eager={i === 0} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Previous course"
            onClick={() => go(index - 1)}
            className="brutal-press border-[3px] border-ink bg-paper px-5 py-3 font-display text-sm font-bold shadow-brutal-sm"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next course"
            onClick={() => go(index + 1)}
            className="brutal-press border-[3px] border-ink bg-paper px-5 py-3 font-display text-sm font-bold shadow-brutal-sm"
          >
            →
          </button>
        </div>

        <ul className="m-0 flex list-none items-center gap-3 p-0">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <li key={i}>
              <button
                type="button"
                aria-label={`Go to slide ${i + 1} of ${maxIndex + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className={`h-4 w-4 border-[3px] border-ink ${
                  i === index ? "bg-blue" : "bg-paper"
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
