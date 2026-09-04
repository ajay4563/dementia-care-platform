import React, { useState, useEffect } from 'react';
import { AudioButton } from '../AudioButton';
import { saveGameResult } from '../../utils/storage';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Trophy, CheckCircle, HelpCircle, Delete } from 'lucide-react';

interface NumberMemoryGameProps {
  highContrast: boolean;
  onGameComplete?: () => void;
}

export const NumberMemoryGame: React.FC<NumberMemoryGameProps> = ({ highContrast, onGameComplete }) => {
  const [gameState, setGameState] = useState<'idle' | 'memorize' | 'recall' | 'completed'>('idle');
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [startTime, setStartTime] = useState<number>(0);

  const instructions = "Number Memory Game Instructions: Memorize the sequence of numbers shown on screen before the timer runs out. Then, tap the keypad numbers to repeat the sequence!";

  const startLevel = (currentLevel: number) => {
    const length = Math.min(3 + currentLevel - 1, 6);
    const newSeq: number[] = [];
    for (let i = 0; i < length; i++) {
      newSeq.push(Math.floor(Math.random() * 9) + 1);
    }

    setSequence(newSeq);
    setUserSequence([]);
    setTimeLeft(Math.max(3, 6 - Math.floor(currentLevel / 2)));
    setGameState('memorize');
  };

  const handleStart = () => {
    setLevel(1);
    setScore(0);
    setStartTime(Date.now());
    startLevel(1);
  };

  useEffect(() => {
    let timer: any;
    if (gameState === 'memorize') {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      } else {
        setGameState('recall');
      }
    }
    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  const handleKeyPress = (num: number) => {
    if (gameState !== 'recall') return;

    const nextUserSeq = [...userSequence, num];
    setUserSequence(nextUserSeq);

    // Check if entry matches so far
    const currentIndex = nextUserSeq.length - 1;
    if (nextUserSeq[currentIndex] !== sequence[currentIndex]) {
      // Wrong number - end game
      finishGame(false);
      return;
    }

    // Check if level completed
    if (nextUserSeq.length === sequence.length) {
      if (level >= 4) {
        // Completed all 4 levels!
        finishGame(true);
      } else {
        // Move to next level
        setTimeout(() => {
          setLevel(l => l + 1);
          startLevel(level + 1);
        }, 600);
      }
    }
  };

  const handleDelete = () => {
    if (userSequence.length > 0) {
      setUserSequence(userSequence.slice(0, -1));
    }
  };

  const finishGame = (wonAllLevels: boolean) => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const finalScore = wonAllLevels ? 100 : Math.min(90, Math.max(40, level * 25));
    setScore(finalScore);
    setGameState('completed');

    saveGameResult({
      gameId: 'number-memory',
      gameTitle: 'Number Memory Game',
      score: finalScore,
      maxScore: 100,
      accuracy: Math.round((level / 4) * 100),
      date: new Date().toISOString(),
      timeSpentSeconds: elapsed
    });

    if (wonAllLevels) {
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
            🔢 Number Memory Game
          </h3>
          <p className="text-base text-slate-600">Remember numbers in correct sequence</p>
        </div>

        <AudioButton textToRead={instructions} label="Read Instructions" />
      </div>

      {/* Instructions */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <HelpCircle className="w-7 h-7 text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="text-base md:text-lg font-medium text-amber-950">
          <strong>Instructions:</strong> Look closely at the numbers. When they disappear, tap the number buttons in the exact same order!
        </p>
      </div>

      {/* IDLE STATE */}
      {gameState === 'idle' && (
        <div className="text-center py-12 space-y-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300">
          <Trophy className="w-20 h-20 text-amber-500 mx-auto animate-pulse" />
          <h4 className="text-2xl md:text-3xl font-bold text-slate-800">Test Your Short-Term Memory</h4>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Challenge yourself with progressive digit sequences starting from 3 numbers.
          </p>
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-teal-950 font-black text-2xl px-10 py-5 rounded-2xl border-4 border-amber-300 shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Play className="w-8 h-8 fill-current" />
            <span>Start Number Game</span>
          </button>
        </div>
      )}

      {/* MEMORIZE STATE */}
      {gameState === 'memorize' && (
        <div className="text-center py-10 space-y-6">
          <div className="text-lg font-bold text-amber-600">Round {level} of 4</div>
          <div className="text-sm font-semibold text-slate-500">Memorize this sequence before it disappears:</div>
          
          <div className="flex justify-center gap-4 my-6">
            {sequence.map((num, idx) => (
              <div 
                key={idx}
                className="w-16 h-20 sm:w-20 sm:h-24 bg-teal-800 text-amber-300 border-4 border-amber-400 rounded-2xl font-black text-4xl sm:text-5xl flex items-center justify-center shadow-lg animate-pulse"
              >
                {num}
              </div>
            ))}
          </div>

          <div className="text-xl font-bold text-teal-900">
            Hiding in: <strong className="text-3xl text-amber-600">{timeLeft}s</strong>
          </div>
        </div>
      )}

      {/* RECALL STATE */}
      {gameState === 'recall' && (
        <div className="text-center py-6 space-y-6">
          <div className="text-lg font-bold text-amber-600">Round {level} of 4</div>
          <div className="text-lg font-semibold text-slate-700">What were the numbers in order?</div>

          {/* Entered boxes */}
          <div className="flex justify-center gap-3 min-h-[5rem]">
            {sequence.map((_, idx) => (
              <div
                key={idx}
                className={`w-14 h-16 sm:w-16 sm:h-20 border-4 rounded-xl font-bold text-3xl sm:text-4xl flex items-center justify-center ${
                  userSequence[idx] !== undefined
                    ? 'bg-amber-100 border-amber-500 text-teal-950'
                    : 'bg-slate-100 border-slate-300 text-slate-400'
                }`}
              >
                {userSequence[idx] !== undefined ? userSequence[idx] : '?'}
              </div>
            ))}
          </div>

          {/* Elderly-Friendly Keypad */}
          <div className="max-w-xs mx-auto grid grid-cols-3 gap-3 pt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyPress(num)}
                className="h-16 sm:h-20 bg-teal-800 hover:bg-teal-700 text-white border-2 border-teal-600 rounded-2xl font-black text-3xl shadow-md active:scale-95 transition-transform"
              >
                {num}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={handleDelete}
              disabled={userSequence.length === 0}
              className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl flex items-center gap-2"
            >
              <Delete className="w-5 h-5" />
              <span>Backspace</span>
            </button>
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
            <h4 className="text-3xl font-black text-teal-950 mb-2">Round Finished!</h4>
            <p className="text-xl text-teal-800">You reached Round {level} out of 4.</p>
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
              <span>Try Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
