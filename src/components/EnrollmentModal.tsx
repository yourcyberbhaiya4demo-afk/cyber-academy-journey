import { useEffect, useRef, useState } from "react";
import type { Course } from "@/data/courses";
import { formatPrice } from "@/data/courses";
import { enrollmentConfig, mailtoUrl, whatsappUrl } from "@/data/site";
import { BrutalAnchor, BrutalButton } from "@/components/ui-kit";

type Details = { name: string; email: string; whatsapp: string };
type Errors = Partial<Record<keyof Details, string>>;

const STEPS = ["Details", "Price", "Payment"] as const;

export function EnrollmentModal({
  course,
  open,
  onClose,
}: {
  course: Course;
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [details, setDetails] = useState<Details>({ name: "", email: "", whatsapp: "" });
  const [errors, setErrors] = useState<Errors>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    headingRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setSubmitted(false);
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const validate = () => {
    const next: Errors = {};
    if (!details.name.trim()) next.name = "Please enter your full name.";
    if (!details.email.trim()) next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(details.email.trim()))
      next.email = "Please enter a valid email address.";
    const digits = details.whatsapp.replace(/\D/g, "");
    if (!details.whatsapp.trim()) next.whatsapp = "Please enter your WhatsApp number.";
    else if (digits.length < 10 || digits.length > 15)
      next.whatsapp = "Please enter a valid WhatsApp number with country code.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const back = () => (step === 1 ? onClose() : setStep((s) => s - 1));

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/70 p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close enrollment"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enroll-heading"
        className="relative flex max-h-[92vh] w-full max-w-[680px] flex-col overflow-y-auto border-[3px] border-ink bg-cream shadow-brutal-lg"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 border-b-[3px] border-ink bg-cream px-5 pt-5 pb-4 sm:px-8">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              className="font-display text-xs font-bold tracking-widest uppercase hover:text-ink/60"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close enrollment"
              className="border-[3px] border-ink bg-paper px-2.5 py-0.5 font-display text-lg leading-tight"
            >
              ×
            </button>
          </div>

          <h2
            id="enroll-heading"
            ref={headingRef}
            tabIndex={-1}
            className="mt-4 text-2xl uppercase outline-none"
          >
            Enrollment
          </h2>

          <ol className="mt-4 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
            {STEPS.map((label, i) => {
              const n = i + 1;
              const active = n === step && !submitted;
              return (
                <li
                  key={label}
                  aria-current={active ? "step" : undefined}
                  className={`font-display text-xs font-bold tracking-widest uppercase ${
                    active ? "text-ink" : "text-ink/45"
                  }`}
                >
                  <span className={active ? "border-b-[3px] border-blue pb-1" : "pb-1"}>
                    {String(n).padStart(2, "0")} {label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="space-y-7 px-5 py-7 sm:px-8">
          {submitted ? (
            <ConfirmationState course={course} onClose={onClose} />
          ) : step === 1 ? (
            <>
              <p className="font-display text-xs font-bold tracking-widest text-ink/60 uppercase">
                Step 1 of 3 — Your details
              </p>
              <form
                noValidate
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (validate()) setStep(2);
                }}
              >
                <Field
                  id="enroll-name"
                  label="Full name *"
                  value={details.name}
                  error={errors.name}
                  onChange={(v) => setDetails({ ...details, name: v })}
                  autoComplete="name"
                />
                <Field
                  id="enroll-email"
                  label="Email address *"
                  type="email"
                  value={details.email}
                  error={errors.email}
                  onChange={(v) => setDetails({ ...details, email: v })}
                  autoComplete="email"
                />
                <Field
                  id="enroll-whatsapp"
                  label="WhatsApp number *"
                  type="tel"
                  value={details.whatsapp}
                  error={errors.whatsapp}
                  onChange={(v) => setDetails({ ...details, whatsapp: v })}
                  autoComplete="tel"
                  hint="Include your country code, e.g. +91"
                />
                <div>
                  <label
                    htmlFor="enroll-course"
                    className="font-display text-xs font-bold tracking-widest uppercase"
                  >
                    Course
                  </label>
                  <input
                    id="enroll-course"
                    readOnly
                    value={course.shortTitle}
                    className="mt-2 w-full border-[3px] border-ink bg-muted px-4 py-3 font-display text-sm font-bold"
                  />
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <BrutalButton type="button" variant="outline" onClick={onClose}>
                    Back
                  </BrutalButton>
                  <BrutalButton type="submit" className="flex-1">
                    Continue →
                  </BrutalButton>
                </div>
              </form>
            </>
          ) : step === 2 ? (
            <>
              <p className="font-display text-xs font-bold tracking-widest text-ink/60 uppercase">
                Step 2 of 3 — Review & course fee
              </p>
              <div className="border-[3px] border-ink bg-paper p-6">
                <p className="eyebrow text-ink/55">Selected course</p>
                <p className="mt-2 font-display text-xl font-bold uppercase">{course.shortTitle}</p>
                <p className="mt-1 text-sm text-ink/70">
                  {course.duration} • {course.modules} modules • 100% live
                </p>
                <dl className="mt-5 space-y-1 border-t-[3px] border-dashed border-ink/30 pt-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/60">Name</dt>
                    <dd className="font-bold">{details.name}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/60">Email</dt>
                    <dd className="font-bold break-all">{details.email}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/60">WhatsApp</dt>
                    <dd className="font-bold">{details.whatsapp}</dd>
                  </div>
                </dl>
              </div>

              <div className="border-[3px] border-ink bg-yellow p-6 shadow-brutal">
                <p className="eyebrow text-ink/70">Your course fee</p>
                <p className="mt-2 font-display text-4xl font-bold">{formatPrice(course.price)}</p>
                <p className="mt-2 font-display text-xs font-bold tracking-widest uppercase">
                  One-time payment
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <BrutalButton variant="outline" onClick={() => setStep(1)}>
                  ← Back
                </BrutalButton>
                <BrutalButton className="flex-1" onClick={() => setStep(3)}>
                  Continue to payment →
                </BrutalButton>
              </div>
            </>
          ) : (
            <PaymentStep
              course={course}
              onBack={() => setStep(2)}
              onSubmitted={() => setSubmitted(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-display text-xs font-bold tracking-widest uppercase">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-2 w-full border-[3px] bg-paper px-4 py-3 text-base ${
          error ? "border-destructive" : "border-ink"
        }`}
      />
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink/55">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-2 border-l-[3px] border-destructive pl-3 text-sm font-bold text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

function PaymentStep({
  course,
  onBack,
  onSubmitted,
}: {
  course: Course;
  onBack: () => void;
  onSubmitted: () => void;
}) {
  const rows = [
    ["Account name", enrollmentConfig.accountName],
    ["Bank", enrollmentConfig.bankName],
    ["Account number", enrollmentConfig.accountNumber],
    ["IFSC", enrollmentConfig.ifsc],
  ] as const;

  return (
    <>
      <p className="font-display text-xs font-bold tracking-widest text-ink/60 uppercase">
        Step 3 of 3 — Complete your payment
      </p>

      <div className="border-[3px] border-ink bg-yellow px-6 py-5">
        <p className="eyebrow text-ink/70">Amount to pay</p>
        <p className="mt-1 font-display text-3xl font-bold">{formatPrice(course.price)}</p>
        <p className="mt-1 text-sm">{course.shortTitle} — one-time payment</p>
      </div>

      <section className="border-[3px] border-ink bg-paper p-6">
        <h3 className="font-display text-lg uppercase">UPI / QR</h3>
        <div className="mt-5 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <img
            src="/payment-qr-placeholder.svg"
            alt="Placeholder UPI QR code for course fee payment"
            width={180}
            height={180}
            loading="lazy"
            className="border-[3px] border-ink bg-cream"
          />
          <div>
            <p className="eyebrow text-ink/55">Scan to pay</p>
            <p className="mt-2 eyebrow text-ink/55">UPI ID</p>
            <p className="font-display text-lg font-bold break-all">{enrollmentConfig.upiId}</p>
          </div>
        </div>
      </section>

      <section className="border-[3px] border-ink bg-paper p-6">
        <h3 className="font-display text-lg uppercase">Bank transfer</h3>
        <dl className="mt-4 space-y-3">
          {rows.map(([label, value]) => (
            <div key={label} className="flex flex-wrap justify-between gap-2 border-b border-dashed border-ink/25 pb-2">
              <dt className="eyebrow text-ink/55">{label}</dt>
              <dd className="font-display text-sm font-bold break-all">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h3 className="font-display text-lg uppercase">Payment instructions</h3>
        <ol className="mt-4 list-none space-y-3 p-0">
          {[
            "Pay the exact course amount shown above.",
            "Save your UTR / transaction ID.",
            "Take a screenshot of the successful payment.",
            "Submit your payment proof using the button below.",
            "Payment verification normally takes up to 24 hours.",
          ].map((text, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="font-display text-sm font-bold text-blue">
                {String(i + 1).padStart(2, "0")}
              </span>
              {text}
            </li>
          ))}
        </ol>
      </section>

      <BrutalAnchor
        variant="green"
        href={enrollmentConfig.paymentProofFormUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onSubmitted}
        className="w-full"
      >
        Submit payment proof →
      </BrutalAnchor>

      <section className="border-[3px] border-ink bg-cream p-6">
        <h3 className="font-display text-base uppercase">Payment issue?</h3>
        <p className="mt-2 text-sm text-ink/70">
          Didn't receive a response within 24 hours? Reach out directly.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <BrutalAnchor
            href={whatsappUrl(`Payment support — ${course.shortTitle}`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp →
          </BrutalAnchor>
          <BrutalAnchor href={mailtoUrl(`Payment support — ${course.shortTitle}`)}>
            Email support →
          </BrutalAnchor>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <BrutalButton variant="outline" onClick={onBack}>
          ← Back
        </BrutalButton>
      </div>
    </>
  );
}

function ConfirmationState({ course, onClose }: { course: Course; onClose: () => void }) {
  return (
    <div className="space-y-5">
      <div className="border-[3px] border-ink bg-green p-6 shadow-brutal">
        <h3 className="font-display text-xl uppercase">Payment proof submitted</h3>
        <p className="mt-3 text-sm leading-relaxed">
          Your enrollment request for {course.shortTitle} has been received.
        </p>
      </div>
      <p className="text-sm leading-relaxed text-ink/75">
        Payment verification normally takes up to 24 hours. Once your payment is verified, your live
        class details will be shared using your provided contact information.
      </p>
      <BrutalButton variant="ink" onClick={onClose} className="w-full">
        Done
      </BrutalButton>
    </div>
  );
}
