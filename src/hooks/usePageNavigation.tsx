
import { usePageNavigationViewModel } from '../viewmodels/PageNavigationViewModel';
import { toast } from './use-toast';

interface UsePageNavigationProps {
  authToken?: string;
}

const usePageNavigation = (props: UsePageNavigationProps = {}) => {
  const viewModel = usePageNavigationViewModel(props);
  
  // Show toast notifications for API errors
  if (viewModel.error) {
    toast({
      title: "API Connection Error",
      description: viewModel.error,
      variant: "destructive",
    });
  }
  
  return viewModel;
};

export default usePageNavigation;
