
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, ExternalLink, Calendar, Handshake } from 'lucide-react';
import { ContractDocument } from '@/models/HotelModel';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { staggerContainerVariants, staggerItemVariants } from '../../animations/cardAnimations';

interface CommercialDealsViewProps {
  contractDocuments?: ContractDocument[];
}

const CommercialDealsView: React.FC<CommercialDealsViewProps> = ({ contractDocuments = [] }) => {
  const handleOpenDocument = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div 
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-6 flex items-center justify-center gap-2">
        <Handshake className="h-6 w-6" />
        Commercial Deals
      </h3>

      <motion.div variants={staggerItemVariants}>
        <Card className="overflow-hidden shadow-md">
          <CardHeader className="bg-slate-50 dark:bg-slate-800/50">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-red-500" />
              Contract Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {contractDocuments && contractDocuments.length > 0 ? (
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {contractDocuments.map((document) => (
                    <motion.div 
                      key={document.id} 
                      className="flex items-center gap-3 p-3 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      variants={staggerItemVariants}
                    >
                      <FileText className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{document.fileName}</p>
                        {document.description && (
                          <p className="text-sm text-muted-foreground truncate">
                            {document.description}
                          </p>
                        )}
                        {document.uploadedAt && (
                          <p className="text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            Uploaded {formatDistanceToNow(new Date(document.uploadedAt), { addSuffix: true })}
                          </p>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleOpenDocument(document.url)}
                        className="flex-shrink-0 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Open document</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-muted-foreground">No contract documents available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={staggerItemVariants} className="mt-6">
        <Card className="overflow-hidden shadow-md">
          <CardHeader className="bg-slate-50 dark:bg-slate-800/50">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Upcoming Renewals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Contract renewal information will be displayed here in future updates.</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CommercialDealsView;
