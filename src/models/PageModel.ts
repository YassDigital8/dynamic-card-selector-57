
// Models represent the core data structures used in the application

export interface PageData {
  id?: number;
  title: string;
  content: string;
  lastUpdated: string;
  status: string;
  description?: string;
  pageUrlName?: string;
  segments?: any[];
  updatedAt?: string; // Added to support the PageDetailsView component
  approvalStatus?: ApprovalStatus;
  approvers?: Approver[];
  createdBy?: string;
}

export interface PageSelectionModel {
  pos: string;
  language: string;
  slug?: string;
  subSlug?: string;
}

export type SelectionStep = 'pos' | 'language' | 'options';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'not_required';

export interface Approver {
  id: string;
  name: string;
  role: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedAt?: string;
  comment?: string;
}

export interface ApprovalRequest {
  pageId: number;
  pageTitle: string;
  requestedBy: string;
  requestedAt: string;
  status: ApprovalStatus;
  approvers: Approver[];
}
