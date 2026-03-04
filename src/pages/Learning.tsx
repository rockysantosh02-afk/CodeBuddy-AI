import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, BookOpen, Code2, Brain, Lightbulb } from "lucide-react";
import { LANGUAGES, LEARNING_DATA } from "@/data/appData";
import { Badge } from "@/components/ui/badge";

type Step = "language" | "topic" | "concept";

export default function Learning() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("language");
  const [selLang, setSelLang] = useState("");
  const [selTopic, setSelTopic] = useState(0);
  const [activeTab, setActiveTab] = useState<"concept" | "logic" | "code" | "questions">("concept");

  const langData = selLang ? LEARNING_DATA[selLang] : null;
  const topicData = langData?.topics[selTopic];

  const goBack = () => {
    if (step === "concept") { setStep("topic"); setActiveTab("concept"); }
    else if (step === "topic") { setStep("language"); setSelLang(""); }
    else navigate("/beginner");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border glass sticky top-0 z-10">
        <button onClick={goBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-bold font-heading text-foreground text-sm">
            {step === "language" ? "Learning" : step === "topic" ? LANGUAGES.find(l => l.id === selLang)?.name : topicData?.name}
          </h1>
          <div className="flex items-center gap-1 mt-0.5">
            {["language", "topic", "concept"].map((s, i) => (
              <div key={s} className={`h-1 rounded-full transition-all ${step === s ? "w-8 bg-primary" : (["language","topic","concept"].indexOf(step) > i ? "w-4 bg-primary/60" : "w-4 bg-muted")}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <AnimatePresence mode="wait">
          {/* STEP 1: Language */}
          {step === "language" && (
            <motion.div key="lang" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-muted-foreground text-sm mb-4">Choose a programming language to start learning</p>
              <div className="grid grid-cols-2 gap-3">
                {LANGUAGES.map(lang => (
                  <motion.div key={lang.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { setSelLang(lang.id); setStep("topic"); }}
                    className="glass rounded-xl p-4 cursor-pointer border-2 transition-all hover:border-opacity-60"
                    style={{ borderColor: lang.color + "44" }}>
                    <div className="text-3xl mb-2">{lang.icon}</div>
                    <h3 className="font-bold text-foreground text-sm">{lang.name}</h3>
                    <p className="text-muted-foreground text-xs mt-1">{LEARNING_DATA[lang.id]?.topics.length || 0} topics</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Topics */}
          {step === "topic" && langData && (
            <motion.div key="topic" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-muted-foreground text-sm mb-4">
                {LANGUAGES.find(l => l.id === selLang)?.icon} {LANGUAGES.find(l => l.id === selLang)?.name} — Select a topic
              </p>
              <div className="space-y-2">
                {langData.topics.map((topic, i) => (
                  <motion.div key={i} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
                    onClick={() => { setSelTopic(i); setStep("concept"); setActiveTab("concept"); }}
                    className="glass rounded-xl p-4 cursor-pointer flex items-center justify-between hover:glow-border transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">{i + 1}</div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{topic.name}</p>
                        <p className="text-muted-foreground text-xs">{topic.concepts.length} concepts</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Concept Detail */}
          {step === "concept" && topicData && (
            <motion.div key="concept" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {/* Tabs */}
              <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
                {(["concept","logic","code","questions"] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${activeTab === tab ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === "concept" && (
                <div className="space-y-4">
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      <h3 className="font-bold text-foreground text-sm">What is it?</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{topicData.explanation}</p>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <h3 className="font-bold text-foreground text-sm mb-3">Key Concepts</h3>
                    <div className="flex flex-wrap gap-2">
                      {topicData.concepts.map((c, i) => (
                        <span key={i} className="bg-primary/20 text-primary border border-primary/30 rounded-full px-3 py-1 text-xs font-medium">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "logic" && (
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    <h3 className="font-bold text-foreground text-sm">Logic & How it Works</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{topicData.logic}</p>
                </div>
              )}

              {activeTab === "code" && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 className="w-4 h-4 text-green-400" />
                    <h3 className="font-bold text-foreground text-sm">Sample Program</h3>
                  </div>
                  <div className="code-block text-green-300 text-xs rounded-xl overflow-x-auto">
                    <pre>{topicData.sampleCode}</pre>
                  </div>
                  <button onClick={() => { localStorage.setItem("cb_lab_code", topicData.sampleCode); navigate("/beginner/lab"); }}
                    className="mt-3 w-full btn-glow text-white text-sm font-semibold py-2.5 rounded-xl">
                    Open in Lab →
                  </button>
                </div>
              )}

              {activeTab === "questions" && (
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <h3 className="font-bold text-foreground text-sm">Practice Questions</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      `Explain ${topicData.name} in your own words.`,
                      `Write a program that demonstrates: ${topicData.concepts[0]}`,
                      `What is the output of the sample program? Trace it step by step.`,
                      `What are common mistakes beginners make with ${topicData.name}?`,
                    ].map((q, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary font-bold shrink-0">{i + 1}.</span>
                        <span className="text-muted-foreground">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
