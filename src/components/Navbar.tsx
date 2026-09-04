import React, { useState } from 'react';
import type { SectionType } from '../types';
import { 
  Home, 
  Gamepad2, 
  Brain, 
  UserCheck, 
  TrendingUp, 
  Info, 
  Eye, 
  Menu, 
  X,
  Type
} from 'lucide-react';

interface NavbarProps {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: SectionType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-6 h-6" /> },
    { id: 'games', label: 'Cognitive Games', icon: <Gamepad2 className="w-6 h-6" /> },
    { id: 'assistant', label: 'Memory Assistant', icon: <Brain className="w-6 h-6" /> },
    { id: 'caregiver', label: 'Caregiver Dashboard', icon: <UserCheck className="w-6 h-6" /> },
    { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-6 h-6" /> },
    { id: 'about', label: 'About', icon: <Info className="w-6 h-6" /> },
  ];

  const handleNavClick = (id: SectionType) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-50 shadow-md border-b-4 transition-colors duration-200 ${
      highContrast 
        ? 'bg-black border-yellow-400 text-white' 
        : 'bg-teal-900 border-amber-500 text-white'
    }`}>
      {/* Top Accessibility & Region Banner */}
      <div className={`px-4 py-2 text-xs md:text-sm font-semibold flex flex-wrap justify-between items-center border-b ${
        highContrast ? 'bg-zinc-900 border-zinc-700 text-yellow-300' : 'bg-teal-950 border-teal-800 text-teal-100'
      }`}>
        <div className="flex items-center gap-2">
          <span className="bg-amber-500 text-teal-950 px-2 py-0.5 rounded font-bold text-xs uppercase tracking-wide">
            Academic Project
          </span>
          <span className="hidden sm:inline">North Eastern Region (NER) Dementia Care Initiative</span>
        </div>

        {/* Elderly Accessibility Controls */}
        <div className="flex items-center gap-3">
          {/* Text Size Switcher */}
          <div className="flex items-center gap-1 bg-teal-900/80 px-2 py-1 rounded-lg border border-teal-700">
            <Type className="w-4 h-4 text-amber-300 hidden xs:inline" />
            <span className="text-xs font-bold text-amber-200 mr-1">Font:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-0.5 text-xs font-bold rounded ${fontSize === 'normal' ? 'bg-amber-500 text-teal-950' : 'text-teal-200 hover:text-white'}`}
              title="Normal Text Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 text-sm font-bold rounded ${fontSize === 'large' ? 'bg-amber-500 text-teal-950' : 'text-teal-200 hover:text-white'}`}
              title="Large Text Size"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-0.5 text-base font-bold rounded ${fontSize === 'xlarge' ? 'bg-amber-500 text-teal-950' : 'text-teal-200 hover:text-white'}`}
              title="Extra Large Text Size"
            >
              A++
            </button>
          </div>

          {/* High Contrast Mode Toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
              highContrast
                ? 'bg-yellow-400 text-black border-yellow-300'
                : 'bg-teal-800 text-amber-300 border-amber-400 hover:bg-teal-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">{highContrast ? 'Standard' : 'High Contrast'}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Title Header */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 group text-left focus:ring-4 focus:ring-amber-400 p-1 rounded-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-teal-950 font-black text-2xl shadow-md group-hover:scale-105 transition-transform">
              NER
            </div>
            <div>
              <span className="text-xl md:text-2xl font-black tracking-tight block leading-tight text-white group-hover:text-amber-300 transition-colors">
                Dementia Care Platform
              </span>
              <span className="text-xs md:text-sm text-teal-200 block font-medium">
                Cognitive Gaming & Memory Assistance
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-base transition-all duration-150 border-2 cursor-pointer ${
                    isActive
                      ? highContrast
                        ? 'bg-yellow-400 text-black border-white shadow-lg'
                        : 'bg-amber-500 text-teal-950 border-amber-300 shadow-md font-extrabold scale-105'
                      : highContrast
                        ? 'bg-zinc-900 text-white border-zinc-700 hover:border-yellow-400'
                        : 'text-teal-100 border-transparent hover:bg-teal-800/80 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Hamburger Toggle Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 rounded-xl bg-teal-800 text-amber-300 hover:bg-teal-700 border-2 border-amber-400 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t-2 ${highContrast ? 'bg-black border-yellow-400' : 'bg-teal-900 border-amber-500'} px-4 pt-3 pb-6 space-y-2`}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold text-lg text-left transition-all border-2 ${
                  isActive
                    ? 'bg-amber-500 text-teal-950 border-amber-300 shadow-lg'
                    : 'text-white border-teal-800 bg-teal-950/60 hover:bg-teal-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
