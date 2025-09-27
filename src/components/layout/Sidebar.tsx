import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Users, 
  FileText, 
  Settings,
  GraduationCap,
  TrendingUp,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Students', href: '/students', icon: GraduationCap },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Users', href: '/users', icon: Users },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-gradient-card border-r border-border w-64 min-h-screen shadow-elegant">
      {/* Logo Section */}
      <div className="p-6 border-b border-border bg-gradient-primary">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">EduLMS</h1>
            <p className="text-primary-foreground/80 text-sm">Learning Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-gradient-primary text-white shadow-elegant'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon 
                className={cn(
                  'mr-3 h-5 w-5 transition-transform duration-200',
                  isActive ? 'text-white' : 'text-muted-foreground group-hover:text-accent-foreground',
                  'group-hover:scale-110'
                )} 
              />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-4 left-4 right-4">
        <NavLink
          to="/settings"
          className={cn(
            'flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group',
            location.pathname === '/settings'
              ? 'bg-gradient-primary text-white shadow-elegant'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
        >
          <Settings className="mr-3 h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
          Settings
        </NavLink>
      </div>
    </div>
  );
}