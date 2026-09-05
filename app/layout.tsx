import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manikanta.tech"),
  title: {
    default: "Manikanta Pudi — AI & Full Stack Engineer",
    template: "%s — Manikanta Pudi",
  },
  description:
    "AI and full stack engineer in Hyderabad. I build systems and measure them honestly: an agent that writes SQL and repairs its own mistakes, an assistant that refuses to guess, and a billing system that cannot oversell stock.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://manikanta.tech",
    siteName: "Manikanta Pudi",
    title: "Manikanta Pudi — AI & Full Stack Engineer",
    description:
      "AI and full stack engineer in Hyderabad. I build systems and measure them honestly.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manikanta Pudi — AI & Full Stack Engineer",
    description:
      "AI and full stack engineer in Hyderabad. I build systems and measure them honestly.",
  },
  robots: { index: true, follow: true },
};

/**
 * Runs before first paint so a dark-mode visitor never sees a flash of the
 * light theme. Kept inline and dependency-free on purpose — anything async
 * would land after the browser has already painted.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
