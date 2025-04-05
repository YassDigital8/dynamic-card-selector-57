
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

export interface PageFooterProps {
  onRefresh?: () => void;
  onDelete?: () => void;
  canDelete: boolean;
  page?: any;  // Added to match usage in PageDetailsView
}

const PageFooter = ({ onRefresh, onDelete, canDelete, page }: PageFooterProps) => {
  const isMobile = useIsMobile();
  
  return (
    <CardFooter className="bg-gray-50 dark:bg-gray-800 border-t p-3 md:p-4">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-3">
        {onDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                className="gap-1.5 md:gap-2 text-xs md:text-sm w-full sm:w-auto"
                disabled={!canDelete}
                size={isMobile ? "sm" : "default"}
              >
                <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                {isMobile ? "Delete" : "Delete Page"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-xs md:text-sm">
                  This action cannot be undone. This will permanently delete the current page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <AlertDialogCancel className="w-full sm:w-auto text-xs md:text-sm">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} className="w-full sm:w-auto text-xs md:text-sm">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        
        <Button 
          variant="outline" 
          onClick={onRefresh}
          className="gap-1.5 md:gap-2 text-xs md:text-sm w-full sm:w-auto sm:ml-auto"
          size={isMobile ? "sm" : "default"}
        >
          <RefreshCw className="h-3.5 w-3.5 md:h-4 md:w-4" />
          {isMobile ? "Refresh" : "Refresh Data"}
        </Button>
      </div>
    </CardFooter>
  );
};

export { PageFooter };
export default PageFooter;
