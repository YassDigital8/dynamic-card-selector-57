
import React from 'react';
import { JobApplication } from '@/models/ApplicationModel';
import { JobPosition } from '@/models/JobModel';
import { Candidate } from '@/models/ApplicationModel';
import ApplicationList from './ApplicationList';
import ApplicationDetails from './ApplicationDetails';

interface ApplicationsTabContentProps {
  applications: JobApplication[];
  jobs: JobPosition[];
  candidates: Candidate[];
  selectedApplication: JobApplication | null;
  isViewingApplication: boolean;
  onViewDetails: (application: JobApplication) => void;
  onUpdateStatus: (application: JobApplication, newStatus: JobApplication['status']) => void;
  onUpdateNotes?: (application: JobApplication, notes: string) => void;
  onScheduleInterview?: (application: JobApplication, interviewDate: string) => void;
  onSendOffer?: (application: JobApplication, offerDetails: string) => void;
  onCloseDetails: () => void;
}

const ApplicationsTabContent: React.FC<ApplicationsTabContentProps> = ({
  applications,
  jobs,
  candidates,
  selectedApplication,
  isViewingApplication,
  onViewDetails,
  onUpdateStatus,
  onUpdateNotes,
  onScheduleInterview,
  onSendOffer,
  onCloseDetails,
}) => {
  return (
    <>
      <ApplicationList 
        applications={applications}
        onViewDetails={onViewDetails}
        onUpdateStatus={onUpdateStatus}
      />
      
      {selectedApplication && (
        <ApplicationDetails
          application={selectedApplication}
          job={jobs.find(j => j.id === selectedApplication.jobId)}
          candidate={candidates.find(c => c.id === selectedApplication.candidateId)}
          isOpen={isViewingApplication}
          onClose={onCloseDetails}
          onUpdateStatus={(newStatus) => 
            onUpdateStatus(selectedApplication, newStatus)
          }
          onUpdateNotes={
            onUpdateNotes
              ? (notes) => onUpdateNotes(selectedApplication, notes)
              : undefined
          }
          onScheduleInterview={
            onScheduleInterview
              ? (date) => onScheduleInterview(selectedApplication, date)
              : undefined
          }
          onSendOffer={
            onSendOffer
              ? (details) => onSendOffer(selectedApplication, details)
              : undefined
          }
        />
      )}
    </>
  );
};

export default ApplicationsTabContent;
