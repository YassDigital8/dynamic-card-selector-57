
import React from 'react';
import { CMSComponent } from '@/hooks/cms/useCmsState';
import HeroComponent from './components/HeroComponent';
import TextComponent from './components/TextComponent';
import ImageComponent from './components/ImageComponent';
import SectionComponent from './components/SectionComponent';
import ContactFormComponent from './components/ContactFormComponent';
import GalleryComponent from './components/GalleryComponent';
import UnknownComponent from './components/UnknownComponent';

interface RenderComponentProps {
  component: CMSComponent;
}

const RenderComponent: React.FC<RenderComponentProps> = ({ component }) => {
  const { type, props } = component;
  
  // Render the component based on its type
  switch (type) {
    case 'hero':
      return <HeroComponent {...props} />;
    case 'text':
      return <TextComponent {...props} />;
    case 'image':
      return <ImageComponent {...props} />;
    case 'section':
      return <SectionComponent {...props} />;
    case 'contact-form':
      return <ContactFormComponent {...props} />;
    case 'gallery':
      return <GalleryComponent {...props} />;
    default:
      return <UnknownComponent type={type} props={props} />;
  }
};

export default RenderComponent;
