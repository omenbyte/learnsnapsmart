import React from 'react';
import { useState } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import Resources from './pages/Resources';
import { AppProvider } from './context/AppContext';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'library' | 'resources'>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'library':
        return <Library />;
      case 'resources':
        return <Resources />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <Layout onNavigate={setCurrentPage} currentPage={currentPage}>
        {renderPage()}
      </Layout>
    </AppProvider>
  );
}

export default App;