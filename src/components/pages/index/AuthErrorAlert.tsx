
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  error: string | null;
  title?: string;
}

const ErrorAlert = ({ error, title = "Error" }: ErrorAlertProps) => {
  if (!error) return null;
  
  return (
    <div className="mb-6 animate-fade-in">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ErrorAlert;
