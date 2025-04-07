
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BranchList from './BranchList';
import BranchForm from './BranchForm';
import { useBranchesData } from '@/hooks/branches/useBranchesData';
import { Branch } from '@/models/BranchModel';

const BranchesPage = () => {
  const [activeTab, setActiveTab] = useState('list');
  const { branches, isLoading, error, addBranch, deleteBranch } = useBranchesData();

  return (
    <div className="container mx-auto space-y-6">
      <Tabs 
        defaultValue="list" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="list">Branch List</TabsTrigger>
          <TabsTrigger value="add">Add New Branch</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <BranchList 
            branches={branches} 
            isLoading={isLoading} 
            error={error}
            onDelete={deleteBranch}
          />
        </TabsContent>
        
        <TabsContent value="add" className="space-y-4">
          <BranchForm 
            onSubmit={(branchData: Branch) => {
              addBranch(branchData);
              setActiveTab('list');
            }} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BranchesPage;
