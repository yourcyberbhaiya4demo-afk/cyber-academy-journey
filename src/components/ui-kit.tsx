import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-ink/70", className)}>
      <span aria-hidden="true" className="inline-block h-3 w-3 bg-blue" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("max-w-2xl space-y-5", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-3xl leading-[1.05] uppercase sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? (
        <div className="text-base leading-relaxed text-ink/75 sm:text-lg">{description}</div>
      ) : null}
    </header>
  );
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t-[3px] border-ink", className)} />;
}

const buttonBase =
  "brutal-press inline-flex items-center justify-center gap-2 border-[3px] border-ink px-6 py-3.5 font-display text-sm font-bold tracking-wider uppercase shadow-brutal disabled:opacity-60";

const variants = {
  primary: "bg-blue text-ink",
  ink: "bg-ink text-cream",
  yellow: "bg-yellow text-ink",
  green: "bg-green text-ink",
  outline: "bg-paper text-ink",
} as const;

type Variant = keyof typeof variants;

export function BrutalButton({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cn(buttonBase, variants[variant], className)} {...props} />;
}

export function BrutalLink({
  to,
  params,
  variant = "primary",
  className,
  children,
}: {
  to: string;
  params?: Record<string, string>;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      params={params as never}
      className={cn(buttonBase, variants[variant], className)}
    >
      {children}
    </Link>
  );
}

export function BrutalAnchor({
  variant = "outline",
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={cn(buttonBase, variants[variant], className)} {...props} />;
}

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border-[3px] border-ink bg-green px-3 py-1 font-display text-xs font-bold tracking-widest uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-[3px] border-ink bg-paper px-5 py-6">
      <p className="font-display text-2xl font-bold sm:text-3xl">{value}</p>
      <p className="eyebrow mt-2 text-ink/60">{label}</p>
    </div>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <p className="text-lg tracking-widest text-ink" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span className="text-ink/25">{"★".repeat(5 - rating)}</span>
    </p>
  );
}
