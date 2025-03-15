
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PathSelectorsProps {
  availableSlugs: string[];
  selectedSlug: string;
  setSelectedSlug: (value: string) => void;
  subSlugs: string[];
  selectedSubSlug: string;
  setSelectedSubSlug: (value: string) => void;
  loading: boolean;
  handleFetchData: () => void;
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const PathSelectors = ({
  availableSlugs,
  selectedSlug,
  setSelectedSlug,
  subSlugs,
  selectedSubSlug,
  setSelectedSubSlug,
  loading,
  handleFetchData
}: PathSelectorsProps) => {
  return (
    <>
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
    </>
  );
};

export default PathSelectors;
