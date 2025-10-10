import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, Users, MapPin, Video, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import StatsCard from '@/components/dashboard/StatsCard';

const events = [
  {
    id: 1,
    title: 'Annual Report Review Meeting',
    type: 'meeting',
    date: '2024-03-20',
    time: '10:00 AM',
    duration: '2 hours',
    attendees: 12,
    location: 'Conference Room A',
    isVirtual: false,
    status: 'confirmed'
  },
  {
    id: 2,
    title: 'Data Analytics Workshop',
    type: 'workshop',
    date: '2024-03-22',
    time: '2:00 PM',
    duration: '3 hours',
    attendees: 25,
    location: 'Virtual',
    isVirtual: true,
    status: 'confirmed'
  },
  {
    id: 3,
    title: 'Student Progress Assessment',
    type: 'assessment',
    date: '2024-03-25',
    time: '9:00 AM',
    duration: '4 hours',
    attendees: 8,
    location: 'Evaluation Center',
    isVirtual: false,
    status: 'pending'
  }
];

const upcomingEvents = [
  {
    id: 4,
    title: 'Faculty Training Session',
    date: '2024-03-28',
    time: '11:00 AM',
    type: 'training'
  },
  {
    id: 5,
    title: 'Quarterly Performance Review',
    date: '2024-03-30',
    time: '3:00 PM',
    type: 'review'
  }
];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { toast } = useToast();

  const handleScheduleEvent = () => {
    toast({
      title: "Schedule Event",
      description: "Event scheduling form would open here.",
    });
  };

  const handleJoinMeeting = (eventId: number) => {
    toast({
      title: "Joining Meeting",
      description: "Redirecting to meeting platform...",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg p-2">
            <CalendarIcon className="w-full h-full text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calendar & Events</h1>
            <p className="text-muted-foreground mt-1">Schedule and manage meetings, workshops, and assessments</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="lg">
            <CalendarIcon className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
          <Button variant="gradient" size="lg" onClick={handleScheduleEvent}>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Event
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="This Week"
          value="12"
          change="+3"
          changeType="positive"
          icon={CalendarIcon}
          gradient="bg-gradient-primary"
        />
        <StatsCard
          title="Meetings"
          value="8"
          change="+2"
          changeType="positive"
          icon={Users}
          gradient="bg-gradient-success"
        />
        <StatsCard
          title="Workshops"
          value="4"
          change="+1"
          changeType="positive"
          icon={Clock}
          gradient="bg-gradient-secondary"
        />
        <StatsCard
          title="Assessments"
          value="6"
          change="+2"
          changeType="positive"
          icon={CheckCircle2}
          gradient="bg-gradient-hero"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Events */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle>Today's Events</CardTitle>
              <CardDescription>Scheduled meetings and activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{event.title}</h4>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {event.time} ({event.duration})
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            {event.attendees} attendees
                          </div>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          {event.isVirtual ? (
                            <div className="flex items-center">
                              <Video className="mr-1 h-4 w-4" />
                              Virtual Meeting
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={event.status === 'confirmed' ? 'default' : 'secondary'}
                          className="capitalize"
                        >
                          {event.status}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {event.isVirtual && (
                        <Button 
                          variant="gradient" 
                          size="sm"
                          onClick={() => handleJoinMeeting(event.id)}
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Join Meeting
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common scheduling tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="gradient" className="w-full justify-start" onClick={handleScheduleEvent}>
                <Plus className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Book Workshop
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Set Assessment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                View Full Calendar
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Next scheduled activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <p className="font-medium text-foreground text-sm">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date} at {event.time}</p>
                  <Badge variant="outline" className="text-xs mt-1 capitalize">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Calendar Widget */}
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>Navigate to specific dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4 bg-accent/20 rounded-lg">
                <div className="text-2xl font-bold text-foreground">March 2024</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Click to view full calendar
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  Open Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}