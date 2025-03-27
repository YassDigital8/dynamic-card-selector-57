
import React from 'react';
import { MapPin, Globe, LifeBuoy, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MainNavbarProps {
  className?: string;
}

export const MainNavbar: React.FC<MainNavbarProps> = ({ className }) => {
  return (
    <header className={cn("w-full bg-white shadow-sm", className)}>
      <div className="container mx-auto px-4">
        {/* Top navigation bar */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img 
                src="/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png" 
                alt="Cham Wings Airlines" 
                className="h-10 w-auto"
              />
            </Link>
          </div>
          
          {/* Right side utilities */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Dubai, UAE</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Globe className="h-4 w-4 mr-1" />
              <span>Language</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <LifeBuoy className="h-4 w-4 mr-1" />
              <span>Support</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-1" />
              <span>Log in</span>
            </div>
            
            <button className="bg-blue-800 text-white px-3 py-1 text-sm rounded">
              Sign Up
            </button>
          </div>
        </div>
        
        {/* Main navigation */}
        <nav className="flex items-center justify-between py-3">
          <ul className="flex space-x-6">
            <li className="text-sm font-medium">
              <Link to="/book-flights" className="flex items-center">
                Book Flights
              </Link>
            </li>
            <li className="text-sm font-medium">
              <Link to="/travel-experience" className="flex items-center">
                Travel Experience
              </Link>
            </li>
            <li className="text-sm font-medium">
              <Link to="/holidays" className="flex items-center">
                Holidays
              </Link>
            </li>
            <li className="text-sm font-medium">
              <Link to="/cham-miles" className="flex items-center">
                Cham Miles
              </Link>
            </li>
            <li className="text-sm font-medium">
              <Link to="/about-us" className="flex items-center font-bold">
                About Us
              </Link>
            </li>
            <li className="text-sm font-medium">
              <Link to="/blogs" className="flex items-center">
                Blogs
              </Link>
            </li>
            <li className="text-sm font-medium">
              <Link to="/cham-miles-store" className="flex items-center">
                Cham Miles Store
              </Link>
            </li>
          </ul>
          
          <div className="relative">
            <input
              type="text"
              placeholder="PNR Number"
              className="pl-8 pr-4 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default MainNavbar;
