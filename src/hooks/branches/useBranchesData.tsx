
import { useState, useEffect } from 'react';
import { Branch } from '@/models/BranchModel';
import { toast } from 'sonner';
import { isInDemoMode } from '@/services/authService';
import { API_BASE_URL, createAuthHeaders, handleApiError } from '@/services/api/config/apiConfig';

export const useBranchesData = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch branches data
  useEffect(() => {
    const fetchBranches = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (isInDemoMode()) {
          // Return mock data in demo mode
          setTimeout(() => {
            setBranches([
              { 
                id: 1, 
                name: 'Ahmad Khalil',
                location: 'Damascus International Airport, Terminal 1',
                phoneNumber: '+963 11 231 4567',
                email: 'ahmad.khalil@chamwings.com',
                officeHours: 'Mon-Fri: 8am-4pm, Sat: 9am-2pm, Sun: Closed',
                createdDate: '2025-01-01', 
                createdBy: 'admin'
              },
              { 
                id: 2, 
                name: 'Mohammed Al Farsi',
                location: 'Dubai International Airport, Concourse D',
                phoneNumber: '+971 4 567 8901',
                email: 'mohammed.alfarsi@chamwings.com',
                officeHours: 'Open 24/7',
                createdDate: '2025-01-02', 
                createdBy: 'admin'
              },
              { 
                id: 3, 
                name: 'Sarah Johnson',
                location: 'Beirut–Rafic Hariri International Airport',
                phoneNumber: '+961 1 628 000',
                email: 'sarah.johnson@chamwings.com',
                officeHours: 'Mon-Sun: 7am-10pm',
                createdDate: '2025-01-03', 
                createdBy: 'admin'
              },
            ]);
            setIsLoading(false);
          }, 800);
          return;
        }
        
        // Real API call
        const response = await fetch(`${API_BASE_URL}/Branches`, {
          method: 'GET',
          headers: createAuthHeaders(),
        });
        
        if (!response.ok) {
          throw new Error(await handleApiError(response));
        }
        
        const data = await response.json();
        setBranches(data);
      } catch (err) {
        console.error('Failed to fetch branches data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load branches data');
        
        // Fallback to demo data when API fails
        setBranches([
          { 
            id: 1, 
            name: 'Ahmad Khalil',
            location: 'Damascus International Airport, Terminal 1',
            phoneNumber: '+963 11 231 4567',
            email: 'ahmad.khalil@chamwings.com',
            officeHours: 'Mon-Fri: 8am-4pm, Sat: 9am-2pm, Sun: Closed',
            createdDate: '2025-01-01', 
            createdBy: 'admin'
          },
          { 
            id: 2, 
            name: 'Mohammed Al Farsi',
            location: 'Dubai International Airport, Concourse D',
            phoneNumber: '+971 4 567 8901',
            email: 'mohammed.alfarsi@chamwings.com',
            officeHours: 'Open 24/7',
            createdDate: '2025-01-02', 
            createdBy: 'admin'
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBranches();
  }, []);
  
  // Add a new branch
  const addBranch = async (branchData: Branch) => {
    try {
      if (isInDemoMode()) {
        // Simulate API call in demo mode
        const newBranch = {
          ...branchData,
          id: branches.length + 1,
          createdDate: new Date().toISOString(),
          createdBy: 'demo-user',
        };
        
        setBranches([...branches, newBranch]);
        toast.success('Branch added successfully', {
          description: `${branchData.name} has been added.`
        });
        return;
      }
      
      // Real API call
      const response = await fetch(`${API_BASE_URL}/Branches`, {
        method: 'POST',
        headers: createAuthHeaders(),
        body: JSON.stringify(branchData),
      });
      
      if (!response.ok) {
        throw new Error(await handleApiError(response));
      }
      
      const newBranch = await response.json();
      setBranches([...branches, newBranch]);
      
      toast.success('Branch added successfully', {
        description: `${branchData.name} has been added.`
      });
    } catch (err) {
      console.error('Failed to add branch:', err);
      toast.error('Failed to add branch', {
        description: err instanceof Error ? err.message : 'An unknown error occurred'
      });
    }
  };
  
  // Delete a branch
  const deleteBranch = async (id: number) => {
    toast('Delete functionality disabled', {
      description: `Delete operation for branches is currently disabled.`
    });
  };
  
  return {
    branches,
    isLoading,
    error,
    addBranch,
    deleteBranch
  };
};
