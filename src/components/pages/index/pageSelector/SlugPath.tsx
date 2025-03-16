
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SlugPathProps {
  selectedPOS: string;
  selectedLanguage: string;
  selectedSlug: string;
  selectedSubSlug: string;
}

const SlugPath = ({
  selectedPOS,
  selectedLanguage,
  selectedSlug,
  selectedSubSlug
}: SlugPathProps) => {
  if (!selectedPOS || !selectedLanguage) {
    return null;
  }

  const pathSegments = [
    selectedPOS.toLowerCase(),
    selectedLanguage.toLowerCase()
  ];
  
  if (selectedSlug) {
    pathSegments.push(selectedSlug);
    
    if (selectedSubSlug) {
      pathSegments.push(selectedSubSlug);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1 md:gap-2 font-mono text-[9px] md:text-xs">
      {pathSegments.map((segment, index) => (
        <React.Fragment key={`segment-${index}`}>
          {index > 0 && <span className="text-gray-400">/</span>}
          <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5">
            {segment}
          </Badge>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SlugPath;
