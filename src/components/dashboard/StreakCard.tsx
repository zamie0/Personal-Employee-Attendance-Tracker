import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Flame, Trophy, Target, Zap } from "lucide-react";

interface Streak {
  label: string;
  value: number;
  suffix: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const streaks: Streak[] = [
  {
    label: "Current Streak",
    value: 12,
    suffix: "days",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Best Streak",
    value: 28,
    suffix: "days",
    icon: Trophy,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    label: "This Month",
    value: 96,
    suffix: "% on-time",
    icon: Target,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Productivity",
    value: 8.5,
    suffix: "hrs avg",
    icon: Zap,
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

export function StreakCard() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      {streaks.map((streak, index) => (
        <Card
          key={streak.label}
          className="shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110", streak.bgColor)}>
                <streak.icon className={cn("w-5 h-5", streak.color)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">{streak.label}</p>
                <p className="text-xl font-bold text-foreground">
                  {streak.value}
                  <span className="text-sm font-normal text-muted-foreground ml-1">{streak.suffix}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
