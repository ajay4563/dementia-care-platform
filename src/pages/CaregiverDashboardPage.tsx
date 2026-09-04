import React, { useState, useEffect } from 'react';
import { getPatientProfile, getWeeklyStats, getGameResults, getTasks } from '../utils/storage';
import type { CaregiverPatient, GameResult, TaskItem } from '../types';
import { 
  UserCheck, 
  Phone, 
  Award, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  FileText,
  ShieldCheck,
  Activity
} from 'lucide-react';

interface CaregiverDashboardPageProps {
  highContrast: boolean;
}

export const CaregiverDashboardPage: React.FC<CaregiverDashboardPageProps> = ({ highContrast }) => {
  const [patient, setPatient] = useState<CaregiverPatient>(getPatientProfile());
  const [stats, setStats] = useState(getWeeklyStats());
  const [recentResults, setRecentResults] = useState<GameResult[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    setPatient(getPatientProfile());
    setStats(getWeeklyStats());
    setRecentResults(getGameResults());
    setTasks(getTasks());
  }, []);

  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const taskCompliancePercent = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="space-y-8 pb-8">
      {/* Top Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border-4 shadow-xl ${
        highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-teal-900 border-amber-500 text-white'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-teal-950 px-3 py-1 rounded-full text-xs font-black uppercase">
              <ShieldCheck className="w-4 h-4" /> Caregiver Supervision Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">Caregiver Monitoring Dashboard</h1>
            <p className="text-base sm:text-lg text-teal-100">
              Real-time cognitive gaming metrics, daily medicine adherence, and weekly trend reports.
            </p>
          </div>

          <div className="bg-teal-950/80 border-2 border-amber-400/60 p-4 rounded-2xl flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-full bg-amber-400 text-teal-950 flex items-center justify-center font-black text-2xl">
              RH
            </div>
            <div>
              <div className="text-xs text-amber-300 font-bold uppercase">Patient Profile</div>
              <div className="text-xl font-extrabold text-white">{patient.name}</div>
              <div className="text-xs text-teal-200">{patient.age} Yrs • {patient.location}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Information & Emergency Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Patient Details Card */}
        <div className="bg-white border-4 border-teal-200 p-6 rounded-3xl shadow space-y-3">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-lg border-b pb-2">
            <UserCheck className="w-6 h-6 text-amber-500" />
            <span>Patient Info</span>
          </div>
          <div className="space-y-2 text-base text-slate-700 font-medium">
            <div><strong className="text-slate-900">Name:</strong> {patient.name}</div>
            <div><strong className="text-slate-900">Age / Gender:</strong> {patient.age} Yrs ({patient.gender})</div>
            <div><strong className="text-slate-900">Region:</strong> {patient.region}</div>
            <div><strong className="text-slate-900">Diagnosis Stage:</strong> <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold text-sm">{patient.stage}</span></div>
          </div>
        </div>

        {/* Primary Caregiver Details */}
        <div className="bg-white border-4 border-teal-200 p-6 rounded-3xl shadow space-y-3">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-lg border-b pb-2">
            <Phone className="w-6 h-6 text-teal-600" />
            <span>Caregiver & Contact</span>
          </div>
          <div className="space-y-2 text-base text-slate-700 font-medium">
            <div><strong className="text-slate-900">Caregiver Name:</strong> {patient.caregiverName}</div>
            <div><strong className="text-slate-900">Relation:</strong> {patient.relation}</div>
            <div><strong className="text-slate-900">Emergency Phone:</strong> <a href={`tel:${patient.emergencyContact}`} className="text-teal-700 font-bold hover:underline">{patient.emergencyContact}</a></div>
            <div className="pt-1"><span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full">✓ Primary Contact Active</span></div>
          </div>
        </div>

        {/* Medicine Compliance Card */}
        <div className="bg-amber-50 border-4 border-amber-300 p-6 rounded-3xl shadow space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-lg border-b border-amber-200 pb-2">
            <Activity className="w-6 h-6 text-amber-600" />
            <span>Today's Task Adherence</span>
          </div>
          <div className="text-center py-2">
            <div className="text-4xl font-black text-amber-700">{taskCompliancePercent}%</div>
            <p className="text-sm font-semibold text-slate-700 mt-1">
              {completedTasks} completed out of {tasks.length} daily routines
            </p>
          </div>
        </div>

      </div>

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border-4 border-teal-200 p-6 rounded-3xl shadow text-center">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto mb-2">
            <Award className="w-7 h-7" />
          </div>
          <div className="text-3xl font-black text-teal-900">{stats.totalGames}</div>
          <div className="text-sm font-bold text-slate-600">Games Completed</div>
        </div>

        <div className="bg-white border-4 border-amber-300 p-6 rounded-3xl shadow text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div className="text-3xl font-black text-amber-600">{stats.avgScore} / 100</div>
          <div className="text-sm font-bold text-slate-600">Average Game Score</div>
        </div>

        <div className="bg-white border-4 border-emerald-300 p-6 rounded-3xl shadow text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="text-3xl font-black text-emerald-700">{completedTasks}</div>
          <div className="text-sm font-bold text-slate-600">Tasks Completed</div>
        </div>

        <div className="bg-white border-4 border-rose-300 p-6 rounded-3xl shadow text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center mx-auto mb-2">
            <Clock className="w-7 h-7" />
          </div>
          <div className="text-3xl font-black text-rose-700">{pendingTasks}</div>
          <div className="text-sm font-bold text-slate-600">Pending Tasks</div>
        </div>
      </div>

      {/* Recent Game Results Log Table */}
      <div className={`p-6 sm:p-8 rounded-3xl border-4 shadow-lg ${
        highContrast ? 'bg-zinc-900 border-yellow-400 text-white' : 'bg-white border-teal-200 text-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h2 className="text-2xl sm:text-3xl font-black text-teal-900 flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-500" />
            Recent Game Results
          </h2>
          <span className="text-sm font-bold text-slate-500">Live Local Storage History</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-900 text-white text-base">
                <th className="p-4 rounded-tl-xl font-bold">Game Title</th>
                <th className="p-4 font-bold">Date & Time</th>
                <th className="p-4 font-bold">Score</th>
                <th className="p-4 font-bold">Accuracy</th>
                <th className="p-4 rounded-tr-xl font-bold">Time Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-base font-semibold">
              {recentResults.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-500">
                    No game results recorded yet.
                  </td>
                </tr>
              ) : (
                recentResults.map((res) => (
                  <tr key={res.id} className="hover:bg-teal-50/50">
                    <td className="p-4 font-extrabold text-teal-950">{res.gameTitle}</td>
                    <td className="p-4 text-slate-600 text-sm">
                      {new Date(res.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="p-4">
                      <span className="bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-xl font-black">
                        {res.score} / {res.maxScore}
                      </span>
                    </td>
                    <td className="p-4 text-emerald-700 font-bold">{res.accuracy}%</td>
                    <td className="p-4 text-slate-600">{res.timeSpentSeconds}s</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Caregiver Clinical Notes */}
      <div className="bg-teal-50 border-4 border-teal-300 p-6 sm:p-8 rounded-3xl space-y-4">
        <h3 className="text-2xl font-black text-teal-950 flex items-center gap-2">
          <FileText className="w-7 h-7 text-teal-700" />
          Caregiver Observation Notes
        </h3>
        <p className="text-slate-700 text-base leading-relaxed">
          Patient shows high engagement during morning sessions of Word and Picture Matching. 
          Memory Card game scores have improved by <strong>+18.5%</strong> over the past week. 
          Ensure afternoon blood pressure medicine is logged promptly.
        </p>
      </div>
    </div>
  );
};
