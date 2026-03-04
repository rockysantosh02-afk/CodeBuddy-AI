import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Code2, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signUp, continueAsGuest, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") await signIn(email, password);
      else await signUp(email, password, name);
      navigate("/beginner");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    navigate("/beginner");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass glow-border rounded-2xl p-8 w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl btn-glow flex items-center justify-center">
            <Code2 className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-heading gradient-text">CodeBuddy</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {mode === "login" ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        {/* Tab toggle */}
        <div className="flex rounded-lg bg-muted p-1 mb-6">
          {(["login", "signup"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === m ? "bg-primary text-white" : "text-muted-foreground"}`}>
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="pl-10" required />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input type={showPass ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10" required />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">OR</span></div>
        </div>

        <Button variant="outline" onClick={handleGuest} className="w-full">
          Continue as Guest
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-primary hover:underline font-medium">
            {mode === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
