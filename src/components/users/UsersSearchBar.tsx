
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface UsersSearchBarProps {
  nameFilter: string;
  emailFilter: string;
  departmentFilter: string;
  statusFilter: string;
  departments: string[];
  onUpdateFilter: (key: string, value: string) => void;
  onResetFilters: () => void;
}

const UsersSearchBar: React.FC<UsersSearchBarProps> = ({
  nameFilter,
  emailFilter,
  departmentFilter,
  statusFilter,
  departments,
  onUpdateFilter,
  onResetFilters
}) => {
  const hasFilters = nameFilter || emailFilter || departmentFilter !== 'all' || statusFilter !== 'all';

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border rounded-lg p-5 mb-6 bg-card shadow-sm"
    >
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="text-sm font-medium mb-1.5 text-muted-foreground">Name</div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name"
              value={nameFilter}
              onChange={(e) => onUpdateFilter('name', e.target.value)}
              className="pl-9 h-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="text-sm font-medium mb-1.5 text-muted-foreground">Email</div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by email"
              value={emailFilter}
              onChange={(e) => onUpdateFilter('email', e.target.value)}
              className="pl-9 h-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        
        <div className="w-full md:w-[180px]">
          <div className="text-sm font-medium mb-1.5 text-muted-foreground">Department</div>
          <Select 
            value={departmentFilter}
            onValueChange={(value) => onUpdateFilter('department', value)}
          >
            <SelectTrigger className="h-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="All departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-[180px]">
          <div className="text-sm font-medium mb-1.5 text-muted-foreground">Status</div>
          <Select
            value={statusFilter}
            onValueChange={(value) => onUpdateFilter('status', value)}
          >
            <SelectTrigger className="h-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {hasFilters && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-end"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="text-xs group"
          >
            <X className="h-3.5 w-3.5 mr-1.5 group-hover:rotate-90 transition-transform duration-200" />
            Clear filters
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UsersSearchBar;
