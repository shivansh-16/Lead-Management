# Complete Lead Management System

This is a modern, full-stack Lead Management System built with React, TypeScript, Tailwind CSS, and Supabase. It allows users to efficiently capture, track, and manage sales leads, providing a clear overview of their lead pipeline.

## Features

*   **Lead Capture**: Easily add new leads with details like name, email, phone, and lead source.
*   **Lead Listing**: View all captured leads in a sortable and filterable table.
*   **Search Functionality**: Quickly find leads by name, email, or phone number.
*   **Filtering**: Filter leads by their source (e.g., Website, Social Media).
*   **Sorting**: Sort leads by name, email, lead source, or creation date in ascending or descending order.
*   **Lead Deletion**: Remove leads from the system.
*   **Real-time Updates**: Powered by Supabase, changes are reflected instantly.
*   **Dashboard Statistics**: View key metrics like total leads, leads added this month, and conversion rate.
*   **Responsive Design**: Optimized for various screen sizes.
*   **Dark/Light Mode**: Toggle between dark and light themes for better user experience.
*   **Toast Notifications**: Provides user feedback for actions like lead creation and deletion.

## Technologies Used

*   **Frontend**:
    *   React
    *   TypeScript
    *   Vite (build tool)
    *   Tailwind CSS (for styling)
    *   Lucide React (for icons)
    *   React Hot Toast (for notifications)
*   **Backend/Database**:
    *   Supabase (PostgreSQL database, authentication, and real-time capabilities)

## Setup Instructions

Follow these steps to get the project up and running on your local machine.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd lead-management-system
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Supabase Setup

This project uses Supabase as its backend. You'll need to set up a Supabase project and configure your environment variables.

#### a. Create a Supabase Project

1.  Go to [Supabase](https://supabase.com/) and sign up or log in.
2.  Create a new project.
3.  Wait for your project to be provisioned.

#### b. Run Database Migrations

Once your Supabase project is ready, you need to set up the `leads` table and its policies.

1.  In your Supabase project dashboard, navigate to the **SQL Editor** (left sidebar).
2.  Copy and paste the content of the `supabase/migrations/20250912104916_amber_cherry.sql` file into the SQL Editor.
3.  Click "Run" to execute the migration. This will create the `leads` table, enable Row Level Security (RLS), and set up policies for public access (for demo purposes).

#### c. Configure Environment Variables

Create a `.env` file in the root of your project and add your Supabase credentials:

```
VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

*   You can find your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your Supabase project dashboard under **Project Settings > API**.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application should now be running at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

1.  **Add New Leads**: Use the "New Lead" form on the left to input lead details and click "Create Lead".
2.  **View Leads**: Leads will appear in the "Lead Database" table on the right.
3.  **Search**: Use the search bar to find leads by name, email, or phone.
4.  **Filter**: Use the "All Lead Sources" dropdown to filter leads by their source.
5.  **Sort**: Click on the table headers (Name, Email, Source, Created) to sort the leads.
6.  **Delete Leads**: Click the trash can icon next to a lead to delete it.
7.  **Toggle Theme**: Use the moon/sun icon in the header to switch between dark and light modes.

## Project Structure

```
.
├── public/
├── src/
│   ├── components/         # Reusable React components (LeadForm, LeadList, ThemeToggle)
│   ├── contexts/           # React Contexts (ThemeContext)
│   ├── hooks/              # Custom React hooks (useSupabaseLeads)
│   ├── lib/                # Supabase client initialization (supabase.ts)
│   ├── types/              # TypeScript type definitions (Lead.ts)
│   ├── utils/              # Utility functions (validation.ts)
│   ├── App.tsx             # Main application component
│   ├── index.css           # Tailwind CSS imports
│   └── main.tsx            # Entry point for React application
├── supabase/               # Supabase migration files
│   └── migrations/
│       └── 20250912104916_amber_cherry.sql # Database schema migration
├── .env                    # Environment variables (not committed)
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration for Tailwind CSS
├── README.md               # This file
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build tool configuration
```

## Contributing

Feel free to fork the repository, open issues, or submit pull requests.

## License

This project is open-source and available under the MIT License.