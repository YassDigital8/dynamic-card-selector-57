
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Building,
  MapPin,
  Edit,
  Trash,
  Eye
} from 'lucide-react';
import { Candidate } from '@/models/ApplicationModel';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface CandidateCardProps {
  candidate: Candidate;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(candidate.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold cursor-pointer hover:text-primary" onClick={onView}>
              {candidate.name}
            </h3>
            <p className="text-sm text-muted-foreground">{candidate.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 pt-0 flex-grow">
        <div className="space-y-2">
          {candidate.currentPosition && (
            <div className="flex items-center text-sm">
              <Briefcase className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
              <span>{candidate.currentPosition}</span>
            </div>
          )}
          {candidate.currentCompany && (
            <div className="flex items-center text-sm">
              <Building className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
              <span>{candidate.currentCompany}</span>
            </div>
          )}
          {candidate.location && (
            <div className="flex items-center text-sm">
              <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
              <span>{candidate.location}</span>
            </div>
          )}
          <div className="flex flex-wrap gap-1 mt-2">
            {candidate.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{candidate.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="ghost" size="sm" onClick={onView}>
          <Eye className="h-4 w-4 mr-1" /> View
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={onDelete}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;
