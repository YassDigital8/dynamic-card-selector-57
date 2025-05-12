
import React, { useState } from 'react';
import { CMSComponent, ComponentDefinition } from '@/hooks/cms/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import CTALinkInput from './CTALinkInput';
import useCmsState from '@/hooks/cms/useCmsState';

interface ComponentEditorProps {
  component: CMSComponent;
  componentDefinition?: ComponentDefinition;
  onUpdate: (props: Record<string, any>) => void;
}

const ComponentEditor: React.FC<ComponentEditorProps> = ({
  component,
  componentDefinition,
  onUpdate
}) => {
  const [localProps, setLocalProps] = useState({ ...component.props });
  const { pages } = useCmsState();
  
  const handleChange = (key: string, value: any) => {
    setLocalProps(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Update component props in parent
    onUpdate({ [key]: value });
  };
  
  // Render different inputs based on the property type
  const renderPropertyInput = (key: string, value: any) => {
    // Special case for CTA links in hero components
    if (component.type === 'hero' && key === 'ctaLink') {
      return (
        <div key={key} className="mb-4">
          <CTALinkInput
            value={localProps[key] || ''}
            onChange={(value) => handleChange(key, value)}
            pages={Array.isArray(pages) ? pages : []}
          />
        </div>
      );
    }
    
    // Determine type based on the value
    if (typeof value === 'string') {
      if (value.length > 50) {
        return (
          <div key={key} className="mb-4">
            <Label htmlFor={key} className="block mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </Label>
            <Textarea
              id={key}
              value={localProps[key]}
              onChange={e => handleChange(key, e.target.value)}
              className="w-full"
              rows={4}
            />
          </div>
        );
      } else {
        return (
          <div key={key} className="mb-4">
            <Label htmlFor={key} className="block mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </Label>
            <Input
              id={key}
              value={localProps[key]}
              onChange={e => handleChange(key, e.target.value)}
              className="w-full"
            />
          </div>
        );
      }
    } else if (typeof value === 'number') {
      return (
        <div key={key} className="mb-4">
          <Label htmlFor={key} className="block mb-1 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </Label>
          <Input
            id={key}
            type="number"
            value={localProps[key]}
            onChange={e => handleChange(key, parseInt(e.target.value) || 0)}
            className="w-full"
          />
        </div>
      );
    } else if (typeof value === 'boolean') {
      return (
        <div key={key} className="mb-4 flex items-center justify-between">
          <Label htmlFor={key} className="capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </Label>
          <Switch
            id={key}
            checked={localProps[key]}
            onCheckedChange={checked => handleChange(key, checked)}
          />
        </div>
      );
    } else if (Array.isArray(value)) {
      if (typeof value[0] === 'string') {
        return (
          <div key={key} className="mb-4">
            <Label htmlFor={key} className="block mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()} (comma separated)
            </Label>
            <Input
              id={key}
              value={localProps[key].join(', ')}
              onChange={e => handleChange(key, e.target.value.split(', '))}
              className="w-full"
            />
          </div>
        );
      } else {
        // Complex array handling (objects)
        return (
          <div key={key} className="mb-4">
            <Label className="block mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()} ({value.length} items)
            </Label>
            <div className="border p-3 rounded-md bg-slate-50">
              <p className="text-xs text-slate-500 mb-2">
                Array of objects. Complex editing not yet implemented.
              </p>
              {value.map((item: any, index: number) => (
                <div key={index} className="text-xs border-b pb-1 mb-1">
                  {Object.entries(item).map(([k, v]) => (
                    <div key={k} className="flex">
                      <span className="font-medium mr-1">{k}:</span>
                      <span className="truncate">{String(v)}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
    
    // Default case
    return (
      <div key={key} className="mb-4">
        <Label htmlFor={key} className="block mb-1 capitalize">
          {key.replace(/([A-Z])/g, ' $1').trim()} (unable to edit)
        </Label>
        <Input
          id={key}
          value={JSON.stringify(localProps[key])}
          disabled
          className="w-full"
        />
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium">{componentDefinition?.name || component.type}</h3>
      <p className="text-xs text-slate-500">Edit the properties of this component</p>
      
      <div className="space-y-2">
        {Object.entries(localProps).map(([key, value]) => 
          renderPropertyInput(key, value)
        )}
      </div>
    </div>
  );
};

export default ComponentEditor;
