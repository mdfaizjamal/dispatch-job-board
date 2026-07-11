"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Board" },
  { href: "/saved", label: "Saved" },
  { href: "/post", label: "Post a role" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line bg-board/60 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-open opacity-75 animate-blink" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-open" />
          </span>
          <span className="font-mono text-sm sm:text-base tracking-widest2 uppercase text-ink group-hover:text-amber transition-colors">
            Dispatch
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  active
                    ? "bg-teal text-amber"
                    : "text-muted hover:text-ink hover:bg-panel"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
