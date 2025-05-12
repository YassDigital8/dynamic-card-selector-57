
import { CMSComponent, CMSPage, ComponentDefinition } from './types';

// Mock data for initial development
export const mockPages: CMSPage[] = [
  {
    id: 'page-1',
    title: 'Home Page',
    slug: 'home',
    description: 'Main landing page',
    status: 'published',
    components: [
      {
        id: 'hero-1',
        type: 'hero',
        props: {
          title: 'Welcome to Our Site',
          subtitle: 'Discover amazing things with us',
          bgImage: '/placeholder.svg',
          ctaText: 'Learn More',
          ctaLink: '/about'
        }
      },
      {
        id: 'features-1',
        type: 'section',
        props: {
          title: 'Our Features',
          columns: 3,
          items: [
            { title: 'Feature 1', description: 'Description of feature 1' },
            { title: 'Feature 2', description: 'Description of feature 2' },
            { title: 'Feature 3', description: 'Description of feature 3' }
          ]
        }
      }
    ],
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-20T14:45:00Z',
    publishedAt: '2023-01-20T14:45:00Z'
  },
  {
    id: 'page-2',
    title: 'About Us',
    slug: 'about',
    description: 'Learn more about our company',
    status: 'draft',
    components: [],
    createdAt: '2023-01-16T09:15:00Z',
    updatedAt: '2023-01-16T09:15:00Z'
  }
];

// Available components that can be added to pages
export const availableComponents: ComponentDefinition[] = [
  {
    id: 'hero',
    name: 'Hero Section',
    category: 'layout',
    icon: 'image',
    defaultProps: {
      title: 'Page Title',
      subtitle: 'Page subtitle text here',
      bgImage: '/placeholder.svg',
      ctaText: 'Learn More',
      ctaLink: '#'
    }
  },
  {
    id: 'text',
    name: 'Text Block',
    category: 'content',
    icon: 'file-text',
    defaultProps: {
      content: 'Enter your text here...',
      alignment: 'left'
    }
  },
  {
    id: 'image',
    name: 'Image',
    category: 'media',
    icon: 'image',
    defaultProps: {
      src: '/placeholder.svg',
      alt: 'Image description',
      width: 800,
      height: 600
    }
  },
  {
    id: 'gallery',
    name: 'Image Gallery',
    category: 'media',
    icon: 'image',
    defaultProps: {
      images: [
        { src: '/placeholder.svg', alt: 'Gallery Image 1' },
        { src: '/placeholder.svg', alt: 'Gallery Image 2' },
        { src: '/placeholder.svg', alt: 'Gallery Image 3' }
      ]
    }
  },
  {
    id: 'section',
    name: 'Content Section',
    category: 'layout',
    icon: 'layout',
    defaultProps: {
      title: 'Section Title',
      columns: 2,
      items: [
        { title: 'Item 1', description: 'Description 1' },
        { title: 'Item 2', description: 'Description 2' }
      ]
    }
  },
  {
    id: 'contact-form',
    name: 'Contact Form',
    category: 'form',
    icon: 'mail',
    defaultProps: {
      title: 'Contact Us',
      fields: ['name', 'email', 'message'],
      submitText: 'Send'
    }
  }
];
