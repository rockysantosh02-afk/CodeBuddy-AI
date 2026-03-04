import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Bell, Palette, Globe, HelpCircle, Info, ChevronRight, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SECTIONS = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "language", label: "Language", icon: Globe },
  { id: "help", label: "Help & Support", icon: HelpCircle },
  { id: "about", label: "About", icon: Info },
];

export default function Settings() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [section, setSection] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [notifs, setNotifs] = useState({ streak: true, quiz: true, tips: false });
  const [name, setName] = useState(user?.user_metadata?.full_name || "");

  if (section) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border glass sticky top-0 z-10">
          <button onClick={() => setSection(null)} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold font-heading text-foreground capitalize">{section}</h1>
        </div>

        <div className="p-5">
          {section === "account" && (
            <div className="space-y-4">
              <div className="glass rounded-xl p-4">
                <label className="text-xs text-muted-foreground font-medium block mb-1">Display Name</label>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="glass rounded-xl p-4">
                <label className="text-xs text-muted-foreground font-medium block mb-1">Email</label>
                <p className="text-foreground text-sm">{user?.email || "guest@codebuddy.app"}</p>
              </div>
              <Button className="w-full">Save Changes</Button>
              <Button variant="destructive" className="w-full" onClick={() => { signOut(); navigate("/"); }}>
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </Button>
            </div>
          )}
          {section === "notifications" && (
            <div className="glass rounded-xl divide-y divide-border">
              {Object.entries(notifs).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between p-4">
                  <span className="text-foreground text-sm capitalize">{key === "streak" ? "Streak Reminders" : key === "quiz" ? "Quiz Alerts" : "Daily Tips"}</span>
                  <Switch checked={val} onCheckedChange={v => setNotifs(p => ({ ...p, [key]: v }))} />
                </div>
              ))}
            </div>
          )}
          {section === "appearance" && (
            <div className="glass rounded-xl p-4 flex items-center justify-between">
              <span className="text-foreground text-sm">Dark Mode</span>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          )}
          {section === "language" && (
            <div className="glass rounded-xl divide-y divide-border">
              {["English", "Hindi", "Telugu", "Tamil", "Kannada", "Marathi"].map(l => (
                <button key={l} className="w-full flex items-center justify-between p-4 text-sm text-foreground hover:bg-primary/10 transition-colors">
                  {l}
                  {l === "English" && <span className="text-primary text-xs font-bold">Active</span>}
                </button>
              ))}
            </div>
          )}
          {section === "help" && (
            <div className="space-y-3">
              {["Report a Bug", "Request a Feature", "Contact Support", "FAQs"].map(item => (
                <button key={item} className="w-full glass rounded-xl p-4 flex items-center justify-between text-sm text-foreground hover:glow-border transition-all">
                  {item} <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          )}
          {section === "about" && (
            <div className="glass rounded-xl p-5 text-center">
              <div className="text-4xl mb-3">💻</div>
              <h2 className="font-bold font-heading gradient-text text-xl mb-1">CodeBuddy</h2>
              <p className="text-muted-foreground text-sm mb-4">Version 1.0.0</p>
              <p className="text-muted-foreground text-xs">Built for B.Tech freshers & beginners. Your AI-powered coding companion.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border glass sticky top-0 z-10">
        <button onClick={() => navigate("/beginner")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold font-heading text-foreground">Settings</h1>
      </div>

      <div className="p-5">
        <div className="glass rounded-xl divide-y divide-border">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setSection(s.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-primary/10 transition-colors">
              <div className="flex items-center gap-3">
                <s.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground text-sm font-medium">{s.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
