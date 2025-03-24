
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FilePreview } from '@/components/gallery/FilePreview';
import { ContractDocument } from '@/models/HotelModel';
import { Button } from '@/components/ui/button';
import { Eye, Download, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface ContractSectionProps {
  contractDocuments?: ContractDocument[];
}

const ContractSection: React.FC<ContractSectionProps> = ({ contractDocuments = [] }) => {
  if (contractDocuments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-center">
        <FilePreview file={{
          id: "no-doc",
          name: "No documents",
          type: 'text/plain',
          size: 0,
          url: '',
          uploadedBy: 'system',
          uploadedOn: new Date().toISOString(),
          galleryId: '',
          metadata: { description: '' }
        }} size="lg" />
        <p className="text-gray-500 dark:text-gray-400 mt-4">No contract documents are available for this hotel.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {contractDocuments.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="overflow-hidden bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 flex-shrink-0 mt-1">
                  <FilePreview file={{
                    id: doc.id,
                    name: doc.fileName,
                    type: 'application/pdf',
                    size: 0,
                    url: doc.url,
                    uploadedBy: 'system',
                    uploadedOn: doc.uploadedAt || new Date().toISOString(),
                    galleryId: 'contractDocuments',
                    metadata: {
                      description: doc.description
                    }
                  }} size="md" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-indigo-700 dark:text-indigo-300">{doc.fileName}</h4>
                  {doc.description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{doc.description}</p>}
                  
                  {/* Date range info with calendar icon */}
                  {doc.startDate && doc.endDate && (
                    <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-indigo-500" />
                      <span>
                        Valid: {format(new Date(doc.startDate), 'MMM d, yyyy')} - {format(new Date(doc.endDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                  )}
                  
                  {/* Action buttons */}
                  <div className="flex gap-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs bg-white dark:bg-slate-800"
                      asChild
                    >
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs bg-white dark:bg-slate-800"
                      asChild
                    >
                      <a href={doc.url} download>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ContractSection;
