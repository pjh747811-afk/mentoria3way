export type TabType = 'home' | 'mentors' | 'grants' | 'my-mentoring' | 'profile';

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  careerYears: number;
  category: 'dev' | 'pm' | 'design' | 'marketing' | 'data' | 'startup' | 'ir' | 'hr';
  categoryLabel: string;
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  satisfactionRate: number;
  tags: string[];
  introduction: string;
  isInstantAvailable: boolean;
  recommendedFor: string[];
  nextAvailableTime: string;
  priceText: string;
  voucherSupported: boolean;
}

export interface Grant {
  id: string;
  title: string;
  agency: string;
  category: 'startup' | 'rnd' | 'voucher' | 'marketing' | 'employment';
  categoryLabel: string;
  dDay: number;
  matchScore: number;
  maxFundingText: string;
  description: string;
  eligibility: string;
  badgeType: 'urgent' | 'recommended' | 'verified';
  tags: string[];
  mentoringLinked: boolean;
}

export interface MentoringSession {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  mentorRole: string;
  categoryLabel: string;
  topic: string;
  dateStr: string;
  timeStr: string;
  status: 'upcoming' | 'completed' | 'waiting' | 'cancelled';
  statusLabel: string;
  meetLink?: string;
  canJoin?: boolean;
  canReview?: boolean;
  reviewed?: boolean;
  questionsSubmitted?: string;
  goals?: string[];
  portfolioUrl?: string;
}

export interface UserProfile {
  name: string;
  level: number;
  levelName: string;
  bio: string;
  avatarUrl: string;
  voucherPoints: number;
  voucherRemaining: number;
  activeCount: number;
  completedCount: number;
  bookmarkedCount: number;
  targetCareer: string;
  tags: string[];
}
