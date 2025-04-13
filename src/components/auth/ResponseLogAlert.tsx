
import React from 'react';
import { Info, Server, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ResponseLogAlertProps {
  responseLog: string | null;
}

const ResponseLogAlert: React.FC<ResponseLogAlertProps> = ({ responseLog }) => {
  if (!responseLog) return null;
  
  let parsedResponse;
  try {
    parsedResponse = JSON.parse(responseLog);
  } catch (e) {
    // If it's not valid JSON, just use the raw string
    parsedResponse = null;
  }
  
  const isErrorResponse = parsedResponse && parsedResponse.error === true;
  
  return (
    <Alert 
      variant={isErrorResponse ? "error" : "info"} 
      className="mt-4"
    >
      {isErrorResponse ? 
        <AlertTriangle className="h-4 w-4" /> : 
        (parsedResponse && parsedResponse.token ? <Server className="h-4 w-4" /> : <Info className="h-4 w-4" />)
      }
      <AlertTitle>
        {isErrorResponse ? "API Error Response" : "Authentication Response"}
      </AlertTitle>
      <AlertDescription>
        {isErrorResponse ? (
          <div className="mt-2">
            <p className="mb-2 text-sm font-medium">The server returned an error:</p>
            <pre className="text-xs bg-red-50 dark:bg-red-900/20 p-3 rounded overflow-auto max-h-60 border border-red-200 dark:border-red-800">
              {responseLog}
            </pre>
          </div>
        ) : (
          <div>
            {parsedResponse && parsedResponse.token ? (
              <p className="text-sm mb-2">
                Successfully authenticated as{' '}
                <span className="font-medium">
                  {parsedResponse.firstName || parsedResponse.email}
                </span>
              </p>
            ) : null}
            <pre className="text-xs mt-2 bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-auto max-h-60 border border-gray-200 dark:border-gray-700">
              {responseLog}
            </pre>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ResponseLogAlert;
