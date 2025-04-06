
import React from 'react';
import { Candidate } from '@/models/ApplicationModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Check, X } from 'lucide-react';

const candidateFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  location: z.string().optional(),
  currentPosition: z.string().optional(),
  currentCompany: z.string().optional(),
  experience: z.coerce.number().min(0, { message: "Experience can't be negative." }),
  skills: z.string().transform(val => val.split(',').map(skill => skill.trim()).filter(Boolean)),
});

type CandidateFormValues = z.infer<typeof candidateFormSchema>;

interface CandidateEditFormProps {
  candidate: Candidate;
  onSave: (updatedCandidate: Candidate) => void;
  onCancel: () => void;
}

const CandidateEditForm: React.FC<CandidateEditFormProps> = ({ 
  candidate, 
  onSave, 
  onCancel 
}) => {
  const form = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateFormSchema),
    defaultValues: {
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone || '',
      location: candidate.location || '',
      currentPosition: candidate.currentPosition || '',
      currentCompany: candidate.currentCompany || '',
      experience: candidate.experience,
      skills: candidate.skills.join(', '),
    },
  });

  const onSubmit = (data: CandidateFormValues) => {
    const updatedCandidate: Candidate = {
      ...candidate,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    onSave(updatedCandidate);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Candidate: {candidate.name}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email address" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="currentPosition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Current job title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Current employer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter skills separated by commas" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter skills separated by commas (e.g. React, TypeScript, UI Design)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="mr-2 h-4 w-4" />Cancel
            </Button>
            <Button type="submit">
              <Check className="mr-2 h-4 w-4" />Save Changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CandidateEditForm;
