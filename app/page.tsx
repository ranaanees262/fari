"use client";

import { motion } from "framer-motion";
import MagicMirror from "./components/MagicMirror";

const ROSE = "🌹";
const MONKEY = "🐒";
const HEART = "💕";
const BLOSSOM = "🌸";
const SPARKLE = "✨";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 sm:py-24">
        {/* Emoji strip */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8 opacity-0 animate-fade-in stagger-1" aria-hidden>
          {[ROSE, MONKEY, ROSE, BLOSSOM, MONKEY, ROSE, HEART, ROSE].map((emoji, i) => (
            <span key={i} className="emoji-float text-2xl sm:text-3xl" style={{ animationDelay: `${i * 0.3}s` }}>
              {emoji}
            </span>
          ))}
        </div>

        {/* Hero — for Fariha / Punch */}
        <header className="text-center mb-16 opacity-0 animate-fade-in stagger-2">
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-[var(--dusty-rose)] mb-3">
            For you, Fariha
          </p>
          <p className="font-serif text-xl text-[var(--deep-rose)] mb-6">
            Hey Punch {MONKEY} {ROSE}
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold text-[var(--text-deep)] leading-tight">
            You deserve
            <br />
            <span className="italic text-[var(--deep-rose)]">everything.</span>
          </h1>
          <p className="font-sans text-[var(--text-soft)] mt-6 text-lg">
            {ROSE} {SPARKLE} {ROSE}
          </p>
        </header>

        {/* Magic Mirror Section - Prominent on Home */}
        <section className="mb-20 opacity-0 animate-fade-in-up stagger-3">
          <MagicMirror />
        </section>

        {/* Main message cards */}
        <section className="space-y-8">
          {[
            { title: "Love", emoji: ROSE, text: "You deserve to be loved fully—not in pieces, not conditionally. Your heart is precious, and it deserves to be held gently and celebrated every day.", delay: "stagger-4" },
            { title: "Care", emoji: HEART, text: "You deserve to be taken care of. Rest when you need to. Say no when you need to. Let people show up for you the way you show up for others.", delay: "stagger-5" },
            { title: "Respect", emoji: BLOSSOM, text: "You deserve to be respected—your time, your boundaries, your feelings, your dreams. Never settle for less than someone who sees how incredible you are.", delay: "stagger-6" },
          ].map((item) => (
            <article
              key={item.title}
              className={`opacity-0 animate-fade-in-up ${item.delay} bg-white/70 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(157,123,126,0.1)] border border-[var(--blush)]/80`}
            >
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--deep-rose)] mb-4 flex items-center gap-2">
                <span className="text-3xl">{item.emoji}</span>
                {item.title}
              </h2>
              <p className="font-sans text-[var(--text-soft)] leading-relaxed text-lg">
                {item.text}
              </p>
            </article>
          ))}
        </section>

        {/* You are... affirmations */}
        <section className="mt-20 opacity-0 animate-fade-in-up stagger-7">
          <div className="bg-gradient-to-br from-[var(--rose)]/15 to-[var(--blush)]/40 rounded-2xl p-8 sm:p-10 border border-[var(--rose)]/30">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--deep-rose)] text-center mb-6">
              {ROSE} You are {ROSE}
            </h2>
            <ul className="font-sans text-[var(--text-soft)] text-lg space-y-3 text-center">
              <li className="flex items-center justify-center gap-2">
                <span>{MONKEY}</span> Stronger than you know
              </li>
              <li className="flex items-center justify-center gap-2">
                <span>{ROSE}</span> Worthy of kindness—from others and from yourself
              </li>
              <li className="flex items-center justify-center gap-2">
                <span>{BLOSSOM}</span> Allowed to take up space and ask for what you need
              </li>
              <li className="flex items-center justify-center gap-2">
                <span>{HEART}</span> So loved, Punch
              </li>
            </ul>
          </div>
        </section>

        {/* Roses for you */}
        <section className="mt-12 opacity-0 animate-fade-in stagger-8">
          <div className="text-center py-8">
            <p className="font-serif text-2xl sm:text-3xl text-[var(--deep-rose)] italic">
              Roses for you, Fariha
            </p>
            <p className="font-sans text-[var(--text-soft)] mt-2 text-lg">
              {ROSE} {ROSE} {ROSE} {BLOSSOM} {ROSE} {ROSE} {ROSE}
            </p>
          </div>
        </section>

        {/* Remember */}
        <section className="mt-8 opacity-0 animate-fade-in-up stagger-9">
          <article className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(157,123,126,0.08)] border border-[var(--blush)]/80">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[var(--deep-rose)] mb-4 flex items-center gap-2">
              {MONKEY} Remember, Punch
            </h2>
            <p className="font-sans text-[var(--text-soft)] leading-relaxed text-lg">
              Hard times don’t define you. You are not your struggles. You are the one who keeps going, who cares, who deserves soft days and gentle people and a life that feels like a deep breath. {SPARKLE}
            </p>
          </article>
        </section>

        {/* It's okay to... */}
        <section className="mt-12 opacity-0 animate-fade-in-up stagger-10">
          <article className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(157,123,126,0.1)] border border-[var(--blush)]/80">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[var(--deep-rose)] mb-5 flex items-center gap-2">
              {BLOSSOM} It’s okay to…
            </h2>
            <ul className="font-sans text-[var(--text-soft)] text-lg space-y-2 leading-relaxed">
              <li>• Rest when you’re tired</li>
              <li>• Not have it all figured out</li>
              <li>• Say no and protect your peace</li>
              <li>• Cry or be quiet when you need to</li>
              <li>• Ask for help {HEART}</li>
              <li>• Take things one day at a time</li>
            </ul>
          </article>
        </section>

        {/* Good days ahead */}
        <section className="mt-12 opacity-0 animate-fade-in stagger-11">
          <div className="text-center py-10 px-6 bg-gradient-to-br from-[var(--sage)]/20 to-[var(--cream)]/80 rounded-2xl border border-[var(--sage)]/30">
            <p className="font-serif text-2xl sm:text-3xl text-[var(--deep-rose)]">
              {SPARKLE} Good days are ahead {SPARKLE}
            </p>
            <p className="font-sans text-[var(--text-soft)] mt-4 text-lg max-w-md mx-auto">
              Brighter mornings, easier breaths, and moments that feel like sunshine. You’re going to get there, Punch. {ROSE} {MONKEY}
            </p>
          </div>
        </section>

        {/* When you need a reminder */}
        <section className="mt-12 opacity-0 animate-fade-in-up stagger-12">
          <article className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(157,123,126,0.08)] border border-[var(--blush)]/80">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[var(--deep-rose)] mb-5 flex items-center gap-2">
              {ROSE} When you need a reminder
            </h2>
            <ul className="font-sans text-[var(--text-soft)] text-lg space-y-4 italic">
              <li>You are enough, exactly as you are.</li>
              <li>Your feelings are valid.</li>
              <li>You don’t have to earn love or care.</li>
              <li>It’s okay to put yourself first sometimes.</li>
              <li>Someone out there is rooting for you. {MONKEY}</li>
            </ul>
          </article>
        </section>

        {/* You matter */}
        <section className="mt-12 opacity-0 animate-fade-in stagger-13">
          <div className="text-center py-10 px-6 rounded-2xl bg-[var(--rose)]/15 border border-[var(--rose)]/25">
            <p className="font-serif text-3xl sm:text-4xl font-semibold text-[var(--deep-rose)]">
              You matter, Fariha. {HEART}
            </p>
            <p className="font-sans text-[var(--text-soft)] mt-3 text-lg">
              Not because of what you do. Just because you are you. {ROSE}
            </p>
          </div>
        </section>

        {/* For the tough days */}
        <section className="mt-12 opacity-0 animate-fade-in-up stagger-14">
          <article className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(157,123,126,0.1)] border border-[var(--blush)]/80">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[var(--deep-rose)] mb-4 flex items-center gap-2">
              {MONKEY} For the tough days
            </h2>
            <p className="font-sans text-[var(--text-soft)] leading-relaxed text-lg">
              When everything feels heavy, remember: you’ve made it through every hard day so far. You’re still here. You’re still trying. That takes courage. Be as gentle with yourself as you would be with someone you love. {BLOSSOM} {ROSE}
            </p>
          </article>
        </section>

        {/* Closing note */}
        <footer className="mt-20 text-center opacity-0 animate-fade-in stagger-15">
          <p className="font-serif text-xl sm:text-2xl text-[var(--text-deep)]/90 italic">
            Things have been hard. I see you.
          </p>
          <p className="font-sans text-[var(--text-soft)] mt-4 text-lg max-w-md mx-auto">
            You don’t have to carry it all alone. You are worthy of softness, of peace, and of people who remind you how much you matter.
          </p>
          <p className="font-serif text-2xl mt-10 text-[var(--deep-rose)]">
            Always. {HEART}
          </p>
          <p className="font-sans text-[var(--dusty-rose)] mt-6 text-lg">
            — For Fariha, with love {ROSE} {MONKEY} {ROSE}
          </p>
          <div className="flex justify-center gap-2 mt-8" aria-hidden>
            {[ROSE, MONKEY, HEART, MONKEY, ROSE].map((e, i) => (
              <span key={i} className="text-2xl emoji-float" style={{ animationDelay: `${i * 0.2}s` }}>{e}</span>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
