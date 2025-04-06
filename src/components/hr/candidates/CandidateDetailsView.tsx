
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, Trash, Mail, Phone, MapPin, Briefcase, Building } from 'lucide-react';

interface CandidateDetailsViewProps {
  candidate: Candidate;
  onEdit: () => void;
  onBack: () => void;
  onDelete: () => void;
}

const CandidateDetailsView: React.FC<CandidateDetailsViewProps> = ({
  candidate,
  onEdit,
  onBack,
  onDelete,
}) => {
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to candidates
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {getInitials(candidate.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">{candidate.name}</CardTitle>
              <div className="flex items-center mt-1 text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                {candidate.email}
              </div>
              {candidate.phone && (
                <div className="flex items-center mt-1 text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  {candidate.phone}
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Employment Information</h3>
              <Separator />
              
              {candidate.currentPosition && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Current Position</p>
                    <p className="font-medium">{candidate.currentPosition}</p>
                  </div>
                </div>
              )}
              
              {candidate.currentCompany && (
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Current Company</p>
                    <p className="font-medium">{candidate.currentCompany}</p>
                  </div>
                </div>
              )}
              
              {candidate.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{candidate.location}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium">{candidate.experience} years</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Skills</h3>
              <Separator />
              
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p>{new Date(candidate.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p>{new Date(candidate.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end border-t pt-6">
          <Button onClick={onBack}>Close</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CandidateDetailsView;
