import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnvilArchitecture } from "@/components/diagrams/anvil-architecture";
import { ScholarshipArchitecture } from "@/components/diagrams/scholarship-architecture";
import { SqlAgentArchitecture } from "@/components/diagrams/sql-agent-architecture";
import {
  VISIBLE_PROJECTS,
  getProject,
  getNextProject,
  TRACK_LABEL,
} from "@/lib/projects";

/** Case study diagrams, keyed by the `diagram` field on a project. */
const DIAGRAMS: Record<string, React.ReactNode> = {
  anvil: <AnvilArchitecture />,
  scholarship: <ScholarshipArchitecture />,
  sqlagent: <SqlAgentArchitecture />,
};

export function generateStaticParams() {
  return VISIBLE_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(slug);

  return (
    <>
      <SiteHeader />
      <main>
        {/* Case-study nav rail. */}
        <div className="flex items-center justify-between border-b-2 border-edge px-5 py-4 sm:px-14">
          <Link
            href="/#work"
            className="label text-muted transition-colors hover:text-accent"
          >
            ← All work
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="label text-muted transition-colors hover:text-accent"
          >
            Next project →
          </Link>
        </div>

        {/* Header. */}
        <section className="border-b-2 border-divider px-5 py-14 sm:px-14">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="label text-accent">{project.kicker}</span>
            <span className="label border-2 border-edge px-2 py-1 text-muted">
              {TRACK_LABEL[project.track]}
            </span>
          </div>
          <h1 className="display mb-7 text-[clamp(44px,9vw,96px)] tracking-[-0.045em]">
            {project.title}
          </h1>
          <p className="max-w-[64ch] text-lg leading-[1.55] text-muted">
            {project.lede}
          </p>
        </section>

        {/* Facts. */}
        <section className="grid border-b-2 border-divider sm:grid-cols-3">
          {[
            { label: "Role", value: project.role },
            { label: "Timeline", value: project.timeline },
            { label: "Status", value: project.status },
          ].map((fact, i) => (
            <div
              key={fact.label}
              className={[
                "px-5 py-8 sm:px-8",
                i < 2 ? "border-b-2 border-edge sm:border-b-0 sm:border-r-2" : "",
              ].join(" ")}
            >
              <div className="label text-muted">{fact.label}</div>
              <div className="mt-2.5 text-base font-semibold">{fact.value}</div>
            </div>
          ))}
        </section>

        {(project.repo || project.live) && (
          <section className="border-b-2 border-divider px-5 py-6 sm:px-14">
            <div className="flex flex-wrap gap-6">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-accent transition-colors hover:text-accent-hover"
                >
                  GitHub ↗
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-accent transition-colors hover:text-accent-hover"
                >
                  Live app ↗
                </a>
              )}
              {project.demoCredentials && (
                <span className="label text-muted">
                  Demo login:{" "}
                  {/* Never uppercase this. The .label class would render
                      demo1234 as DEMO1234 and the password is case sensitive. */}
                  <span className="font-mono normal-case tracking-normal">
                    {project.demoCredentials}
                  </span>
                </span>
              )}
            </div>
            {/* A visitor who hits a cold free tier and waits assumes it is
                broken. Saying so up front is cheaper than losing them. */}
            {project.liveNote && (
              <p className="mt-4 max-w-[64ch] text-sm text-muted">
                {project.liveNote}
              </p>
            )}
          </section>
        )}

        {project.metrics.length > 0 && (
          <section className="grid grid-cols-2 border-b-2 border-divider lg:grid-cols-4">
            {project.metrics.map((metric, i) => (
              <div
                key={metric.label}
                className={[
                  "px-5 py-8 sm:px-8 sm:py-9",
                  i % 2 === 0 ? "border-r-2 border-edge" : "",
                  i < 2 ? "border-b-2 border-edge lg:border-b-0" : "",
                  "lg:border-r-2 lg:last:border-r-0",
                ].join(" ")}
              >
                <div className="text-[clamp(30px,4.4vw,46px)] font-bold leading-none tracking-[-0.04em] text-accent">
                  {metric.value}
                </div>
                <div className="label mt-3 font-semibold tracking-[0.16em] text-muted">
                  {metric.label}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* The problem. */}
        <section className="grid border-b-2 border-divider lg:grid-cols-2">
          <div className="px-5 pt-12 sm:px-14 lg:border-r-2 lg:border-edge lg:pb-12">
            <div className="label text-muted">The problem</div>
          </div>
          <div className="space-y-5 px-5 pb-12 pt-6 text-body text-muted sm:px-14 lg:pt-12">
            <p className="max-w-[64ch]">{project.problem1}</p>
            <p className="max-w-[64ch]">{project.problem2}</p>
          </div>
        </section>

        {(project.stages.length > 0 || project.diagram) && (
          <section className="border-b-2 border-divider">
            <div className="px-5 py-12 sm:px-14">
              <div className="label text-muted">Architecture</div>
              {project.diagram && DIAGRAMS[project.diagram] && (
                <figure className="mt-8">
                  {DIAGRAMS[project.diagram]}
                </figure>
              )}
            </div>
            <div className="grid lg:grid-cols-3">
              {project.stages.map((stage, i) => (
                <div
                  key={stage.step}
                  className={[
                    "border-t-2 border-edge px-5 py-9 sm:px-14 lg:px-8",
                    i < 2 ? "lg:border-r-2" : "",
                  ].join(" ")}
                >
                  <div className="label text-accent">{stage.step}</div>
                  <h3 className="mt-3 text-xl font-bold tracking-[-0.025em]">
                    {stage.name}
                  </h3>
                  <p className="mt-3.5 text-base text-muted">{stage.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.evalRows.length > 0 && (
          <section className="border-b-2 border-divider">
            <div className="px-5 py-12 sm:px-14">
              <div className="label text-muted">Evaluation</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left">
                <thead>
                  <tr className="border-y-2 border-edge">
                    {["Measure", "Result", "Method"].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="label px-5 py-4 text-muted sm:px-14"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {project.evalRows.map((row) => (
                    <tr key={row.measure} className="border-b border-edge">
                      <td className="px-5 py-4 text-base sm:px-14">
                        {row.measure}
                      </td>
                      <td className="px-5 py-4 text-base font-bold text-accent sm:px-14">
                        {row.result}
                      </td>
                      <td className="px-5 py-4 text-base text-muted sm:px-14">
                        {row.method}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Stack + deployment. */}
        <section className="grid border-b-2 border-divider lg:grid-cols-2">
          <div className="px-5 py-12 sm:px-14 lg:border-r-2 lg:border-edge">
            <div className="label mb-6 text-muted">Stack</div>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="label border-2 border-edge px-2.5 py-1.5 font-semibold text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-5 py-12 sm:px-14">
            <div className="label mb-6 text-muted">Deployment</div>
            <p className="max-w-[58ch] text-base text-muted">{project.deploy}</p>
          </div>
        </section>

        {project.next.length > 0 && (
          <section className="border-b-2 border-divider px-5 py-12 sm:px-14">
            <div className="label mb-7 text-muted">What I&apos;d do next</div>
            <ul className="space-y-4">
              {project.next.map((item) => (
                <li
                  key={item}
                  className="grid max-w-[74ch] grid-cols-[18px_1fr] gap-3 text-base text-muted"
                >
                  <span aria-hidden className="text-accent">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Close. */}
        <section className="border-b-2 border-divider bg-accent px-5 py-14 text-on-accent sm:px-14">
          <h2 className="display max-w-[20ch] text-[clamp(30px,5vw,56px)]">
            Want the walkthrough? I&apos;ll show you the repo.
          </h2>
          <div className="mt-8 flex flex-wrap gap-6">
            <a
              href="mailto:pudimanikanta3@gmail.com"
              className="label border-2 border-current px-6 py-4 transition-opacity hover:opacity-75"
            >
              Email me
            </a>
            <Link
              href="/#work"
              className="label border-2 border-transparent px-6 py-4 transition-opacity hover:opacity-75"
            >
              Back to work
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
