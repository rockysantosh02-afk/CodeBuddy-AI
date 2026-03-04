import { useState } from "react";
import { Plus, Trash2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const ENV_OPTIONS = ["Python 3.12", "Node.js 20", "C/GCC 13", "Java 21", "Go 1.22"];

interface Env { id: string; name: string; runtime: string; status: "running" | "stopped" | "building"; }

export default function SandboxPage() {
  const [envs, setEnvs] = useState<Env[]>([
    { id: "e1", name: "python-sandbox", runtime: "Python 3.12", status: "running" },
    { id: "e2", name: "node-playground", runtime: "Node.js 20", status: "stopped" },
  ]);
  const [newName, setNewName] = useState("");
  const [newRuntime, setNewRuntime] = useState(ENV_OPTIONS[0]);

  const create = () => {
    if (!newName) return;
    setEnvs([...envs, { id: "e" + Date.now(), name: newName, runtime: newRuntime, status: "building" }]);
    setNewName("");
    setTimeout(() => setEnvs(prev => prev.map(e => e.status === "building" ? { ...e, status: "running" } : e)), 1500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold font-heading text-foreground">Sandbox Environments</h1>

      <div className="glass glow-border rounded-xl p-4">
        <h2 className="font-bold text-foreground text-sm mb-3">Create Environment</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input placeholder="my-sandbox-name" value={newName} onChange={e => setNewName(e.target.value)} className="flex-1" />
          <select value={newRuntime} onChange={e => setNewRuntime(e.target.value)} className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground">
            {ENV_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
          <Button onClick={create}><Plus className="w-4 h-4 mr-2" /> Create</Button>
        </div>
      </div>

      <div className="space-y-3">
        {envs.map(env => (
          <div key={env.id} className="glass rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm font-semibold text-foreground">{env.name}</p>
                <Badge variant={env.status === "running" ? "success" : env.status === "building" ? "warning" : "secondary"}>
                  {env.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{env.runtime}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled={env.status !== "running"}>
                <Play className="w-3 h-3 mr-1" /> Open
              </Button>
              <button onClick={() => setEnvs(envs.filter(e => e.id !== env.id))} className="text-muted-foreground hover:text-red-400 p-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
