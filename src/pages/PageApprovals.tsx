
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import ApprovalsList from '@/components/pages/approval/ApprovalsList';
import AuthenticatedContent from '@/components/pages/index/AuthenticatedContent';
import useAuthentication from '@/hooks/useAuthentication';

const PageApprovals: React.FC = () => {
  const { userInfo } = useAuthentication();

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <AuthenticatedContent userInfo={userInfo} />
      
      <h1 className="text-2xl font-bold mb-6">Page Approvals</h1>
      
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="history">Approval History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <ApprovalsList />
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900">Approval History</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Your previous approval actions will appear here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PageApprovals;
