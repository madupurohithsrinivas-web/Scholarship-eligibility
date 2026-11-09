import React, { useState } from 'react';
import { ProgramRule, StudentProfile, StepEvaluation } from '../types/logic';
import { ATOMIC_PROPOSITIONS } from '../data/programs';
import {
  X,
  Printer,
  Copy,
  CheckCircle,
  AlertTriangle,
  GraduationCap,
  ShieldCheck,
  Building,
} from 'lucide-react';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: ProgramRule;
  profile: StudentProfile;
  evaluatedProps: Record<string, boolean>;
  isEligible: boolean;
  steps: StepEvaluation[];
  missingPropositions: { id: string; name: string; remedy: string }[];
  personaName?: string;
}

export const DossierModal: React.FC<DossierModalProps> = ({
  isOpen,
  onClose,
  program,
  profile,
  evaluatedProps,
  isEligible,
  steps,
  missingPropositions,
  personaName,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyProof = () => {
    const proofText = `NATIONAL ADMISSIONS & SCHOLARSHIP PORTAL (NSP / UGC / AICTE FRAMEWORK)
OFFICIAL PROPOSITIONAL LOGIC ELIGIBILITY VERIFICATION
Date: ${new Date().toLocaleDateString('en-IN')}
Candidate: ${personaName || 'Prospective Scholar'}
Target Course: ${profile.intendedStream}
Target Scheme: ${program.name} (${program.institution})
Formula: ${program.formulaString}
Verdict: ${isEligible ? 'ELIGIBLE TO APPLY (TRUE)' : 'NOT APPLICABLE (FALSE)'}

Atomic Variable Assignment:
${program.relevantPropositions
  .map((v) => `  ${v} (${ATOMIC_PROPOSITIONS[v]?.name || v}): ${evaluatedProps[v] ? 'TRUE' : 'FALSE'}`)
  .join('\n')}

Proof Steps:
${steps.map((s, idx) => `  ${idx + 1}. ${s.renderedMath} => ${s.truthValue ? 'T' : 'F'}`).join('\n')}
`;

    navigator.clipboard.writeText(proofText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 print:p-0 print:bg-white">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden print:border-none print:shadow-none print:w-full">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 print:hidden">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              Official Eligibility Verification Dossier
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyProof}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied' : 'Copy Proof'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Formal Document Content */}
        <div className="p-8 space-y-6 text-slate-900 dark:text-slate-100 max-h-[80vh] overflow-y-auto print:max-h-none print:p-0">
          {/* Institutional Letterhead */}
          <div className="border-b-2 border-slate-900 dark:border-slate-100 pb-5 flex items-start justify-between">
            <div>
              <div className="text-xs font-mono font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">
                NATIONAL ADMISSIONS & SCHOLARSHIP PORTAL (NSP / UGC / AICTE FRAMEWORK)
              </div>
              <h1 className="text-2xl font-bold tracking-tight mt-1">
                Formal Propositional Eligibility Certificate
              </h1>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Centralised JoSAA / NSP Automated Truth Evaluation Protocol · Docket Ref: IND-LOGI-{Date.now().toString().slice(-6)}
              </div>
            </div>

            <div className="text-right text-xs">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                Evaluation Date
              </div>
              <div className="text-slate-500 font-mono">
                {new Date().toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>

          {/* Candidate & Program Summary Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-1">
              <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                Candidate Profile
              </div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                {personaName || 'Prospective Scholar'}
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Target Stream: {profile.intendedStream}
              </div>
              <div className="font-mono text-[11px] text-slate-500">
                Class 12: {profile.boardPercentage.toFixed(1)}% · JEE: {profile.jeePercentile.toFixed(1)} %ile · Income: ₹{profile.householdIncome.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-1">
              <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                Target Scheme & Authority
              </div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                {program.name}
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                {program.institution}
              </div>
              <div className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
                {program.awardAmount ? `Award: ${program.awardAmount}` : 'Centralised Counseling Track'}
              </div>
            </div>
          </div>

          {/* Primary Formal Verdict Seal */}
          <div
            className={`p-5 rounded-xl border-2 flex items-center justify-between ${
              isEligible
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/30 border-amber-500 text-amber-900 dark:text-amber-200'
            }`}
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">
                Formal Determinative Status:
              </div>
              <div className="text-xl font-bold tracking-tight mt-0.5">
                {isEligible ? 'APPLICABLE: FORMALLY ELIGIBLE TO APPLY' : 'ACTION REQUIRED: INELIGIBLE AT CURRENT STANDING'}
              </div>
              <div className="text-xs opacity-90 mt-1">
                {isEligible
                  ? 'Candidate fulfills all logical conjunctions and prerequisite conditions. Application submission is officially encouraged.'
                  : 'Candidate does not satisfy one or more required Boolean clauses. Rectification is required prior to applying.'}
              </div>
            </div>

            <div className="font-mono text-2xl font-bold px-3 py-1 rounded border border-current">
              {isEligible ? 'TRUE' : 'FALSE'}
            </div>
          </div>

          {/* Symbolic Formula and Proof Steps */}
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Evaluated Propositional Logic Sentence:
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-sm font-bold text-slate-900 dark:text-white">
              {program.formulaString}
            </div>
          </div>

          {/* Truth Assignment Table */}
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Evaluated Atomic Propositions:
            </div>
            <table className="w-full text-xs border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                <tr>
                  <th className="p-2 text-left w-12 font-mono">Var</th>
                  <th className="p-2 text-left">Proposition Name & Threshold</th>
                  <th className="p-2 text-center w-20">Assigned</th>
                  <th className="p-2 text-center w-24">Truth Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {program.relevantPropositions.map((v) => {
                  const def = ATOMIC_PROPOSITIONS[v];
                  const val = evaluatedProps[v];
                  return (
                    <tr key={v}>
                      <td className="p-2 font-bold text-blue-600 dark:text-blue-400">{v}</td>
                      <td className="p-2 font-sans">
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {def?.name || v}
                        </span>{' '}
                        <span className="text-slate-400">({def?.thresholdText})</span>
                      </td>
                      <td className="p-2 text-center text-slate-500 font-sans">Verified</td>
                      <td className="p-2 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            val
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          }`}
                        >
                          {val ? 'TRUE' : 'FALSE'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Missing Propositions & Recommendation */}
          {!isEligible && missingPropositions.length > 0 && (
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-xs">
              <div className="font-bold text-amber-900 dark:text-amber-200 mb-2">
                Mandatory Remediation Steps for Candidate:
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                {missingPropositions.map((m) => (
                  <li key={m.id}>
                    <strong>[{m.id}] {m.name}:</strong> {m.remedy}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Signoff Footer */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-between items-end text-xs text-slate-500">
            <div>
              <div className="font-serif font-bold text-slate-900 dark:text-white text-base">
                LogiScholar Automated Decision Seal
              </div>
              <div>Providence Higher Education Advisory & Consortium</div>
            </div>
            <div className="text-right font-mono text-[11px]">
              Validated via Truth Table Engine · ISO/IEC 2382-7
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
