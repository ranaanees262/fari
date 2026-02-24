"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-30 flex justify-center px-4 pt-4 pb-3 bg-gradient-to-b from-[rgba(253,248,243,0.95)] via-[rgba(253,248,243,0.9)] to-transparent backdrop-blur">
      <nav className="inline-flex items-center gap-1 rounded-full bg-white/70 border border-[var(--blush)]/80 shadow-[0_6px_20px_rgba(157,123,126,0.15)] px-2 py-1">
        <div className="px-3 py-1 text-xs font-medium text-[var(--dusty-rose)] hidden sm:block">
          <span className="mr-1">🌹</span>
          For Fariha
        </div>
        <NavItem href="/" active={isActive("/")}>
          <span className="mr-1">🏡</span>
          Home
        </NavItem>
        <NavItem href="/todos" active={isActive("/todos")}>
          <span className="mr-1">📝</span>
          Todos
        </NavItem>
        <NavItem href="/vision-board" active={isActive("/vision-board")}>
          <span className="mr-1">🌈</span>
          Vision Board
        </NavItem>
        <NavItem href="/dear-diary" active={isActive("/dear-diary")}>
          <span className="mr-1">📖</span>
          Dear Diary
        </NavItem>
        <NavItem href="/play-area" active={isActive("/play-area")}>
          <span className="mr-1">🎮</span>
          Play Area
        </NavItem>
      </nav>
    </header>
  );
};

type NavItemProps = {
  href: string;
  active: boolean;
  children: React.ReactNode;
};

const NavItem = ({ href, active, children }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all ${active
        ? "bg-[var(--rose)] text-[var(--text-deep)] shadow-sm"
        : "text-[var(--text-soft)] hover:bg-[var(--blush)]/70"
        }`}
    >
      {children}
    </Link>
  );
};

export default NavBar;

