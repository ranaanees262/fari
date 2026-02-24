"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// --- 1. Memory Matcher Game (Mobile Friendly) ---
const MemoryMatcher = () => {
    const cards_list = ["🌸", "🧸", "🧁", "🎀", "🍭", "🌈", "🍼", "🎀"];
    const [cards, setCards] = useState<{ id: number; icon: string; flipped: boolean; matched: boolean }[]>([]);
    const [flippedIds, setFlippedIds] = useState<number[]>([]);
    const [won, setWon] = useState(false);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const mixed = [...cards_list, ...cards_list]
            .sort(() => Math.random() - 0.5)
            .map((icon, index) => ({ id: index, icon, flipped: false, matched: false }));
        setCards(mixed);
        setFlippedIds([]);
        setWon(false);
    };

    const handleFlip = (id: number) => {
        if (flippedIds.length === 2 || cards[id].flipped || cards[id].matched) return;

        const newCards = [...cards];
        newCards[id].flipped = true;
        setCards(newCards);

        const newFlipped = [...flippedIds, id];
        setFlippedIds(newFlipped);

        if (newFlipped.length === 2) {
            if (newCards[newFlipped[0]].icon === newCards[newFlipped[1]].icon) {
                newCards[newFlipped[0]].matched = true;
                newCards[newFlipped[1]].matched = true;
                setCards(newCards);
                setFlippedIds([]);
                if (newCards.every(c => c.matched)) {
                    setWon(true);
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        colors: ["#ffd700", "#e28b9d"]
                    });
                }
            } else {
                setTimeout(() => {
                    newCards[newFlipped[0]].flipped = false;
                    newCards[newFlipped[1]].flipped = false;
                    setCards(newCards);
                    setFlippedIds([]);
                }, 800);
            }
        }
    };

    return (
        <div className="bg-white p-5 md:p-12 rounded-[2rem] md:rounded-[4rem] border-4 md:border-8 border-[#feeaf0] shadow-xl relative min-h-[400px] md:min-h-[600px] flex flex-col items-center justify-start space-y-6 md:space-y-12">
            <header className="text-center space-y-1">
                <h3 className="font-serif text-2xl md:text-5xl text-[#4a3b3d] font-bold">Emoji Matcher</h3>
                <p className="font-caveat text-lg md:text-2xl text-[#6b5b5d] opacity-50 italic">Find all the matching pairs!</p>
            </header>

            {won ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex-1 flex flex-col items-center justify-center space-y-6 md:space-y-8">
                    <p className="font-caveat text-4xl md:text-7xl text-[#e28b9d] font-bold">Perfect! ✨</p>
                    <button onClick={initializeGame} className="px-8 py-3 bg-[#e28b9d] text-white rounded-[1.5rem] font-bold text-base md:text-xl shadow-xl hover:scale-105 active:scale-95">
                        Play Again 🎲
                    </button>
                </motion.div>
            ) : (
                <div className="grid grid-cols-4 gap-2 md:gap-6">
                    {cards.map((card) => (
                        <motion.button
                            key={card.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleFlip(card.id)}
                            className={`w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-xl md:rounded-[2rem] flex items-center justify-center text-xl md:text-5xl transition-all duration-500 transform shadow-md ${card.flipped || card.matched
                                ? "bg-white rotate-y-180 border-2 md:border-4 border-[#feeaf0]"
                                : "bg-[#feeaf0] text-transparent"
                                }`}
                        >
                            {(card.flipped || card.matched) ? card.icon : "❓"}
                        </motion.button>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- 2. Punch Run (Infinite Runner) ---
const PunchRun = () => {
    const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
    const [visualScore, setVisualScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const stateRef = useRef<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
    const scoreRef = useRef(0);
    const playerYRef = useRef(320);
    const playerVelocityRef = useRef(0);
    const obstaclesRef = useRef<{ id: number; x: number; type: string }[]>([]);
    const gameSpeedRef = useRef(6);
    const distanceRef = useRef(0);
    const requestRef = useRef<number>();
    const lastTimeRef = useRef<number>();

    const [, setTick] = useState(0);

    const GROUND_Y = 320;
    const GRAVITY = 0.6;
    const JUMP_FORCE = -14;
    const PLAYER_X = 50;

    const startGame = () => {
        stateRef.current = 'PLAYING';
        setGameState('PLAYING');
        scoreRef.current = 0;
        setVisualScore(0);
        playerYRef.current = GROUND_Y;
        playerVelocityRef.current = 0;
        obstaclesRef.current = [];
        gameSpeedRef.current = 5;
        distanceRef.current = 0;
        lastTimeRef.current = performance.now();
        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const gameLoop = (time: number) => {
        if (stateRef.current !== 'PLAYING') return;
        const deltaTime = time - (lastTimeRef.current || time);
        lastTimeRef.current = time;

        playerVelocityRef.current += GRAVITY;
        playerYRef.current += playerVelocityRef.current;
        if (playerYRef.current >= GROUND_Y) {
            playerYRef.current = GROUND_Y;
            playerVelocityRef.current = 0;
        }

        distanceRef.current += gameSpeedRef.current;
        if (distanceRef.current > (300 + Math.random() * 400)) {
            obstaclesRef.current.push({
                id: Date.now(),
                x: 800,
                type: Math.random() > 0.5 ? "🌵" : "🍄"
            });
            distanceRef.current = 0;
        }

        obstaclesRef.current = obstaclesRef.current.filter(obs => {
            obs.x -= gameSpeedRef.current;
            if (obs.x > PLAYER_X + 10 && obs.x < PLAYER_X + 40) {
                if (playerYRef.current > GROUND_Y - 30) {
                    endGame();
                    return false;
                }
            }
            return obs.x > -100;
        });

        gameSpeedRef.current += 0.0012;
        scoreRef.current += 1;
        if (scoreRef.current % 10 === 0) setVisualScore(Math.floor(scoreRef.current / 10));
        setTick(t => t + 1);
        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const endGame = () => {
        stateRef.current = 'GAMEOVER';
        setGameState('GAMEOVER');
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };

    const jump = () => {
        if (stateRef.current === 'PLAYING' && playerYRef.current >= GROUND_Y) {
            playerVelocityRef.current = JUMP_FORCE;
        } else if (stateRef.current === 'IDLE' || stateRef.current === 'GAMEOVER') {
            startGame();
        }
    };

    useEffect(() => {
        if (gameState === 'GAMEOVER') {
            const finalScore = Math.floor(scoreRef.current / 10);
            if (finalScore > highScore) setHighScore(finalScore);
        }
    }, [gameState]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') jump();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div className="relative w-full max-w-lg mx-auto bg-[#4a3b3d] p-2 md:p-4 rounded-[2rem] md:rounded-[3.5rem] shadow-2xl border-[6px] md:border-[12px] border-[#312526]">
            <div
                onClick={jump}
                className="relative w-full h-[350px] md:h-[450px] bg-gradient-to-b from-[#e0f7fa] to-[#fffde7] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-2 md:border-4 border-[#2d2223] cursor-pointer select-none"
            >
                <motion.div
                    animate={{
                        rotate: playerYRef.current < GROUND_Y ? [0, 15, -15, 0] : 0,
                        scaleX: -1
                    }}
                    style={{
                        left: PLAYER_X,
                        top: playerYRef.current,
                    }}
                    transition={{ rotate: { duration: 0.5, repeat: Infinity, ease: "linear" } }}
                    className="absolute text-5xl md:text-7xl z-20"
                >
                    {gameState === 'GAMEOVER' ? '😵' : '🐒'}
                </motion.div>

                {obstaclesRef.current.map(obs => (
                    <div key={obs.id} className="absolute text-3xl md:text-5xl z-10" style={{ left: obs.x, top: GROUND_Y + 15 }}>
                        {obs.type}
                    </div>
                ))}

                <div className="absolute bottom-0 w-full h-[60px] md:h-[80px] bg-[#f0e6e8] border-t-4 md:border-t-8 border-[#e28b9d]/30 overflow-hidden">
                    <div className="absolute inset-0 flex">
                        <div
                            className="flex whitespace-nowrap animate-track-fast"
                            style={{ animationDuration: `${1 / (gameSpeedRef.current / 10)}s` }}
                        >
                            {[...Array(20)].map((_, i) => (
                                <span key={i} className="px-3 md:px-4 text-[#e28b9d]/10 text-base md:text-lg font-bold select-none uppercase tracking-widest">soon •</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute top-3 left-3 flex flex-col gap-1 z-30">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl shadow-lg border border-[#e28b9d]/20 flex items-center gap-3 md:gap-4">
                        <span className="font-serif text-base md:text-lg font-black text-[#4a3b3d] leading-none">{visualScore}m</span>
                        <span className="w-px h-5 md:h-6 bg-gray-200" />
                        <span className="font-serif text-base md:text-lg font-black text-gray-400 leading-none">Best: {highScore}m</span>
                    </div>
                </div>

                <AnimatePresence>
                    {gameState === 'IDLE' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-white/40 backdrop-blur-xl z-40 flex flex-col items-center justify-center p-6 text-center">
                            <div className="text-6xl md:text-8xl mb-3 md:mb-4">🏁</div>
                            <h3 className="font-serif text-2xl md:text-4xl text-[#4a3b3d] font-bold mb-1">Punch Run!</h3>
                            <p className="font-caveat text-xl md:text-2xl text-[#6b5b5d] mb-4">Tap to jump over the cacti!</p>
                            <button onClick={startGame} className="px-8 py-3 bg-[#e28b9d] text-white rounded-full font-bold text-lg shadow-lg">Play 🎮</button>
                        </motion.div>
                    )}
                    {gameState === 'GAMEOVER' && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 bg-red-50/60 backdrop-blur-xl z-40 flex flex-col items-center justify-center p-6 text-center">
                            <div className="text-6xl md:text-8xl mb-3 md:mb-4">😿</div>
                            <h3 className="font-serif text-3xl md:text-5xl text-red-500 font-black mb-1 tracking-tighter uppercase">OUCH!</h3>
                            <p className="font-caveat text-2xl md:text-3xl text-[#4a3b3d] mb-6">Score: <span className="text-[#e28b9d] font-bold">{visualScore}m</span></p>
                            <button onClick={startGame} className="px-10 py-4 bg-[#4a3b3d] text-white rounded-full font-bold text-lg shadow-xl">Try Again 🧸</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex justify-between mt-2 px-4 h-8 md:h-12 items-center">
                <div className="flex gap-2 underline decoration-[#e28b9d]/30 font-bold text-[10px] text-[#e28b9d]/60 tracking-widest uppercase">
                    Mobile Optimized
                </div>
                <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-400 shadow-inner" />
                    <div className="w-6 h-6 rounded-full bg-yellow-400 shadow-inner" />
                </div>
            </div>
        </div>
    );
};

// --- 3. Flappy Monkey ---
const FlappyMonkey = () => {
    const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const stateRef = useRef<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
    const playerYRef = useRef(200);
    const playerVelocityRef = useRef(0);
    const pipesRef = useRef<{ id: number; x: number; gapTop: number }[]>([]);
    const lastTimeRef = useRef<number>();
    const requestRef = useRef<number>();
    const scoreRef = useRef(0);

    const [, setTick] = useState(0);

    const GRAVITY = 0.4;
    const JUMP_FORCE = -8;
    const PIPE_SPEED = 3.5;
    const PIPE_SPAWN_RATE = 1500;
    const PLAYER_X = 50;
    const CONTAINER_HEIGHT = 450;

    const startGame = () => {
        stateRef.current = 'PLAYING';
        setGameState('PLAYING');
        playerYRef.current = 200;
        playerVelocityRef.current = 0;
        pipesRef.current = [];
        scoreRef.current = 0;
        setScore(0);
        lastTimeRef.current = performance.now();
        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const gameLoop = (time: number) => {
        if (stateRef.current !== 'PLAYING') return;

        playerVelocityRef.current += GRAVITY;
        playerYRef.current += playerVelocityRef.current;

        // Collision with floor/ceiling
        if (playerYRef.current > CONTAINER_HEIGHT - 40 || playerYRef.current < 0) {
            endGame();
            return;
        }

        // Move pipes
        pipesRef.current = pipesRef.current.map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }));

        // Spawn pipes
        if (pipesRef.current.length === 0 || pipesRef.current[pipesRef.current.length - 1].x < CONTAINER_HEIGHT - 200) {
            pipesRef.current.push({
                id: Date.now(),
                x: 500,
                gapTop: Math.random() * (CONTAINER_HEIGHT - 200) + 50
            });
        }

        // Filter and Score
        pipesRef.current = pipesRef.current.filter(pipe => {
            if (pipe.x < PLAYER_X && !(pipe as any).scored) {
                (pipe as any).scored = true;
                scoreRef.current += 1;
                setScore(scoreRef.current);
            }

            // Collision with pipes
            const pRect = { left: PLAYER_X + 10, right: PLAYER_X + 40, top: playerYRef.current + 10, bottom: playerYRef.current + 40 };
            const pipeWidth = 60;
            const topPipeRect = { left: pipe.x, right: pipe.x + pipeWidth, top: 0, bottom: pipe.gapTop };
            const bottomPipeRect = { left: pipe.x, right: pipe.x + pipeWidth, top: pipe.gapTop + 140, bottom: CONTAINER_HEIGHT };

            if (
                (pRect.right > topPipeRect.left && pRect.left < topPipeRect.right && pRect.top < topPipeRect.bottom) ||
                (pRect.right > bottomPipeRect.left && pRect.left < bottomPipeRect.right && pRect.bottom > bottomPipeRect.top)
            ) {
                endGame();
                return false;
            }

            return pipe.x > -100;
        });

        setTick(t => t + 1);
        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const endGame = () => {
        stateRef.current = 'GAMEOVER';
        setGameState('GAMEOVER');
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };

    const flap = () => {
        if (stateRef.current === 'PLAYING') {
            playerVelocityRef.current = JUMP_FORCE;
        } else {
            startGame();
        }
    };

    useEffect(() => {
        if (gameState === 'GAMEOVER' && score > highScore) {
            setHighScore(score);
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        }
    }, [gameState]);

    useEffect(() => {
        const handleSpace = (e: KeyboardEvent) => { if (e.code === 'Space') flap(); };
        window.addEventListener('keydown', handleSpace);
        return () => {
            window.removeEventListener('keydown', handleSpace);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div className="relative w-full max-w-lg mx-auto bg-[#4a3b3d] p-2 md:p-4 rounded-[2rem] md:rounded-[3.5rem] shadow-2xl border-[6px] md:border-[12px] border-[#312526]">
            <div onClick={flap} className="relative w-full h-[400px] md:h-[450px] bg-gradient-to-b from-blue-300 to-blue-100 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-2 md:border-4 border-[#2d2223] cursor-pointer select-none">
                {/* Monkey */}
                <motion.div
                    animate={{ rotate: playerVelocityRef.current * 3, scaleX: -1 }}
                    style={{ left: PLAYER_X, top: playerYRef.current }}
                    className="absolute text-4xl md:text-5xl z-20"
                >
                    🐒
                </motion.div>

                {/* Pipes */}
                {pipesRef.current.map(pipe => (
                    <div key={pipe.id}>
                        <div className="absolute bg-[#e28b9d] border-4 border-[#312526] rounded-b-xl" style={{ left: pipe.x, top: 0, width: 60, height: pipe.gapTop }} />
                        <div className="absolute bg-[#e28b9d] border-4 border-[#312526] rounded-t-xl" style={{ left: pipe.x, top: pipe.gapTop + 140, width: 60, height: CONTAINER_HEIGHT - pipe.gapTop - 140 }} />
                    </div>
                ))}

                {/* Score */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
                    <div className="bg-white/90 px-4 py-1.5 rounded-full shadow-lg border-2 border-[#e28b9d]/20 text-xl font-black text-[#4a3b3d]">
                        {score}
                    </div>
                </div>

                <AnimatePresence>
                    {gameState === 'IDLE' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-white/40 backdrop-blur-xl z-40 flex flex-col items-center justify-center p-6 text-center text-[#4a3b3d]">
                            <div className="text-6xl md:text-8xl mb-3 text-[#e28b9d]">🐵</div>
                            <h3 className="font-serif text-2xl md:text-4xl font-bold mb-1">Flappy Monkey</h3>
                            <p className="font-caveat text-xl md:text-2xl mb-4">Tap to fly through the pipes!</p>
                            <button onClick={startGame} className="px-8 py-3 bg-[#e28b9d] text-white rounded-full font-bold text-lg shadow-lg">Start 🚀</button>
                        </motion.div>
                    )}
                    {gameState === 'GAMEOVER' && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 bg-red-50/60 backdrop-blur-xl z-40 flex flex-col items-center justify-center p-6 text-center">
                            <div className="text-6xl md:text-8xl mb-3">💥</div>
                            <h3 className="font-serif text-3xl md:text-5xl text-red-500 font-black mb-1 uppercase">OOPS!</h3>
                            <p className="font-caveat text-2xl md:text-3xl mb-6 text-[#4a3b3d]">Score: <span className="font-bold">{score}</span> | Best: {highScore}</p>
                            <button onClick={startGame} className="px-10 py-4 bg-[#4a3b3d] text-white rounded-full font-bold text-lg shadow-xl">Replay 🧸</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="h-8 md:h-12" />
        </div>
    );
};

export default function PlayAreaPage() {
    return (
        <main className="min-h-screen pb-40 relative overflow-hidden font-sans">
            <header className="relative z-10 pt-12 md:pt-16 pb-10 md:pb-12 text-center">
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="px-4">
                    <h1 className="font-serif text-4xl md:text-8xl text-[#4a3b3d] tracking-tighter drop-shadow-sm font-bold">
                        Play <span className="text-[#e28b9d] italic">Area</span>
                    </h1>
                    <p className="font-caveat text-xl md:text-4xl text-[#6b5b5d] mt-2 md:mt-4 opacity-70 italic">
                        Games for Punch! 🏆✨
                    </p>
                </motion.div>
            </header>

            <section className="relative z-10 max-w-3xl mx-auto px-4 space-y-16 md:space-y-24">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
                    <PunchRun />
                </motion.div>

                <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
                    <FlappyMonkey />
                </motion.div>

                <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
                    <MemoryMatcher />
                </motion.div>
            </section>

            <style jsx global>{`
                @keyframes track-fast {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-track-fast {
                    animation: track-fast linear infinite;
                }
            `}</style>
        </main>
    );
}
