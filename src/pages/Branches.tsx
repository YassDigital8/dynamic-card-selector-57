
import React from 'react';
import StandardLayout from '@/components/layout/StandardLayout';
import BranchesPage from '@/components/branches/BranchesPage';

const Branches = () => {
  return (
    <StandardLayout
      pageTitle="Branches Management"
      pageDescription="Manage branch offices and locations"
    >
      <div className="w-full h-full py-4 px-2">
        <BranchesPage />
      </div>
    </StandardLayout>
  );
};

export default Branches;
