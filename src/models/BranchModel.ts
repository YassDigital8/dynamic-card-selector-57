
export interface Branch {
  id?: number;
  name: string;
  location: string;
  phoneNumber: string;
  email: string;
  officeHours: string;
  createdDate?: string;
  createdBy?: string;
  modifiedDate?: string | null;
  modifiedBy?: string | null;
}
