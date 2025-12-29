import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock, Calendar, Award, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { useState } from "react";

const initialNotifications = [
  { id: 1, type: "reminder", title: "Clock-in Reminder", message: "Don't forget to clock in for today!", time: "8:45 AM", read: false, icon: Clock },
  { id: 2, type: "achievement", title: "Achievement Unlocked!", message: "You've earned the 'Week Warrior' badge!", time: "Yesterday", read: false, icon: Award },
  { id: 3, type: "leave", title: "Leave Approved", message: "Your leave request for Jan 20-22 has been approved.", time: "Yesterday", read: false, icon: CheckCircle },
  { id: 4, type: "warning", title: "Late Arrival Alert", message: "You were late on Monday. Try to arrive on time tomorrow!", time: "2 days ago", read: true, icon: AlertTriangle },
  { id: 5, type: "info", title: "Streak Update", message: "You're on a 12-day attendance streak! Keep going!", time: "3 days ago", read: true, icon: Info },
  { id: 6, type: "leave", title: "Leave Balance Low", message: "You have only 2 sick days remaining for this year.", time: "1 week ago", read: true, icon: Calendar },
];

const typeConfig = {
  reminder: { color: "bg-primary/10 text-primary", borderColor: "border-primary/20" },
  achievement: { color: "bg-amber-500/10 text-amber-500", borderColor: "border-amber-500/20" },
  leave: { color: "bg-success/10 text-success", borderColor: "border-success/20" },
  warning: { color: "bg-warning/10 text-warning", borderColor: "border-warning/20" },
  info: { color: "bg-muted text-muted-foreground", borderColor: "border-border" },
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = filter === "all" 
    ? notifications 
    : filter === "unread" 
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === filter);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  return (
    <MainLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "unread", "reminder", "achievement", "leave", "warning"].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f)}
            className="capitalize"
          >
            {f}
            {f === "unread" && unreadCount > 0 && (
              <Badge className="ml-2 bg-accent text-accent-foreground h-5 w-5 p-0 flex items-center justify-center">
                {unreadCount}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            All Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No notifications to show</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => {
                const config = typeConfig[notification.type as keyof typeof typeConfig];
                return (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:bg-secondary/50 ${
                      notification.read ? 'bg-secondary/20 border-border' : `bg-secondary/50 ${config.borderColor}`
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className={`p-2 rounded-lg ${config.color}`}>
                      <notification.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                          {notification.title}
                        </span>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Notifications;
