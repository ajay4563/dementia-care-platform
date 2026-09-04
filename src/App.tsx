import { useState, useEffect } from 'react';
import type { SectionType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CognitiveGamesPage } from './pages/CognitiveGamesPage';
import { MemoryAssistantPage } from './pages/MemoryAssistantPage';
import { CaregiverDashboardPage } from './pages/CaregiverDashboardPage';
import { ProgressPage } from './pages/ProgressPage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('home');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [apiStatus, setApiStatus] = useState<string>('Checking backend connection...');

  // Sync high contrast mode class to root body
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Backend connection check
  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then((res) => res.json())
      .then((data) => setApiStatus(`🟢 ${data.message} (${data.database})`))
      .catch(() => setApiStatus('🔴 Backend Not Connected! Make sure FastAPI server is running.'));
  }, []);

  const fontClass = fontSize === 'xlarge' 
    ? 'font-scale-xlarge' 
    : fontSize === 'large' 
      ? 'font-scale-large' 
      : 'font-scale-normal';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${fontClass} ${
      highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />

      {/* Backend Live Status Indicator */}
      <div className="bg-slate-800 text-white text-xs text-center py-1.5 font-medium tracking-wide">
        System Status: {apiStatus}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeSection === 'home' && (
          <HomePage setActiveSection={setActiveSection} highContrast={highContrast} />
        )}
        {activeSection === 'games' && (
          <CognitiveGamesPage highContrast={highContrast} />
        )}
        {activeSection === 'assistant' && (
          <MemoryAssistantPage highContrast={highContrast} />
        )}
        {activeSection === 'caregiver' && (
          <CaregiverDashboardPage highContrast={highContrast} />
        )}
        {activeSection === 'progress' && (
          <ProgressPage highContrast={highContrast} />
        )}
        {activeSection === 'about' && (
          <AboutPage highContrast={highContrast} />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveSection={setActiveSection} highContrast={highContrast} />
    </div>
  );
}

export default App;