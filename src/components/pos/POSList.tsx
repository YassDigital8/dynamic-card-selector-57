
import React from 'react';
import { POSEntry } from '@/models/POSModel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Flag, Trash } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface POSListProps {
  posEntries: POSEntry[];
  isLoading: boolean;
  error: string | null;
  onDelete: (key: string) => void;
}

const POSList: React.FC<POSListProps> = ({ posEntries, isLoading, error, onDelete }) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <span className="ml-2">Loading POS data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading POS data: {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold flex items-center">
          <Flag className="mr-2 h-6 w-6" />
          Point of Service Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {posEntries.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No POS entries found. Add a new POS location to get started.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>English Name</TableHead>
                <TableHead>Arabic Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posEntries.map((entry) => (
                <TableRow key={entry.key} className="group">
                  <TableCell>
                    <Badge variant="outline">{entry.key}</Badge>
                  </TableCell>
                  <TableCell>{entry.englishName}</TableCell>
                  <TableCell className="font-arabic">{entry.arabicName}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDelete(entry.key)}
                      disabled
                      title="Delete functionality is currently disabled"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default POSList;
