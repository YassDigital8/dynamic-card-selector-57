
import React from 'react';
import { Candidate } from '@/models/ApplicationModel';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface CandidateEditFormProps {
  candidate: Candidate;
  onSave: (candidate: Candidate) => void;
  onCancel: () => void;
}

const CandidateEditForm: React.FC<CandidateEditFormProps> = ({
  candidate,
  onSave,
  onCancel,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      ...candidate,
      skills: candidate.skills.join(', ') // Convert array to comma-separated string for editing
    }
  });

  const onSubmit = (data: any) => {
    // Convert comma-separated skills back to array before saving
    const skillsArray = data.skills.split(',').map((skill: string) => skill.trim()).filter(Boolean);
    
    onSave({
      ...candidate,
      ...data,
      skills: skillsArray
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onCancel} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Edit Candidate Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...register('name', { required: true })} />
              {errors.name && <p className="text-sm text-destructive">Name is required</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email', { required: true })} />
              {errors.email && <p className="text-sm text-destructive">Email is required</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register('phone')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register('location')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentPosition">Current Position</Label>
              <Input id="currentPosition" {...register('currentPosition')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentCompany">Current Company</Label>
              <Input id="currentCompany" {...register('currentCompany')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience (years)</Label>
              <Input 
                id="experience" 
                type="number" 
                {...register('experience', { 
                  valueAsNumber: true,
                  min: { value: 0, message: "Experience cannot be negative" }
                })} 
              />
              {errors.experience && (
                <p className="text-sm text-destructive">{errors.experience.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Textarea id="skills" {...register('skills')} />
              <p className="text-xs text-muted-foreground">Enter skills separated by commas (e.g., JavaScript, React, TypeScript)</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default CandidateEditForm;
