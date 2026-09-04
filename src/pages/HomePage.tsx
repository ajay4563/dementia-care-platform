import React from 'react';
import type { SectionType } from '../types';
import { AudioButton } from '../components/AudioButton';
import { 
  Gamepad2, 
  Brain, 
  UserCheck, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Heart
} from 'lucide-react';

interface HomePageProps {
  setActiveSection: (section: SectionType) => void;
  highContrast: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveSection, highContrast }) => {
  const pageIntroText = "Welcome to the AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in North Eastern Region. Please choose an option below: Start Cognitive Games to play memory exercises, or Open Memory Assistant to view your daily tasks and medicines.";

  return (
    <div className="space-y-10 pb-8">
      {/* Hero Banner Section */}
      <section className={`rounded-3xl p-6 sm:p-10 border-4 shadow-xl transition-colors duration-200 ${
        highContrast
          ? 'bg-black border-yellow-400 text-white'
          : 'bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 border-amber-500 text-white'
      }`}>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Regional & Academic Tag */}
          <div className="inline-flex items-center gap-2 bg-amber-400 text-teal-950 px-4 py-2 rounded-full font-bold text-sm md:text-base shadow-sm">
            <MapPin className="w-5 h-5 text-teal-900" />
            <span>North Eastern Region (NER) Dementia Care Academic Initiative</span>
          </div>

          {/* Full Complete Title as requested */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
            AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in North Eastern Region (NER)
          </h1>

          {/* Short & Simple Description */}
          <p className="text-lg sm:text-2xl font-medium text-teal-100 max-w-3xl mx-auto leading-relaxed">
            A simple, clear, and elderly-friendly website to help train memory with enjoyable cognitive games, track daily medicines, and keep caregivers connected.
          </p>

          {/* Audio Read-Aloud Assistant Button */}
          <div className="pt-2 flex justify-center">
            <AudioButton textToRead={pageIntroText} label="Listen to Welcome Message" />
          </div>

          {/* TWO LARGE BUTTONS as requested */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            <button
              onClick={() => setActiveSection('games')}
              className="flex items-center justify-center gap-4 bg-amber-500 hover:bg-amber-400 text-teal-950 font-black text-xl sm:text-2xl px-8 py-6 rounded-2xl border-4 border-amber-300 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer group"
            >
              <Gamepad2 className="w-10 h-10 group-hover:rotate-12 transition-transform" />
              <span>Start Cognitive Games</span>
            </button>

            <button
              onClick={() => setActiveSection('assistant')}
              className="flex items-center justify-center gap-4 bg-teal-600 hover:bg-teal-500 text-white font-black text-xl sm:text-2xl px-8 py-6 rounded-2xl border-4 border-teal-300 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer group"
            >
              <Brain className="w-10 h-10 group-hover:scale-110 transition-transform" />
              <span>Open Memory Assistant</span>
            </button>
          </div>

        </div>
      </section>

      {/* Feature Cards Grid (Elderly-Friendly Cards with Large Touch Targets) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Cognitive Games */}
        <div className={`p-8 rounded-3xl border-4 shadow-lg flex flex-col justify-between transition-all hover:shadow-xl ${
          highContrast ? 'bg-zinc-900 border-yellow-400 text-white' : 'bg-white border-teal-200 text-slate-800'
        }`}>
          <div>
            <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-700 mb-6">
              <Gamepad2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-teal-900 mb-3">
              🎮 4 Fun Cognitive Games
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Play Memory Card, Number Memory, Word Match, and Picture Match. Simple instructions with large text to keep your mind active every day.
            </p>
            <ul className="space-y-3 mb-6 text-base font-semibold text-slate-700">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0" />
                <span>Memory Card Matching</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0" />
                <span>Number Sequence Recall</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0" />
                <span>Word & Object Association</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0" />
                <span>Picture Pattern Recognition</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setActiveSection('games')}
            className="w-full bg-teal-800 hover:bg-teal-700 text-amber-300 font-extrabold text-xl py-4 rounded-2xl border-2 border-teal-600 flex items-center justify-center gap-3 shadow transition-colors"
          >
            <span>Go to Games Hub</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Card 2: Memory Assistant */}
        <div className={`p-8 rounded-3xl border-4 shadow-lg flex flex-col justify-between transition-all hover:shadow-xl ${
          highContrast ? 'bg-zinc-900 border-yellow-400 text-white' : 'bg-white border-amber-200 text-slate-800'
        }`}>
          <div>
            <div className="w-16 h-16 rounded-2xl bg-teal-100 border-2 border-teal-400 flex items-center justify-center text-teal-700 mb-6">
              <Brain className="w-10 h-10" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-teal-900 mb-3">
              🧠 Daily Memory Assistant
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Never forget your daily routine. Check today's date, medicine reminders, upcoming doctor appointments, and family notes easily.
            </p>
            <ul className="space-y-3 mb-6 text-base font-semibold text-slate-700">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <span>Medicine Schedule with Dosage</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <span>Doctor Appointments & Tele-consults</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <span>One-Tap Task Completion</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <span>Add & Save Custom Daily Notes</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setActiveSection('assistant')}
            className="w-full bg-amber-500 hover:bg-amber-400 text-teal-950 font-extrabold text-xl py-4 rounded-2xl border-2 border-amber-300 flex items-center justify-center gap-3 shadow transition-colors"
          >
            <span>Open Memory Assistant</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

      </section>

      {/* Quick Navigation Banner for Caregivers & Analytics */}
      <section className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-lg">
            <UserCheck className="w-6 h-6 text-teal-700" />
            <span>Caregiver & Family Access</span>
          </div>
          <h3 className="text-2xl font-black text-teal-950">
            Caregiver Dashboard & Cognitive Progress Reports
          </h3>
          <p className="text-base md:text-lg text-slate-700">
            Caregivers can review completed game scores, medicine compliance status, and weekly cognitive performance charts.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <button
            onClick={() => setActiveSection('caregiver')}
            className="flex-1 md:flex-none bg-teal-900 hover:bg-teal-800 text-white font-bold text-lg px-6 py-4 rounded-xl border-2 border-teal-700 flex items-center justify-center gap-2 shadow"
          >
            <UserCheck className="w-5 h-5 text-amber-400" />
            <span>Caregiver Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveSection('progress')}
            className="flex-1 md:flex-none bg-white hover:bg-slate-100 text-teal-900 font-bold text-lg px-6 py-4 rounded-xl border-2 border-teal-300 flex items-center justify-center gap-2 shadow"
          >
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <span>View Progress</span>
          </button>
        </div>
      </section>

      {/* Elderly Accessibility Guarantees */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-white border-2 border-slate-200 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-lg text-teal-900 mb-1">Large Clear Text</h4>
          <p className="text-sm text-slate-600">High readability fonts with customizable size controls.</p>
        </div>

        <div className="p-6 bg-white border-2 border-slate-200 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-lg text-teal-900 mb-1">Voice Assistance</h4>
          <p className="text-sm text-slate-600">Audio read-aloud buttons for all game instructions.</p>
        </div>

        <div className="p-6 bg-white border-2 border-slate-200 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-lg text-teal-900 mb-1">Local & Private</h4>
          <p className="text-sm text-slate-600">All tasks and game progress are stored safely on your device.</p>
        </div>
      </section>

    </div>
  );
};
