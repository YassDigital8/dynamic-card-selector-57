
import React from 'react';
import { ComponentDefinition } from '@/hooks/cms/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Layout, 
  FileText, 
  Image, 
  Grid, 
  Mail, 
  PlusCircle,
  Columns,
  Heading,
  ListOrdered,
  MapPin,
  MessageCircle,
  Video
} from 'lucide-react';

interface ComponentListProps {
  components: ComponentDefinition[];
  onAddComponent: (componentType: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'hero': <Layout className="h-4 w-4" />,
  'section': <Grid className="h-4 w-4" />,
  'text': <FileText className="h-4 w-4" />,
  'image': <Image className="h-4 w-4" />,
  'gallery': <Columns className="h-4 w-4" />,
  'contact-form': <Mail className="h-4 w-4" />,
  'heading': <Heading className="h-4 w-4" />,
  'list': <ListOrdered className="h-4 w-4" />,
  'map': <MapPin className="h-4 w-4" />,
  'testimonial': <MessageCircle className="h-4 w-4" />,
  'video': <Video className="h-4 w-4" />
};

const ComponentItem = ({ component, onAdd }: { component: ComponentDefinition, onAdd: () => void }) => {
  const icon = iconMap[component.id] || <Layout className="h-4 w-4" />;
  
  return (
    <div 
      className="flex items-center justify-between p-2 border border-slate-200 rounded bg-white mb-2 hover:border-blue-300 hover:bg-blue-50 cursor-grab"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('componentType', component.id);
      }}
    >
      <div className="flex items-center gap-2">
        <div className="text-slate-600">
          {icon}
        </div>
        <span className="text-sm font-medium">{component.name}</span>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6"
        onClick={onAdd}
      >
        <PlusCircle className="h-4 w-4" />
      </Button>
    </div>
  );
};

const ComponentList: React.FC<ComponentListProps> = ({ components, onAddComponent }) => {
  // Group components by category
  const categories = components.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, ComponentDefinition[]>);
  
  return (
    <div className="space-y-4">
      {Object.entries(categories).map(([category, categoryComponents]) => (
        <div key={category}>
          <h3 className="text-sm uppercase font-medium text-slate-600 mb-2">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h3>
          <div>
            {categoryComponents.map(component => (
              <ComponentItem 
                key={component.id}
                component={component}
                onAdd={() => onAddComponent(component.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComponentList;
