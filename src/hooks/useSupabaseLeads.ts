import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lead, LeadFormData, SortField, SortOrder } from '../types/Lead';
import toast from 'react-hot-toast';

export const useSupabaseLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('createdat', { ascending: false });

      if (error) throw error;
      
      setLeads(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch leads';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createLead = async (leadData: LeadFormData): Promise<Lead> => {
    try {
      setError(null);
      
      // Check if lead with email already exists
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id')
        .eq('email', leadData.email)
        .maybeSingle();

      if (existingLead) {
        throw new Error('A lead with this email already exists');
      }

      const { data, error } = await supabase
        .from('leads')
        .insert([{
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          leadsource: leadData.leadsource,
        }])
        .select()
        .single();

      if (error) throw error;

      const newLead = data as Lead;
      setLeads(prevLeads => [newLead, ...prevLeads]);
      toast.success(`Lead "${newLead.name}" created successfully!`);
      
      return newLead;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create lead';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  const deleteLead = async (id: string) => {
    try {
      setError(null);
      
      const leadToDelete = leads.find(lead => lead.id === id);
      
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLeads(prevLeads => prevLeads.filter(lead => lead.id !== id));
      toast.success(`Lead "${leadToDelete?.name || 'Unknown'}" deleted successfully!`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete lead';
      setError(errorMessage);
      toast.error(errorMessage);
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