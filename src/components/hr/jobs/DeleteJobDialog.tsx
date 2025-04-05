
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { JobPosition } from '@/models/JobModel';

interface DeleteJobDialogProps {
  job: JobPosition | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteJobDialog: React.FC<DeleteJobDialogProps> = ({
  job,
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!job) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this job?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <strong>{job.title}</strong>. 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete Job
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteJobDialog;
