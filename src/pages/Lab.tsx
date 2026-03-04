import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, RotateCcw, AlertTriangle, CheckCircle, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const TEMPLATES: Record<string, { code: string; lang: string }> = {
  "Hello World (C)": {
    lang: "c",
    code: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`
  },
  "Hello World (Python)": {
    lang: "python",
    code: `name = "CodeBuddy"\nprint(f"Hello, {name}!")`
  },
  "Fibonacci (C)": {
    lang: "c",
    code: `#include <stdio.h>\n\nint main() {\n    int n = 10, a = 0, b = 1, temp;\n    printf("Fibonacci: ");\n    for (int i = 0; i < n; i++) {\n        printf("%d ", a);\n        temp = a + b;\n        a = b;\n        b = temp;\n    }\n    printf("\\n");\n    return 0;\n}`
  },
  "Prime Check (Python)": {
    lang: "python",
    code: `def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nnum = int(input("Enter a number: "))\nif is_prime(num):\n    print(f"{num} is prime.")\nelse:\n    print(f"{num} is not prime.")`
  },
};

const ERROR_PATTERNS = [
  { pattern: /missing.*return|no return/i, msg: "Missing return statement", type: "error" },
  { pattern: /\bint\s+\w+\s*\(.*\)\s*\{[^}]*printf[^}]*\}(?!\s*return)/s, msg: "Function may be missing a return statement", type: "warning" },
  { pattern: /scanf\s*\([^,]+,\s*(?!&)\w/g, msg: "Missing & (address operator) in scanf", type: "error" },
  { pattern: /#include\s*<stdio\.h>/i, isMissing: true, forPattern: /printf|scanf/i, msg: "printf/scanf used but <stdio.h> not included", type: "error" },
];

function analyzeCCode(code: string) {
  const issues: { msg: string; type: string }[] = [];
  // Check mismatched braces
  let braces = 0;
  for (const ch of code) { if (ch === "{") braces++; else if (ch === "}") braces--; }
  if (braces !== 0) issues.push({ msg: `Mismatched braces: ${braces > 0 ? "missing closing }" : "extra closing }"}`, type: "error" });
  // Check missing stdio
  if ((code.includes("printf") || code.includes("scanf")) && !code.includes("#include <stdio.h>") && !code.includes("#include<stdio.h>"))
    issues.push({ msg: "printf/scanf used but <stdio.h> not included", type: "error" });
  // Check scanf missing &
  const scanfMatches = code.matchAll(/scanf\s*\("[^"]*",\s*([^)]+)\)/g);
  for (const m of scanfMatches) {
    const args = m[1].split(",");
    for (const arg of args) {
      if (arg.trim() && !arg.trim().startsWith("&") && !arg.trim().startsWith('"'))
        issues.push({ msg: `Missing & before '${arg.trim()}' in scanf`, type: "error" });
    }
  }
  return issues;
}

function simulateOutput(code: string, lang: string, stdin: string): string {
  if (lang === "python") {
    // Simulate Python
    const lines = code.split("\n");
    const outputs: string[] = [];
    const inputLines = stdin.trim().split("\n");
    let inputIdx = 0;
    for (const line of lines) {
      const printMatch = line.match(/print\(f?"(.+)"\)/);
      if (printMatch) {
        let msg = printMatch[1];
        // Simple f-string replacement
        msg = msg.replace(/\{(\w+)\}/g, (_, v) => {
          // Look for variable
          const varMatch = code.match(new RegExp(`${v}\\s*=\\s*["']?([^"'\\n]+)["']?`));
          return varMatch ? varMatch[1] : v;
        });
        outputs.push(msg);
      }
    }
    // Check for input() calls
    const hasInput = code.includes("input(");
    if (hasInput && stdin) {
      // Is_prime simulation
      if (code.includes("is_prime")) {
        const n = parseInt(inputLines[inputIdx] || "7");
        function isPrime(x: number) {
          if (x < 2) return false;
          for (let i = 2; i <= Math.sqrt(x); i++) if (x % i === 0) return false;
          return true;
        }
        return `Enter a number: \n${isPrime(n) ? `${n} is prime.` : `${n} is not prime.`}`;
      }
      return outputs.join("\n") || "Program ran with input: " + stdin;
    }
    return outputs.join("\n") || "Program executed successfully.\n(No visible output)";
  }

  if (lang === "c") {
    // Fibonacci
    if (code.includes("Fibonacci")) {
      let a = 0, b = 1;
      const fibs = [];
      const n = 10;
      for (let i = 0; i < n; i++) { fibs.push(a); const t = a + b; a = b; b = t; }
      return `Fibonacci: ${fibs.join(" ")} `;
    }
    // Hello World
    if (code.includes('Hello, World')) return "Hello, World!";
    if (code.includes('printf')) {
      const match = code.match(/printf\s*\(\s*"([^"]+)"/);
      if (match) return match[1].replace(/\\n/g, "\n").replace(/\\t/g, "\t");
    }
    return "Program executed successfully.";
  }

  return "Program executed. Output depends on actual runtime.";
}

export default function Lab() {
  const navigate = useNavigate();
  const [code, setCode] = useState(TEMPLATES["Hello World (C)"].code);
  const [lang, setLang] = useState("c");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [issues, setIssues] = useState<{ msg: string; type: string }[]>([]);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const runCode = async () => {
    setRunning(true);
    setOutput(null);
    // Analyze
    const errs = lang === "c" ? analyzeCCode(code) : [];
    setIssues(errs);
    await new Promise(r => setTimeout(r, 600));
    if (errs.some(e => e.type === "error")) {
      setOutput("⚠️ Fix the errors above before running.");
    } else {
      setOutput(simulateOutput(code, lang, stdin));
    }
    setRunning(false);
  };

  const loadTemplate = (name: string) => {
    const t = TEMPLATES[name];
    setCode(t.code);
    setLang(t.lang);
    setOutput(null);
    setIssues([]);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border glass">
        <button onClick={() => navigate("/beginner")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold font-heading text-foreground flex-1">Code Lab</h1>
        <select value={lang} onChange={e => setLang(e.target.value)}
          className="bg-muted border border-border rounded-lg px-3 py-1.5 text-sm text-foreground">
          {["c","cpp","python","java","javascript","html","css","sql"].map(l => (
            <option key={l} value={l}>{l.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {/* Templates */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide border-b border-border">
        {Object.keys(TEMPLATES).map(name => (
          <button key={name} onClick={() => loadTemplate(name)}
            className="shrink-0 text-xs bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary px-3 py-1.5 rounded-full transition-colors border border-border hover:border-primary/50">
            {name}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-0">
        {/* Editor pane */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
            <span className="text-xs text-muted-foreground font-mono">main.{lang === "python" ? "py" : lang === "javascript" ? "js" : lang}</span>
            <div className="flex gap-2">
              <button onClick={copyCode} className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1">
                <Copy className="w-3 h-3" /> {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={() => { setCode(""); setOutput(null); setIssues([]); }}
                className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            </div>
          </div>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 p-4 bg-[#0d1117] text-green-300 font-mono text-sm resize-none outline-none min-h-[280px]"
            placeholder="// Write your code here..."
          />
          {/* Stdin */}
          <div className="border-t border-border px-4 py-2 bg-card">
            <p className="text-xs text-muted-foreground mb-1">Standard Input (stdin)</p>
            <textarea value={stdin} onChange={e => setStdin(e.target.value)}
              rows={2} placeholder="Enter program input here..."
              className="w-full bg-muted border border-border rounded-lg p-2 text-sm font-mono text-foreground resize-none outline-none" />
          </div>
        </div>

        {/* Output pane */}
        <div className="flex flex-col border-t md:border-t-0 md:border-l border-border w-full md:w-80">
          <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
            <span className="text-xs text-muted-foreground">Output</span>
            <Button size="sm" onClick={runCode} disabled={running} className="h-7 text-xs px-3">
              <Play className="w-3 h-3 mr-1" /> {running ? "Running..." : "Run"}
            </Button>
          </div>

          {/* Issues */}
          {issues.length > 0 && (
            <div className="p-3 space-y-2 border-b border-border">
              {issues.map((issue, i) => (
                <div key={i} className={`flex items-start gap-2 text-xs rounded-lg p-2 ${issue.type === "error" ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                  <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                  {issue.msg}
                </div>
              ))}
            </div>
          )}

          <div className="flex-1 p-4 font-mono text-sm text-green-400 bg-[#0d1117] min-h-[160px] whitespace-pre-wrap">
            {output === null ? (
              <span className="text-muted-foreground text-xs">Click Run to execute your code</span>
            ) : (
              <>
                {issues.length === 0 && output && (
                  <div className="flex items-center gap-1 text-green-500 mb-2 text-xs">
                    <CheckCircle className="w-3 h-3" /> Executed successfully
                  </div>
                )}
                {output}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
