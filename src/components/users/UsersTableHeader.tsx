
import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { Hotel, Users, Image, FileText } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const UsersTableHeader: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[40px] px-2"></TableHead>
        <TableHead className="max-w-[140px] md:w-[180px]">Name</TableHead>
        {!isMobile && <TableHead className="max-w-[180px]">Email</TableHead>}
        <TableHead className="w-[100px]">Status</TableHead>
        {!isMobile && <TableHead className="w-[100px]">Dep</TableHead>}
        {!isMobile && <TableHead className="w-[140px]">Last Login</TableHead>}
        
        <TableHead className="text-center w-[100px]">
          <div className="flex items-center justify-center gap-1">
            <span className="sr-only md:not-sr-only md:inline md:mr-1">Hotels</span>
            <Hotel className="h-4 w-4" />
          </div>
        </TableHead>
        
        {!isMobile && (
          <>
            <TableHead className="text-center w-[100px]">
              <div className="flex items-center justify-center gap-1">
                <span className="sr-only md:not-sr-only md:inline md:mr-1">Users</span>
                <Users className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-center w-[100px]">
              <div className="flex items-center justify-center gap-1">
                <span className="sr-only md:not-sr-only md:inline md:mr-1">Gallery</span>
                <Image className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-center w-[100px]">
              <div className="flex items-center justify-center gap-1">
                <span className="sr-only md:not-sr-only md:inline md:mr-1">CMS</span>
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
