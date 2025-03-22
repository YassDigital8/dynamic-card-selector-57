
import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, Trash2, FileText, Plus } from 'lucide-react';
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useFieldArray } from 'react-hook-form';
import { ScrollArea } from '@/components/ui/scroll-area';

const ContractDocumentSection = () => {
  const form = useFormContext();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contractDocuments"
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      return;
    }
    
    // Check if file is a PDF
    if (file.type !== 'application/pdf') {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Only PDF files are accepted for contracts."
      });
      event.target.value = '';
      return;
    }
    
    setSelectedFile(file);
  };

  const handleFileUpload = (description: string) => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a PDF file to upload."
      });
      return;
    }
    
    // In a real application, you would upload the file to storage here
    // For now, we'll simulate a successful upload by creating a URL
    const simulatedUrl = `https://example.com/storage/${Date.now()}-${selectedFile.name}`;
    
    append({
      id: `contract-${Date.now()}`,
      url: simulatedUrl,
      fileName: selectedFile.name,
      uploadedAt: new Date().toISOString(),
      description: description
    });
    
    // Reset file input and selected file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    setSelectedFile(null);
    
    toast({
      title: "Contract uploaded",
      description: "Contract document has been successfully added."
    });
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
          <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
               onClick={() => fileInputRef.current?.click()}>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,application/pdf" 
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <FileUp className="h-8 w-8 text-gray-400" />
              <p className="font-medium">Click to select a PDF document</p>
              <p className="text-sm text-gray-500">Only PDF files are accepted</p>
            </div>
          </div>
          
          {/* Selected file info */}
          {selectedFile && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <div className="flex-1">
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF Document
                  </p>
                </div>
              </div>
              
              {/* Description field and upload button */}
              <div className="mt-3 space-y-3">
                <FormField
                  control={form.control}
                  name="newContractDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Add a description for this contract document (optional)"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="button" 
                  onClick={() => handleFileUpload(form.getValues("newContractDescription") || '')}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contract Document
                </Button>
              </div>
            </div>
          )}
          
          {/* List of uploaded contracts */}
          {fields.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="font-medium">Uploaded Contract Documents</h3>
              <ScrollArea className="h-[200px] border rounded-md p-2">
                <div className="space-y-2">
                  {fields.map((document: any, index) => (
                    <div key={document.id} className="flex items-center gap-3 p-2 border rounded-md">
                      <FileText className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{document.fileName}</p>
                        {document.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {document.description}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost" 
                        size="icon"
                        type="button"
                        onClick={() => handleRemoveContract(index)}
                        className="flex-shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove contract</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractDocumentSection;
