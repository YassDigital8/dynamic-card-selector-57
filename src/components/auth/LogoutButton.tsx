
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import useAuthentication from '@/hooks/useAuthentication';

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'success' | 'info' | 'warning';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
}

const LogoutButton = ({ 
  variant = 'ghost', 
  size = 'sm',
  className,
  showIcon = true,
  showText = true
}: LogoutButtonProps) => {
  const { logout } = useAuthentication();

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={logout}
      className={className}
      title="Logout"
    >
      {showIcon && <LogOut className="h-4 w-4 mr-2" />}
      {showText && "Logout"}
    </Button>
  );
};

export default LogoutButton;
