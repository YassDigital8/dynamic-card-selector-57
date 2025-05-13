
import React from 'react';
import { CMSComponent } from '@/hooks/cms';
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
      return <HeroComponent title={props.title || 'Hero Title'} 
                           subtitle={props.subtitle} 
                           bgImage={props.bgImage} 
                           ctaText={props.ctaText} 
                           ctaLink={props.ctaLink} />;
    case 'text':
      return <TextComponent content={props.content || 'Text content goes here'} 
                           alignment={props.alignment} />;
    case 'image':
      return <ImageComponent src={props.src || '/placeholder.svg'} 
                            alt={props.alt || 'Image'} 
                            width={props.width} 
                            height={props.height} />;
    case 'section':
      return <SectionComponent title={props.title || 'Section Title'} 
                              columns={props.columns || 3} 
                              items={props.items || []} />;
    case 'contact-form':
      return <ContactFormComponent title={props.title || 'Contact Us'} 
                                  fields={props.fields || ['name', 'email', 'message']} 
                                  submitText={props.submitText || 'Send'} />;
    case 'gallery':
      return <GalleryComponent images={props.images || []} />;
    default:
      return <UnknownComponent type={type} props={props} />;
  }
};

export default RenderComponent;
