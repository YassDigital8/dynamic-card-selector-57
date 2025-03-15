
import { usePageSelectionViewModel } from '../viewmodels/PageSelectionViewModel';
import { SelectionStep } from '../models/PageModel';

// Re-export the SelectionStep type for backward compatibility
export type { SelectionStep };

export function usePageSelections() {
  return usePageSelectionViewModel();
}
