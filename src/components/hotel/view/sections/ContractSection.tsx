
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FilePreview } from '@/components/gallery/FilePreview';
import { ContractDocument } from '@/models/HotelModel';
import { FileInfo } from '@/models/FileModel';

interface ContractSectionProps {
  contractDocuments?: ContractDocument[];
}

const ContractSection: React.FC<ContractSectionProps> = ({ contractDocuments = [] }) => {
  if (contractDocuments.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No contract documents available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {contractDocuments.map((doc) => (
        <Card key={doc.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex-shrink-0">
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
                }} size="sm" />
              </div>
              <div>
                <h4 className="font-medium text-sm">{doc.fileName}</h4>
                {doc.description && <p className="text-xs text-gray-500">{doc.description}</p>}
                {doc.startDate && doc.endDate && (
                  <p className="text-xs text-gray-500">
                    Valid: {new Date(doc.startDate).toLocaleDateString()} - {new Date(doc.endDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-2">
              <a 
                href={doc.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                Download Document
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContractSection;
