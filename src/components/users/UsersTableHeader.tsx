
import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { Hotel, Users, Image, Settings, FileText } from 'lucide-react';

const UsersTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]"></TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Department</TableHead>
        <TableHead>Last Login</TableHead>
        <TableHead className="px-2">
          <div className="flex items-center justify-center">
            <Hotel className="h-4 w-4" />
          </div>
        </TableHead>
        <TableHead className="px-2">
          <div className="flex items-center justify-center">
            <Users className="h-4 w-4" />
          </div>
        </TableHead>
        <TableHead className="px-2">
          <div className="flex items-center justify-center">
            <Image className="h-4 w-4" />
          </div>
        </TableHead>
        <TableHead className="px-2">
          <div className="flex items-center justify-center">
            <Settings className="h-4 w-4" />
          </div>
        </TableHead>
        <TableHead className="px-2">
          <div className="flex items-center justify-center">
            <FileText className="h-4 w-4" />
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default UsersTableHeader;
