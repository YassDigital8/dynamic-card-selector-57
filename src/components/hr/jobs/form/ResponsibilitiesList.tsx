
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react';

interface ResponsibilitiesListProps {
  responsibilities: string[];
  onChange: (responsibilities: string[]) => void;
}

const ResponsibilitiesList: React.FC<ResponsibilitiesListProps> = ({ responsibilities, onChange }) => {
  const addResponsibility = () => {
    onChange([...responsibilities, '']);
  };

  const removeResponsibility = (index: number) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities.splice(index, 1);
    onChange(newResponsibilities);
  };

  const updateResponsibility = (index: number, value: string) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index] = value;
    onChange(newResponsibilities);
  };

  return (
    <div className="space-y-2">
      {responsibilities.map((resp, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={resp}
            onChange={(e) => updateResponsibility(index, e.target.value)}
            placeholder="Develop and maintain web applications"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => removeResponsibility(index)}
            disabled={responsibilities.length <= 1}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addResponsibility}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Responsibility
      </Button>
    </div>
  );
};

export default ResponsibilitiesList;
