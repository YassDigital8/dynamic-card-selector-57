
import React, { useState } from 'react';
import { CMSComponent } from '@/hooks/cms/useCmsState';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowDown, ArrowUp, Trash, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import RenderComponent from '../render/RenderComponent';

interface PageCanvasProps {
  components: CMSComponent[];
  onSelectComponent: (id: string | null) => void;
  selectedComponentId: string | null;
  onRemoveComponent: (id: string) => void;
  onMoveComponent: (id: string, direction: 'up' | 'down') => void;
}

const PageCanvas: React.FC<PageCanvasProps> = ({
  components,
  onSelectComponent,
  selectedComponentId,
  onRemoveComponent,
  onMoveComponent
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('componentType');
    if (componentType) {
      // Handle the drop logic
      console.log('Dropped component type:', componentType);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  if (components.length === 0) {
    return (
      <div 
        className="h-full flex items-center justify-center border-2 border-dashed border-slate-300 rounded-lg"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="text-center text-slate-500 p-10">
          <p className="text-lg font-medium mb-2">Drop components here</p>
          <p className="text-sm">
            Drag components from the sidebar or use the Add Component button to build your page.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {components.map((component, index) => (
        <div
          key={component.id}
          className={cn(
            "relative border-2 rounded-lg",
            selectedComponentId === component.id ? 
              "border-blue-500" : 
              hoveredId === component.id ? 
                "border-blue-300" : "border-transparent"
          )}
          onMouseEnter={() => setHoveredId(component.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onSelectComponent(component.id)}
        >
          <div className="p-4 relative">
            <RenderComponent component={component} />
          </div>
          
          {/* Component Controls */}
          {(selectedComponentId === component.id || hoveredId === component.id) && (
            <div className="absolute top-2 right-2 bg-white border border-gray-200 rounded shadow-sm flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-slate-100"
                onClick={() => onSelectComponent(component.id)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-slate-100"
                onClick={() => onMoveComponent(component.id, 'up')}
                disabled={index === 0}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-slate-100"
                onClick={() => onMoveComponent(component.id, 'down')}
                disabled={index === components.length - 1}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-red-100 text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveComponent(component.id);
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {/* Component Label */}
          {(selectedComponentId === component.id || hoveredId === component.id) && (
            <div className="absolute top-2 left-2 bg-white bg-opacity-80 border border-gray-200 text-xs px-2 py-1 rounded">
              {component.type}
            </div>
          )}
        </div>
      ))}
      
      <div 
        className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex items-center justify-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p className="text-slate-500 text-sm">
          Drop a component here to add it to the end of the page
        </p>
      </div>
    </div>
  );
};

export default PageCanvas;
