
import React from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ResponseLogAlertProps {
  responseLog: string | null;
}

const ResponseLogAlert: React.FC<ResponseLogAlertProps> = ({ responseLog }) => {
  if (!responseLog) return null;
  
  return (
    <Alert variant="info" className="mt-4">
      <Info className="h-4 w-4" />
      <AlertTitle>Authentication Response</AlertTitle>
      <AlertDescription>
        <pre className="text-xs mt-2 bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-auto max-h-60">
          {responseLog}
        </pre>
      </AlertDescription>
    </Alert>
  );
};

export default ResponseLogAlert;
