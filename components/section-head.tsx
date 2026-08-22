/** The numbered section opener used on the home page: "01 — Selected work". */
export function SectionHead({
  number,
  kicker,
  title,
}: {
  number: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="px-5 py-12 sm:px-14 sm:py-14">
      <div className="label mb-7 text-muted">
        {number} — {kicker}
      </div>
      <h2 className="display max-w-[20ch] text-[clamp(32px,5vw,56px)]">
        {title}
      </h2>
    </div>
  );
}
