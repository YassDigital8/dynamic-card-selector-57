
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ChevronDown } from 'lucide-react';

const Index = () => {
  const [language, setLanguage] = useState('English');
  const [pos, setPos] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState(null);

  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];
  const positions = ['aboutus', 'contact', 'services', 'products', 'blog'];

  const fetchPageData = async () => {
    setLoading(true);
    try {
      // This is a mock fetch since we can't actually call your API
      // In a real implementation, you would use:
      // const response = await fetch(`https://${URL}:7036/${language}/${pos}/aboutus`);
      
      // Simulating API response with a timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response data
      const mockData = {
        success: true,
        data: {
          title: `${language} page for ${pos}`,
          content: 'This is the page content that would come from the API.'
        }
      };
      
      setPageData(mockData.data);
      toast.success(`Page data fetched successfully for ${language}/${pos}`);
    } catch (error) {
      console.error('Error fetching page data:', error);
      toast.error('Failed to fetch page data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!language || !pos) {
      toast.error('Please select both language and position');
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-10">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-2">
          <span className="text-sm font-medium text-blue-500 tracking-wide">CONTENT MANAGEMENT</span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight"
        >
          Page Manager
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg text-gray-600 mb-10 leading-relaxed"
        >
          Add and manage pages across different languages and sections of your website.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Card className="border border-gray-200 shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-gray-800 text-xl">Add New Page</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                      Language
                    </label>
                    <Select
                      value={language}
                      onValueChange={setLanguage}
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                      Position
                    </label>
                    <Select
                      value={pos}
                      onValueChange={setPos}
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((position) => (
                          <SelectItem key={position} value={position}>{position}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all" 
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Fetch Page Data'}
                </Button>
              </form>

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
          API Endpoint: <code className="bg-gray-100 p-1 rounded font-mono text-sm">https://URL:7036/Language/Position/aboutus</code>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
