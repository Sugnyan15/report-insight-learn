import React from 'react';
import { BookOpen, Users, Clock, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import courseAnnualReport from '@/assets/course-annual-report.jpg';
import courseDataViz from '@/assets/course-data-viz.jpg';
import courseStrategy from '@/assets/course-strategy.jpg';
import courseFinance from '@/assets/course-finance.jpg';

const courses = [
  {
    id: 1,
    title: 'Annual Report Analysis 2024',
    description: 'Comprehensive analysis of institutional performance metrics and financial data',
    instructor: 'Dr. Sarah Johnson',
    students: 156,
    duration: '8 weeks',
    progress: 75,
    rating: 4.8,
    category: 'Analytics',
    level: 'Intermediate',
    thumbnail: courseAnnualReport
  },
  {
    id: 2,
    title: 'Data Visualization for Reports',
    description: 'Learn to create compelling visual representations of institutional data',
    instructor: 'Prof. Michael Chen',
    students: 89,
    duration: '6 weeks',
    progress: 45,
    rating: 4.9,
    category: 'Visualization',
    level: 'Beginner',
    thumbnail: courseDataViz
  },
  {
    id: 3,
    title: 'Strategic Planning with Analytics',
    description: 'Using annual report insights for institutional strategic planning',
    instructor: 'Dr. Emily Rodriguez',
    students: 67,
    duration: '10 weeks',
    progress: 30,
    rating: 4.7,
    category: 'Strategy',
    level: 'Advanced',
    thumbnail: courseStrategy
  },
  {
    id: 4,
    title: 'Financial Performance Metrics',
    description: 'Deep dive into financial analysis and performance indicators',
    instructor: 'Prof. David Wilson',
    students: 124,
    duration: '12 weeks',
    progress: 60,
    rating: 4.6,
    category: 'Finance',
    level: 'Advanced',
    thumbnail: courseFinance
  }
];

export default function Courses() {
  const navigate = useNavigate();

  const handleCreateCourse = () => {
    navigate('/courses/create');
  };
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Course Management</h1>
          <p className="text-muted-foreground mt-2">Manage learning modules and annual report analytics courses</p>
        </div>
        <Button variant="gradient" size="lg" onClick={handleCreateCourse}>
          <Plus className="mr-2 h-5 w-5" />
          Create Course
        </Button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="bg-gradient-card shadow-elegant hover:shadow-elegant-lg transition-all duration-300 border-border/50 group">
            <CardHeader className="pb-4">
              {/* Course Thumbnail */}
              <div className="h-32 rounded-lg overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300 relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {course.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {course.level}
                  </Badge>
                </div>
                
                <CardTitle className="text-lg leading-tight">
                  {course.title}
                </CardTitle>
                
                <CardDescription className="text-sm">
                  {course.description}
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              
              {/* Course Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  {course.students} students
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {course.duration}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="mr-2 h-4 w-4 fill-current text-warning" />
                  {course.rating} rating
                </div>
              </div>
              
              <div className="text-sm">
                <span className="text-muted-foreground">Instructor: </span>
                <span className="font-medium text-foreground">{course.instructor}</span>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button variant="default" size="sm" className="flex-1">
                  View Course
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Creation Guide */}
      <Card className="bg-gradient-card shadow-elegant border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>Course Creation Guidelines</span>
          </CardTitle>
          <CardDescription>Best practices for creating effective learning modules</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Content Structure</h4>
            <p className="text-sm text-muted-foreground">
              Organize your annual report sections into digestible learning modules with clear objectives.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Assessment Integration</h4>
            <p className="text-sm text-muted-foreground">
              Include quizzes and assignments that test understanding of data analysis and insights.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Analytics Focus</h4>
            <p className="text-sm text-muted-foreground">
              Emphasize data interpretation, trend analysis, and strategic decision-making skills.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}