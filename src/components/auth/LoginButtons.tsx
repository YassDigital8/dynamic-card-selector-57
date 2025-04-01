
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoginButtonsProps {
  isLoading: boolean;
  onDemoModeClick: () => void;
}

const LoginButtons: React.FC<LoginButtonsProps> = ({
  isLoading,
  onDemoModeClick
}) => {
  return (
    <>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          'Log in'
        )}
      </Button>
      
      <div className="mt-4 text-center">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onDemoModeClick}
        >
          Enter Demo Mode
        </Button>
      </div>
    </>
  );
};

export default LoginButtons;
