import React, { useState } from 'react';
import { BookOpen, Plus, Upload, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function CourseCreate() {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [duration, setDuration] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSaveCourse = () => {
    if (!courseTitle || !courseDescription || !instructor) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Course Created",
      description: "Your course has been created successfully.",
    });
    navigate('/courses');
  };

  const handleCancel = () => {
    navigate('/courses');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg p-2">
            <BookOpen className="w-full h-full text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Course</h1>
            <p className="text-muted-foreground mt-1">Design and configure a new learning module</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="lg" onClick={handleCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button variant="gradient" size="lg" onClick={handleSaveCourse}>
            <Save className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential course details and description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter course title"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Course Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what students will learn in this course"
                  className="h-32"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor *</Label>
                  <Select value={instructor} onValueChange={setInstructor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select instructor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah-johnson">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="michael-chen">Prof. Michael Chen</SelectItem>
                      <SelectItem value="emily-rodriguez">Dr. Emily Rodriguez</SelectItem>
                      <SelectItem value="david-wilson">Prof. David Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 8 weeks"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Configuration */}
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle>Course Configuration</CardTitle>
              <CardDescription>Category, level, and learning objectives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="visualization">Visualization</SelectItem>
                      <SelectItem value="strategy">Strategy</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="reporting">Reporting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="level">Difficulty Level</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button variant="outline" onClick={handleAddTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                        {tag}
                        <X className="ml-1 h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Content Upload */}
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>Upload materials and resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">Upload Course Materials</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Files
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>Supported formats: PDF, DOCX, PPTX, MP4, ZIP</p>
                <p>Maximum file size: 100MB per file</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Preview */}
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle>Course Preview</CardTitle>
              <CardDescription>How your course will appear</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-32 bg-accent rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Course Thumbnail</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground">
                  {courseTitle || 'Course Title'}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {courseDescription || 'Course description will appear here...'}
                </p>
              </div>
              
              <div className="flex space-x-2">
                {category && (
                  <Badge variant="secondary" className="capitalize">
                    {category}
                  </Badge>
                )}
                {level && (
                  <Badge variant="outline" className="capitalize">
                    {level}
                  </Badge>
                )}
              </div>
              
              {instructor && (
                <p className="text-sm">
                  <span className="text-muted-foreground">Instructor: </span>
                  <span className="font-medium">
                    {instructor === 'sarah-johnson' ? 'Dr. Sarah Johnson' :
                     instructor === 'michael-chen' ? 'Prof. Michael Chen' :
                     instructor === 'emily-rodriguez' ? 'Dr. Emily Rodriguez' :
                     instructor === 'david-wilson' ? 'Prof. David Wilson' : instructor}
                  </span>
                </p>
              )}
              
              {duration && (
                <p className="text-sm">
                  <span className="text-muted-foreground">Duration: </span>
                  <span className="font-medium">{duration}</span>
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle>Course Creation Tips</CardTitle>
              <CardDescription>Best practices for effective courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <h5 className="font-medium text-foreground mb-1">Clear Objectives</h5>
                <p className="text-muted-foreground">Define what students will achieve by the end of the course.</p>
              </div>
              
              <div className="text-sm">
                <h5 className="font-medium text-foreground mb-1">Structured Content</h5>
                <p className="text-muted-foreground">Organize materials in logical, progressive modules.</p>
              </div>
              
              <div className="text-sm">
                <h5 className="font-medium text-foreground mb-1">Interactive Elements</h5>
                <p className="text-muted-foreground">Include quizzes, assignments, and discussions.</p>
              </div>
              
              <div className="text-sm">
                <h5 className="font-medium text-foreground mb-1">Assessment Strategy</h5>
                <p className="text-muted-foreground">Plan how you'll evaluate student progress.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}