
import { POSEntry } from '@/models/POSModel';

export const mockPOSEntries: POSEntry[] = [
  { 
    id: 1, 
    key: 'SY', 
    englishName: 'Syria', 
    arabicName: 'سوريا', 
    createdDate: '2025-01-01', 
    createdBy: 'admin'
  },
  { 
    id: 2, 
    key: 'UAE', 
    englishName: 'United Arab Emirates', 
    arabicName: 'الإمارات العربية المتحدة', 
    createdDate: '2025-01-02', 
    createdBy: 'admin'
  },
  { 
    id: 3, 
    key: 'KSA', 
    englishName: 'Saudi Arabia', 
    arabicName: 'المملكة العربية السعودية', 
    createdDate: '2025-01-03', 
    createdBy: 'admin'
  },
];

export const fallbackPOSEntries: POSEntry[] = [
  { 
    id: 1, 
    key: 'SY', 
    englishName: 'Syria', 
    arabicName: 'سوريا', 
    createdDate: '2025-01-01', 
    createdBy: 'admin'
  },
  { 
    id: 2, 
    key: 'UAE', 
    englishName: 'United Arab Emirates', 
    arabicName: 'الإمارات العربية المتحدة', 
    createdDate: '2025-01-02', 
    createdBy: 'admin'
  },
];
