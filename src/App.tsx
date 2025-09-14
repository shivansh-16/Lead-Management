import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { LeadForm } from './components/LeadForm';
import { LeadList } from './components/LeadList';
import { useSupabaseLeads } from './hooks/useSupabaseLeads';
import { Users, TrendingUp, Database } from 'lucide-react';

function App() {
  const { leads, loading, createLead, deleteLead, sortLeads } = useSupabaseLeads();

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthLeads = leads.filter(lead => {
    const leadDate = new Date(lead.createdat);
    return leadDate.getMonth() === currentMonth && leadDate.getFullYear() === currentYear;
  });

  const conversionRate = leads.length > 0 ? Math.round((thisMonthLeads.length / leads.length) * 100) : 0;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-300">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            className: 'dark:bg-gray-800 dark:text-white',
          }}
        />
        
        {/* Header */}
        <header className="backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    Lead Management
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Powered by Supabase
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{leads.length}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{thisMonthLeads.length}</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{conversionRate}%</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Lead Form and List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <LeadForm onSubmit={createLead} loading={loading} />
            </div>
            <div className="lg:col-span-2">
              <LeadList 
                leads={leads} 
                loading={loading} 
                onDelete={deleteLead} 
                onSort={sortLeads} 
              />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;