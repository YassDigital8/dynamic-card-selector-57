
import { v4 as uuidv4 } from 'uuid';
import { CMSComponent } from './types';

interface PageTemplate {
  components: CMSComponent[];
}

interface PageTemplates {
  blank: PageTemplate;
  landing: PageTemplate;
  about: PageTemplate;
}

// Template options for new pages
export const pageTemplates: PageTemplates = {
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
