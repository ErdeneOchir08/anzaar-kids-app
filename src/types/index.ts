export type DimensionId = 'sensitivity' | 'regulation' | 'adaptability' | 'energy';

export interface DimensionInfo {
  id: DimensionId;
  name: string;
  nameEn: string;
  shortDesc: string;
  color: string;
  bgColor: string;
  iconName: string;
}

export type AgeGroup = 'toddler' | 'preschool' | 'school' | 'preteen';
export type Gender = 'boy' | 'girl' | 'prefer_not_to_say';

export interface ChildProfile {
  id?: string;
  name: string;
  ageGroup: AgeGroup;
  gender: Gender;
}

export interface QuestionOption {
  value: number;
  label: string;
}

export interface Question {
  id: number;
  dimension: DimensionId;
  prompt: string;
  subtext?: string;
  options?: QuestionOption[];
}

export type ArchetypeId = 
  | 'gentle_observer'
  | 'energetic_pioneer'
  | 'focused_inquirer'
  | 'social_radiant'
  | 'calm_harmonizer';

export interface DailyTrigger {
  title: string;
  scenario: string;
  recommendedResponse: string;
  avoidResponse: string;
}

export interface Archetype {
  id: ArchetypeId;
  title: string;
  titleEn: string;
  subtitle: string;
  badge: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  icon: string;
  summary: string;
  coreMotto: string;
  characteristics: string[];
  superpowers: string[];
  growthAreas: string[];
  parentingDos: string[];
  parentingDonts: string[];
  dailyTriggers: DailyTrigger[];
  bedtimeTip: string;
  crisisScript: {
    situation: string;
    step1Calm: string;
    step2Connect: string;
    step3Redirect: string;
  };
}

export interface DimensionScore {
  dimension: DimensionId;
  rawScore: number;
  maxScore: number;
  percentage: number;
  level: 'low' | 'moderate' | 'high';
  levelDescription: string;
}

export interface AssessmentResult {
  id: string;
  childProfile: ChildProfile;
  primaryArchetype: Archetype;
  secondaryArchetype?: Archetype;
  dimensionScores: Record<DimensionId, DimensionScore>;
  completedAt: string;
  isUnlocked: boolean;
  invoiceId?: string;
}

export interface PaymentInvoice {
  invoiceId: string;
  amount: number;
  currency: string;
  qrCodeUrl: string;
  qrImageData?: string;
  banks: {
    name: string;
    icon: string;
    link: string;
    appName: string;
  }[];
}
