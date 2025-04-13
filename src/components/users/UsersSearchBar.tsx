
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { StatusOption } from '@/hooks/users/data/userStatusData';

interface UsersSearchBarProps {
  nameFilter: string;
  emailFilter: string;
  departmentFilter: string;
  statusFilter: string;
  departments: string[];
  statusOptions: StatusOption[];
  onUpdateFilter: (key: string, value: string) => void;
  onResetFilters: () => void;
}

const UsersSearchBar: React.FC<UsersSearchBarProps> = ({
  nameFilter,
  emailFilter,
  departmentFilter,
  statusFilter,
  departments,
  statusOptions,
  onUpdateFilter,
  onResetFilters
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateFilter(e.target.name, e.target.value);
  };

  const handleSelectChange = (key: string, value: string) => {
    onUpdateFilter(key, value);
  };

  const isFilterActive = nameFilter || emailFilter || departmentFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Search by name"
            value={nameFilter}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Search by email"
            value={emailFilter}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="department">Department</Label>
          <Select
            value={departmentFilter}
            onValueChange={(value) => handleSelectChange('department', value)}
          >
            <SelectTrigger id="department" className="mt-1">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={statusFilter}
            onValueChange={(value) => handleSelectChange('status', value)}
          >
            <SelectTrigger id="status" className="mt-1">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isFilterActive && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default UsersSearchBar;
