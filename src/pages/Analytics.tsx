import React from 'react';
import { TrendingUp, Users, BookOpen, Award, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalyticsChart from '@/components/charts/AnalyticsChart';
import StatsCard from '@/components/dashboard/StatsCard';
import analyticsIcon from '@/assets/analytics-icon.png';

// Sample data for various analytics
const studentPerformanceData = [
  { name: 'Q1', completion: 78, engagement: 85, satisfaction: 82 },
  { name: 'Q2', completion: 82, engagement: 88, satisfaction: 86 },
  { name: 'Q3', completion: 85, engagement: 92, satisfaction: 89 },
  { name: 'Q4', completion: 88, engagement: 94, satisfaction: 91 },
];

const departmentData = [
  { name: 'Engineering', students: 450, courses: 12, completion: 89 },
  { name: 'Business', students: 380, courses: 10, completion: 92 },
  { name: 'Sciences', students: 320, courses: 8, completion: 86 },
  { name: 'Arts', students: 280, courses: 6, completion: 88 },
  { name: 'Medicine', students: 420, courses: 14, completion: 94 },
];

const revenueData = [
  { name: 'Jan', revenue: 45000, expenses: 38000, profit: 7000 },
  { name: 'Feb', revenue: 48000, expenses: 39000, profit: 9000 },
  { name: 'Mar', revenue: 52000, expenses: 41000, profit: 11000 },
  { name: 'Apr', revenue: 55000, expenses: 42000, profit: 13000 },
  { name: 'May', revenue: 58000, expenses: 44000, profit: 14000 },
  { name: 'Jun', revenue: 62000, expenses: 45000, profit: 17000 },
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg p-2">
            <img src={analyticsIcon} alt="Analytics" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">Comprehensive insights from annual reports and learning data</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="lg">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="gradient" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Revenue Growth"
          value="$620K"
          change="+24%"
          changeType="positive"
          icon={TrendingUp}
          gradient="bg-gradient-success"
        />
        <StatsCard
          title="Student Satisfaction"
          value="91%"
          change="+7%"
          changeType="positive"
          icon={Award}
          gradient="bg-gradient-primary"
        />
        <StatsCard
          title="Course Completion"
          value="88%"
          change="+12%"
          changeType="positive"
          icon={BookOpen}
          gradient="bg-gradient-secondary"
        />
        <StatsCard
          title="Active Learners"
          value="1,850"
          change="+18%"
          changeType="positive"
          icon={Users}
          gradient="bg-gradient-hero"
        />
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-accent">
          <TabsTrigger value="performance">Student Performance</TabsTrigger>
          <TabsTrigger value="departments">Department Analysis</TabsTrigger>
          <TabsTrigger value="financial">Financial Metrics</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Student Performance Trends"
              description="Completion rates, engagement, and satisfaction over time"
              data={studentPerformanceData}
              type="line"
              height={400}
            />
            <Card className="bg-gradient-card shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>Key findings from student analytics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <h4 className="font-semibold text-success mb-2">High Engagement</h4>
                  <p className="text-sm text-muted-foreground">
                    Student engagement has increased by 12% this quarter, with peak activity during annual report analysis modules.
                  </p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Completion Rates</h4>
                  <p className="text-sm text-muted-foreground">
                    Course completion rates have improved significantly, especially in data visualization courses.
                  </p>
                </div>
                <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <h4 className="font-semibold text-warning mb-2">Areas for Improvement</h4>
                  <p className="text-sm text-muted-foreground">
                    Some advanced analytics modules show lower initial engagement and may benefit from prerequisite content.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <AnalyticsChart
            title="Department Performance Comparison"
            description="Student enrollment and completion rates by department"
            data={departmentData}
            type="bar"
            height={400}
          />
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Revenue vs Expenses"
              description="Monthly financial performance tracking"
              data={revenueData}
              type="line"
              height={400}
            />
            <Card className="bg-gradient-card shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Annual report financial highlights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success">$74K</div>
                    <div className="text-sm text-muted-foreground">Total Profit</div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">24%</div>
                    <div className="text-sm text-muted-foreground">Growth Rate</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Operating Margin</span>
                    <span className="font-medium">18.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Cost per Student</span>
                    <span className="font-medium">$312</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Revenue per Course</span>
                    <span className="font-medium">$1,240</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-gradient-card shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle>Predictive Analytics</CardTitle>
                <CardDescription>AI-powered insights and trend predictions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">Enrollment Forecast</h4>
                    <p className="text-sm text-muted-foreground">
                      Expected 28% increase in enrollment for Q1 2025 based on current trends.
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-success/10 rounded-lg border border-success/20">
                    <h4 className="font-semibold text-success mb-2">Performance Prediction</h4>
                    <p className="text-sm text-muted-foreground">
                      Completion rates likely to reach 92% with current engagement levels.
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-secondary/10 rounded-lg border border-secondary-accent/20">
                    <h4 className="font-semibold text-secondary-accent mb-2">Resource Planning</h4>
                    <p className="text-sm text-muted-foreground">
                      Recommend adding 3 new courses and 2 instructors for optimal capacity.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}