
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

// Types for the CMS module
export interface CMSComponent {
  id: string;
  type: string;
  props: Record<string, any>;
}

export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  description?: string;
  status: 'draft' | 'published';
  components: CMSComponent[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface ComponentDefinition {
  id: string;
  name: string;
  category: 'layout' | 'content' | 'media' | 'form';
  icon: string;
  defaultProps: Record<string, any>;
}

// Mock data for initial development
const mockPages: CMSPage[] = [
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
const availableComponents: ComponentDefinition[] = [
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

// Template options for new pages
const pageTemplates = {
  blank: {
    components: []
  },
  landing: {
    components: [
      {
        id: uuidv4(),
        type: 'hero',
        props: {
          title: 'Welcome to Our Site',
          subtitle: 'Discover amazing things with us',
          bgImage: '/placeholder.svg',
          ctaText: 'Learn More',
          ctaLink: '#'
        }
      },
      {
        id: uuidv4(),
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
    ]
  },
  about: {
    components: [
      {
        id: uuidv4(),
        type: 'hero',
        props: {
          title: 'About Us',
          subtitle: 'Learn more about our company',
          bgImage: '/placeholder.svg',
          ctaText: '',
          ctaLink: ''
        }
      },
      {
        id: uuidv4(),
        type: 'text',
        props: {
          content: 'Our company was founded with a simple mission: to provide the best service to our customers.',
          alignment: 'center'
        }
      }
    ]
  }
};

const useCmsState = () => {
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<CMSPage | null>(null);
  const [components] = useState<ComponentDefinition[]>(availableComponents);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Load pages from mock data (would be replaced with API call)
  const loadPages = useCallback(() => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setPages(mockPages);
      setLoading(false);
    }, 800);
  }, []);

  // Load pages on initial render
  useEffect(() => {
    loadPages();
  }, [loadPages]);

  // Create a new page
  const createNewPage = useCallback((title: string, slug: string, template: 'blank' | 'landing' | 'about' = 'blank') => {
    const now = new Date().toISOString();
    const newPageId = `page-${uuidv4()}`;
    
    const newPage: CMSPage = {
      id: newPageId,
      title,
      slug,
      status: 'draft',
      components: [...pageTemplates[template].components],
      createdAt: now,
      updatedAt: now,
    };
    
    setPages(prevPages => [...prevPages, newPage]);
    return newPageId;
  }, []);

  // Select a page by ID
  const selectPage = useCallback((pageId: string) => {
    const page = pages.find(p => p.id === pageId);
    setSelectedPage(page || null);
    
    if (!page) {
      toast({
        variant: "destructive",
        title: "Page not found",
        description: `The requested page could not be found.`
      });
    }
  }, [pages, toast]);

  // Add a component to the selected page
  const addComponentToPage = useCallback((componentType: string, index?: number) => {
    if (!selectedPage) return;
    
    const componentDef = components.find(c => c.id === componentType);
    if (!componentDef) return;
    
    const newComponent: CMSComponent = {
      id: `${componentType}-${uuidv4()}`,
      type: componentType,
      props: { ...componentDef.defaultProps }
    };
    
    setSelectedPage(prevPage => {
      if (!prevPage) return null;
      
      const updatedComponents = [...prevPage.components];
      if (index !== undefined) {
        updatedComponents.splice(index, 0, newComponent);
      } else {
        updatedComponents.push(newComponent);
      }
      
      return {
        ...prevPage,
        components: updatedComponents,
        updatedAt: new Date().toISOString()
      };
    });
  }, [selectedPage, components]);

  // Update a component's properties
  const updateComponentProps = useCallback((componentId: string, props: Record<string, any>) => {
    if (!selectedPage) return;
    
    setSelectedPage(prevPage => {
      if (!prevPage) return null;
      
      const updatedComponents = prevPage.components.map(comp => 
        comp.id === componentId ? { ...comp, props: { ...comp.props, ...props } } : comp
      );
      
      return {
        ...prevPage,
        components: updatedComponents,
        updatedAt: new Date().toISOString()
      };
    });
  }, [selectedPage]);

  // Remove a component from the page
  const removeComponentFromPage = useCallback((componentId: string) => {
    if (!selectedPage) return;
    
    setSelectedPage(prevPage => {
      if (!prevPage) return null;
      
      const updatedComponents = prevPage.components.filter(comp => comp.id !== componentId);
      
      return {
        ...prevPage,
        components: updatedComponents,
        updatedAt: new Date().toISOString()
      };
    });
  }, [selectedPage]);

  // Move a component up or down in the page
  const moveComponent = useCallback((componentId: string, direction: 'up' | 'down') => {
    if (!selectedPage) return;
    
    setSelectedPage(prevPage => {
      if (!prevPage) return null;
      
      const components = [...prevPage.components];
      const index = components.findIndex(c => c.id === componentId);
      
      if (index === -1) return prevPage;
      
      if (direction === 'up' && index > 0) {
        // Swap with the previous component
        [components[index], components[index - 1]] = [components[index - 1], components[index]];
      } else if (direction === 'down' && index < components.length - 1) {
        // Swap with the next component
        [components[index], components[index + 1]] = [components[index + 1], components[index]];
      }
      
      return {
        ...prevPage,
        components,
        updatedAt: new Date().toISOString()
      };
    });
  }, [selectedPage]);

  // Save the page changes
  const savePage = useCallback(() => {
    if (!selectedPage) return false;
    
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === selectedPage.id ? { ...selectedPage, updatedAt: new Date().toISOString() } : page
      )
    );
    
    return true;
  }, [selectedPage]);

  // Publish the page
  const publishPage = useCallback((pageId: string) => {
    const pageToPublish = pages.find(p => p.id === pageId);
    if (!pageToPublish) return false;
    
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === pageId 
          ? { 
              ...page, 
              status: 'published', 
              publishedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            } 
          : page
      )
    );
    
    if (selectedPage?.id === pageId) {
      setSelectedPage(prev => 
        prev ? { 
          ...prev, 
          status: 'published', 
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } : null
      );
    }
    
    return true;
  }, [pages, selectedPage]);

  return {
    pages,
    selectedPage,
    components,
    loading,
    loadPages,
    createNewPage,
    selectPage,
    addComponentToPage,
    updateComponentProps,
    removeComponentFromPage,
    moveComponent,
    savePage,
    publishPage
  };
};

export default useCmsState;
