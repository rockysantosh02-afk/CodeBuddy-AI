import { useState } from "react";
import { Plus, Trash2, ToggleLeft, ToggleRight, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

interface Webhook { id: string; url: string; events: string[]; active: boolean; }

const INITIAL: Webhook[] = [
  { id: "wh1", url: "https://myapp.com/webhooks/codebuddy", events: ["quiz.completed", "user.signup"], active: true },
  { id: "wh2", url: "https://myapp.com/webhooks/progress", events: ["course.completed"], active: false },
];

const LOGS = [
  { event: "quiz.completed", url: "https://myapp.com/webhooks/codebuddy", status: 200, time: "2m ago" },
  { event: "user.signup", url: "https://myapp.com/webhooks/codebuddy", status: 200, time: "15m ago" },
  { event: "course.completed", url: "https://myapp.com/webhooks/progress", status: 404, time: "1h ago" },
];

export default function WebhooksPage() {
  const [hooks, setHooks] = useState<Webhook[]>(INITIAL);
  const [showAdd, setShowAdd] = useState(false);
  const [newUrl, setNewUrl] = useState("");

  const addWebhook = () => {
    if (!newUrl) return;
    setHooks([...hooks, { id: "wh" + Date.now(), url: newUrl, events: ["quiz.completed"], active: true }]);
    setNewUrl("");
    setShowAdd(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-heading text-foreground">Webhooks</h1>
        <Button onClick={() => setShowAdd(!showAdd)}><Plus className="w-4 h-4 mr-2" /> Add Webhook</Button>
      </div>

      {showAdd && (
        <div className="glass glow-border rounded-xl p-4 space-y-3">
          <Input placeholder="https://yourapp.com/webhook" value={newUrl} onChange={e => setNewUrl(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={addWebhook}>Add</Button>
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {hooks.map(hook => (
          <div key={hook.id} className="glass rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm text-foreground truncate">{hook.url}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {hook.events.map(e => <Badge key={e} variant="secondary" className="text-xs">{e}</Badge>)}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Switch checked={hook.active} onCheckedChange={v => setHooks(hooks.map(h => h.id === hook.id ? { ...h, active: v } : h))} />
                <button onClick={() => setHooks(hooks.filter(h => h.id !== hook.id))} className="text-muted-foreground hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-xl p-4">
        <h2 className="font-bold text-foreground mb-3 text-sm">Delivery Logs</h2>
        <div className="space-y-2">
          {LOGS.map((log, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0 text-xs">
              <div className="flex items-center gap-2">
                {log.status === 200 ? <CheckCircle className="w-3 h-3 text-green-400" /> : <XCircle className="w-3 h-3 text-red-400" />}
                <span className="text-foreground font-medium">{log.event}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-mono ${log.status === 200 ? "text-green-400" : "text-red-400"}`}>{log.status}</span>
                <span className="text-muted-foreground">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
