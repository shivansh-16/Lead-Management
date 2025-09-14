import { useState, useEffect } from 'react';
import { Lead, LeadFormData, SortField, SortOrder } from '../types/Lead';

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = 'http://localhost:3001/api';

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE}/leads`);
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }
      const data = await response.json();
      setLeads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createLead = async (leadData: LeadFormData): Promise<Lead> => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create lead');
      }

      const newLead = await response.json();
      setLeads(prevLeads => [newLead, ...prevLeads]);
      return newLead;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create lead');
      throw err;
    }
  };

  const deleteLead = async (id: string) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE}/leads/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete lead');
      }

      setLeads(prevLeads => prevLeads.filter(lead => lead.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete lead');
    }
  };

  const sortLeads = (field: SortField, order: SortOrder) => {
    setLeads(prevLeads => {
      const sorted = [...prevLeads].sort((a, b) => {
        let aValue = a[field];
        let bValue = b[field];

        if (field === 'createdAt') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        } else {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (order === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
      return sorted;
    });
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return {
    leads,
    loading,
    error,
    createLead,
    deleteLead,
    sortLeads,
    refetch: fetchLeads,
  };
};