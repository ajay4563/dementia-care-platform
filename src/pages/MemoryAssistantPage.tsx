import React, { useState, useEffect } from 'react';
import type { TaskItem, TaskCategory } from '../types';
import { getTasks, saveTasks } from '../utils/storage';
import { AudioButton } from '../components/AudioButton';
import { 
  Brain, 
  Plus, 
  Calendar, 
  Clock, 
  Trash2, 
  X,
  Filter,
  Check
} from 'lucide-react';

interface MemoryAssistantPageProps {
  highContrast: boolean;
}

export const MemoryAssistantPage: React.FC<MemoryAssistantPageProps> = ({ highContrast }) => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | TaskCategory>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<TaskCategory>('medicine');
  const [newTime, setNewTime] = useState('09:00 AM');
  const [newDosage, setNewDosage] = useState('');
  const [newNotes, setNewNotes] = useState('');

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleToggleComplete = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(updated);
    saveTasks(updated);
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: TaskItem = {
      id: 'task_' + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      time: newTime,
      date: new Date().toISOString().split('T')[0],
      completed: false,
      dosage: newDosage.trim() || undefined,
      notes: newNotes.trim() || undefined
    };

    const updated = [newTask, ...tasks];
    setTasks(updated);
    saveTasks(updated);

    // Reset Form
    setNewTitle('');
    setNewCategory('medicine');
    setNewTime('09:00 AM');
    setNewDosage('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  // Date Formatting for elderly readability
  const todayDateFormatted = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const filteredTasks = selectedFilter === 'all' 
    ? tasks 
    : tasks.filter(t => t.category === selectedFilter);

  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  const categoryBadge = (cat: TaskCategory) => {
    switch (cat) {
      case 'medicine':
        return { label: '💊 Medicine', style: 'bg-rose-100 text-rose-900 border-rose-300' };
      case 'appointment':
        return { label: '🩺 Appointment', style: 'bg-blue-100 text-blue-900 border-blue-300' };
      case 'routine':
        return { label: '⏰ Daily Routine', style: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      case 'note':
        return { label: '📌 Important Note', style: 'bg-amber-100 text-amber-900 border-amber-300' };
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Top Date & Intro Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border-4 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
        highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-teal-900 border-amber-500 text-white'
      }`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
            <Calendar className="w-6 h-6" />
            <span>Today's Date: {todayDateFormatted}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">Daily Memory Assistant</h1>
          <p className="text-base sm:text-lg text-teal-100">
            Keep track of your medicine reminders, doctor visits, and daily tasks with large simple checkmarks.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full md:w-auto bg-amber-500 hover:bg-amber-400 text-teal-950 font-black text-xl px-8 py-5 rounded-2xl border-4 border-amber-300 shadow-xl flex items-center justify-center gap-3 transition-transform active:scale-95 cursor-pointer"
        >
          <Plus className="w-8 h-8 stroke-[3]" />
          <span>Add New Task</span>
        </button>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border-4 border-teal-200 p-5 rounded-2xl shadow text-center">
          <div className="text-sm font-bold text-slate-500">Total Tasks Today</div>
          <div className="text-4xl font-black text-teal-900 mt-1">{tasks.length}</div>
        </div>
        <div className="bg-amber-50 border-4 border-amber-300 p-5 rounded-2xl shadow text-center">
          <div className="text-sm font-bold text-amber-800">Pending Tasks</div>
          <div className="text-4xl font-black text-amber-700 mt-1">{pendingCount}</div>
        </div>
        <div className="bg-emerald-50 border-4 border-emerald-300 p-5 rounded-2xl shadow text-center">
          <div className="text-sm font-bold text-emerald-800">Completed Tasks</div>
          <div className="text-4xl font-black text-emerald-700 mt-1">{completedCount}</div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-slate-200 pb-3">
        <span className="font-bold text-slate-700 mr-2 flex items-center gap-1 text-base">
          <Filter className="w-5 h-5 text-teal-700" /> Filter:
        </span>
        {[
          { id: 'all', label: 'All Items' },
          { id: 'medicine', label: '💊 Medicines' },
          { id: 'appointment', label: '🩺 Appointments' },
          { id: 'routine', label: '⏰ Routines' },
          { id: 'note', label: '📌 Notes' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-bold text-base border-2 transition-all cursor-pointer ${
              selectedFilter === tab.id
                ? 'bg-teal-800 text-amber-300 border-amber-400 shadow'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="bg-slate-50 border-2 border-dashed border-slate-300 p-12 text-center rounded-3xl">
            <Brain className="w-16 h-16 text-slate-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-slate-700">No tasks found in this category.</h3>
            <p className="text-slate-500 mt-1">Tap "Add New Task" button above to create one!</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const badge = categoryBadge(task.category);
            return (
              <div
                key={task.id}
                className={`p-6 rounded-3xl border-4 shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  task.completed
                    ? 'bg-slate-100 border-slate-300 opacity-75'
                    : highContrast
                      ? 'bg-zinc-900 border-yellow-400 text-white'
                      : 'bg-white border-teal-200 text-slate-900 hover:border-amber-400'
                }`}
              >
                {/* Checkbox & Details */}
                <div className="flex items-start gap-4 flex-1">
                  <button
                    onClick={() => handleToggleComplete(task.id)}
                    className={`mt-1 flex-shrink-0 w-10 h-10 rounded-xl border-4 flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                      task.completed
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : 'bg-white border-teal-600 text-transparent hover:border-amber-500'
                    }`}
                    aria-label={task.completed ? "Mark as incomplete" : "Mark as completed"}
                  >
                    <Check className="w-7 h-7 stroke-[4]" />
                  </button>

                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-3 py-1 rounded-lg text-sm font-bold border ${badge.style}`}>
                        {badge.label}
                      </span>
                      {task.time && (
                        <span className="flex items-center gap-1 text-sm font-bold text-slate-600 bg-slate-200/80 px-2.5 py-1 rounded-lg">
                          <Clock className="w-4 h-4 text-teal-700" />
                          {task.time}
                        </span>
                      )}
                    </div>

                    <h3 className={`text-2xl font-black ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {task.title}
                    </h3>

                    {task.dosage && (
                      <p className="text-base font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl inline-block">
                        <strong>Dosage instructions:</strong> {task.dosage}
                      </p>
                    )}

                    {task.notes && (
                      <p className="text-base text-slate-600 font-medium">
                        📝 {task.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Action Tools: Voice Readout & Delete */}
                <div className="flex items-center gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                  <AudioButton 
                    textToRead={`${task.category} reminder: ${task.title}. ${task.dosage ? 'Dosage: ' + task.dosage : ''}. ${task.notes || ''}`} 
                    label="Read"
                  />

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-3 bg-rose-100 hover:bg-rose-200 text-rose-800 border-2 border-rose-300 rounded-xl text-base font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Delete task"
                  >
                    <Trash2 className="w-6 h-6 text-rose-700" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-4 border-amber-500 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
              <h3 className="text-2xl sm:text-3xl font-black text-teal-900 flex items-center gap-2">
                <Plus className="w-8 h-8 text-amber-500" />
                Add New Memory Task
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-800 bg-slate-100 rounded-xl"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-5">
              <div>
                <label className="block text-lg font-bold text-slate-800 mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Afternoon Blood Pressure Medicine"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-4 border-2 border-slate-300 rounded-xl text-lg font-medium focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-bold text-slate-800 mb-2">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as TaskCategory)}
                    className="w-full p-4 border-2 border-slate-300 rounded-xl text-lg font-medium bg-white focus:border-amber-500"
                  >
                    <option value="medicine">💊 Medicine</option>
                    <option value="appointment">🩺 Appointment</option>
                    <option value="routine">⏰ Routine</option>
                    <option value="note">📌 Note</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-bold text-slate-800 mb-2">
                    Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 02:30 PM"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-4 border-2 border-slate-300 rounded-xl text-lg font-medium focus:border-amber-500"
                  />
                </div>
              </div>

              {newCategory === 'medicine' && (
                <div>
                  <label className="block text-lg font-bold text-slate-800 mb-2">
                    Dosage & Pill Details
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Tablet after meal with water"
                    value={newDosage}
                    onChange={(e) => setNewDosage(e.target.value)}
                    className="w-full p-4 border-2 border-slate-300 rounded-xl text-lg font-medium focus:border-amber-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-lg font-bold text-slate-800 mb-2">
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Call caregiver if delayed"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-4 border-2 border-slate-300 rounded-xl text-lg font-medium focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-4 rounded-xl font-bold text-lg text-slate-700 bg-slate-100 hover:bg-slate-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl font-black text-xl text-teal-950 bg-amber-500 hover:bg-amber-400 border-2 border-amber-300 shadow-lg"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
