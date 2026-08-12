import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white font-bold text-xl">
              <span className="p-1.5 bg-emerald-500 text-white rounded-lg">🏥</span>
              <span>PharmaCare</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your trusted online pharmacy. Providing genuine medicines, medical equipment, and dermocosmetics with fast, safe delivery.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/medicines" className="hover:text-emerald-400 transition-colors">
                  Medicines
                </Link>
              </li>
              <li>
                <Link to="/devices" className="hover:text-emerald-400 transition-colors">
                  Medical Devices
                </Link>
              </li>
              <li>
                <Link to="/cosmetics" className="hover:text-emerald-400 transition-colors">
                  Dermocosmetics
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-emerald-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>📍 123 Health Ave, FPT District</li>
              <li>📞 Hotline: (028) 3812 3456</li>
              <li>✉️ support@pharmacare.com</li>
              <li>⏰ Hours: 7:00 AM - 10:00 PM</li>
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PharmaCare. Built for FPT Software Front-End Portfolio.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

