import { Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SsoPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold font-heading text-foreground">SSO & Identity</h1>
        <Badge variant="secondary">Enterprise</Badge>
      </div>

      <div className="glass rounded-xl p-5 border border-yellow-500/20 bg-yellow-500/5">
        <p className="text-yellow-400 text-sm font-medium">⚠️ SSO is available on the Enterprise plan only.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {[
          { name: "SAML 2.0", desc: "Connect with Okta, Azure AD, Google Workspace", icon: "🔐", status: "Available" },
          { name: "OAuth 2.0 / OIDC", desc: "Standard OAuth flow with any provider", icon: "🔗", status: "Available" },
          { name: "Active Directory", desc: "Microsoft AD / LDAP integration", icon: "🏢", status: "Coming Soon" },
          { name: "Google SSO", desc: "One-click login with Google", icon: "🔵", status: "Available" },
        ].map(p => (
          <div key={p.name} className="glass rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{p.icon}</span>
              <Badge variant={p.status === "Coming Soon" ? "secondary" : "success"} className="text-xs">{p.status}</Badge>
            </div>
            <h3 className="font-bold text-foreground text-sm">{p.name}</h3>
            <p className="text-muted-foreground text-xs mt-1">{p.desc}</p>
            <Button size="sm" variant="outline" className="mt-3 text-xs" disabled={p.status === "Coming Soon"}>
              Configure <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
