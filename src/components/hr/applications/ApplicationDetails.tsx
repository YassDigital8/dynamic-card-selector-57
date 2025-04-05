
import React, { useState } from 'react';
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
  MessageSquare
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
  
  const handleSaveNotes = () => {
    if (onUpdateNotes) {
      onUpdateNotes(notes);
    }
  };

  const handleScheduleInterview = () => {
    if (onScheduleInterview && interviewDate) {
      onScheduleInterview(interviewDate.toISOString());
    }
  };

  const handleSendOffer = () => {
    if (onSendOffer && offerDetails) {
      onSendOffer(offerDetails);
    }
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Application Details
            <Badge className={getStatusColor()}>
              {application.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="interview">Interview</TabsTrigger>
            <TabsTrigger value="offer">Offer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Job and Application Info */}
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
                    {application.resumeUrl && (
                      <div>
                        <a 
                          href={application.resumeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View Resume
                        </a>
                      </div>
                    )}
                    {application.coverLetterUrl && (
                      <div>
                        <a 
                          href={application.coverLetterUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View Cover Letter
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Candidate Info */}
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
            </div>
          </TabsContent>
          
          <TabsContent value="offer" className="mt-4 space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <SendHorizontal className="mr-2 h-5 w-5 text-primary" />
                Job Offer
              </h3>
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
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-2">
            <select
              className="px-4 py-2 border border-input rounded-md bg-background text-sm"
              value={application.status}
              onChange={(e) => onUpdateStatus(e.target.value as JobApplication['status'])}
            >
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
              <option value="Hired">Hired</option>
            </select>
            
            <div className="flex gap-2">
              <Button 
                variant="success" 
                onClick={() => onUpdateStatus('Hired')}
                className="flex-1"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Hire
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => onUpdateStatus('Rejected')}
                className="flex-1"
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
