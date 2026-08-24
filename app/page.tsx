import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHead } from "@/components/section-head";
import { VISIBLE_PROJECTS, TRACK_LABEL } from "@/lib/projects";

const HEADLINE_STATS = [
  { value: "0.955", label: "RAG retrieval hit rate", accent: true },
  { value: "0.941", label: "Answer faithfulness" },
  { value: "0.97", suffix: "+", label: "R², suitability model" },
  { value: "6.7M", suffix: "+", label: "Records analysed" },
];

const EXPERIENCE = [
  {
    dates: "Dec 2025 — Feb 2026",
    location: "Remote, India",
    role: "Data Science Intern",
    company: "Infosys Springboard",
    bullets: [
      "Built an AI packaging recommendation engine across 25 materials and 13 categories, returning ranked suitability, cost and CO₂ predictions in real time.",
      "Trained Random Forest and XGBoost on 2,275 samples with 15 engineered features, reaching 0.97+ R² suitability and 0.98+ R² CO₂ estimation.",
      "Served the models through a Flask REST API with joblib model loading, deployed on Render with managed PostgreSQL.",
    ],
  },
  {
    dates: "Jan 2025 — Jun 2025",
    location: "Hyderabad, India",
    role: "Data Analyst Intern",
    company: "Techmatrics Solution",
    bullets: [
      "Analysed 6.7M+ retail transactions and showed that 20% discounting cut net revenue despite higher volume, and delivered that as a pricing recommendation.",
      "Wrote multi-table JOINs, CTEs and window functions against PostgreSQL, cutting query time and removing manual prep from recurring reports.",
      "Built Tableau dashboards on revenue by category, customer segment and region, plus reusable Python cleaning and validation functions.",
    ],
  },
];

const STACK = [
  {
    group: "Languages & core",
    items:
      "Python · SQL · JavaScript · Data Structures & Algorithms · OOP · REST API design · System design basics · Statistics & probability",
  },
  {
    group: "AI & LLM",
    items:
      "LangChain · Google Gemini · HuggingFace Transformers · ChromaDB · Langfuse · Hybrid search (BM25 + vector) · Cross-encoder reranking · Retrieval evaluation",
  },
  {
    group: "ML & data",
    items:
      "PyTorch · scikit-learn · XGBoost · Pandas · NumPy · Feature engineering · Tableau",
  },
  {
    group: "Backend",
    items:
      "Django · Django REST Framework · FastAPI · Flask · JWT auth · Pydantic · Uvicorn · Middleware & rate limiting · Transactions & row locking · Pytest",
  },
  {
    group: "Front end",
    items: "React · Vite · Next.js · TypeScript · Tailwind CSS · Streamlit",
  },
  {
    group: "Databases",
    items:
      "PostgreSQL · MySQL · SQLAlchemy ORM · Schema design · Query optimisation · ChromaDB",
  },
  {
    group: "DevOps & cloud",
    items:
      "Docker · Docker Compose · Git · GitHub Actions · CI/CD · Google Cloud Run · Render · Vercel · Linux",
  },
];

const CREDENTIALS = [
  {
    title: "Off-Road Terrain Identification using YOLOv8",
    detail: "Journal of Electrical Systems — publication",
    date: "Dec 2023",
  },
  {
    title: "NextLeap Data Analyst Fellowship",
    detail: "Top Fellow recognition",
    date: "Jul 2025",
  },
  {
    title: "SQL (Intermediate)",
    detail: "HackerRank certification",
    date: "Mar 2025",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        {/* ---------------------------------------------------------------
            Hero. The 64px rail holds the vertical location label on desktop
            and is dropped entirely on small screens.
        --------------------------------------------------------------- */}
        <section className="grid border-b-2 border-divider lg:grid-cols-[64px_1fr_42%]">
          <div className="hidden items-end justify-center border-r-2 border-edge pb-11 lg:flex">
            <span className="label [writing-mode:vertical-rl] rotate-180 tracking-[0.3em] font-semibold text-muted">
              Hyderabad · India
            </span>
          </div>

          <div className="px-5 py-14 sm:px-10 lg:py-[74px] lg:pl-12 lg:pr-14">
            <div className="mb-8 flex items-center gap-3.5 lg:mb-9">
              <span className="block h-[9px] w-[9px] bg-accent" />
              <span className="label tracking-[0.24em] text-accent">
                AI &amp; Full Stack Engineer
              </span>
            </div>

            <h1 className="display mb-8 max-w-[13ch] text-[clamp(44px,9vw,96px)] tracking-[-0.045em] lg:mb-[34px]">
              Build the model. Then ship it.
            </h1>

            <p className="max-w-[52ch] text-lg leading-[1.55] text-muted">
              I build LLM retrieval systems, ML models, and the APIs that serve
              them. Two are live: a RAG pipeline at 0.955 hit rate, and an ML
              recommender at 0.97+ R². Both measured, both deployed.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="#work"
                className="label bg-ink px-[30px] py-[17px] text-bg transition-colors hover:bg-accent"
              >
                Selected work
              </Link>
              <Link
                href="#contact"
                className="label border-2 border-ink px-[30px] py-[15px] text-ink transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
              >
                Get in touch
              </Link>
              <div className="ml-3 flex gap-6">
                <a
                  href="https://github.com/Mani9kanta3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label font-semibold tracking-[0.1em] text-muted transition-colors hover:text-accent"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/manikanta3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label font-semibold tracking-[0.1em] text-muted transition-colors hover:text-accent"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Portrait: an oval over a floating accent oval on grid paper, as
              drawn in the artboard. Full colour — the design system's grayscale
              rule is for content photography, not this portrait. */}
          <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden border-t-2 border-edge lg:min-h-[640px] lg:border-l-2 lg:border-t-0">
            <div aria-hidden className="grid-paper absolute inset-0" />
            <div
              aria-hidden
              className="animate-float absolute w-[74%] max-w-[420px] bg-accent"
              style={{ aspectRatio: "1 / 1.18", borderRadius: "50%" }}
            />
            <div
              className="relative z-[2] w-[60%] max-w-[340px] overflow-hidden"
              style={{ aspectRatio: "1 / 1.3", borderRadius: "50%" }}
            >
              <Image
                src="/profile-photo.png"
                alt="Manikanta Pudi"
                fill
                priority
                sizes="(max-width: 1024px) 60vw, 340px"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-[3] flex flex-wrap justify-between gap-x-6 gap-y-1 border-t-2 border-divider bg-bg px-5 py-4 sm:px-7">
              <span className="label tracking-[0.2em] font-semibold text-muted">
                B.E. CSE (AI &amp; ML) · 2025
              </span>
              <span className="label tracking-[0.2em] font-semibold text-accent">
                Open to roles
              </span>
            </div>
          </div>
        </section>

        {/* Headline numbers. */}
        <section className="grid grid-cols-2 border-b-2 border-divider lg:grid-cols-4">
          {HEADLINE_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                "px-5 py-8 sm:px-8 sm:py-[38px]",
                // Draw the cell rules without leaving a trailing edge.
                i % 2 === 0 ? "border-r-2 border-edge" : "",
                i < 2 ? "border-b-2 border-edge lg:border-b-0" : "",
                "lg:border-b-0 lg:border-r-2 lg:last:border-r-0",
              ].join(" ")}
            >
              <div
                className={`text-[clamp(34px,5vw,52px)] font-bold leading-none tracking-[-0.04em] ${
                  stat.accent ? "text-accent" : ""
                }`}
              >
                {stat.value}
                {stat.suffix && (
                  <span className="text-3xl">{stat.suffix}</span>
                )}
              </div>
              <div className="label mt-3 font-semibold tracking-[0.16em] text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* -------------------------------- Work -------------------------------- */}
        <section id="work" className="border-b-2 border-divider">
          <SectionHead
            number="01"
            kicker="Selected work"
            title="Systems I built, and what they measure"
          />

          {VISIBLE_PROJECTS.map((project) => (
            <article
              key={project.slug}
              className="grid border-t-2 border-edge lg:grid-cols-[1fr_38%]"
            >
              <div className="px-5 py-10 sm:px-14 sm:py-12">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="label text-accent">{project.kicker}</span>
                  <span className="label border-2 border-edge px-2 py-1 text-muted">
                    {TRACK_LABEL[project.track]}
                  </span>
                </div>

                <h3 className="display mb-5 text-[clamp(34px,5vw,56px)]">
                  {project.title}
                </h3>

                <p className="mb-7 max-w-[62ch] text-body text-muted">
                  {project.summary}
                </p>

                <ul className="mb-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="label border-2 border-edge px-2.5 py-1.5 font-semibold text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-6">
                  <Link
                    href={`/work/${project.slug}`}
                    className="label text-accent transition-colors hover:text-accent-hover"
                  >
                    Read the case study →
                  </Link>
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label text-muted transition-colors hover:text-accent"
                    >
                      GitHub
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label text-muted transition-colors hover:text-accent"
                    >
                      Live app
                    </a>
                  )}
                </div>
              </div>

              {project.cardMetrics.length > 0 && (
                <div className="grid grid-cols-2 border-t-2 border-edge lg:border-l-2 lg:border-t-0">
                  {project.cardMetrics.map((metric, i) => (
                    <div
                      key={metric.label}
                      className={[
                        "px-5 py-7 sm:px-8",
                        i % 2 === 0 ? "border-r-2 border-edge" : "",
                        i < 2 ? "border-b-2 border-edge" : "",
                      ].join(" ")}
                    >
                      <div className="text-[clamp(26px,3.4vw,40px)] font-bold leading-none tracking-[-0.04em] text-accent">
                        {metric.value}
                      </div>
                      <div className="label mt-2.5 font-semibold tracking-[0.16em] text-muted">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </section>

        {/* ----------------------------- Experience ----------------------------- */}
        <section id="experience" className="border-b-2 border-divider">
          <SectionHead number="02" kicker="Experience" title="Where I've worked" />

          {EXPERIENCE.map((job) => (
            <div
              key={job.company}
              className="grid border-t-2 border-edge lg:grid-cols-[280px_1fr]"
            >
              <div className="px-5 pt-9 sm:px-14 lg:border-r-2 lg:border-edge lg:pb-9">
                <div className="label text-accent">{job.dates}</div>
                <div className="label mt-2 font-semibold text-muted">
                  {job.location}
                </div>
              </div>
              <div className="px-5 pb-10 pt-5 sm:px-14 lg:pt-9">
                <h3 className="text-2xl font-bold tracking-[-0.025em]">
                  {job.role}
                </h3>
                <div className="label mt-1.5 text-muted">{job.company}</div>
                <ul className="mt-6 space-y-3.5">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="grid max-w-[76ch] grid-cols-[18px_1fr] gap-3 text-base text-muted"
                    >
                      <span aria-hidden className="text-accent">
                        —
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* -------------------------------- Stack ------------------------------- */}
        <section id="stack" className="border-b-2 border-divider">
          <SectionHead number="03" kicker="Stack" title="What I work with" />

          <div className="grid md:grid-cols-2">
            {STACK.map((row, i) => (
              <div
                key={row.group}
                className={[
                  "border-t-2 border-edge px-5 py-8 sm:px-14",
                  i % 2 === 0 ? "md:border-r-2" : "",
                ].join(" ")}
              >
                <h3 className="label text-accent">{row.group}</h3>
                <p className="mt-3.5 text-base leading-[1.7] text-muted">
                  {row.items}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------------------- About ------------------------------- */}
        <section
          id="about"
          className="grid border-b-2 border-divider lg:grid-cols-2"
        >
          <div className="px-5 py-12 sm:px-14 lg:border-r-2 lg:border-edge">
            <div className="label mb-8 text-muted">04 — About</div>
            <h2 className="display mb-7 max-w-[16ch] text-[clamp(32px,4.6vw,52px)]">
              I care about the number after the demo.
            </h2>
            <div className="space-y-5 text-body text-muted">
              <p>
                A retrieval system that answers well in a notebook and drifts in
                production isn&apos;t finished. So I build the evaluation
                harness first: a 22-question dataset, LLM-as-judge scoring for
                faithfulness and citation accuracy, and quality gates in CI that
                refuse the deploy when the metric degrades.
              </p>
              <p>
                Six months of paid analyst work taught me the other half: the
                model is only as useful as the question it answers. Before that,
                a YOLOv8 terrain-identification paper and a traffic-sign
                detector at 92% accuracy. Now: Hyderabad, and open to AI and
                full stack engineering roles.
              </p>
            </div>
          </div>

          <div>
            <div className="border-b-2 border-edge px-5 py-10 sm:px-14 lg:border-t-0">
              <h3 className="label mb-6 text-accent">
                Research &amp; certifications
              </h3>
              <ul className="space-y-5">
                {CREDENTIALS.map((item) => (
                  <li
                    key={item.title}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
                  >
                    <div className="max-w-[44ch]">
                      <div className="text-base font-semibold">
                        {item.title}
                      </div>
                      <div className="label mt-1 font-medium text-muted">
                        {item.detail}
                      </div>
                    </div>
                    <span className="label text-muted">{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-5 py-10 sm:px-14">
              <h3 className="label mb-6 text-accent">Education</h3>
              <div className="text-base font-semibold">
                B.E. Computer Science — AI &amp; Machine Learning
              </div>
              <div className="label mt-1.5 font-medium text-muted">
                Chandigarh University, Mohali · CGPA 8.0/10 · 2021–2025
              </div>
              <p className="mt-4 max-w-[54ch] text-base text-muted">
                Final year project: real-time traffic sign detection with
                YOLOv8, 92% classification accuracy.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------- Contact ------------------------------ */}
        <section id="contact" className="border-b-2 border-divider">
          <div className="px-5 py-14 sm:px-14">
            <div className="label mb-8 text-muted">05 — Contact</div>
            <h2 className="display max-w-[18ch] text-[clamp(34px,6vw,72px)]">
              Hiring for AI or full stack? Let&apos;s talk.
            </h2>
          </div>

          <div className="grid border-t-2 border-edge md:grid-cols-2">
            <a
              href="/resume/ManikantaPudi_AI_Engineer_Resume.docx"
              download
              className="group flex items-baseline justify-between gap-4 border-b-2 border-edge px-5 py-8 transition-colors hover:bg-surface sm:px-14 md:border-b-0 md:border-r-2"
            >
              <span>
                <span className="label block text-muted">Résumé — download</span>
                <span className="mt-2 block text-2xl font-bold tracking-[-0.025em] group-hover:text-accent">
                  AI Engineer
                </span>
              </span>
              <span aria-hidden className="text-2xl text-accent">
                ↓
              </span>
            </a>
            <a
              href="/resume/ManikantaPudi_Python_Developer_Resume.docx"
              download
              className="group flex items-baseline justify-between gap-4 px-5 py-8 transition-colors hover:bg-surface sm:px-14"
            >
              <span>
                <span className="label block text-muted">Résumé — download</span>
                <span className="mt-2 block text-2xl font-bold tracking-[-0.025em] group-hover:text-accent">
                  Python Developer
                </span>
              </span>
              <span aria-hidden className="text-2xl text-accent">
                ↓
              </span>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
