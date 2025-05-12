
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CMSComponent, CMSPage, ComponentDefinition } from './types';

export function useComponentOperations(
  selectedPage: CMSPage | null, 
  setSelectedPage: (page: CMSPage | null) => void,
  availableComponents: ComponentDefinition[]
) {
  // Add a component to the selected page
  const addComponentToPage = useCallback((componentType: string, index?: number) => {
    if (!selectedPage) return;
    
    const componentDef = availableComponents.find(c => c.id === componentType);
    if (!componentDef) return;
    
    const newComponent: CMSComponent = {
      id: `${componentType}-${uuidv4()}`,
      type: componentType,
      props: { ...componentDef.defaultProps }
    };
    
    setSelectedPage(prevPage => {
      if (!prevPage) return null;
      
      const updatedComponents = [...prevPage.components];
      if (index !== undefined) {
        updatedComponents.splice(index, 0, newComponent);
      } else {
        updatedComponents.push(newComponent);
      }
      
      return {
        ...prevPage,
        components: updatedComponents,
        updatedAt: new Date().toISOString()
      };
    });
  }, [selectedPage, availableComponents, setSelectedPage]);

  // Update a component's properties
  const updateComponentProps = useCallback((componentId: string, props: Record<string, any>) => {
    if (!selectedPage) return;
    
    setSelectedPage(prevPage => {
      if (!prevPage) return null;
      
      const updatedComponents = prevPage.components.map(comp => 
        comp.id === componentId ? { ...comp, props: { ...comp.props, ...props } } : comp
      );
      
      return {
        ...prevPage,
        components: updatedComponents,
        updatedAt: new Date().toISOString()
      };
    });
  }, [selectedPage, setSelectedPage]);

  // Remove a component from the page
  const removeComponentFromPage = useCallback((componentId: string) => {
    if (!selectedPage) return;
    
    setSelectedPage(prevPage => {
      if (!prevPage) return null;
      
      const updatedComponents = prevPage.components.filter(comp => comp.id !== componentId);
      
      return {
        ...prevPage,
        components: updatedComponents,
        updatedAt: new Date().toISOString()
      };
    });
  }, [selectedPage, setSelectedPage]);

  // Move a component up or down in the page
  const moveComponent = useCallback((componentId: string, direction: 'up' | 'down') => {
    if (!selectedPage) return;
    
    setSelectedPage(prevPage => {
      if (!prevPage) return null;
      
      const components = [...prevPage.components];
      const index = components.findIndex(c => c.id === componentId);
      
      if (index === -1) return prevPage;
      
      if (direction === 'up' && index > 0) {
        // Swap with the previous component
        [components[index], components[index - 1]] = [components[index - 1], components[index]];
      } else if (direction === 'down' && index < components.length - 1) {
        // Swap with the next component
        [components[index], components[index + 1]] = [components[index + 1], components[index]];
      }
      
      return {
        ...prevPage,
        components,
        updatedAt: new Date().toISOString()
      };
    });
  }, [selectedPage, setSelectedPage]);
  
  return {
    addComponentToPage,
    updateComponentProps,
    removeComponentFromPage,
    moveComponent
  };
}
