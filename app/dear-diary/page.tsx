"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type DiaryEntry = {
    id: string;
    content: string;
    mood: string;
    createdAt: string | null;
};

const MOODS = [
    { emoji: "😊", label: "Happy" },
    { emoji: "🥰", label: "Loved" },
    { emoji: "✨", label: "Sparkly" },
    { emoji: "🌸", label: "Soft" },
    { emoji: "☁️", label: "Dreamy" },
    { emoji: "🌙", label: "Quiet" },
    { emoji: "💖", label: "Crushing" },
    { emoji: "🍃", label: "Fresh" }
];

export default function DearDiaryPage() {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [content, setContent] = useState("");
    const [selectedMood, setSelectedMood] = useState("😊");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const formatDate = (iso: string | null) => {
        if (!iso) return "";
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return "";
        return d.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const loadEntries = async () => {
        try {
            const res = await fetch("/api/diary");
            if (res.ok) {
                const data = await res.json();
                setEntries(data);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setSaving(true);
        try {
            const res = await fetch("/api/diary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, mood: selectedMood }),
            });

            if (res.ok) {
                const newEntry = await res.json();
                setEntries((prev) => [newEntry, ...prev]);
                setContent("");
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.8 },
                    colors: ['#ffc0cb', '#e28b9d', '#ffd700', '#fff']
                });
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to forget this memory? 🥺🦋")) return;

        try {
            const res = await fetch(`/api/diary/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setEntries((prev) => prev.filter((entry) => entry.id !== id));
                // Small sad confetti but also cleansing
                confetti({
                    particleCount: 20,
                    spread: 30,
                    origin: { y: 0.5 },
                    colors: ['#fff', '#f0f0f0']
                });
            }
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    return (
        <main className="min-h-screen pb-40 relative bg-[#fffafb] overflow-hidden">
            {/* Sparkly Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] left-[10%] text-pink-200/20 text-4xl animate-pulse">✨</div>
                <div className="absolute top-[30%] right-[15%] text-pink-200/20 text-5xl animate-bounce" style={{ animationDuration: '4s' }}>🌸</div>
                <div className="absolute bottom-[20%] left-[5%] text-yellow-200/20 text-6xl animate-pulse">☁️</div>
                <div className="absolute bottom-[40%] right-[10%] text-pink-200/20 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>💖</div>
            </div>

            <header className="relative z-10 pt-20 pb-16 text-center">
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    <div className="inline-block relative">
                        <motion.span
                            animate={{ rotate: [0, 20, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute -top-8 -left-12 text-5xl"
                        >
                            🎀
                        </motion.span>
                        <h1 className="font-serif text-6xl md:text-8xl text-[#4a3b3d] tracking-tighter drop-shadow-sm">
                            Dear <span className="text-[#e28b9d] italic">Diary</span>
                        </h1>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute -bottom-6 -right-14 text-5xl"
                        >
                            🧸
                        </motion.span>
                    </div>
                    <p className="font-caveat text-3xl text-[#6b5b5d] mt-6 opacity-80">
                        Whisper your secrets to the stars... ✨
                    </p>
                </motion.div>
            </header>

            <section className="relative z-10 max-w-3xl mx-auto px-4 mb-24">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(226,139,157,0.15)] border-8 border-[#fff1f3] relative overflow-hidden group"
                >
                    <div className="h-6 bg-gradient-to-r from-[#e28b9d]/30 via-[#e28b9d]/10 to-[#e28b9d]/30 w-full" />
                    <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
                        <div className="space-y-6">
                            <label className="font-serif text-2xl text-[#4a3b3d] flex items-center gap-3">
                                <span>Mood check:</span>
                                <span className="text-sm font-sans uppercase tracking-[0.2em] text-[#e28b9d] font-bold">Today is {MOODS.find(m => m.emoji === selectedMood)?.label}</span>
                            </label>
                            <div className="flex flex-wrap gap-4">
                                {MOODS.map((m) => (
                                    <motion.button
                                        key={m.emoji}
                                        type="button"
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setSelectedMood(m.emoji)}
                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-all shadow-sm ${selectedMood === m.emoji
                                            ? "bg-[#e28b9d] text-white shadow-[#e28b9d]/40 shadow-xl -translate-y-2"
                                            : "bg-[#fffdfd] hover:bg-[#fff1f3] text-gray-400"
                                            }`}
                                    >
                                        {m.emoji}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div className="relative group/input">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Once upon a time..."
                                className="w-full h-80 bg-[#fffdfa] border-none focus:ring-0 p-10 font-caveat text-3xl text-[#4a3b3d] placeholder:opacity-20 resize-none rounded-[2rem] shadow-inner transition-all leading-[3.5rem]"
                                style={{
                                    backgroundImage: "linear-gradient(#f9f0f2 1px, transparent 1px)",
                                    backgroundSize: "100% 3.5rem",
                                    paddingTop: "3rem"
                                }}
                            />
                            <div className="absolute top-6 left-6 w-1.5 h-[calc(100%-3rem)] bg-[#e28b9d]/20 rounded-full" />
                            <div className="absolute bottom-6 right-8 text-4xl opacity-20 group-focus-within/input:opacity-100 transition-opacity">🖋️</div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={saving || !content.trim()}
                            className="w-full py-6 rounded-2xl bg-[#4a3b3d] text-white font-bold text-xl shadow-[0_20px_40px_rgba(74,59,61,0.3)] hover:bg-black disabled:opacity-30 transition-all flex items-center justify-center gap-4"
                        >
                            {saving ? "Locking it away..." : "Save this memory ✨"}
                        </motion.button>
                    </form>
                </motion.div>
            </section>

            <section className="relative z-10 max-w-3xl mx-auto px-4 space-y-16">
                <AnimatePresence mode="popLayout">
                    {entries.map((entry, index) => (
                        <motion.div
                            key={entry.id}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-12 rounded-[3rem] shadow-[0_15px_40px_rgba(0,0,0,0.03)] border-2 border-[#fff1f3] relative group"
                        >
                            {/* Cuter Delete Button */}
                            <button
                                onClick={() => handleDelete(entry.id)}
                                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-red-50 text-red-300 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                title="Forget this entry"
                            >
                                <span className="text-2xl">×</span>
                            </button>

                            {/* Washi Tape */}
                            <div
                                className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 z-10 opacity-70"
                                style={{
                                    background: index % 2 === 0 ? '#e28b9d' : '#ffd700',
                                    clipPath: 'polygon(0% 15%, 10% 0%, 20% 15%, 30% 0%, 40% 15%, 50% 0%, 60% 15%, 70% 0%, 80% 15%, 90% 0%, 100% 15%, 100% 85%, 90% 100%, 80% 85%, 70% 100%, 60% 85%, 50% 100%, 40% 85%, 30% 100%, 20% 85%, 10% 100%, 0% 85%)',
                                    transform: `rotate(${index % 2 === 0 ? 2 : -2}deg)`
                                }}
                            />

                            <div className="absolute -top-8 -left-6 text-6xl drop-shadow-md">
                                {entry.mood}
                            </div>

                            <div className="space-y-6 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#e28b9d]/30 to-transparent" />
                                    <p className="text-xs uppercase tracking-[0.3em] font-bold text-[#e28b9d]">
                                        {formatDate(entry.createdAt)}
                                    </p>
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#e28b9d]/30 to-transparent" />
                                </div>
                                <p className="font-caveat text-4xl text-[#4a3b3d] leading-relaxed whitespace-pre-wrap px-4">
                                    {entry.content}
                                </p>
                            </div>

                            {/* Decorative stickers */}
                            {index % 3 === 0 && <div className="absolute -bottom-6 -left-4 text-5xl rotate-12 drop-shadow-sm select-none">🍯</div>}
                            {index % 3 === 1 && <div className="absolute -bottom-8 -right-4 text-6xl -rotate-12 drop-shadow-sm select-none">🦋</div>}
                            {index % 3 === 2 && <div className="absolute bottom-10 -right-8 text-5xl rotate-45 drop-shadow-sm select-none">✨</div>}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {loading && (
                    <div className="text-center py-20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            className="text-6xl"
                        >
                            🍥
                        </motion.div>
                    </div>
                )}

                {!loading && entries.length === 0 && (
                    <div className="text-center py-40">
                        <div className="text-9xl mb-8 opacity-10">🕯️</div>
                        <p className="font-serif italic text-2xl text-gray-300">Your secret garden is waiting to grow...</p>
                    </div>
                )}
            </section>
        </main>
    );
}
