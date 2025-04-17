
import React from 'react';
import { ApprovalRequest } from '@/models/PageModel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import ApprovalDialog from './ApprovalDialog';

interface ApprovalListItemProps {
  approval: ApprovalRequest;
  onView: (approval: ApprovalRequest) => void;
}

const ApprovalListItem: React.FC<ApprovalListItemProps> = ({ approval, onView }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium">{approval.pageTitle}</h4>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>Requested {new Date(approval.requestedAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm mt-1">By {approval.requestedBy}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              onClick={() => onView(approval)}
            >
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
              onClick={() => onView(approval)}
            >
              <CheckCircle className="h-4 w-4" />
              Approve
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprovalListItem;
