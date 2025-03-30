
import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { Hotel, Users, Image, FileText } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const UsersTableHeader: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]"></TableHead>
        <TableHead>Name</TableHead>
        {!isMobile && <TableHead>Email</TableHead>}
        <TableHead>Status</TableHead>
        {!isMobile && <TableHead>Dep</TableHead>}
        {!isMobile && <TableHead>Last Login</TableHead>}
        
        <TableHead className="text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="hidden md:inline">Roles</span>
            <div className="flex space-x-1">
              <Hotel className="h-4 w-4" />
              <Users className="h-4 w-4 md:hidden" />
              <Image className="h-4 w-4 md:hidden" />
              <FileText className="h-4 w-4 md:hidden" />
            </div>
          </div>
        </TableHead>
        
        {!isMobile && (
          <>
            <TableHead className="text-center">
              <div className="flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center">
                <Image className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center">
                <FileText className="h-4 w-4" />
              </div>
            </TableHead>
          </>
        )}
      </TableRow>
    </TableHeader>
  );
};

export default UsersTableHeader;
