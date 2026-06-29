import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, Users, MapPin, Video, CheckCircle2, Edit, Trash2, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import StatsCard from '@/components/dashboard/StatsCard';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const initialEvents = [
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
    status: 'confirmed',
    description: 'Review Q4 performance and annual reports'
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
    status: 'confirmed',
    description: 'Hands-on workshop covering advanced analytics techniques'
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
    status: 'pending',
    description: 'Quarterly student performance assessment'
  }
];

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    type: 'meeting',
    date: new Date().toISOString().split('T')[0],
    time: '09:00 AM',
    duration: '1 hour',
    attendees: 1,
    location: '',
    isVirtual: false,
    status: 'pending',
    description: ''
  });

  // Load events from localStorage
  useEffect(() => {
    const storedEvents = localStorage.getItem('calendar_events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(initialEvents);
      localStorage.setItem('calendar_events', JSON.stringify(initialEvents));
    }
  }, []);

  // Save events to localStorage
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('calendar_events', JSON.stringify(events));
    }
  }, [events]);

  const handleScheduleEvent = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      type: 'meeting',
      date: new Date().toISOString().split('T')[0],
      time: '09:00 AM',
      duration: '1 hour',
      attendees: 1,
      location: '',
      isVirtual: false,
      status: 'pending',
      description: ''
    });
    setIsScheduleDialogOpen(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      type: event.type,
      date: event.date,
      time: event.time,
      duration: event.duration,
      attendees: event.attendees,
      location: event.location,
      isVirtual: event.isVirtual,
      status: event.status,
      description: event.description || ''
    });
    setIsScheduleDialogOpen(true);
  };

  const handleViewEvent = (event) => {
    setViewingEvent(event);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (event) => {
    setDeletingEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    const updatedEvents = events.filter(e => e.id !== deletingEvent.id);
    setEvents(updatedEvents);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Event Deleted",
      description: `${deletingEvent.title} has been removed from the calendar.`,
      variant: "destructive",
    });
    setDeletingEvent(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (editingEvent) {
      // Update existing event
      const updatedEvents = events.map(event =>
        event.id === editingEvent.id
          ? { ...event, ...formData }
          : event
      );
      setEvents(updatedEvents);
      toast({
        title: "Event Updated",
        description: `${formData.title} has been updated successfully.`,
      });
    } else {
      // Add new event
      const newEvent = {
        id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
        ...formData
      };
      setEvents([...events, newEvent]);
      toast({
        title: "Event Scheduled",
        description: `${formData.title} has been scheduled successfully.`,
      });
    }

    setIsScheduleDialogOpen(false);
    setEditingEvent(null);
  };

  const handleJoinMeeting = (event) => {
    toast({
      title: "Joining Meeting",
      description: `Connecting to ${event.title}...`,
    });
    // Simulate opening meeting link
    setTimeout(() => {
      toast({
        title: "Meeting Joined",
        description: "You have successfully joined the virtual meeting.",
      });
    }, 1500);
  };

  const handleExportCalendar = () => {
    const dataStr = JSON.stringify(events, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calendar-events.json';
    link.click();
    toast({
      title: "Calendar Exported",
      description: "Your calendar events have been exported successfully.",
    });
  };

  // Filter events by date
  const todayEvents = events.filter(e => e.date === new Date().toISOString().split('T')[0]);
  const upcomingEvents = events
    .filter(e => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  // Calculate stats
  const thisWeekStart = new Date();
  thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
  const thisWeekEnd = new Date(thisWeekStart);
  thisWeekEnd.setDate(thisWeekStart.getDate() + 6);
  
  const thisWeekEvents = events.filter(e => {
    const eventDate = new Date(e.date);
    return eventDate >= thisWeekStart && eventDate <= thisWeekEnd;
  }).length;

  const meetingsCount = events.filter(e => e.type === 'meeting').length;
  const workshopsCount = events.filter(e => e.type === 'workshop').length;
  const assessmentsCount = events.filter(e => e.type === 'assessment').length;

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
          <Button variant="outline" size="lg" onClick={handleExportCalendar}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Export Calendar
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
          value={thisWeekEvents.toString()}
          change="+3"
          changeType="positive"
          icon={CalendarIcon}
          gradient="bg-gradient-primary"
        />
        <StatsCard
          title="Meetings"
          value={meetingsCount.toString()}
          change="+2"
          changeType="positive"
          icon={Users}
          gradient="bg-gradient-success"
        />
        <StatsCard
          title="Workshops"
          value={workshopsCount.toString()}
          change="+1"
          changeType="positive"
          icon={Clock}
          gradient="bg-gradient-secondary"
        />
        <StatsCard
          title="Assessments"
          value={assessmentsCount.toString()}
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
              {todayEvents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No events scheduled for today</p>
                </div>
              ) : (
                todayEvents.map((event) => (
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
                            onClick={() => handleJoinMeeting(event)}
                          >
                            <Video className="mr-2 h-4 w-4" />
                            Join Meeting
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewEvent(event)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditEvent(event)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-destructive"
                          onClick={() => handleDeleteClick(event)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
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
              <Button variant="outline" className="w-full justify-start" onClick={handleScheduleEvent}>
                <Users className="mr-2 h-4 w-4" />
                Book Workshop
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleScheduleEvent}>
                <Clock className="mr-2 h-4 w-4" />
                Set Assessment
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleExportCalendar}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                Export Calendar
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
              {upcomingEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No upcoming events</p>
              ) : (
                upcomingEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => handleViewEvent(event)}
                  >
                    <p className="font-medium text-foreground text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date} at {event.time}</p>
                    <Badge variant="outline" className="text-xs mt-1 capitalize">
                      {event.type}
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Calendar Widget */}
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>Total events: {events.length}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4 bg-accent/20 rounded-lg">
                <div className="text-2xl font-bold text-foreground">
                  {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {events.length} total events scheduled
                </div>
                <Button variant="outline" size="sm" className="mt-3" onClick={handleScheduleEvent}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Schedule Event Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Edit Event' : 'Schedule New Event'}</DialogTitle>
            <DialogDescription>
              {editingEvent ? 'Update event details below.' : 'Enter event information below.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type *</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="assessment">Assessment</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="10:00 AM"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select 
                    value={formData.duration} 
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30 minutes">30 minutes</SelectItem>
                      <SelectItem value="1 hour">1 hour</SelectItem>
                      <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                      <SelectItem value="2 hours">2 hours</SelectItem>
                      <SelectItem value="3 hours">3 hours</SelectItem>
                      <SelectItem value="4 hours">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="attendees">Number of Attendees</Label>
                  <Input
                    id="attendees"
                    type="number"
                    min="1"
                    value={formData.attendees}
                    onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) || 1 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Conference Room A"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isVirtual"
                  checked={formData.isVirtual}
                  onCheckedChange={(checked) => setFormData({ ...formData, isVirtual: checked })}
                />
                <Label htmlFor="isVirtual" className="cursor-pointer">
                  Virtual Meeting
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter event description"
                  className="h-24"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="gradient">
                {editingEvent ? 'Update Event' : 'Schedule Event'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Event Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
            <DialogDescription>Complete event information</DialogDescription>
          </DialogHeader>
          {viewingEvent && (
            <div className="space-y-6 py-4">
              <div>
                <h3 className="text-2xl font-bold">{viewingEvent.title}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant={viewingEvent.status === 'confirmed' ? 'default' : 'secondary'} className="capitalize">
                    {viewingEvent.status}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {viewingEvent.type}
                  </Badge>
                </div>
              </div>

              {viewingEvent.description && (
                <div>
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="font-medium mt-1">{viewingEvent.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Date & Time</Label>
                    <p className="font-medium">{new Date(viewingEvent.date).toLocaleDateString()} at {viewingEvent.time}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Duration</Label>
                    <p className="font-medium">{viewingEvent.duration}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Attendees</Label>
                    <p className="font-medium text-2xl">{viewingEvent.attendees}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Location</Label>
                    <div className="flex items-center mt-1">
                      {viewingEvent.isVirtual ? (
                        <div className="flex items-center">
                          <Video className="mr-2 h-4 w-4" />
                          <span className="font-medium">Virtual Meeting</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span className="font-medium">{viewingEvent.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                {viewingEvent.isVirtual && (
                  <Button 
                    variant="gradient" 
                    onClick={() => {
                      handleJoinMeeting(viewingEvent);
                      setIsViewDialogOpen(false);
                    }}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Join Meeting
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    handleEditEvent(viewingEvent);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Event
                </Button>
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
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingEvent?.title}"? This action cannot be undone.
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
