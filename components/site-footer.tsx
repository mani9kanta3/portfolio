const LINKS = [
  { href: "https://github.com/mani9kanta3", label: "GitHub" },
  { href: "https://www.linkedin.com/in/manikantapudi", label: "LinkedIn" },
];

export function SiteFooter() {
  return (
    <footer className="px-5 py-10 sm:px-14">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="label mb-3 text-muted">Email</div>
          <a
            href="mailto:pudimanikanta3@gmail.com"
            className="block text-lg font-semibold transition-colors hover:text-accent"
          >
            pudimanikanta3@gmail.com
          </a>
          <div className="label mb-3 mt-6 text-muted">Phone</div>
          <a
            href="tel:+919063424060"
            className="block text-lg font-semibold transition-colors hover:text-accent"
          >
            +91 90634 24060
          </a>
        </div>

        <div className="md:text-right">
          <ul className="flex gap-6 md:justify-end">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-ink transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t-2 border-edge pt-6">
        <span className="label text-muted">
          Manikanta Pudi — Hyderabad, Telangana
        </span>
        <span className="label text-muted">manikanta.tech</span>
      </div>
    </footer>
  );
}
