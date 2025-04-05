
import React from 'react';
import { JobPosition } from '@/models/JobModel';
import JobList from './JobList';
import JobForm from './JobForm';
import JobDetails from './JobDetails';
import DeleteJobDialog from './DeleteJobDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface JobsTabContentProps {
  jobs: JobPosition[];
  selectedJob: JobPosition | null;
  isAddingJob: boolean;
  isEditingJob: boolean;
  isViewingDetails: boolean;
  showDeleteDialog: boolean;
  onAddJob: () => void;
  onEditJob: (job: JobPosition) => void;
  onViewJobDetails: (job: JobPosition) => void;
  onDeleteJob: (job: JobPosition) => void;
  onJobFormSubmit: (jobData: JobPosition) => void;
  onConfirmDeleteJob: () => void;
  onCloseForm: () => void;
  onBackToList: () => void;
  onCloseDeleteDialog: () => void;
}

const JobsTabContent: React.FC<JobsTabContentProps> = ({
  jobs,
  selectedJob,
  isAddingJob,
  isEditingJob,
  isViewingDetails,
  showDeleteDialog,
  onAddJob,
  onEditJob,
  onViewJobDetails,
  onDeleteJob,
  onJobFormSubmit,
  onConfirmDeleteJob,
  onCloseForm,
  onBackToList,
  onCloseDeleteDialog,
}) => {
  return (
    <>
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
        />
      ) : (
        <JobList 
          jobs={jobs} 
          onViewDetails={onViewJobDetails}
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
