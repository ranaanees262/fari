"use client";

import { motion } from "framer-motion";

const GlobalBackground = () => {
    // Define a set of decorative floating elements
    const decorItems = [
        { emoji: "🌸", size: "text-9xl", top: "10%", left: "5%", delay: 0, scale: 1.2 },
        { emoji: "✨", size: "text-7xl", top: "20%", right: "15%", delay: 1, scale: 1 },
        { emoji: "☁️", size: "text-8xl", bottom: "15%", left: "10%", delay: 2, scale: 1.1 },
        { emoji: "🎀", size: "text-6xl", top: "40%", right: "8%", delay: 3, scale: 0.9 },
        { emoji: "🍭", size: "text-9xl", bottom: "30%", right: "5%", delay: 4, scale: 1.3 },
        { emoji: "🦋", size: "text-5xl", top: "5%", right: "40%", delay: 5, scale: 0.8 },
        { emoji: "🧸", size: "text-7xl", bottom: "5%", left: "45%", delay: 6, scale: 1 },
        { emoji: "🍓", size: "text-6xl", top: "60%", left: "12%", delay: 7, scale: 0.9 },
        { emoji: "🍯", size: "text-8xl", top: "70%", right: "30%", delay: 8, scale: 1.1 },
        { emoji: "🍰", size: "text-7xl", middle: "50%", left: "30%", delay: 9, scale: 1 },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#fffafb]">
            {/* 1. Base Mesh Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    x: [0, 100, 0],
                    y: [0, 50, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,192,203,0.4)_0%,transparent_70%)] blur-[100px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -60, 0],
                    x: [0, -100, 0],
                    y: [0, 80, 0]
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: -5 }}
                className="absolute bottom-[-20%] right-[-20%] w-[90%] h-[90%] bg-[radial-gradient(circle,rgba(181,196,184,0.35)_0%,transparent_70%)] blur-[120px]"
            />
            <motion.div
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(255,229,127,0.2)_0%,transparent_60%)] blur-[140px]"
            />

            {/* 2. Animated Morphing Blobs */}
            <div className="blob absolute top-[15%] left-[5%] w-[30rem] h-[30rem] bg-[#fdf2f4]/80 mix-blend-multiply opacity-60 blur-3xl" />
            <div className="blob absolute top-[40%] right-[10%] w-[25rem] h-[25rem] bg-[#eef8f1]/70 mix-blend-multiply opacity-50 blur-3xl" style={{ animationDelay: '2s' }} />
            <div className="blob absolute bottom-[15%] left-[15%] w-[35rem] h-[35rem] bg-yellow-50/60 mix-blend-multiply opacity-50 blur-3xl" style={{ animationDelay: '4s' }} />

            {/* 3. Grain Overlay for High-Fidelity Texture */}
            <div className="absolute inset-0 opacity-[0.5] mix-blend-soft-light" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")` }} />

            {/* 4. VISIBLE DECORATIVE ELEMENTS (THE WOW FACTOR) */}
            {decorItems.map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0.15, 0.25, 0.15], // Significantly increased visibility
                        scale: [item.scale, item.scale * 1.1, item.scale],
                        y: [0, -40, 0],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 5,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "easeInOut"
                    }}
                    className={`absolute ${item.size} pointer-events-none select-none`}
                    style={{
                        top: item.top,
                        left: item.left,
                        right: item.right,
                        bottom: item.bottom,
                        filter: "none" // Removed blur for maximum clarity
                    }}
                >
                    {item.emoji}
                </motion.div>
            ))}

            {/* Scattered Tiny Sparkles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    animate={{
                        opacity: [0, 0.4, 0], // Increased sparkle visibility
                        scale: [0, 1.2, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 10
                    }}
                    className="absolute text-2xl pointer-events-none"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`
                    }}
                >
                    ✨
                </motion.div>
            ))}
        </div>
    );
};

export default GlobalBackground;
