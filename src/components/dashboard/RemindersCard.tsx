import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Reminder {
  id: string;
  title: string;
  description: string;
  type: "info" | "warning" | "success" | "alert";
  time: string;
}

const reminders: Reminder[] = [
  {
    id: "1",
    title: "Great streak going!",
    description: "You've been on time for 12 days straight. Keep it up!",
    type: "success",
    time: "Just now",
  },
  {
    id: "2",
    title: "Leave balance reminder",
    description: "You have 27 leave days remaining this year. Plan ahead!",
    type: "info",
    time: "1 hour ago",
  },
  {
    id: "3",
    title: "Overtime alert",
    description: "You've worked 2.2 hours of overtime this week.",
    type: "warning",
    time: "Yesterday",
  },
  {
    id: "4",
    title: "Weekly report ready",
    description: "Your attendance report for last week is available to download.",
    type: "info",
    time: "2 days ago",
  },
];

const typeStyles = {
  info: {
    icon: Info,
    bg: "bg-primary/10",
    text: "text-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-warning/10",
    text: "text-warning",
    badge: "bg-warning/10 text-warning border-warning/20",
  },
  success: {
    icon: CheckCircle,
    bg: "bg-success/10",
    text: "text-success",
    badge: "bg-success/10 text-success border-success/20",
  },
  alert: {
    icon: Bell,
    bg: "bg-destructive/10",
    text: "text-destructive",
    badge: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export function RemindersCard() {
  return (
    <Card className="shadow-card animate-fade-in delay-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <CardTitle className="text-lg font-semibold">Reminders</CardTitle>
          </div>
          <Badge variant="secondary" className="font-medium">
            {reminders.length} new
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {reminders.map((reminder, index) => {
          const style = typeStyles[reminder.type];
          const Icon = style.icon;
          
          return (
            <div
              key={reminder.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn("p-2 rounded-lg flex-shrink-0", style.bg)}>
                <Icon className={cn("w-4 h-4", style.text)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{reminder.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {reminder.description}
                </p>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">{reminder.time}</span>
            </div>
          );
        })}
        
        <button className="w-full text-center text-sm text-primary hover:underline font-medium pt-2">
          View all notifications
        </button>
      </CardContent>
    </Card>
  );
}
