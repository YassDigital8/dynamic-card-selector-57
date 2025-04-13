
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { StatusOption } from '@/hooks/users/data/userStatusData';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent,
  DropdownMenuCheckboxItem 
} from '@/components/ui/dropdown-menu';

interface UsersSearchBarProps {
  nameFilter: string;
  emailFilter: string;
  departmentFilter: string;
  statusFilters: string[];
  departments: string[];
  statusOptions: StatusOption[];
  onUpdateFilter: (key: string, value: string | string[]) => void;
  onResetFilters: () => void;
}

const UsersSearchBar: React.FC<UsersSearchBarProps> = ({
  nameFilter,
  emailFilter,
  departmentFilter,
  statusFilters,
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

  const handleStatusChange = (value: string, checked: boolean) => {
    let newValues: string[];

    // Special handling for 'all' status
    if (value === 'all') {
      newValues = checked ? ['all'] : [];
    } else {
      newValues = [...statusFilters.filter(s => s !== 'all')];
      
      if (checked) {
        if (!newValues.includes(value)) {
          newValues.push(value);
        }
      } else {
        newValues = newValues.filter(v => v !== value);
      }

      // If no status selected, default to 'all'
      if (newValues.length === 0) {
        newValues = ['all'];
      }
    }

    onUpdateFilter('status', newValues);
  };

  // Helper to get display text for status dropdown
  const getStatusDisplayText = () => {
    if (statusFilters.includes('all')) return 'All Statuses';
    if (statusFilters.length === 0) return 'All Statuses';
    if (statusFilters.length === 1) {
      return statusOptions.find(opt => opt.value === statusFilters[0])?.label || 'Status';
    }
    return `${statusFilters.length} statuses selected`;
  };

  const isFilterActive = nameFilter || emailFilter || departmentFilter !== 'all' || 
                       (statusFilters.length === 1 && statusFilters[0] !== 'all') || 
                       statusFilters.length > 1;

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
          <Label htmlFor="status" className="block mb-2">Status</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between mt-1" id="status">
                {getStatusDisplayText()}
                <span className="ml-2">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white">
              {statusOptions.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status.value}
                  checked={statusFilters.includes(status.value)}
                  onCheckedChange={(checked) => handleStatusChange(status.value, !!checked)}
                >
                  {status.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
