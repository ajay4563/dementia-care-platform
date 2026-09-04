import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakText, stopSpeech } from '../utils/speech';

interface AudioButtonProps {
  textToRead: string;
  label?: string;
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ textToRead, label = "Read Aloud", className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
    } else {
      speakText(textToRead);
      setIsPlaying(true);
      // Auto reset playing status after estimated time
      const estimatedMs = Math.max(2000, (textToRead.length / 10) * 1000);
      setTimeout(() => setIsPlaying(false), estimatedMs);
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={label}
      title="Listen to instructions"
      className={`inline-flex items-center gap-2 bg-amber-100 text-amber-900 hover:bg-amber-200 border-2 border-amber-400 font-bold rounded-xl px-4 py-2 text-base md:text-lg transition-transform active:scale-95 cursor-pointer ${className}`}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-6 h-6 text-amber-700 animate-pulse" />
          <span>Stop Voice</span>
        </>
      ) : (
        <>
          <Volume2 className="w-6 h-6 text-amber-800" />
          <span>🔊 {label}</span>
        </>
      )}
    </button>
  );
};
