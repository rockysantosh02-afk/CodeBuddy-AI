import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const DAILY = [
  { day: "Mon", calls: 18000, users: 820 }, { day: "Tue", calls: 22000, users: 940 },
  { day: "Wed", calls: 19500, users: 870 }, { day: "Thu", calls: 24891, users: 1100 },
  { day: "Fri", calls: 21000, users: 960 }, { day: "Sat", calls: 15000, users: 600 },
  { day: "Sun", calls: 12000, users: 480 },
];

const HOURLY = [
  { h: "6am", t: 120 }, { h: "9am", t: 340 }, { h: "12pm", t: 680 },
  { h: "3pm", t: 520 }, { h: "6pm", t: 290 }, { h: "9pm", t: 180 },
];

const LANG_DIST = [
  { name: "Python", value: 38, color: "#eab308" },
  { name: "C", value: 28, color: "#3b82f6" },
  { name: "JavaScript", value: 18, color: "#f97316" },
  { name: "Java", value: 10, color: "#f59e0b" },
  { name: "Others", value: 6, color: "#8b5cf6" },
];

const STATS = [
  { label: "Total API Calls", value: "132,441", change: "+18%" },
  { label: "Unique Users", value: "5,284", change: "+12%" },
  { label: "Avg Latency", value: "142ms", change: "-8%" },
  { label: "Error Rate", value: "0.03%", change: "-22%" },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-heading text-foreground">Analytics</h1>
        <button className="text-xs bg-primary/20 text-primary border border-primary/30 px-3 py-1.5 rounded-lg">Export CSV</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <div key={i} className="glass rounded-xl p-4">
            <p className="text-2xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            <p className={`text-xs font-medium mt-1 ${s.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{s.change} vs last week</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-xl p-4">
        <h2 className="font-bold text-foreground text-sm mb-4">API Calls (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={DAILY}>
            <defs>
              <linearGradient id="callGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} />
            <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} />
            <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 8 }} labelStyle={{ color: "#fff" }} />
            <Area type="monotone" dataKey="calls" stroke="#8b5cf6" fill="url(#callGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-4">
          <h2 className="font-bold text-foreground text-sm mb-4">Hourly Traffic</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={HOURLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="h" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} />
              <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 8 }} />
              <Bar dataKey="t" fill="#3b82f6" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-xl p-4">
          <h2 className="font-bold text-foreground text-sm mb-4">Language Distribution</h2>
          <div className="flex items-center gap-4">
            <PieChart width={140} height={140}>
              <Pie data={LANG_DIST} cx={65} cy={65} innerRadius={40} outerRadius={65} paddingAngle={2} dataKey="value">
                {LANG_DIST.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
            <div className="flex-1 space-y-2">
              {LANG_DIST.map(l => (
                <div key={l.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                    <span className="text-muted-foreground">{l.name}</span>
                  </div>
                  <span className="text-foreground font-medium">{l.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
