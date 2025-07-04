import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gray-400 border-t-2 border-black py-10">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -m-6 gap-y-6">
          {/* Branding Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4">
                <Logo width="100px" />
              </div>
              <p className="text-sm text-gray-700">
                &copy; Copyright {currentYear}. All Rights Reserved by DevUI.
              </p>
            </div>
          </div>

          {/* Company Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase text-gray-600 tracking-wider">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase text-gray-600 tracking-wider">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Account
                </Link>
              </li>
              <li>
                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="mb-6 text-xs font-semibold uppercase text-gray-600 tracking-wider">Legals</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;