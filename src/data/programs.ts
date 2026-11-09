import { ASTNode, AtomicProposition, ProgramRule, StudentProfile } from '../types/logic';

// Master Atomic Propositions Catalog for Indian Higher Education System
export const ATOMIC_PROPOSITIONS: Record<string, Omit<AtomicProposition, 'value'>> = {
  P: {
    id: 'P',
    name: 'Class 12th Board Academic Distinction',
    shortDesc: 'Class 12 Board aggregate ≥ 80.0% in CBSE / CISCE / State Board examinations',
    category: 'academic',
    thresholdText: 'Board Score ≥ 80.0%',
  },
  Q: {
    id: 'Q',
    name: 'National Entrance Benchmark (JEE / CUET)',
    shortDesc: 'JEE Main Percentile ≥ 90.0, CUET-UG Percentile ≥ 90.0, or NEET Score ≥ 560',
    category: 'standardized',
    thresholdText: 'JEE / CUET ≥ 90.0 %ile',
  },
  R: {
    id: 'R',
    name: 'Stream Prerequisites (PCM / PCB)',
    shortDesc: 'Passed 10+2 with Physics, Chemistry, Mathematics/Biology & English from a recognized board',
    category: 'prerequisite',
    thresholdText: '10+2 Stream Verified',
  },
  S: {
    id: 'S',
    name: 'EWS / Fee Concession Income Ceiling',
    shortDesc: 'Annual Household Gross Income ≤ ₹6,00,000 (EWS / Income Certificate verified)',
    category: 'financial',
    thresholdText: 'Income ≤ ₹6,00,000 / yr',
  },
  T: {
    id: 'T',
    name: 'National Olympiad / KVPY / Innovation Award',
    shortDesc: 'KVPY fellow, Science/Math Olympiad medalist, NTSE scholar, or Smart India Hackathon finalist',
    category: 'extracurricular',
    thresholdText: 'National Distinction',
  },
  U: {
    id: 'U',
    name: 'NCC / NSS Social Service Record',
    shortDesc: 'NCC "B" or "C" certificate holder, or 50+ documented hours in National Service Scheme (NSS)',
    category: 'extracurricular',
    thresholdText: 'NCC / NSS ≥ 50 hrs',
  },
  V: {
    id: 'V',
    name: 'School Transfer (TC) & Character Certificate',
    shortDesc: 'Official Transfer Certificate and Good Conduct Certificate issued by school principal',
    category: 'conduct',
    thresholdText: 'TC & Conduct Verified',
  },
  W: {
    id: 'W',
    name: 'UGC Anti-Ragging Undertaking',
    shortDesc: 'Mandatory online UGC Anti-Ragging affidavit formally executed with no disciplinary record',
    category: 'conduct',
    thresholdText: 'Anti-Ragging Cleared',
  },
  X: {
    id: 'X',
    name: 'Home State Domicile Certificate',
    shortDesc: 'Valid State Domicile / Residence Certificate for Home State Quota (JoSAA 50% / State 85%)',
    category: 'prerequisite',
    thresholdText: 'State Domicile Valid',
  },
  Y: {
    id: 'Y',
    name: 'First-Gen Scholar or Single Girl Child',
    shortDesc: 'First graduate in immediate family, or candidate eligible for AICTE Pragati Single Girl Child scheme',
    category: 'financial',
    thresholdText: 'First-Gen / Girl Child',
  },
  Z: {
    id: 'Z',
    name: 'Language Paper Benchmark',
    shortDesc: 'Passed English or recognized state language paper in 10+2 / CUET with at least 60% marks',
    category: 'standardized',
    thresholdText: 'Language Score ≥ 60%',
  },
};

// Remediation advice for each proposition when falsified
export const PROPOSITION_REMEDIES: Record<string, { name: string; remedy: string }> = {
  P: {
    name: 'Class 12th Board Academic Distinction (≥ 80.0%)',
    remedy: 'Score at least 80.0% aggregate in Class 12 Board examinations, or appear for Board Improvement exams.',
  },
  Q: {
    name: 'National Entrance Benchmark (JEE Main / CUET-UG ≥ 90.0 %ile)',
    remedy: 'Prepare for JEE Main Session 2 or CUET-UG re-attempt to push composite percentile above 90.0.',
  },
  R: {
    name: '10+2 Stream Prerequisites (PCM / PCB)',
    remedy: 'Verify that Class 12 mark sheet contains mandatory Physics, Chemistry, and Mathematics/Biology pass credits.',
  },
  S: {
    name: 'EWS / Fee Concession Income Ceiling (≤ ₹6,00,000 / yr)',
    remedy: 'Obtain an updated Income Certificate issued by Revenue Authority / Tehsildar, or submit ITR Form-16.',
  },
  T: {
    name: 'National Olympiad / KVPY / Innovation Award',
    remedy: 'Participate in INPhO/INChO/RMO Olympiads, Smart India Hackathon, or national technical symposium competitions.',
  },
  U: {
    name: 'NCC / NSS Social Service Record',
    remedy: 'Enroll in the college National Service Scheme (NSS) cell or complete NCC camp training for certification.',
  },
  V: {
    name: 'School Transfer Certificate (TC) & Conduct Proof',
    remedy: 'Collect Transfer Certificate and Character Certificate from the head of your previous institution.',
  },
  W: {
    name: 'UGC Anti-Ragging Undertaking',
    remedy: 'Fill out and sign the mandatory UGC Anti-Ragging undertaking at antiragging.in.',
  },
  X: {
    name: 'Home State Domicile Certificate',
    remedy: 'Apply at your local MeeSeva / e-District portal for a state domicile/nativity certificate.',
  },
  Y: {
    name: 'First-Gen Scholar or Single Girl Child Affidavit',
    remedy: 'Submit a First-Generation Graduate certificate from the Revenue Department or Single Girl Child notarized affidavit.',
  },
  Z: {
    name: 'Language Paper Benchmark (≥ 60%)',
    remedy: 'Ensure Class 12 English or Regional Language marks meet the minimum 60% requirement in CUET/Board.',
  },
};

// Map student input form values to propositional truth values
export function evaluateStudentPropositions(profile: StudentProfile): Record<string, boolean> {
  return {
    P: profile.boardPercentage >= 80.0,
    Q: profile.jeePercentile >= 90.0 || profile.cuetScore >= 650,
    R: profile.hasStreamPrereqs,
    S: profile.householdIncome <= 600000,
    T: profile.hasNationalDistinction,
    U: profile.hasNssNccHours,
    V: profile.hasConductCertificate,
    W: profile.signedAntiRagging,
    X: profile.hasHomeStateDomicile,
    Y: profile.isFirstGenOrGirlChild,
    Z: profile.passedLanguagePaper,
  };
}

// Built-in Indian Admissions and Scholarships Catalog
export const DEFAULT_PROGRAMS: ProgramRule[] = [
  {
    id: 'josaa-admission',
    name: 'JoSAA / CSAB Engineering & Central Universities Admission',
    type: 'admission',
    institution: 'National Institutes of Technology (NITs) & Central Universities',
    deadline: 'June 25',
    description:
      'Centralized seat allocation governed by JoSAA / CSAB. Mandates Class 12th Board top 20 percentile or entrance cutoff (P OR Q), PCM prerequisites, School TC, and UGC Anti-Ragging undertaking.',
    formulaString: '(P ∨ Q) ∧ R ∧ V ∧ W',
    relevantPropositions: ['P', 'Q', 'R', 'V', 'W'],
    overviewNotes:
      'Logic: Requires Academic Aptitude (Board ≥ 80% OR JEE/CUET ≥ 90 %ile) AND PCM/PCB Stream (R) AND Transfer Certificate (V) AND Anti-Ragging Undertaking (W).',
    ast: {
      type: 'binary',
      operator: 'AND',
      left: {
        type: 'binary',
        operator: 'AND',
        left: {
          type: 'binary',
          operator: 'AND',
          left: {
            type: 'binary',
            operator: 'OR',
            left: { type: 'variable', variable: 'P' },
            right: { type: 'variable', variable: 'Q' },
          },
          right: { type: 'variable', variable: 'R' },
        },
        right: { type: 'variable', variable: 'V' },
      },
      right: { type: 'variable', variable: 'W' },
    },
  },
  {
    id: 'inspire-she',
    name: 'INSPIRE Scholarship for Higher Education (SHE)',
    type: 'fellowship',
    awardAmount: '₹80,000 / year (₹60,000 + ₹20,000 Project Mentorship)',
    deadline: 'October 31',
    institution: 'Department of Science & Technology (DST), Govt. of India',
    description:
      'Flagship national fellowship for students pursuing natural and basic sciences (B.Sc., B.S., Int. M.Sc.). Awarded to top 1% Board rankers or JEE/NEET qualifiers with documented scientific distinction.',
    formulaString: '(P ∨ Q) ∧ R ∧ T ∧ W',
    relevantPropositions: ['P', 'Q', 'R', 'T', 'W'],
    overviewNotes:
      'DST Guidelines: High Board Merit (P) OR JEE/NEET Benchmark (Q) AND Science Stream (R) AND Olympiad/KVPY Distinction (T) AND Good Standing (W).',
    ast: {
      type: 'binary',
      operator: 'AND',
      left: {
        type: 'binary',
        operator: 'AND',
        left: {
          type: 'binary',
          operator: 'OR',
          left: { type: 'variable', variable: 'P' },
          right: { type: 'variable', variable: 'Q' },
        },
        right: { type: 'variable', variable: 'R' },
      },
      right: {
        type: 'binary',
        operator: 'AND',
        left: { type: 'variable', variable: 'T' },
        right: { type: 'variable', variable: 'W' },
      },
    },
  },
  {
    id: 'csss-scholarship',
    name: 'Central Sector Scheme of Scholarships (CSSS / PM-USP)',
    type: 'scholarship',
    awardAmount: '₹20,000 / year (₹12k 1st–3rd yr + ₹20k PG)',
    deadline: 'November 30',
    institution: 'Ministry of Education (MoE) & National Scholarship Portal (NSP)',
    description:
      'Central government scholarship for meritorious students from low-income households. Requires above 80th percentile in Class 12 Board, family income under ₹4.5L/₹6L, and full-time regular degree.',
    formulaString: 'P ∧ S ∧ R ∧ W',
    relevantPropositions: ['P', 'S', 'R', 'W'],
    overviewNotes:
      'NSP Conjunction: Board Academic Distinction (P) AND Income Ceiling ≤ ₹6,00,000 (S) AND Core Stream (R) AND Anti-Ragging (W).',
    ast: {
      type: 'binary',
      operator: 'AND',
      left: {
        type: 'binary',
        operator: 'AND',
        left: { type: 'variable', variable: 'P' },
        right: { type: 'variable', variable: 'S' },
      },
      right: {
        type: 'binary',
        operator: 'AND',
        left: { type: 'variable', variable: 'R' },
        right: { type: 'variable', variable: 'W' },
      },
    },
  },
  {
    id: 'pragati-aicte',
    name: 'AICTE Pragati Scholarship for Girl Students',
    type: 'scholarship',
    awardAmount: '₹50,000 / year (Tuition + College Incidentals)',
    deadline: 'December 31',
    institution: 'All India Council for Technical Education (AICTE)',
    description:
      'Special empowerment scholarship for female scholars admitted into AICTE-approved degree technical programs. Requires qualifying entrance/board merit, family income under ₹8 Lakhs, and girl child eligibility.',
    formulaString: 'R ∧ S ∧ (P ∨ Q) ∧ Y ∧ W',
    relevantPropositions: ['R', 'S', 'P', 'Q', 'Y', 'W'],
    overviewNotes:
      'AICTE Pragati Mandate: Technical Stream (R) AND Income Ceiling (S) AND Merit (P OR Q) AND Girl Child / First-Gen (Y) AND Clean Standing (W).',
    ast: {
      type: 'binary',
      operator: 'AND',
      left: {
        type: 'binary',
        operator: 'AND',
        left: { type: 'variable', variable: 'R' },
        right: { type: 'variable', variable: 'S' },
      },
      right: {
        type: 'binary',
        operator: 'AND',
        left: {
          type: 'binary',
          operator: 'OR',
          left: { type: 'variable', variable: 'P' },
          right: { type: 'variable', variable: 'Q' },
        },
        right: {
          type: 'binary',
          operator: 'AND',
          left: { type: 'variable', variable: 'Y' },
          right: { type: 'variable', variable: 'W' },
        },
      },
    },
  },
  {
    id: 'mcm-waiver',
    name: 'Merit-cum-Means (MCM) Full Tuition Fee Waiver',
    type: 'grant',
    awardAmount: '100% Tuition Fee Concession (~₹1,25,000 to ₹2,00,000 / year)',
    deadline: 'August 15',
    institution: 'IITs / NITs / State Government Technical Colleges',
    description:
      'Statutory institutional fee waiver for engineering scholars from economically challenged backgrounds who cleared national entrance criteria and hold state quota domicile or first-gen identity.',
    formulaString: '(P ∨ Q) ∧ S ∧ R ∧ (X ∨ Y) ∧ W',
    relevantPropositions: ['P', 'Q', 'S', 'R', 'X', 'Y', 'W'],
    overviewNotes:
      'Institute MCM Policy: Entrance Merit (P OR Q) AND Income ≤ ₹6 Lakhs (S) AND Prereqs (R) AND (Home State Domicile OR First-Gen) AND Clean Record (W).',
    ast: {
      type: 'binary',
      operator: 'AND',
      left: {
        type: 'binary',
        operator: 'AND',
        left: {
          type: 'binary',
          operator: 'OR',
          left: { type: 'variable', variable: 'P' },
          right: { type: 'variable', variable: 'Q' },
        },
        right: {
          type: 'binary',
          operator: 'AND',
          left: { type: 'variable', variable: 'S' },
          right: { type: 'variable', variable: 'R' },
        },
      },
      right: {
        type: 'binary',
        operator: 'AND',
        left: {
          type: 'binary',
          operator: 'OR',
          left: { type: 'variable', variable: 'X' },
          right: { type: 'variable', variable: 'Y' },
        },
        right: { type: 'variable', variable: 'W' },
      },
    },
  },
  {
    id: 'sports-ncc-quota',
    name: 'National Sports & NCC/NSS Youth Excellence Quota',
    type: 'scholarship',
    awardAmount: '₹60,000 / year + Supernumerary University Seat',
    deadline: 'July 10',
    institution: 'University Sports Board & State Youth Affairs Council',
    description:
      'Recognizes cadet excellence in NCC, National Service Scheme community development, and state/national level sports tournament medals alongside baseline academic qualification.',
    formulaString: '(P ∨ Q) ∧ U ∧ T ∧ V ∧ W',
    relevantPropositions: ['P', 'Q', 'U', 'T', 'V', 'W'],
    overviewNotes:
      'Cadet & Athlete Track: Academic Base (P OR Q) AND NCC "B"/"C" or NSS (U) AND Sports/Olympiad Distinction (T) AND Conduct Verified (V, W).',
    ast: {
      type: 'binary',
      operator: 'AND',
      left: {
        type: 'binary',
        operator: 'AND',
        left: {
          type: 'binary',
          operator: 'OR',
          left: { type: 'variable', variable: 'P' },
          right: { type: 'variable', variable: 'Q' },
        },
        right: { type: 'variable', variable: 'U' },
      },
      right: {
        type: 'binary',
        operator: 'AND',
        left: { type: 'variable', variable: 'T' },
        right: {
          type: 'binary',
          operator: 'AND',
          left: { type: 'variable', variable: 'V' },
          right: { type: 'variable', variable: 'W' },
        },
      },
    },
  },
];

// Curated Indian Student Personas
export interface StudentPersona {
  id: string;
  name: string;
  tagline: string;
  profile: StudentProfile;
}

export const STUDENT_PERSONAS: StudentPersona[] = [
  {
    id: 'aarav-merit',
    name: 'Aarav Sharma',
    tagline: 'JEE Main 98.4 %ile · CBSE 94.6% (PCM)',
    profile: {
      boardPercentage: 94.6,
      jeePercentile: 98.4,
      cuetScore: 740,
      hasStreamPrereqs: true,
      householdIncome: 850000, // ₹8,50,000 / yr
      isFirstGenOrGirlChild: false,
      hasNationalDistinction: true,
      hasNssNccHours: false,
      hasConductCertificate: true,
      signedAntiRagging: true,
      hasHomeStateDomicile: true,
      passedLanguagePaper: true,
      intendedStream: 'B.Tech in Computer Science & Engineering',
    },
  },
  {
    id: 'priya-pragati',
    name: 'Priya Patel',
    tagline: 'GSEB 88.5% · EWS Income · AICTE Pragati Eligible',
    profile: {
      boardPercentage: 88.5,
      jeePercentile: 86.2,
      cuetScore: 680,
      hasStreamPrereqs: true,
      householdIncome: 340000, // ₹3,40,000 / yr (Under 6L EWS)
      isFirstGenOrGirlChild: true, // Girl Child & First-gen
      hasNationalDistinction: false,
      hasNssNccHours: true,
      hasConductCertificate: true,
      signedAntiRagging: true,
      hasHomeStateDomicile: true,
      passedLanguagePaper: true,
      intendedStream: 'B.Tech in Information Technology',
    },
  },
  {
    id: 'rohan-cadet',
    name: 'Rohan Mukherjee',
    tagline: 'WBCHSE 82.0% · NCC "B" Cadet · State Domicile',
    profile: {
      boardPercentage: 82.0,
      jeePercentile: 89.2,
      cuetScore: 620,
      hasStreamPrereqs: true,
      householdIncome: 480000, // ₹4,80,000 / yr
      isFirstGenOrGirlChild: false,
      hasNationalDistinction: true,
      hasNssNccHours: true, // NCC Certified
      hasConductCertificate: true,
      signedAntiRagging: true,
      hasHomeStateDomicile: true,
      passedLanguagePaper: true,
      intendedStream: 'B.Tech in Mechanical Engineering',
    },
  },
  {
    id: 'ananya-inspire',
    name: 'Ananya Reddy',
    tagline: 'TS BIE 96.8% · KVPY Scholar · DST INSPIRE Aspirant',
    profile: {
      boardPercentage: 96.8,
      jeePercentile: 95.1,
      cuetScore: 780,
      hasStreamPrereqs: true,
      householdIncome: 720000,
      isFirstGenOrGirlChild: true,
      hasNationalDistinction: true, // KVPY / Olympiad
      hasNssNccHours: false,
      hasConductCertificate: true,
      signedAntiRagging: true,
      hasHomeStateDomicile: true,
      passedLanguagePaper: true,
      intendedStream: 'Integrated B.S.-M.S. in Mathematics & Computing',
    },
  },
];
