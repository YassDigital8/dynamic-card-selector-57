import React, { useState, useEffect } from 'react';
import { 
  JobApplication, 
  Candidate 
} from '@/models/ApplicationModel';
import { JobPosition } from '@/models/JobModel';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { 
  Briefcase,
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Clock,
  Calendar as CalendarIcon,
  SendHorizontal,
  CheckCircle2,
  XCircle,
  MessageSquare,
  AlertCircle,
  Info,
  File,
  Download
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useApplicationsData } from '@/hooks/hr/useApplicationsData';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

interface ApplicationDetailsProps {
  application: JobApplication;
  job?: JobPosition;
  candidate?: Candidate;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (newStatus: JobApplication['status']) => void;
  onUpdateNotes?: (notes: string) => void;
  onScheduleInterview?: (interviewDate: string) => void;
  onSendOffer?: (offerDetails: string) => void;
}

const getValidNextStatuses = (currentStatus: JobApplication['status']): JobApplication['status'][] => {
  switch (currentStatus) {
    case 'Pending':
      return ['Reviewed', 'Rejected'];
    case 'Reviewed':
      return ['Interviewed', 'Rejected'];
    case 'Interviewed':
      return ['Offered', 'Rejected'];
    case 'Offered':
      return ['Hired', 'Rejected'];
    case 'Rejected':
      return ['Pending']; // Allow reopening a rejected application
    case 'Hired':
      return []; // No transitions from Hired
    default:
      return [];
  }
};

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({
  application,
  job,
  candidate,
  isOpen,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
  onScheduleInterview,
  onSendOffer
}) => {
  const [notes, setNotes] = useState(application.notes || '');
  const [interviewDate, setInterviewDate] = useState<Date | undefined>(
    application.interviewDate ? new Date(application.interviewDate) : undefined
  );
  const [offerDetails, setOfferDetails] = useState(application.offerDetails || '');
  const [activeTab, setActiveTab] = useState('details');
  const [selectedStatus, setSelectedStatus] = useState<JobApplication['status']>(application.status);
  const { applications } = useApplicationsData();
  const validNextStatuses = getValidNextStatuses(application.status);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  
  const getEarliestStatusForJob = (): JobApplication['status'] => {
    const jobApplications = applications.filter(app => app.jobId === application.jobId);
    if (jobApplications.length <= 1) return application.status;
    
    const statusOrder: JobApplication['status'][] = [
      'Pending', 'Reviewed', 'Interviewed', 'Offered', 'Hired', 'Rejected'
    ];
    
    let earliestStatusIndex = statusOrder.length - 1;
    
    jobApplications.forEach(app => {
      if (app.id !== application.id) {
        const appStatusIndex = statusOrder.indexOf(app.status);
        if (appStatusIndex < earliestStatusIndex) {
          earliestStatusIndex = appStatusIndex;
        }
      }
    });
    
    return statusOrder[earliestStatusIndex];
  };
  
  const getJobApplicationStats = () => {
    const jobApplications = applications.filter(app => app.jobId === application.jobId);
    const total = jobApplications.length;
    
    const statusCounts: Record<JobApplication['status'], number> = {
      'Pending': 0,
      'Reviewed': 0,
      'Interviewed': 0,
      'Offered': 0,
      'Hired': 0,
      'Rejected': 0
    };
    
    jobApplications.forEach(app => {
      statusCounts[app.status]++;
    });
    
    return { total, statusCounts };
  };
  
  const jobStats = getJobApplicationStats();
  const earliestStatus = getEarliestStatusForJob();
  
  useEffect(() => {
    setSelectedStatus(application.status);
  }, [application]);
  
  const handleSaveNotes = () => {
    if (onUpdateNotes) {
      onUpdateNotes(notes);
    }
  };

  const handleScheduleInterview = () => {
    if (onScheduleInterview && interviewDate) {
      onScheduleInterview(interviewDate.toISOString());
      
      if (application.status === 'Reviewed') {
        onUpdateStatus('Interviewed');
      }
      
      toast('Interview scheduled', {
        description: `Interview with ${candidate?.name || 'candidate'} has been scheduled.`
      });
    }
  };

  const handleSendOffer = () => {
    if (onSendOffer && offerDetails) {
      onSendOffer(offerDetails);
      
      onUpdateStatus('Offered');
      
      toast('Offer sent', {
        description: `Job offer has been sent to ${candidate?.name || 'candidate'}.`
      });
    }
  };

  const handleStatusChange = (status: JobApplication['status']) => {
    setSelectedStatus(status);
    onUpdateStatus(status);
  };

  const getStatusColor = () => {
    switch (application.status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'Reviewed':
        return 'bg-blue-500';
      case 'Interviewed':
        return 'bg-purple-500';
      case 'Offered':
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      case 'Hired':
        return 'bg-emerald-500';
      default:
        return 'bg-gray-500';
    }
  };

  const canAdvanceToNextStage = (nextStatus: JobApplication['status']): boolean => {
    if (nextStatus === 'Rejected' || (application.status === 'Rejected' && nextStatus === 'Pending')) {
      return true;
    }
    
    const statusOrder: JobApplication['status'][] = [
      'Pending', 'Reviewed', 'Interviewed', 'Offered', 'Hired'
    ];
    
    const nextStatusIndex = statusOrder.indexOf(nextStatus);
    const earliestStatusIndex = statusOrder.indexOf(earliestStatus);
    
    return nextStatusIndex <= earliestStatusIndex || application.status === earliestStatus;
  };

  const renderPdfViewer = (url: string) => {
    return (
      <div className="flex flex-col space-y-4">
        <div className="rounded-md border bg-card text-card-foreground shadow-sm">
          <div className="p-4 flex justify-between items-center border-b">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Candidate Resume</h3>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => window.open(url, '_blank')}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <div className="relative w-full h-[500px] overflow-hidden">
            <iframe 
              src={`${url}#toolbar=0&navpanes=0`}
              className="w-full h-full border-0"
              title="Resume PDF Viewer"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Application Details
            <Badge className={getStatusColor()}>
              {application.status}
            </Badge>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 ml-auto">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">
                    Fair evaluation system: all applicants for a position must reach the same stage
                    before any can advance to the next stage in the hiring process.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTitle>
        </DialogHeader>
        
        {jobStats.total > 1 && (
          <Alert className="mb-4 bg-blue-50 dark:bg-blue-950/30">
            <Info className="h-4 w-4" />
            <AlertTitle>Fair Evaluation Process</AlertTitle>
            <AlertDescription className="text-sm">
              <p className="mb-1">
                This application is for <strong>{job?.title || 'a position'}</strong> with <strong>{jobStats.total} total applicants</strong>.
              </p>
              <p>
                Current stage distribution: {jobStats.statusCounts.Pending} Pending, {jobStats.statusCounts.Reviewed} Reviewed, 
                {jobStats.statusCounts.Interviewed} Interviewed, {jobStats.statusCounts.Offered} Offered, 
                {jobStats.statusCounts.Hired} Hired, {jobStats.statusCounts.Rejected} Rejected
              </p>
              {application.status !== earliestStatus && earliestStatus !== 'Rejected' && (
                <p className="mt-1 text-blue-700 dark:text-blue-300 font-medium">
                  All applications must reach the "{earliestStatus}" stage before advancing further.
                </p>
              )}
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-5">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="interview">Interview</TabsTrigger>
            <TabsTrigger value="offer">Offer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-primary" />
                    Job Details
                  </h3>
                  <div className="space-y-2 pl-7">
                    <div>
                      <span className="font-medium">Position:</span> {job?.title || 'Unknown Position'}
                    </div>
                    <div>
                      <span className="font-medium">Department:</span> {job?.department || 'Unknown Department'}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {job?.location || 'Unknown Location'}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span> {job?.type || 'Unknown Type'}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Application Info
                  </h3>
                  <div className="space-y-2 pl-7">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium mr-2">Applied:</span> 
                      {format(new Date(application.appliedDate), 'MMM dd, yyyy')}
                    </div>
                    {application.interviewDate && (
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium mr-2">Interview:</span> 
                        {format(new Date(application.interviewDate), 'MMM dd, yyyy - HH:mm')}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center">
                    <User className="mr-2 h-5 w-5 text-primary" />
                    Candidate Information
                  </h3>
                  <div className="space-y-2 pl-7">
                    <div className="text-xl font-medium">{candidate?.name || 'Unknown Candidate'}</div>
                    {candidate?.currentPosition && (
                      <div className="text-muted-foreground">
                        {candidate.currentPosition}{candidate.currentCompany ? ` at ${candidate.currentCompany}` : ''}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={`mailto:${candidate?.email}`} className="text-primary hover:underline">
                        {candidate?.email || 'N/A'}
                      </a>
                    </div>
                    {candidate?.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={`tel:${candidate.phone}`} className="text-primary hover:underline">
                          {candidate.phone}
                        </a>
                      </div>
                    )}
                    {candidate?.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        {candidate.location}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Experience:</span> {candidate?.experience} years
                    </div>
                    {candidate?.skills && candidate.skills.length > 0 && (
                      <div>
                        <span className="font-medium">Skills:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {candidate.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="bg-primary/10">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-4 space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <File className="mr-2 h-5 w-5 text-primary" />
                Application Documents
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {application.resumeUrl ? (
                  <div>
                    <h4 className="text-md font-medium mb-2">Resume/CV</h4>
                    {renderPdfViewer(application.resumeUrl)}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground text-center">No resume/CV has been uploaded for this application.</p>
                    </CardContent>
                  </Card>
                )}
                
                {application.coverLetterUrl && (
                  <div className="mt-4">
                    <h4 className="text-md font-medium mb-2">Cover Letter</h4>
                    {renderPdfViewer(application.coverLetterUrl)}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Application Notes
              </h3>
              <Textarea
                className="min-h-[200px]"
                placeholder="Add notes about this application..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button onClick={handleSaveNotes} className="mt-2">
                Save Notes
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="interview" className="mt-4 space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                Schedule Interview
              </h3>
              
              {(application.status === 'Pending' || application.status === 'Reviewed') ? (
                <>
                  {canAdvanceToNextStage('Interviewed') ? (
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col space-y-2">
                        <label className="font-medium">Interview Date & Time</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="justify-start text-left"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {interviewDate ? format(interviewDate, 'PPP') : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={interviewDate}
                              onSelect={setInterviewDate}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        
                        {interviewDate && (
                          <div className="flex items-center gap-2">
                            <Input
                              type="time"
                              className="w-32"
                              onChange={(e) => {
                                const [hours, minutes] = e.target.value.split(':');
                                const newDate = new Date(interviewDate);
                                newDate.setHours(Number(hours));
                                newDate.setMinutes(Number(minutes));
                                setInterviewDate(newDate);
                              }}
                              defaultValue={
                                interviewDate ? 
                                `${interviewDate.getHours().toString().padStart(2, '0')}:${interviewDate.getMinutes().toString().padStart(2, '0')}` :
                                "09:00"
                              }
                            />
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        onClick={handleScheduleInterview} 
                        disabled={!interviewDate}
                        className="mt-2"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Schedule Interview
                      </Button>
                    </div>
                  ) : (
                    <Alert className="bg-amber-50 dark:bg-amber-900/30 border-amber-200">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertTitle>Cannot schedule interview yet</AlertTitle>
                      <AlertDescription className="text-sm">
                        Other applications for this position need to reach the "{earliestStatus}" stage first.
                        {jobStats.statusCounts.Pending > 0 && (
                          <p className="mt-1">There are {jobStats.statusCounts.Pending} applications still in the "Pending" stage.</p>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              ) : application.status === 'Interviewed' ? (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Interview already scheduled</p>
                      <p className="text-sm text-muted-foreground">
                        {application.interviewDate ? (
                          `Scheduled for ${format(new Date(application.interviewDate), 'PPP p')}`
                        ) : 'Interview has been conducted'}
                      </p>
                      <Button variant="link" className="h-auto p-0 text-sm" onClick={() => setActiveTab('notes')}>
                        Add interview notes instead
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-md">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Cannot schedule interview at this stage</p>
                      <p className="text-sm text-muted-foreground">
                        The application is currently in the "{application.status}" stage
                      </p>
                      {application.status === 'Rejected' && (
                        <Button variant="link" className="h-auto p-0 text-sm" 
                                onClick={() => handleStatusChange('Pending')}>
                          Move back to Pending stage
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="offer" className="mt-4 space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <SendHorizontal className="mr-2 h-5 w-5 text-primary" />
                Job Offer
              </h3>
              
              {application.status === 'Interviewed' ? (
                <>
                  {canAdvanceToNextStage('Offered') ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="font-medium">Offer Details</label>
                        <Textarea
                          placeholder="Enter the job offer details, including salary, benefits, start date, etc."
                          className="min-h-[150px]"
                          value={offerDetails}
                          onChange={(e) => setOfferDetails(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleSendOffer} 
                          disabled={!offerDetails.trim()}
                          className="flex-1"
                        >
                          <SendHorizontal className="mr-2 h-4 w-4" />
                          Send Offer
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Alert className="bg-amber-50 dark:bg-amber-900/30 border-amber-200">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertTitle>Cannot send offer yet</AlertTitle>
                      <AlertDescription className="text-sm">
                        Other applications for this position need to reach the "Interviewed" stage first.
                        {jobStats.statusCounts.Pending > 0 && (
                          <p className="mt-1">There are {jobStats.statusCounts.Pending} applications still in the "Pending" stage.</p>
                        )}
                        {jobStats.statusCounts.Reviewed > 0 && (
                          <p className="mt-1">There are {jobStats.statusCounts.Reviewed} applications still in the "Reviewed" stage.</p>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              ) : application.status === 'Offered' || application.status === 'Hired' ? (
                <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-md">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Offer already sent</p>
                      <p className="text-sm text-muted-foreground">
                        {application.offerDate ? (
                          `Offer sent on ${format(new Date(application.offerDate), 'PPP')}`
                        ) : 'An offer has been extended to the candidate'}
                      </p>
                      {application.status === 'Offered' && canAdvanceToNextStage('Hired') && (
                        <div className="mt-2">
                          <Button variant="secondary" size="sm" 
                                  onClick={() => handleStatusChange('Hired')}>
                            Mark as Hired
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-md">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Cannot send offer at this stage</p>
                      <p className="text-sm text-muted-foreground">
                        The candidate must be interviewed before sending an offer
                      </p>
                      {application.status === 'Rejected' && (
                        <Button variant="link" className="h-auto p-0 text-sm" 
                                onClick={() => setActiveTab('interview')}>
                          Schedule an interview first
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-2">
            <Select value={selectedStatus} onValueChange={(value) => handleStatusChange(value as JobApplication['status'])}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Change status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem 
                  value="Pending" 
                  disabled={!validNextStatuses.includes('Pending') || !canAdvanceToNextStage('Pending')}
                >
                  Pending
                </SelectItem>
                <SelectItem 
                  value="Reviewed" 
                  disabled={!validNextStatuses.includes('Reviewed') || !canAdvanceToNextStage('Reviewed')}
                >
                  Reviewed
                </SelectItem>
                <SelectItem 
                  value="Interviewed" 
                  disabled={!validNextStatuses.includes('Interviewed') || !canAdvanceToNextStage('Interviewed')}
                >
                  Interviewed
                </SelectItem>
                <SelectItem 
                  value="Offered" 
                  disabled={!validNextStatuses.includes('Offered') || !canAdvanceToNextStage('Offered')}
                >
                  Offered
                </SelectItem>
                <SelectItem 
                  value="Hired" 
                  disabled={!validNextStatuses.includes('Hired') || !canAdvanceToNextStage('Hired')}
                >
                  Hired
                </SelectItem>
                <SelectItem 
                  value="Rejected" 
                  disabled={!validNextStatuses.includes('Rejected')}
                >
                  Rejected
                </SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
              {application.status === 'Pending' && (
                <Button 
                  variant="default" 
                  onClick={() => handleStatusChange('Reviewed')}
                  className="flex-1"
                  disabled={!canAdvanceToNextStage('Reviewed')}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mark as Reviewed
                </Button>
              )}
              
              {application.status === 'Reviewed' && (
                <Button 
                  variant="default" 
                  onClick={() => setActiveTab('interview')}
                  className="flex-1"
                  disabled={!canAdvanceToNextStage('Interviewed')}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Schedule Interview
                </Button>
              )}
              
              {application.status === 'Interviewed' && (
                <Button 
                  variant="default" 
                  onClick={() => setActiveTab('offer')}
                  className="flex-1"
                  disabled={!canAdvanceToNextStage('Offered')}
                >
                  <SendHorizontal className="mr-2 h-4 w-4" />
                  Make Offer
                </Button>
              )}
              
              {application.status === 'Offered' && (
                <Button 
                  variant="success" 
                  onClick={() => handleStatusChange('Hired')}
                  className="flex-1"
                  disabled={!canAdvanceToNextStage('Hired')}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Hire
                </Button>
              )}

              <Button 
                variant="destructive" 
                onClick={() => handleStatusChange('Rejected')}
                className="flex-1"
                disabled={application.status === 'Rejected'}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </div>
          </div>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetails;
