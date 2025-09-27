import React from 'react';
import { Users, BookOpen, TrendingUp, Award, Calendar, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '@/components/dashboard/StatsCard';
import AnalyticsChart from '@/components/charts/AnalyticsChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/lms-hero.jpg';

// Sample data for charts
const enrollmentData = [
  { name: 'Jan', students: 1200, courses: 45 },
  { name: 'Feb', students: 1350, courses: 48 },
  { name: 'Mar', students: 1580, courses: 52 },
  { name: 'Apr', students: 1720, courses: 55 },
  { name: 'May', students: 1890, courses: 58 },
  { name: 'Jun', students: 2100, courses: 62 },
];

const recentActivities = [
  {
    id: 1,
    title: 'Annual Report 2024 Analysis Module Created',
    description: 'New learning module covering financial performance metrics',
    time: '2 hours ago',
    type: 'course'
  },
  {
    id: 2,
    title: '156 Students Enrolled in Data Analytics Course',
    description: 'High enrollment in the new data visualization program',
    time: '4 hours ago',
    type: 'enrollment'
  },
  {
    id: 3,
    title: 'Q3 Performance Reports Generated',
    description: 'Automated quarterly performance analysis completed',
    time: '6 hours ago',
    type: 'report'
  },
  {
    id: 4,
    title: 'Faculty Meeting: Curriculum Review',
    description: 'Discussion on integrating annual report insights',
    time: '1 day ago',
    type: 'meeting'
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero shadow-elegant-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary-accent/80" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative p-8 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to EduLMS
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Comprehensive Learning Management System with integrated Annual Report Analytics
            </p>
            <div className="flex space-x-4">
              <Button variant="hero" size="lg" onClick={() => navigate('/courses')}>
                Explore Courses
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" onClick={() => navigate('/analytics')}>
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value="2,134"
          change="+12%"
          changeType="positive"
          icon={Users}
          gradient="bg-gradient-primary"
        />
        <StatsCard
          title="Active Courses"
          value="62"
          change="+8%"
          changeType="positive"
          icon={BookOpen}
          gradient="bg-gradient-success"
        />
        <StatsCard
          title="Completion Rate"
          value="89%"
          change="+5%"
          changeType="positive"
          icon={TrendingUp}
          gradient="bg-gradient-secondary"
        />
        <StatsCard
          title="Certifications"
          value="1,847"
          change="+15%"
          changeType="positive"
          icon={Award}
          gradient="bg-gradient-hero"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Enrollment Trends"
          description="Student enrollment and course creation over time"
          data={enrollmentData}
          type="line"
          height={350}
        />
        <AnalyticsChart
          title="Monthly Performance"
          description="Comparative view of key metrics"
          data={enrollmentData}
          type="bar"
          height={350}
        />
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>Latest updates and system activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    {activity.type === 'course' && <BookOpen className="h-5 w-5 text-white" />}
                    {activity.type === 'enrollment' && <Users className="h-5 w-5 text-white" />}
                    {activity.type === 'report' && <TrendingUp className="h-5 w-5 text-white" />}
                    {activity.type === 'meeting' && <Calendar className="h-5 w-5 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="gradient" className="w-full justify-start" onClick={() => navigate('/courses/create')}>
                <BookOpen className="mr-2 h-4 w-4" />
                Create New Course
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/students')}>
                <Users className="mr-2 h-4 w-4" />
                Add Students
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/reports')}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/calendar')}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/evaluation')}>
                <Award className="mr-2 h-4 w-4" />
                Digital Evaluation
              </Button>
              
              <div className="pt-4 border-t">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">System Status</span>
                    <Badge variant="secondary" className="bg-success text-success-foreground">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Backup</span>
                    <span className="text-sm">2 hours ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}