
import React from 'react';
import { motion } from 'framer-motion';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { Users as UsersIcon, ClipboardList } from 'lucide-react';
import StandardLayout from '@/components/layout/StandardLayout';
import { useUserLogs } from '@/hooks/users/logs/useUserLogs';
import { LogFiltersBar, LogsTable, LogDetailsDialog } from '@/components/users/logs';

const UserLogs: React.FC = () => {
  // Define breadcrumb items for the Users Logs page
  const breadcrumbItems = [
    { 
      label: 'Users', 
      icon: UsersIcon,
      href: '/users'
    },
    {
      label: 'Activity Logs',
      icon: ClipboardList
    }
  ];

  const {
    logs,
    isLoading,
    filters,
    actions,
    severities,
    selectedLog,
    showLogDetails,
    setShowLogDetails,
    handleFilterChange,
    handleRefresh,
    handleExport,
    handleViewDetails
  } = useUserLogs();

  return (
    <StandardLayout>
      <div className="container mx-auto py-6">
        <BreadcrumbNav items={breadcrumbItems} />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 max-w-7xl mx-auto px-1 sm:px-2 md:px-4"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight">User Activity Logs</h1>
          </div>

          <LogFiltersBar 
            filters={filters}
            actions={actions}
            severities={severities}
            onFilterChange={handleFilterChange}
            onRefresh={handleRefresh}
            onExport={handleExport}
            isLoading={isLoading}
          />

          <div className="bg-white dark:bg-gray-800 rounded-md shadow overflow-hidden">
            <LogsTable 
              logs={logs}
              isLoading={isLoading}
              onViewDetails={handleViewDetails}
            />
          </div>
        </motion.div>

        <LogDetailsDialog 
          log={selectedLog}
          open={showLogDetails}
          onOpenChange={setShowLogDetails}
        />
      </div>
    </StandardLayout>
  );
};

export default UserLogs;
