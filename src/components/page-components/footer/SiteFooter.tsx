
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface SiteFooterProps {
  className?: string;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ className }) => {
  const footerSections = [
    {
      title: 'About Cham Wings Airlines',
      links: [
        { label: 'Our Story', href: '/about/story' },
        { label: 'Our Vision', href: '/about/vision' },
        { label: 'Our Values', href: '/about/values' },
        { label: 'Our Responsibility', href: '/about/responsibility' },
        { label: 'Our Fleet', href: '/about/fleet' },
        { label: 'Media Center', href: '/about/media' },
        { label: 'Careers', href: '/about/careers' },
      ]
    },
    {
      title: 'Book Flights',
      links: [
        { label: 'Flight Schedule', href: '/flights/schedule' },
        { label: 'Flight Status', href: '/flights/status' },
        { label: 'Get Permit', href: '/flights/permit' },
        { label: 'Visa Information', href: '/flights/visa' },
        { label: 'Group Travel', href: '/flights/group-travel' },
        { label: 'Request to Carry Pets', href: '/flights/pets' },
      ]
    },
    {
      title: 'Our Destinations Network',
      links: [
        { label: 'Middle East', href: '/destinations/middle-east' },
        { label: 'International Destinations', href: '/destinations/international' },
      ]
    },
    {
      title: 'Cham Miles Loyalty Program',
      links: [
        { label: 'About ChamMiles', href: '/loyalty/about' },
        { label: 'Join The Program', href: '/loyalty/join' },
        { label: 'Cham Miles Partners', href: '/loyalty/partners' },
        { label: 'Online Account Access', href: '/loyalty/account' },
        { label: 'Terms And Conditions', href: '/loyalty/terms' },
        { label: 'Miles Calculator', href: '/loyalty/calculator' },
      ]
    },
    {
      title: 'Travel Experience',
      links: [
        { label: 'At The Airport', href: '/experience/airport' },
        { label: 'In Flight', href: '/experience/inflight' },
        { label: 'On Board', href: '/experience/onboard' },
        { label: 'Additional Services', href: '/experience/services' },
      ]
    },
    {
      title: 'Help',
      links: [
        { label: 'Contact Us', href: '/help/contact' },
        { label: 'Policies & Complaints', href: '/help/policies' },
        { label: 'Our Sales Offices', href: '/help/offices' },
        { label: 'Our Agents Worldwide', href: '/help/agents' },
        { label: 'FAQs', href: '/help/faqs' },
      ]
    },
  ];

  return (
    <footer className={cn("bg-blue-900 text-white py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-sm font-bold uppercase">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.href} 
                      className="text-xs text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <hr className="border-blue-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-gray-300 mb-4 md:mb-0">
            © All Rights Reserved, Cham Wings Airlines 2023
          </div>
          
          <div className="flex space-x-4 text-xs text-gray-300">
            <Link to="/site-map" className="hover:text-white transition-colors">Site Map</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
