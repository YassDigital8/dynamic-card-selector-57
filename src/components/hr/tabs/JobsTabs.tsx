
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Users, FileText } from 'lucide-react';

interface JobsTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const JobsTabs: React.FC<JobsTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full max-w-md">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="jobs" className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          <span className="hidden sm:inline">Job Postings</span>
        </TabsTrigger>
        <TabsTrigger value="applications" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Applications</span>
        </TabsTrigger>
        <TabsTrigger value="candidates" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Candidates</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
