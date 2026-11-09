import React from 'react';
import { BookOpen, CheckCircle2, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  activeTab: 'advisor' | 'truth-table' | 'sandbox' | 'primer';
  setActiveTab: (tab: 'advisor' | 'truth-table' | 'sandbox' | 'primer') => void;
  onOpenDossier: () => void;
  isEligibleCurrent: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenDossier,
  isDarkMode,
  toggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 font-serif font-bold text-base shadow-sm">
              ∧
            </div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('advisor');
              }}
              className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap"
            >
              LogiScholar
            </a>
          </div>

          {/* Zone 2: 4 concise single-line text navigation links with subtle underline/active state */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveTab('advisor')}
              className={`transition-colors whitespace-nowrap py-1 cursor-pointer border-b-2 ${
                activeTab === 'advisor'
                  ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Eligibility Advisor
            </button>
            <button
              onClick={() => setActiveTab('truth-table')}
              className={`transition-colors whitespace-nowrap py-1 cursor-pointer border-b-2 ${
                activeTab === 'truth-table'
                  ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Truth Table Explorer
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`transition-colors whitespace-nowrap py-1 cursor-pointer border-b-2 ${
                activeTab === 'sandbox'
                  ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Custom Logic Sandbox
            </button>
            <button
              onClick={() => setActiveTab('primer')}
              className={`transition-colors whitespace-nowrap py-1 cursor-pointer border-b-2 ${
                activeTab === 'primer'
                  ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Logic Primer
            </button>
          </nav>

          {/* Zone 3: 1 primary action button + theme toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle visual theme"
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={onOpenDossier}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              Official Dossier
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
