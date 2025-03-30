
import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { Hotel, Users, Image, FileText } from 'lucide-react';

const UsersTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]"></TableHead>
        <TableHead className="w-[180px]">Name</TableHead>
        <TableHead className="w-[200px]">Email</TableHead>
        <TableHead className="w-[100px]">Status</TableHead>
        <TableHead className="w-[100px]">Dep</TableHead>
        <TableHead className="w-[180px]">Last Login</TableHead>
        <TableHead className="px-2 text-center w-[80px]">
          <div className="flex items-center justify-center">
            <Hotel className="h-4 w-4" />
          </div>
        </TableHead>
        <TableHead className="px-2 text-center w-[80px]">
          <div className="flex items-center justify-center">
            <Users className="h-4 w-4" />
          </div>
        </TableHead>
        <TableHead className="px-2 text-center w-[80px]">
          <div className="flex items-center justify-center">
            <Image className="h-4 w-4" />
          </div>
        </TableHead>
        <TableHead className="px-2 text-center w-[80px]">
          <div className="flex items-center justify-center">
            <FileText className="h-4 w-4" />
          </div>
        </TableHead>
        <TableHead className="px-2 text-center w-[100px]">Role</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default UsersTableHeader;
