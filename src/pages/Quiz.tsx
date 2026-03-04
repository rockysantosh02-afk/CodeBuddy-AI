import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw, ChevronRight, Brain } from "lucide-react";
import { LANGUAGES, QUIZ_DATA } from "@/data/appData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Screen = "home" | "lang" | "difficulty" | "quiz" | "result";

export default function Quiz() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>("home");
  const [mode, setMode] = useState<"mcq" | "coding" | "mini">("mcq");
  const [selLang, setSelLang] = useState("");
  const [selDiff, setSelDiff] = useState<"easy"|"medium"|"hard">("easy");
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showExpl, setShowExpl] = useState(false);

  const startQuiz = () => {
    const data = (QUIZ_DATA.mcq as any)[selLang]?.[selDiff] || (QUIZ_DATA.mcq as any)["c"]["easy"];
    setQuestions(data);
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setShowExpl(false);
    setScreen("quiz");
  };

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExpl(true);
    const q = questions[current];
    setAnswers([...answers, idx === q.ans]);
  };

  const nextQuestion = () => {
    if (current + 1 >= questions.length) {
      setScreen("result");
    } else {
      setCurrent(current + 1);
      setSelected(null);
      setShowExpl(false);
    }
  };

  const score = answers.filter(Boolean).length;

  const goBack = () => {
    if (screen === "quiz" || screen === "result") { setScreen("difficulty"); }
    else if (screen === "difficulty") setScreen("lang");
    else if (screen === "lang") setScreen("home");
    else navigate("/beginner");
  };

  const supportedLangs = Object.keys(QUIZ_DATA.mcq);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border glass sticky top-0 z-10">
        <button onClick={goBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold font-heading text-foreground flex-1">Quiz</h1>
        {screen === "quiz" && (
          <span className="text-xs text-muted-foreground">{current + 1} / {questions.length}</span>
        )}
      </div>

      <div className="flex-1 overflow-auto p-4">
        <AnimatePresence mode="wait">
          {/* HOME */}
          {screen === "home" && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-muted-foreground text-sm mb-4">Test your coding knowledge</p>
              <div className="grid gap-3">
                {[
                  { id: "mcq", title: "MCQs", icon: Brain, desc: "Multiple choice questions by language & difficulty", color: "#8b5cf6" },
                  { id: "coding", title: "Coding Challenge", icon: ChevronRight, desc: "Solve real coding problems with evaluation", color: "#3b82f6" },
                  { id: "mini", title: "Mini Tests", icon: Trophy, desc: "Track progress with mini tests per language", color: "#10b981" },
                ].map(item => (
                  <motion.div key={item.id} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
                    onClick={() => { setMode(item.id as any); setScreen("lang"); }}
                    className="glass rounded-xl p-4 cursor-pointer flex items-center gap-4 hover:glow-border transition-all">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: item.color + "22", border: `1px solid ${item.color}44` }}>
                      <item.icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                      <p className="text-muted-foreground text-xs mt-0.5">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* LANG SELECT */}
          {screen === "lang" && (
            <motion.div key="lang" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-muted-foreground text-sm mb-4">Choose language</p>
              <div className="grid grid-cols-2 gap-3">
                {LANGUAGES.filter(l => mode !== "mcq" || supportedLangs.includes(l.id)).map(lang => (
                  <motion.div key={lang.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { setSelLang(lang.id); setScreen(mode === "mcq" ? "difficulty" : "quiz"); if (mode !== "mcq") startQuiz(); }}
                    className="glass rounded-xl p-4 cursor-pointer border-2 transition-all"
                    style={{ borderColor: lang.color + "44" }}>
                    <div className="text-3xl mb-2">{lang.icon}</div>
                    <h3 className="font-bold text-foreground text-sm">{lang.name}</h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* DIFFICULTY */}
          {screen === "difficulty" && (
            <motion.div key="diff" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-muted-foreground text-sm mb-4">Select difficulty</p>
              <div className="space-y-3">
                {(["easy", "medium", "hard"] as const).map(d => (
                  <motion.div key={d} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
                    onClick={() => { setSelDiff(d); startQuiz(); }}
                    className="glass rounded-xl p-4 cursor-pointer flex items-center justify-between hover:glow-border">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${d === "easy" ? "bg-green-400" : d === "medium" ? "bg-yellow-400" : "bg-red-400"}`} />
                      <span className="font-semibold text-foreground capitalize">{d}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {(QUIZ_DATA.mcq as any)[selLang]?.[d]?.length || 0} questions
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* QUIZ */}
          {screen === "quiz" && questions.length > 0 && (
            <motion.div key={`q${current}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {/* Progress */}
              <div className="progress-bar mb-4">
                <div className="progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
              </div>

              <div className="glass rounded-xl p-4 mb-4">
                <p className="text-xs text-muted-foreground mb-2">Question {current + 1}</p>
                <p className="font-semibold text-foreground text-sm leading-relaxed">{questions[current].q}</p>
              </div>

              <div className="space-y-2 mb-4">
                {questions[current].options.map((opt: string, i: number) => {
                  const isCorrect = i === questions[current].ans;
                  const isSelected = selected === i;
                  let cls = "glass border-2 border-transparent";
                  if (selected !== null) {
                    if (isCorrect) cls = "bg-green-500/20 border-green-500/60";
                    else if (isSelected) cls = "bg-red-500/20 border-red-500/60";
                  }
                  return (
                    <motion.button key={i} whileHover={selected === null ? { x: 4 } : {}} onClick={() => handleSelect(i)}
                      className={`w-full rounded-xl p-3 text-left text-sm flex items-center gap-3 transition-all ${cls}`}>
                      <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-foreground">{opt}</span>
                      {selected !== null && isCorrect && <CheckCircle className="w-4 h-4 text-green-400 ml-auto shrink-0" />}
                      {selected !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400 ml-auto shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>

              {showExpl && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-xl p-3 mb-4 border border-blue-500/30 bg-blue-500/10">
                  <p className="text-xs text-blue-300 font-semibold mb-1">💡 Explanation</p>
                  <p className="text-sm text-muted-foreground">{questions[current].explanation}</p>
                </motion.div>
              )}

              {selected !== null && (
                <Button onClick={nextQuestion} className="w-full">
                  {current + 1 >= questions.length ? "See Results" : "Next Question"} →
                </Button>
              )}
            </motion.div>
          )}

          {/* RESULT */}
          {screen === "result" && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5 }}
                className="text-6xl mb-4">{score >= questions.length * 0.7 ? "🏆" : score >= questions.length * 0.4 ? "👍" : "📚"}</motion.div>
              <h2 className="text-3xl font-bold font-heading gradient-text mb-2">{score}/{questions.length}</h2>
              <p className="text-muted-foreground mb-2">
                {score >= questions.length * 0.7 ? "Excellent work!" : score >= questions.length * 0.4 ? "Good effort! Keep going." : "Keep practicing!"}
              </p>
              <div className="flex justify-center gap-2 mb-6">
                <Badge variant={score >= questions.length * 0.7 ? "success" : "warning"}>
                  {Math.round((score / questions.length) * 100)}% Score
                </Badge>
                <Badge variant="secondary">{selLang.toUpperCase()} · {selDiff}</Badge>
              </div>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => { setScreen("difficulty"); setCurrent(0); setAnswers([]); }}>
                  <RotateCcw className="w-4 h-4 mr-2" /> Retry
                </Button>
                <Button onClick={() => setScreen("home")}>New Quiz</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
