"use client";

import { useState, useCallback } from "react";

const PAIRS = ["🌹", "🐒", "💕", "🌸"];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function MemoryGame() {
  const [cards, setCards] = useState(() =>
    shuffle([...PAIRS, ...PAIRS].map((emoji, i) => ({ id: i, emoji })))
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  const handleClick = useCallback(
    (index: number) => {
      if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
      const next = [...flipped, index];
      setFlipped(next);
      if (next.length === 2) {
        const [a, b] = next;
        if (cards[a].emoji === cards[b].emoji) {
          setMatched((m) => [...m, a, b]);
        }
        setTimeout(() => setFlipped([]), 600);
      }
    },
    [cards, flipped.length, matched]
  );

  const allMatched = matched.length === cards.length;

  const reset = () => {
    setFlipped([]);
    setMatched([]);
    setCards(shuffle([...PAIRS, ...PAIRS].map((emoji, i) => ({ id: i, emoji }))));
  };

  return (
    <section className="mt-12 opacity-0 animate-fade-in-up stagger-6">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(157,123,126,0.1)] border border-[var(--blush)]/80">
        <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[var(--deep-rose)] text-center mb-2">
          Match the pairs, Punch 🐒
        </h2>
        <p className="font-sans text-[var(--text-soft)] text-center text-sm mb-6">
          Flip two cards to find matching emojis.
        </p>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs mx-auto">
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(index);
            return (
              <button
                key={`${card.id}-${index}`}
                type="button"
                onClick={() => handleClick(index)}
                disabled={flipped.length === 2}
                className="aspect-square rounded-xl border-2 border-[var(--rose)]/40 bg-[var(--blush)]/60 flex items-center justify-center text-3xl sm:text-4xl transition-all duration-200 hover:bg-[var(--rose)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--deep-rose)]/30 disabled:opacity-70"
                aria-label={isFlipped ? `Card showing ${card.emoji}` : "Flip card"}
              >
                {isFlipped ? card.emoji : "?"}
              </button>
            );
          })}
        </div>

        {allMatched && (
          <div className="mt-6 text-center animate-fade-in">
            <p className="font-serif text-lg text-[var(--deep-rose)]">
              You did it! 🌹💕 So proud of you, Punch!
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-3 px-5 py-2 rounded-lg font-sans text-sm font-medium text-[var(--deep-rose)] border-2 border-[var(--rose)]/50 hover:bg-[var(--rose)]/10 transition-colors"
            >
              Play again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
