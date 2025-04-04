
import React, { useState } from 'react';
import { HelpCircle, MessageCircle, FileText, Link2, ExternalLink } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HelpSectionProps {
  className?: string;
}

const HelpSection: React.FC<HelpSectionProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  
  const supportOptions = [
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: MessageCircle,
      href: '/help/contact'
    },
    {
      title: 'Documentation',
      description: 'Read our user guides and FAQs',
      icon: FileText,
      href: '/help/docs'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: Link2,
      href: 'https://community.example.com',
      external: true
    }
  ];
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground", className)}
        >
          <HelpCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="text-xs md:text-sm">Need help?</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start" side="top">
        <div className="flex flex-col p-2">
          <div className="px-3 py-2 border-b">
            <h3 className="font-semibold">Support Options</h3>
            <p className="text-xs text-muted-foreground">Get help with your dashboard</p>
          </div>
          <div className="flex flex-col gap-1 p-1">
            {supportOptions.map((option, index) => (
              <a 
                key={index} 
                href={option.href}
                target={option.external ? "_blank" : "_self"}
                rel={option.external ? "noopener noreferrer" : ""}
                className="flex items-start gap-3 p-2 rounded-md hover:bg-muted transition-colors"
              >
                <div className="shrink-0 p-1.5 bg-muted rounded-md">
                  <option.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{option.title}</h4>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
                {option.external && (
                  <ExternalLink className="h-3 w-3 text-muted-foreground mt-0.5" />
                )}
              </a>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HelpSection;
