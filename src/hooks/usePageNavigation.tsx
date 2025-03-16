
import { usePageNavigationViewModel } from '../viewmodels/PageNavigationViewModel';

interface UsePageNavigationProps {
  authToken?: string;
}

const usePageNavigation = (props: UsePageNavigationProps = {}) => {
  return usePageNavigationViewModel(props);
};

export default usePageNavigation;
