import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Moon, Sun } from 'lucide-react';
import { NAV_LINKS, BRAND_NAME } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 dark:bg-primary/20 rounded-lg">
              <Terminal className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase font-mono">
              {BRAND_NAME}
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-700" />}
              </button>

              <a
                href="#"
                className="bg-primary hover:bg-cyan-600 text-white dark:text-slate-950 font-bold px-4 py-2 rounded-md text-sm transition-colors"
              >
                Resume
              </a>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden items-center gap-4">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-yellow-400"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#"
              className="w-full text-center mt-4 block bg-primary text-white dark:text-slate-950 font-bold px-4 py-2 rounded-md text-base"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;