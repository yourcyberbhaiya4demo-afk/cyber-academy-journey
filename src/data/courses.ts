import cyberThumb from "@/assets/course-cyber-foundations.jpg";
import webThumb from "@/assets/course-web-pentesting.jpg";
import bugThumb from "@/assets/course-bug-bounty.jpg";
import apiThumb from "@/assets/course-api-security.jpg";

export type Lesson = { title: string; duration: string };
export type Module = { title: string; duration: string; lessons: Lesson[] };

export type Course = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  seoTitle: string;
  metaDescription: string;
  category: string;
  level: string;
  thumbnail: string;
  thumbnailAlt: string;
  description: string;
  summary: string[];
  duration: string;
  modules: number;
  lessons: number;
  format: string;
  outcomes: string[];
  audience: string[];
  requirements: string[];
  curriculum: Module[];
  schedule: {
    nextBatch: string;
    days: string;
    time: string;
    sessionLength: string;
    mode: string;
  };
  activeStudents: number;
  reviews: { quote: string; name: string; rating: number }[];
  /** Internal only — never rendered publicly, revealed at enrollment step 2. */
  price: number;
};

const mod = (
  title: string,
  duration: string,
  lessons: [string, string, string],
  lessonDuration = "30 MIN",
): Module => ({
  title,
  duration,
  lessons: lessons.map((l) => ({ title: l, duration: lessonDuration })),
});

export const courses: Course[] = [
  {
    id: "cyber-security-foundations",
    slug: "cyber-security-foundations",
    title: "Cybersecurity Foundations — Live Practical Training",
    shortTitle: "Cybersecurity Foundations",
    seoTitle: "Cybersecurity Foundations — Live Practical Training | Naitik Here",
    metaDescription:
      "A live, instructor-led cybersecurity foundations course covering networking, HTTP, reconnaissance, common web vulnerabilities and professional reporting.",
    category: "Cybersecurity",
    level: "Beginner → Intermediate",
    thumbnail: cyberThumb,
    thumbnailAlt: "Cybersecurity Foundations live practical training course",
    description:
      "Start from zero and build a real working foundation in cybersecurity through live sessions, practical exercises and direct guidance.",
    summary: [
      "Cybersecurity Foundations is a live course for people who want to understand security properly instead of memorising tool commands. Every session is taught in real time, so you can stop the class, ask why something happened, and try it yourself while the instructor watches.",
      "We start with how systems and networks actually talk to each other, move into HTTP and the web, then spend the second half of the course finding and understanding real classes of vulnerabilities. You finish by writing reports the way a security team expects to receive them.",
    ],
    duration: "30+ Hours",
    modules: 12,
    lessons: 36,
    format: "100% Live",
    outcomes: [
      "Understand core cybersecurity concepts and terminology",
      "Read and analyse HTTP traffic with confidence",
      "Perform basic reconnaissance on a target",
      "Use Burp Suite for everyday web testing",
      "Identify common web vulnerability classes",
      "Understand the basics of API security",
      "Write clear, professional vulnerability reports",
    ],
    audience: [
      "Beginners",
      "Students",
      "Bug bounty beginners",
      "Aspiring security researchers",
      "VAPT aspirants",
      "Developers interested in security",
    ],
    requirements: [
      "Basic computer knowledge",
      "Basic web/internet familiarity",
      "Laptop or desktop",
      "Stable internet",
      "Willingness to practise",
    ],
    curriculum: [
      mod("Cybersecurity Fundamentals", "2 HOURS", [
        "Introduction to Cybersecurity",
        "Threats & Attack Surface",
        "Practical Exercise",
      ]),
      mod("Networking Fundamentals", "3 HOURS", [
        "TCP/IP & The OSI Model",
        "DNS, Ports & Protocols",
        "Traffic Analysis Exercise",
      ]),
      mod("HTTP & Web Fundamentals", "3 HOURS", [
        "Requests, Responses & Headers",
        "Cookies, Sessions & Storage",
        "Practical Exercise",
      ]),
      mod("Linux for Security", "2 HOURS", [
        "Shell Essentials",
        "Permissions & Processes",
        "Command Line Exercise",
      ]),
      mod("Reconnaissance Basics", "3 HOURS", [
        "Passive Information Gathering",
        "Active Enumeration",
        "Recon Exercise",
      ]),
      mod("Burp Suite Workflow", "3 HOURS", [
        "Proxy & Intercept",
        "Repeater & Intruder",
        "Guided Practice",
      ]),
      mod("Authentication & Sessions", "2 HOURS", [
        "Login Flows & Weaknesses",
        "Session Handling Issues",
        "Practical Exercise",
      ]),
      mod("Access Control & IDOR", "2 HOURS", [
        "Authorization Models",
        "Finding IDOR",
        "Practical Exercise",
      ]),
      mod("Injection & XSS", "3 HOURS", [
        "Cross-Site Scripting",
        "SQL Injection Basics",
        "Guided Practice",
      ]),
      mod("API Security Basics", "2 HOURS", [
        "How APIs Are Tested",
        "Common API Weaknesses",
        "Practical Exercise",
      ]),
      mod("Vulnerability Validation", "2 HOURS", [
        "Confirming Impact",
        "Avoiding False Positives",
        "Validation Exercise",
      ]),
      mod("Professional Reporting", "3 HOURS", [
        "Report Structure",
        "Writing Reproduction Steps",
        "Report Review Session",
      ]),
    ],
    schedule: {
      nextBatch: "15 SEPTEMBER 2026",
      days: "TUESDAY • THURSDAY • SATURDAY",
      time: "8:00 PM IST",
      sessionLength: "90 MINUTES / SESSION",
      mode: "ONLINE • LIVE",
    },
    activeStudents: 7,
    reviews: [
      {
        quote:
          "The live format made it much easier to ask questions and understand the practical side of cybersecurity.",
        name: "Aarav Sharma",
        rating: 5,
      },
      {
        quote:
          "I came in knowing nothing about networking. By module six I was reading HTTP traffic without panicking.",
        name: "Neha Iyer",
        rating: 5,
      },
      {
        quote:
          "Being able to interrupt and ask 'why' in the middle of an exercise is the whole value here.",
        name: "Karan Bhatt",
        rating: 5,
      },
    ],
    price: 2999,
  },
  {
    id: "web-pentesting",
    slug: "web-pentesting",
    title: "Web Pentesting — Live Practical Training",
    shortTitle: "Web Pentesting",
    seoTitle: "Web Pentesting — Live Practical Training | Naitik Here",
    metaDescription:
      "Live instructor-led web penetration testing training: Burp Suite, authentication flaws, IDOR, XSS, SQL injection, SSRF, business logic and professional reporting.",
    category: "Web Security",
    level: "Beginner → Advanced",
    thumbnail: webThumb,
    thumbnailAlt: "Web Pentesting live practical training course",
    description:
      "Learn web application penetration testing end to end — live, hands-on, one vulnerability class at a time.",
    summary: [
      "Web Pentesting is the long-form course: sixteen live modules that take you from HTTP basics to a finished, defensible report. Each vulnerability class gets its own session where we look at how it happens, how to find it, and how to prove impact without breaking things.",
      "The course is deliberately practical. You test alongside the instructor during class, and the awkward real-world cases — weird encodings, half-broken auth, logic that only fails on the third request — get worked through live rather than glossed over.",
    ],
    duration: "40+ Hours",
    modules: 16,
    lessons: 48,
    format: "100% Live",
    outcomes: [
      "Map and understand any web application's attack surface",
      "Run a structured recon phase before testing",
      "Drive Burp Suite confidently for real assessments",
      "Test authentication and authorization properly",
      "Find and validate IDOR, XSS, SQLi, CSRF and SSRF",
      "Spot business logic flaws that scanners miss",
      "Test the APIs behind modern web apps",
      "Deliver reports a security team can act on",
    ],
    audience: [
      "Beginners with basic web knowledge",
      "Students",
      "Bug bounty beginners",
      "Aspiring security researchers",
      "VAPT aspirants",
      "Developers interested in security",
    ],
    requirements: [
      "Basic computer knowledge",
      "Basic web/internet familiarity",
      "Laptop or desktop",
      "Stable internet",
      "Willingness to practise",
    ],
    curriculum: [
      mod("Web Fundamentals", "2 HOURS", [
        "How The Web Works",
        "Browsers, Origins & Context",
        "Practical Exercise",
      ]),
      mod("HTTP & HTTPS", "3 HOURS", [
        "Requests & Responses In Depth",
        "TLS, Headers & Caching",
        "Traffic Exercise",
      ]),
      mod("Reconnaissance", "3 HOURS", [
        "Passive Recon",
        "Active Enumeration",
        "Recon Exercise",
      ]),
      mod("Burp Suite", "3 HOURS", [
        "Core Workflow",
        "Extensions & Automation",
        "Guided Practice",
      ]),
      mod("Authentication", "3 HOURS", [
        "Login & Registration Flaws",
        "MFA & Reset Flows",
        "Practical Exercise",
      ]),
      mod("Authorization", "2 HOURS", [
        "Role & Tenant Models",
        "Privilege Escalation",
        "Practical Exercise",
      ]),
      mod("IDOR", "2 HOURS", [
        "Object Reference Patterns",
        "Finding & Proving IDOR",
        "Practical Exercise",
      ]),
      mod("XSS", "3 HOURS", [
        "Reflected & Stored XSS",
        "DOM XSS & Sinks",
        "Guided Practice",
      ]),
      mod("SQL Injection", "3 HOURS", [
        "Detection Techniques",
        "Exploitation & Impact",
        "Guided Practice",
      ]),
      mod("CSRF", "2 HOURS", [
        "Token & SameSite Behaviour",
        "Building A Working PoC",
        "Practical Exercise",
      ]),
      mod("SSRF", "2 HOURS", [
        "Internal Surface Discovery",
        "Filters & Bypasses",
        "Practical Exercise",
      ]),
      mod("File Upload", "2 HOURS", [
        "Upload Validation Flaws",
        "Escalating An Upload",
        "Practical Exercise",
      ]),
      mod("Business Logic", "3 HOURS", [
        "Reading A Workflow",
        "Abusing Order & State",
        "Guided Practice",
      ]),
      mod("API Testing", "3 HOURS", [
        "REST & GraphQL Surface",
        "Auth & Object-Level Issues",
        "Practical Exercise",
      ]),
      mod("Vulnerability Validation", "2 HOURS", [
        "Reproducing Reliably",
        "Severity & Impact",
        "Validation Exercise",
      ]),
      mod("Professional Reporting", "2 HOURS", [
        "Structure & Evidence",
        "Remediation Advice",
        "Report Review Session",
      ]),
    ],
    schedule: {
      nextBatch: "22 SEPTEMBER 2026",
      days: "MONDAY • WEDNESDAY • FRIDAY",
      time: "9:00 PM IST",
      sessionLength: "90 MINUTES / SESSION",
      mode: "ONLINE • LIVE",
    },
    activeStudents: 11,
    reviews: [
      {
        quote:
          "Sixteen modules sounded like a lot until I realised every one of them ends with me actually testing something.",
        name: "Devansh Rao",
        rating: 5,
      },
      {
        quote:
          "The business logic session changed how I look at applications. That is not something a recorded video teaches well.",
        name: "Priya Nair",
        rating: 5,
      },
      {
        quote:
          "My reports went from screenshots in a document to something I would be comfortable sending a client.",
        name: "Sahil Khan",
        rating: 4,
      },
    ],
    price: 4999,
  },
  {
    id: "bug-bounty",
    slug: "bug-bounty",
    title: "Bug Bounty Fundamentals — Live Practical Training",
    shortTitle: "Bug Bounty Fundamentals",
    seoTitle: "Bug Bounty Fundamentals — Live Practical Training | Naitik Here",
    metaDescription:
      "Live instructor-led bug bounty training covering scope, recon, asset discovery, subdomain and content discovery, web and API testing, validation and reporting.",
    category: "Bug Bounty",
    level: "Beginner → Intermediate",
    thumbnail: bugThumb,
    thumbnailAlt: "Bug Bounty Fundamentals live practical training course",
    description:
      "Learn how bug bounty hunting actually works — scope, recon, testing and reports that get accepted.",
    summary: [
      "Bug Bounty Fundamentals is about the workflow, not a list of payloads. We spend real time on reading a program's scope and rules, building a recon process you can repeat, and deciding what is worth reporting.",
      "Sessions are live, so the reconnaissance and testing happen in front of you and with you. When a finding looks interesting, we validate it together and write it up the way triage teams want to read it.",
    ],
    duration: "25+ Hours",
    modules: 10,
    lessons: 30,
    format: "100% Live",
    outcomes: [
      "Read program scope and rules correctly",
      "Build a repeatable recon workflow",
      "Discover assets and subdomains at scale",
      "Run effective content discovery",
      "Test web and API surfaces for real issues",
      "Validate a finding before reporting it",
      "Write reports that survive triage",
    ],
    audience: [
      "Beginners",
      "Students",
      "Bug bounty beginners",
      "Aspiring security researchers",
      "VAPT aspirants",
      "Developers interested in security",
    ],
    requirements: [
      "Basic computer knowledge",
      "Basic web/internet familiarity",
      "Laptop or desktop",
      "Stable internet",
      "Willingness to practise",
    ],
    curriculum: [
      mod("Bug Bounty Introduction", "2 HOURS", [
        "How Programs Work",
        "Expectations & Ethics",
        "Practical Exercise",
      ]),
      mod("Scope & Rules", "2 HOURS", [
        "Reading A Policy",
        "In-Scope vs Out-Of-Scope",
        "Scope Exercise",
      ]),
      mod("Reconnaissance", "3 HOURS", [
        "Recon Methodology",
        "Tooling & Notes",
        "Recon Exercise",
      ]),
      mod("Asset Discovery", "3 HOURS", [
        "Mapping An Organisation",
        "Cloud & Third-Party Assets",
        "Practical Exercise",
      ]),
      mod("Subdomain Enumeration", "3 HOURS", [
        "Passive Sources",
        "Bruteforce & Permutations",
        "Guided Practice",
      ]),
      mod("Content Discovery", "2 HOURS", [
        "Wordlists That Work",
        "Parameters & Endpoints",
        "Practical Exercise",
      ]),
      mod("Web Vulnerability Testing", "3 HOURS", [
        "High-Value Vulnerability Classes",
        "Testing Efficiently",
        "Guided Practice",
      ]),
      mod("API Testing", "3 HOURS", [
        "Finding Hidden APIs",
        "Auth & Object-Level Testing",
        "Practical Exercise",
      ]),
      mod("Finding Validation", "2 HOURS", [
        "Impact & Reproducibility",
        "Duplicate & N/A Avoidance",
        "Validation Exercise",
      ]),
      mod("Professional Reporting", "2 HOURS", [
        "Writing For Triage",
        "Evidence & Severity",
        "Report Review Session",
      ]),
    ],
    schedule: {
      nextBatch: "29 SEPTEMBER 2026",
      days: "SATURDAY • SUNDAY",
      time: "11:00 AM IST",
      sessionLength: "90 MINUTES / SESSION",
      mode: "ONLINE • LIVE",
    },
    activeStudents: 4,
    reviews: [
      {
        quote:
          "The scope session alone saved me from wasting weeks testing things that were never eligible.",
        name: "Tanmay Joshi",
        rating: 5,
      },
      {
        quote:
          "Recon finally feels like a process instead of me randomly running tools.",
        name: "Ananya Das",
        rating: 5,
      },
      {
        quote:
          "First accepted report came a few weeks after the reporting module. The format mattered more than I expected.",
        name: "Vikram Sethi",
        rating: 5,
      },
    ],
    price: 2499,
  },
  {
    id: "api-security",
    slug: "api-security",
    title: "API Security — Live Practical Training",
    shortTitle: "API Security",
    seoTitle: "API Security — Live Practical Training | Naitik Here",
    metaDescription:
      "Live instructor-led API security training covering REST design, authentication, authorization, JWT, BOLA/IDOR, rate limiting, input validation and API testing.",
    category: "API Security",
    level: "Intermediate",
    thumbnail: apiThumb,
    thumbnailAlt: "API Security live practical training course",
    description:
      "Test modern APIs properly — authentication, authorization, tokens, and the object-level flaws that keep shipping.",
    summary: [
      "API Security is a focused, intermediate course for people who already understand the web and now want to test the layer underneath it. Nine live modules, each built around a concrete class of API weakness.",
      "We work through real request flows in class: how a token is issued and trusted, where object-level authorization gets skipped, what rate limiting does and does not protect, and how to validate an API finding before writing it up.",
    ],
    duration: "20+ Hours",
    modules: 9,
    lessons: 27,
    format: "100% Live",
    outcomes: [
      "Understand how modern APIs are designed and consumed",
      "Map an API's real attack surface",
      "Test authentication and token handling",
      "Find broken object-level authorization (BOLA/IDOR)",
      "Assess JWT implementation mistakes",
      "Evaluate rate limiting and abuse controls",
      "Test input validation on API endpoints",
      "Report API findings with clear impact",
    ],
    audience: [
      "Developers interested in security",
      "Students with web basics",
      "Bug bounty hunters moving to APIs",
      "Aspiring security researchers",
      "VAPT aspirants",
      "QA engineers moving into security",
    ],
    requirements: [
      "Basic computer knowledge",
      "Comfort with HTTP and the web",
      "Laptop or desktop",
      "Stable internet",
      "Willingness to practise",
    ],
    curriculum: [
      mod("API Fundamentals", "2 HOURS", [
        "API Types & Architectures",
        "Reading API Documentation",
        "Practical Exercise",
      ]),
      mod("REST APIs", "2 HOURS", [
        "Resources, Verbs & Status Codes",
        "Mapping Endpoints",
        "Practical Exercise",
      ]),
      mod("Authentication", "3 HOURS", [
        "Keys, Sessions & OAuth Flows",
        "Auth Bypass Patterns",
        "Guided Practice",
      ]),
      mod("Authorization", "3 HOURS", [
        "Role & Scope Enforcement",
        "Privilege Escalation Testing",
        "Guided Practice",
      ]),
      mod("JWT", "2 HOURS", [
        "Structure & Signing",
        "Common Implementation Flaws",
        "Practical Exercise",
      ]),
      mod("IDOR / BOLA", "3 HOURS", [
        "Object-Level Authorization",
        "Finding & Proving BOLA",
        "Guided Practice",
      ]),
      mod("Rate Limiting", "2 HOURS", [
        "Abuse & Enumeration",
        "Bypass Techniques",
        "Practical Exercise",
      ]),
      mod("Input Validation", "2 HOURS", [
        "Mass Assignment & Type Confusion",
        "Injection Through APIs",
        "Practical Exercise",
      ]),
      mod("API Security Testing", "3 HOURS", [
        "Building A Test Plan",
        "Validation & Reporting",
        "Report Review Session",
      ]),
    ],
    schedule: {
      nextBatch: "6 OCTOBER 2026",
      days: "TUESDAY • THURSDAY",
      time: "9:00 PM IST",
      sessionLength: "90 MINUTES / SESSION",
      mode: "ONLINE • LIVE",
    },
    activeStudents: 0,
    reviews: [
      {
        quote:
          "The BOLA module made something click that I had read about ten times and never really understood.",
        name: "Meera Krishnan",
        rating: 5,
      },
      {
        quote:
          "As a backend developer this changed how I write authorization checks, not just how I test them.",
        name: "Arjun Pillai",
        rating: 5,
      },
      {
        quote:
          "Short course, no filler. Every session had me sending requests myself.",
        name: "Zoya Ansari",
        rating: 4,
      },
    ],
    price: 2299,
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);

export const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;
