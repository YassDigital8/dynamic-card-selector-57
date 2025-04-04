
import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from './PageHeader';

interface PageContentProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
  fadeAnimation?: boolean;
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const PageContent: React.FC<PageContentProps> = ({ 
  children, 
  pageTitle, 
  pageDescription,
  fadeAnimation = true
}) => {
  const ContentWrapper = fadeAnimation ? motion.div : 'div';
  const motionProps = fadeAnimation ? {
    initial: "hidden",
    animate: "visible",
    variants: fadeInVariants
  } : {};
  
  return (
    <div className="p-2 sm:p-4 md:p-8 lg:p-10">
      <ContentWrapper 
        className="max-w-6xl mx-auto"
        {...motionProps}
      >
        <PageHeader pageTitle={pageTitle} pageDescription={pageDescription} />
        {children}
      </ContentWrapper>
    </div>
  );
};

export default PageContent;
