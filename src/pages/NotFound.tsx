import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center text-center px-4">
      <div>
        <div className="text-7xl mb-4">🤔</div>
        <h1 className="text-4xl font-bold font-heading gradient-text mb-2">404</h1>
        <p className="text-muted-foreground mb-6">Oops! This page doesn't exist.</p>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    </div>
  );
}
