import React, { useState, useEffect } from 'react';
import { getWeeklyStats } from '../utils/storage';
import { 
  TrendingUp, 
  ArrowUpRight,
  Brain,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface ProgressPageProps {
  highContrast: boolean;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({ highContrast }) => {
  const [stats, setStats] = useState(getWeeklyStats());

  useEffect(() => {
    setStats(getWeeklyStats());
  }, []);

  const latestDailyScore = stats.dailyProgress[stats.dailyProgress.length - 1]?.score || 85;

  return (
    <div className="space-y-8 pb-8">
      {/* Top Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border-4 shadow-xl ${
        highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-teal-900 border-amber-500 text-white'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-amber-400 text-teal-950 rounded-2xl">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black">Cognitive Progress & Analytics</h1>
            <p className="text-base sm:text-lg text-teal-100 font-medium">
              Daily and weekly performance scores tracking cognitive improvement over time.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white border-4 border-amber-400 p-6 rounded-3xl shadow-lg text-center">
          <div className="text-sm font-extrabold text-amber-800 uppercase tracking-wide">Daily Score (Today)</div>
          <div className="text-5xl font-black text-amber-600 my-2">{latestDailyScore} / 100</div>
          <div className="text-xs font-bold text-slate-500">Based on today's game rounds</div>
        </div>

        <div className="bg-white border-4 border-teal-300 p-6 rounded-3xl shadow-lg text-center">
          <div className="text-sm font-extrabold text-teal-800 uppercase tracking-wide">Weekly Average Score</div>
          <div className="text-5xl font-black text-teal-900 my-2">{stats.avgScore} / 100</div>
          <div className="text-xs font-bold text-slate-500">7-Day average performance</div>
        </div>

        <div className="bg-white border-4 border-emerald-400 p-6 rounded-3xl shadow-lg text-center">
          <div className="text-sm font-extrabold text-emerald-800 uppercase tracking-wide">Improvement Rate</div>
          <div className="text-5xl font-black text-emerald-600 my-2 flex items-center justify-center gap-1">
            <span>+{stats.improvementPercent}%</span>
            <ArrowUpRight className="w-8 h-8 text-emerald-600 stroke-[3]" />
          </div>
          <div className="text-xs font-bold text-slate-500">Positive cognitive trend</div>
        </div>

        <div className="bg-white border-4 border-purple-300 p-6 rounded-3xl shadow-lg text-center">
          <div className="text-sm font-extrabold text-purple-800 uppercase tracking-wide">Total Games Completed</div>
          <div className="text-5xl font-black text-purple-700 my-2">{stats.totalGames}</div>
          <div className="text-xs font-bold text-slate-500">Lifetime play sessions</div>
        </div>

      </div>

      {/* Performance Bar Graph (Elderly-Friendly Responsive Custom Chart) */}
      <div className={`p-6 sm:p-8 rounded-3xl border-4 shadow-xl ${
        highContrast ? 'bg-zinc-900 border-yellow-400 text-white' : 'bg-white border-teal-200 text-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-teal-900 flex items-center gap-3">
              📊 7-Day Performance Chart
            </h2>
            <p className="text-base text-slate-600">Visual score breakdown across the current week</p>
          </div>

          <div className="flex items-center gap-4 text-sm font-bold">
            <span className="flex items-center gap-1.5 text-teal-800">
              <span className="w-4 h-4 rounded bg-amber-500 inline-block"></span> Score (0-100)
            </span>
          </div>
        </div>

        {/* Custom Responsive SVG & Bar Graph Chart */}
        <div className="space-y-6">
          <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-64 sm:h-80 pt-6 px-2 border-b-4 border-slate-300">
            {stats.dailyProgress.map((dp, i) => {
              const heightPercent = Math.max(20, dp.score);
              const isToday = i === stats.dailyProgress.length - 1;

              return (
                <div key={dp.date} className="flex flex-col items-center h-full justify-end group">
                  {/* Hover score badge */}
                  <span className={`text-xs sm:text-sm font-extrabold mb-2 px-2 py-0.5 rounded-lg border shadow-sm ${
                    isToday ? 'bg-amber-500 text-teal-950 border-amber-300 font-black scale-110' : 'bg-slate-100 text-slate-800 border-slate-300'
                  }`}>
                    {dp.score}
                  </span>

                  {/* Bar element */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[3.5rem] rounded-t-2xl transition-all duration-500 shadow-md group-hover:brightness-110 ${
                      isToday
                        ? 'bg-gradient-to-t from-amber-600 to-amber-400 border-2 border-amber-300'
                        : 'bg-gradient-to-t from-teal-800 to-teal-600 border-2 border-teal-500'
                    }`}
                  />

                  {/* Day Label */}
                  <div className="mt-3 text-center">
                    <span className={`block font-black text-sm sm:text-base ${isToday ? 'text-amber-600 underline' : 'text-slate-700'}`}>
                      {dp.dayName}
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-500 block font-medium">
                      {dp.gamesCompleted} games
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2 text-sm text-slate-500 font-medium">
            💡 Higher bars indicate stronger cognitive recall and accuracy on game tasks.
          </div>
        </div>
      </div>

      {/* Cognitive Skill Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-teal-50 border-4 border-teal-300 rounded-3xl space-y-2">
          <div className="w-12 h-12 bg-teal-700 text-amber-300 rounded-2xl flex items-center justify-center font-bold">
            <Brain className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-teal-950">Visual Memory</h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            Card matching accuracy reached <strong>95%</strong>, showing consistent spatial location recall.
          </p>
        </div>

        <div className="p-6 bg-amber-50 border-4 border-amber-300 rounded-3xl space-y-2">
          <div className="w-12 h-12 bg-amber-500 text-teal-950 rounded-2xl flex items-center justify-center font-bold">
            <Zap className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-amber-950">Short-Term Recall</h3>
          <p className="text-slate-800 text-sm leading-relaxed">
            Digit sequence recall average length expanded from 3 to 4 numbers.
          </p>
        </div>

        <div className="p-6 bg-emerald-50 border-4 border-emerald-300 rounded-3xl space-y-2">
          <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-emerald-950">Language & Word Matching</h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            Everyday household word associations completed with <strong>100% accuracy</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
