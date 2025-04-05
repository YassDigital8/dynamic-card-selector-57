
import React, { useState, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PageData } from '@/models/PageModel';
import { Edit, Save, X } from 'lucide-react';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

interface PageDetailsViewProps {
  page: PageData;
  onUpdatePage: (updatedPage: PageData) => void;
}

const PageDetailsView: React.FC<PageDetailsViewProps> = ({ page, onUpdatePage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(page.title);
  const [description, setDescription] = useState(page.description);
  const [content, setContent] = useState(page.content);
  const [errors, setErrors] = useState<{
    title?: boolean;
    description?: boolean;
    content?: boolean;
  }>({});

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTitle(page.title);
    setDescription(page.description);
    setContent(page.content);
    setErrors({});
    setIsEditing(false);
  };

  const handleSave = () => {
    const newErrors: typeof errors = {};
    
    if (!title.trim()) {
      newErrors.title = true;
    }
    
    if (!description.trim()) {
      newErrors.description = true;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onUpdatePage({
      ...page,
      title,
      description,
      content,
      lastUpdated: new Date().toISOString(),
    });
    
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <PageHeader page={page} />
      
      <Card>
        <CardContent className="pt-6 space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="font-medium">
                  Page Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  className={errors.title ? "border-red-500" : ""}
                  aria-invalid={errors.title ? "true" : "false"}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">Title is required</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="description" className="font-medium">
                  Description
                </Label>
                <Textarea
                  value={description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  rows={3}
                  className={errors.description ? "border-red-500" : ""}
                  aria-invalid={errors.description ? "true" : "false"}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">Description is required</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="content" className="font-medium">
                  Content
                </Label>
                <Textarea
                  value={content}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                  rows={10}
                  className="font-mono"
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={handleCancel} className="gap-1">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleSave} className="gap-1">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-gray-500">Page Title</h3>
                <p className="text-xl font-semibold">{page.title}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-sm text-gray-500">Description</h3>
                <p>{page.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-sm text-gray-500">Content</h3>
                <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm font-mono">
                  {page.content}
                </pre>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleEdit} className="gap-1">
                  <Edit className="h-4 w-4" />
                  Edit Page
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <PageFooter page={page} />
    </div>
  );
};

export default PageDetailsView;
