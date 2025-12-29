import { useState, useEffect } from "react";
import { Clock, MapPin, Wifi, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function ClockWidget() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isClockedIn && clockInTime) {
      const timer = setInterval(() => {
        const diff = new Date().getTime() - clockInTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setElapsedTime(
          `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isClockedIn, clockInTime]);

  const handleClockIn = () => {
    setIsClockedIn(true);
    setClockInTime(new Date());
    toast({
      title: "✅ Clocked In Successfully",
      description: `Your workday started at ${new Date().toLocaleTimeString()}`,
    });
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
    setClockInTime(null);
    setElapsedTime("00:00:00");
    toast({
      title: "👋 Clocked Out",
      description: `Great work today! Total time: ${elapsedTime}`,
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden shadow-card animate-fade-in">
      <div className={cn(
        "p-6 transition-all duration-500",
        isClockedIn ? "gradient-hero" : "bg-gradient-to-br from-muted to-secondary"
      )}>
        <div className="flex items-center justify-between mb-6">
          <div className={cn(
            "flex items-center gap-2",
            isClockedIn ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">
              {isClockedIn ? "Working" : "Ready to start"}
            </span>
          </div>
          <div className={cn(
            "flex items-center gap-4 text-sm",
            isClockedIn ? "text-primary-foreground/70" : "text-muted-foreground"
          )}>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-4 h-4" />
              <span>Connected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>Home Office</span>
            </div>
          </div>
        </div>
        
        <div className="text-center py-6">
          <p className={cn(
            "text-6xl font-bold tracking-tight mb-2 font-mono",
            isClockedIn ? "text-primary-foreground" : "text-foreground"
          )}>
            {formatTime(currentTime)}
          </p>
          <p className={cn(
            "text-sm",
            isClockedIn ? "text-primary-foreground/70" : "text-muted-foreground"
          )}>
            {formatDate(currentTime)}
          </p>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Session Duration</p>
            <p className="text-3xl font-bold text-foreground font-mono tracking-wider">
              {elapsedTime}
            </p>
          </div>
          {isClockedIn && clockInTime && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Started At</p>
              <p className="text-lg font-semibold text-foreground">
                {clockInTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
              </p>
            </div>
          )}
        </div>

        <Button
          variant={isClockedIn ? "clock-out" : "clock-in"}
          size="xl"
          className="w-full"
          onClick={isClockedIn ? handleClockOut : handleClockIn}
        >
          {isClockedIn ? (
            <>
              <Square className="w-5 h-5 mr-2" />
              Clock Out
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Clock In
            </>
          )}
        </Button>
        
        {!isClockedIn && (
          <p className="text-center text-xs text-muted-foreground mt-3">
            Press to start tracking your workday
          </p>
        )}
      </CardContent>
    </Card>
  );
}
