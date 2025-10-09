import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, TrendingUp, Users, BookOpen, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import StatsCard from '@/components/dashboard/StatsCard';
import AnalyticsChart from '@/components/charts/AnalyticsChart';

const reports = [
  {
    id: 1,
    title: 'Q4 2024 Performance Report',
    type: 'Performance',
    status: 'completed',
    generatedDate: '2024-03-15',
    size: '2.4 MB',
    downloads: 45
  },
  {
    id: 2,
    title: 'Student Enrollment Analysis',
    type: 'Analytics',
    status: 'processing',
    generatedDate: '2024-03-14',
    size: '1.8 MB',
    downloads: 23
  },
  {
    id: 3,
    title: 'Course Completion Summary',
    type: 'Academic',
    status: 'completed',
    generatedDate: '2024-03-13',
    size: '3.1 MB',
    downloads: 67
  }
];

const reportData = [
  { name: 'Jan', reports: 12, downloads: 145 },
  { name: 'Feb', reports: 15, downloads: 189 },
  { name: 'Mar', reports: 18, downloads: 234 },
  { name: 'Apr', reports: 22, downloads: 298 },
  { name: 'May', reports: 19, downloads: 267 },
  { name: 'Jun', reports: 25, downloads: 356 },
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const { toast } = useToast();

  const handleGenerateReport = () => {
    toast({
      title: "Report Generation Started",
      description: "Your report is being generated and will be available shortly.",
    });
  };

  const handleDownloadReport = (reportId: number) => {
    toast({
      title: "Download Started",
      description: "Report download has begun.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg p-2">
            <FileText className="w-full h-full text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1">Generate and manage institutional reports</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="lg">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="gradient" size="lg" onClick={handleGenerateReport}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Reports"
          value="247"
          change="+18%"
          changeType="positive"
          icon={FileText}
          gradient="bg-gradient-primary"
        />
        <StatsCard
          title="Downloads"
          value="1,489"
          change="+24%"
          changeType="positive"
          icon={Download}
          gradient="bg-gradient-success"
        />
        <StatsCard
          title="Active Reports"
          value="12"
          change="+3"
          changeType="positive"
          icon={TrendingUp}
          gradient="bg-gradient-secondary"
        />
        <StatsCard
          title="Scheduled"
          value="8"
          change="+2"
          changeType="positive"
          icon={Calendar}
          gradient="bg-gradient-hero"
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-accent">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="generated">Generated Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Report Generation */}
            <Card className="bg-gradient-card shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle>Quick Report Generation</CardTitle>
                <CardDescription>Generate common reports instantly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">Performance Report</SelectItem>
                      <SelectItem value="enrollment">Enrollment Analysis</SelectItem>
                      <SelectItem value="financial">Financial Summary</SelectItem>
                      <SelectItem value="academic">Academic Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Period</label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="gradient" className="w-full" onClick={handleGenerateReport}>
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card className="bg-gradient-card shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Latest generated reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reports.slice(0, 3).map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{report.title}</p>
                      <p className="text-sm text-muted-foreground">{report.type} • {report.size}</p>
                      <p className="text-xs text-muted-foreground">{report.generatedDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                        {report.status}
                      </Badge>
                      {report.status === 'completed' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadReport(report.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="generated" className="space-y-6">
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>All available reports and documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <Card key={report.id} className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{report.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">Type: {report.type}</p>
                          <p className="text-sm text-muted-foreground">Generated: {report.generatedDate}</p>
                          <p className="text-sm text-muted-foreground">Size: {report.size} • Downloads: {report.downloads}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                            {report.status}
                          </Badge>
                          {report.status === 'completed' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDownloadReport(report.id)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Performance Dashboard', description: 'Comprehensive performance metrics', icon: TrendingUp },
              { name: 'Student Analytics', description: 'Student enrollment and progress', icon: Users },
              { name: 'Course Summary', description: 'Course completion and engagement', icon: BookOpen },
              { name: 'Achievement Report', description: 'Certifications and awards', icon: Award }
            ].map((template, index) => (
              <Card key={index} className="bg-gradient-card shadow-elegant border-border/50 hover:shadow-elegant-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg p-2">
                      <template.icon className="w-full h-full text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsChart
            title="Report Generation Trends"
            description="Monthly report generation and download statistics"
            data={reportData}
            type="line"
            height={400}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}