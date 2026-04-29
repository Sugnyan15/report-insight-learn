import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, Filter, Download, Mail, Phone, MapPin, GraduationCap, Award, Edit, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import StatsCard from '@/components/dashboard/StatsCard';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialStudents = [
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
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    enrolledCourses: 0,
    completedCourses: 0,
    overallProgress: 0,
    status: 'active',
    joinDate: new Date().toISOString().split('T')[0]
  });

  // Load students from localStorage on mount
  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    } else {
      setStudents(initialStudents);
      localStorage.setItem('students', JSON.stringify(initialStudents));
    }
  }, []);

  // Save students to localStorage whenever they change
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students]);

  const handleAddStudent = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      enrolledCourses: 0,
      completedCourses: 0,
      overallProgress: 0,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0]
    });
    setIsDialogOpen(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      department: student.department,
      enrolledCourses: student.enrolledCourses,
      completedCourses: student.completedCourses,
      overallProgress: student.overallProgress,
      status: student.status,
      joinDate: student.joinDate
    });
    setIsDialogOpen(true);
  };

  const handleViewStudent = (student) => {
    setViewingStudent(student);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (student) => {
    setDeletingStudent(student);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    const updatedStudents = students.filter(s => s.id !== deletingStudent.id);
    setStudents(updatedStudents);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Student Deleted",
      description: `${deletingStudent.name} has been removed from the system.`,
      variant: "destructive",
    });
    setDeletingStudent(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.department) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (editingStudent) {
      // Update existing student
      const updatedStudents = students.map(student =>
        student.id === editingStudent.id
          ? { ...student, ...formData }
          : student
      );
      setStudents(updatedStudents);
      toast({
        title: "Student Updated",
        description: `${formData.name}'s information has been updated successfully.`,
      });
    } else {
      // Add new student
      const newStudent = {
        id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
        ...formData,
        avatar: null
      };
      setStudents([...students, newStudent]);
      toast({
        title: "Student Added",
        description: `${formData.name} has been added successfully.`,
      });
    }

    setIsDialogOpen(false);
    setEditingStudent(null);
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(students, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'students-data.json';
    link.click();
    toast({
      title: "Data Exported",
      description: "Student data has been exported successfully.",
    });
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = students.length;
  const activeEnrollments = students.reduce((sum, s) => sum + s.enrolledCourses, 0);
  const avgCompletionRate = students.length > 0 
    ? Math.round(students.reduce((sum, s) => sum + s.overallProgress, 0) / students.length)
    : 0;
  const newThisMonth = students.filter(s => {
    const joinDate = new Date(s.joinDate);
    const now = new Date();
    return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
  }).length;

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
          <Button variant="outline" size="lg" onClick={handleExportData}>
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
          value={totalStudents.toString()}
          change="+12%"
          changeType="positive"
          icon={Users}
          gradient="bg-gradient-primary"
        />
        <StatsCard
          title="Active Enrollments"
          value={activeEnrollments.toString()}
          change="+8%"
          changeType="positive"
          icon={GraduationCap}
          gradient="bg-gradient-success"
        />
        <StatsCard
          title="Completion Rate"
          value={`${avgCompletionRate}%`}
          change="+5%"
          changeType="positive"
          icon={Award}
          gradient="bg-gradient-secondary"
        />
        <StatsCard
          title="New This Month"
          value={newThisMonth.toString()}
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
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditStudent(student)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-destructive"
                    onClick={() => handleDeleteClick(student)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewStudent(student)}
                >
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

      {/* Add/Edit Student Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingStudent ? 'Edit Student' : 'Add New Student'}</DialogTitle>
            <DialogDescription>
              {editingStudent ? 'Update student information below.' : 'Enter student information below.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@university.edu"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select 
                    value={formData.department} 
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Business Analytics">Business Analytics</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="enrolledCourses">Enrolled Courses</Label>
                  <Input
                    id="enrolledCourses"
                    type="number"
                    min="0"
                    value={formData.enrolledCourses}
                    onChange={(e) => setFormData({ ...formData, enrolledCourses: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="completedCourses">Completed Courses</Label>
                  <Input
                    id="completedCourses"
                    type="number"
                    min="0"
                    value={formData.completedCourses}
                    onChange={(e) => setFormData({ ...formData, completedCourses: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overallProgress">Progress (%)</Label>
                  <Input
                    id="overallProgress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.overallProgress}
                    onChange={(e) => setFormData({ ...formData, overallProgress: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="graduated">Graduated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input
                    id="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="gradient">
                {editingStudent ? 'Update Student' : 'Add Student'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Student Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
            <DialogDescription>Detailed information about the student</DialogDescription>
          </DialogHeader>
          {viewingStudent && (
            <div className="space-y-6 py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={viewingStudent.avatar} />
                  <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                    {viewingStudent.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-bold">{viewingStudent.name}</h3>
                  <p className="text-muted-foreground">{viewingStudent.department}</p>
                  <Badge variant={viewingStudent.status === 'active' ? 'default' : 'secondary'} className="mt-2">
                    {viewingStudent.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{viewingStudent.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Phone</Label>
                    <p className="font-medium">{viewingStudent.phone}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Join Date</Label>
                    <p className="font-medium">{new Date(viewingStudent.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Enrolled Courses</Label>
                    <p className="font-medium text-2xl">{viewingStudent.enrolledCourses}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Completed Courses</Label>
                    <p className="font-medium text-2xl">{viewingStudent.completedCourses}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Overall Progress</Label>
                    <div className="space-y-2 mt-2">
                      <Progress value={viewingStudent.overallProgress} className="h-3" />
                      <p className="font-medium text-xl">{viewingStudent.overallProgress}%</p>
                    </div>
                  </div>
                </div>
              </div>
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
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {deletingStudent?.name}? This action cannot be undone.
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
