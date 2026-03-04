import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import BeginnerHome from "@/pages/BeginnerHome";
import Lab from "@/pages/Lab";
import Learning from "@/pages/Learning";
import Quiz from "@/pages/Quiz";
import MindMap from "@/pages/MindMap";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import DeveloperLayout from "@/pages/developer/DeveloperLayout";
import Dashboard from "@/pages/developer/Dashboard";
import ApiConsole from "@/pages/developer/ApiConsole";
import WebhooksPage from "@/pages/developer/WebhooksPage";
import TeamManagement from "@/pages/developer/TeamManagement";
import AnalyticsPage from "@/pages/developer/AnalyticsPage";
import BillingPage from "@/pages/developer/BillingPage";
import SandboxPage from "@/pages/developer/SandboxPage";
import SsoPage from "@/pages/developer/SsoPage";
import DeploymentPage from "@/pages/developer/DeploymentPage";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/beginner" element={<BeginnerHome />} />
          <Route path="/beginner/lab" element={<Lab />} />
          <Route path="/beginner/learning" element={<Learning />} />
          <Route path="/beginner/quiz" element={<Quiz />} />
          <Route path="/beginner/mindmap" element={<MindMap />} />
          <Route path="/beginner/profile" element={<Profile />} />
          <Route path="/beginner/settings" element={<Settings />} />
          <Route path="/developer" element={<DeveloperLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="api" element={<ApiConsole />} />
            <Route path="webhooks" element={<WebhooksPage />} />
            <Route path="team" element={<TeamManagement />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="sandbox" element={<SandboxPage />} />
            <Route path="sso" element={<SsoPage />} />
            <Route path="deployment" element={<DeploymentPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
