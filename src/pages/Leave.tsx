import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const leaveBalances = [
  { type: "Annual Leave", used: 5, total: 20, color: "bg-primary" },
  { type: "Sick Leave", used: 2, total: 10, color: "bg-warning" },
  { type: "Personal Leave", used: 1, total: 5, color: "bg-accent" },
  { type: "Unpaid Leave", used: 0, total: 10, color: "bg-muted-foreground" },
];

const leaveHistory = [
  { id: 1, type: "Annual Leave", from: "2024-01-20", to: "2024-01-22", days: 3, status: "approved", reason: "Family vacation" },
  { id: 2, type: "Sick Leave", from: "2024-01-10", to: "2024-01-10", days: 1, status: "approved", reason: "Flu" },
  { id: 3, type: "Personal Leave", from: "2024-02-15", to: "2024-02-15", days: 1, status: "pending", reason: "Personal appointment" },
  { id: 4, type: "Annual Leave", from: "2024-03-01", to: "2024-03-05", days: 5, status: "pending", reason: "Spring break" },
];

const statusConfig = {
  approved: { label: "Approved", icon: CheckCircle, className: "bg-success/10 text-success border-success/20" },
  pending: { label: "Pending", icon: Clock, className: "bg-warning/10 text-warning border-warning/20" },
  rejected: { label: "Rejected", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const Leave = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    toast({
      title: "Leave Request Submitted",
      description: "Your leave request has been submitted for approval.",
    });
  };

  return (
    <MainLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leave Management</h1>
          <p className="text-muted-foreground mt-1">Manage your leave requests and balances</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Request Leave
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Request Leave</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitLeave} className="space-y-4">
              <div className="space-y-2">
                <Label>Leave Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual Leave</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                    <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>To Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Reason</Label>
                <Textarea placeholder="Enter reason for leave..." />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Leave Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {leaveBalances.map((leave) => (
          <Card key={leave.type} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">{leave.type}</span>
                <Badge variant="outline" className="text-xs">
                  {leave.total - leave.used} left
                </Badge>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold text-foreground">{leave.used}</span>
                <span className="text-sm text-muted-foreground">/ {leave.total} days</span>
              </div>
              <Progress value={(leave.used / leave.total) * 100} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leave Calendar Preview */}
      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Upcoming Leave
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {leaveHistory.filter(l => l.status === "approved" || l.status === "pending").map((leave) => (
              <div key={leave.id} className="flex-shrink-0 p-4 rounded-xl bg-secondary/50 border border-border min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={statusConfig[leave.status as keyof typeof statusConfig].className}>
                    {statusConfig[leave.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
                <p className="font-medium text-foreground">{leave.type}</p>
                <p className="text-sm text-muted-foreground">{leave.from} - {leave.to}</p>
                <p className="text-sm text-primary mt-1">{leave.days} day(s)</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leave History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Leave History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">From</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">To</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Days</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Reason</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveHistory.map((row) => {
                  const StatusIcon = statusConfig[row.status as keyof typeof statusConfig].icon;
                  return (
                    <tr key={row.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium text-foreground">{row.type}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{row.from}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{row.to}</td>
                      <td className="py-3 px-4 text-sm text-foreground">{row.days}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{row.reason}</td>
                      <td className="py-3 px-4">
                        <Badge className={`${statusConfig[row.status as keyof typeof statusConfig].className} gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig[row.status as keyof typeof statusConfig].label}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Leave;
