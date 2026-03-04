import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PLANS = [
  {
    name: "Starter", price: { monthly: 0, yearly: 0 }, badge: null, color: "#6b7280",
    features: ["1,000 API calls/month", "2 team members", "Basic analytics", "Community support", "Code execution (10s limit)"],
    missing: ["Webhooks", "SSO", "Priority support"],
  },
  {
    name: "Pro", price: { monthly: 29, yearly: 23 }, badge: "Popular", color: "#8b5cf6",
    features: ["50,000 API calls/month", "10 team members", "Advanced analytics", "Webhooks (5)", "Priority email support", "Code execution (30s)", "Audit logs"],
    missing: ["SSO", "Custom models"],
  },
  {
    name: "Enterprise", price: { monthly: 99, yearly: 79 }, badge: null, color: "#3b82f6",
    features: ["Unlimited API calls", "Unlimited members", "Full analytics + export", "Unlimited webhooks", "24/7 SLA support", "SSO (SAML/OAuth)", "Custom fine-tuned models", "Custom rate limits", "Dedicated infra"],
    missing: [],
  },
];

export default function BillingPage() {
  const [yearly, setYearly] = useState(false);
  const [current, setCurrent] = useState("Pro");

  // Usage meter
  const used = 31400;
  const limit = 50000;
  const pct = (used / limit) * 100;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-heading text-foreground">Billing</h1>
        <div className="flex items-center gap-2 bg-muted rounded-full p-1">
          <button onClick={() => setYearly(false)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${!yearly ? "bg-primary text-white" : "text-muted-foreground"}`}>Monthly</button>
          <button onClick={() => setYearly(true)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${yearly ? "bg-primary text-white" : "text-muted-foreground"}`}>Yearly <span className="text-green-400">-20%</span></button>
        </div>
      </div>

      {/* Current usage */}
      <div className="glass glow-border rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-bold text-foreground text-sm">Current Plan: <span className="text-primary">Pro</span></span>
          </div>
          <span className="text-xs text-muted-foreground">{used.toLocaleString()} / {limit.toLocaleString()} calls</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%`, background: pct > 80 ? "linear-gradient(90deg, #f59e0b, #ef4444)" : undefined }} />
        </div>
        <p className="text-xs text-muted-foreground mt-1">{pct.toFixed(1)}% used this billing period</p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-4">
        {PLANS.map(plan => (
          <div key={plan.name} className={`rounded-xl p-5 border-2 relative ${plan.name === current ? "border-primary/60 bg-primary/5" : "border-border glass"}`}>
            {plan.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">{plan.badge}</div>}
            <h3 className="font-bold font-heading text-foreground text-lg">{plan.name}</h3>
            <div className="my-3">
              <span className="text-3xl font-bold font-heading text-foreground">${yearly ? plan.price.yearly : plan.price.monthly}</span>
              <span className="text-muted-foreground text-sm">/mo</span>
            </div>
            <ul className="space-y-2 mb-4">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-xs text-foreground">
                  <Check className="w-3 h-3 text-green-400 mt-0.5 shrink-0" /> {f}
                </li>
              ))}
              {plan.missing.map(f => (
                <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground/50 line-through">
                  <span className="w-3 h-3 shrink-0">—</span> {f}
                </li>
              ))}
            </ul>
            <Button className="w-full" variant={plan.name === current ? "outline" : "default"} disabled={plan.name === current}>
              {plan.name === current ? "Current Plan" : plan.name === "Starter" ? "Downgrade" : "Upgrade"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
