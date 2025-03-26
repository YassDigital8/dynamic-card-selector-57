
export type LogSeverity = 'info' | 'warning' | 'error' | 'success';

export type LogActionType = 
  | 'login' 
  | 'logout' 
  | 'password_change' 
  | 'profile_update' 
  | 'status_change' 
  | 'role_change' 
  | 'user_create' 
  | 'user_delete'
  | 'module_access'
  | 'failed_login';

export interface UserLog {
  id: string;
  userId: string;
  userName: string;
  timestamp: Date;
  action: LogActionType;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  severity: LogSeverity;
  details?: Record<string, any>;
}

export interface LogFilters {
  userId?: string;
  action?: LogActionType;
  severity?: LogSeverity;
  dateFrom?: Date;
  dateTo?: Date;
  searchTerm?: string;
}
