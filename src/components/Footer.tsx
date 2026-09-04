import React from 'react';
import type { SectionType } from '../types';
import { Heart, ShieldAlert, MapPin, GraduationCap } from 'lucide-react';

interface FooterProps {
  setActiveSection: (section: SectionType) => void;
  highContrast: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setActiveSection, highContrast }) => {
  return (
    <footer className={`mt-auto border-t-4 transition-colors duration-200 ${
      highContrast 
        ? 'bg-black text-white border-yellow-400' 
        : 'bg-teal-950 text-slate-200 border-amber-500'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Academic Project Context */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-8 h-8 text-amber-400" />
              <h3 className="text-xl font-bold text-white">Academic Project</h3>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-slate-300">
              <strong className="text-amber-300">AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in North Eastern Region (NER)</strong>
            </p>
            <div className="mt-4 flex items-center gap-2 text-amber-200 text-sm font-semibold">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>Tailored for Assam, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, Arunachal Pradesh & Sikkim</span>
            </div>
          </div>

          {/* Column 2: Quick Links for Elderly Navigation */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-amber-500 pb-2 inline-block">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-base font-semibold">
              <li>
                <button 
                  onClick={() => setActiveSection('home')} 
                  className="hover:text-amber-400 hover:underline transition-colors flex items-center gap-2 py-1"
                >
                  🏠 Home Page
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('games')} 
                  className="hover:text-amber-400 hover:underline transition-colors flex items-center gap-2 py-1"
                >
                  🎮 Cognitive Games (4 Games)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('assistant')} 
                  className="hover:text-amber-400 hover:underline transition-colors flex items-center gap-2 py-1"
                >
                  🧠 Daily Memory Assistant
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('caregiver')} 
                  className="hover:text-amber-400 hover:underline transition-colors flex items-center gap-2 py-1"
                >
                  👨‍⚕️ Caregiver Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('progress')} 
                  className="hover:text-amber-400 hover:underline transition-colors flex items-center gap-2 py-1"
                >
                  📊 Cognitive Progress Analytics
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('about')} 
                  className="hover:text-amber-400 hover:underline transition-colors flex items-center gap-2 py-1"
                >
                  ℹ️ About Platform & Research
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Medical & Project Disclaimer */}
          <div className="bg-teal-900/60 p-5 rounded-2xl border-2 border-amber-500/50">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-lg mb-2">
              <ShieldAlert className="w-6 h-6 text-amber-400" />
              <span>Academic & Non-Diagnostic Disclaimer</span>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              This platform is an academic prototype designed for cognitive stimulation and memory routine support for elderly individuals in NER India. 
              <strong> It does not provide medical diagnosis, treatment, or clinical claims.</strong> Always consult qualified healthcare professionals for medical evaluation.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-teal-800/80 text-center text-sm font-medium text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Academic Research Project. Designed for Elderly Dementia Care in NER.</p>
          <div className="flex items-center gap-1 text-slate-300">
            <span>Built with care</span>
            <Heart className="w-4 h-4 text-red-400 fill-current inline" />
            <span>for North Eastern India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
