
import React from 'react';
import { Button } from '@/components/ui/button';
import { Award, Trash2 } from 'lucide-react';
import { User } from '@/types/user.types';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';

interface SelectedUserActionsProps {
  selectedUser: User | null;
  onDeleteUser: (userId: string) => void;
  onPromoteToSuperAdmin: (userId: string) => void;
}

const SelectedUserActions: React.FC<SelectedUserActionsProps> = ({
  selectedUser,
  onDeleteUser,
  onPromoteToSuperAdmin
}) => {
  if (!selectedUser) return null;
  
  // Determine if the selected user is already a super admin
  const isSuperAdmin = selectedUser.role === 'SuperAdmin';

  return (
    <div className="w-full bg-accent/30 border rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <div className="flex items-center mb-3 sm:mb-0">
        <span className="font-medium mr-2">Selected:</span>
        <span className="bg-background rounded-md px-3 py-1.5 border">{selectedUser.name}</span>
      </div>
      
      <div className="flex gap-3 w-full sm:w-auto justify-end">
        {!isSuperAdmin && (
          <Button 
            onClick={() => onPromoteToSuperAdmin(selectedUser.id)}
            variant="outline"
            size="sm"
            className="text-xs text-amber-600 hover:text-amber-800 hover:bg-amber-50 w-full sm:w-auto"
          >
            <Award className="h-3.5 w-3.5 mr-1.5" />
            <span>Promote to Admin</span>
          </Button>
        )}
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200 w-full sm:w-auto"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              <span>Delete User</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete User</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedUser.name}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                className="bg-red-500 hover:bg-red-600"
                onClick={() => onDeleteUser(selectedUser.id)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default SelectedUserActions;
