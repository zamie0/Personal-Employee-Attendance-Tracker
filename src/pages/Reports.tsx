import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calendar, Clock, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const reportTypes = [
  { id: "monthly", name: "Monthly Attendance Report", description: "Detailed breakdown of your monthly attendance", icon: Calendar },
  { id: "overtime", name: "Overtime Summary", description: "Summary of overtime hours worked", icon: Clock },
  { id: "leave", name: "Leave History Report", description: "Complete history of leave requests and balances", icon: FileText },
  { id: "performance", name: "Performance Report", description: "Attendance score and punctuality metrics", icon: TrendingUp },
];

const generatedReports = [
  { id: 1, name: "January 2024 Attendance", type: "Monthly", date: "2024-02-01", size: "245 KB" },
  { id: 2, name: "Q4 2023 Overtime Summary", type: "Overtime", date: "2024-01-15", size: "128 KB" },
  { id: 3, name: "2023 Annual Leave Report", type: "Leave", date: "2024-01-02", size: "312 KB" },
];

const Reports = () => {
  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Report Generated",
      description: `Your ${reportType} report is being prepared for download.`,
    });
  };

  const handleDownload = (reportName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${reportName}...`,
    });
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground mt-1">Generate and download your attendance reports</p>
      </div>

      {/* Generate New Report */}
      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Generate New Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report) => (
              <div
                key={report.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all cursor-pointer group"
                onClick={() => handleGenerateReport(report.name)}
              >
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <report.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{report.name}</p>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
                <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  Generate
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Settings */}
      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Quick Export</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm text-muted-foreground mb-2 block">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Attendance</SelectItem>
                  <SelectItem value="overtime">Overtime Summary</SelectItem>
                  <SelectItem value="leave">Leave History</SelectItem>
                  <SelectItem value="performance">Performance Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm text-muted-foreground mb-2 block">Period</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm text-muted-foreground mb-2 block">Format</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Reports History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {generatedReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{report.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{report.type}</Badge>
                    <span className="text-xs text-muted-foreground">{report.date}</span>
                    <span className="text-xs text-muted-foreground">• {report.size}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleDownload(report.name)}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Reports;
