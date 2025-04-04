
import React from 'react';
import { Button } from "@/components/ui/button";
import { ImagePlus, Check, Lock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ImageType {
  url: string;
  id?: string;
}

interface EventImageGalleryProps {
  images: ImageType[];
  mainImageUrl: string;
  onAddImages: () => void;
  onRemoveImage?: (imageId: string) => void;
  onSetMainImage?: (imageUrl: string) => void;
  readOnly?: boolean;
}

const EventImageGallery: React.FC<EventImageGalleryProps> = ({
  images,
  mainImageUrl,
  onAddImages,
  onRemoveImage,
  onSetMainImage,
  readOnly = false
}) => {
  if (images.length === 0) {
    return (
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        {readOnly ? (
          <div className="flex flex-col items-center gap-3">
            <Lock className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">Images cannot be modified for existing events</p>
          </div>
        ) : (
          <Button onClick={onAddImages} variant="outline" className="mx-auto">
            <ImagePlus className="mr-2 h-4 w-4" />
            Add Images
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center gap-2">
          Event Images
          {readOnly && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Images cannot be modified for existing events</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </h3>
        {!readOnly && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddImages}
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Add Images
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id || image.url}
            className="relative aspect-square overflow-hidden rounded-lg border bg-muted"
          >
            <img
              src={image.url}
              alt="Event image"
              className="h-full w-full object-cover transition-all hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 hover:bg-black/40 hover:opacity-100 transition-all">
              {!readOnly && onSetMainImage && mainImageUrl !== image.url && (
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => onSetMainImage(image.url)}
                  className="h-8 w-8 p-0"
                >
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Set as main</span>
                </Button>
              )}
              {!readOnly && onRemoveImage && (
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => onRemoveImage(image.id || image.url)}
                  className="h-8 w-8 p-0"
                >
                  <span className="sr-only">Remove</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                  </svg>
                </Button>
              )}
            </div>
            {mainImageUrl === image.url && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                Main
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventImageGallery;
