"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NavBar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navLinks = [
    { href: "/", label: "Home", emoji: "🏡" },
    { href: "/todos", label: "Todos", emoji: "📝" },
    { href: "/vision-board", label: "Vision", emoji: "🌈" },
    { href: "/dear-diary", label: "Diary", emoji: "📖" },
    { href: "/play-area", label: "Play", emoji: "🎮" },
  ];

  return (
    <>
      {/* Desktop Top Nav */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden md:block w-fit">
        <nav className="flex items-center gap-1 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-[var(--rose)]/30 shadow-[0_10px_30px_rgba(226,139,157,0.2)] px-3 py-2">
          <div className="px-4 py-2 text-xs font-bold text-[var(--deep-rose)] uppercase tracking-widest border-r border-[var(--rose)]/20 mr-2">
            For Punch 🌹
          </div>
          {navLinks.map((link) => (
            <NavItem key={link.href} href={link.href} active={isActive(link.href)} label={link.label} emoji={link.emoji} desktop />
          ))}
        </nav>
      </header>

      {/* Mobile Bottom Nav - Floating Pill Design */}
      <nav className="fixed bottom-6 left-4 right-4 z-[100] md:hidden bg-white/80 backdrop-blur-2xl border border-[var(--rose)]/30 px-2 py-2 rounded-full shadow-[0_15px_35px_rgba(226,139,157,0.25)]">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navLinks.map((link) => (
            <NavItem key={link.href} href={link.href} active={isActive(link.href)} label={link.label} emoji={link.emoji} />
          ))}
        </div>
      </nav>
    </>
  );
};

type NavItemProps = {
  href: string;
  active: boolean;
  label: string;
  emoji: string;
  desktop?: boolean;
};

const NavItem = ({ href, active, label, emoji, desktop }: NavItemProps) => {
  if (desktop) {
    return (
      <Link href={href} className="relative group px-1">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${active ? 'bg-[var(--rose)] text-white shadow-md' : 'text-[var(--text-soft)] hover:bg-[var(--blush)]/50'}`}>
          <span className="text-lg">{emoji}</span>
          <span className="text-sm font-bold tracking-tight">{label}</span>
        </div>
        {active && (
          <motion.div
            layoutId="nav-bubble"
            className="absolute inset-0 bg-[var(--rose)] rounded-full -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Link>
    );
  }

  // Mobile Implementation - Specially Slimmed
  return (
    <Link href={href} className="flex flex-col items-center gap-0.5 min-w-[50px] relative">
      <motion.div
        animate={active ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
        className={`text-xl transition-all ${active ? 'opacity-100' : 'opacity-40'}`}
      >
        {emoji}
      </motion.div>
      <span className={`text-[8px] font-black uppercase tracking-widest transition-all ${active ? 'text-[var(--rose)] opacity-100' : 'text-gray-400 opacity-60'}`}>
        {label === "Vision" ? "Dream" : label}
      </span>
      {active && (
        <motion.div
          layoutId="mobile-nav-dot"
          className="w-1 h-1 rounded-full bg-[var(--rose)] absolute -bottom-1"
        />
      )}
    </Link>
  );
};

export default NavBar;
