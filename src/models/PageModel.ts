
// Models represent the core data structures used in the application

export interface PageData {
  id?: number;
  title: string;
  content: string;
  lastUpdated: string;
  status: string;
  description?: string;
}

export interface PageSelectionModel {
  pos: string;
  language: string;
  slug?: string;
  subSlug?: string;
}

export type SelectionStep = 'pos' | 'language' | 'options';
