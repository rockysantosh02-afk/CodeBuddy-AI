import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { LANGUAGES, MINDMAP_DATA } from "@/data/appData";

export default function MindMap() {
  const navigate = useNavigate();
  const [selLang, setSelLang] = useState("");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const mapData = selLang ? (MINDMAP_DATA as any)[selLang] : null;

  const toggle = (i: number) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #0d1117 50%, #090d16 100%)" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 sticky top-0 z-20" style={{ background: "rgba(10,14,26,0.9)", backdropFilter: "blur(16px)" }}>
        <button onClick={() => selLang ? setSelLang("") : navigate("/beginner")} className="text-white/50 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold font-heading text-white flex-1">
          {selLang ? `${LANGUAGES.find(l => l.id === selLang)?.name} Mind Map` : "Mind Map"}
        </h1>
        {/* Dot grid bg indicator */}
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/60" />)}
        </div>
      </div>

      {/* Dot grid background */}
      <div className="flex-1 relative overflow-auto"
        style={{ backgroundImage: "radial-gradient(rgba(139,92,246,0.15) 1px, transparent 1px)", backgroundSize: "24px 24px" }}>

        {/* Language select */}
        {!selLang && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5">
            <p className="text-white/50 text-sm mb-4">Choose a language to explore its mind map</p>
            <div className="grid grid-cols-2 gap-3">
              {LANGUAGES.map(lang => (
                <motion.div key={lang.id} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  onClick={() => { setSelLang(lang.id); setExpanded({}); }}
                  className="cursor-pointer rounded-2xl p-5 border transition-all"
                  style={{ background: lang.color + "11", borderColor: lang.color + "33", boxShadow: `0 0 20px ${lang.color}11` }}>
                  <div className="text-3xl mb-2">{lang.icon}</div>
                  <h3 className="font-bold text-white text-sm">{lang.name}</h3>
                  <p className="text-white/40 text-xs mt-1">{(MINDMAP_DATA as any)[lang.id]?.categories.length} categories</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mind Map */}
        {selLang && mapData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5">
            {/* Root node */}
            <div className="flex justify-center mb-6">
              <motion.div animate={{ boxShadow: [`0 0 20px ${mapData.color}44`, `0 0 40px ${mapData.color}88`, `0 0 20px ${mapData.color}44`] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-2xl px-6 py-3 font-bold font-heading text-white text-lg border"
                style={{ background: mapData.color + "33", borderColor: mapData.color + "66" }}>
                {mapData.root}
              </motion.div>
            </div>

            {/* Connector line */}
            <div className="flex justify-center mb-4">
              <div className="w-0.5 h-6" style={{ background: `linear-gradient(${mapData.color}, transparent)` }} />
            </div>

            {/* Categories */}
            <div className="space-y-3">
              {mapData.categories.map((cat: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  {/* Category connector */}
                  <div className="flex items-center gap-2 mb-1 px-2">
                    <div className="w-3 h-0.5" style={{ background: cat.color }} />
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
                  </div>

                  {/* Category card */}
                  <div className="rounded-xl border overflow-hidden"
                    style={{ borderColor: cat.color + "44", background: cat.color + "08" }}>
                    <button className="w-full px-4 py-3 flex items-center justify-between text-left"
                      onClick={() => toggle(i)}>
                      <span className="font-bold text-white text-sm">{cat.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full text-white/60" style={{ background: cat.color + "22" }}>
                          {cat.concepts.length}
                        </span>
                        <motion.div animate={{ rotate: expanded[i] ? 180 : 0 }}>
                          <ChevronDown className="w-4 h-4 text-white/50" />
                        </motion.div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {expanded[i] && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                          <div className="px-4 pb-4 flex flex-wrap gap-2">
                            {cat.concepts.map((concept: string, j: number) => (
                              <motion.span key={j} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: j * 0.04 }}
                                className="px-3 py-1.5 rounded-full text-xs font-medium border text-white/80"
                                style={{ background: cat.color + "18", borderColor: cat.color + "44" }}>
                                {concept}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Expand All button */}
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => {
                const allExpanded = mapData.categories.every((_: any, i: number) => expanded[i]);
                if (allExpanded) setExpanded({});
                else {
                  const all: Record<number, boolean> = {};
                  mapData.categories.forEach((_: any, i: number) => all[i] = true);
                  setExpanded(all);
                }
              }}
              className="mt-4 w-full py-3 rounded-xl text-white/70 text-sm font-medium border border-white/10 hover:border-primary/50 transition-all"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              {mapData.categories.every((_: any, i: number) => expanded[i]) ? "Collapse All" : "Expand All Concepts"}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
