import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Download, Filter } from "lucide-react";
import { useState } from "react";

const timeLogData = [
  { date: "2024-01-15", clockIn: "09:02", clockOut: "18:15", hours: "9h 13m", status: "present", overtime: "1h 13m" },
  { date: "2024-01-14", clockIn: "08:55", clockOut: "17:30", hours: "8h 35m", status: "present", overtime: "35m" },
  { date: "2024-01-13", clockIn: "09:30", clockOut: "17:00", hours: "7h 30m", status: "late", overtime: "-" },
  { date: "2024-01-12", clockIn: "-", clockOut: "-", hours: "-", status: "leave", overtime: "-" },
  { date: "2024-01-11", clockIn: "09:00", clockOut: "18:00", hours: "9h 00m", status: "present", overtime: "1h" },
  { date: "2024-01-10", clockIn: "08:45", clockOut: "17:45", hours: "9h 00m", status: "present", overtime: "1h" },
  { date: "2024-01-09", clockIn: "09:15", clockOut: "17:30", hours: "8h 15m", status: "late", overtime: "15m" },
];

const statusConfig = {
  present: { label: "Present", className: "bg-success/10 text-success border-success/20" },
  late: { label: "Late", className: "bg-warning/10 text-warning border-warning/20" },
  leave: { label: "Leave", className: "bg-primary/10 text-primary border-primary/20" },
  absent: { label: "Absent", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const TimeLog = () => {
  const [filter, setFilter] = useState("all");

  const filteredData = filter === "all" 
    ? timeLogData 
    : timeLogData.filter(d => d.status === filter);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Time Log</h1>
        <p className="text-muted-foreground mt-1">View and manage your attendance history</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">168h</p>
                <p className="text-xs text-muted-foreground">Total Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Calendar className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">21</p>
                <p className="text-xs text-muted-foreground">Days Present</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12h</p>
                <p className="text-xs text-muted-foreground">Overtime</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-xs text-muted-foreground">Late Arrivals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Log Table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Attendance History</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            {["all", "present", "late", "leave"].map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className="capitalize"
              >
                {f === "all" ? "All" : statusConfig[f as keyof typeof statusConfig]?.label}
              </Button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Clock In</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Clock Out</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total Hours</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Overtime</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{row.date}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.clockIn}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.clockOut}</td>
                    <td className="py-3 px-4 text-sm text-foreground font-medium">{row.hours}</td>
                    <td className="py-3 px-4 text-sm text-success">{row.overtime}</td>
                    <td className="py-3 px-4">
                      <Badge className={statusConfig[row.status as keyof typeof statusConfig]?.className}>
                        {statusConfig[row.status as keyof typeof statusConfig]?.label}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default TimeLog;
