
export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary' | 'Internship';
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedDate: string;
  closingDate: string;
  status: 'Open' | 'Closed' | 'Draft';
  applications?: number;
  contactEmail?: string;
}

export interface JobFormData extends Omit<JobPosition, 'id' | 'postedDate' | 'applications'> {
  id?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
}

export interface JobLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  isRemote: boolean;
}
