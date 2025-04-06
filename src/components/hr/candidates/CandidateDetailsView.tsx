import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Trash, 
  Mail, 
  Phone, 
  Briefcase, 
  Building, 
  MapPin, 
  Calendar, 
  GraduationCap
} from 'lucide-react';
import { Candidate } from '@/models/ApplicationModel';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

interface CandidateDetailsViewProps {
  candidate: Candidate;
  onBack: () => void;
  onDelete: () => void;
}

const CandidateDetailsView: React.FC<CandidateDetailsViewProps> = ({
  candidate,
  onBack,
  onDelete
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Button 
              variant="ghost" 
              className="mb-2 -ml-4 flex items-center gap-1 text-muted-foreground" 
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Candidates
            </Button>
            <CardTitle className="text-2xl font-bold">{candidate.name}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>Email: {candidate.email}</span>
          </div>
          {candidate.phone && (
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Phone: {candidate.phone}</span>
            </div>
          )}
          {candidate.currentPosition && (
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Current Position: {candidate.currentPosition}</span>
            </div>
          )}
          {candidate.currentCompany && (
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Current Company: {candidate.currentCompany}</span>
            </div>
          )}
          {candidate.location && (
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Location: {candidate.location}</span>
            </div>
          )}
          {candidate.experience !== undefined && (
            <div className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Experience: {candidate.experience} years</span>
            </div>
          )}
          <div className="flex items-center md:col-span-2">
            <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>
              In system since: {format(new Date(candidate.createdAt), 'MMMM dd, yyyy')}
            </span>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* More candidate sections can be added here as needed */}
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={onDelete} variant="destructive" className="flex items-center gap-2" disabled>
          <Trash className="h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CandidateDetailsView;
