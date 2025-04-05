
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Check, Filter } from 'lucide-react';

interface ApplicationStatusFilterProps {
  selectedStatus: string;
  onChange: (status: string) => void;
}

const ApplicationStatusFilter: React.FC<ApplicationStatusFilterProps> = ({
  selectedStatus,
  onChange
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filter by Status</span>
          {selectedStatus !== 'All' && (
            <Badge variant="secondary" className="ml-2">
              {selectedStatus}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[180px]">
        <DropdownMenuRadioGroup value={selectedStatus} onValueChange={onChange}>
          <DropdownMenuRadioItem value="All">
            <span className="flex items-center">
              {selectedStatus === 'All' && <Check className="mr-2 h-4 w-4" />}
              All Statuses
            </span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Pending">
            <span className="flex items-center">
              {selectedStatus === 'Pending' && <Check className="mr-2 h-4 w-4" />}
              Pending
            </span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Reviewed">
            <span className="flex items-center">
              {selectedStatus === 'Reviewed' && <Check className="mr-2 h-4 w-4" />}
              Reviewed
            </span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Interviewed">
            <span className="flex items-center">
              {selectedStatus === 'Interviewed' && <Check className="mr-2 h-4 w-4" />}
              Interviewed
            </span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Offered">
            <span className="flex items-center">
              {selectedStatus === 'Offered' && <Check className="mr-2 h-4 w-4" />}
              Offered
            </span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Rejected">
            <span className="flex items-center">
              {selectedStatus === 'Rejected' && <Check className="mr-2 h-4 w-4" />}
              Rejected
            </span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Hired">
            <span className="flex items-center">
              {selectedStatus === 'Hired' && <Check className="mr-2 h-4 w-4" />}
              Hired
            </span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApplicationStatusFilter;
