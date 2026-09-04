import React from 'react';
import { AudioButton } from '../components/AudioButton';
import { 
  GraduationCap, 
  MapPin, 
  Brain, 
  Gamepad2, 
  UserCheck, 
  ShieldAlert, 
  CheckCircle2
} from 'lucide-react';

interface AboutPageProps {
  highContrast: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({ highContrast }) => {
  const aboutText = "About the AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in North Eastern Region India. This academic project provides cognitive stimulation, daily medicine reminders, and caregiver oversight tailored specifically for elderly individuals.";

  return (
    <div className="space-y-10 pb-8">
      {/* Top Banner */}
      <div className={`p-6 sm:p-10 rounded-3xl border-4 shadow-xl text-center space-y-4 ${
        highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-teal-900 border-amber-500 text-white'
      }`}>
        <div className="inline-flex items-center gap-2 bg-amber-400 text-teal-950 px-4 py-1.5 rounded-full font-bold text-sm">
          <GraduationCap className="w-5 h-5" />
          <span>Academic Research Project</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black leading-tight max-w-4xl mx-auto">
          AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in North Eastern Region (NER)
        </h1>

        <p className="text-lg sm:text-xl text-teal-100 max-w-3xl mx-auto font-medium">
          Empowering elderly individuals living with early-stage dementia and cognitive impairment across the North Eastern Region of India.
        </p>

        <div className="pt-2 flex justify-center">
          <AudioButton textToRead={aboutText} label="Listen to About Overview" />
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Pillar 1: Purpose of Platform */}
        <div className={`p-8 rounded-3xl border-4 shadow-lg space-y-4 ${
          highContrast ? 'bg-zinc-900 border-yellow-400 text-white' : 'bg-white border-teal-200 text-slate-800'
        }`}>
          <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-800">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-teal-950">🎯 Purpose of the Platform</h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            The platform aims to bridge accessibility gaps in dementia care across the North Eastern Region by providing a friendly digital companion that combines non-pharmacological cognitive games with an easy daily memory assistant.
          </p>
          <ul className="space-y-2 text-base font-semibold text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              <span>Sustained short-term memory practice</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              <span>Reduced anxiety around daily medicine routines</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              <span>Bridge between patient and primary caregiver</span>
            </li>
          </ul>
        </div>

        {/* Pillar 2: Cognitive Gaming Strategy */}
        <div className={`p-8 rounded-3xl border-4 shadow-lg space-y-4 ${
          highContrast ? 'bg-zinc-900 border-yellow-400 text-white' : 'bg-white border-teal-200 text-slate-800'
        }`}>
          <div className="w-14 h-14 rounded-2xl bg-teal-100 border-2 border-teal-400 flex items-center justify-center text-teal-800">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-teal-950">🎮 Cognitive Gaming Strategy</h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Cognitive games stimulate neuroplasticity. The platform offers four targeted mini-games:
          </p>
          <ul className="space-y-2 text-base font-semibold text-slate-700">
            <li><strong>Memory Card:</strong> Enhances spatial & visual association.</li>
            <li><strong>Number Memory:</strong> Trains working memory sequence buffer.</li>
            <li><strong>Word Matching:</strong> Reinforces semantic language association.</li>
            <li><strong>Picture Matching:</strong> Improves visual pattern discrimination.</li>
          </ul>
        </div>

        {/* Pillar 3: Memory Assistance */}
        <div className={`p-8 rounded-3xl border-4 shadow-lg space-y-4 ${
          highContrast ? 'bg-zinc-900 border-yellow-400 text-white' : 'bg-white border-teal-200 text-slate-800'
        }`}>
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center text-emerald-800">
            <Brain className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-teal-950">🧠 Daily Memory Assistant</h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Designed specifically for elderly users who may experience mild cognitive impairment:
          </p>
          <ul className="space-y-2 text-base font-semibold text-slate-700">
            <li>• Prominent date display for temporal orientation.</li>
            <li>• Large checkable medicine reminders with exact dosages.</li>
            <li>• Voice read-aloud support for all text elements.</li>
            <li>• Offline local storage ensuring privacy and zero data leakage.</li>
          </ul>
        </div>

        {/* Pillar 4: Caregiver Support */}
        <div className={`p-8 rounded-3xl border-4 shadow-lg space-y-4 ${
          highContrast ? 'bg-zinc-900 border-yellow-400 text-white' : 'bg-white border-teal-200 text-slate-800'
        }`}>
          <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-800">
            <UserCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-teal-950">👨‍⚕️ Caregiver Support</h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Caregivers play an indispensable role in dementia care. The Caregiver Dashboard enables family members or clinical attendants to monitor task compliance, game completion rates, and average cognitive scores without intruding on patient autonomy.
          </p>
        </div>

      </div>

      {/* Focus on North Eastern Region (NER) Section */}
      <div className="bg-amber-50 border-4 border-amber-300 p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-8 h-8 text-amber-600" />
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
            Focus on Elderly Users in North Eastern Region (NER) of India
          </h2>
        </div>
        <p className="text-lg text-slate-800 leading-relaxed font-medium">
          The North Eastern Region (NER) comprising <strong>Assam, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, Arunachal Pradesh, and Sikkim</strong> has unique socio-cultural dynamics. Many elderly individuals live in semi-urban or rural environments where specialized geriatric memory care clinics may be distant. This application incorporates regional visual motifs, simple language, and high accessibility to serve elderly patients across NER effectively.
        </p>
      </div>

      {/* Strict Academic & Non-Medical Disclaimer Box */}
      <div className="bg-rose-50 border-4 border-rose-300 p-8 rounded-3xl space-y-3">
        <div className="flex items-center gap-3 text-rose-900 font-black text-xl">
          <ShieldAlert className="w-8 h-8 text-rose-600" />
          <span>Academic & Non-Medical Disclaimer</span>
        </div>
        <p className="text-base sm:text-lg text-rose-950 leading-relaxed font-medium">
          This project is strictly developed as an <strong>academic prototype</strong> for research and educational purposes. It does not provide medical diagnoses, clinical treatments, or health guarantees. Always consult a licensed neurologist or physician for professional medical evaluation and care plans.
        </p>
      </div>
    </div>
  );
};
