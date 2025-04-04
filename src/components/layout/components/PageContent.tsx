
import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from './PageHeader';

interface PageContentProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
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

const PageContent: React.FC<PageContentProps> = ({ children, pageTitle, pageDescription }) => {
  return (
    <div className="p-2 sm:p-4 md:p-8 lg:p-10">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <PageHeader pageTitle={pageTitle} pageDescription={pageDescription} />
        {children}
      </motion.div>
    </div>
  );
};

export default PageContent;
