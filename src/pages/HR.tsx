
import React from 'react';
import StandardLayout from '@/components/layout/StandardLayout';
import HRPage from '@/components/hr/HRPage';

const HR = () => {
  return (
    <StandardLayout
      pageTitle="HR Management System"
      pageDescription="Comprehensive human resources management platform"
    >
      <div className="w-full h-full py-4 px-2">
        <HRPage />
      </div>
    </StandardLayout>
  );
};

export default HR;
