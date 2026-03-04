import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, FlaskConical, Brain, Map, User, Settings, LogOut, Code2, Star, Zap, Trophy } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NAV_ITEMS = [
  { id: "learning", label: "Learning", icon: BookOpen, color: "#3b82f6", desc: "Step-by-step language guides" },
  { id: "lab", label: "Code Lab", icon: Code2, color: "#8b5cf6", desc: "Write & test code live" },
  { id: "quiz", label: "Quiz", icon: Brain, color: "#10b981", desc: "MCQs & coding challenges" },
  { id: "mindmap", label: "Mind Map", icon: Map, color: "#f59e0b", desc: "Visual concept explorer" },
];

const STATS = [
  { label: "XP Earned", value: "1,240", icon: Star, color: "text-yellow-400" },
  { label: "Streak", value: "7 days", icon: Zap, color: "text-blue-400" },
  { label: "Badges", value: "5", icon: Trophy, color: "text-purple-400" },
];

export default function BeginnerHome() {
  const navigate = useNavigate();
  const { user, isGuest, signOut } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || (isGuest ? "Guest" : "Student");

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div>
          <p className="text-muted-foreground text-sm">Welcome back,</p>
          <h2 className="text-xl font-bold font-heading text-foreground">{displayName} 👋</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/beginner/profile")} className="w-10 h-10 rounded-full btn-glow flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </button>
          <button onClick={() => navigate("/beginner/settings")} className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button onClick={() => { signOut(); navigate("/"); }} className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted-foreground hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {STATS.map(s => (
            <div key={s.label} className="glass rounded-xl p-3 text-center">
              <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.color}`} />
              <p className="font-bold text-foreground text-lg">{s.value}</p>
              <p className="text-muted-foreground text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Current course progress */}
        <div className="glass glow-border rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">Current: Python for Beginners</p>
            <span className="text-xs text-primary font-bold">68%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "68%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Next: Functions & Scope</p>
        </div>

        {/* Main nav cards */}
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Modules</h3>
        <div className="grid grid-cols-2 gap-4">
          {NAV_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/beginner/${item.id}`)}
              className="glass rounded-2xl p-5 cursor-pointer card-hover"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{ background: item.color + "22", border: `1px solid ${item.color}44` }}>
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">{item.label}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent activity */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Recent Activity</h3>
          <div className="space-y-2">
            {[
              { text: "Completed Python Quiz — Score: 8/10", time: "2h ago", color: "text-green-400" },
              { text: "Debugged 'factorial.c' in Lab", time: "5h ago", color: "text-blue-400" },
              { text: "Explored C Mind Map — Pointers", time: "1d ago", color: "text-purple-400" },
            ].map((a, i) => (
              <div key={i} className="glass rounded-xl px-4 py-3 flex items-center justify-between">
                <span className={`text-sm ${a.color}`}>{a.text}</span>
                <span className="text-xs text-muted-foreground ml-2 shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
