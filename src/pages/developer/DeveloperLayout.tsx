import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Code2, LayoutDashboard, Terminal, Webhook, Users, BarChart2, CreditCard, Box, Lock, Cloud, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const NAV = [
  { path: "/developer", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/developer/api", label: "API Console", icon: Terminal },
  { path: "/developer/webhooks", label: "Webhooks", icon: Webhook },
  { path: "/developer/team", label: "Team", icon: Users },
  { path: "/developer/analytics", label: "Analytics", icon: BarChart2 },
  { path: "/developer/billing", label: "Billing", icon: CreditCard },
  { path: "/developer/sandbox", label: "Sandbox", icon: Box },
  { path: "/developer/sso", label: "SSO", icon: Lock },
  { path: "/developer/deployment", label: "Deployment", icon: Cloud },
];

export default function DeveloperLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-60 bg-card border-r border-border flex flex-col transition-transform md:translate-x-0 md:static md:h-screen",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
          <div className="w-8 h-8 rounded-lg btn-glow flex items-center justify-center">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold font-heading gradient-text text-sm">CodeBuddy Dev</span>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden ml-auto text-muted-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map(item => (
            <button key={item.path} onClick={() => { navigate(item.path); setSidebarOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive(item.path, item.exact)
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}>
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <button onClick={() => navigate("/home")} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </button>
          <button onClick={() => { signOut(); navigate("/"); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-400 hover:text-red-300 transition-colors">
            <LogOut className="w-3 h-3" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <p className="text-sm text-muted-foreground hidden md:block">Developer Dashboard</p>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-muted-foreground hidden sm:block">
              {user?.email || "developer@codebuddy.app"}
            </span>
            <div className="w-8 h-8 rounded-full btn-glow flex items-center justify-center text-xs text-white font-bold">
              {(user?.email?.[0] || "D").toUpperCase()}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
