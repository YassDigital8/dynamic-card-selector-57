import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Search, ChevronDown, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AuthResponse {
  message: string;
  isAuthenticated: boolean;
  email: string;
  firstName: string;
  lastName: string | null;
  token: string;
  expiresOn: string;
}

const Index = () => {
  const [authToken, setAuthToken] = useState('');
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{firstName: string, email: string} | null>(null);
  
  const posOptions = ['SY', 'UAE', 'KWI'];
  const languageOptions = ['English', 'Arabic'];
  
  const [selectedPOS, setSelectedPOS] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [availableSlugs, setAvailableSlugs] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [subSlugs, setSubSlugs] = useState([]);
  const [selectedSubSlug, setSelectedSubSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const authenticate = async () => {
      setAuthLoading(true);
      setAuthError(null);
      try {
        console.log("Attempting authentication...");
        
        const authResponse = await fetch('https://92.112.184.210:7182/api/Authentication/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: "tarek3.doe@example.com",
            password: "Hi@2025"
          }),
          signal: AbortSignal.timeout(10000)
        });

        if (!authResponse.ok) {
          throw new Error(`Authentication failed with status: ${authResponse.status}`);
        }
        
        const authData: AuthResponse = await authResponse.json();
        console.log("Auth data received:", authData);
        
        if (!authData.isAuthenticated) {
          throw new Error('Authentication failed: ' + authData.message);
        }
        
        setAuthToken(authData.token);
        localStorage.setItem('authToken', authData.token);
        
        setUserInfo({
          firstName: authData.firstName,
          email: authData.email
        });
        
        console.log("Authentication successful!");
        toast({
          title: "Authentication successful",
          description: `Welcome, ${authData.firstName || authData.email}`,
        });
      } catch (error) {
        console.error('Authentication error:', error);
        
        let errorMessage = '';
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          errorMessage = 'Network error: Unable to connect to authentication server. ' +
                        'This may be due to a certificate issue with the server or network connectivity problem.';
        } else {
          errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        }
        
        setAuthError(`Authentication error: ${errorMessage}`);
        
        const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0YXJlazMuZG9lQGV4YW1wbGUuY29tIiwibmFtZSI6IlRhcmVrIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.mock_token";
        setAuthToken(mockToken);
        localStorage.setItem('authToken', mockToken);
        
        toast({
          variant: "destructive",
          title: "Authentication issue",
          description: "Using simulated data for development\n\nError: " + errorMessage.substring(0, 150),
        });
      } finally {
        setAuthLoading(false);
      }
    };

    authenticate();
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

  const fetchSlugs = async () => {
    setLoading(true);
    try {
      const langFormatted = selectedLanguage.toLowerCase();
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      };
      
      console.log(`Fetching slugs for ${selectedPOS.toLowerCase()}/${langFormatted}/`);
      
      const apiUrl = `https://92.112.184.210:7036/get-sub-path/${selectedPOS.toLowerCase()}/${langFormatted}/`;
      
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: headers,
          signal: AbortSignal.timeout(15000)
        });
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        setAvailableSlugs(data);
        
        toast({
          title: "Slugs retrieved",
          description: `Retrieved slugs for ${selectedPOS}/${selectedLanguage}`,
        });
      } catch (apiError) {
        console.error('API Error:', apiError);
        
        let errorMessage = '';
        if (apiError instanceof TypeError && apiError.message === 'Failed to fetch') {
          errorMessage = 'Network error: Unable to connect to API server. This may be due to HTTPS certificate issues.';
        } else {
          errorMessage = apiError instanceof Error ? apiError.message : 'Unknown API error';
        }
        
        const mockSlugs = ['aboutus', 'contact', 'services', 'products', 'blog', 'parent1'];
        setAvailableSlugs(mockSlugs);
        
        toast({
          variant: "destructive",
          title: "API Error",
          description: `Failed to fetch page slugs. Using mock data.\nError: ${errorMessage}`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSubSlugs = async () => {
    setLoading(true);
    try {
      const langFormatted = selectedLanguage.toLowerCase();
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      };
      
      console.log(`Fetching sub-slugs for ${selectedPOS.toLowerCase()}/${langFormatted}/${selectedSlug}/`);
      
      const apiUrl = `https://92.112.184.210:7036/get-sub-path/${selectedPOS.toLowerCase()}/${langFormatted}/${selectedSlug}/`;
      
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: headers,
          signal: AbortSignal.timeout(15000)
        });
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        setSubSlugs(data);
        
        toast({
          title: "Sub-slugs retrieved",
          description: `Retrieved sub-slugs for ${selectedSlug}`,
        });
      } catch (apiError) {
        console.error('API Error:', apiError);
        
        let errorMessage = '';
        if (apiError instanceof TypeError && apiError.message === 'Failed to fetch') {
          errorMessage = 'Network error: Unable to connect to API server. This may be due to HTTPS certificate issues.';
        } else {
          errorMessage = apiError instanceof Error ? apiError.message : 'Unknown API error';
        }
        
        const mockSubSlugs = ['subpage1', 'subpage2', 'subpage3', 'subparen1'];
        setSubSlugs(mockSubSlugs);
        
        toast({
          variant: "destructive",
          title: "API Error",
          description: `Failed to fetch sub-slugs. Using mock data.\nError: ${errorMessage}`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPageData = async () => {
    setLoading(true);
    try {
      const langFormatted = selectedLanguage.toLowerCase();
      const path = selectedSubSlug 
        ? `${selectedPOS.toLowerCase()}/${langFormatted}/${selectedSlug}/${selectedSubSlug}`
        : `${selectedPOS.toLowerCase()}/${langFormatted}/${selectedSlug}`;
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      };
      
      console.log(`Fetching page data for path: ${path}`);
      
      const apiUrl = `https://92.112.184.210:7036/get-sub-path/${path}`;
      
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: headers,
          signal: AbortSignal.timeout(15000)
        });
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        setPageData(data);
        
        toast({
          title: "Success",
          description: "Page data fetched successfully",
        });
      } catch (apiError) {
        console.error('API Error:', apiError);
        
        let errorMessage = '';
        if (apiError instanceof TypeError && apiError.message === 'Failed to fetch') {
          errorMessage = 'Network error: Unable to connect to API server. This may be due to HTTPS certificate issues.';
        } else {
          errorMessage = apiError instanceof Error ? apiError.message : 'Unknown API error';
        }
        
        const mockData = {
          title: `${selectedLanguage} page for ${selectedPOS}/${selectedSlug}${selectedSubSlug ? '/' + selectedSubSlug : ''}`,
          content: 'This is mock page content since the API fetch failed.'
        };
        setPageData(mockData);
        
        toast({
          variant: "destructive",
          title: "API Error",
          description: `Failed to fetch page data. Using mock data.\nError: ${errorMessage}`,
        });
      }
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

        {userInfo && (
          <motion.div variants={itemVariants} className="mb-6">
            <Alert className="bg-blue-50 border-blue-100">
              <AlertTitle className="text-blue-800">Welcome, {userInfo.firstName || userInfo.email}</AlertTitle>
              <AlertDescription className="text-blue-600">
                You are logged in and can access all page navigation features.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {authError && (
          <motion.div variants={itemVariants} className="mb-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Issue</AlertTitle>
              <AlertDescription>
                {authError}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

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
          API Endpoint: <code className="bg-gray-100 p-1 rounded font-mono text-sm">https://92.112.184.210:7036/get-sub-path/POS/Language/Slug/SubSlug</code>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
