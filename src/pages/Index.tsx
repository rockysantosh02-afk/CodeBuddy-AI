import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-[100px]" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 mx-auto mb-8 rounded-2xl btn-glow flex items-center justify-center"
        >
          <Code2 className="w-12 h-12 text-white" />
        </motion.div>

        <h1 className="text-5xl font-bold font-heading gradient-text mb-3">CodeBuddy</h1>
        <p className="text-muted-foreground text-lg mb-2">Your AI-Powered Coding Companion</p>
        <p className="text-muted-foreground/60 text-sm mb-10 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" /> Built for B.Tech freshers &amp; beginners
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/home")}
          className="btn-glow text-white font-bold text-lg px-10 py-4 rounded-full mb-4"
        >
          Start →
        </motion.button>
      </motion.div>
    </div>
  );
}
