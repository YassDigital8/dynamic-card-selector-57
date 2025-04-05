
import { JobApplication } from '@/models/ApplicationModel';
import { useApplicationsData } from '@/hooks/hr/useApplicationsData';

export const useApplicationHandlers = (
  setSelectedApplication: (application: JobApplication | null) => void,
  setIsViewingApplication: (isViewing: boolean) => void
) => {
  const { applications, updateApplication } = useApplicationsData();

  const handleViewApplicationDetails = (application: JobApplication) => {
    setSelectedApplication(application);
    setIsViewingApplication(true);
  };
  
  const handleUpdateApplicationStatus = (application: JobApplication, newStatus: JobApplication['status']) => {
    updateApplication({ ...application, status: newStatus });
  };
  
  const handleCloseApplicationDetails = () => {
    setIsViewingApplication(false);
    setSelectedApplication(null);
  };

  return {
    applications,
    handleViewApplicationDetails,
    handleUpdateApplicationStatus,
    handleCloseApplicationDetails
  };
};
