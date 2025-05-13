
// Define types for the CMS module
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

export type PageTemplate = 'blank' | 'landing' | 'about';

export interface CmsStateReturn {
  pages: CMSPage[];
  selectedPage: CMSPage | null;
  components: ComponentDefinition[];
  loading: boolean;
  loadPages: () => void;
  createNewPage: (title: string, slug: string, template: PageTemplate) => string;
  selectPage: (pageId: string) => void;
  addComponentToPage: (componentType: string, index?: number) => void;
  updateComponentProps: (componentId: string, props: Record<string, any>) => void;
  removeComponentFromPage: (componentId: string) => void;
  moveComponent: (componentId: string, direction: 'up' | 'down') => void;
  savePage: () => boolean;
  publishPage: (pageId: string) => boolean;
}
