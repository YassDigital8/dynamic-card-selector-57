
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Edit, Eye, Trash, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CMSPage } from '@/hooks/cms/useCmsState';
import { Skeleton } from '@/components/ui/skeleton';

interface CMSPageListProps {
  pages: CMSPage[];
  loading: boolean;
  onCreatePage: (title: string, slug: string, template: string) => void;
  onSelectPage: (id: string) => void;
}

const CMSPageList: React.FC<CMSPageListProps> = ({ pages, loading, onCreatePage, onSelectPage }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  
  const handleCreatePage = () => {
    if (newPageTitle && newPageSlug) {
      onCreatePage(newPageTitle, newPageSlug, selectedTemplate);
      setDialogOpen(false);
      resetForm();
    }
  };
  
  const resetForm = () => {
    setNewPageTitle('');
    setNewPageSlug('');
    setSelectedTemplate('blank');
  };
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setNewPageTitle(title);
    
    // Auto-generate slug if user hasn't manually changed it yet
    if (!newPageSlug || newPageSlug === slugify(newPageTitle)) {
      setNewPageSlug(slugify(title));
    }
  };
  
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pages</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Page
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create a new page</DialogTitle>
              <DialogDescription>
                Create a new page for your website. You can edit its content after creation.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={newPageTitle} 
                  onChange={handleTitleChange} 
                  placeholder="e.g. About Us" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input 
                  id="slug" 
                  value={newPageSlug} 
                  onChange={(e) => setNewPageSlug(slugify(e.target.value))} 
                  placeholder="e.g. about-us" 
                />
                <p className="text-sm text-gray-500">
                  This will be used in the URL: yoursite.com/{newPageSlug || 'slug'}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="template">Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blank">Blank Page</SelectItem>
                    <SelectItem value="landing">Landing Page</SelectItem>
                    <SelectItem value="about">About Us</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreatePage} disabled={!newPageTitle || !newPageSlug}>Create Page</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Loading state with skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={`skeleton-${i}`} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="pb-6">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-24" />
              </CardFooter>
            </Card>
          ))
        ) : (
          // Actual page list
          pages.map(page => (
            <Card key={page.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{page.title}</CardTitle>
                <CardDescription>/{page.slug}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Badge className={page.status === 'published' ? 'bg-green-600' : 'bg-amber-500'}>
                    {page.status === 'published' ? (
                      <><CheckCircle2 className="h-3 w-3 mr-1" /> Published</>
                    ) : (
                      <><Clock className="h-3 w-3 mr-1" /> Draft</>
                    )}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {page.components.length} {page.components.length === 1 ? 'component' : 'components'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {page.description || 'No description provided'}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Trash className="h-4 w-4 mr-1" /> Delete
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onSelectPage(page.id)}>
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      
      {!loading && pages.length === 0 && (
        <div className="text-center py-12 bg-slate-100 rounded-lg border border-slate-200">
          <div className="space-y-3">
            <h3 className="text-xl font-medium">No pages created yet</h3>
            <p className="text-slate-600">Create your first page to get started with the CMS.</p>
            <Button onClick={() => setDialogOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" /> Create Your First Page
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSPageList;
