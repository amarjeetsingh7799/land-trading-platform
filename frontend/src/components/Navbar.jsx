import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left Side - Logo & Links */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold text-slate-900 dark:text-white">
            🏗️ The Unsold
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm">
              Book A Demo
            </Link>
            <Link to="/register-investor" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm">
              Register As Investor
            </Link>
            <Link to="/events" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm">
              Events
            </Link>
            <Link to="/contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-3">
          
          {/* Favorites & Dashboard Links (Desktop) */}
          {user && (
            <>
              <Link 
                to="/favorites" 
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hidden lg:inline text-sm"
              >
                Favorites
              </Link>
              <Link 
                to="/dashboard" 
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hidden lg:inline text-sm"
              >
                Dashboard
              </Link>
            </>
          )}

          {/* Dark Mode Toggle */}
          <button 
            onClick={() => setDark(v => !v)} 
            className="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden px-2 py-1 text-slate-600 dark:text-slate-300"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* User Section */}
          {user ? (
            <>
              {/* Profile Dropdown (Desktop) */}
              <div className="hidden sm:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                    {getInitials(user.name)}
                  </div>
                  
                  {/* User Name (hidden on smaller screens) */}
                  <span className="hidden lg:block font-medium text-slate-900 dark:text-white text-sm">
                    {user.name}
                  </span>
                  
                  {/* Dropdown Arrow */}
                  <svg 
                    className={`w-4 h-4 text-slate-600 dark:text-slate-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50">
                    
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                      {user.role && (
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {user.role}
                        </span>
                      )}
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>My Profile</span>
                      </Link>

                      <Link
                        to="/my-properties"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>My Properties</span>
                      </Link>

                      <Link
                        to="/favorites"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>Favorites</span>
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Settings</span>
                      </Link>
                    </div>

                    {/* Sign Out */}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-2">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Simple Logout Button (Mobile - shown in mobile menu) */}
            </>
          ) : (
            <>
              {/* Login/Signup Buttons (Desktop) */}
              <Link 
                to="/login" 
                className="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm hidden sm:inline hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-3 py-1.5 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm hidden sm:inline hover:opacity-90 transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-3 space-y-2">
          <Link 
            to="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-600 dark:text-slate-300 py-2 hover:text-slate-900 dark:hover:text-white"
          >
            Book A Demo
          </Link>
          <Link 
            to="/register-investor" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-600 dark:text-slate-300 py-2 hover:text-slate-900 dark:hover:text-white"
          >
            Register As Investor
          </Link>
          <Link 
            to="/events" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-600 dark:text-slate-300 py-2 hover:text-slate-900 dark:hover:text-white"
          >
            Events
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-600 dark:text-slate-300 py-2 hover:text-slate-900 dark:hover:text-white"
          >
            Contact Us
          </Link>
          
          {user ? (
            <>
              {/* User Info in Mobile */}
              <div className="pt-4 pb-2 border-t border-slate-200 dark:border-slate-800">
                <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
              </div>
              
              <Link 
                to="/profile" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-600 dark:text-slate-300 py-2 hover:text-slate-900 dark:hover:text-white"
              >
                My Profile
              </Link>
              <Link 
                to="/my-properties" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-600 dark:text-slate-300 py-2 hover:text-slate-900 dark:hover:text-white"
              >
                My Properties
              </Link>
              <Link 
                to="/favorites" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-600 dark:text-slate-300 py-2 hover:text-slate-900 dark:hover:text-white"
              >
                Favorites
              </Link>
              <Link 
                to="/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-600 dark:text-slate-300 py-2 hover:text-slate-900 dark:hover:text-white"
              >
                Dashboard
              </Link>
              <Link 
                to="/settings" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-600 dark:text-slate-300 py-2 hover:text-slate-900 dark:hover:text-white"
              >
                Settings
              </Link>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left text-red-600 dark:text-red-400 py-2 font-semibold"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-600 dark:text-slate-300 py-2 hover:text-slate-900 dark:hover:text-white"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-600 dark:text-slate-300 py-2 hover:text-slate-900 dark:hover:text-white"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
