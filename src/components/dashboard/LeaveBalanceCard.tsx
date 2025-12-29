import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CalendarPlus, Download, FileText } from "lucide-react";

interface LeaveType {
  type: string;
  used: number;
  total: number;
  color: string;
  bgColor: string;
}

const leaveTypes: LeaveType[] = [
  { type: "Annual Leave", used: 5, total: 20, color: "bg-primary", bgColor: "bg-primary/10" },
  { type: "Sick Leave", used: 2, total: 10, color: "bg-warning", bgColor: "bg-warning/10" },
  { type: "Personal Leave", used: 1, total: 5, color: "bg-accent", bgColor: "bg-accent/10" },
];

export function LeaveBalanceCard() {
  return (
    <Card className="shadow-card animate-fade-in delay-100">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Leave Balance</CardTitle>
          <Button variant="outline" size="sm" className="h-8 gap-1.5">
            <CalendarPlus className="w-4 h-4" />
            Request
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {leaveTypes.map((leave, index) => {
          const remaining = leave.total - leave.used;
          const percentage = (leave.used / leave.total) * 100;
          
          return (
            <div key={leave.type} className="space-y-2" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", leave.color)} />
                  <span className="font-medium text-foreground">{leave.type}</span>
                </div>
                <span className="text-muted-foreground">
                  <span className="font-bold text-foreground">{remaining}</span> of {leave.total} remaining
                </span>
              </div>
              <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={cn("absolute top-0 left-0 h-full rounded-full transition-all duration-700", leave.color)}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Total Available</span>
            <span className="text-2xl font-bold text-primary">
              {leaveTypes.reduce((acc, leave) => acc + (leave.total - leave.used), 0)} days
            </span>
          </div>
          
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="flex-1 gap-1.5">
              <FileText className="w-4 h-4" />
              View History
            </Button>
            <Button variant="secondary" size="sm" className="flex-1 gap-1.5">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
