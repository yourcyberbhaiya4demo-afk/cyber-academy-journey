export const SITE_URL = "https://learn.naitikhere.in";
export const SITE_NAME = "Learn by Naitik Here";
export const BRAND = "NAITIK HERE";

/** Centralised enrollment / payment configuration (placeholders — no secrets). */
export const enrollmentConfig = {
  paymentProofFormUrl: "https://tally.so/r/YOUR_PAYMENT_PROOF_FORM",
  whatsappNumber: "910000000000",
  supportEmail: "support@naitikhere.in",
  upiId: "YOUR_UPI_ID@UPI",
  accountName: "YOUR NAME",
  bankName: "YOUR BANK",
  accountNumber: "XXXXXXXXXXXX",
  ifsc: "XXXXXXXXXXX",
  currency: "₹",
};

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${enrollmentConfig.whatsappNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const mailtoUrl = (subject?: string) =>
  `mailto:${enrollmentConfig.supportEmail}${
    subject ? `?subject=${encodeURIComponent(subject)}` : ""
  }`;

export const instructor = {
  name: "Naitik",
  role: "Security Researcher & Live Instructor",
  bio: [
    "I'm a security researcher who spends most of the week testing web applications and APIs, and the rest of it teaching people how to do the same thing properly.",
    "I don't record lectures and sell them. Every class I run is live, because the part that actually makes someone good at security is the messy part — the question you ask mid-exercise, the target that behaves differently than the slide said it would, the report you rewrite three times.",
  ],
  highlights: [
    { label: "FOCUS", value: "Web, API & application security" },
    { label: "TEACHING", value: "Live, cohort-based practical sessions" },
    { label: "RESEARCH", value: "Vulnerability research & responsible disclosure" },
    { label: "FORMAT", value: "Small live batches, direct guidance" },
  ],
};

export type Faq = { q: string; a: string };

export const courseFaqs: Faq[] = [
  {
    q: "Are the classes completely live?",
    a: "Yes. Every session is conducted live by the instructor at the scheduled time. There is no pre-recorded lecture library.",
  },
  {
    q: "Are sessions recorded?",
    a: "The course is designed around attending live. Recordings are not part of the product, so plan to join the scheduled sessions.",
  },
  {
    q: "What happens if only one student enrolls?",
    a: "The class still runs live. There is no minimum-student requirement and a batch is never cancelled for low enrollment.",
  },
  {
    q: "How long is each class?",
    a: "Each live session runs about 90 minutes, including practical work and questions.",
  },
  {
    q: "Do I need previous cybersecurity experience?",
    a: "No advanced experience is required. Basic computer and web familiarity is enough for the beginner-friendly courses.",
  },
  {
    q: "What equipment do I need?",
    a: "A laptop or desktop, a stable internet connection, and the willingness to practise alongside the session.",
  },
  {
    q: "How do I enroll?",
    a: "Click ENROLL NOW on the course page, enter your details, review the course fee, and complete the payment step.",
  },
  {
    q: "How does payment work?",
    a: "You pay the exact course fee via UPI or bank transfer, then submit your payment proof through the enrollment form.",
  },
  {
    q: "How long does payment verification take?",
    a: "Verification normally takes up to 24 hours. It is a manual check — nothing is verified automatically.",
  },
  {
    q: "How will I receive class details?",
    a: "Once your payment is verified, class details are shared using the email and WhatsApp number you provided.",
  },
  {
    q: "How can I contact support?",
    a: "Message on WhatsApp or send an email using the contact details on the contact page.",
  },
];

export const testimonials = [
  {
    quote:
      "The live format made it much easier to ask questions and understand the practical side of cybersecurity.",
    name: "Aarav Sharma",
  },
  {
    quote:
      "I had tried recorded courses before and always stopped halfway. Having a scheduled class with someone answering me kept me going.",
    name: "Ishita Verma",
  },
  {
    quote:
      "We worked through the exercises together in the session, so I actually understood what I was doing instead of copying commands.",
    name: "Rohan Mehta",
  },
];
