import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BRAND } from "@/data/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-tight uppercase"
          onClick={() => setOpen(false)}
        >
          {BRAND}
          <span className="ml-1 inline-block h-2.5 w-2.5 bg-blue align-baseline" aria-hidden="true" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "border-b-[3px] border-blue" }}
              className="font-display text-xs font-bold tracking-widest uppercase hover:text-ink/60"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/courses"
            className="brutal-press border-[3px] border-ink bg-yellow px-4 py-2.5 font-display text-xs font-bold tracking-widest uppercase shadow-brutal-sm"
          >
            Explore courses →
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="border-[3px] border-ink bg-paper px-3 py-2 font-display text-lg leading-none shadow-brutal-sm lg:hidden"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t-[3px] border-ink bg-paper lg:hidden"
        >
          <ul className="m-0 list-none p-0">
            {links.map((l) => (
              <li key={l.to} className="border-b-[3px] border-ink">
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-4 font-display text-sm font-bold tracking-widest uppercase"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-5">
            <Link
              to="/courses"
              onClick={() => setOpen(false)}
              className="block border-[3px] border-ink bg-yellow px-5 py-3.5 text-center font-display text-sm font-bold tracking-widest uppercase shadow-brutal-sm"
            >
              Explore courses →
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
