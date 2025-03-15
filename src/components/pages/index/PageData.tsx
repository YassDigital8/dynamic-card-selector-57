
import React from 'react';
import PageDetails from './PageDetails';

interface PageDataProps {
  pageData: any | null;
  onRefresh?: () => void;
  onDelete?: () => void;
  selectedPOS?: string;
  selectedLanguage?: string;
  selectedSlug?: string;
  selectedSubSlug?: string;
}

const PageData = (props: PageDataProps) => {
  // Pass all props to the refactored PageDetails component
  return <PageDetails {...props} />;
};

export default PageData;
