import React, { useState } from 'react';
import { Users, Search, Plus, Filter, Download, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import StatsCard from '@/components/dashboard/StatsCard';

const students = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    department: 'Business Analytics',
    enrolledCourses: 3,
    completedCourses: 8,
    overallProgress: 85,
    status: 'active',
    joinDate: '2023-09-15',
    avatar: null
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@university.edu',
    phone: '+1 (555) 234-5678',
    department: 'Data Science',
    enrolledCourses: 2,
    completedCourses: 5,
    overallProgress: 72,
    status: 'active',
    joinDate: '2023-08-20',
    avatar: null
  },
  {
    id: 3,
    name: 'Carol Davis',
    email: 'carol.davis@university.edu',
    phone: '+1 (555) 345-6789',
    department: 'Finance',
    enrolledCourses: 4,
    completedCourses: 12,
    overallProgress: 92,
    status: 'active',
    joinDate: '2023-07-10',
    avatar: null
  }
];

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleAddStudent = () => {
    toast({
      title: "Add Student",
      description: "Student registration form would open here.",
    });
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg p-2">
            <Users className="w-full h-full text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
            <p className="text-muted-foreground mt-1">Manage student enrollment and track progress</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button variant="gradient" size="lg" onClick={handleAddStudent}>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Stats */}
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
          title="Active Enrollments"
          value="1,847"
          change="+8%"
          changeType="positive"
          icon={GraduationCap}
          gradient="bg-gradient-success"
        />
        <StatsCard
          title="Completion Rate"
          value="89%"
          change="+5%"
          changeType="positive"
          icon={Badge}
          gradient="bg-gradient-secondary"
        />
        <StatsCard
          title="New This Month"
          value="156"
          change="+24%"
          changeType="positive"
          icon={Plus}
          gradient="bg-gradient-hero"
        />
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-card shadow-elegant border-border/50">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="bg-gradient-card shadow-elegant border-border/50 hover:shadow-elegant-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student.avatar} />
                  <AvatarFallback className="bg-gradient-primary text-white">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  <CardDescription>{student.department}</CardDescription>
                </div>
                <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                  {student.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  {student.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="mr-2 h-4 w-4" />
                  {student.phone}
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-medium">{student.overallProgress}%</span>
                </div>
                <Progress value={student.overallProgress} className="h-2" />
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Enrolled: </span>
                  <span className="font-medium">{student.enrolledCourses}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Completed: </span>
                  <span className="font-medium">{student.completedCourses}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button variant="default" size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}