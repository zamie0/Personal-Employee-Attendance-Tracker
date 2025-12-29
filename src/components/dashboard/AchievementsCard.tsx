import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Award, Star, Clock, Calendar, Zap, Trophy, Target, Flame } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  color: string;
}

const achievements: Achievement[] = [
  {
    id: "1",
    name: "Early Bird",
    description: "Clock in before 8:30 AM for 5 days",
    icon: Clock,
    earned: true,
    earnedDate: "Dec 15",
    color: "text-amber-500",
  },
  {
    id: "2",
    name: "Perfect Week",
    description: "Full attendance for 7 consecutive days",
    icon: Star,
    earned: true,
    earnedDate: "Dec 10",
    color: "text-primary",
  },
  {
    id: "3",
    name: "Overtime Hero",
    description: "Complete 10 hours of overtime",
    icon: Zap,
    earned: true,
    earnedDate: "Dec 8",
    color: "text-success",
  },
  {
    id: "4",
    name: "Month Master",
    description: "Perfect attendance for a full month",
    icon: Trophy,
    earned: false,
    progress: 78,
    color: "text-muted-foreground",
  },
  {
    id: "5",
    name: "Punctuality Pro",
    description: "Never late for 30 days straight",
    icon: Target,
    earned: false,
    progress: 40,
    color: "text-muted-foreground",
  },
  {
    id: "6",
    name: "Streak Legend",
    description: "Maintain a 50-day attendance streak",
    icon: Flame,
    earned: false,
    progress: 24,
    color: "text-muted-foreground",
  },
];

export function AchievementsCard() {
  const earnedCount = achievements.filter(a => a.earned).length;
  
  return (
    <Card className="shadow-card animate-fade-in delay-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <CardTitle className="text-lg font-semibold">Achievements</CardTitle>
          </div>
          <Badge variant="secondary" className="font-medium">
            {earnedCount}/{achievements.length} Earned
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className={cn(
                "relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 cursor-pointer group",
                achievement.earned
                  ? "bg-card border-border hover:shadow-md hover:border-primary/30"
                  : "bg-muted/30 border-transparent"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110",
                  achievement.earned ? "bg-primary/10" : "bg-muted"
                )}
              >
                <achievement.icon
                  className={cn("w-6 h-6", achievement.earned ? achievement.color : "text-muted-foreground/50")}
                />
              </div>
              <div className="text-center">
                <p className={cn(
                  "text-sm font-medium",
                  achievement.earned ? "text-foreground" : "text-muted-foreground"
                )}>
                  {achievement.name}
                </p>
                {achievement.earned ? (
                  <p className="text-xs text-muted-foreground">{achievement.earnedDate}</p>
                ) : (
                  <div className="mt-1.5 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary/50 rounded-full transition-all duration-500"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                )}
              </div>
              {!achievement.earned && (
                <span className="absolute top-2 right-2 text-[10px] text-muted-foreground font-medium">
                  {achievement.progress}%
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
