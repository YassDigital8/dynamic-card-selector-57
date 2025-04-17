
import { useState, useCallback, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { ApprovalRequest, PageData, ApprovalStatus, Approver } from '@/models/PageModel';
import useAuthentication from '@/hooks/useAuthentication';

export const usePageApprovals = () => {
  const [pendingApprovals, setPendingApprovals] = useState<ApprovalRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useAuthentication();

  // Fetch pending approvals for the current user
  const fetchPendingApprovals = useCallback(async () => {
    if (!userInfo) return;

    setIsLoading(true);
    try {
      // For demo purposes, we'll use mock data
      // In a real application, you would fetch this from an API
      console.log('Fetching pending approvals for user:', userInfo.firstName);
      
      // Mock data for demonstration
      const mockApprovals: ApprovalRequest[] = [
        {
          pageId: 1,
          pageTitle: 'Home Page',
          requestedBy: 'John Doe',
          requestedAt: new Date().toISOString(),
          status: 'pending',
          approvers: [
            {
              id: '1',
              name: userInfo.firstName || 'Current User',
              role: 'Supervisor',
              status: 'pending'
            }
          ]
        },
        {
          pageId: 2,
          pageTitle: 'About Us',
          requestedBy: 'Jane Smith',
          requestedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          status: 'pending',
          approvers: [
            {
              id: '1',
              name: userInfo.firstName || 'Current User',
              role: 'Supervisor',
              status: 'pending'
            }
          ]
        }
      ];
      
      setPendingApprovals(mockApprovals);
    } catch (error) {
      console.error('Error fetching pending approvals:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch pending approvals",
      });
    } finally {
      setIsLoading(false);
    }
  }, [userInfo]);

  // Approve a page
  const approvePage = useCallback(async (pageId: number, comment?: string) => {
    setIsLoading(true);
    try {
      console.log(`Approving page ${pageId} with comment: ${comment || 'No comment'}`);
      
      // Update the local state to reflect the approval
      setPendingApprovals(prevApprovals => 
        prevApprovals.map(approval => {
          if (approval.pageId === pageId) {
            // Update the approver status
            const updatedApprovers = approval.approvers.map(approver => {
              if (approver.id === '1') { // In a real app, match with userInfo.id
                return {
                  ...approver,
                  status: 'approved' as const,
                  approvedAt: new Date().toISOString(),
                  comment
                };
              }
              return approver;
            });
            
            // Determine the overall status
            const allApproved = updatedApprovers.every(a => a.status === 'approved');
            
            return {
              ...approval,
              status: allApproved ? 'approved' as const : 'pending' as const,
              approvers: updatedApprovers
            };
          }
          return approval;
        })
      );
      
      toast({
        title: "Success",
        description: "Page has been approved",
      });
    } catch (error) {
      console.error('Error approving page:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve page",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Reject a page
  const rejectPage = useCallback(async (pageId: number, comment: string) => {
    setIsLoading(true);
    try {
      console.log(`Rejecting page ${pageId} with comment: ${comment}`);
      
      // Update the local state to reflect the rejection
      setPendingApprovals(prevApprovals => 
        prevApprovals.map(approval => {
          if (approval.pageId === pageId) {
            // Update the approver status
            const updatedApprovers = approval.approvers.map(approver => {
              if (approver.id === '1') { // In a real app, match with userInfo.id
                return {
                  ...approver,
                  status: 'rejected' as const,
                  approvedAt: new Date().toISOString(),
                  comment
                };
              }
              return approver;
            });
            
            return {
              ...approval,
              status: 'rejected' as const,
              approvers: updatedApprovers
            };
          }
          return approval;
        })
      );
      
      toast({
        title: "Page Rejected",
        description: "Your feedback has been recorded",
      });
    } catch (error) {
      console.error('Error rejecting page:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reject page",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Request approval for a page
  const requestApproval = useCallback(async (page: PageData) => {
    if (!userInfo) return false;
    
    setIsLoading(true);
    try {
      console.log(`Requesting approval for page: ${page.title}`);
      
      // In a real application, you would send this to an API
      // For demo purposes, we'll just simulate success
      toast({
        title: "Approval Requested",
        description: "The page has been submitted for approval",
      });
      
      return true;
    } catch (error) {
      console.error('Error requesting approval:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to request approval",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [userInfo]);

  // Load approvals when the component mounts or when the user changes
  useEffect(() => {
    if (userInfo) {
      fetchPendingApprovals();
    }
  }, [userInfo, fetchPendingApprovals]);

  return {
    pendingApprovals,
    isLoading,
    approvePage,
    rejectPage,
    requestApproval,
    fetchPendingApprovals
  };
};
