
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import useAuthentication from '@/hooks/useAuthentication';
import ProfilePictureUpload from './ProfilePictureUpload';

const profileFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileForm = () => {
  const { toast } = useToast();
  const { userInfo } = useAuthentication();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: userInfo?.firstName || '',
      lastName: '',
      email: userInfo?.email || '',
      bio: '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      console.log('Profile data to update:', { ...data, profilePicture });
      
      // In a real application, you would call an API to update the user's profile
      // For now, we'll just show a success toast
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "There was a problem updating your profile",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 pb-6 border-b">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profilePicture || undefined} alt={userInfo?.firstName || 'User'} />
                <AvatarFallback className="text-xl">
                  {userInfo?.firstName?.charAt(0) || userInfo?.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <ProfilePictureUpload onImageUploaded={setProfilePicture} />
            </div>
            <div className="flex flex-col w-full sm:pt-2">
              <h3 className="text-lg font-medium">{userInfo?.firstName || userInfo?.email}</h3>
              {userInfo?.role && (
                <span className="text-sm text-muted-foreground">{userInfo.role}</span>
              )}
              <p className="text-sm text-muted-foreground mt-1">{userInfo?.email}</p>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us a little about yourself"
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
