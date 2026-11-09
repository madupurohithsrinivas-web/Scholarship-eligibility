export type LogicOperator = 'AND' | 'OR' | 'NOT' | 'IMPLIES' | 'IFF';

export interface AtomicProposition {
  id: string; // e.g., 'P', 'Q', 'R'
  name: string; // e.g., 'Class 12th Board Academic Distinction (≥ 80%)'
  shortDesc: string;
  category: 'academic' | 'standardized' | 'financial' | 'extracurricular' | 'prerequisite' | 'conduct';
  value: boolean; // Current truth value
  inputType?: 'number' | 'boolean' | 'select';
  thresholdText?: string;
}

export type ASTNode =
  | { type: 'variable'; variable: string }
  | { type: 'not'; operand: ASTNode }
  | { type: 'binary'; operator: LogicOperator; left: ASTNode; right: ASTNode };

export interface ProgramRule {
  id: string;
  name: string;
  type: 'admission' | 'scholarship' | 'grant' | 'fellowship';
  awardAmount?: string;
  deadline?: string;
  institution: string;
  description: string;
  formulaString: string; // e.g., "(P ∨ Q) ∧ R ∧ V ∧ W"
  ast: ASTNode;
  relevantPropositions: string[]; // ['P', 'Q', 'R', 'V', 'W']
  overviewNotes: string;
}

export interface StepEvaluation {
  subExpression: string;
  renderedMath: string;
  truthValue: boolean;
  explanation: string;
}

export interface EligibilityResult {
  isEligible: boolean;
  programId: string;
  programName: string;
  steps: StepEvaluation[];
  missingPropositions: {
    id: string;
    name: string;
    remedy: string;
  }[];
  satisfiedCount: number;
  totalRequiredCount: number;
  recommendation: string;
}

export interface TruthTableRow {
  rowId: number;
  assignment: Record<string, boolean>;
  isCurrentProfile: boolean;
  result: boolean;
  stepResults?: Record<string, boolean>;
}

export interface StudentProfile {
  boardPercentage: number; // Class 12 Board % (e.g. 88.5%)
  jeePercentile: number; // JEE Main Percentile (e.g. 94.2)
  cuetScore: number; // CUET-UG score / percentile (e.g. 720)
  hasStreamPrereqs: boolean; // 10+2 PCM / PCB / Commerce with Maths from recognized board
  householdIncome: number; // Annual family gross income in INR (e.g. 450000)
  isFirstGenOrGirlChild: boolean; // First-gen graduate in family OR Single Girl Child (AICTE Pragati)
  hasNationalDistinction: boolean; // KVPY / Science Olympiad / NTSE / National Hackathon / Sports medalist
  hasNssNccHours: boolean; // NCC 'B'/'C' Certificate or 50+ hours documented NSS social service
  hasConductCertificate: boolean; // Valid School Transfer Certificate (TC) & Character Certificate
  signedAntiRagging: boolean; // UGC Anti-Ragging Undertaking & Clean Honor Record
  hasHomeStateDomicile: boolean; // Valid State Domicile Certificate for Home State Quota
  passedLanguagePaper: boolean; // Passed English / Regional Language paper in 10+2 / CUET
  intendedStream: string; // e.g., 'B.Tech in Computer Science & Engineering'
}
