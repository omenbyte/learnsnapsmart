import React from 'react';
import { Brain, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Button from '../ui/Button';

interface HeaderProps {
  onNavigate: (page: 'dashboard' | 'library' | 'resources') => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { user, setUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const togglePremium = () => {
    setUser({ isPremium: !user.isPremium });
  };

  const handleNavigation = (page: 'dashboard' | 'library' | 'resources') => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">MediStudy AI</span>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <button
                onClick={() => handleNavigation('dashboard')}
                className={`${
                  currentPage === 'dashboard'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNavigation('library')}
                className={`${
                  currentPage === 'library'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Library
              </button>
              <button
                onClick={() => handleNavigation('resources')}
                className={`${
                  currentPage === 'resources'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Resources
              </button>
            </nav>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center">
            <Button 
              variant={user.isPremium ? "outline" : "premium"} 
              onClick={togglePremium}
            >
              {user.isPremium ? "Switch to Free" : "Upgrade to Premium"}
            </Button>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <button
              onClick={() => handleNavigation('dashboard')}
              className={`${
                currentPage === 'dashboard'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation('library')}
              className={`${
                currentPage === 'library'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left`}
            >
              Library
            </button>
            <button
              onClick={() => handleNavigation('resources')}
              className={`${
                currentPage === 'resources'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left`}
            >
              Resources
            </button>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <Button 
                variant={user.isPremium ? "outline" : "premium"} 
                onClick={togglePremium}
                className="w-full"
              >
                {user.isPremium ? "Switch to Free" : "Upgrade to Premium"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header