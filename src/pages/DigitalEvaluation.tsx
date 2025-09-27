import React, { useState } from 'react';
import { GraduationCap, CheckCircle, X, Clock, Award, Download, FileText, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import StatsCard from '@/components/dashboard/StatsCard';

// Mock data for evaluations
const evaluations = [
  {
    id: 1,
    student: 'Alice Johnson',
    course: 'Annual Report Analysis 2024',
    type: 'Quiz',
    status: 'completed',
    score: 88,
    maxScore: 100,
    submissionDate: '2024-03-15',
    evaluator: 'Dr. Sarah Johnson'
  },
  {
    id: 2,
    student: 'Bob Smith',
    course: 'Data Visualization for Reports',
    type: 'Assignment',
    status: 'pending',
    score: null,
    maxScore: 100,
    submissionDate: '2024-03-14',
    evaluator: 'Prof. Michael Chen'
  },
  {
    id: 3,
    student: 'Carol Davis',
    course: 'Strategic Planning with Analytics',
    type: 'Project',
    status: 'in-review',
    score: null,
    maxScore: 100,
    submissionDate: '2024-03-13',
    evaluator: 'Dr. Emily Rodriguez'
  }
];

const digitalAssessments = [
  {
    id: 1,
    title: 'Financial Analysis Quiz',
    course: 'Annual Report Analysis 2024',
    questions: 25,
    duration: 60,
    submissions: 43,
    avgScore: 82
  },
  {
    id: 2,
    title: 'Data Visualization Project',
    course: 'Data Visualization for Reports',
    questions: 5,
    duration: 120,
    submissions: 31,
    avgScore: 89
  }
];

export default function DigitalEvaluation() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const { toast } = useToast();

  const handleGradeSubmission = (evaluationId: number, score: number) => {
    toast({
      title: "Grade Submitted",
      description: `Grade of ${score}/100 has been recorded successfully.`,
    });
  };

  const handleCreateAssessment = () => {
    toast({
      title: "Assessment Created",
      description: "New digital assessment has been created successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg p-2">
            <GraduationCap className="w-full h-full text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Digital Evaluation</h1>
            <p className="text-muted-foreground mt-1">Comprehensive assessment and grading system</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Export Grades
          </Button>
          <Button variant="gradient" size="lg" onClick={handleCreateAssessment}>
            <FileText className="mr-2 h-4 w-4" />
            Create Assessment
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Submissions"
          value="247"
          change="+12%"
          changeType="positive"
          icon={FileText}
          gradient="bg-gradient-primary"
        />
        <StatsCard
          title="Pending Reviews"
          value="18"
          change="-8%"
          changeType="positive"
          icon={Clock}
          gradient="bg-gradient-secondary"
        />
        <StatsCard
          title="Average Score"
          value="84%"
          change="+3%"
          changeType="positive"
          icon={Award}
          gradient="bg-gradient-success"
        />
        <StatsCard
          title="Active Assessments"
          value="12"
          change="+2"
          changeType="positive"
          icon={BarChart3}
          gradient="bg-gradient-hero"
        />
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-accent">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="grading">Grading Queue</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Submissions */}
            <Card className="bg-gradient-card shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Recent Submissions</span>
                </CardTitle>
                <CardDescription>Latest student submissions requiring attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {evaluations.slice(0, 3).map((evaluation) => (
                  <div key={evaluation.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{evaluation.student}</p>
                      <p className="text-sm text-muted-foreground">{evaluation.course}</p>
                      <p className="text-xs text-muted-foreground">{evaluation.submissionDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={
                          evaluation.status === 'completed' ? 'default' : 
                          evaluation.status === 'pending' ? 'destructive' : 'secondary'
                        }
                      >
                        {evaluation.status}
                      </Badge>
                      {evaluation.score && (
                        <span className="text-sm font-medium">{evaluation.score}/100</span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common evaluation tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="gradient" className="w-full justify-start" onClick={() => setActiveTab('grading')}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Review Pending Submissions
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('assessments')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Create New Assessment
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('analytics')}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Performance Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export Grade Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="grading" className="space-y-6">
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle>Grading Queue</CardTitle>
              <CardDescription>Student submissions waiting for evaluation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evaluations.filter(e => e.status !== 'completed').map((evaluation) => (
                  <Card key={evaluation.id} className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-foreground">{evaluation.student}</h4>
                          <p className="text-sm text-muted-foreground">{evaluation.course}</p>
                          <p className="text-sm text-muted-foreground">Type: {evaluation.type}</p>
                          <p className="text-sm text-muted-foreground">Submitted: {evaluation.submissionDate}</p>
                        </div>
                        <Badge variant={evaluation.status === 'pending' ? 'destructive' : 'secondary'}>
                          {evaluation.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`score-${evaluation.id}`}>Score (out of {evaluation.maxScore})</Label>
                            <Input
                              id={`score-${evaluation.id}`}
                              type="number"
                              min="0"
                              max={evaluation.maxScore}
                              placeholder="Enter score"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`feedback-${evaluation.id}`}>Feedback</Label>
                            <Textarea
                              id={`feedback-${evaluation.id}`}
                              placeholder="Provide feedback to student"
                              className="h-20"
                            />
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="gradient" 
                            size="sm"
                            onClick={() => handleGradeSubmission(evaluation.id, 85)}
                          >
                            Submit Grade
                          </Button>
                          <Button variant="outline" size="sm">
                            View Submission
                          </Button>
                          <Button variant="outline" size="sm">
                            Request Revision
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Assessment List */}
            <Card className="bg-gradient-card shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle>Active Assessments</CardTitle>
                <CardDescription>Current digital assessments and quizzes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {digitalAssessments.map((assessment) => (
                  <div key={assessment.id} className="p-4 border border-border/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">{assessment.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{assessment.course}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Questions: </span>
                        <span className="font-medium">{assessment.questions}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration: </span>
                        <span className="font-medium">{assessment.duration} min</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Submissions: </span>
                        <span className="font-medium">{assessment.submissions}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg Score: </span>
                        <span className="font-medium">{assessment.avgScore}%</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm">View Results</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Create Assessment Form */}
            <Card className="bg-gradient-card shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle>Create New Assessment</CardTitle>
                <CardDescription>Set up a new digital evaluation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assessment-title">Assessment Title</Label>
                  <Input id="assessment-title" placeholder="Enter assessment title" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="course-select">Course</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual-report">Annual Report Analysis 2024</SelectItem>
                      <SelectItem value="data-viz">Data Visualization for Reports</SelectItem>
                      <SelectItem value="strategy">Strategic Planning with Analytics</SelectItem>
                      <SelectItem value="finance">Financial Performance Metrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input id="duration" type="number" placeholder="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="total-marks">Total Marks</Label>
                    <Input id="total-marks" type="number" placeholder="100" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Assessment Type</Label>
                  <RadioGroup defaultValue="quiz">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quiz" id="quiz" />
                      <Label htmlFor="quiz">Quiz</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="assignment" id="assignment" />
                      <Label htmlFor="assignment">Assignment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="project" id="project" />
                      <Label htmlFor="project">Project</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button variant="gradient" className="w-full" onClick={handleCreateAssessment}>
                  Create Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-gradient-card shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle>Evaluation Analytics</CardTitle>
              <CardDescription>Performance insights and grade distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Grade Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>A (90-100%)</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>B (80-89%)</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>C (70-79%)</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Below 70%</span>
                      <span className="font-medium">5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Course Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Annual Report Analysis</span>
                      <span className="font-medium">84%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Data Visualization</span>
                      <span className="font-medium">89%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Strategic Planning</span>
                      <span className="font-medium">81%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Financial Metrics</span>
                      <span className="font-medium">86%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Submission Trends</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                      <div className="text-sm font-medium text-success">On Time</div>
                      <div className="text-xs text-muted-foreground">78% of submissions</div>
                    </div>
                    <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                      <div className="text-sm font-medium text-warning">Late</div>
                      <div className="text-xs text-muted-foreground">18% of submissions</div>
                    </div>
                    <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                      <div className="text-sm font-medium text-destructive">Missing</div>
                      <div className="text-xs text-muted-foreground">4% of submissions</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}