
import { JobApplication } from '@/models/ApplicationModel';
import { useApplicationsData } from '@/hooks/hr/useApplicationsData';

export const useApplicationProgress = () => {
  const { applications } = useApplicationsData();

  const areAllApplicationsAtSameStatus = (
    jobId: string, 
    targetStatus: JobApplication['status'],
    excludeApplicationId?: string
  ): boolean => {
    const jobApplications = applications.filter(app => 
      app.jobId === jobId && (excludeApplicationId ? app.id !== excludeApplicationId : true)
    );
    
    if (jobApplications.length === 0) return true;
    
    return jobApplications.every(app => app.status === targetStatus);
  };

  const getEarliestStatusForJob = (jobId: string): JobApplication['status'] => {
    const jobApplications = applications.filter(app => app.jobId === jobId);
    if (jobApplications.length === 0) return 'Pending';
    
    const statusOrder: JobApplication['status'][] = [
      'Pending', 'Reviewed', 'Interviewed', 'Offered', 'Hired', 'Rejected'
    ];
    
    let earliestStatusIndex = statusOrder.length - 1;
    
    jobApplications.forEach(app => {
      const appStatusIndex = statusOrder.indexOf(app.status);
      if (appStatusIndex < earliestStatusIndex) {
        earliestStatusIndex = appStatusIndex;
      }
    });
    
    return statusOrder[earliestStatusIndex];
  };

  return {
    areAllApplicationsAtSameStatus,
    getEarliestStatusForJob
  };
};
