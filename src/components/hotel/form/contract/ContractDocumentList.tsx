
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface ContractDocumentListProps {
  documents: any[];
  onRemove: (index: number) => void;
}

const ContractDocumentList: React.FC<ContractDocumentListProps> = ({ documents, onRemove }) => {
  if (documents.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 space-y-3">
      <h3 className="font-medium">Uploaded Contract Documents</h3>
      <ScrollArea className="h-[200px] border rounded-md p-2">
        <div className="space-y-2">
          {documents.map((document: any, index) => (
            <div key={document.id} className="flex items-center gap-3 p-2 border rounded-md">
              <FileText className="h-5 w-5 text-red-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{document.fileName}</p>
                {document.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {document.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-x-3 mt-1 text-xs text-gray-500">
                  {document.startDate && (
                    <span>Start: {format(new Date(document.startDate), "PPP")}</span>
                  )}
                  {document.endDate && (
                    <span>End: {format(new Date(document.endDate), "PPP")}</span>
                  )}
                </div>
              </div>
              <Button
                variant="ghost" 
                size="icon"
                type="button"
                onClick={() => onRemove(index)}
                className="flex-shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove contract</span>
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContractDocumentList;
