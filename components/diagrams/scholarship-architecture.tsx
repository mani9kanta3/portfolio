/**
 * Scholarship Assistant retrieval pipeline.
 *
 * The point of the drawing is the order: the SQL filter runs before retrieval,
 * not after. Painted from the site's CSS variables so it follows the theme.
 */
export function ScholarshipArchitecture() {
  const box = {
    fill: "var(--surface)",
    stroke: "var(--divider)",
    strokeWidth: 2,
  };
  const soft = {
    fill: "var(--bg)",
    stroke: "var(--border)",
    strokeWidth: 2,
  };

  const arrow = (x1: number, x2: number, y: number) => (
    <>
      <path d={`M${x1},${y} H${x2 - 8}`} stroke="var(--divider)" strokeWidth={2} fill="none" />
      <path d={`M${x2 - 15},${y - 6} L${x2 - 7},${y} L${x2 - 15},${y + 6} Z`} fill="var(--divider)" />
    </>
  );

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 900 430"
        role="img"
        aria-label="Retrieval pipeline. A student profile and question go to a SQL filter over extracted eligibility columns, which narrows 44 schemes to only those the student qualifies for. Those scheme ids scope a ChromaDB vector search. A grounding check of regex plus an LLM judge then either returns an answer with citations or refuses. Without the SQL filter, 54 schemes reach the model and 81 percent are ineligible."
        className="w-full min-w-[760px]"
      >
        {/* ------------------------------------------------ 01 input */}
        <rect x={8} y={70} width={165} height={86} {...box} />
        <text x={22} y={94} fontSize={9} fontWeight={700} letterSpacing="1.4" fill="var(--accent)">
          01
        </text>
        <text x={22} y={116} fontSize={13} fontWeight={700} fill="var(--text)">
          Profile + question
        </text>
        <text x={22} y={136} fontSize={11} fill="var(--text-muted)">
          marks, income, category
        </text>

        {/* ------------------------------- 02 the SQL filter, the point */}
        <rect x={205} y={70} width={195} height={86} fill="var(--accent)" stroke="var(--accent)" strokeWidth={2} />
        <text x={221} y={94} fontSize={9} fontWeight={700} letterSpacing="1.4" fill="var(--on-accent)">
          02 — FIRST, NOT LAST
        </text>
        <text x={221} y={116} fontSize={13} fontWeight={700} fill="var(--on-accent)">
          SQL filter
        </text>
        <text x={221} y={136} fontSize={11} fill="var(--on-accent)">
          6 columns, NULL = no rule
        </text>

        {/* --------------------------------------------- 03 vector search */}
        <rect x={432} y={70} width={165} height={86} {...box} />
        <text x={446} y={94} fontSize={9} fontWeight={700} letterSpacing="1.4" fill="var(--accent)">
          03
        </text>
        <text x={446} y={116} fontSize={13} fontWeight={700} fill="var(--text)">
          ChromaDB
        </text>
        <text x={446} y={136} fontSize={11} fill="var(--text-muted)">
          scoped to eligible ids
        </text>

        {/* ------------------------------------------------ 04 grounding */}
        <rect x={629} y={70} width={165} height={86} {...box} />
        <text x={643} y={94} fontSize={9} fontWeight={700} letterSpacing="1.4" fill="var(--accent)">
          04
        </text>
        <text x={643} y={116} fontSize={13} fontWeight={700} fill="var(--text)">
          Grounding check
        </text>
        <text x={643} y={136} fontSize={11} fill="var(--text-muted)">
          regex, then LLM judge
        </text>

        {arrow(173, 205, 113)}
        {arrow(400, 432, 113)}
        {arrow(597, 629, 113)}

        {/* ------------------------------------------------ the two exits */}
        <path d="M711,156 V186 H560 V222" stroke="var(--divider)" strokeWidth={2} fill="none" />
        <path d="M554,215 L560,223 L566,215 Z" fill="var(--divider)" />
        <path d="M711,156 V186 H845 V222" stroke="var(--divider)" strokeWidth={2} fill="none" />
        <path d="M839,215 L845,223 L851,215 Z" fill="var(--divider)" />

        <rect x={468} y={224} width={184} height={66} {...soft} />
        <text x={482} y={250} fontSize={12} fontWeight={700} fill="var(--text)">
          Answer + citations
        </text>
        <text x={482} y={270} fontSize={11} fill="var(--text-muted)">
          every figure traceable
        </text>

        <rect x={753} y={224} width={139} height={66} {...soft} />
        <text x={767} y={250} fontSize={12} fontWeight={700} fill="var(--text)">
          Or a refusal
        </text>
        <text x={767} y={270} fontSize={11} fill="var(--text-muted)">
          says what is missing
        </text>

        {/* ------------------------------------ what the filter is worth */}
        <line x1={8} y1={330} x2={892} y2={330} stroke="var(--border)" strokeWidth={2} />
        <text x={8} y={354} fontSize={9} fontWeight={700} letterSpacing="1.4" fill="var(--text-muted)">
          MEASURED: WHAT HAPPENS WITHOUT STEP 02
        </text>
        <text x={8} y={382} fontSize={13} fill="var(--text)">
          Plain semantic retrieval put{" "}
          <tspan fontWeight={700} fill="var(--accent)">54 schemes</tspan> in front of the model.{" "}
          <tspan fontWeight={700} fill="var(--accent)">81%</tspan> were ones the student could not access,
        </text>
        <text x={8} y={404} fontSize={13} fill="var(--text)">
          and{" "}
          <tspan fontWeight={700} fill="var(--accent)">12 schemes they did qualify for</tspan> never reached the
          candidate list at all.
        </text>
      </svg>
    </div>
  );
}
