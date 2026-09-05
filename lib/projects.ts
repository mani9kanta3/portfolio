/**
 * Every project on the site lives here.
 *
 * Adding a project is a data edit — append an entry and it appears in the work
 * grid and gets its own /work/[slug] case study. No layout changes required.
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
  /** Shown beside the live link, e.g. a free-tier cold start warning. */
  liveNote?: string;
  /** Sign-in details for a public demo instance. */
  demoCredentials?: string;
  /** Key into the DIAGRAMS registry in app/work/[slug]/page.tsx. */
  diagram?: string;
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
    slug: "sql-analyst-agent",
    track: "ai",
    kicker: "Agentic AI · 2026",
    title: "SQL Analyst Agent",
    summary:
      "Ask a question in English, get the answer and the SQL that produced it. A LangGraph agent writes a query, runs it, reads the structured error, and repairs itself using a strategy chosen per SQLSTATE. It stops after three attempts and cannot do damage, because the credential it holds cannot write.",
    lede: "A natural language interface to a PostgreSQL database that checks its own work. The database is an objective oracle, so the agent can tell whether its query was wrong and why, which is what makes the repair loop something other than a retry with a prayer.",
    role: "Solo — agent, MCP server, evaluation",
    timeline: "2026",
    status: "Live on Vercel and Render",
    repo: "https://github.com/mani9kanta3/sql-agent",
    live: "https://sql-agent-sigma-three.vercel.app",
    liveNote:
      "No login needed, since the database is read-only. The API sleeps after 15 minutes on a free tier, so the first question can take about 50 seconds while it wakes. Live evaluation scores are published at /api/eval/latest and system status at /api/health, which checks read-only enforcement and schema drift rather than assuming them. It also runs as an MCP server over stdio for clients like Claude Desktop.",
    diagram: "sqlagent",
    metrics: [
      { value: "118", label: "Passing tests" },
      { value: "0", label: "Unsafe queries executed" },
      { value: "12", label: "SQLSTATE repair strategies" },
      { value: "3", label: "Attempt cap before it stops" },
    ],
    cardMetrics: [
      { value: "118", label: "Tests" },
      { value: "0", label: "Unsafe SQL reaching the database" },
      { value: "12", label: "Error types, each with a strategy" },
      { value: "3", label: "Credentials, least privilege" },
    ],
    tags: [
      "LangGraph",
      "MCP",
      "FastAPI",
      "PostgreSQL 17",
      "sqlglot",
      "Groq",
      "Langfuse",
    ],
    problem1:
      "Text-to-SQL demos are common and mostly the same: a question goes in, a query comes out, and nobody checks it. They fail silently, they have nothing to measure, and there is no reason for the model to get a second try.",
    problem2:
      "The database changes that. Syntax errors, missing columns, type mismatches and timeouts are all objectively detectable, so the agent can read the actual failure and rewrite. That is what justifies a loop. It also needs a stopping rule, because an agent that loops forever on an impossible question is worse than one that fails fast.",
    stages: [
      {
        step: "STAGE 01",
        name: "Select the schema",
        body: "Hand-written table descriptions are embedded with bge-small-en-v1.5 and searched semantically, so 3 to 5 relevant tables from a 15-table schema reach the prompt instead of all of them. The descriptions say what each table is not for, which stops irrelevant joins.",
      },
      {
        step: "STAGE 02",
        name: "Validate before executing",
        body: "sqlglot parses the query to an AST and rejects multiple statements, any write anywhere in the tree, unknown tables and deny-listed functions, then forces a LIMIT. Only then does it run, on a SELECT-only role inside a read-only transaction with a 5 second timeout that always rolls back.",
      },
      {
        step: "STAGE 03",
        name: "Route the error, or stop",
        body: "Each SQLSTATE maps to its own repair: 42703 widens schema retrieval to 9 tables, 42702 forces column aliasing, 57014 simplifies the query, and 42501 is never repaired. State carries the full history so the model cannot regenerate a query that already failed.",
      },
    ],
    evalRows: [
      {
        measure: "Execution accuracy, 30 answerable",
        result: "73.3% → 76.7%",
        method: "Result sets, not SQL text",
      },
      {
        measure: "Hard and ambiguous subset",
        result: "5/10 → 6/10",
        method: "Same 40-question set",
      },
      {
        measure: "Rescued by the repair loop",
        result: "1 of 1",
        method: "Two strategies in sequence",
      },
      {
        measure: "Unsafe SQL reaching the database",
        result: "0",
        method: "Parser plus read-only role",
      },
    ],
    stack: [
      "Python 3.12",
      "LangGraph 0.2",
      "MCP",
      "FastAPI",
      "PostgreSQL 17",
      "sqlglot",
      "Groq",
      "bge-small-en-v1.5",
      "Langfuse v4",
      "React 19",
      "Vite",
      "pytest",
    ],
    deploy:
      "React front end on Vercel, FastAPI in a Docker container on Render, PostgreSQL on Neon rather than Render because its free Postgres expires. The same four tools also run as an MCP server over stdio, so Claude Desktop or any MCP client can use them. Safety lives in the tool layer rather than the agent, which means it holds no matter what calls it. Three separate database credentials enforce least privilege: the agent's role can only SELECT, a second role can only INSERT into the query log and cannot read it back, and admin rights exist only in setup scripts. Every question is traced in Langfuse with cost computed from real token counts, and a scheduled check diffs the live schema against a snapshot to catch drift.",
    next: [
      "Treat the accuracy gain as unproven. It is one question on a 30-question set, which carries roughly an 8 point binomial spread, so the improvement is causally explained but not statistically significant. A larger set is the only fix.",
      "Get an evaluation set written by someone else. The current 40 questions were authored by the same person who built the schema, so they are not independent.",
      "Wire up Sentry and UptimeRobot, which are planned rather than done.",
      "Add conversation memory for follow-up questions, and support a second database dialect.",
    ],
  },
  {
    slug: "anvil-hardware",
    track: "full-stack",
    kicker: "Full stack · 2026",
    title: "Anvil Hardware",
    summary:
      "A point of sale and stock system for a hardware store. Django and DRF over PostgreSQL, React on the counter. Built around one rule: stock can never be oversold, even when two cashiers bill the last unit at the same instant.",
    lede: "A billing and inventory system for a single hardware outlet. Goods come in from suppliers, cashiers bill at the counter, and the owner sees what is selling and what is running out. The whole design is organised around one correctness problem that most systems this size get wrong.",
    role: "Solo — backend, frontend, deploy",
    timeline: "2026",
    status: "Live on Vercel and Render",
    repo: "https://github.com/mani9kanta3/hardware-store-full-stack",
    live: "https://anvil-hardware-store.vercel.app",
    liveNote:
      "Hosted on a free tier that sleeps after 15 minutes. The first request can take about 50 seconds to wake the API.",
    demoCredentials: "owner / demo1234 · cashier / demo1234",
    diagram: "anvil",
    metrics: [
      { value: "7", label: "Database tables" },
      { value: "3", label: "Django apps" },
      { value: "2", label: "Roles, enforced server side" },
      { value: "3", label: "Tests on the billing rule" },
    ],
    cardMetrics: [
      { value: "7", label: "Tables, PROTECT on FKs" },
      { value: "3", label: "Django apps" },
      { value: "2", label: "Roles, enforced server side" },
      { value: "400ms", label: "Search debounce at the counter" },
    ],
    tags: [
      "Django 5.1",
      "DRF",
      "PostgreSQL 17",
      "React 19",
      "Vite 8",
      "JWT",
      "pytest",
    ],
    problem1:
      "Two cashiers bill the last box of screws at the same moment. Under PostgreSQL's default READ COMMITTED isolation, both transactions read the same available quantity, both pass the stock check, and both write. Stock goes negative and the shop has sold something it does not have.",
    problem2:
      "It is invisible in testing, because you have to hit it at exactly the wrong moment. So the fix cannot be a careful check in application code. The database itself has to refuse to let two transactions touch the same row at once.",
    stages: [
      {
        step: "STAGE 01",
        name: "Lock in a fixed order",
        body: "Product ids are sorted, then locked with SELECT ... FOR UPDATE before any availability check. Sorting gives every transaction the same global lock order, so two bills touching the same pair of products cannot deadlock waiting on each other.",
      },
      {
        step: "STAGE 02",
        name: "Check, then decrement",
        body: "Each line is validated against the locked row and stock is decremented as it passes. A second transaction waits at the lock rather than reading stale stock, then re-reads the committed state and correctly rejects the oversale.",
      },
      {
        step: "STAGE 03",
        name: "Commit, or discard all of it",
        body: "The whole bill is one atomic block. If any line is short, the error rolls back every write above it, including lines that already succeeded. The cashier gets a 400 naming the product and the quantity actually available.",
      },
    ],
    evalRows: [
      {
        measure: "Oversell under concurrent bills",
        result: "Prevented",
        method: "SELECT … FOR UPDATE",
      },
      {
        measure: "Deadlock on shared products",
        result: "Avoided",
        method: "Sorted lock ordering",
      },
      {
        measure: "Partial bill failure",
        result: "Full rollback",
        method: "pytest, transaction=True",
      },
      {
        measure: "Goods receipt race",
        result: "Avoided",
        method: "F() expression, atomic",
      },
    ],
    stack: [
      "Python 3.12",
      "Django 5.1",
      "Django REST Framework",
      "PostgreSQL 17",
      "SimpleJWT",
      "React 19",
      "Vite 8",
      "Bootstrap 5.3",
      "pytest",
      "Vercel",
      "Render",
    ],
    deploy:
      "React front end on Vercel, Django API and PostgreSQL 17 on Render. Business rules live in a service module rather than the view, so the transaction boundary and the locking belong to the operation itself and can be tested or called outside an HTTP request. Tests run against PostgreSQL with real transaction boundaries, because SQLite accepts select_for_update and silently ignores it — the most important behaviour in the system would pass in development and fail in production.",
    next: [
      "Add sale reversal. Bills currently cannot be voided or amended without separate compensating transaction logic.",
      "Model tax properly: GST rates, HSN codes and tax inclusive pricing are all out of scope today.",
      "Add a stock adjustment path, so damage, theft and stocktake corrections have somewhere to go.",
      "Keep an audit trail on the catalogue, since price and reorder level changes currently overwrite in place.",
    ],
  },
  {
    slug: "scholarship-assistant",
    track: "ai",
    kicker: "Hybrid RAG · Aug 2026",
    title: "Scholarship Assistant",
    summary:
      "Answers eligibility questions over 44 Indian government scholarship schemes. Eligibility is numbers, and embeddings cannot compare numbers, so the rules are filtered in SQL before retrieval runs at all. Every answer is either grounded in a source or refused.",
    lede: "A question answering system for India's scholarship landscape. It tells a student what they qualify for and by when, and it is built around the fact that ordinary RAG gets this domain wrong in a way that is easy to miss and expensive for the student.",
    role: "Solo — retrieval, evaluation, deploy",
    timeline: "August 2026",
    status: "Live on Vercel and Render",
    repo: "https://github.com/mani9kanta3/scholarship-rag-project",
    live: "https://scholarship-rag-project.vercel.app",
    liveNote:
      "The API sleeps on a free tier after 15 minutes, so the first request can take about 50 seconds. Live evaluation scores are published at /api/eval/latest, and query log trends at /api/health.",
    diagram: "scholarship",
    metrics: [
      { value: "0.92", label: "Threshold accuracy, from 0.83" },
      { value: "1.00", label: "Groundedness, from 0.93" },
      { value: "44", label: "Schemes in the corpus" },
      { value: "0.85", label: "Judge agreement with hand labels" },
    ],
    cardMetrics: [
      { value: "0.92", label: "Threshold accuracy, up from 0.83" },
      { value: "0", label: "Invented figures, down from 7.5%" },
      { value: "81%", label: "Ineligible schemes naive RAG surfaced" },
      { value: "48", label: "Tests" },
    ],
    tags: [
      "FastAPI",
      "PostgreSQL",
      "ChromaDB",
      "bge-small-en-v1.5",
      "Groq",
      "RAGAS",
      "React 19",
    ],
    problem1:
      "Eligibility is numbers. \"Minimum 80% marks\" and \"minimum 75% marks\" produce nearly identical embeddings, so semantic search returns the wrong threshold and states it as fact. A student then wastes weeks on an application they were never eligible for, or misses a deadline that was never theirs to meet.",
    problem2:
      "Measured on the corpus, plain semantic retrieval put 54 schemes in front of the model, and 44 of them, 81%, were ones the student could not access. Twelve schemes they actually qualified for never made the candidate list at all. Filtering after retrieval cannot fix that, because the right scheme was never retrieved.",
    stages: [
      {
        step: "STAGE 01",
        name: "Filter in SQL, first",
        body: "Eligibility rules are extracted into typed columns at ingestion. Six nullable columns hold marks, income, age, course level, category and state, where NULL means no constraint. Comparisons happen in SQL before any retrieval, which is a relational query Chroma's metadata filter cannot express.",
      },
      {
        step: "STAGE 02",
        name: "Search only what survives",
        body: "The surviving scheme ids are passed to ChromaDB as a metadata filter, so vector search with bge-small-en-v1.5 runs only inside schemes the student actually qualifies for. The model never sees the other 81%.",
      },
      {
        step: "STAGE 03",
        name: "Ground it, or refuse",
        body: "Two independent checks. A regex verifies that every numeric claim in the answer appears in the retrieved text, then an LLM judge reviews the claims. If either fails, the system says what it does not know instead of guessing.",
      },
    ],
    evalRows: [
      {
        measure: "Overall correctness",
        result: "0.80 → 0.88",
        method: "40 hand-written questions",
      },
      {
        measure: "Threshold questions",
        result: "0.83 → 0.92",
        method: "12 profiles sitting at cutoffs",
      },
      {
        measure: "Answers with invented figures",
        result: "0.075 → 0.00",
        method: "Regex, then LLM judge",
      },
      {
        measure: "Correct refusals",
        result: "0.63 → 0.88",
        method: "Unanswerable trap questions",
      },
    ],
    stack: [
      "Python 3.12",
      "FastAPI",
      "PostgreSQL",
      "ChromaDB",
      "bge-small-en-v1.5",
      "ONNX",
      "Groq",
      "Gemini",
      "RAGAS",
      "React 19",
      "Vite",
      "Neon",
      "Vercel",
      "Render",
    ],
    deploy:
      "React front end on Vercel, FastAPI on Render's 512 MB free tier, PostgreSQL on Neon. Postgres holds the durable copy of every embedding and Chroma is the index built from it, so a restart on ephemeral disk loses nothing. A cross-encoder reranker was built and then disabled in production: two evaluation runs scored 0.88 and 0.93, a five point swing that is two questions of run-to-run variance on a 40 question set, so the improvement could not be told apart from noise at that sample size. Every query is logged with its retrieval scores, abstention reason and latency, and the trends are public at /api/health.",
    next: [
      "Move to a multi-level criteria schema, since a single marks threshold per scheme cannot represent cutoffs that vary by course level.",
      "Build a held-out trap set. Abstention precision is currently 0.40, so the grounding rule blocks more answerable questions than it should.",
      "Redo the RAGAS run with a profile-aware judge. Standard faithfulness scores this system unfairly, because it legitimately grounds answers in the student profile and the SQL verdict, neither of which appear in the retrieved text.",
      "Re-extract a disability field, which two schemes require and the current schema has no column for.",
    ],
  },
  {
    slug: "ecopackai",
    track: "ai",
    kicker: "ML + Backend · Feb 2026",
    title: "EcoPackAI",
    summary:
      "Ranks 25 packaging materials across 13 product categories by suitability, cost and carbon impact. A composite eco-score makes the ranking readable; eleven REST endpoints and a normalised PostgreSQL schema make it usable.",
    lede: "A recommendation platform that ranks 25 packaging materials across 13 product categories by suitability, cost and carbon impact, and explains the ranking instead of just emitting a score.",
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
      "Packaging choices trade three things against each other: fitness for the product, unit cost, and carbon footprint. Teams were making the call on intuition.",
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
      "The patient-facing side of a hospital system: browse doctors, book appointments, register, and a protected dashboard. Refactored out of a duplicated HTML/Bootstrap site into a React component architecture with custom hooks for fetching and debounced search. Backend is next.",
    lede: "The patient-facing half of a hospital management system: browsing doctors, booking appointments, registering, and a protected dashboard behind a login. It began as a plain HTML and Bootstrap site and was rebuilt in React to stop copying the same navbar and footer into every page.",
    role: "Solo: front end, application architecture",
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
        body: "Persistent layout, the Navbar and Footer, lifted into shared components, and each page reduced to its own concern: doctor listing, single profile, registration, appointment, dashboard.",
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
      "Continuously deployed to Vercel from the main branch, with a preview deployment on every push. Doctor data is currently served from a local JSON file. There is no backend yet, and the login is a localStorage flag rather than real authentication.",
    next: [
      "Build the backend with Flask or Django over PostgreSQL, so doctors, patients and appointments come from a database instead of a local JSON file.",
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
