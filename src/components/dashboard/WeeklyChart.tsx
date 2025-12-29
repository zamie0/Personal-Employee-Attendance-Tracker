import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { day: "Mon", hours: 8.5, target: 8 },
  { day: "Tue", hours: 9.2, target: 8 },
  { day: "Wed", hours: 7.8, target: 8 },
  { day: "Thu", hours: 8.7, target: 8 },
  { day: "Fri", hours: 8.0, target: 8 },
  { day: "Sat", hours: 0, target: 0 },
  { day: "Sun", hours: 0, target: 0 },
];

const weeklyStats = {
  totalHours: 42.2,
  avgPerDay: 8.4,
  overtime: 2.2,
  efficiency: 105,
};

export function WeeklyChart() {
  return (
    <Card className="shadow-card animate-fade-in delay-100">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Weekly Hours</CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Worked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
              <span className="text-muted-foreground">Target</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                domain={[0, 10]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-dropdown)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="transparent"
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorHours)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{weeklyStats.totalHours}</p>
            <p className="text-xs text-muted-foreground">Total Hours</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{weeklyStats.avgPerDay}</p>
            <p className="text-xs text-muted-foreground">Avg/Day</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">+{weeklyStats.overtime}</p>
            <p className="text-xs text-muted-foreground">Overtime</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{weeklyStats.efficiency}%</p>
            <p className="text-xs text-muted-foreground">Efficiency</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
