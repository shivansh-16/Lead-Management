import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Trash2, Users, Mail, Phone, Calendar, ArrowUpDown, Database } from 'lucide-react';
import { Lead, SortField, SortOrder } from '../types/Lead';
import { formatPhoneNumber } from '../utils/validation';

interface LeadListProps {
  leads: Lead[];
  loading: boolean;
  onDelete: (id: string) => void;
  onSort: (field: SortField, order: SortOrder) => void;
}

export const LeadList: React.FC<LeadListProps> = ({ leads, loading, onDelete, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState('');
  const [sortField, setSortField] = useState<SortField>('createdat');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
    onSort(field, newOrder);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);
    
    const matchesFilter = !filterSource || lead.leadsource === filterSource;
    
    return matchesSearch && matchesFilter;
  });

  const leadSources = [...new Set(leads.map(lead => lead.leadsource))];

  const SortButton: React.FC<{ field: SortField; children: React.ReactNode }> = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
    >
      <span>{children}</span>
      <ArrowUpDown className="w-4 h-4 opacity-60" />
    </button>
  );

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 animate-fade-in">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-14 h-14 bg-gradient-to-r from-accent-500 to-primary-500 rounded-xl flex items-center justify-center mr-4 shadow-lg animate-bounce-gentle">
              <Database className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-600 to-primary-600 dark:from-accent-400 dark:to-primary-400 bg-clip-text text-transparent">Lead Database</h2>
              <p className="text-gray-600 dark:text-gray-400">{leads.length} total leads • Powered by Supabase</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:shadow-lg"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none appearance-none cursor-pointer bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 text-gray-900 dark:text-gray-100 focus:shadow-lg"
            >
              <option value="">All Lead Sources</option>
              {leadSources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Loading leads from Supabase...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No leads found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm || filterSource ? 'Try adjusting your search or filter criteria.' : 'Start by creating your first lead.'}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50/50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  <SortButton field="name">Name</SortButton>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  <SortButton field="email">Email</SortButton>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  <SortButton field="leadsource">Source</SortButton>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  <SortButton field="createdat">Created</SortButton>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-200 group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mr-3 shadow-md group-hover:shadow-lg transition-shadow duration-200">
                        <span className="text-white font-semibold text-sm">
                          {lead.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">{lead.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4 mr-2" />
                      {lead.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4 mr-2" />
                      {formatPhoneNumber(lead.phone)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium">
                      {lead.leadsource}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(lead.createdat).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onDelete(lead.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-all duration-200 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transform hover:scale-110"
                      title="Delete lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};