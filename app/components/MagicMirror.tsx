"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const MagicMirror = () => {
    const compliments = [
        "You're a literal angel! ☁️",
        "Your smile lights up the whole world! ☀️",
        "You deserve every happy thing! 🌸",
        "You're smarter than you give yourself credit for! 🧠",
        "The world is better because you're in it! 🌎",
        "You're a masterpiece in progress! 🎨",
        "Sending you a giant virtual hug! 🤗",
        "Punch, you're the best! 🧸",
        "Stay magical, sparkly soul! ✨",
        "Your heart is so beautiful! 💖"
    ];
    const [msg, setMsg] = useState("");
    const [isRotating, setIsRotating] = useState(false);

    const getCompliment = () => {
        setIsRotating(true);
        setTimeout(() => {
            const random = compliments[Math.floor(Math.random() * compliments.length)];
            setMsg(random);
            setIsRotating(false);
            confetti({
                particleCount: 60,
                gravity: 1.5,
                colors: ["#e28b9d", "#fff", "#ffd700"]
            });
        }, 800);
    };

    return (
        <div className="bg-white p-10 rounded-[3rem] border-8 border-[#fff1f3] shadow-xl flex flex-col items-center justify-center text-center space-y-8 h-[500px]">
            <h3 className="font-serif text-2xl text-[#4a3b3d]">Magic Mirror</h3>
            <div className="w-52 h-52 rounded-full border-[12px] border-[#fdf2f4] bg-[#fffafb] flex items-center justify-center shadow-inner relative overflow-hidden">
                <motion.div
                    animate={isRotating ? { rotate: 360, scale: [1, 1.2, 1] } : { rotate: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-8xl"
                >
                    {isRotating ? "🪄" : "🪞"}
                </motion.div>
            </div>

            <div className="min-h-[80px] flex items-center justify-center px-4">
                <AnimatePresence mode="wait">
                    {msg && (
                        <motion.p
                            key={msg}
                            initial={{ scale: 0.5, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.5, opacity: 0, y: -20 }}
                            className="font-caveat text-3xl md:text-4xl text-[#e28b9d] font-bold leading-tight"
                        >
                            "{msg}"
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            <button
                onClick={getCompliment}
                className="px-10 py-4 bg-[#4a3b3d] text-white rounded-[2rem] font-bold text-lg shadow-2xl hover:bg-black transition-all hover:scale-105 active:scale-95"
            >
                Tap for magic ✨
            </button>
        </div>
    );
};

export default MagicMirror;
