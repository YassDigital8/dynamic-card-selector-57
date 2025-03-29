
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
import { Event } from '@/models/EventModel';

interface DeleteEventDialogProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteEventDialog: React.FC<DeleteEventDialogProps> = ({
  event,
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!event) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this event?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <strong>{event.title}</strong>. 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete Event
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEventDialog;
