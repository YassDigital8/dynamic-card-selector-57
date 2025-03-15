
import { usePageDataViewModel } from '../viewmodels/PageDataViewModel';

export function usePageData(props: Parameters<typeof usePageDataViewModel>[0]) {
  return usePageDataViewModel(props);
}
