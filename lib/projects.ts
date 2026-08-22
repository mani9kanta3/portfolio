/**
 * Every project on the site lives here.
 *
 * Adding a project is a data edit — append an entry and it appears in the work
 * grid and gets its own /work/[slug] case study. No layout changes required.
 * Case-study copy for PolicyQA and EcoPackAI is carried over verbatim from the
 * Claude Design artboards.
 */

export type Track = "ai" | "front-end" | "full-stack";

export const TRACK_LABEL: Record<Track, string> = {
  ai: "AI / ML",
  "front-end": "Front end",
  "full-stack": "Full stack",
};

export type Metric = { value: string; label: string };
export type Stage = { step: string; name: string; body: string };
export type EvalRow = { measure: string; result: string; method: string };

export type Project = {
  slug: string;
  track: Track;
  /** Hidden from the site while true — used for work that isn't ready to show. */
  draft?: boolean;
  kicker: string;
  title: string;
  /** One-paragraph summary used on the home page work grid. */
  summary: string;
  /** Longer opening line for the case study page. */
  lede: string;
  role: string;
  timeline: string;
  status: string;
  repo?: string;
  live?: string;
  metrics: Metric[];
  /** Compact metrics shown on the home page card. */
  cardMetrics: Metric[];
  tags: string[];
  problem1: string;
  problem2: string;
  stages: Stage[];
  evalRows: EvalRow[];
  stack: string[];
  deploy: string;
  next: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "policyqa",
    track: "ai",
    kicker: "Production RAG · Jan 2026",
    title: "PolicyQA",
    summary:
      "A 3-stage retrieval pipeline over nine Indian labour-law documents. BM25 keyword search fused with vector semantics by Reciprocal Rank Fusion, then cross-encoder reranking down to five passages. Quality gates block deploys when metrics slip.",
    lede: "A question-answering service over nine Indian labour-law documents, built so that every answer can be traced back to the clause it came from — and so the pipeline cannot ship if its numbers slip.",
    role: "Solo — retrieval, eval, deploy",
    timeline: "January 2026",
    status: "Live on Cloud Run",
    metrics: [
      { value: "0.955", label: "Retrieval hit rate" },
      { value: "0.941", label: "Answer faithfulness" },
      { value: "0.964", label: "Citation accuracy" },
      { value: "9", label: "Policy documents" },
    ],
    cardMetrics: [
      { value: "0.955", label: "Hit rate" },
      { value: "0.964", label: "Citation accuracy" },
      { value: "22", label: "Eval questions, LLM-as-judge" },
      { value: "3", label: "Retrieval stages" },
    ],
    tags: [
      "LangChain",
      "Gemini",
      "ChromaDB",
      "FastAPI",
      "Docker",
      "Cloud Run",
      "Langfuse",
    ],
    problem1:
      "Labour-law questions are keyword-sensitive — a section number matters as much as the semantics around it. Pure vector search misses exact references; pure keyword search misses paraphrase.",
    problem2:
      "So the answer had to be hybrid, and it had to be verifiable: a legal answer without a citation is worse than no answer at all.",
    stages: [
      {
        step: "STAGE 01",
        name: "Hybrid retrieval",
        body: "BM25 keyword search runs alongside vector semantic search over ChromaDB, and the two candidate lists are merged by Reciprocal Rank Fusion.",
      },
      {
        step: "STAGE 02",
        name: "Cross-encoder rerank",
        body: "ms-marco-MiniLM rescores the fused candidates pairwise against the query, cutting to the top five passages actually worth sending to the model.",
      },
      {
        step: "STAGE 03",
        name: "Grounded generation",
        body: "Google Gemini answers from those five passages only, with citations back to source clauses; Langfuse traces every call for inspection.",
      },
    ],
    evalRows: [
      { measure: "Retrieval hit rate", result: "0.955", method: "22-question set" },
      { measure: "Answer faithfulness", result: "0.941", method: "LLM-as-judge" },
      { measure: "Citation accuracy", result: "0.964", method: "LLM-as-judge" },
      { measure: "Deploy gate", result: "Pass/fail", method: "CI quality gate" },
    ],
    stack: [
      "Python",
      "LangChain",
      "Google Gemini",
      "ChromaDB",
      "BM25",
      "Cross-encoder",
      "FastAPI",
      "Streamlit",
      "Docker",
      "Cloud Run",
      "Langfuse",
    ],
    deploy:
      "Containerised with Docker and deployed to Google Cloud Run — FastAPI backend, Streamlit front end, automated evaluation as a quality gate that blocks the deploy on metric degradation.",
    next: [
      "Grow the eval set past 22 questions and stratify it by document, so per-source regressions surface individually.",
      "Swap in a fine-tuned reranker and A/B it against ms-marco on the same harness.",
      "Add answer-level abstention when top-passage scores fall below threshold, rather than answering weakly.",
    ],
  },
  {
    slug: "ecopackai",
    track: "ai",
    kicker: "ML + Backend · Feb 2026",
    title: "EcoPackAI",
    summary:
      "Ranks 25 packaging materials across 13 product categories by suitability, cost and carbon impact. A composite eco-score makes the ranking readable; eleven REST endpoints and a normalised PostgreSQL schema make it usable.",
    lede: "A recommendation platform that ranks 25 packaging materials across 13 product categories by suitability, cost and carbon impact — and explains the ranking instead of just emitting a score.",
    role: "ML + backend, Infosys Springboard",
    timeline: "December 2025 — February 2026",
    status: "Live on Render",
    metrics: [
      { value: "0.97+", label: "R², suitability" },
      { value: "0.98+", label: "R², CO₂ impact" },
      { value: "2,275", label: "Training samples" },
      { value: "11", label: "REST endpoints" },
    ],
    cardMetrics: [
      { value: "0.98+", label: "R², CO₂ impact" },
      { value: "2,275", label: "Training samples" },
      { value: "15", label: "Engineered features" },
      { value: "11", label: "REST endpoints" },
    ],
    tags: [
      "Flask",
      "XGBoost",
      "scikit-learn",
      "PostgreSQL",
      "SQLAlchemy",
      "Render",
    ],
    problem1:
      "Packaging choices trade three things against each other — fitness for the product, unit cost, and carbon footprint — and teams were making the call on intuition.",
    problem2:
      "A single opaque score would not have been trusted, so the ranking needed an interpretable composite: biodegradability, recyclability and carbon impact folded into one eco-score you can decompose.",
    stages: [
      {
        step: "STAGE 01",
        name: "Feature engineering",
        body: "15 engineered features over 2,275 samples, including a composite eco-score combining biodegradability, recyclability and carbon impact.",
      },
      {
        step: "STAGE 02",
        name: "Model training",
        body: "Random Forest and XGBoost trained and compared for suitability and CO₂ regression, serialised with joblib for serving.",
      },
      {
        step: "STAGE 03",
        name: "Serving layer",
        body: "Flask REST API with 11 endpoints over a normalised PostgreSQL schema via SQLAlchemy ORM, rate limited at 60 req/min/IP.",
      },
    ],
    evalRows: [
      { measure: "Suitability prediction", result: "0.97+ R²", method: "RF / XGBoost" },
      { measure: "CO₂ impact estimation", result: "0.98+ R²", method: "XGBoost" },
      { measure: "Materials covered", result: "25", method: "13 categories" },
      { measure: "Rate limit", result: "60/min", method: "Per-IP middleware" },
    ],
    stack: [
      "Python",
      "Flask",
      "scikit-learn",
      "XGBoost",
      "Pandas",
      "NumPy",
      "PostgreSQL",
      "SQLAlchemy ORM",
      "REST API",
      "Chart.js",
      "Render",
    ],
    deploy:
      "Deployed on Render with a managed PostgreSQL instance, structured error handling and input validation at the API boundary, plus a Chart.js analytics dashboard over the stored predictions.",
    next: [
      "Add SHAP attributions per recommendation so the eco-score decomposition is visible in the response.",
      "Move model serving behind a versioned registry rather than joblib files on disk.",
      "Backfill real supplier cost data to replace the synthetic cost distribution.",
    ],
  },
  {
    slug: "medicare-hms",
    // Front end only today. Flip to "full-stack" when the Flask/Django backend
    // lands — the badge should not claim a backend that does not exist yet.
    track: "front-end",
    kicker: "Front end · In progress",
    title: "MediCare HMS",
    summary:
      "The patient-facing side of a hospital system — browse doctors, book appointments, register, and a protected dashboard. Refactored out of a duplicated HTML/Bootstrap site into a React component architecture with custom hooks for fetching and debounced search. Backend is next.",
    lede: "The patient-facing half of a hospital management system: browsing doctors, booking appointments, registering, and a protected dashboard behind a login. It began as a plain HTML and Bootstrap site and was rebuilt in React to stop copying the same navbar and footer into every page.",
    role: "Solo — front end, application architecture",
    timeline: "In progress, 2026",
    status: "Front end live · backend in progress",
    repo: "https://github.com/Mani9kanta3/hospital-management-system",
    live: "https://hospital-management-system-ashy-beta.vercel.app",
    metrics: [
      { value: "10", label: "Routes" },
      { value: "5", label: "Behind auth" },
      { value: "8", label: "Breakpoints tested" },
      { value: "2", label: "Custom hooks" },
    ],
    cardMetrics: [
      { value: "10", label: "Routes, 5 protected" },
      { value: "8", label: "Breakpoints, no h-scroll" },
      { value: "2", label: "Custom hooks" },
      { value: "500ms", label: "Search debounce" },
    ],
    tags: ["React 19", "Vite 8", "React Router 7", "Bootstrap 5.3", "Axios", "Vercel"],
    problem1:
      "The original build was plain HTML and Bootstrap, which meant the navbar, footer and card markup were copy-pasted across every page. Changing a nav link was a find-and-replace across the whole site, and the pages had already started to drift apart.",
    problem2:
      "So the rebuild was about structure rather than features: shared layout as components, data fetching behind one reusable hook, and routing that moves between views without a page reload.",
    stages: [
      {
        step: "STAGE 01",
        name: "Component refactor",
        body: "Persistent layout — Navbar and Footer — lifted into shared components, and each page reduced to its own concern: doctor listing, single profile, registration, appointment, dashboard.",
      },
      {
        step: "STAGE 02",
        name: "Data & interaction",
        body: "A useFetch hook centralises loading and error state; useDebounce holds search input for 500ms before filtering. useMemo keeps the filtered list off the critical path, and pagination renders four doctors at a time instead of the whole set.",
      },
      {
        step: "STAGE 03",
        name: "Routing & access",
        body: "React Router 7 drives ten client-side routes. A ProtectedRoute wrapper gates five of them and redirects unauthenticated visitors to login.",
      },
    ],
    evalRows: [
      { measure: "Responsive range", result: "8 widths", method: "360–1400px, no h-scroll" },
      { measure: "Search debounce", result: "500ms", method: "useDebounce hook" },
      { measure: "Routes gated", result: "5 of 10", method: "ProtectedRoute wrapper" },
      { measure: "List page size", result: "4 per page", method: "Pagination" },
    ],
    stack: [
      "React 19",
      "Vite 8",
      "React Router 7",
      "Bootstrap 5.3",
      "Axios",
      "Font Awesome",
      "ESLint",
      "Vercel",
    ],
    deploy:
      "Continuously deployed to Vercel from the main branch, with a preview deployment on every push. Doctor data is currently served from a local JSON file — there is no backend yet, and the login is a localStorage flag rather than real authentication.",
    next: [
      "Build the backend — Flask or Django over PostgreSQL — so doctors, patients and appointments come from a database instead of a local JSON file.",
      "Replace the localStorage session with token-based authentication, so protected routes are actually protected rather than gated in the browser.",
      "Persist form submissions: registration and appointment booking currently validate and then discard.",
      "Add an admin panel for managing doctors, and email or SMS confirmation on booking.",
    ],
  },
];

export const VISIBLE_PROJECTS = PROJECTS.filter((p) => !p.draft);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Wraps around, so the last project's "next" is the first. */
export function getNextProject(slug: string): Project {
  const i = VISIBLE_PROJECTS.findIndex((p) => p.slug === slug);
  return VISIBLE_PROJECTS[(i + 1) % VISIBLE_PROJECTS.length];
}
