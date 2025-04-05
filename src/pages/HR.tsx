
import React from 'react';
import StandardLayout from '@/components/layout/StandardLayout';
import HRPage from '@/components/hr/HRPage';

const HR = () => {
  return (
    <StandardLayout
      pageTitle="HR Management"
      pageDescription="Manage job postings and applications"
    >
      <div className="w-full h-full py-2">
        <HRPage />
      </div>
    </StandardLayout>
  );
};

export default HR;
