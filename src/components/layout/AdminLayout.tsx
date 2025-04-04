
import React from 'react';
import AdminSidebar from '@/components/ui/admin-sidebar';
import AdminHeader from '@/components/layout/AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title,
  description 
}) => {
  return (
    <div className="flex h-screen w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title={title} description={description} />
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
