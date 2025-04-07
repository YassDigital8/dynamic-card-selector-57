
import React, { useState } from 'react';
import { Branch } from '@/models/BranchModel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Building, Trash, MapPin, Phone, Mail, Clock, User } from 'lucide-react';

interface BranchListProps {
  branches: Branch[];
  isLoading: boolean;
  error: string | null;
  onDelete: (id: number) => void;
}

const BranchList: React.FC<BranchListProps> = ({ branches, isLoading, error, onDelete }) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <span className="ml-2">Loading branches...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading branches: {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold flex items-center">
          <Building className="mr-2 h-6 w-6" />
          Branch Offices
        </CardTitle>
      </CardHeader>
      <CardContent>
        {branches.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No branches found. Add a new branch to get started.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Office Hours</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-gray-500" />
                      {branch.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                      {branch.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm">
                        <Phone className="mr-2 h-4 w-4 text-gray-500" />
                        {branch.phoneNumber}
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4 text-gray-500" />
                        {branch.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      {branch.officeHours}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDelete(branch.id!)}
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

export default BranchList;
