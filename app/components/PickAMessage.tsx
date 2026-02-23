"use client";

import { useState } from "react";

const MESSAGES = [
  "You're doing better than you think. 💕",
  "Punch, you're so loved. 🌹",
  "Take a breath. You're okay. ✨",
  "Someone is really proud of you. (It's me.) 🐒",
  "Today can be soft. Let it. 🌸",
  "You don't have to be strong all the time. 💕",
  "Rest counts as productivity. 🌹",
  "You matter more than you know. 💕",
  "Good days are coming. Keep going. 🌸",
  "You deserve gentle people and calm moments. 🌹",
  "Your feelings are valid. Always. 💕",
  "One step at a time is still moving. ✨",
  "Sending you a hug. 🤗",
  "You're allowed to take up space. 🌸",
  "Punch, you're incredible. Never forget it. 🐒🌹",
  "It's okay to not be okay sometimes. 💕",
  "You've already survived 100% of your hard days. 🌹",
  "Someone is rooting for you. (Still me.) 🐒",
  "Be as kind to yourself as you are to others. 🌸",
  "You're not too much. You're enough. 💕",
  "Fariha, you deserve the world. And then some. 🌹💕",
];

export default function PickAMessage() {
  const [message, setMessage] = useState<string | null>(null);

  const pick = () => {
    setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
  };

  return (
    <section className="mt-20 opacity-0 animate-fade-in-up stagger-6">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(157,123,126,0.1)] border border-[var(--blush)]/80">
        <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[var(--deep-rose)] text-center mb-2">
          Open a rose for you 🌹
        </h2>
        <p className="font-sans text-[var(--text-soft)] text-center text-sm mb-6">
          Tap the rose whenever you need a little something.
        </p>

        <div className="flex flex-col items-center gap-6">
          <button
            type="button"
            onClick={pick}
            className="text-6xl sm:text-7xl transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--rose)]/30 rounded-full p-2"
            aria-label="Pick a message"
          >
            🌹
          </button>

          {message && (
            <p
              key={message}
              className="font-serif text-lg sm:text-xl text-center text-[var(--deep-rose)] max-w-md animate-fade-in"
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
