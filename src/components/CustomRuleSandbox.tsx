import React, { useState } from 'react';
import { ProgramRule } from '../types/logic';
import { parseFormula, evaluateAST, astToString, extractVariables } from '../logic/engine';
import { ATOMIC_PROPOSITIONS } from '../data/programs';
import { Code, Play, Plus, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface CustomRuleSandboxProps {
  evaluatedProps: Record<string, boolean>;
  onAddCustomProgram: (program: ProgramRule) => void;
}

export const CustomRuleSandbox: React.FC<CustomRuleSandboxProps> = ({
  evaluatedProps,
  onAddCustomProgram,
}) => {
  const [formulaInput, setFormulaInput] = useState<string>('(P ∨ Q) ∧ R ∧ (S ∨ T)');
  const [programName, setProgramName] = useState<string>('State Technical University Merit Waiver');
  const [institutionName, setInstitutionName] = useState<string>('Directorate of Technical Education');
  const [awardAmount, setAwardAmount] = useState<string>('₹1,00,000 / year');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Parse formula
  const parseResult = parseFormula(formulaInput);
  const isValid = parseResult.ast !== null;
  const errorMsg = parseResult.error;

  // Evaluate against current profile if valid
  const evaluation = isValid && parseResult.ast ? evaluateAST(parseResult.ast, evaluatedProps) : null;
  const extractedVars = isValid && parseResult.ast ? extractVariables(parseResult.ast) : [];

  const insertToken = (token: string) => {
    setFormulaInput((prev) => prev + token);
  };

  const handleSaveProgram = () => {
    if (!isValid || !parseResult.ast) return;

    const newProg: ProgramRule = {
      id: `custom-${Date.now()}`,
      name: programName.trim() || 'Custom Evaluation Rule',
      type: 'scholarship',
      institution: institutionName.trim() || 'State Admissions Council',
      awardAmount: awardAmount.trim() || undefined,
      description: `User-defined logic criteria evaluated via propositional formula: ${formulaInput}`,
      formulaString: astToString(parseResult.ast),
      ast: parseResult.ast,
      relevantPropositions: extractedVars,
      overviewNotes: `Custom rule with ${extractedVars.length} evaluated atomic variables.`,
    };

    onAddCustomProgram(newProg);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const sampleFormulas = [
    { label: 'AICTE Pragati Girl Child Grant', expr: 'R ∧ S ∧ (P ∨ Q) ∧ Y ∧ W' },
    { label: 'IIT / NIT Merit-cum-Means Waiver', expr: '(P ∨ Q) ∧ S ∧ R ∧ (X ∨ Y) ∧ W' },
    { label: 'DST INSPIRE Natural Science Fellowship', expr: '(P ∨ Q) ∧ R ∧ T ∧ W' },
    { label: 'State Home Quota with NCC Service', expr: '(P ∨ Q) ∧ R ∧ X ∧ U ∧ W' },
  ];

  return (
    <div className="space-y-6">
      {/* Sandbox Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
          <Code className="w-4 h-4" />
          <span>PROPOSITIONAL RULE SYNTHESIZER</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Custom Logic Rule Builder & Testbench
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Draft bespoke scholarship or departmental admissions rules using Boolean operators. 
          The engine builds an Abstract Syntax Tree (AST), validates syntax, and evaluates candidate eligibility in real time.
        </p>

        {/* Quick Sample Presets */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
            Load Predefined Logic Formula Templates:
          </div>
          <div className="flex flex-wrap gap-2">
            {sampleFormulas.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setFormulaInput(s.expr);
                  setProgramName(s.label);
                }}
                className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editor & Operators Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-sm">
          {/* Metadata Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Rule / Program Title
              </label>
              <input
                type="text"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                placeholder="e.g. Dean's Engineering Diversity Award"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                Issuing Department or Foundation
              </label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                placeholder="e.g. Providence Academic Council"
              />
            </div>
          </div>

          {/* Propositional Formula Editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Boolean Logic Formula Expression
              </label>
              <span className="text-[11px] text-slate-400">
                Supports: & (AND), | (OR), ! (NOT), -&gt; (IMPLIES), &lt;-&gt; (IFF)
              </span>
            </div>

            <textarea
              rows={2}
              value={formulaInput}
              onChange={(e) => setFormulaInput(e.target.value)}
              className="w-full p-3 font-mono text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. (P ∨ Q) ∧ R ∧ ¬W"
            />

            {/* Operator Quick Insert Strip */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] text-slate-500 mr-1">Insert Operator:</span>
              <button
                onClick={() => insertToken(' ∧ ')}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-xs font-mono font-bold cursor-pointer"
                title="Conjunction (AND)"
              >
                ∧ AND
              </button>
              <button
                onClick={() => insertToken(' ∨ ')}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-xs font-mono font-bold cursor-pointer"
                title="Disjunction (OR)"
              >
                ∨ OR
              </button>
              <button
                onClick={() => insertToken('¬')}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-xs font-mono font-bold cursor-pointer"
                title="Negation (NOT)"
              >
                ¬ NOT
              </button>
              <button
                onClick={() => insertToken(' → ')}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-xs font-mono font-bold cursor-pointer"
                title="Material Implication (IF ... THEN)"
              >
                → IMPLIES
              </button>
              <button
                onClick={() => insertToken(' ↔ ')}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-xs font-mono font-bold cursor-pointer"
                title="Biconditional (IF AND ONLY IF)"
              >
                ↔ IFF
              </button>
              <button
                onClick={() => insertToken('(')}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-xs font-mono font-bold cursor-pointer"
              >
                (
              </button>
              <button
                onClick={() => insertToken(')')}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-xs font-mono font-bold cursor-pointer"
              >
                )
              </button>
            </div>
          </div>

          {/* Validation Status & Live Evaluation Box */}
          <div className="pt-2">
            {isValid ? (
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Syntax Validated (Well-Formed Formula)</span>
                  </div>
                  <div className="text-xs font-mono text-slate-500">
                    Variables: {extractedVars.join(', ') || 'None'}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs text-slate-600 dark:text-slate-300">
                    Evaluation against current student profile:
                  </span>
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded ${
                      evaluation
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {evaluation ? 'TRUE (APPLICABLE)' : 'FALSE (NOT APPLICABLE)'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>Parse Error: {errorMsg}</span>
              </div>
            )}
          </div>

          {/* Save & Deploy Button */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleSaveProgram}
              disabled={!isValid}
              className={`px-4 py-2.5 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
                isValid
                  ? 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Add to Active Eligibility Programs</span>
            </button>

            {savedSuccess && (
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Rule saved and activated!</span>
              </span>
            )}
          </div>
        </div>

        {/* Right Proposition Selector Panel */}
        <div className="lg:col-span-4 bg-slate-50/70 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/80 p-5 space-y-4">
          <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Click to Insert Atomic Propositions:
          </div>
          <div className="space-y-2">
            {Object.keys(ATOMIC_PROPOSITIONS).map((key) => {
              const def = ATOMIC_PROPOSITIONS[key];
              const isTrue = evaluatedProps[key];
              return (
                <button
                  key={key}
                  onClick={() => insertToken(key)}
                  className="w-full text-left p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all flex items-center justify-between text-xs cursor-pointer group"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      [{key}]
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                      {def.name}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                      isTrue
                        ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50'
                        : 'text-slate-400 bg-slate-100 dark:bg-slate-800'
                    }`}
                  >
                    {isTrue ? 'T' : 'F'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
