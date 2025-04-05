
import React from 'react';
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
import { format } from 'date-fns';
import { 
  Briefcase, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Clock 
} from 'lucide-react';

interface ApplicationDetailsProps {
  application: JobApplication;
  job?: JobPosition;
  candidate?: Candidate;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (newStatus: JobApplication['status']) => void;
}

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({
  application,
  job,
  candidate,
  isOpen,
  onClose,
  onUpdateStatus
}) => {
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
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Application Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
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
                  <span className="font-medium mr-2">Status:</span> 
                  <Badge className={getStatusColor()}>
                    {application.status}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium mr-2">Applied:</span> 
                  {format(new Date(application.appliedDate), 'MMM dd, yyyy')}
                </div>
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

        {application.notes && (
          <div className="mt-2 space-y-2">
            <h3 className="text-lg font-semibold flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              Notes
            </h3>
            <p className="text-muted-foreground whitespace-pre-line border p-3 rounded-md bg-muted/50">
              {application.notes}
            </p>
          </div>
        )}

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
          </div>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetails;
