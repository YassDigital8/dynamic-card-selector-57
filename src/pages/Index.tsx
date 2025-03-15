
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Components
import LoadingScreen from '@/components/pages/index/LoadingScreen';
import PageSelectors from '@/components/pages/index/PageSelectors';
import PathSelectors from '@/components/pages/index/PathSelectors';
import PageData from '@/components/pages/index/PageData';
import AddPageDialog from '@/components/pages/index/AddPageDialog';
import { AddPageFormValues } from '@/components/pages/index/AddPageDialog';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [selectedPOS, setSelectedPOS] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [availableSlugs, setAvailableSlugs] = useState<string[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [subSlugs, setSubSlugs] = useState<string[]>([]);
  const [selectedSubSlug, setSelectedSubSlug] = useState('');
  const [pageData, setPageData] = useState<any>(null);
  const [addPageDialogOpen, setAddPageDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const posOptions = ['SY', 'UAE', 'KWI'];
  const languageOptions = ['English', 'Arabic'];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedPOS && selectedLanguage) {
      setSelectedSlug('');
      setSubSlugs([]);
      setSelectedSubSlug('');
      setPageData(null);
      fetchSlugs();
    }
  }, [selectedPOS, selectedLanguage]);

  useEffect(() => {
    if (selectedSlug) {
      setSelectedSubSlug('');
      setPageData(null);
      fetchSubSlugs();
    }
  }, [selectedSlug]);

  const fetchSlugs = () => {
    setLoading(true);
    try {
      // Using mock data until SSL certificate is fixed
      const mockSlugs = ['aboutus', 'contact', 'services', 'products', 'blog', 'parent1'];
      setAvailableSlugs(mockSlugs);
      
      toast({
        title: "Development Mode",
        description: "Using mock data until SSL certificate is fixed",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSubSlugs = () => {
    setLoading(true);
    try {
      // Using mock data until SSL certificate is fixed
      const mockSubSlugs = ['subpage1', 'subpage2', 'subpage3', 'subparen1'];
      setSubSlugs(mockSubSlugs);
      
      toast({
        title: "Development Mode",
        description: "Using mock data until SSL certificate is fixed",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPageData = () => {
    setLoading(true);
    try {
      // Using mock data until SSL certificate is fixed
      const mockData = {
        title: `${selectedLanguage} page for ${selectedPOS}/${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''}`,
        content: 'This is mock page content until the SSL certificate is fixed.'
      };
      setPageData(mockData);
      
      toast({
        title: "Development Mode",
        description: "Using mock data until SSL certificate is fixed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetPages = () => {
    if (!selectedPOS || !selectedLanguage) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select both POS and language",
      });
      return;
    }
    fetchSlugs();
  };

  const handleFetchData = () => {
    if (!selectedSlug) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a page slug",
      });
      return;
    }
    fetchPageData();
  };

  const handleAddPage = async (formValues: AddPageFormValues) => {
    setLoading(true);
    try {
      const apiUrl = 'https://92.112.184.210:7036/Page';
      
      const pageData = {
        pageUrlName: formValues.pageUrlName,
        language: selectedLanguage,
        pos: selectedPOS.toLowerCase(),
        title: formValues.title,
        description: formValues.description
      };
      
      console.log('Sending page data:', pageData);
      
      // Using mock response until SSL certificate is fixed
      // In production, uncomment this code:
      /*
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create page: ${response.status} ${errorText}`);
      }
      */
      
      // Simulate success response
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Success",
        description: `Page "${formValues.title}" created successfully (mock)`,
      });
      
      // Refresh the list of pages
      fetchSlugs();
    } catch (error) {
      console.error('Error adding page:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add page",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

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

  if (loading && !selectedPOS && !selectedLanguage) {
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

        <motion.div variants={itemVariants}>
          <Card className="border border-gray-200 shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-yellow-400 border-b border-gray-100">
              <CardTitle className="text-gray-800 text-xl">General Elements</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
                <p className="text-blue-700 text-sm">
                  Authentication temporarily disabled. Using mock data until SSL certificate is fixed.
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
                onAddPageClick={() => setAddPageDialogOpen(true)}
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
          <p>Authentication module temporarily disabled. Using mock data until SSL certificate is fixed.</p>
        </motion.div>
      </motion.div>

      <AddPageDialog 
        open={addPageDialogOpen}
        onOpenChange={setAddPageDialogOpen}
        pos={selectedPOS}
        language={selectedLanguage}
        selectedSlug={selectedSlug}
        selectedSubSlug={selectedSubSlug}
        onAddPage={handleAddPage}
      />
    </div>
  );
};

export default Index;
