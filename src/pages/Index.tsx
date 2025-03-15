import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Search, ChevronDown } from 'lucide-react';

const Index = () => {
  // Authentication state
  const [authToken, setAuthToken] = useState('');
  const [authLoading, setAuthLoading] = useState(true);
  
  // POS and language options
  const posOptions = ['SY', 'UAE', 'KWI'];
  const languageOptions = ['English', 'Arabic'];
  
  // State for selected values
  const [selectedPOS, setSelectedPOS] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [availableSlugs, setAvailableSlugs] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [subSlugs, setSubSlugs] = useState([]);
  const [selectedSubSlug, setSelectedSubSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState(null);

  // Authenticate on page load
  useEffect(() => {
    const authenticate = async () => {
      setAuthLoading(true);
      try {
        const response = await fetch('https://92.112.184.210:7182/api/Authentication/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'tarek3.doe@example.com',
            password: 'Hi@2025'
          })
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const data = await response.json();
        
        // Store token in state and localStorage for persistence
        if (data.token) {
          setAuthToken(data.token);
          localStorage.setItem('authToken', data.token);
          toast.success('Authentication successful');
        } else {
          throw new Error('No token received');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        toast.error('Authentication failed: ' + error.message);
      } finally {
        setAuthLoading(false);
      }
    };

    authenticate();
  }, []);

  // Reset dependent fields when POS or language changes
  useEffect(() => {
    if (selectedPOS && selectedLanguage) {
      setSelectedSlug('');
      setSubSlugs([]);
      setSelectedSubSlug('');
      setPageData(null);
      fetchSlugs();
    }
  }, [selectedPOS, selectedLanguage]);

  // Reset sub-slugs when parent slug changes
  useEffect(() => {
    if (selectedSlug) {
      setSelectedSubSlug('');
      setPageData(null);
      fetchSubSlugs();
    }
  }, [selectedSlug]);

  // Fetch initial slugs based on POS and language
  const fetchSlugs = async () => {
    setLoading(true);
    try {
      // Format language to lowercase for API
      const langFormatted = selectedLanguage.toLowerCase();
      
      // Use token for API request if available
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      // Actual API call to get initial slugs
      // const response = await fetch(`https://URL:7036/get-sub-path/${selectedPOS.toLowerCase()}/${langFormatted}/`, { headers });
      // const data = await response.json();
      
      // Simulating API response with a timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response data
      const mockSlugs = ['aboutus', 'contact', 'services', 'products', 'blog'];
      
      setAvailableSlugs(mockSlugs);
      toast.success(`Retrieved slugs for ${selectedPOS}/${selectedLanguage}`);
    } catch (error) {
      console.error('Error fetching slugs:', error);
      toast.error('Failed to fetch page slugs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch sub-slugs based on selected parent slug
  const fetchSubSlugs = async () => {
    setLoading(true);
    try {
      // Format language to lowercase for API
      const langFormatted = selectedLanguage.toLowerCase();
      
      // Use token for API request if available
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      // Actual API call to get sub-slugs
      // const response = await fetch(`https://URL:7036/get-sub-path/${selectedPOS.toLowerCase()}/${langFormatted}/${selectedSlug}/`, { headers });
      // const data = await response.json();
      
      // Simulating API response with a timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response data - would come from the API in a real app
      const mockSubSlugs = ['subpage1', 'subpage2', 'subpage3'];
      
      setSubSlugs(mockSubSlugs);
      toast.success(`Retrieved sub-slugs for ${selectedSlug}`);
    } catch (error) {
      console.error('Error fetching sub-slugs:', error);
      toast.error('Failed to fetch sub-slugs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch page data based on the complete path
  const fetchPageData = async () => {
    setLoading(true);
    try {
      const langFormatted = selectedLanguage.toLowerCase();
      const path = selectedSubSlug 
        ? `${selectedPOS.toLowerCase()}/${langFormatted}/${selectedSlug}/${selectedSubSlug}`
        : `${selectedPOS.toLowerCase()}/${langFormatted}/${selectedSlug}`;
      
      // Use token for API request if available
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      // Actual API call to get page data
      // const response = await fetch(`https://URL:7036/get-sub-path/${path}`, { headers });
      // const data = await response.json();
      
      // Simulating API response with a timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response data
      const mockData = {
        success: true,
        data: {
          title: `${selectedLanguage} page for ${selectedPOS}/${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''}`,
          content: 'This is the page content that would come from the API.'
        }
      };
      
      setPageData(mockData.data);
      toast.success(`Page data fetched successfully`);
    } catch (error) {
      console.error('Error fetching page data:', error);
      toast.error('Failed to fetch page data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle the Get Pages button click
  const handleGetPages = () => {
    if (!selectedPOS || !selectedLanguage) {
      toast.error('Please select both POS and language');
      return;
    }
    fetchSlugs();
  };

  // Handle the final fetch
  const handleFetchData = () => {
    if (!selectedSlug) {
      toast.error('Please select a page slug');
      return;
    }
    fetchPageData();
  };

  // Animation variants
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

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  // Show loading state during authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-medium text-gray-700">Authenticating...</h2>
          <p className="text-gray-500 mt-2">Connecting to the server</p>
        </motion.div>
      </div>
    );
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
              {/* Show auth status */}
              <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-md">
                <p className="text-green-700 text-sm">
                  {authToken ? 'Authentication successful ✓' : 'Not authenticated'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Language
                  </label>
                  <Select
                    value={selectedLanguage}
                    onValueChange={setSelectedLanguage}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((lang) => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select POS
                  </label>
                  <Select
                    value={selectedPOS}
                    onValueChange={setSelectedPOS}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select POS" />
                    </SelectTrigger>
                    <SelectContent>
                      {posOptions.map((pos) => (
                        <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mb-6">
                <Button 
                  onClick={handleGetPages}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
                  disabled={loading || !selectedPOS || !selectedLanguage}
                >
                  {loading ? 'Processing...' : 'Get Pages'}
                </Button>
              </div>

              {availableSlugs.length > 0 && (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                  className="mb-6"
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Select Parent Path
                    </label>
                    <Select
                      value={selectedSlug}
                      onValueChange={setSelectedSlug}
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="-- Select Parent --" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSlugs.map((slug) => (
                          <SelectItem key={slug} value={slug}>{slug}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {subSlugs.length > 0 && (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                  className="mb-6"
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Select Sub Path
                    </label>
                    <Select
                      value={selectedSubSlug}
                      onValueChange={setSelectedSubSlug}
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="-- Select Sub Path --" />
                      </SelectTrigger>
                      <SelectContent>
                        {subSlugs.map((slug) => (
                          <SelectItem key={slug} value={slug}>{slug}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {selectedSlug && (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                >
                  <Button 
                    onClick={handleFetchData}
                    className="w-full bg-green-600 hover:bg-green-700 text-white transition-all"
                    disabled={loading}
                  >
                    {loading ? 'Fetching...' : 'Fetch Page Data'}
                  </Button>
                </motion.div>
              )}

              {pageData && (
                <motion.div 
                  className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{pageData.title}</h3>
                  <Separator className="my-3" />
                  <p className="text-gray-600">{pageData.content}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-8 text-center text-sm text-gray-500"
        >
          API Endpoint: <code className="bg-gray-100 p-1 rounded font-mono text-sm">https://URL:7036/get-sub-path/POS/Language/Slug/SubSlug</code>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
