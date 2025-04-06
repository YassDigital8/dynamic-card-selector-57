
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { JobPosition } from '@/models/JobModel';
import { JobApplication } from '@/models/ApplicationModel';
import { Briefcase, Users, Clock, CheckCircle, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface DashboardSummaryProps {
  jobs: JobPosition[];
  applications: JobApplication[];
  openPositions: number;
  candidatesCount: number;
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({ 
  jobs, 
  applications, 
  openPositions,
  candidatesCount
}) => {
  // Calculate statistics
  const activeJobs = jobs.filter(job => job.status === 'Open').length;
  const applicationsThisWeek = applications.filter(app => {
    const appDate = new Date(app.appliedDate);
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);
    return appDate >= weekAgo;
  }).length;
  
  const hiredCandidates = applications.filter(app => app.status === 'Hired').length;
  const interviewedCandidates = applications.filter(app => app.status === 'Interviewed').length;
  
  // Calculate percentages for the hiring pipeline
  const pendingPercentage = Math.round(applications.filter(app => app.status === 'Pending').length / applications.length * 100) || 0;
  const reviewedPercentage = Math.round(applications.filter(app => app.status === 'Reviewed').length / applications.length * 100) || 0;
  const interviewedPercentage = Math.round(interviewedCandidates / applications.length * 100) || 0;
  const offeredPercentage = Math.round(applications.filter(app => app.status === 'Offered').length / applications.length * 100) || 0;
  const hiredPercentage = Math.round(hiredCandidates / applications.length * 100) || 0;
  const rejectedPercentage = Math.round(applications.filter(app => app.status === 'Rejected').length / applications.length * 100) || 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs}</div>
            <p className="text-xs text-muted-foreground">
              {openPositions > activeJobs 
                ? `${openPositions - activeJobs} positions pending`
                : 'All positions are active'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">
              {applicationsThisWeek} new this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidates</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{candidatesCount}</div>
            <p className="text-xs text-muted-foreground">
              {interviewedCandidates} interviewed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hired</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hiredCandidates}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round(hiredCandidates / (applications.length || 1) * 100)}% success rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hiring Pipeline</CardTitle>
          <CardDescription>Current application statuses across all positions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span>Pending</span>
                </div>
                <span>{pendingPercentage}%</span>
              </div>
              <Progress value={pendingPercentage} className="h-2 bg-muted" indicatorColor="bg-yellow-500" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>Reviewed</span>
                </div>
                <span>{reviewedPercentage}%</span>
              </div>
              <Progress value={reviewedPercentage} className="h-2 bg-muted" indicatorColor="bg-blue-500" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <span>Interviewed</span>
                </div>
                <span>{interviewedPercentage}%</span>
              </div>
              <Progress value={interviewedPercentage} className="h-2 bg-muted" indicatorColor="bg-purple-500" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span>Offered</span>
                </div>
                <span>{offeredPercentage}%</span>
              </div>
              <Progress value={offeredPercentage} className="h-2 bg-muted" indicatorColor="bg-green-500" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                  <span>Hired</span>
                </div>
                <span>{hiredPercentage}%</span>
              </div>
              <Progress value={hiredPercentage} className="h-2 bg-muted" indicatorColor="bg-emerald-500" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                  <span>Rejected</span>
                </div>
                <span>{rejectedPercentage}%</span>
              </div>
              <Progress value={rejectedPercentage} className="h-2 bg-muted" indicatorColor="bg-red-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;
