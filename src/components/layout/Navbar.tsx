import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

interface NavbarProps {
  cartItemCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItemCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-emerald-700 text-white font-semibold'
        : 'text-emerald-100 hover:bg-emerald-600 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-emerald-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl tracking-tight">
              <span className="p-1.5 bg-white text-emerald-600 rounded-lg shadow-sm">
                🏥
              </span>
              <span>PharmaCare</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/medicines" className={navLinkClass}>
              Medicines
            </NavLink>
            <NavLink to="/devices" className={navLinkClass}>
              Medical Devices
            </NavLink>
            <NavLink to="/cosmetics" className={navLinkClass}>
              Cosmetics
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin" className="px-3 py-2 rounded-md text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-colors">
                ⚙️ Admin Portal
              </NavLink>
            )}
          </nav>

          {/* Desktop Right Action Area (Cart & Auth) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-emerald-100 hover:text-white hover:bg-emerald-700 rounded-full transition-colors"
              title="View Cart"
            >
              <span className="text-xl">🛒</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1.5 text-sm font-medium text-emerald-600 bg-white hover:bg-emerald-50 rounded-lg shadow-sm transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/cart" className="relative p-2 text-white">
              <span className="text-xl">🛒</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:bg-emerald-700 rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-emerald-700 px-4 pt-2 pb-4 space-y-2 border-t border-emerald-500">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/medicines" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>
            Medicines
          </NavLink>
          <NavLink to="/devices" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>
            Medical Devices
          </NavLink>
          <NavLink to="/cosmetics" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>
            Cosmetics
          </NavLink>
          <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>
            Contact
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm font-semibold bg-amber-500 text-white">
              ⚙️ Admin Portal
            </NavLink>
          )}
          <div className="pt-2 border-t border-emerald-600">
            {isAdmin ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-white font-medium hover:bg-emerald-800 rounded-md"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center px-4 py-2 text-sm font-semibold text-emerald-600 bg-white rounded-md"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

