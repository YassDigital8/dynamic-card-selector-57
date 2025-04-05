
import React from 'react';
import { CheckCircle2, CircleAlert } from 'lucide-react';
import { JobPosition } from '@/models/JobModel';

interface JobDescriptionProps {
  job: JobPosition;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ job }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
        <p className="whitespace-pre-line">{job.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Requirements</h3>
        <ul className="list-disc pl-5 space-y-1">
          {job.requirements.map((req, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
        <ul className="list-disc pl-5 space-y-1">
          {job.responsibilities.map((resp, index) => (
            <li key={index} className="flex items-start">
              <CircleAlert className="h-5 w-5 mr-2 text-blue-500 shrink-0 mt-0.5" />
              <span>{resp}</span>
            </li>
          ))}
        </ul>
      </div>

      {job.salary && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Salary Range</h3>
          <p>
            {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} per year
          </p>
        </div>
      )}
    </div>
  );
};

export default JobDescription;
