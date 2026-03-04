import { useState } from "react";
import { Plus, Crown, Shield, User, Mail, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const ROLES = ["Owner", "Admin", "Developer", "Viewer"];
const MEMBERS = [
  { name: "Rocky Santosh", email: "rocky@codebuddy.app", role: "Owner", joined: "Jan 2026", avatar: "R" },
  { name: "Priya Sharma", email: "priya@team.com", role: "Admin", joined: "Feb 2026", avatar: "P" },
  { name: "Arun Kumar", email: "arun@team.com", role: "Developer", joined: "Feb 2026", avatar: "A" },
];

const PERMS = [
  { feature: "API Console", Owner: true, Admin: true, Developer: true, Viewer: false },
  { feature: "Webhooks", Owner: true, Admin: true, Developer: false, Viewer: false },
  { feature: "Billing", Owner: true, Admin: false, Developer: false, Viewer: false },
  { feature: "Analytics", Owner: true, Admin: true, Developer: true, Viewer: true },
  { feature: "Team Manage", Owner: true, Admin: true, Developer: false, Viewer: false },
];

export default function TeamManagement() {
  const [members, setMembers] = useState(MEMBERS);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Developer");

  const invite = () => {
    if (!inviteEmail) return;
    setMembers([...members, { name: inviteEmail.split("@")[0], email: inviteEmail, role: inviteRole, joined: "Mar 2026", avatar: inviteEmail[0].toUpperCase() }]);
    setInviteEmail("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold font-heading text-foreground">Team Management</h1>

      {/* Invite */}
      <div className="glass glow-border rounded-xl p-4">
        <h2 className="font-bold text-foreground text-sm mb-3">Invite Member</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input placeholder="email@example.com" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} className="flex-1" />
          <select value={inviteRole} onChange={e => setInviteRole(e.target.value)} className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground">
            {ROLES.slice(1).map(r => <option key={r}>{r}</option>)}
          </select>
          <Button onClick={invite}><Plus className="w-4 h-4 mr-2" /> Invite</Button>
        </div>
      </div>

      {/* Members */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="font-bold text-foreground text-sm">Members ({members.length})</h2>
        </div>
        <div className="divide-y divide-border">
          {members.map((m, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full btn-glow flex items-center justify-center text-white text-sm font-bold">{m.avatar}</div>
                <div>
                  <p className="text-sm font-medium text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={m.role === "Owner" ? "default" : m.role === "Admin" ? "warning" : "secondary"}>{m.role}</Badge>
                {m.role !== "Owner" && (
                  <button onClick={() => setMembers(members.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permissions matrix */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="font-bold text-foreground text-sm">Permissions Matrix</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Feature</th>
                {ROLES.map(r => <th key={r} className="px-4 py-3 text-muted-foreground font-medium text-center">{r}</th>)}
              </tr>
            </thead>
            <tbody>
              {PERMS.map((p, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="px-4 py-2 text-foreground text-xs">{p.feature}</td>
                  {ROLES.map(r => (
                    <td key={r} className="px-4 py-2 text-center">
                      {(p as any)[r] ? <span className="text-green-400 text-lg">✓</span> : <span className="text-muted-foreground/30 text-lg">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
