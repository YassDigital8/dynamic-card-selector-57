
export interface ImageDimensions {
  width: number;
  height: number;
}

export interface FileMetadata {
  title?: string;
  altText?: string;
  caption?: string;
  description?: string;
  dimensions?: ImageDimensions;
  hotelId?: string; // Add hotelId to associate files with specific hotels
  url?: string; // Added url property to fix the type error
  size?: number;
  type?: string;
  uploadedAt?: string;
}

export interface FileInfo {
  id: string;
  name: string;
  type: string;
  size: number; // in KB
  url: string;
  uploadedBy: string;
  uploadedOn: string;
  galleryId: string; // Gallery this file belongs to
  galleryName?: string; // Name of the gallery
  metadata?: FileMetadata;
}

export interface Gallery {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdOn: string;
  coverImageUrl?: string;
  iconName?: string; // Name of the Lucide icon to use
  fileCount: number;
}
