import React, { useState } from 'react';
import { MemoryCardGame } from '../components/games/MemoryCardGame';
import { NumberMemoryGame } from '../components/games/NumberMemoryGame';
import { WordMatchingGame } from '../components/games/WordMatchingGame';
import { PictureMatchingGame } from '../components/games/PictureMatchingGame';
import { Gamepad2, Layers, Hash, BookOpen, Image } from 'lucide-react';

interface CognitiveGamesPageProps {
  highContrast: boolean;
}

type GameTab = 'memory-card' | 'number-memory' | 'word-match' | 'picture-match';

export const CognitiveGamesPage: React.FC<CognitiveGamesPageProps> = ({ highContrast }) => {
  const [activeTab, setActiveTab] = useState<GameTab>('memory-card');

  const tabs: { id: GameTab; label: string; icon: React.ReactNode; description: string }[] = [
    { id: 'memory-card', label: 'Memory Card', icon: <Layers className="w-6 h-6" />, description: 'Flip & match identical card pairs' },
    { id: 'number-memory', label: 'Number Memory', icon: <Hash className="w-6 h-6" />, description: 'Memorize and enter digit sequences' },
    { id: 'word-match', label: 'Word Matching', icon: <BookOpen className="w-6 h-6" />, description: 'Associate familiar objects & words' },
    { id: 'picture-match', label: 'Picture Matching', icon: <Image className="w-6 h-6" />, description: 'Identify matching visual patterns' },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Page Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border-4 shadow-lg ${
        highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-teal-900 border-amber-500 text-white'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-amber-400 text-teal-950 rounded-2xl">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black">Cognitive Games Hub</h1>
            <p className="text-base sm:text-lg text-teal-100 font-medium">
              4 simple memory training games designed for elderly dementia patients. Select a game tab below to play.
            </p>
          </div>
        </div>
      </div>

      {/* Large Tab Navigation Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`p-5 rounded-2xl border-4 text-left flex flex-col justify-between transition-all duration-150 cursor-pointer ${
                isActive
                  ? highContrast
                    ? 'bg-yellow-400 text-black border-white shadow-xl scale-102'
                    : 'bg-amber-500 text-teal-950 border-amber-300 shadow-xl font-bold scale-102'
                  : highContrast
                    ? 'bg-zinc-900 text-white border-zinc-700 hover:border-yellow-400'
                    : 'bg-white text-slate-800 border-teal-200 hover:bg-teal-50 shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2.5 rounded-xl ${isActive ? 'bg-teal-950 text-amber-300' : 'bg-teal-100 text-teal-800'}`}>
                  {t.icon}
                </div>
                <h3 className="text-xl font-extrabold">{t.label}</h3>
              </div>
              <p className={`text-xs md:text-sm font-medium ${isActive ? 'text-teal-950' : 'text-slate-600'}`}>
                {t.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Game Container */}
      <div>
        {activeTab === 'memory-card' && <MemoryCardGame highContrast={highContrast} />}
        {activeTab === 'number-memory' && <NumberMemoryGame highContrast={highContrast} />}
        {activeTab === 'word-match' && <WordMatchingGame highContrast={highContrast} />}
        {activeTab === 'picture-match' && <PictureMatchingGame highContrast={highContrast} />}
      </div>
    </div>
  );
};
