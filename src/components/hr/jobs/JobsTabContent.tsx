
import React from 'react';
import { JobPosition } from '@/models/JobModel';
import { JobApplication, Candidate } from '@/models/ApplicationModel';
import JobList from './JobList';
import JobForm from './JobForm';
import JobDetails from './JobDetails';
import JobDetailsPage from './JobDetailsPage';
import DeleteJobDialog from './DeleteJobDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface JobsTabContentProps {
  jobs: JobPosition[];
  applications: JobApplication[];
  candidates: Candidate[];
  selectedJob: JobPosition | null;
  isAddingJob: boolean;
  isEditingJob: boolean;
  isViewingDetails: boolean;
  isViewingJobApplications: boolean;
  showDeleteDialog: boolean;
  onAddJob: () => void;
  onEditJob: (job: JobPosition) => void;
  onViewJobDetails: (job: JobPosition) => void;
  onViewJobApplications: (job: JobPosition) => void;
  onDeleteJob: (job: JobPosition) => void;
  onJobFormSubmit: (jobData: JobPosition) => void;
  onConfirmDeleteJob: () => void;
  onCloseForm: () => void;
  onBackToList: () => void;
  onCloseDeleteDialog: () => void;
  onViewApplicationDetails: (application: JobApplication) => void;
  onUpdateApplicationStatus: (application: JobApplication, newStatus: JobApplication['status']) => void;
}

const JobsTabContent: React.FC<JobsTabContentProps> = ({
  jobs,
  applications,
  candidates,
  selectedJob,
  isAddingJob,
  isEditingJob,
  isViewingDetails,
  isViewingJobApplications,
  showDeleteDialog,
  onAddJob,
  onEditJob,
  onViewJobDetails,
  onViewJobApplications,
  onDeleteJob,
  onJobFormSubmit,
  onConfirmDeleteJob,
  onCloseForm,
  onBackToList,
  onCloseDeleteDialog,
  onViewApplicationDetails,
  onUpdateApplicationStatus,
}) => {
  return (
    <>
      {!isAddingJob && !isEditingJob && !isViewingDetails && !isViewingJobApplications && (
        <div className="flex justify-end mb-4">
          <Button 
            onClick={onAddJob}
            className="flex items-center gap-2"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            Post New Job
          </Button>
        </div>
      )}

      {isAddingJob || isEditingJob ? (
        <JobForm 
          initialData={isEditingJob ? selectedJob : undefined} 
          onSubmit={onJobFormSubmit} 
          onCancel={onCloseForm}
        />
      ) : isViewingDetails && selectedJob ? (
        <JobDetails 
          job={selectedJob} 
          onEdit={() => onEditJob(selectedJob)}
          onDelete={() => onDeleteJob(selectedJob)}
          onBack={onBackToList}
          onViewApplications={() => onViewJobApplications(selectedJob)}
        />
      ) : isViewingJobApplications && selectedJob ? (
        <JobDetailsPage
          job={selectedJob}
          applications={applications}
          candidates={candidates}
          onBack={onBackToList}
          onViewApplication={onViewApplicationDetails}
          onUpdateApplicationStatus={onUpdateApplicationStatus}
        />
      ) : (
        <JobList 
          jobs={jobs} 
          applications={applications}
          onViewDetails={onViewJobDetails}
          onViewApplications={onViewJobApplications}
          onEditJob={onEditJob}
          onDeleteJob={onDeleteJob}
        />
      )}

      <DeleteJobDialog 
        job={selectedJob}
        isOpen={showDeleteDialog}
        onClose={onCloseDeleteDialog}
        onConfirm={onConfirmDeleteJob}
      />
    </>
  );
};

export default JobsTabContent;
