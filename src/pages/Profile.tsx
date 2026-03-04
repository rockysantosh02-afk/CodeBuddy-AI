import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Zap, Trophy, Code2, BookOpen, Brain } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const PROGRESS_DATA = [
  { lang: "Python", pct: 68, color: "#eab308" },
  { lang: "C", pct: 45, color: "#3b82f6" },
  { lang: "JavaScript", pct: 30, color: "#f97316" },
];

const BADGES = [
  { icon: "🐍", name: "Python Starter", earned: true },
  { icon: "⚡", name: "7-Day Streak", earned: true },
  { icon: "🏆", name: "Quiz Champion", earned: true },
  { icon: "🔷", name: "C Master", earned: false },
  { icon: "🌐", name: "Web Dev", earned: false },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || (isGuest ? "Guest User" : "Student");
  const email = user?.email || (isGuest ? "guest@codebuddy.app" : "");

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border glass sticky top-0 z-10">
        <button onClick={() => navigate("/beginner")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold font-heading text-foreground">Profile</h1>
      </div>

      <div className="p-5">
        {/* Avatar & Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <div className="w-20 h-20 rounded-full btn-glow flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-white">
            {displayName[0]?.toUpperCase()}
          </div>
          <h2 className="text-xl font-bold font-heading text-foreground">{displayName}</h2>
          <p className="text-muted-foreground text-sm">{email}</p>
          <div className="flex justify-center gap-2 mt-2">
            <Badge variant="default">Level 4</Badge>
            <Badge variant="secondary">B.Tech Fresher</Badge>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "XP", value: "1,240", icon: Star, color: "text-yellow-400" },
            { label: "Streak", value: "7d", icon: Zap, color: "text-blue-400" },
            { label: "Badges", value: "3", icon: Trophy, color: "text-purple-400" },
          ].map(s => (
            <div key={s.label} className="glass rounded-xl p-3 text-center">
              <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.color}`} />
              <p className="font-bold text-foreground">{s.value}</p>
              <p className="text-muted-foreground text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Course Progress */}
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-400" /> Learning Progress</h3>
          <div className="space-y-3">
            {PROGRESS_DATA.map(p => (
              <div key={p.lang}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{p.lang}</span>
                  <span className="text-foreground font-medium">{p.pct}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="glass rounded-xl p-4">
          <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-400" /> Badges</h3>
          <div className="grid grid-cols-3 gap-3">
            {BADGES.map(b => (
              <div key={b.name} className={`rounded-xl p-3 text-center ${b.earned ? "glass glow-border" : "glass opacity-40"}`}>
                <div className="text-2xl mb-1">{b.icon}</div>
                <p className="text-xs font-medium text-foreground leading-tight">{b.name}</p>
                {!b.earned && <p className="text-xs text-muted-foreground">Locked</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
