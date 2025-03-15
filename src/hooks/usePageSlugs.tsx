
import { usePageSlugsViewModel } from '../viewmodels/PageSlugsViewModel';

export function usePageSlugs(props: Parameters<typeof usePageSlugsViewModel>[0]) {
  return usePageSlugsViewModel(props);
}
