
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ApprovalRequest } from '@/models/PageModel';
import { usePageApprovals } from '@/hooks/usePageApprovals';
import { CheckCircle, XCircle } from 'lucide-react';

interface ApprovalDialogProps {
  approval: ApprovalRequest;
  onClose?: () => void;
}

const ApprovalDialog: React.FC<ApprovalDialogProps> = ({ approval, onClose }) => {
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(true);
  const { approvePage, rejectPage, isLoading } = usePageApprovals();

  const handleApprove = async () => {
    await approvePage(approval.pageId, comment);
    setOpen(false);
    if (onClose) onClose();
  };

  const handleReject = async () => {
    if (!comment.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    await rejectPage(approval.pageId, comment);
    setOpen(false);
    if (onClose) onClose();
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen && onClose) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Page Approval Request</DialogTitle>
          <DialogDescription>
            {approval.requestedBy} has requested your approval for the page "{approval.pageTitle}".
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="border rounded-md p-4 bg-gray-50">
            <h4 className="font-medium text-sm text-gray-700">Page Details</h4>
            <p className="text-sm mt-1"><span className="font-medium">Title:</span> {approval.pageTitle}</p>
            <p className="text-sm mt-1"><span className="font-medium">Requested by:</span> {approval.requestedBy}</p>
            <p className="text-sm mt-1"><span className="font-medium">Requested on:</span> {new Date(approval.requestedAt).toLocaleString()}</p>
          </div>
          
          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-1">
              Comments (required for rejection)
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comments here..."
              className="resize-none h-24"
            />
          </div>
        </div>

        <DialogFooter className="flex space-x-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={isLoading}
            className="gap-1"
          >
            <XCircle className="h-4 w-4" />
            Reject
          </Button>
          <Button
            onClick={handleApprove}
            disabled={isLoading}
            className="gap-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4" />
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApprovalDialog;
