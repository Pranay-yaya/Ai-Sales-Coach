export interface User {
  id: string;
  name: string;
  email: string;
  role: 'sales_rep' | 'manager' | 'admin';
  avatar?: string;
}

export interface Conversation {
  id: string;
  userId: string;
  customerName: string;
  date: string;
  duration: number;
  transcript: string;
  status: 'completed' | 'in_progress' | 'scheduled';
}

export interface Analysis {
  id: string;
  conversationId: string;
  strengths: string[];
  improvements: string[];
  score: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  keyMoments: {
    timestamp: number;
    type: 'objection' | 'interest' | 'concern';
    text: string;
    suggestion?: string;
  }[];
  metrics: {
    wordCount: number;
    avgSentenceLength: number;
    questionCount: number;
    engagementScore: number;
    clarityScore: number;
  };
}

export interface PerformanceMetrics {
  dailyScores: {
    date: string;
    score: number;
  }[];
  averageScore: number;
  totalCalls: number;
  improvementRate: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
}

export interface AnalysisSettings {
  minimumWordCount: number;
  sentimentThreshold: number;
  engagementTarget: number;
  enabledMetrics: string[];
}