import React, { useState, useEffect } from 'react';
import { FileText, Download, Calendar, Filter, TrendingUp, Users, BookOpen, Award, Trash2, Eye, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import StatsCard from '@/components/dashboard/StatsCard';
import AnalyticsChart from '@/components/charts/AnalyticsChart';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const initialReports = [
  {
    id: 1,
    title: 'Q4 2024 Performance Report',
    type: 'Performance',
    status: 'completed',
    generatedDate: '2024-03-15',
    size: '2.4 MB',
    downloads: 45,
    description: 'Comprehensive performance analysis for Q4 2024'
  },
  {
    id: 2,
    title: 'Student Enrollment Analysis',
    type: 'Analytics',
    status: 'processing',
    generatedDate: '2024-03-14',
    size: '1.8 MB',
    downloads: 23,
    description: 'Student enrollment trends and statistics'
  },
  {
    id: 3,
    title: 'Course Completion Summary',
    type: 'Academic',
    status: 'completed',
    generatedDate: '2024-03-13',
    size: '3.1 MB',
    downloads: 67,
    description: 'Overview of course completion rates'
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

const templates = [
  { 
    id: 1,
    name: 'Performance Dashboard', 
    description: 'Comprehensive performance metrics', 
    icon: TrendingUp,
    type: 'Performance',
    fields: ['metrics', 'trends', 'comparison']
  },
  { 
    id: 2,
    name: 'Student Analytics', 
    description: 'Student enrollment and progress', 
    icon: Users,
    type: 'Analytics',
    fields: ['enrollment', 'demographics', 'progress']
  },
  { 
    id: 3,
    name: 'Course Summary', 
    description: 'Course completion and engagement', 
    icon: BookOpen,
    type: 'Academic',
    fields: ['completion', 'engagement', 'feedback']
  },
  { 
    id: 4,
    name: 'Achievement Report', 
    description: 'Certifications and awards', 
    icon: Award,
    type: 'Achievement',
    fields: ['certifications', 'awards', 'milestones']
  }
];

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [viewingReport, setViewingReport] = useState(null);
  const [deletingReport, setDeletingReport] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { toast } = useToast();

  // Form state for report generation
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    period: 'monthly',
    template: ''
  });

  // Load reports from localStorage
  useEffect(() => {
    const storedReports = localStorage.getItem('reports');
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    } else {
      setReports(initialReports);
      localStorage.setItem('reports', JSON.stringify(initialReports));
    }
  }, []);

  // Save reports to localStorage
  useEffect(() => {
    if (reports.length > 0) {
      localStorage.setItem('reports', JSON.stringify(reports));
    }
  }, [reports]);

  const handleGenerateReport = () => {
    setFormData({
      title: '',
      type: '',
      description: '',
      period: 'monthly',
      template: ''
    });
    setSelectedTemplate(null);
    setIsGenerateDialogOpen(true);
  };

  const handleUseTemplate = (template) => {
    setSelectedTemplate(template);
    setFormData({
      title: `${template.name} - ${new Date().toLocaleDateString()}`,
      type: template.type,
      description: template.description,
      period: 'monthly',
      template: template.name
    });
    setIsGenerateDialogOpen(true);
  };

  const handleSubmitGenerate = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate report generation
    const newReport = {
      id: reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1,
      title: formData.title,
      type: formData.type,
      status: 'processing',
      generatedDate: new Date().toISOString().split('T')[0],
      size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
      downloads: 0,
      description: formData.description
    };

    setReports([newReport, ...reports]);
    
    toast({
      title: "Report Generation Started",
      description: "Your report is being generated and will be available shortly.",
    });

    // Simulate processing completion after 3 seconds
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === newReport.id ? { ...r, status: 'completed' } : r
      ));
      toast({
        title: "Report Ready",
        description: `${formData.title} has been generated successfully.`,
      });
    }, 3000);

    setIsGenerateDialogOpen(false);
  };

  const handleDownloadReport = (report) => {
    // Create a mock report content
    const reportContent = {
      title: report.title,
      type: report.type,
      generatedDate: report.generatedDate,
      description: report.description,
      status: report.status,
      downloads: report.downloads,
      data: {
        summary: "This is a generated report with sample data",
        metrics: reportData,
        timestamp: new Date().toISOString()
      }
    };

    // Convert to JSON and create blob
    const dataStr = JSON.stringify(reportContent, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Update download count
    setReports(prev => prev.map(r => 
      r.id === report.id ? { ...r, downloads: r.downloads + 1 } : r
    ));

    toast({
      title: "Download Started",
      description: `${report.title} is being downloaded.`,
    });
  };

  const handleViewReport = (report) => {
    setViewingReport(report);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (report) => {
    setDeletingReport(report);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    const updatedReports = reports.filter(r => r.id !== deletingReport.id);
    setReports(updatedReports);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Report Deleted",
      description: `${deletingReport.title} has been removed.`,
      variant: "destructive",
    });
    setDeletingReport(null);
  };

  const handleExportAll = () => {
    const dataStr = JSON.stringify(reports, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'all-reports-data.json';
    link.click();
    toast({
      title: "Data Exported",
      description: "All reports have been exported successfully.",
    });
  };

  const totalReports = reports.length;
  const totalDownloads = reports.reduce((sum, r) => sum + r.downloads, 0);
  const activeReports = reports.filter(r => r.status === 'processing').length;
  const completedReports = reports.filter(r => r.status === 'completed').length;

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
          <Button variant="outline" size="lg" onClick={handleExportAll}>
            <Download className="mr-2 h-4 w-4" />
            Export All
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
          value={totalReports.toString()}
          change="+18%"
          changeType="positive"
          icon={FileText}
          gradient="bg-gradient-primary"
        />
        <StatsCard
          title="Downloads"
          value={totalDownloads.toString()}
          change="+24%"
          changeType="positive"
          icon={Download}
          gradient="bg-gradient-success"
        />
        <StatsCard
          title="Active Reports"
          value={activeReports.toString()}
          change="+3"
          changeType="positive"
          icon={TrendingUp}
          gradient="bg-gradient-secondary"
        />
        <StatsCard
          title="Completed"
          value={completedReports.toString()}
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
                          onClick={() => handleDownloadReport(report)}
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
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewReport(report)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {report.status === 'completed' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDownloadReport(report)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleDeleteClick(report)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
            {templates.map((template) => (
              <Card key={template.id} className="bg-gradient-card shadow-elegant border-border/50 hover:shadow-elegant-lg transition-all duration-300">
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
                <CardContent className="space-y-3">
                  <div className="text-xs text-muted-foreground">
                    <p>Type: {template.type}</p>
                    <p>Fields: {template.fields.join(', ')}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
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

      {/* Generate Report Dialog */}
      <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generate New Report</DialogTitle>
            <DialogDescription>
              {selectedTemplate ? `Using template: ${selectedTemplate.name}` : 'Create a custom report'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitGenerate}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Report Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter report title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Report Type *</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Performance">Performance</SelectItem>
                      <SelectItem value="Analytics">Analytics</SelectItem>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Financial">Financial</SelectItem>
                      <SelectItem value="Achievement">Achievement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period">Time Period</Label>
                  <Select 
                    value={formData.period} 
                    onValueChange={(value) => setFormData({ ...formData, period: value })}
                  >
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter report description"
                  className="h-24"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="gradient">
                Generate Report
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Report Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
            <DialogDescription>Comprehensive report information</DialogDescription>
          </DialogHeader>
          {viewingReport && (
            <div className="space-y-6 py-4">
              <div>
                <h3 className="text-2xl font-bold">{viewingReport.title}</h3>
                <p className="text-muted-foreground mt-1">{viewingReport.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Report Type</Label>
                    <p className="font-medium">{viewingReport.type}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <div className="mt-1">
                      <Badge variant={viewingReport.status === 'completed' ? 'default' : 'secondary'}>
                        {viewingReport.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Generated Date</Label>
                    <p className="font-medium">{new Date(viewingReport.generatedDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">File Size</Label>
                    <p className="font-medium text-2xl">{viewingReport.size}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Downloads</Label>
                    <p className="font-medium text-2xl">{viewingReport.downloads}</p>
                  </div>
                </div>
              </div>

              {viewingReport.status === 'completed' && (
                <Button 
                  variant="gradient" 
                  className="w-full"
                  onClick={() => {
                    handleDownloadReport(viewingReport);
                    setIsViewDialogOpen(false);
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Report</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingReport?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
