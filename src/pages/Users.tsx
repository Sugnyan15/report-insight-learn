import React, { useState } from 'react';
import { Users as UsersIcon, Search, Plus, Filter, Shield, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import StatsCard from '@/components/dashboard/StatsCard';

const users = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    role: 'instructor',
    department: 'Business Analytics',
    status: 'active',
    lastLogin: '2024-03-15 10:30 AM',
    joinDate: '2023-01-15',
    avatar: null
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
    phone: '+1 (555) 234-5678',
    role: 'faculty',
    department: 'Data Science',
    status: 'active',
    lastLogin: '2024-03-14 3:45 PM',
    joinDate: '2022-08-20',
    avatar: null
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice.johnson@student.edu',
    phone: '+1 (555) 345-6789',
    role: 'student',
    department: 'Business Analytics',
    status: 'active',
    lastLogin: '2024-03-15 9:15 AM',
    joinDate: '2023-09-01',
    avatar: null
  },
  {
    id: 4,
    name: 'John Admin',
    email: 'john.admin@university.edu',
    phone: '+1 (555) 456-7890',
    role: 'admin',
    department: 'IT Services',
    status: 'active',
    lastLogin: '2024-03-15 11:00 AM',
    joinDate: '2021-03-10',
    avatar: null
  }
];

const roleColors = {
  admin: 'destructive',
  faculty: 'default',
  instructor: 'secondary',
  student: 'outline'
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "User registration form would open here.",
    });
  };

  const handleEditUser = (userId: number) => {
    toast({
      title: "Edit User",
      description: `Edit form for user ${userId} would open here.`,
    });
  };

  const handleDeleteUser = (userId: number) => {
    toast({
      title: "Delete User",
      description: "Confirmation dialog would appear here.",
      variant: "destructive",
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return Shield;
      case 'faculty':
      case 'instructor':
        return UsersIcon;
      default:
        return UsersIcon;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg p-2">
            <UsersIcon className="w-full h-full text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground mt-1">Manage system users and permissions</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="lg">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filter
          </Button>
          <Button variant="gradient" size="lg" onClick={handleAddUser}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value="2,847"
          change="+12%"
          changeType="positive"
          icon={UsersIcon}
          gradient="bg-gradient-primary"
        />
        <StatsCard
          title="Active Users"
          value="2,634"
          change="+8%"
          changeType="positive"
          icon={Shield}
          gradient="bg-gradient-success"
        />
        <StatsCard
          title="Faculty"
          value="156"
          change="+3"
          changeType="positive"
          icon={UsersIcon}
          gradient="bg-gradient-secondary"
        />
        <StatsCard
          title="Students"
          value="2,478"
          change="+15%"
          changeType="positive"
          icon={UsersIcon}
          gradient="bg-gradient-hero"
        />
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card shadow-elegant border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card className="bg-gradient-card shadow-elegant border-border/50">
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>System users and their information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => {
              const RoleIcon = getRoleIcon(user.role);
              return (
                <Card key={user.id} className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-foreground">{user.name}</h4>
                            <Badge variant={roleColors[user.role]} className="capitalize">
                              <RoleIcon className="mr-1 h-3 w-3" />
                              {user.role}
                            </Badge>
                            <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                              {user.status}
                            </Badge>
                          </div>
                          
                          <div className="mt-1 space-y-1">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Mail className="mr-2 h-4 w-4" />
                              {user.email}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Phone className="mr-2 h-4 w-4" />
                              {user.phone}
                            </div>
                          </div>
                          
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Department: </span>
                              <span className="font-medium">{user.department}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Last Login: </span>
                              <span className="font-medium">{user.lastLogin}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Joined: </span>
                              <span className="font-medium">{user.joinDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditUser(user.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}