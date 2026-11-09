import React, { useState } from 'react';
import { StudentProfile } from '../types/logic';
import { ATOMIC_PROPOSITIONS } from '../data/programs';
import { Check, X, Sliders, ToggleLeft, ToggleRight, RotateCcw } from 'lucide-react';

interface StudentProfileFormProps {
  profile: StudentProfile;
  onChangeProfile: (updated: StudentProfile) => void;
  evaluatedProps: Record<string, boolean>;
  onResetToDefault: () => void;
}

export const StudentProfileForm: React.FC<StudentProfileFormProps> = ({
  profile,
  onChangeProfile,
  evaluatedProps,
  onResetToDefault,
}) => {
  const [directSymbolMode, setDirectSymbolMode] = useState(false);

  const updateField = <K extends keyof StudentProfile>(field: K, value: StudentProfile[K]) => {
    onChangeProfile({
      ...profile,
      [field]: value,
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 transition-colors shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Candidate Academic Profile</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Indian Higher Education System (Class 12th Board, JEE/CUET, EWS, JoSAA, AICTE)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDirectSymbolMode(!directSymbolMode)}
            className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 transition-colors cursor-pointer"
            title="Toggle between real criteria inputs and direct Boolean truth table overrides"
          >
            {directSymbolMode ? (
              <>
                <ToggleRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Symbol Override: On</span>
              </>
            ) : (
              <>
                <ToggleLeft className="w-4 h-4 text-slate-400" />
                <span>Symbol Override: Off</span>
              </>
            )}
          </button>

          <button
            onClick={onResetToDefault}
            className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Reset profile to baseline values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!directSymbolMode ? (
        <div className="space-y-6">
          {/* Section 1: Quantitative Metrics (Class 12 Board, JEE Main / CUET, Income) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Class 12 Board Marks */}
            <div className="p-4 rounded-lg bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">P</span>
                  <span>Class 12th Board Aggregate %</span>
                </label>
                <span className="font-mono text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                  {profile.boardPercentage.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="50.0"
                max="100.0"
                step="0.5"
                value={profile.boardPercentage}
                onChange={(e) => updateField('boardPercentage', parseFloat(e.target.value))}
                className="w-full accent-blue-600 dark:accent-blue-400 cursor-pointer"
              />
              <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                <span>Min: 50%</span>
                <span className={evaluatedProps.P ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-slate-500'}>
                  Target: ≥ 80.0% ({evaluatedProps.P ? 'P = True' : 'P = False'})
                </span>
                <span>Max: 100%</span>
              </div>
            </div>

            {/* National Entrance: JEE Main & CUET */}
            <div className="p-4 rounded-lg bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">Q</span>
                  <span>National Entrance (JEE Main / CUET)</span>
                </label>
                <div className="font-mono text-xs font-semibold text-slate-900 dark:text-white tabular-nums">
                  {profile.jeePercentile.toFixed(1)} %ile
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">JEE Main %ile</div>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={profile.jeePercentile}
                    onChange={(e) => updateField('jeePercentile', parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono tabular-nums"
                  />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">CUET Score (out of 800)</div>
                  <input
                    type="number"
                    min="0"
                    max="800"
                    step="10"
                    value={profile.cuetScore}
                    onChange={(e) => updateField('cuetScore', parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono tabular-nums"
                  />
                </div>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 flex justify-between">
                <span>Rule: JEE ≥ 90.0 %ile OR CUET ≥ 650</span>
                <span className={evaluatedProps.Q ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-slate-500'}>
                  {evaluatedProps.Q ? 'Q = True' : 'Q = False'}
                </span>
              </div>
            </div>

            {/* Annual Household Income (EWS / S) */}
            <div className="p-4 rounded-lg bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">S</span>
                  <span>Annual Family Gross Income</span>
                </label>
                <span className="font-mono text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                  ₹{profile.householdIncome.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="2500000"
                step="25000"
                value={profile.householdIncome}
                onChange={(e) => updateField('householdIncome', parseInt(e.target.value))}
                className="w-full accent-blue-600 dark:accent-blue-400 cursor-pointer"
              />
              <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                <span>₹1 Lakh</span>
                <span className={evaluatedProps.S ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-slate-500'}>
                  EWS / Need: ≤ ₹6,00,000 ({evaluatedProps.S ? 'S = True' : 'S = False'})
                </span>
                <span>₹25 Lakhs+</span>
              </div>
            </div>

            {/* Intended Degree Stream */}
            <div className="p-4 rounded-lg bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
              <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mb-2">
                Target Undergrad Course / Degree Track
              </label>
              <input
                type="text"
                value={profile.intendedStream}
                onChange={(e) => updateField('intendedStream', e.target.value)}
                placeholder="e.g. B.Tech Computer Science & Engineering"
                className="w-full px-3 py-2 text-xs rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                Program counseling through JoSAA / CSAB / Central Universities
              </div>
            </div>
          </div>

          {/* Section 2: Qualitative Institutional Verifications */}
          <div className="pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Certificates & Regulatory Undertakings (UGC / AICTE / JoSAA)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* R: Stream Prerequisites */}
              <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.hasStreamPrereqs}
                  onChange={(e) => updateField('hasStreamPrereqs', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">R</span>
                    <span>10+2 Stream Prerequisites (PCM / PCB)</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    Passed Physics, Chemistry, Math/Bio from CBSE/ICSE/State Board
                  </p>
                </div>
              </label>

              {/* T: National Olympiad / KVPY */}
              <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.hasNationalDistinction}
                  onChange={(e) => updateField('hasNationalDistinction', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">T</span>
                    <span>Olympiad / KVPY / Innovation</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    KVPY scholar, Science Olympiad medalist, or Smart India Hackathon
                  </p>
                </div>
              </label>

              {/* U: NCC / NSS Service */}
              <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.hasNssNccHours}
                  onChange={(e) => updateField('hasNssNccHours', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">U</span>
                    <span>NCC Cadet / NSS Service</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    NCC "B"/"C" certificate or 50+ hours in National Service Scheme
                  </p>
                </div>
              </label>

              {/* V: Transfer Certificate (TC) & Conduct */}
              <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.hasConductCertificate}
                  onChange={(e) => updateField('hasConductCertificate', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">V</span>
                    <span>School Transfer (TC) & Character</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    Official School Leaving Certificate / TC with clean conduct
                  </p>
                </div>
              </label>

              {/* W: UGC Anti-Ragging Undertaking */}
              <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.signedAntiRagging}
                  onChange={(e) => updateField('signedAntiRagging', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">W</span>
                    <span>UGC Anti-Ragging Affidavit</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    Mandatory anti-ragging undertaking signed via antiragging.in
                  </p>
                </div>
              </label>

              {/* X: State Domicile */}
              <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.hasHomeStateDomicile}
                  onChange={(e) => updateField('hasHomeStateDomicile', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">X</span>
                    <span>Home State Domicile Certificate</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    Valid domicile certificate for 50% NIT / 85% State quota
                  </p>
                </div>
              </label>

              {/* Y: First-Gen or Single Girl Child */}
              <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.isFirstGenOrGirlChild}
                  onChange={(e) => updateField('isFirstGenOrGirlChild', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">Y</span>
                    <span>First-Gen Scholar / Girl Child</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    First-in-family graduate OR AICTE Pragati single girl child
                  </p>
                </div>
              </label>

              {/* Z: Language Paper Benchmark */}
              <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.passedLanguagePaper}
                  onChange={(e) => updateField('passedLanguagePaper', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">Z</span>
                    <span>Language Paper Benchmark (≥ 60%)</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    Passed English or recognized state language paper in 10+2
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      ) : (
        /* Direct Boolean Propositional Matrix (Symbolic Mode) */
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-lg text-xs text-blue-900 dark:text-blue-200">
            <strong>Symbolic Logic Matrix Mode Active:</strong> You can directly flip truth values of individual atomic propositions below to test truth conditions and formal edge cases.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Object.keys(ATOMIC_PROPOSITIONS).map((key) => {
              const def = ATOMIC_PROPOSITIONS[key];
              const isTrue = evaluatedProps[key];
              return (
                <div
                  key={key}
                  className={`p-3 rounded-lg border transition-all flex items-center justify-between ${
                    isTrue
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="pr-2">
                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-900 dark:text-white">
                      <span className="text-blue-600 dark:text-blue-400">{key}:</span>
                      <span className="font-sans font-medium text-slate-800 dark:text-slate-200 truncate max-w-[130px]">
                        {def.name}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {def.thresholdText}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      // Map to profile field change
                      if (key === 'P') updateField('boardPercentage', isTrue ? 74.0 : 88.0);
                      if (key === 'Q') updateField('jeePercentile', isTrue ? 84.0 : 96.0);
                      if (key === 'R') updateField('hasStreamPrereqs', !isTrue);
                      if (key === 'S') updateField('householdIncome', isTrue ? 850000 : 420000);
                      if (key === 'T') updateField('hasNationalDistinction', !isTrue);
                      if (key === 'U') updateField('hasNssNccHours', !isTrue);
                      if (key === 'V') updateField('hasConductCertificate', !isTrue);
                      if (key === 'W') updateField('signedAntiRagging', !isTrue);
                      if (key === 'X') updateField('hasHomeStateDomicile', !isTrue);
                      if (key === 'Y') updateField('isFirstGenOrGirlChild', !isTrue);
                      if (key === 'Z') updateField('passedLanguagePaper', !isTrue);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                      isTrue
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                    }`}
                  >
                    {isTrue ? 'T' : 'F'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
