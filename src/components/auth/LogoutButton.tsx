
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import useAuthentication from '@/hooks/useAuthentication';

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

const LogoutButton = ({ 
  variant = 'ghost', 
  size = 'sm',
  className 
}: LogoutButtonProps) => {
  const { logout } = useAuthentication();

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={logout}
      className={className}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  );
};

export default LogoutButton;
