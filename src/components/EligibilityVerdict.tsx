import React, { useState } from 'react';
import { ProgramRule, StepEvaluation } from '../types/logic';
import {
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  FileCheck,
  ArrowRight,
  Sparkles,
  BookOpen,
  Calendar,
  Building2,
  DollarSign,
  HelpCircle,
} from 'lucide-react';
import { PROPOSITION_REMEDIES } from '../data/programs';

interface EligibilityVerdictProps {
  programs: ProgramRule[];
  selectedProgram: ProgramRule;
  onSelectProgram: (prog: ProgramRule) => void;
  isEligible: boolean;
  evaluatedProps: Record<string, boolean>;
  steps: StepEvaluation[];
  missingPropositions: { id: string; name: string; remedy: string }[];
  onOpenDossier: () => void;
  onJumpToTruthTable: () => void;
}

export const EligibilityVerdict: React.FC<EligibilityVerdictProps> = ({
  programs,
  selectedProgram,
  onSelectProgram,
  isEligible,
  evaluatedProps,
  steps,
  missingPropositions,
  onOpenDossier,
  onJumpToTruthTable,
}) => {
  const [showProofSteps, setShowProofSteps] = useState(true);

  // Calculate satisfaction score
  const totalRelevant = selectedProgram.relevantPropositions.length;
  const satisfiedCount = selectedProgram.relevantPropositions.filter(
    (p) => evaluatedProps[p]
  ).length;
  const satisfactionPct = Math.round((satisfiedCount / totalRelevant) * 100);

  return (
    <div className="space-y-6">
      {/* Target Program Selector Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm transition-colors">
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Select Target Admission or Scholarship Program:
        </div>
        <div className="flex flex-wrap gap-2">
          {programs.map((prog) => {
            const isCurrent = prog.id === selectedProgram.id;
            return (
              <button
                key={prog.id}
                onClick={() => onSelectProgram(prog)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap text-left ${
                  isCurrent
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <span>{prog.name}</span>
              </button>
            );
          })}
        </div>

        {/* Program Details */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-y-2 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              {selectedProgram.institution}
            </span>
            {selectedProgram.awardAmount && (
              <span className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400">
                <DollarSign className="w-3.5 h-3.5" />
                {selectedProgram.awardAmount}
              </span>
            )}
            {selectedProgram.deadline && (
              <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                Deadline: {selectedProgram.deadline}
              </span>
            )}
          </div>
          <div className="text-slate-500 dark:text-slate-400 text-[11px]">
            {selectedProgram.overviewNotes}
          </div>
        </div>
      </div>

      {/* Primary Formal Decision Card */}
      <div
        className={`rounded-xl border p-6 transition-all shadow-sm ${
          isEligible
            ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
            : 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {isEligible ? (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-1 rounded">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>● APPLICABLE — ELIGIBLE TO APPLY</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-900/60 px-2.5 py-1 rounded">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>▲ NOT CURRENTLY APPLICABLE — REQUIREMENTS UNMET</span>
                </div>
              )}
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Formula Value: {isEligible ? 'True' : 'False'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {isEligible
                ? `You meet all formal criteria for ${selectedProgram.name}!`
                : `Action needed before applying to ${selectedProgram.name}`}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
              {isEligible
                ? 'Your qualifications satisfy the complete logical conjunction and prerequisite constraints for this program. You should proceed with your official application.'
                : `The propositional logic engine evaluated the admission formula to False. Address the unmet clauses below to achieve eligibility prior to the deadline.`}
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
            <button
              onClick={onOpenDossier}
              className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                isEligible
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-white'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Generate Official Dossier</span>
            </button>
            <button
              onClick={onJumpToTruthTable}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors text-center cursor-pointer"
            >
              Inspect Truth Table Row
            </button>
          </div>
        </div>

        {/* Propositional Formula Visualizer */}
        <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-700/80">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
            <span>Propositional Eligibility Formula:</span>
            <span className="font-mono text-[11px] text-slate-500">
              {satisfiedCount} of {totalRelevant} atomic propositions satisfied ({satisfactionPct}%)
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between overflow-x-auto">
            <div className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-wide">
              {selectedProgram.formulaString}
            </div>
            <div
              className={`text-xs font-mono font-bold px-2.5 py-1 rounded ${
                isEligible
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              ≡ {isEligible ? 'TRUE' : 'FALSE'}
            </div>
          </div>
        </div>

        {/* Gap Analysis / Missing Criteria (When Ineligible) */}
        {!isEligible && missingPropositions.length > 0 && (
          <div className="mt-5 p-4 rounded-lg bg-amber-100/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80">
            <div className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Targeted Remediation to Achieve Eligibility (Minimal Missing Propositions):</span>
            </div>
            <ul className="space-y-2 mt-2">
              {missingPropositions.map((item) => (
                <li
                  key={item.id}
                  className="text-xs text-amber-900 dark:text-amber-200 bg-white/70 dark:bg-slate-900/60 p-2.5 rounded border border-amber-200/70 dark:border-amber-800/60"
                >
                  <div className="font-semibold flex items-center gap-1.5">
                    <span className="font-mono text-amber-700 dark:text-amber-400 font-bold">
                      [{item.id}]
                    </span>
                    <span>{item.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-700 dark:text-slate-300 mt-1">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Recommended Action: </span>
                    {item.remedy}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Step-by-Step Formal Proof / Truth Derivation */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
        <button
          onClick={() => setShowProofSteps(!showProofSteps)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Formal Logical Deduction & Proof Steps</span>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                ({steps.length} atomic and connective evaluations)
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Inspect how the Boolean formula is resolved step by step via Truth Table inference rules
            </p>
          </div>
          <div className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            {showProofSteps ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {showProofSteps && (
          <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-1">
                  <div className="font-mono font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-slate-400 text-[11px] font-sans">Step {idx + 1}:</span>
                    <span>{step.renderedMath}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    {step.explanation}
                  </div>
                </div>

                <div className="shrink-0">
                  <span
                    className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                      step.truthValue
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {step.truthValue ? 'TRUE' : 'FALSE'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
