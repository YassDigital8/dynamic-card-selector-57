
import React from 'react';
import StandardLayout from '@/components/layout/StandardLayout';
import POSPage from '@/components/pos/POSPage';

const POS = () => {
  return (
    <StandardLayout
      pageTitle="POS Management"
      pageDescription="Manage Point of Service locations"
    >
      <div className="w-full h-full py-4 px-2">
        <POSPage />
      </div>
    </StandardLayout>
  );
};

export default POS;
