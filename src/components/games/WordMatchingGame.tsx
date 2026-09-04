import React, { useState } from 'react';
import { AudioButton } from '../AudioButton';
import { saveGameResult } from '../../utils/storage';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Trophy, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface WordMatchingGameProps {
  highContrast: boolean;
  onGameComplete?: () => void;
}

interface Question {
  prompt: string;
  options: string[];
  correct: string;
  hint: string;
}

const QUESTIONS: Question[] = [
  {
    prompt: "Which item is used for drinking warm tea or water?",
    options: ["Cup / Glass", "Spoon", "Toothbrush", "Clock"],
    correct: "Cup / Glass",
    hint: "Think of what you hold when drinking Assam Tea."
  },
  {
    prompt: "Which object tells us what time of the day it is?",
    options: ["Wall Clock", "Spectacles", "Mirror", "Umbrella"],
    correct: "Wall Clock",
    hint: "It has numbers 1 to 12 and ticking hands."
  },
  {
    prompt: "What do you wear to protect yourself from rain?",
    options: ["Raincoat / Umbrella", "Blanket", "Socks", "Hat"],
    correct: "Raincoat / Umbrella",
    hint: "Useful during the monsoon rains in the North East."
  },
  {
    prompt: "Where do we keep fresh vegetables and food cool?",
    options: ["Refrigerator", "Wardrobe", "Bookshelf", "Suitcase"],
    correct: "Refrigerator",
    hint: "An electric appliance kept in the kitchen."
  },
  {
    prompt: "Which item helps us see clearly when reading?",
    options: ["Reading Glasses", "Comb", "Torch", "Pillow"],
    correct: "Reading Glasses",
    hint: "Worn over eyes when reading newspapers."
  }
];

export const WordMatchingGame: React.FC<WordMatchingGameProps> = ({ highContrast, onGameComplete }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'completed'>('idle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  const instructions = "Word Matching Game Instructions: Read the question prompt about an everyday item. Tap the correct answer from the 4 options below!";

  const handleStart = () => {
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setSelectedOption(null);
    setStartTime(Date.now());
    setGameState('playing');
  };

  const handleOptionSelect = (opt: string) => {
    if (selectedOption !== null) return; // Prevent double taps

    setSelectedOption(opt);
    const q = QUESTIONS[currentIndex];
    const correct = opt === q.correct;

    if (correct) {
      setCorrectCount(c => c + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < QUESTIONS.length) {
        setCurrentIndex(c => c + 1);
        setSelectedOption(null);
      } else {
        finishGame(correct ? correctCount + 1 : correctCount);
      }
    }, 1200);
  };

  const finishGame = (finalCorrect: number) => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const calculatedScore = Math.round((finalCorrect / QUESTIONS.length) * 100);
    setScore(calculatedScore);
    setGameState('completed');

    saveGameResult({
      gameId: 'word-match',
      gameTitle: 'Word Matching Game',
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

  const currentQ = QUESTIONS[currentIndex];

  return (
    <div className={`p-6 md:p-8 rounded-3xl border-4 shadow-xl ${
      highContrast ? 'bg-zinc-900 border-yellow-400 text-white' : 'bg-white border-teal-200 text-slate-800'
    }`}>
      {/* Game Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b-2 border-slate-200 pb-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-teal-900 flex items-center gap-3">
            📖 Word Matching Game
          </h3>
          <p className="text-base text-slate-600">Match daily object descriptions with correct words</p>
        </div>

        <AudioButton textToRead={instructions} label="Read Instructions" />
      </div>

      {/* Instructions */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <HelpCircle className="w-7 h-7 text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="text-base md:text-lg font-medium text-amber-950">
          <strong>Instructions:</strong> Read the question carefully and tap the big button with the correct matching answer!
        </p>
      </div>

      {/* IDLE STATE */}
      {gameState === 'idle' && (
        <div className="text-center py-12 space-y-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300">
          <Trophy className="w-20 h-20 text-amber-500 mx-auto animate-bounce" />
          <h4 className="text-2xl md:text-3xl font-bold text-slate-800">Everyday Vocabulary & Memory</h4>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Associate familiar household objects and daily activities with their correct names.
          </p>
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-teal-950 font-black text-2xl px-10 py-5 rounded-2xl border-4 border-amber-300 shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Play className="w-8 h-8 fill-current" />
            <span>Start Word Match</span>
          </button>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-teal-50 border-2 border-teal-200 p-4 rounded-xl">
            <span className="text-lg font-bold text-teal-900">
              Question {currentIndex + 1} of {QUESTIONS.length}
            </span>
            <AudioButton textToRead={currentQ.prompt} label="Read Question" />
          </div>

          <div className="bg-amber-100/70 border-4 border-amber-300 p-6 rounded-2xl text-center">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-teal-950 mb-2 leading-tight">
              "{currentQ.prompt}"
            </h4>
            <p className="text-base text-amber-900 font-medium italic">💡 Hint: {currentQ.hint}</p>
          </div>

          {/* 4 Large Touch Option Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              let btnStyle = "bg-white hover:bg-teal-50 border-teal-300 text-slate-800";
              
              if (selectedOption !== null) {
                if (opt === currentQ.correct) {
                  btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-lg scale-102";
                } else if (isSelected) {
                  btnStyle = "bg-rose-500 text-white border-rose-600";
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(opt)}
                  disabled={selectedOption !== null}
                  className={`p-6 rounded-2xl border-4 font-bold text-xl sm:text-2xl text-left flex items-center justify-between transition-all cursor-pointer shadow-md ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {selectedOption !== null && opt === currentQ.correct && (
                    <CheckCircle className="w-8 h-8 text-white flex-shrink-0" />
                  )}
                  {selectedOption !== null && isSelected && opt !== currentQ.correct && (
                    <XCircle className="w-8 h-8 text-white flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* COMPLETED RESULT STATE */}
      {gameState === 'completed' && (
        <div className="text-center py-10 space-y-6 bg-teal-50 border-4 border-teal-400 rounded-3xl p-6">
          <div className="w-20 h-20 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle className="w-12 h-12" />
          </div>

          <div>
            <h4 className="text-3xl font-black text-teal-950 mb-2">Great Effort!</h4>
            <p className="text-xl text-teal-800">You answered {correctCount} out of {QUESTIONS.length} correctly.</p>
          </div>

          <div className="bg-white border-2 border-teal-300 rounded-2xl p-6 max-w-sm mx-auto shadow-md">
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">Final Accuracy Score</div>
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
