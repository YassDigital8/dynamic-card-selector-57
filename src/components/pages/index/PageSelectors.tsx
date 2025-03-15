
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';

interface PageSelectorsProps {
  posOptions: string[];
  languageOptions: string[];
  selectedPOS: string;
  selectedLanguage: string;
  setSelectedPOS: (value: string) => void;
  setSelectedLanguage: (value: string) => void;
  loading: boolean;
  handleGetPages: () => void;
  onAddPageClick?: () => void;
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const PageSelectors = ({
  posOptions,
  languageOptions,
  selectedPOS,
  selectedLanguage,
  setSelectedPOS,
  setSelectedLanguage,
  loading,
  handleGetPages,
  onAddPageClick
}: PageSelectorsProps) => {
  return (
    <>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Button 
          onClick={handleGetPages}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
          disabled={loading || !selectedPOS || !selectedLanguage}
        >
          {loading ? 'Processing...' : 'Get Pages'}
        </Button>
        
        <Button 
          onClick={onAddPageClick}
          className="w-full bg-green-600 hover:bg-green-700 text-white transition-all"
          disabled={loading || !selectedPOS || !selectedLanguage}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Page
        </Button>
      </div>
    </>
  );
};

export default PageSelectors;
