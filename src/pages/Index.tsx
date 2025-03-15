
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Hooks
import useAuthentication from '@/hooks/useAuthentication';
import usePageNavigation from '@/hooks/usePageNavigation';

// Components
import LoadingScreen from '@/components/pages/index/LoadingScreen';
import AuthenticatedContent from '@/components/pages/index/AuthenticatedContent';
import AuthErrorAlert from '@/components/pages/index/AuthErrorAlert';
import PageSelectors from '@/components/pages/index/PageSelectors';
import PathSelectors from '@/components/pages/index/PathSelectors';
import PageData from '@/components/pages/index/PageData';

const Index = () => {
  const { authToken, authLoading, authError, userInfo } = useAuthentication();
  const {
    posOptions,
    languageOptions,
    selectedPOS,
    setSelectedPOS,
    selectedLanguage,
    setSelectedLanguage,
    availableSlugs,
    selectedSlug,
    setSelectedSlug,
    subSlugs,
    selectedSubSlug,
    setSelectedSubSlug,
    loading,
    pageData,
    handleGetPages,
    handleFetchData
  } = usePageNavigation({ authToken });

  const containerVariants = {
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  if (authLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-10">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-2">
          <span className="text-sm font-medium text-blue-500 tracking-wide">PAGE MANAGEMENT</span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight"
        >
          Page Navigator
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg text-gray-600 mb-10 leading-relaxed"
        >
          Navigate through pages across different POS and languages.
        </motion.p>

        <AuthenticatedContent userInfo={userInfo} />
        <AuthErrorAlert error={authError} />

        <motion.div variants={itemVariants}>
          <Card className="border border-gray-200 shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-yellow-400 border-b border-gray-100">
              <CardTitle className="text-gray-800 text-xl">General Elements</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-md">
                <p className="text-green-700 text-sm">
                  {authToken ? 'Authentication successful ✓' : 'Not authenticated'}
                  {authError && ' (simulated for development)'}
                </p>
              </div>
              
              <PageSelectors 
                posOptions={posOptions}
                languageOptions={languageOptions}
                selectedPOS={selectedPOS}
                selectedLanguage={selectedLanguage}
                setSelectedPOS={setSelectedPOS}
                setSelectedLanguage={setSelectedLanguage}
                loading={loading}
                handleGetPages={handleGetPages}
              />

              <PathSelectors 
                availableSlugs={availableSlugs}
                selectedSlug={selectedSlug}
                setSelectedSlug={setSelectedSlug}
                subSlugs={subSlugs}
                selectedSubSlug={selectedSubSlug}
                setSelectedSubSlug={setSelectedSubSlug}
                loading={loading}
                handleFetchData={handleFetchData}
              />

              <PageData pageData={pageData} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-8 text-center text-sm text-gray-500"
        >
          API Endpoint: <code className="bg-gray-100 p-1 rounded font-mono text-sm">https://92.112.184.210:7036/get-sub-path/POS/Language/Slug/SubSlug</code>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
