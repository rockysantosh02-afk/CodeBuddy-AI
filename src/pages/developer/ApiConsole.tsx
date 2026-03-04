import { useState } from "react";
import { Play, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ENDPOINTS = [
  { method: "POST", path: "/v1/chat/completions", desc: "AI chat completions" },
  { method: "POST", path: "/v1/code/execute", desc: "Execute code in sandbox" },
  { method: "POST", path: "/v1/code/explain", desc: "Explain code with AI" },
  { method: "POST", path: "/v1/quiz/generate", desc: "Generate quiz questions" },
  { method: "GET", path: "/v1/user/progress", desc: "Get user progress" },
  { method: "POST", path: "/v1/debug", desc: "Debug code issues" },
];

const SAMPLE_RESPONSE = `{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1706745600,
  "model": "codebuddy-1",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Here's how to fix the segmentation fault..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 42,
    "completion_tokens": 128,
    "total_tokens": 170
  }
}`;

export default function ApiConsole() {
  const [selEndpoint, setSelEndpoint] = useState(ENDPOINTS[0]);
  const [body, setBody] = useState(`{\n  "messages": [\n    {\n      "role": "user",\n      "content": "Explain recursion in C"\n    }\n  ],\n  "max_tokens": 500\n}`);
  const [response, setResponse] = useState("");
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<number | null>(null);

  const runRequest = async () => {
    setRunning(true);
    setResponse("");
    await new Promise(r => setTimeout(r, 800));
    setStatus(200);
    setResponse(SAMPLE_RESPONSE);
    setRunning(false);
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold font-heading text-foreground">API Console</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Endpoints list */}
        <div className="glass rounded-xl p-3">
          <p className="text-xs text-muted-foreground font-semibold mb-2 uppercase tracking-wider">Endpoints</p>
          <div className="space-y-1">
            {ENDPOINTS.map((ep, i) => (
              <button key={i} onClick={() => setSelEndpoint(ep)}
                className={`w-full text-left rounded-lg px-3 py-2 text-xs transition-all ${selEndpoint.path === ep.path ? "bg-primary/20 text-primary border border-primary/30" : "text-muted-foreground hover:bg-muted"}`}>
                <span className={`font-mono font-bold mr-2 ${ep.method === "GET" ? "text-green-400" : "text-blue-400"}`}>{ep.method}</span>
                <span className="font-mono">{ep.path}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Request / Response */}
        <div className="md:col-span-2 space-y-3">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={selEndpoint.method === "GET" ? "success" : "default"}>{selEndpoint.method}</Badge>
              <code className="text-sm text-foreground font-mono">https://api.codebuddy.app{selEndpoint.path}</code>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{selEndpoint.desc}</p>
            {selEndpoint.method === "POST" && (
              <>
                <p className="text-xs text-muted-foreground mb-1">Request Body (JSON)</p>
                <textarea value={body} onChange={e => setBody(e.target.value)} rows={8}
                  className="w-full bg-[#0d1117] text-green-300 font-mono text-xs rounded-lg p-3 outline-none resize-none" />
              </>
            )}
            <Button onClick={runRequest} disabled={running} className="mt-2">
              <Play className="w-3 h-3 mr-2" />{running ? "Sending..." : "Send Request"}
            </Button>
          </div>

          {response && (
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">Response</p>
                  {status && <Badge variant="success">{status} OK</Badge>}
                </div>
                <button onClick={copyResponse} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                  {copied ? <><CheckCircle className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>
              <pre className="bg-[#0d1117] text-green-300 font-mono text-xs rounded-lg p-3 overflow-auto max-h-60">{response}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
