import { motion } from "framer-motion";
import { Activity, Code2, Users, Zap, TrendingUp, ArrowUpRight, Terminal, Key } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATS = [
  { label: "API Calls (Today)", value: "24,891", change: "+12%", icon: Activity, color: "#8b5cf6" },
  { label: "Active Users", value: "1,247", change: "+8%", icon: Users, color: "#3b82f6" },
  { label: "Avg Response", value: "142ms", change: "-5%", icon: Zap, color: "#10b981" },
  { label: "Uptime", value: "99.97%", change: "+0.02%", icon: TrendingUp, color: "#f59e0b" },
];

const FEATURES = [
  { label: "AI Chat API", status: "active", desc: "Real-time code assistance" },
  { label: "Code Execution", status: "active", desc: "Sandboxed runner" },
  { label: "Webhooks", status: "active", desc: "Event notifications" },
  { label: "Team Access", status: "beta", desc: "Multi-user access" },
  { label: "SSO Integration", status: "enterprise", desc: "SAML / OAuth 2.0" },
  { label: "Custom Models", status: "enterprise", desc: "Fine-tuned models" },
  { label: "Priority Support", status: "enterprise", desc: "24/7 SLA support" },
  { label: "Audit Logs", status: "pro", desc: "Full activity logs" },
  { label: "Analytics", status: "pro", desc: "Detailed insights" },
  { label: "Rate Limit Config", status: "pro", desc: "Custom limits" },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Developer Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Monitor your CodeBuddy API usage and manage resources</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
              <span className={`text-xs font-medium ${s.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                {s.change}
              </span>
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* API Key */}
      <div className="glass glow-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-foreground flex items-center gap-2"><Key className="w-4 h-4 text-primary" /> API Key</h2>
          <Button size="sm" variant="outline">Regenerate</Button>
        </div>
        <div className="bg-muted rounded-lg px-4 py-3 font-mono text-sm text-muted-foreground flex items-center justify-between">
          <span>cb_live_••••••••••••••••••••••••••••••••</span>
          <button className="text-primary text-xs hover:underline">Reveal</button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Keep your API key secret. Never expose it in client-side code.</p>
      </div>

      {/* Features grid */}
      <div>
        <h2 className="font-bold text-foreground mb-3">Platform Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {FEATURES.map((f, i) => (
            <div key={i} className="glass rounded-xl p-3">
              <Badge variant={f.status === "active" ? "success" : f.status === "beta" ? "warning" : f.status === "pro" ? "default" : "secondary"} className="text-xs mb-2">
                {f.status}
              </Badge>
              <p className="font-semibold text-foreground text-xs">{f.label}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="glass rounded-xl p-4">
        <h2 className="font-bold text-foreground mb-3">Recent Activity</h2>
        <div className="space-y-2">
          {[
            { event: "API call: /v1/chat/completions", time: "2 min ago", status: "200" },
            { event: "Webhook delivered: quiz.completed", time: "15 min ago", status: "200" },
            { event: "Team member invited: dev@example.com", time: "1h ago", status: "OK" },
            { event: "API call: /v1/code/execute", time: "2h ago", status: "200" },
            { event: "Billing plan upgraded: Starter → Pro", time: "1d ago", status: "OK" },
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground">{a.event}</span>
              <div className="flex items-center gap-3 ml-2 shrink-0">
                <span className="text-xs text-green-400 font-mono">{a.status}</span>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
