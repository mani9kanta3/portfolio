/**
 * SQL Analyst Agent graph.
 *
 * The point of the drawing is the cycle: execution failures route back into
 * generation by error type, with a hard attempt cap so the loop terminates.
 * Painted from the site's CSS variables so it follows the theme.
 */
export function SqlAgentArchitecture() {
  const box = { fill: "var(--surface)", stroke: "var(--divider)", strokeWidth: 2 };
  const soft = { fill: "var(--bg)", stroke: "var(--border)", strokeWidth: 2 };

  const down = (x: number, y1: number, y2: number) => (
    <>
      <path d={`M${x},${y1} V${y2 - 8}`} stroke="var(--divider)" strokeWidth={2} fill="none" />
      <path d={`M${x - 6},${y2 - 15} L${x},${y2 - 7} L${x + 6},${y2 - 15} Z`} fill="var(--divider)" />
    </>
  );

  const NODES = [
    { y: 40, n: "01", t: "select_schema", s: "3 to 5 tables of 15, chosen semantically" },
    { y: 108, n: "02", t: "generate_sql", s: "re-entry point for every repair" },
    { y: 176, n: "03", t: "validate_static", s: "sqlglot AST: SELECT only, LIMIT forced" },
    { y: 244, n: "04", t: "execute", s: "read-only role, 5s timeout, always rolls back" },
    { y: 312, n: "05", t: "inspect_result", s: "ok, error, or empty" },
  ];

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 900 470"
        role="img"
        aria-label="Agent graph. Schema selection feeds SQL generation, which is validated by a parser, executed against a read-only role, then inspected. Errors route back into generation with a repair strategy chosen per SQLSTATE, capped at three attempts, after which the agent gives up honestly. Success produces an answer with the SQL used."
        className="w-full min-w-[760px]"
      >
        {NODES.map((nd, i) => (
          <g key={nd.n}>
            <rect x={150} y={nd.y} width={420} height={52} {...(i === 1 ? { fill: "var(--accent)", stroke: "var(--accent)", strokeWidth: 2 } : box)} />
            <text x={166} y={nd.y + 22} fontSize={9} fontWeight={700} letterSpacing="1.4"
              fill={i === 1 ? "var(--on-accent)" : "var(--accent)"}>{nd.n}</text>
            <text x={196} y={nd.y + 23} fontSize={13} fontWeight={700} fontFamily="ui-monospace, monospace"
              fill={i === 1 ? "var(--on-accent)" : "var(--text)"}>{nd.t}</text>
            <text x={166} y={nd.y + 42} fontSize={11}
              fill={i === 1 ? "var(--on-accent)" : "var(--text-muted)"}>{nd.s}</text>
          </g>
        ))}

        {NODES.slice(0, -1).map((nd, i) => (
          <g key={"a" + i}>{down(360, nd.y + 52, NODES[i + 1].y)}</g>
        ))}

        {/* failure path back into generation, the reason the loop exists */}
        <path d="M150,338 H70 V134 H142" stroke="var(--accent)" strokeWidth={2} fill="none" />
        <path d="M135,128 L143,134 L135,140 Z" fill="var(--accent)" />
        <text x={62} y={250} fontSize={11} fontWeight={700} fill="var(--accent)" textAnchor="middle"
          transform="rotate(-90 62 250)">repair, by error type</text>

        {/* attempt cap */}
        <path d="M570,338 H660" stroke="var(--divider)" strokeWidth={2} fill="none" />
        <path d="M653,332 L661,338 L653,344 Z" fill="var(--divider)" />
        <rect x={664} y={312} width={226} height={52} {...soft} />
        <text x={678} y={334} fontSize={12} fontWeight={700} fill="var(--text)">attempts &lt; 3 ?</text>
        <text x={678} y={353} fontSize={11} fill="var(--text-muted)">42501 is never repaired</text>

        {/* terminal states */}
        <path d="M777,364 V400" stroke="var(--divider)" strokeWidth={2} fill="none" />
        <path d="M771,393 L777,401 L783,393 Z" fill="var(--divider)" />
        <rect x={664} y={402} width={226} height={50} {...soft} />
        <text x={678} y={423} fontSize={12} fontWeight={700} fill="var(--text)">give_up, honestly</text>
        <text x={678} y={441} fontSize={11} fill="var(--text-muted)">returns what it tried</text>

        <path d="M360,364 V400" stroke="var(--divider)" strokeWidth={2} fill="none" />
        <path d="M354,393 L360,401 L366,393 Z" fill="var(--divider)" />
        <rect x={150} y={402} width={420} height={50} {...soft} />
        <text x={166} y={423} fontSize={12} fontWeight={700} fill="var(--text)">answer, with the SQL it used</text>
        <text x={166} y={441} fontSize={11} fill="var(--text-muted)">empty results get one diagnostic, not a blind repair</text>

        {/* safety rail */}
        <line x1={610} y1={40} x2={610} y2={296} stroke="var(--border)" strokeWidth={2} />
        <text x={628} y={62} fontSize={9} fontWeight={700} letterSpacing="1.4" fill="var(--accent)">SAFETY, IN THE TOOL LAYER</text>
        <text x={628} y={86} fontSize={11} fill="var(--text-muted)">1. sql_agent_ro can only SELECT</text>
        <text x={628} y={106} fontSize={11} fill="var(--text-muted)">2. read-only txn, 5s timeout, ROLLBACK</text>
        <text x={628} y={126} fontSize={11} fill="var(--text-muted)">3. parser rejects writes and multi-statement</text>
        <text x={628} y={154} fontSize={11} fill="var(--text-muted)">Holds for the MCP client too, not just</text>
        <text x={628} y={172} fontSize={11} fill="var(--text-muted)">the agent, because it lives in the tools.</text>
        <text x={628} y={200} fontSize={11} fontWeight={700} fill="var(--accent)">0 unsafe queries reached the database</text>
        <text x={628} y={218} fontSize={11} fill="var(--text-muted)">across the 40-question evaluation.</text>
      </svg>
    </div>
  );
}
