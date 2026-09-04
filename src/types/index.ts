export type SectionType = 'home' | 'games' | 'assistant' | 'caregiver' | 'progress' | 'about';

export type TaskCategory = 'medicine' | 'appointment' | 'routine' | 'note';

export interface TaskItem {
  id: string;
  title: string;
  category: TaskCategory;
  time?: string;
  date: string;
  completed: boolean;
  notes?: string;
  dosage?: string;
  location?: string;
}

export interface GameResult {
  id: string;
  gameId: 'memory-card' | 'number-memory' | 'word-match' | 'picture-match';
  gameTitle: string;
  score: number;
  maxScore: number;
  accuracy: number;
  date: string;
  timeSpentSeconds: number;
}

export interface CaregiverPatient {
  name: string;
  age: number;
  gender: string;
  location: string;
  region: string;
  caregiverName: string;
  relation: string;
  emergencyContact: string;
  stage: string;
}

export interface FontSizeOption {
  id: 'normal' | 'large' | 'xlarge';
  label: string;
}

export interface DailyProgress {
  date: string;
  dayName: string;
  score: number;
  gamesCompleted: number;
  tasksCompleted: number;
  totalTasks: number;
}
