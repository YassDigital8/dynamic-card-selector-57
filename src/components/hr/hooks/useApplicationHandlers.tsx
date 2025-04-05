
import { JobApplication } from '@/models/ApplicationModel';
import { useApplicationsData } from '@/hooks/hr/useApplicationsData';
import { useToast } from '@/hooks/use-toast';

export const useApplicationHandlers = (
  setSelectedApplication: (application: JobApplication | null) => void,
  setIsViewingApplication: (isViewing: boolean) => void
) => {
  const { applications, updateApplication } = useApplicationsData();
  const { toast } = useToast();
  
  const handleViewApplicationDetails = (application: JobApplication) => {
    setSelectedApplication(application);
    setIsViewingApplication(true);
  };
  
  const handleUpdateApplicationStatus = (application: JobApplication, newStatus: JobApplication['status']) => {
    updateApplication({ ...application, status: newStatus });
    toast({
      title: "Application Status Updated",
      description: `Status changed to ${newStatus}`,
      variant: newStatus === 'Rejected' ? "destructive" : 
               newStatus === 'Hired' ? "success" : "default",
    });
  };
  
  const handleUpdateApplicationNotes = (application: JobApplication, notes: string) => {
    updateApplication({ ...application, notes });
    toast({
      title: "Notes Updated",
      description: "Application notes have been saved",
    });
  };
  
  const handleScheduleInterview = (application: JobApplication, interviewDate: string) => {
    updateApplication({
      ...application,
      status: 'Interviewed',
      interviewDate,
      notes: application.notes ? 
        `${application.notes}\n\nInterview scheduled for ${new Date(interviewDate).toLocaleString()}` : 
        `Interview scheduled for ${new Date(interviewDate).toLocaleString()}`
    });
    toast({
      title: "Interview Scheduled",
      description: `Interview set for ${new Date(interviewDate).toLocaleString()}`,
    });
  };
  
  const handleSendOffer = (application: JobApplication, offerDetails: string) => {
    updateApplication({
      ...application,
      status: 'Offered',
      offerDetails,
      notes: application.notes ? 
        `${application.notes}\n\nOffer sent: ${offerDetails}` : 
        `Offer sent: ${offerDetails}`
    });
    toast({
      title: "Offer Sent",
      description: "Job offer has been sent to candidate",
      variant: "success",
    });
  };
  
  const handleCloseApplicationDetails = () => {
    setIsViewingApplication(false);
    setSelectedApplication(null);
  };

  return {
    applications,
    handleViewApplicationDetails,
    handleUpdateApplicationStatus,
    handleUpdateApplicationNotes,
    handleScheduleInterview,
    handleSendOffer,
    handleCloseApplicationDetails
  };
};
