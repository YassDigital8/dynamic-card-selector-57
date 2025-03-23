
import { useState, useCallback } from 'react';

export const useUserDialog = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const openAddDialog = useCallback(() => {
    setShowAddDialog(true);
  }, []);

  const closeAddDialog = useCallback(() => {
    setShowAddDialog(false);
  }, []);

  return {
    showAddDialog,
    openAddDialog,
    closeAddDialog,
    setShowAddDialog
  };
};

export default useUserDialog;
