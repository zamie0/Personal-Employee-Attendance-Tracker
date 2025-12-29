import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Flame, Clock, Calendar, Star, Target, Zap, Award } from "lucide-react";

const earnedAchievements = [
  { id: 1, name: "First Steps", description: "Complete your first week of attendance", icon: Star, earnedDate: "2024-01-07", rarity: "common" },
  { id: 2, name: "Early Bird", description: "Arrive before 9 AM for 5 consecutive days", icon: Clock, earnedDate: "2024-01-12", rarity: "common" },
  { id: 3, name: "Week Warrior", description: "Complete a full work week without absences", icon: Trophy, earnedDate: "2024-01-14", rarity: "uncommon" },
  { id: 4, name: "Overtime Hero", description: "Work 10+ hours of overtime in a month", icon: Zap, earnedDate: "2024-01-20", rarity: "rare" },
];

const inProgressAchievements = [
  { id: 5, name: "Perfect Month", description: "100% attendance for a full month", icon: Calendar, progress: 84, total: 100, rarity: "epic" },
  { id: 6, name: "Streak Master", description: "Maintain a 30-day on-time streak", icon: Flame, progress: 12, total: 30, rarity: "legendary" },
  { id: 7, name: "Punctuality Pro", description: "95% on-time rate for 3 months", icon: Target, progress: 2, total: 3, rarity: "epic" },
];

const lockedAchievements = [
  { id: 8, name: "Iron Streak", description: "Maintain a 100-day attendance streak", icon: Award, rarity: "legendary" },
  { id: 9, name: "Year Champion", description: "Achieve 95%+ attendance for a full year", icon: Trophy, rarity: "legendary" },
];

const rarityConfig = {
  common: { label: "Common", className: "bg-muted text-muted-foreground" },
  uncommon: { label: "Uncommon", className: "bg-success/10 text-success" },
  rare: { label: "Rare", className: "bg-primary/10 text-primary" },
  epic: { label: "Epic", className: "bg-purple-500/10 text-purple-500" },
  legendary: { label: "Legendary", className: "bg-amber-500/10 text-amber-500" },
};

const Achievements = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Achievements</h1>
        <p className="text-muted-foreground mt-1">Track your milestones and earn rewards</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">4</p>
            <p className="text-xs text-muted-foreground">Earned</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
          <CardContent className="p-4 text-center">
            <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Current Streak</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">1,250</p>
            <p className="text-xs text-muted-foreground">Total Points</p>
          </CardContent>
        </Card>
      </div>

      {/* Earned Achievements */}
      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Earned Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {earnedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="p-3 rounded-xl bg-amber-500/10">
                  <achievement.icon className="w-6 h-6 text-amber-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{achievement.name}</span>
                    <Badge className={rarityConfig[achievement.rarity as keyof typeof rarityConfig].className}>
                      {rarityConfig[achievement.rarity as keyof typeof rarityConfig].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  <p className="text-xs text-primary mt-1">Earned on {achievement.earnedDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* In Progress */}
      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            In Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inProgressAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border"
              >
                <div className="p-3 rounded-xl bg-primary/10">
                  <achievement.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{achievement.name}</span>
                    <Badge className={rarityConfig[achievement.rarity as keyof typeof rarityConfig].className}>
                      {rarityConfig[achievement.rarity as keyof typeof rarityConfig].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                  <div className="flex items-center gap-3">
                    <Progress value={(achievement.progress / achievement.total) * 100} className="h-2 flex-1" />
                    <span className="text-sm font-medium text-foreground">
                      {achievement.progress}/{achievement.total}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Locked Achievements */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-muted-foreground">
            🔒 Locked Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border opacity-60"
              >
                <div className="p-3 rounded-xl bg-muted">
                  <achievement.icon className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-muted-foreground">{achievement.name}</span>
                    <Badge className={rarityConfig[achievement.rarity as keyof typeof rarityConfig].className}>
                      {rarityConfig[achievement.rarity as keyof typeof rarityConfig].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Achievements;
