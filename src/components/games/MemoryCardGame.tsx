import React, { useState } from 'react';
import { AudioButton } from '../AudioButton';
import { saveGameResult } from '../../utils/storage';
import confetti from 'canvas-confetti';
import { 
  Play, 
  RotateCcw, 
  Trophy, 
  HelpCircle, 
  CheckCircle, 
  Apple, 
  Sun, 
  Flower2, 
  Car, 
  Smile, 
  Bell
} from 'lucide-react';

interface MemoryCardGameProps {
  highContrast: boolean;
  onGameComplete?: () => void;
}

interface Card {
  id: number;
  iconIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const ICONS = [
  { icon: Apple, label: 'Red Apple', color: 'text-red-500' },
  { icon: Sun, label: 'Bright Sun', color: 'text-amber-500' },
  { icon: Flower2, label: 'Lotus Flower', color: 'text-pink-500' },
  { icon: Car, label: 'Blue Car', color: 'text-blue-500' },
  { icon: Smile, label: 'Happy Face', color: 'text-emerald-500' },
  { icon: Bell, label: 'Ring Bell', color: 'text-purple-500' },
];

export const MemoryCardGame: React.FC<MemoryCardGameProps> = ({ highContrast, onGameComplete }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'completed'>('idle');
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  const instructions = "Memory Card Game Instructions: Click on two cards to flip them over. If the pictures match, they remain open. Try to find all matching pairs in as few moves as possible!";

  const initializeGame = () => {
    // Generate 6 pairs (12 cards)
    const cardPairs: Card[] = [];
    let id = 0;
    ICONS.forEach((_, index) => {
      cardPairs.push({ id: id++, iconIndex: index, isFlipped: false, isMatched: false });
      cardPairs.push({ id: id++, iconIndex: index, isFlipped: false, isMatched: false });
    });

    // Shuffle cards
    const shuffled = [...cardPairs].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setScore(0);
    setStartTime(Date.now());
    setGameState('playing');
  };

  const handleCardClick = (index: number) => {
    if (gameState !== 'playing' || cards[index].isFlipped || cards[index].isMatched || flippedCards.length === 2) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstIndex, secondIndex] = newFlipped;

      if (newCards[firstIndex].iconIndex === newCards[secondIndex].iconIndex) {
        // Match found!
        setTimeout(() => {
          newCards[firstIndex].isMatched = true;
          newCards[secondIndex].isMatched = true;
          setCards([...newCards]);
          setFlippedCards([]);

          // Check if all matched
          const allMatched = newCards.every(c => c.isMatched);
          if (allMatched) {
            handleWin(moves + 1);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards([...newCards]);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleWin = (finalMoves: number) => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    // Score calculation: 100 max, minus moves penalty
    const calculatedScore = Math.max(50, Math.min(100, 100 - (finalMoves - 6) * 5));
    setScore(calculatedScore);
    setGameState('completed');

    // Save score to localStorage
    saveGameResult({
      gameId: 'memory-card',
      gameTitle: 'Memory Card Game',
      score: calculatedScore,
      maxScore: 100,
      accuracy: Math.round((6 / finalMoves) * 100),
      date: new Date().toISOString(),
      timeSpentSeconds: elapsed
    });

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
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
            🃏 Memory Card Game
          </h3>
          <p className="text-base text-slate-600">Flip cards and match identical pairs</p>
        </div>

        <AudioButton textToRead={instructions} label="Read Instructions" />
      </div>

      {/* Instructions Box */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <HelpCircle className="w-7 h-7 text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="text-base md:text-lg font-medium text-amber-950">
          <strong>Instructions:</strong> Tap any card to flip it over. Find two matching pictures to complete a pair!
        </p>
      </div>

      {/* IDLE STATE */}
      {gameState === 'idle' && (
        <div className="text-center py-12 space-y-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300">
          <Trophy className="w-20 h-20 text-amber-500 mx-auto animate-bounce" />
          <h4 className="text-2xl md:text-3xl font-bold text-slate-800">Ready to test your memory?</h4>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Exercise your visual memory with 6 simple matching card pairs.
          </p>
          <button
            onClick={initializeGame}
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-teal-950 font-black text-2xl px-10 py-5 rounded-2xl border-4 border-amber-300 shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Play className="w-8 h-8 fill-current" />
            <span>Start Card Game</span>
          </button>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && (
        <div>
          <div className="flex justify-between items-center mb-6 bg-teal-50 border-2 border-teal-200 p-4 rounded-xl">
            <span className="text-xl font-bold text-teal-900">
              Moves: <strong className="text-amber-600 text-2xl">{moves}</strong>
            </span>
            <button
              onClick={initializeGame}
              className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-2 rounded-xl text-base"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Restart</span>
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {cards.map((card, index) => {
              const IconComp = ICONS[card.iconIndex].icon;
              const isRevealed = card.isFlipped || card.isMatched;

              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(index)}
                  disabled={card.isMatched}
                  className={`h-28 sm:h-36 rounded-2xl border-4 text-center flex flex-col items-center justify-center transition-all transform duration-300 cursor-pointer ${
                    card.isMatched
                      ? 'bg-emerald-100 border-emerald-400 opacity-80'
                      : isRevealed
                        ? 'bg-white border-amber-400 shadow-lg scale-95'
                        : 'bg-teal-800 hover:bg-teal-700 border-teal-600 shadow-md hover:scale-105'
                  }`}
                >
                  {isRevealed ? (
                    <div className="flex flex-col items-center gap-1">
                      <IconComp className={`w-10 h-10 sm:w-14 sm:h-14 ${ICONS[card.iconIndex].color}`} />
                      <span className="text-xs sm:text-sm font-bold text-slate-700">{ICONS[card.iconIndex].label}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-teal-200">
                      <HelpCircle className="w-10 h-10" />
                      <span className="text-xs font-bold mt-1">Tap to Flip</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* COMPLETED RESULT STATE */}
      {gameState === 'completed' && (
        <div className="text-center py-10 space-y-6 bg-emerald-50 border-4 border-emerald-400 rounded-3xl p-6">
          <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle className="w-12 h-12" />
          </div>

          <div>
            <h4 className="text-3xl font-black text-emerald-950 mb-2">🎉 Wonderful Job!</h4>
            <p className="text-xl text-emerald-800">You matched all cards successfully!</p>
          </div>

          <div className="bg-white border-2 border-emerald-300 rounded-2xl p-6 max-w-sm mx-auto shadow-md">
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">Final Game Score</div>
            <div className="text-5xl font-black text-amber-600 my-2">{score} / 100</div>
            <p className="text-base text-slate-700">Completed in <strong>{moves} moves</strong></p>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={initializeGame}
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
