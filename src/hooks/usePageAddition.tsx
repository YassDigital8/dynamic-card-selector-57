
import { usePageAdditionViewModel, AddPageFormValues } from '../viewmodels/PageAdditionViewModel';

// Re-export the type for backward compatibility
export type { AddPageFormValues };

const usePageAddition = (props: Parameters<typeof usePageAdditionViewModel>[0] = {}) => {
  return usePageAdditionViewModel(props);
};

export default usePageAddition;
