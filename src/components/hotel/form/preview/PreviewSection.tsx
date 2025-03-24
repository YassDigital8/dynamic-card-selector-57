
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import HotelPreviewCard from './HotelPreviewCard';

const PreviewSection: React.FC = () => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Eye className="h-5 w-5" />
          Hotel Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center p-4">
          <div className="w-full max-w-md">
            <HotelPreviewCard />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviewSection;
