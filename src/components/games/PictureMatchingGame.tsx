import React, { useState } from 'react';
import { AudioButton } from '../AudioButton';
import { saveGameResult } from '../../utils/storage';
import confetti from 'canvas-confetti';
import { 
  Play, 
  RotateCcw, 
  Trophy, 
  CheckCircle, 
  HelpCircle,
  Sun,
  Trees,
  CloudRain,
  Mountain,
  Bird,
  Music
} from 'lucide-react';

interface PictureMatchingGameProps {
  highContrast: boolean;
  onGameComplete?: () => void;
}

interface PictureItem {
  id: string;
  name: string;
  category: string;
  icon: any;
  color: string;
}

const ITEMS: PictureItem[] = [
  { id: '1', name: 'Assam Tea Garden', category: 'Nature', icon: Trees, color: 'text-emerald-600 bg-emerald-100 border-emerald-300' },
  { id: '2', name: 'Bright Morning Sun', category: 'Sky', icon: Sun, color: 'text-amber-600 bg-amber-100 border-amber-300' },
  { id: '3', name: 'NER Monsoon Rain', category: 'Weather', icon: CloudRain, color: 'text-blue-600 bg-blue-100 border-blue-300' },
  { id: '4', name: 'Himalayan Mountain', category: 'Land', icon: Mountain, color: 'text-purple-600 bg-purple-100 border-purple-300' },
  { id: '5', name: 'Hornbill Bird', category: 'Fauna', icon: Bird, color: 'text-orange-600 bg-orange-100 border-orange-300' },
  { id: '6', name: 'Bihu Folk Music', category: 'Culture', icon: Music, color: 'text-rose-600 bg-rose-100 border-rose-300' },
];

export const PictureMatchingGame: React.FC<PictureMatchingGameProps> = ({ highContrast, onGameComplete }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'completed'>('idle');
  const [targetItem, setTargetItem] = useState<PictureItem | null>(null);
  const [options, setOptions] = useState<PictureItem[]>([]);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  const instructions = "Picture Matching Game Instructions: Look at the top main picture. Tap the matching picture from the choices below!";

  const startRound = (r: number) => {
    const target = ITEMS[(r - 1) % ITEMS.length];
    setTargetItem(target);

    // Pick 3 option choices including the target
    const shuffledOther = ITEMS.filter(i => i.id !== target.id).sort(() => Math.random() - 0.5).slice(0, 3);
    const roundOptions = [...shuffledOther, target].sort(() => Math.random() - 0.5);

    setOptions(roundOptions);
    setSelectedId(null);
  };

  const handleStart = () => {
    setRound(1);
    setScore(0);
    setCorrectCount(0);
    setStartTime(Date.now());
    setGameState('playing');
    startRound(1);
  };

  const handleSelect = (item: PictureItem) => {
    if (selectedId !== null || !targetItem) return;
    setSelectedId(item.id);

    const isMatch = item.id === targetItem.id;
    if (isMatch) {
      setCorrectCount(c => c + 1);
    }

    setTimeout(() => {
      if (round < 5) {
        setRound(r => r + 1);
        startRound(round + 1);
      } else {
        finishGame(isMatch ? correctCount + 1 : correctCount);
      }
    }, 1000);
  };

  const finishGame = (finalCorrect: number) => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const calculatedScore = Math.round((finalCorrect / 5) * 100);
    setScore(calculatedScore);
    setGameState('completed');

    saveGameResult({
      gameId: 'picture-match',
      gameTitle: 'Picture Matching Game',
      score: calculatedScore,
      maxScore: 100,
      accuracy: calculatedScore,
      date: new Date().toISOString(),
      timeSpentSeconds: elapsed
    });

    if (calculatedScore >= 80) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
    if (onGameComplete) onGameComplete();
  };

  return (
    <div className={`p-6 md:p-8 rounded-3xl border-4 shadow-xl ${
      highContrast ? 'bg-zinc-900 border-yellow-400 text-white' : 'bg-white border-teal-200 text-slate-800'
    }`}>
      {/* Game Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b-2 border-slate-200 pb-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-teal-900 flex items-center gap-3">
            🖼️ Picture Matching Game
          </h3>
          <p className="text-base text-slate-600">Match the target picture with identical image icons</p>
        </div>

        <AudioButton textToRead={instructions} label="Read Instructions" />
      </div>

      {/* Instructions */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <HelpCircle className="w-7 h-7 text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="text-base md:text-lg font-medium text-amber-950">
          <strong>Instructions:</strong> Find and tap the picture that matches the big reference picture on top!
        </p>
      </div>

      {/* IDLE STATE */}
      {gameState === 'idle' && (
        <div className="text-center py-12 space-y-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300">
          <Trophy className="w-20 h-20 text-amber-500 mx-auto animate-pulse" />
          <h4 className="text-2xl md:text-3xl font-bold text-slate-800">Visual Pattern Recognition</h4>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Enhance visual processing speed with high-contrast North Eastern themed picture icons.
          </p>
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-teal-950 font-black text-2xl px-10 py-5 rounded-2xl border-4 border-amber-300 shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Play className="w-8 h-8 fill-current" />
            <span>Start Picture Game</span>
          </button>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && targetItem && (
        <div className="space-y-6 text-center">
          <div className="flex justify-between items-center bg-teal-50 border-2 border-teal-200 p-4 rounded-xl">
            <span className="text-lg font-bold text-teal-900">
              Round {round} of 5
            </span>
            <span className="text-base font-semibold text-slate-600">Find the matching picture</span>
          </div>

          {/* Big Target Picture */}
          <div className="max-w-xs mx-auto p-6 rounded-3xl border-4 border-amber-400 bg-amber-50 shadow-xl space-y-3">
            <div className="text-sm font-bold text-amber-800 uppercase tracking-wide">Target Picture to Match</div>
            {React.createElement(targetItem.icon, { className: `w-24 h-24 mx-auto ${targetItem.color.split(' ')[0]}` })}
            <div className="text-2xl font-black text-teal-950">{targetItem.name}</div>
          </div>

          <div className="text-lg font-bold text-slate-700">Which picture matches above?</div>

          {/* Option Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {options.map((opt) => {
              const IconComp = opt.icon;
              const isSelected = selectedId === opt.id;
              const isTarget = opt.id === targetItem.id;
              let cardBorder = "border-slate-300 hover:border-amber-400 bg-white";

              if (selectedId !== null) {
                if (isTarget) cardBorder = "border-emerald-500 bg-emerald-50 ring-4 ring-emerald-400";
                else if (isSelected) cardBorder = "border-rose-500 bg-rose-50";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt)}
                  disabled={selectedId !== null}
                  className={`p-6 rounded-2xl border-4 flex flex-col items-center justify-center gap-3 transition-transform cursor-pointer shadow-md active:scale-95 ${cardBorder}`}
                >
                  <IconComp className={`w-14 h-14 ${opt.color.split(' ')[0]}`} />
                  <span className="font-bold text-lg text-slate-800">{opt.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* COMPLETED RESULT STATE */}
      {gameState === 'completed' && (
        <div className="text-center py-10 space-y-6 bg-amber-50 border-4 border-amber-400 rounded-3xl p-6">
          <div className="w-20 h-20 bg-amber-500 text-teal-950 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle className="w-12 h-12" />
          </div>

          <div>
            <h4 className="text-3xl font-black text-teal-950 mb-2">Excellent Matching!</h4>
            <p className="text-xl text-teal-800">You matched {correctCount} out of 5 picture pairs!</p>
          </div>

          <div className="bg-white border-2 border-amber-300 rounded-2xl p-6 max-w-sm mx-auto shadow-md">
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">Final Game Score</div>
            <div className="text-5xl font-black text-amber-600 my-2">{score} / 100</div>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-teal-950 font-black text-xl px-8 py-4 rounded-2xl border-2 border-amber-300 shadow-lg transition-transform active:scale-95"
            >
              <RotateCcw className="w-6 h-6" />
              <span>Play Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
