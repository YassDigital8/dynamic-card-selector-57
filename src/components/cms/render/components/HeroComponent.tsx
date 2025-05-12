
import React from 'react';
import { Link } from 'react-router-dom';

interface HeroComponentProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
  ctaText?: string;
  ctaLink?: string;
}

const HeroComponent: React.FC<HeroComponentProps> = ({
  title,
  subtitle,
  bgImage = '/placeholder.svg',
  ctaText,
  ctaLink
}) => {
  const isInternalLink = ctaLink?.startsWith('/');
  
  // Determine if we should render a CTA button - both text and link must be present
  const shouldRenderCTA = ctaText && ctaLink;
  
  return (
    <div className="relative w-full bg-slate-800 text-white overflow-hidden rounded-lg">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 px-8 py-16 sm:py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-xl mb-8">{subtitle}</p>}
        
        {shouldRenderCTA && (
          isInternalLink ? (
            <Link 
              to={ctaLink} 
              className="bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 rounded-md font-medium"
            >
              {ctaText}
            </Link>
          ) : (
            <a 
              href={ctaLink} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 rounded-md font-medium"
            >
              {ctaText}
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default HeroComponent;
