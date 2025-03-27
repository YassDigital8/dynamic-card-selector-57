
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className,
  align = 'left'
}) => {
  return (
    <div className={cn(
      "mb-8",
      {
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
      },
      className
    )}>
      <h2 className="text-2xl font-bold text-blue-800 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
