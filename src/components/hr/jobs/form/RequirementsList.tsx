
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react';

interface RequirementsListProps {
  requirements: string[];
  onChange: (requirements: string[]) => void;
}

const RequirementsList: React.FC<RequirementsListProps> = ({ requirements, onChange }) => {
  const addRequirement = () => {
    onChange([...requirements, '']);
  };

  const removeRequirement = (index: number) => {
    const newRequirements = [...requirements];
    newRequirements.splice(index, 1);
    onChange(newRequirements);
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    onChange(newRequirements);
  };

  return (
    <div className="space-y-2">
      {requirements.map((req, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={req}
            onChange={(e) => updateRequirement(index, e.target.value)}
            placeholder="Bachelor's degree in Computer Science"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => removeRequirement(index)}
            disabled={requirements.length <= 1}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addRequirement}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Requirement
      </Button>
    </div>
  );
};

export default RequirementsList;
