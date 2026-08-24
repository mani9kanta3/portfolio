/**
 * Anvil Hardware system architecture.
 *
 * Drawn with the site's own CSS variables rather than hard-coded hex, so it
 * repaints with the light/dark toggle instead of sitting on a white slab.
 * The SVG keeps a min-width and scrolls inside its container on small screens,
 * because shrinking it to fit a phone makes the labels unreadable.
 */
export function AnvilArchitecture() {
  const box = {
    fill: "var(--surface)",
    stroke: "var(--divider)",
    strokeWidth: 2,
  };
  const chip = {
    fill: "var(--bg)",
    stroke: "var(--border)",
    strokeWidth: 2,
  };

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 900 400"
        role="img"
        aria-label="Three tier architecture. A React client on Vercel talks JSON with JWT to a Django and DRF API on Render, which owns every business rule across three apps, and reads and writes PostgreSQL. Below, the billing transaction runs in four steps: sort product ids, lock rows, check and decrement, then commit or roll back."
        className="w-full min-w-[720px]"
      >
        {/* ---------------------------------------------------- client */}
        <rect x={10} y={85} width={230} height={140} {...box} />
        <text x={26} y={110} fontSize={9} fontWeight={700} letterSpacing="1.4" fill="var(--accent)">
          CLIENT
        </text>
        <text x={26} y={136} fontSize={14} fontWeight={700} fill="var(--text)">
          React 19 + Vite 8
        </text>
        <text x={26} y={158} fontSize={11} fill="var(--text-muted)">
          Bootstrap, JWT in an interceptor
        </text>
        <text x={26} y={178} fontSize={11} fill="var(--text-muted)">
          Owns UI state only
        </text>
        <text x={26} y={206} fontSize={11} fontFamily="ui-monospace, monospace" fill="var(--text-muted)">
          vercel.app
        </text>

        {/* ------------------------------------------------------- api */}
        <rect x={335} y={40} width={230} height={230} {...box} />
        <text x={351} y={65} fontSize={9} fontWeight={700} letterSpacing="1.4" fill="var(--accent)">
          API
        </text>
        <text x={351} y={90} fontSize={14} fontWeight={700} fill="var(--text)">
          Django 5.1 + DRF
        </text>

        <rect x={351} y={104} width={198} height={32} {...chip} />
        <text x={363} y={125} fontSize={11} fill="var(--text-muted)">
          accounts — roles, JWT
        </text>

        <rect x={351} y={144} width={198} height={32} {...chip} />
        <text x={363} y={165} fontSize={11} fill="var(--text-muted)">
          inventory — catalogue, receipts
        </text>

        {/* The billing app is where the whole project's difficulty lives. */}
        <rect x={351} y={184} width={198} height={32} fill="var(--accent)" stroke="var(--accent)" strokeWidth={2} />
        <text x={363} y={205} fontSize={11} fontWeight={700} fill="var(--on-accent)">
          billing — the transaction
        </text>

        <text x={351} y={238} fontSize={11} fill="var(--text-muted)">
          Every rule is enforced here
        </text>
        <text x={351} y={256} fontSize={11} fontFamily="ui-monospace, monospace" fill="var(--text-muted)">
          onrender.com
        </text>

        {/* ------------------------------------------------------ data */}
        <rect x={660} y={85} width={230} height={140} {...box} />
        <text x={676} y={110} fontSize={9} fontWeight={700} letterSpacing="1.4" fill="var(--accent)">
          DATA
        </text>
        <text x={676} y={136} fontSize={14} fontWeight={700} fill="var(--text)">
          PostgreSQL 17
        </text>
        <text x={676} y={158} fontSize={11} fill="var(--text-muted)">
          7 tables, PROTECT on FKs
        </text>
        <text x={676} y={178} fontSize={11} fontWeight={700} fill="var(--accent)">
          Row locks on billing
        </text>
        <text x={676} y={206} fontSize={11} fontFamily="ui-monospace, monospace" fill="var(--text-muted)">
          render.com
        </text>

        {/* --------------------------------------------------- arrows */}
        <path d="M240,128 H320" stroke="var(--divider)" strokeWidth={2} fill="none" />
        <path d="M313,122 L321,128 L313,134 Z" fill="var(--divider)" />
        <text x={288} y={118} fontSize={11} textAnchor="middle" fill="var(--text-muted)">
          JSON + JWT
        </text>

        <path d="M335,186 H255" stroke="var(--divider)" strokeWidth={2} fill="none" />
        <path d="M262,180 L254,186 L262,192 Z" fill="var(--divider)" />
        <text x={288} y={206} fontSize={11} textAnchor="middle" fill="var(--text-muted)">
          rows, or a 400
        </text>

        <path d="M565,128 H645" stroke="var(--divider)" strokeWidth={2} fill="none" />
        <path d="M638,122 L646,128 L638,134 Z" fill="var(--divider)" />
        <text x={606} y={118} fontSize={11} textAnchor="middle" fill="var(--text-muted)">
          Django ORM
        </text>

        <path d="M660,186 H580" stroke="var(--divider)" strokeWidth={2} fill="none" />
        <path d="M587,180 L579,186 L587,192 Z" fill="var(--divider)" />
        <text x={606} y={206} fontSize={11} textAnchor="middle" fill="var(--text-muted)">
          rows
        </text>

        {/* ------------------------------------- the billing transaction */}
        <line x1={10} y1={296} x2={890} y2={296} stroke="var(--border)" strokeWidth={2} />
        <text x={10} y={320} fontSize={9} fontWeight={700} letterSpacing="1.4" fill="var(--text-muted)">
          ONE BILL, ONE ATOMIC TRANSACTION
        </text>

        {[
          { x: 10, w: 195, n: "01", t: "Sort product ids", s: "one global lock order" },
          { x: 245, w: 195, n: "02", t: "Lock the rows", s: "SELECT … FOR UPDATE" },
          { x: 480, w: 195, n: "03", t: "Check, decrement", s: "line by line" },
          { x: 715, w: 175, n: "04", t: "Commit or discard", s: "all of it, or none" },
        ].map((s) => (
          <g key={s.n}>
            <rect x={s.x} y={334} width={s.w} height={56} {...chip} />
            <text x={s.x + 14} y={356} fontSize={9} fontWeight={700} letterSpacing="1.2" fill="var(--accent)">
              {s.n}
            </text>
            <text x={s.x + 38} y={357} fontSize={12} fontWeight={700} fill="var(--text)">
              {s.t}
            </text>
            <text x={s.x + 14} y={377} fontSize={10} fill="var(--text-muted)">
              {s.s}
            </text>
          </g>
        ))}

        {[205, 440, 675].map((x) => (
          <g key={x}>
            <path d={`M${x + 6},362 H${x + 32}`} stroke="var(--border)" strokeWidth={2} fill="none" />
            <path d={`M${x + 26},356 L${x + 34},362 L${x + 26},368 Z`} fill="var(--border)" />
          </g>
        ))}
      </svg>
    </div>
  );
}
