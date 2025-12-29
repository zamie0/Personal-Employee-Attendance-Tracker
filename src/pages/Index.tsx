import { MainLayout } from "@/components/layout/MainLayout";
import { ClockWidget } from "@/components/dashboard/ClockWidget";
import { LeaveBalanceCard } from "@/components/dashboard/LeaveBalanceCard";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { AchievementsCard } from "@/components/dashboard/AchievementsCard";
import { AttendanceCalendar } from "@/components/dashboard/AttendanceCalendar";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { RemindersCard } from "@/components/dashboard/RemindersCard";

const Index = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 17 ? "Good afternoon" : "Good evening";

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          {greeting}, John! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your attendance and stay on top of your work schedule.
        </p>
      </div>

      {/* Streak Cards */}
      <div className="mb-6">
        <StreakCard />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          <ClockWidget />
          <WeeklyChart />
          <AttendanceCalendar />
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          <LeaveBalanceCard />
          <RemindersCard />
          <AchievementsCard />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
