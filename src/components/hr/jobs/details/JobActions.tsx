
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { ArrowLeft, Edit, Trash } from 'lucide-react';

interface JobActionsProps {
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const JobActions: React.FC<JobActionsProps> = ({ onBack, onEdit, onDelete }) => {
  return (
    <CardFooter className="flex justify-between pt-2">
      <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      <div className="flex gap-2">
        <Button onClick={onEdit} variant="default" className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Edit
        </Button>
        <Button onClick={onDelete} variant="destructive" className="flex items-center gap-2">
          <Trash className="h-4 w-4" />
          Delete
        </Button>
      </div>
    </CardFooter>
  );
};

export default JobActions;
