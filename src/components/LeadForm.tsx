import React, { useState } from 'react';
import { User, Mail, Phone, Target, Send, AlertCircle, Sparkles } from 'lucide-react';
import { validateLeadForm, ValidationErrors } from '../utils/validation';
import { LeadFormData } from '../types/Lead';
import toast from 'react-hot-toast';

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => Promise<void>;
  loading?: boolean;
}

const leadSources = [
  'Website',
  'Social Media',
  'Email Campaign',
  'Referral',
  'Cold Call',
  'Event',
  'Advertisement',
  'Other'
];

export const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    leadsource: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateLeadForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      setFormData({ name: '', email: '', phone: '', leadsource: '' });
      setErrors({});
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (hasError: boolean) => `
    w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm
    ${hasError 
      ? 'border-red-300 bg-red-50/50 dark:bg-red-900/20 dark:border-red-500/50 focus:border-red-500 focus:bg-white dark:focus:bg-gray-800' 
      : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:border-primary-500 dark:focus:border-primary-400 focus:bg-white dark:focus:bg-gray-800'
    }
    focus:outline-none focus:shadow-xl focus:shadow-primary-500/20 dark:focus:shadow-primary-400/20 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100
  `;

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 mb-8 animate-fade-in">
      <div className="flex items-center mb-6">
        <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mr-4 shadow-lg animate-bounce-gentle">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">New Lead</h2>
          <p className="text-gray-600 dark:text-gray-400">Capture and nurture your next opportunity</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className={inputClasses(!!errors.name)}
              />
            </div>
            {errors.name && (
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm animate-slide-up">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className={inputClasses(!!errors.email)}
              />
            </div>
            {errors.email && (
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm animate-slide-up">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </div>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className={inputClasses(!!errors.phone)}
              />
            </div>
            {errors.phone && (
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm animate-slide-up">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.phone}
              </div>
            )}
          </div>

          {/* Lead Source Field */}
          <div>
            <label htmlFor="leadsource" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Lead Source *
            </label>
            <div className="relative">
              <Target className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <select
                id="leadsource"
                name="leadsource"
                value={formData.leadsource}
                onChange={handleInputChange}
                className={`${inputClasses(!!errors.leadsource)} appearance-none cursor-pointer`}
              >
                <option value="">Select lead source</option>
                {leadSources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
            {errors.leadsource && (
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm animate-slide-up">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.leadsource}
              </div>
            )}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full md:w-auto bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-8 py-4 rounded-xl font-semibold
                     focus:outline-none focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                     flex items-center justify-center space-x-2 shadow-lg"
          >
            <Send className="w-5 h-5" />
            <span>{isSubmitting ? 'Creating Lead...' : 'Create Lead'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};