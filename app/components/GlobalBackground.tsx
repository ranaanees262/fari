"use client";

const GlobalBackground = () => {
    // Define a set of decorative floating elements
    const decorItems = [
        { emoji: "🌸", size: "text-6xl md:text-9xl", top: "10%", left: "5%", scale: 1.2 },
        { emoji: "✨", size: "text-4xl md:text-7xl", top: "20%", right: "15%", scale: 1 },
        { emoji: "☁️", size: "text-5xl md:text-8xl", bottom: "15%", left: "10%", scale: 1.1 },
        { emoji: "🎀", size: "text-3xl md:text-6xl", top: "40%", right: "8%", scale: 0.9 },
        { emoji: "🍭", size: "text-6xl md:text-9xl", bottom: "30%", right: "5%", scale: 1.3 },
        { emoji: "🦋", size: "text-3xl md:text-5xl", top: "5%", right: "40%", scale: 0.8 },
        { emoji: "🧸", size: "text-4xl md:text-7xl", bottom: "5%", left: "45%", scale: 1 },
        { emoji: "🍓", size: "text-3xl md:text-6xl", top: "60%", left: "12%", scale: 0.9 },
        { emoji: "🍯", size: "text-5xl md:text-8xl", top: "70%", right: "30%", scale: 1.1 },
        { emoji: "🍰", size: "text-4xl md:text-7xl", top: "50%", left: "30%", scale: 1 },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#fffafb]">
            {/* 1. Base Mesh Gradients - Static for Performance */}
            <div
                className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,192,203,0.3)_0%,transparent_70%)] blur-[60px] md:blur-[100px]"
            />
            <div
                className="absolute bottom-[-20%] right-[-20%] w-[90%] h-[90%] bg-[radial-gradient(circle,rgba(181,196,184,0.25)_0%,transparent_70%)] blur-[80px] md:blur-[120px]"
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(255,229,127,0.15)_0%,transparent_60%)] blur-[100px] md:blur-[140px]"
            />

            {/* 2. Static Blobs */}
            <div className="absolute top-[15%] left-[5%] w-48 md:w-[30rem] h-48 md:h-[30rem] bg-[#fdf2f4]/60 mix-blend-multiply opacity-60 blur-2xl md:blur-3xl rounded-full" />
            <div className="absolute top-[40%] right-[10%] w-40 md:w-[25rem] h-40 md:h-[25rem] bg-[#eef8f1]/50 mix-blend-multiply opacity-50 blur-2xl md:blur-3xl rounded-full" />
            <div className="absolute bottom-[15%] left-[15%] w-56 md:w-[35rem] h-56 md:h-[35rem] bg-yellow-50/40 mix-blend-multiply opacity-50 blur-2xl md:blur-3xl rounded-full" />

            {/* 3. Grain Overlay for High-Fidelity Texture */}
            <div className="absolute inset-0 opacity-[0.4] mix-blend-soft-light" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")` }} />

            {/* 4. VISIBLE DECORATIVE ELEMENTS */}
            {decorItems.map((item, idx) => (
                <div
                    key={idx}
                    className={`absolute ${item.size} pointer-events-none select-none opacity-[0.15]`}
                    style={{
                        top: item.top,
                        left: item.left,
                        right: item.right,
                        bottom: item.bottom,
                        transform: `scale(${item.scale}) rotate(${idx % 2 === 0 ? '10deg' : '-10deg'})`,
                    }}
                >
                    {item.emoji}
                </div>
            ))}

            {/* Scattered Tiny Sparkles - Static */}
            {[...Array(15)].map((_, i) => (
                <div
                    key={`sparkle-${i}`}
                    className="absolute text-xl md:text-2xl pointer-events-none opacity-[0.2]"
                    style={{
                        top: `${(i * 137) % 100}%`,
                        left: `${(i * 151) % 100}%`,
                        transform: `scale(${0.5 + Math.random()})`,
                    }}
                >
                    ✨
                </div>
            ))}
        </div>
    );
};

export default GlobalBackground;
