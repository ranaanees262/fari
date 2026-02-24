"use client";

import { FormEvent, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type VisionItem = {
  id: string;
  caption: string;
  mimeType: string;
  imageBase64: string;
  createdAt: string | null;
};

export default function VisionBoardPage() {
  const [items, setItems] = useState<VisionItem[]>([]);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const boardRef = useRef<HTMLDivElement>(null);

  const formatDate = (iso: string | null) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  const loadItems = async () => {
    try {
      const res = await fetch("/api/vision-board");
      if (!res.ok) return;
      const data = (await res.json()) as VisionItem[];
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    setUploading(true);
    try {
      const res = await fetch("/api/vision-board", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) return;

      const created = (await res.json()) as VisionItem;
      setItems((prev) => [created, ...prev]);
      setCaption("");
      setFile(null);
      setPreview(null);

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffc0cb', '#ff69b4', '#b5c4b8', '#ffd700']
      });

      const input = document.getElementById("vision-image-input") as HTMLInputElement | null;
      if (input) input.value = "";
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`/api/vision-board/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caption: editCaption }),
      });

      if (res.ok) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, caption: editCaption } : item))
        );
        setEditingId(null);
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.8 },
          colors: ['#81d4fa', '#b5c4b8']
        });
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this dream? 🥺")) return;

    try {
      const res = await fetch(`/api/vision-board/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <main className="min-h-screen pb-40 relative overflow-hidden">
      <header className="relative z-10 pt-8 md:pt-16 pb-8 md:pb-12 text-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="inline-block relative">
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute -top-8 -left-8 md:-top-10 md:-left-10 text-2xl md:text-4xl"
            >
              🎈
            </motion.span>
            <h1 className="font-serif text-3xl md:text-7xl text-[#4a3b3d] tracking-tight drop-shadow-sm font-bold">
              My <span className="text-[#e28b9d] italic">Dream</span> Land
            </h1>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-2 -right-8 md:-bottom-4 md:-right-10 text-2xl md:text-4xl"
            >
              🍭
            </motion.span>
          </div>
          <p className="font-caveat text-xl md:text-2xl text-[#6b5b5d] mt-1 md:mt-3 opacity-80">
            A place for all my happy "soon" ✨
          </p>
        </motion.div>
      </header>

      {/* Fun but Managed Upload Form */}
      <section className="relative z-20 max-w-xl md:max-w-2xl mx-auto px-4 mb-12 md:mb-20">
        <motion.div
          className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 shadow-[0_20px_60px_rgba(226,139,157,0.15)] border-2 md:border-4 border-[#fdf2f4] relative"
        >
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 md:gap-8 items-center">
            <label
              htmlFor="vision-image-input"
              className={`relative flex-shrink-0 w-24 h-24 md:w-44 md:h-44 cursor-pointer rounded-[1rem] md:rounded-[1.5rem] bg-[#fff9fb] border-2 md:border-3 border-dashed border-[#e28b9d]/30 transition-all hover:border-[#e28b9d] group overflow-hidden flex items-center justify-center ${preview ? 'border-solid' : ''}`}
            >
              {!preview ? (
                <div className="text-center p-2">
                  <div className="text-2xl md:text-4xl group-hover:scale-110 transition-transform">📸</div>
                  <div className="font-bold text-[#e28b9d] text-[8px] uppercase tracking-widest mt-0.5">Add Photo</div>
                </div>
              ) : (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              )}
              <input id="vision-image-input" type="file" accept="image/*" className="hidden" onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setFile(f);
                if (f) {
                  const reader = new FileReader();
                  reader.onload = (ev) => setPreview(ev.target?.result as string);
                  reader.readAsDataURL(f);
                } else {
                  setPreview(null);
                }
              }} />
            </label>

            <div className="flex-1 w-full flex flex-col gap-2 md:gap-4">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write the dream here..."
                className="w-full h-20 md:h-32 rounded-[1rem] md:rounded-[1.5rem] border-none bg-[#fff9fb] p-4 md:p-6 text-base md:text-lg font-caveat text-[#4a3b3d] focus:ring-4 focus:ring-[#e28b9d]/10 transition-all resize-none shadow-inner"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={uploading || !file}
                className="w-full py-2.5 md:py-4 rounded-xl bg-[#e28b9d] text-white text-sm md:text-base font-bold shadow-lg hover:bg-[#d67b8d] disabled:opacity-40 transition-all flex items-center justify-center gap-3"
              >
                {uploading ? (
                  <span className="w-5 h-5 md:w-6 md:h-6 border-2 md:border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Pin My Dream!</span>
                    <span className="text-base md:text-xl">✨</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Balanced down fun board */}
      <section ref={boardRef} className="relative z-10 px-5 md:px-8 max-w-[1400px] mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 md:py-40">
            <div className="text-5xl md:text-6xl animate-spin">🍭</div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-32 md:py-40 opacity-40">
            <div className="text-6xl md:text-7xl mb-4">🌈</div>
            <p className="font-serif italic text-lg md:text-xl">A blank map for our future...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => {
                const rotation = (index % 5) * 4 - 8; // -8 to 8 degrees
                const tapeColor = ['#ffc0cb', '#b5c4b8', '#ffe57f', '#81d4fa', '#f06292'][index % 5];
                const isEditing = editingId === item.id;

                return (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, rotate: rotation, opacity: 1 }}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 100 }}
                    drag={!isEditing}
                    dragConstraints={boardRef}
                    className="relative group cursor-grab active:cursor-grabbing"
                  >
                    {/* Balanced Washi Tape */}
                    <div
                      className="absolute -top-3 md:-top-5 left-1/2 -translate-x-1/2 w-20 md:w-32 h-6 md:h-8 z-20 opacity-90 shadow-sm"
                      style={{
                        background: tapeColor,
                        clipPath: 'polygon(0% 10%, 5% 0%, 10% 10%, 15% 0%, 20% 10%, 25% 0%, 30% 10%, 35% 0%, 40% 10%, 45% 0%, 50% 10%, 55% 0%, 60% 10%, 65% 0%, 70% 10%, 75% 0%, 80% 10%, 85% 0%, 90% 10%, 95% 0%, 100% 10%, 100% 90%, 95% 100%, 90% 90%, 85% 100%, 80% 90%, 75% 100%, 70% 90%, 65% 100%, 60% 90%, 55% 100%, 50% 90%, 45% 100%, 40% 90%, 35% 100%, 30% 90%, 25% 100%, 20% 90%, 15% 100%, 10% 90%, 5% 100%, 0% 90%)',
                        transform: `rotate(${(index % 3 === 0 ? 3 : -3)}deg)`
                      }}
                    />

                    {/* Proportional Polaroid */}
                    <div className="bg-white p-2 md:p-4 pb-8 md:pb-12 shadow-[0_10px_25px_rgba(0,0,0,0.08)] rounded-sm border border-gray-50 relative group">
                      {/* Action Buttons Overlay */}
                      <div className="absolute top-1 right-1 md:top-2 md:right-2 flex gap-1 md:gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-30">
                        <button
                          onClick={() => {
                            setEditingId(item.id);
                            setEditCaption(item.caption);
                          }}
                          className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[10px] md:text-sm hover:bg-[var(--rose)] hover:text-white transition-colors"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[10px] md:text-sm hover:bg-red-500 hover:text-white transition-colors"
                        >
                          🗑️
                        </button>
                      </div>

                      <div className="aspect-square bg-gray-50 overflow-hidden relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`data:${item.mimeType};base64,${item.imageBase64}`}
                          alt={item.caption}
                          className="w-full h-full object-cover pointer-events-none"
                        />
                        {/* Timestamp "stamped" on photo */}
                        {item.createdAt && (
                          <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 px-1.5 py-0.5 bg-white/30 backdrop-blur-[2px] rounded text-[8px] md:text-[9px] font-bold text-white shadow-sm pointer-events-none tracking-wider">
                            {formatDate(item.createdAt)}
                          </div>
                        )}
                      </div>

                      <div className="mt-2 md:mt-4 px-1 md:px-2">
                        {isEditing ? (
                          <div className="space-y-1 md:space-y-2">
                            <textarea
                              value={editCaption}
                              onChange={(e) => setEditCaption(e.target.value)}
                              className="w-full p-1.5 md:p-2 text-xs md:text-sm font-caveat border border-[var(--rose)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
                              autoFocus
                            />
                            <div className="flex justify-end gap-1.5 md:gap-2">
                              <button
                                onClick={() => setEditingId(null)}
                                className="text-[8px] md:text-[10px] uppercase font-bold text-gray-400 hover:text-gray-600"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleUpdate(item.id)}
                                className="text-[8px] md:text-[10px] uppercase font-bold text-[var(--rose)] hover:text-[var(--deep-rose)]"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="font-caveat text-xl md:text-2xl text-[#4a3b3d] leading-none text-center">
                            {item.caption || "A happy dream!"}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Fun Stickers */}
                    {index % 4 === 0 && <div className="absolute -top-4 -right-4 text-3xl md:text-4xl drop-shadow-md select-none rotate-12">💖</div>}
                    {index % 4 === 1 && <div className="absolute -bottom-4 -left-4 text-3xl md:text-4xl drop-shadow-md select-none -rotate-12">✨</div>}
                    {index % 4 === 2 && <div className="absolute top-1/2 -right-6 text-3xl md:text-4xl drop-shadow-md select-none rotate-12">🎀</div>}
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>
    </main>
  );
}
