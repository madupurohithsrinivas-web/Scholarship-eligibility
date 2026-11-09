import React from 'react';
import { BookOpen, Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export const LogicCheatSheet: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>FOUNDATIONS OF FORMAL REASONING</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Propositional Logic in Higher Education Admissions
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Propositional logic (also known as sentential logic) is a branch of mathematical logic that studies statements that can be either True or False. 
          In university admissions and scholarship disbursements, institutional regulations are codified as formal logic sentences to guarantee fairness, repeatability, and legal compliance.
        </p>
      </div>

      {/* Logical Connectives Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Conjunction */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-2xl font-bold text-blue-600 dark:text-blue-400">
              P ∧ Q
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              Conjunction (AND)
            </span>
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            Truth Rule: True if and only if <em>both</em> premises P and Q hold true simultaneously.
          </div>
          <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
            <strong>Admissions Example:</strong> "Candidate must have Class 12th PCM Prerequisites (R) <em>AND</em> valid School Transfer Certificate (V)." If either is false, counseling verification fails.
          </div>
        </div>

        {/* Disjunction */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-2xl font-bold text-blue-600 dark:text-blue-400">
              P ∨ Q
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              Disjunction (OR)
            </span>
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            Truth Rule: True if <em>at least one</em> operand is true (inclusive OR).
          </div>
          <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
            <strong>Admissions Example:</strong> "Candidate qualifies via Class 12 Board score ≥ 80% (P) <em>OR</em> JEE Main / CUET Percentile ≥ 90.0 (Q)." Meeting either fulfills the aptitude clause.
          </div>
        </div>

        {/* Negation */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-2xl font-bold text-blue-600 dark:text-blue-400">
              ¬P
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              Negation (NOT)
            </span>
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            Truth Rule: Inverts the truth value of proposition P.
          </div>
          <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
            <strong>Admissions Example:</strong> ¬D represents "Candidate does NOT have an active disciplinary or ragging record."
          </div>
        </div>

        {/* Material Implication */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-2xl font-bold text-blue-600 dark:text-blue-400">
              P → Q
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              Implication (IF... THEN)
            </span>
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            Truth Rule: False only when antecedent P is True and consequent Q is False (¬P ∨ Q).
          </div>
          <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
            <strong>Admissions Example:</strong> "IF candidate claims Home State Quota (X), THEN they must furnish a valid State Domicile Certificate."
          </div>
        </div>

        {/* Biconditional Equivalence */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-2xl font-bold text-blue-600 dark:text-blue-400">
              P ↔ Q
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              Biconditional (IFF)
            </span>
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            Truth Rule: True when both operands share the identical truth value (both T or both F).
          </div>
          <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
            <strong>Admissions Example:</strong> "Eligible for AICTE Pragati (E) if and only if family income is under ₹8 Lakhs AND candidate is an eligible female scholar (Y)."
          </div>
        </div>

        {/* Modus Ponens & Resolution */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xl font-bold text-blue-600 dark:text-blue-400">
              Premise ⊢ Conclusion
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              Deductive Inference
            </span>
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            Inference Rule: If the eligibility formula evaluates to True for candidate profile C, then candidate is admissible.
          </div>
          <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
            <strong>Modus Ponens:</strong> Given (Profile ⊨ JoSAA Formula) and (JoSAA Formula → Seat Allotment Applicable), conclude <em>Applicable</em>.
          </div>
        </div>
      </div>

      {/* De Morgan's Law and Gap Analysis Box */}
      <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/80 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Why Propositional Logic Protects Indian Applicants</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="space-y-1">
            <div className="font-semibold text-slate-900 dark:text-white">
              De Morgan's Laws in Remediation
            </div>
            <p className="leading-relaxed">
              When a student fails a conjunction ¬(P ∧ Q), by De Morgan's Law ¬(P ∧ Q) ≡ (¬P ∨ ¬Q), 
              the failure is caused by at least one missing factor. Our engine identifies the minimal satisfying assignment so applicants know exactly whether scoring higher in JEE Main or obtaining an updated EWS certificate will unlock eligibility.
            </p>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-slate-900 dark:text-white">
              Equitable and Transparent Counseling
            </div>
            <p className="leading-relaxed">
              Unlike discretionary quotas, propositional logic guarantees statutory transparency: if the Boolean formula evaluates to True, the candidate possesses an undeniable legal eligibility to apply through JoSAA, CSAB, or the National Scholarship Portal (NSP).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
