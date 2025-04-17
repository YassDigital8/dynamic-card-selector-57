
import React, { useState } from 'react';
import { usePageApprovals } from '@/hooks/usePageApprovals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ApprovalRequest } from '@/models/PageModel';
import ApprovalListItem from './ApprovalListItem';
import ApprovalDialog from './ApprovalDialog';
import { AlertCircle } from 'lucide-react';

const ApprovalsList: React.FC = () => {
  const { pendingApprovals, isLoading } = usePageApprovals();
  const [selectedApproval, setSelectedApproval] = useState<ApprovalRequest | null>(null);

  const handleViewApproval = (approval: ApprovalRequest) => {
    setSelectedApproval(approval);
  };

  const handleCloseDialog = () => {
    setSelectedApproval(null);
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle>Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500">Loading approvals...</p>
            </div>
          ) : pendingApprovals.length > 0 ? (
            <div className="space-y-3">
              {pendingApprovals.map((approval) => (
                <ApprovalListItem
                  key={approval.pageId}
                  approval={approval}
                  onView={handleViewApproval}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 px-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <AlertCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-3 text-sm font-medium text-gray-900">No Pending Approvals</h3>
              <p className="mt-2 text-sm text-gray-500">You don't have any pages waiting for your approval.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedApproval && (
        <ApprovalDialog 
          approval={selectedApproval} 
          onClose={handleCloseDialog} 
        />
      )}
    </div>
  );
};

export default ApprovalsList;
