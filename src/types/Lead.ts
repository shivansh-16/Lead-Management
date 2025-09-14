export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  leadsource: string;
  createdat: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  leadsource: string;
}

export type SortField = 'name' | 'email' | 'leadsource' | 'createdat';
export type SortOrder = 'asc' | 'desc';