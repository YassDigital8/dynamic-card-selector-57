
import { JobApplication } from '@/models/ApplicationModel';
import { toast } from 'sonner';

export const useApplicationStatus = () => {
  const isValidStatusTransition = (
    currentStatus: JobApplication['status'], 
    newStatus: JobApplication['status']
  ): boolean => {
    if (currentStatus === newStatus) return true;
    
    switch (currentStatus) {
      case 'Pending':
        return ['Reviewed', 'Rejected'].includes(newStatus);
      case 'Reviewed':
        return ['Interviewed', 'Rejected'].includes(newStatus);
      case 'Interviewed':
        return ['Offered', 'Rejected'].includes(newStatus);
      case 'Offered':
        return ['Hired', 'Rejected'].includes(newStatus);
      case 'Rejected':
        return ['Pending'].includes(newStatus);
      case 'Hired':
        return false;
      default:
        return false;
    }
  };

  return { isValidStatusTransition };
};
