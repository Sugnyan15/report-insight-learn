import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Clock, Star, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getCourses, deleteCourse, Course } from '@/lib/courseStorage';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import courseAnnualReport from '@/assets/course-annual-report.jpg';
import courseDataViz from '@/assets/course-data-viz.jpg';
import courseStrategy from '@/assets/course-strategy.jpg';
import courseFinance from '@/assets/course-finance.jpg';

// Default thumbnails mapping
const defaultThumbnails: { [key: string]: string } = {
  'Analytics': courseAnnualReport,
  'Visualization': courseDataViz,
  'Strategy': courseStrategy,
  'Finance': courseFinance,
};

export default function Courses() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);

  // Load courses from localStorage
  useEffect(() => {
    loadCourses();
  }, [location.pathname]); // Reload when navigating back to this page

  const loadCourses = () => {
    const loadedCourses = getCourses();
    setCourses(loadedCourses);
  };

  const handleCreateCourse = () => {
    navigate('/courses/create');
  };

  const handleEditCourse = (id: number) => {
    navigate(`/courses/edit/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    setCourseToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (courseToDelete !== null) {
      const success = deleteCourse(courseToDelete);
      if (success) {
        toast({
          title: "Course Deleted",
          description: "The course has been deleted successfully.",
        });
        loadCourses(); // Reload courses
      } else {
        toast({
          title: "Delete Failed",
          description: "Failed to delete the course.",
          variant: "destructive",
        });
      }
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  const getThumbnail = (course: Course): string => {
    if (course.thumbnail) {
      return course.thumbnail;
    }
    // Use default thumbnail based on category
    return defaultThumbnails[course.category] || courseAnnualReport;
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
                  src={getThumbnail(course)} 
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
                  <span className="font-medium">{course.progress || 0}%</span>
                </div>
                <Progress value={course.progress || 0} className="h-2" />
              </div>
              
              {/* Course Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  {course.students || 0} students
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {course.duration || 'Not specified'}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="mr-2 h-4 w-4 fill-current text-warning" />
                  {course.rating || 0} rating
                </div>
              </div>
              
              <div className="text-sm">
                <span className="text-muted-foreground">Instructor: </span>
                <span className="font-medium text-foreground">{course.instructor}</span>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditCourse(course.id)}
                >
                  View Course
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEditCourse(course.id)}
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteClick(course.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the course
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}