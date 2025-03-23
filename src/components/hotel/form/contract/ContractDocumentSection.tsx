
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useFieldArray } from 'react-hook-form';
import FileUploader from './FileUploader';
import ContractDetailsForm from './ContractDetailsForm';
import ContractDocumentList from './ContractDocumentList';

const ContractDocumentSection = () => {
  const form = useFormContext();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contractDocuments"
  });

  const handleFileUpload = (description: string) => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a PDF file to upload."
      });
      return;
    }
    
    // Get start and end dates from form
    const startDate = form.getValues("newContractStartDate") || '';
    const endDate = form.getValues("newContractEndDate") || '';
    
    // In a real application, you would upload the file to storage here
    // For now, we'll simulate a successful upload by creating a URL
    const simulatedUrl = `https://example.com/storage/${Date.now()}-${selectedFile.name}`;
    
    append({
      id: `contract-${Date.now()}`,
      url: simulatedUrl,
      fileName: selectedFile.name,
      uploadedAt: new Date().toISOString(),
      description: description,
      startDate: startDate,
      endDate: endDate
    });
    
    // Reset form state
    resetFormState();
    
    toast({
      title: "Contract uploaded",
      description: "Contract document has been successfully added."
    });
  };

  const resetFormState = () => {
    // Reset file input and selected file
    setSelectedFile(null);
    
    // Reset the form fields
    form.setValue("newContractDescription", "");
    form.setValue("newContractStartDate", "");
    form.setValue("newContractEndDate", "");
  };

  const handleRemoveContract = (index: number) => {
    remove(index);
    
    toast({
      title: "Contract removed",
      description: "Contract document has been removed."
    });
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Contract & Commercial Deals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* File upload area */}
          <FileUploader 
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
          
          {/* Selected file info and form */}
          {selectedFile && (
            <ContractDetailsForm 
              onUpload={handleFileUpload}
            />
          )}
          
          {/* List of uploaded contracts */}
          <ContractDocumentList 
            documents={fields} 
            onRemove={handleRemoveContract}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractDocumentSection;
