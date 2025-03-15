
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

interface PageFooterProps {
  onRefresh?: () => void;
  onDelete?: () => void;
  canDelete: boolean;
}

const PageFooter = ({ onRefresh, onDelete, canDelete }: PageFooterProps) => {
  console.log('PageFooter props:', { onRefresh, onDelete, canDelete });
  
  return (
    <CardFooter className="bg-gray-50 border-t">
      <div className="w-full flex justify-between">
        {onDelete && canDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete Page
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the current page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        
        <div className={canDelete && onDelete ? "ml-auto" : "w-full flex justify-end"}>
          <Button 
            variant="outline" 
            onClick={onRefresh}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>
    </CardFooter>
  );
};

export default PageFooter;
