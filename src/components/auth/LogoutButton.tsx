
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, ChevronDown } from 'lucide-react';
import useAuthentication from '@/hooks/useAuthentication';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

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
  const { logout, userInfo } = useAuthentication();
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className={cn("flex items-center gap-2", className)}
          title="User options"
        >
          {showText && (userInfo?.firstName || userInfo?.email || 'User')}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white">
        <div className="px-2 py-2 text-sm font-medium text-gray-700">
          {userInfo?.firstName ? `${userInfo.firstName}` : userInfo?.email}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSettingsClick} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogoutButton;
