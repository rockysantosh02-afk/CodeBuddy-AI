import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Code2, ArrowRight } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-accent/8 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold font-heading gradient-text mb-3">CodeBuddy</h1>
        <p className="text-muted-foreground text-base">Choose your mode to get started</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/beginner")}
          className="glass glow-border rounded-2xl p-8 cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3 font-heading">Beginner</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Perfect for B.Tech freshers. Learn coding from scratch with AI guidance, quizzes, and visual mind maps.
          </p>
          <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold">
            Get Started <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/developer")}
          className="glass glow-border rounded-2xl p-8 cursor-pointer group"
          style={{ borderColor: "rgba(139,92,246,0.4)" }}
        >
          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Code2 className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3 font-heading">Developer</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Advanced tools for developers. API console, team management, analytics, billing, and enterprise features.
          </p>
          <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold">
            Enter Dashboard <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
