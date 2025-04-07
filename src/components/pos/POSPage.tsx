
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import POSList from './POSList';
import POSForm from './POSForm';
import { usePOSData } from '@/hooks/pos/usePOSData';

const POSPage = () => {
  const [activeTab, setActiveTab] = useState('list');
  const { posEntries, isLoading, error, addPOS, deletePOS } = usePOSData();

  return (
    <div className="container mx-auto space-y-6">
      <Tabs 
        defaultValue="list" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="list">POS List</TabsTrigger>
          <TabsTrigger value="add">Add New POS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <POSList 
            posEntries={posEntries} 
            isLoading={isLoading} 
            error={error}
            onDelete={deletePOS}
          />
        </TabsContent>
        
        <TabsContent value="add" className="space-y-4">
          <POSForm 
            onSubmit={(posData) => {
              addPOS(posData);
              setActiveTab('list');
            }} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default POSPage;
