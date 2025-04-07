
import React, { useState } from 'react';
import { POSEntry } from '@/models/POSModel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Flag, Trash, ChevronDown, ChevronUp, MapPin, Phone, Mail, Clock, User } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface POSListProps {
  posEntries: POSEntry[];
  isLoading: boolean;
  error: string | null;
  onDelete: (key: string) => void;
}

const POSList: React.FC<POSListProps> = ({ posEntries, isLoading, error, onDelete }) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (key: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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
                <TableHead></TableHead>
                <TableHead>Key</TableHead>
                <TableHead>English Name</TableHead>
                <TableHead>Arabic Name</TableHead>
                <TableHead>GSA Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posEntries.map((entry) => (
                <React.Fragment key={entry.key}>
                  <TableRow className="group">
                    <TableCell>
                      {entry.gsa && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => toggleRow(entry.key)}
                        >
                          {expandedRows[entry.key] ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{entry.key}</Badge>
                    </TableCell>
                    <TableCell>{entry.englishName}</TableCell>
                    <TableCell className="font-arabic">{entry.arabicName}</TableCell>
                    <TableCell>
                      {entry.gsa ? (
                        <Badge variant="success" className="bg-green-100 text-green-800">
                          GSA Available
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100">
                          No GSA
                        </Badge>
                      )}
                    </TableCell>
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
                  
                  {entry.gsa && (
                    <TableRow className={!expandedRows[entry.key] ? "hidden" : ""}>
                      <TableCell colSpan={6} className="p-0">
                        <Collapsible open={expandedRows[entry.key]}>
                          <CollapsibleContent className="px-4 pb-4">
                            <div className="rounded-md bg-slate-50 p-3 mt-1 space-y-3">
                              <h4 className="font-medium text-sm">GSA Information</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex items-center text-sm">
                                  <User className="mr-2 h-4 w-4 text-gray-500" />
                                  <span className="text-gray-700">{entry.gsa.name}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                                  <span className="text-gray-700">{entry.gsa.location}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Phone className="mr-2 h-4 w-4 text-gray-500" />
                                  <span className="text-gray-700">{entry.gsa.phoneNumber}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Mail className="mr-2 h-4 w-4 text-gray-500" />
                                  <span className="text-gray-700">{entry.gsa.email}</span>
                                </div>
                                <div className="flex items-start text-sm col-span-1 md:col-span-2">
                                  <Clock className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                                  <span className="text-gray-700">{entry.gsa.officeHours}</span>
                                </div>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default POSList;
