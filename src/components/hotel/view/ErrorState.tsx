
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ErrorState: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            Hotel not found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            The hotel you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Button 
            className="mt-4"
            onClick={() => navigate('/hotel')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hotels
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorState;
