
import { useState } from 'react';
import { CmsStateReturn } from './types';
import { availableComponents } from './mockData';
import { usePageLoading } from './usePageLoading';
import { usePageOperations } from './usePageOperations';
import { useComponentOperations } from './useComponentOperations';

const useCmsState = (): CmsStateReturn => {
  const [selectedPage, setSelectedPage] = useState<CmsStateReturn['selectedPage']>(null);
  const { pages, setPages, loading, loadPages } = usePageLoading();
  const { createNewPage, selectPage, savePage, publishPage } = usePageOperations({
    pages,
    setPages,
    selectedPage,
    setSelectedPage
  });
  const { addComponentToPage, updateComponentProps, removeComponentFromPage, moveComponent } = useComponentOperations({
    selectedPage,
    setSelectedPage,
    components: availableComponents
  });

  return {
    pages,
    selectedPage,
    components: availableComponents,
    loading,
    loadPages,
    createNewPage,
    selectPage,
    addComponentToPage,
    updateComponentProps,
    removeComponentFromPage,
    moveComponent,
    savePage,
    publishPage
  };
};

export default useCmsState;
