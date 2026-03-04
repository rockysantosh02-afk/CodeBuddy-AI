# CodeBuddy – Your AI-Powered Coding Companion

> Built for B.Tech freshers & beginners 🎓

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials (optional — app works without it)

# 3. Start development server
npm run dev

# 4. Open http://localhost:5173
```

## 📁 Project Structure

```
src/
├── pages/
│   ├── Index.tsx          # Splash screen
│   ├── Home.tsx           # Beginner / Developer choice
│   ├── Auth.tsx           # Login / Signup
│   ├── BeginnerHome.tsx   # B.Tech beginner dashboard
│   ├── Lab.tsx            # Code editor & runner
│   ├── Learning.tsx       # Language → Topic → Concept flow
│   ├── Quiz.tsx           # MCQs + Coding challenges
│   ├── MindMap.tsx        # Visual mind map explorer
│   ├── Profile.tsx        # User profile & badges
│   ├── Settings.tsx       # App settings
│   └── developer/         # Developer mode (API, team, analytics...)
├── data/
│   └── appData.ts         # All languages, topics, quiz data, mindmap data
├── contexts/
│   └── AuthContext.tsx    # Auth state management
└── components/
    └── ui/                # Reusable UI components
```

## 🌟 Features

### Beginner Mode (B.Tech)
- **Learning** — 8 languages × 4-6 topics with concept, logic, sample code & questions
- **Code Lab** — Write & run code with error detection (20+ checks) and stdin simulation
- **Quiz** — MCQs (Easy/Medium/Hard) + Coding challenges + Mini tests
- **Mind Map** — Visual flowchart explorer for all 8 languages

### Developer Mode
- API Console with 6 endpoints
- Webhooks management
- Team & permissions matrix
- Analytics with charts
- Billing & plan management
- Sandbox environments
- SSO & Deployment guides

## 🔧 Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Without Supabase: The app works fully with local auth (localStorage).

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **Recharts** (analytics charts)
- **Radix UI** (accessible components)
- **Supabase** (auth & database, optional)
- **React Router v6** (routing)

## 📱 Supported Languages

C, C++, Java, Python, HTML, CSS, JavaScript, SQL

---

Made with ❤️ for B.Tech students by the CodeBuddy team
