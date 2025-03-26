
import { UserLog, LogFilters, LogActionType, LogSeverity } from '@/types/log.types';
import { v4 as uuidv4 } from 'uuid';

// Mock data for demonstration
const generateMockLogs = (count: number): UserLog[] => {
  const actions: LogActionType[] = [
    'login', 'logout', 'password_change', 'profile_update', 
    'status_change', 'role_change', 'user_create', 'user_delete',
    'module_access', 'failed_login'
  ];
  
  const severities: LogSeverity[] = ['info', 'warning', 'error', 'success'];
  
  const userNames = [
    'John Smith', 'Maria Garcia', 'Ahmed Khan', 'Sarah Johnson', 
    'Li Wei', 'Carlos Rodriguez', 'Emma Wilson', 'Raj Patel'
  ];
  
  const descriptionMap: Record<LogActionType, string[]> = {
    login: ['Successful login', 'User logged in successfully', 'Authentication successful'],
    logout: ['User logged out', 'Session terminated', 'Logout successful'],
    password_change: ['Password updated', 'User changed password', 'Security credentials updated'],
    profile_update: ['Profile information updated', 'User details changed', 'Account information modified'],
    status_change: ['Account status changed', 'User activated/deactivated', 'Status toggled'],
    role_change: ['User role modified', 'Permissions updated', 'Role assignment changed'],
    user_create: ['New user account created', 'User added to system', 'Account provisioned'],
    user_delete: ['User account removed', 'Account deletion', 'User removed from system'],
    module_access: ['Accessed restricted module', 'Permission granted for module', 'Module entry recorded'],
    failed_login: ['Failed login attempt', 'Authentication failure', 'Invalid credentials used']
  };
  
  const getRandomSeverity = (action: LogActionType): LogSeverity => {
    switch(action) {
      case 'login':
      case 'logout':
      case 'module_access':
        return 'info';
      case 'status_change':
      case 'role_change':
        return 'warning';
      case 'failed_login':
        return 'error';
      case 'user_create':
      case 'password_change':
        return 'success';
      default:
        return severities[Math.floor(Math.random() * severities.length)];
    }
  };
  
  const logs: UserLog[] = [];
  
  for (let i = 0; i < count; i++) {
    const action = actions[Math.floor(Math.random() * actions.length)];
    const userName = userNames[Math.floor(Math.random() * userNames.length)];
    const timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - Math.floor(Math.random() * 30)); // Random date in the last 30 days
    
    const descriptions = descriptionMap[action] || ['Action performed'];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    logs.push({
      id: uuidv4(),
      userId: uuidv4().split('-')[0], // Just using part of a UUID as a fake userId
      userName,
      timestamp,
      action,
      description,
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: getRandomSeverity(action),
      details: {
        browser: 'Chrome',
        os: 'Windows',
        location: 'Server Room 3'
      }
    });
  }
  
  // Sort by timestamp, newest first
  return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

let mockLogs: UserLog[] = generateMockLogs(100);

export const fetchLogs = async (filters?: LogFilters): Promise<UserLog[]> => {
  // Simulate API call with a slight delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // If there are no filters, return all logs
  if (!filters) return [...mockLogs];
  
  // Apply filters
  let filteredLogs = [...mockLogs];
  
  if (filters.userId) {
    filteredLogs = filteredLogs.filter(log => log.userId === filters.userId);
  }
  
  if (filters.action) {
    filteredLogs = filteredLogs.filter(log => log.action === filters.action);
  }
  
  if (filters.severity) {
    filteredLogs = filteredLogs.filter(log => log.severity === filters.severity);
  }
  
  if (filters.dateFrom) {
    filteredLogs = filteredLogs.filter(log => log.timestamp >= filters.dateFrom!);
  }
  
  if (filters.dateTo) {
    // Add one day to include the end date fully
    const dateTo = new Date(filters.dateTo);
    dateTo.setDate(dateTo.getDate() + 1);
    filteredLogs = filteredLogs.filter(log => log.timestamp <= dateTo);
  }
  
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.toLowerCase();
    filteredLogs = filteredLogs.filter(log => 
      log.userName.toLowerCase().includes(searchTerm) ||
      log.description.toLowerCase().includes(searchTerm) ||
      log.userId.toLowerCase().includes(searchTerm) ||
      log.action.toLowerCase().includes(searchTerm)
    );
  }
  
  return filteredLogs;
};

export const getLogActions = (): LogActionType[] => {
  return [
    'login', 'logout', 'password_change', 'profile_update', 
    'status_change', 'role_change', 'user_create', 'user_delete',
    'module_access', 'failed_login'
  ];
};

export const getSeverityTypes = (): LogSeverity[] => {
  return ['info', 'warning', 'error', 'success'];
};

export const clearLogs = async (): Promise<boolean> => {
  // In a real application, this would call an API
  mockLogs = [];
  return true;
};

export const exportLogs = async (logs: UserLog[]): Promise<string> => {
  // In a real application, this would generate a proper CSV or Excel file
  const header = "ID,User ID,User Name,Timestamp,Action,Description,IP Address,Severity\n";
  const rows = logs.map(log => 
    `${log.id},${log.userId},${log.userName},${log.timestamp.toISOString()},${log.action},${log.description},${log.ipAddress || ''},${log.severity}`
  ).join("\n");
  
  return header + rows;
};

// Add a new log entry (for demonstration)
export const addLogEntry = async (log: Omit<UserLog, 'id'>): Promise<UserLog> => {
  const newLog: UserLog = {
    ...log,
    id: uuidv4()
  };
  
  mockLogs.unshift(newLog);
  return newLog;
};
