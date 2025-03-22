
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, ExternalLink, Calendar } from 'lucide-react';
import { ContractDocument } from '@/models/HotelModel';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { formatDate } from '@/lib/date-utils';

interface ContractDocumentsCardProps {
  contractDocuments?: ContractDocument[];
}

const ContractDocumentsCard: React.FC<ContractDocumentsCardProps> = ({ contractDocuments = [] }) => {
  if (contractDocuments.length === 0) {
    return null;
  }

  const handleOpenDocument = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 dark:bg-slate-800/50">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-red-500" />
          Contract Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[200px]">
          <div className="space-y-3">
            {contractDocuments.map((document) => (
              <div key={document.id} className="flex items-center gap-3 p-3 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <FileText className="h-5 w-5 text-red-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{document.fileName}</p>
                  {document.description && (
                    <p className="text-sm text-muted-foreground truncate">
                      {document.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-x-4 mt-1 text-xs text-muted-foreground">
                    {document.uploadedAt && (
                      <p>
                        Uploaded {formatDistanceToNow(new Date(document.uploadedAt), { addSuffix: true })}
                      </p>
                    )}
                    {document.startDate && (
                      <p>
                        From: {formatDate(document.startDate)}
                      </p>
                    )}
                    {document.endDate && (
                      <p>
                        To: {formatDate(document.endDate)}
                      </p>
                    )}
                  </div>
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
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ContractDocumentsCard;
