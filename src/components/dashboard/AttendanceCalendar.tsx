import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DayData {
  date: number;
  status: "present" | "absent" | "leave" | "weekend" | "holiday" | "future";
  clockIn?: string;
  clockOut?: string;
}

const generateMonthData = (): DayData[] => {
  const days: DayData[] = [];
  const currentDate = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isFuture = i > currentDate.getDate();
    
    let status: DayData["status"] = "present";
    let clockIn = "9:00 AM";
    let clockOut = "6:00 PM";
    
    if (isFuture) {
      status = "future";
      clockIn = undefined;
      clockOut = undefined;
    } else if (isWeekend) {
      status = "weekend";
      clockIn = undefined;
      clockOut = undefined;
    } else if (i === 15) {
      status = "leave";
      clockIn = undefined;
      clockOut = undefined;
    } else if (i === 8) {
      status = "absent";
      clockIn = undefined;
      clockOut = undefined;
    } else if (i === 25) {
      status = "holiday";
      clockIn = undefined;
      clockOut = undefined;
    } else {
      const randomLate = Math.random() > 0.8;
      clockIn = randomLate ? "9:45 AM" : `${8 + Math.floor(Math.random() * 1)}:${Math.floor(Math.random() * 59).toString().padStart(2, "0")} AM`;
    }
    
    days.push({ date: i, status, clockIn, clockOut });
  }
  
  return days;
};

const statusColors = {
  present: "bg-success text-success-foreground",
  absent: "bg-destructive text-destructive-foreground",
  leave: "bg-primary text-primary-foreground",
  weekend: "bg-muted text-muted-foreground",
  holiday: "bg-accent text-accent-foreground",
  future: "bg-transparent text-muted-foreground/50 border-dashed",
};

const statusLabels = {
  present: "Present",
  absent: "Absent",
  leave: "On Leave",
  weekend: "Weekend",
  holiday: "Holiday",
  future: "Upcoming",
};

export function AttendanceCalendar() {
  const [monthData] = useState(generateMonthData);
  const currentDate = new Date();
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const presentDays = monthData.filter(d => d.status === "present").length;
  const leaveDays = monthData.filter(d => d.status === "leave").length;
  const absentDays = monthData.filter(d => d.status === "absent").length;

  return (
    <Card className="shadow-card animate-fade-in delay-100">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Attendance Calendar</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[140px] text-center">{monthName}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-xs text-muted-foreground">{presentDays} Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">{leaveDays} Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-xs text-muted-foreground">{absentDays} Absent</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Week days header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          
          {/* Actual days */}
          {monthData.map((day, index) => (
            <div
              key={day.date}
              className={cn(
                "aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 cursor-pointer hover:scale-105 border",
                statusColors[day.status],
                day.date === currentDate.getDate() && "ring-2 ring-primary ring-offset-2"
              )}
              style={{ animationDelay: `${index * 10}ms` }}
            >
              <span>{day.date}</span>
              {day.clockIn && (
                <span className="text-[9px] opacity-80">{day.clockIn.split(" ")[0]}</span>
              )}
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border">
          {Object.entries(statusLabels).filter(([key]) => key !== "future").map(([status, label]) => (
            <div key={status} className="flex items-center gap-1.5">
              <div className={cn(
                "w-2.5 h-2.5 rounded-sm",
                status === "present" && "bg-success",
                status === "absent" && "bg-destructive",
                status === "leave" && "bg-primary",
                status === "weekend" && "bg-muted",
                status === "holiday" && "bg-accent",
              )} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
