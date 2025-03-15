
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
}

export interface FileInfo {
  id: string;
  name: string;
  type: string;
  size: number; // in KB
  url: string;
  uploadedBy: string;
  uploadedOn: string;
  metadata?: FileMetadata;
}
