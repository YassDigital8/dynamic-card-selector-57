
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Trash2 } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useIsMobile } from '@/hooks/use-mobile';

interface PageFooterProps {
  onRefresh?: () => void;
  onDelete?: () => void;
  canDelete: boolean;
}

const PageFooter = ({ onRefresh, onDelete, canDelete }: PageFooterProps) => {
  const isMobile = useIsMobile();
  
  return (
    <CardFooter className="bg-gray-50 border-t p-4">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
        {onDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                className="gap-2 w-full sm:w-auto"
                disabled={!canDelete}
              >
                <Trash2 className="h-4 w-4" />
                {isMobile ? "Delete" : "Delete Page"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the current page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} className="w-full sm:w-auto">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        
        <Button 
          variant="outline" 
          onClick={onRefresh}
          className="gap-2 w-full sm:w-auto sm:ml-auto"
        >
          <RefreshCw className="h-4 w-4" />
          {isMobile ? "Refresh" : "Refresh Data"}
        </Button>
      </div>
    </CardFooter>
  );
};

export default PageFooter;
