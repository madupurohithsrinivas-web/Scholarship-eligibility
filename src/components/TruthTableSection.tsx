import React, { useState, useMemo } from 'react';
import { ProgramRule, TruthTableRow } from '../types/logic';
import { generateTruthTable } from '../logic/engine';
import { ATOMIC_PROPOSITIONS } from '../data/programs';
import { Table, Filter, Sparkles, Check, X, Info } from 'lucide-react';

interface TruthTableSectionProps {
  selectedProgram: ProgramRule;
  evaluatedProps: Record<string, boolean>;
  onApplyRowAssignment: (assignment: Record<string, boolean>) => void;
}

export const TruthTableSection: React.FC<TruthTableSectionProps> = ({
  selectedProgram,
  evaluatedProps,
  onApplyRowAssignment,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'satisfying' | 'falsifying'>('all');

  // Limit variables to at most 6 for performance & readability in truth table (2^6 = 64 rows)
  const variables = useMemo(() => {
    return selectedProgram.relevantPropositions.slice(0, 6);
  }, [selectedProgram]);

  const truthTable = useMemo(() => {
    return generateTruthTable(selectedProgram.ast, variables, evaluatedProps);
  }, [selectedProgram, variables, evaluatedProps]);

  const filteredRows = useMemo(() => {
    if (filterMode === 'satisfying') {
      return truthTable.filter((r) => r.result);
    }
    if (filterMode === 'falsifying') {
      return truthTable.filter((r) => !r.result);
    }
    return truthTable;
  }, [truthTable, filterMode]);

  const satisfyingCount = truthTable.filter((r) => r.result).length;
  const totalRows = truthTable.length;
  const satisfiableRate = Math.round((satisfyingCount / totalRows) * 100);

  return (
    <div className="space-y-6">
      {/* Overview & Metadata */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
              <Table className="w-4 h-4" />
              <span>FORMAL TRUTH TABLE ANALYSIS</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Truth Table for {selectedProgram.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Exhaustive $2^{'{' + variables.length + '}'} = {totalRows}$ truth-functional evaluation.
              Your current profile corresponds to the highlighted active row.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Total States</div>
              <div className="font-mono text-base font-bold text-slate-900 dark:text-white tabular-nums">
                {totalRows}
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Satisfying (True)</div>
              <div className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {satisfyingCount} ({satisfiableRate}%)
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Classification</div>
              <div className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                {satisfyingCount === totalRows
                  ? 'Tautology'
                  : satisfyingCount === 0
                  ? 'Contradiction'
                  : 'Contingent'}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls (Functional Button Tabs) */}
        <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex-wrap">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All States ({totalRows})
            </button>
            <button
              onClick={() => setFilterMode('satisfying')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filterMode === 'satisfying'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Eligible Only ({satisfyingCount})
            </button>
            <button
              onClick={() => setFilterMode('falsifying')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filterMode === 'falsifying'
                  ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Ineligible Only ({totalRows - satisfyingCount})
            </button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>Click any row to simulate that exact propositional assignment</span>
          </div>
        </div>
      </div>

      {/* Proposition Legend Table */}
      <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/80 p-4">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
          Evaluated Proposition Symbols in this Formula:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {variables.map((v) => {
            const def = ATOMIC_PROPOSITIONS[v];
            const currentVal = evaluatedProps[v];
            return (
              <div
                key={v}
                className="text-xs flex items-center justify-between p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{v}:</span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[150px]">
                    {def?.name || v}
                  </span>
                </div>
                <span
                  className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded ${
                    currentVal
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  Now: {currentVal ? 'T' : 'F'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Truth Table Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto max-h-[520px]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800/90 backdrop-blur border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold z-10">
              <tr>
                <th className="py-3 px-4 font-mono text-center w-14">#</th>
                {variables.map((v) => (
                  <th key={v} className="py-3 px-3 font-mono text-center">
                    <span className="text-blue-600 dark:text-blue-400">{v}</span>
                  </th>
                ))}
                <th className="py-3 px-4 font-mono text-center bg-slate-200/60 dark:bg-slate-700/60">
                  Result: Formula
                </th>
                <th className="py-3 px-4 text-center">Profile State</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {filteredRows.map((row) => (
                <tr
                  key={row.rowId}
                  className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer ${
                    row.isCurrentProfile
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 font-semibold'
                      : ''
                  }`}
                  onClick={() => onApplyRowAssignment(row.assignment)}
                >
                  <td className="py-2.5 px-4 text-center text-slate-400 tabular-nums">
                    {row.rowId}
                  </td>
                  {variables.map((v) => {
                    const val = row.assignment[v];
                    return (
                      <td key={v} className="py-2.5 px-3 text-center tabular-nums">
                        <span
                          className={`inline-block w-5 h-5 leading-5 rounded text-center text-[11px] font-bold ${
                            val
                              ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                              : 'text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800'
                          }`}
                        >
                          {val ? 'T' : 'F'}
                        </span>
                      </td>
                    );
                  })}
                  <td className="py-2.5 px-4 text-center bg-slate-50/50 dark:bg-slate-800/30 tabular-nums">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold ${
                        row.result
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {row.result ? 'TRUE (Eligible)' : 'FALSE (Ineligible)'}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-center font-sans">
                    {row.isCurrentProfile ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded">
                        ● Current Profile
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-right font-sans">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onApplyRowAssignment(row.assignment);
                      }}
                      className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      Apply Row
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
