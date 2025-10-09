import React, { useState } from 'react';
import { MessageSquare, Send, Search, Plus, Paperclip, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import StatsCard from '@/components/dashboard/StatsCard';

const conversations = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'Instructor',
    lastMessage: 'The annual report analysis module is ready for review.',
    timestamp: '2 min ago',
    unread: 2,
    avatar: null,
    online: true
  },
  {
    id: 2,
    name: 'Alice Johnson',
    role: 'Student',
    lastMessage: 'Could you help me with the data visualization assignment?',
    timestamp: '15 min ago',
    unread: 1,
    avatar: null,
    online: true
  },
  {
    id: 3,
    name: 'Prof. Michael Chen',
    role: 'Faculty',
    lastMessage: 'Meeting scheduled for tomorrow at 2 PM.',
    timestamp: '1 hour ago',
    unread: 0,
    avatar: null,
    online: false
  }
];

const messages = [
  {
    id: 1,
    sender: 'Dr. Sarah Johnson',
    content: 'The annual report analysis module is ready for review. I\'ve included the latest performance metrics.',
    timestamp: '2:30 PM',
    isOwn: false
  },
  {
    id: 2,
    sender: 'You',
    content: 'Great! I\'ll review it this afternoon. Are there any specific areas you\'d like me to focus on?',
    timestamp: '2:32 PM',
    isOwn: true
  },
  {
    id: 3,
    sender: 'Dr. Sarah Johnson',
    content: 'Please pay special attention to the student engagement metrics in section 3.',
    timestamp: '2:35 PM',
    isOwn: false
  }
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast({
        title: "Message Sent",
        description: "Your message has been delivered.",
      });
      setNewMessage('');
    }
  };

  const handleNewConversation = () => {
    toast({
      title: "New Conversation",
      description: "Contact selection dialog would open here.",
    });
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg p-2">
            <MessageSquare className="w-full h-full text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Messages</h1>
            <p className="text-muted-foreground mt-1">Communicate with students, faculty, and staff</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="lg">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button variant="gradient" size="lg" onClick={handleNewConversation}>
            <Plus className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Messages"
          value="1,247"
          change="+18%"
          changeType="positive"
          icon={MessageSquare}
          gradient="bg-gradient-primary"
        />
        <StatsCard
          title="Unread"
          value="23"
          change="-12%"
          changeType="positive"
          icon={Badge}
          gradient="bg-gradient-secondary"
        />
        <StatsCard
          title="Active Chats"
          value="8"
          change="+3"
          changeType="positive"
          icon={Phone}
          gradient="bg-gradient-success"
        />
        <StatsCard
          title="Response Rate"
          value="94%"
          change="+5%"
          changeType="positive"
          icon={Send}
          gradient="bg-gradient-hero"
        />
      </div>

      {/* Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="bg-gradient-card shadow-elegant border-border/50">
          <CardHeader className="pb-4">
            <CardTitle>Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer transition-colors hover:bg-accent/50 ${
                    selectedConversation.id === conversation.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {conversation.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-foreground truncate">{conversation.name}</p>
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {conversation.role}
                      </Badge>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="bg-gradient-card shadow-elegant border-border/50 h-full flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b border-border/50">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{selectedConversation.name}</CardTitle>
                    <CardDescription>{selectedConversation.role}</CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? 'bg-gradient-primary text-white'
                        : 'bg-accent text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.isOwn ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 min-h-[40px] max-h-[120px]"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  variant="gradient" 
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}