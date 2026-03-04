import { Cloud, Server, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const STEPS = [
  "Create a CodeBuddy Enterprise account",
  "Generate API keys in the Dashboard",
  "Configure environment variables",
  "Install the CodeBuddy SDK (npm/pip)",
  "Initialize the client in your app",
  "Test with sandbox endpoints",
  "Switch to production endpoints",
  "Monitor via Analytics dashboard",
];

export default function DeploymentPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold font-heading text-foreground">Deployment Guide</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { name: "Cloud Hosted", icon: Cloud, desc: "Managed by CodeBuddy. No infra needed.", status: "Recommended" },
          { name: "Self-Hosted", icon: Server, desc: "Deploy on your own servers with Docker.", status: "Enterprise" },
          { name: "Edge Deploy", icon: Globe, desc: "Deploy to 300+ edge locations globally.", status: "Enterprise" },
        ].map(d => (
          <div key={d.name} className="glass rounded-xl p-4">
            <d.icon className="w-8 h-8 text-primary mb-3" />
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-foreground text-sm">{d.name}</h3>
              <Badge variant={d.status === "Recommended" ? "success" : "secondary"} className="text-xs">{d.status}</Badge>
            </div>
            <p className="text-muted-foreground text-xs">{d.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-xl p-5">
        <h2 className="font-bold text-foreground mb-4">Setup Steps</h2>
        <div className="space-y-3">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i < 4 ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-muted text-muted-foreground border border-border"}`}>
                {i < 4 ? "✓" : i + 1}
              </div>
              <span className={`text-sm ${i < 4 ? "text-foreground" : "text-muted-foreground"}`}>{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-xl p-5">
        <h2 className="font-bold text-foreground text-sm mb-3">Quick Start (Node.js)</h2>
        <pre className="code-block text-green-300 text-xs">
{`npm install @codebuddy/sdk

const { CodeBuddy } = require('@codebuddy/sdk');

const cb = new CodeBuddy({
  apiKey: process.env.CB_API_KEY,
  environment: 'production'
});

const response = await cb.chat.complete({
  messages: [{ role: 'user', content: 'Explain recursion' }]
});
console.log(response.content);`}
        </pre>
      </div>
    </div>
  );
}
