
export interface POSEntry {
  id?: number;
  key: string;
  arabicName: string;
  englishName: string;
  createdDate?: string;
  createdBy?: string;
  modifiedDate?: string | null;
  modifiedBy?: string | null;
  gsa?: GSADetails;
}

export interface GSADetails {
  name: string;
  location: string;
  phoneNumber: string;
  email: string;
  officeHours: string;
}
