"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function PinGate({ children }: { children: React.ReactNode }) {
    const [pin, setPin] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authData = localStorage.getItem("site_auth_data");
        if (authData) {
            const { authenticated, timestamp } = JSON.parse(authData);
            const now = new Date().getTime();
            const oneDay = 24 * 60 * 60 * 1000;

            if (authenticated && (now - timestamp < oneDay)) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem("site_auth_data");
            }
        }
        setLoading(false);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin.toLowerCase() === "punch") {
            const authData = {
                authenticated: true,
                timestamp: new Date().getTime()
            };
            localStorage.setItem("site_auth_data", JSON.stringify(authData));
            setIsAuthenticated(true);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#ffc0cb", "#e28b9d", "#ffd700"],
            });
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
            setPin("");
        }
    };

    if (loading) return null;

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="fixed inset-0 z-[9999] bg-[#fffafb] flex items-center justify-center p-4 overflow-hidden">
            {/* Decorative Ornaments */}
            <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🎈</div>
            <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>🍭</div>
            <div className="absolute top-1/2 left-[-5%] text-9xl opacity-[0.03] rotate-12">💖</div>
            <div className="absolute top-1/2 right-[-5%] text-9xl opacity-[0.03] -rotate-12">💖</div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(226,139,157,0.2)] border-8 border-[#fff1f3] p-10 text-center relative"
            >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-7xl drop-shadow-lg">✨</div>

                <header className="mb-8 space-y-2">
                    <h1 className="font-serif text-4xl text-[#4a3b3d] tracking-tighter">
                        Who goes <span className="text-[#e28b9d] italic">there?</span>
                    </h1>
                    <p className="font-caveat text-2xl text-[#6b5b5d] opacity-70">
                        Enter the secret word to enter the dream land...
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                    >
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="The secret word..."
                            className={`w-full bg-[#fffdfa] border-none focus:ring-4 focus:ring-[#e28b9d]/20 p-5 rounded-2xl text-center text-2xl font-caveat text-[#4a3b3d] placeholder:opacity-30 shadow-inner transition-all ${error ? "bg-red-50 text-red-500" : ""
                                }`}
                        />
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full py-5 rounded-2xl bg-[#e28b9d] text-white font-bold text-xl shadow-[0_15px_30px_rgba(226,139,157,0.3)] hover:bg-[#d67b8d] transition-all flex items-center justify-center gap-3"
                    >
                        <span>Let me in!</span>
                        <span className="text-2xl">🧸</span>
                    </motion.button>
                </form>

                <p className="mt-8 text-[10px] uppercase tracking-widest text-[#e28b9d] font-bold opacity-40">
                    Hint: It's someone very special's nickname 🌹
                </p>
            </motion.div>
        </div>
    );
}
