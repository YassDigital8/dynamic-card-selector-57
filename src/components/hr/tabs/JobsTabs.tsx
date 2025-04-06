
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, User } from 'lucide-react';

interface JobsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const JobsTabs: React.FC<JobsTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'jobs', label: 'Job Postings', icon: <Briefcase className="h-4 w-4 mr-2" /> },
    { id: 'applications', label: 'Applications', icon: <Users className="h-4 w-4 mr-2" /> },
    { id: 'candidates', label: 'Candidates', icon: <User className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className="flex overflow-x-auto border rounded-md">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center px-4 py-2 text-sm font-medium transition-colors relative whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
          style={{
            borderRight: tab.id !== tabs[tabs.length - 1].id ? '1px solid' : 'none',
            borderColor: 'hsla(0, 0%, 90%, 1)',
          }}
        >
          {tab.icon}
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              layoutId="activeTab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};
