/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { StudentProfileForm } from './components/StudentProfileForm';
import { EligibilityVerdict } from './components/EligibilityVerdict';
import { TruthTableSection } from './components/TruthTableSection';
import { CustomRuleSandbox } from './components/CustomRuleSandbox';
import { LogicCheatSheet } from './components/LogicCheatSheet';
import { DossierModal } from './components/DossierModal';
import {
  DEFAULT_PROGRAMS,
  STUDENT_PERSONAS,
  ATOMIC_PROPOSITIONS,
  PROPOSITION_REMEDIES,
  evaluateStudentPropositions,
} from './data/programs';
import { ProgramRule, StudentProfile } from './types/logic';
import {
  evaluateWithProofSteps,
  findSatisfyingFixes,
} from './logic/engine';

export default function App() {
  const [activeTab, setActiveTab] = useState<'advisor' | 'truth-table' | 'sandbox' | 'primer'>('advisor');
  const [programs, setPrograms] = useState<ProgramRule[]>(DEFAULT_PROGRAMS);
  const [selectedProgram, setSelectedProgram] = useState<ProgramRule>(DEFAULT_PROGRAMS[0]);
  const [personaName, setPersonaName] = useState<string>(STUDENT_PERSONAS[0].name);
  const [profile, setProfile] = useState<StudentProfile>(STUDENT_PERSONAS[0].profile);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync dark mode class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Evaluate atomic propositions for student profile
  const evaluatedProps = useMemo(() => {
    return evaluateStudentPropositions(profile);
  }, [profile]);

  // Names map for human explanations
  const propNames = useMemo(() => {
    const map: Record<string, string> = {};
    Object.keys(ATOMIC_PROPOSITIONS).forEach((k) => {
      map[k] = ATOMIC_PROPOSITIONS[k].name;
    });
    return map;
  }, []);

  // Compute formal proof steps and overall verdict
  const { result: isEligible, steps } = useMemo(() => {
    return evaluateWithProofSteps(selectedProgram.ast, evaluatedProps, propNames);
  }, [selectedProgram, evaluatedProps, propNames]);

  // Compute minimal missing propositions (Gap Analysis)
  const missingPropositions = useMemo(() => {
    return findSatisfyingFixes(
      selectedProgram.ast,
      selectedProgram.relevantPropositions,
      evaluatedProps,
      PROPOSITION_REMEDIES
    );
  }, [selectedProgram, evaluatedProps]);

  // Handle persona selection
  const handleSelectPersona = (newProfile: StudentProfile, name: string) => {
    setProfile(newProfile);
    setPersonaName(name);
  };

  // Reset to default
  const handleResetToDefault = () => {
    setProfile(STUDENT_PERSONAS[0].profile);
    setPersonaName(STUDENT_PERSONAS[0].name);
  };

  // Add custom program from Sandbox
  const handleAddCustomProgram = (newProgram: ProgramRule) => {
    setPrograms((prev) => [newProgram, ...prev]);
    setSelectedProgram(newProgram);
    setActiveTab('advisor');
  };

  // Apply row truth assignment directly to student profile
  const handleApplyRowAssignment = (assignment: Record<string, boolean>) => {
    const updated = { ...profile };
    if ('P' in assignment) updated.boardPercentage = assignment.P ? 88.5 : 72.0;
    if ('Q' in assignment) updated.jeePercentile = assignment.Q ? 96.2 : 82.0;
    if ('R' in assignment) updated.hasStreamPrereqs = assignment.R;
    if ('S' in assignment) updated.householdIncome = assignment.S ? 450000 : 850000;
    if ('T' in assignment) updated.hasNationalDistinction = assignment.T;
    if ('U' in assignment) updated.hasNssNccHours = assignment.U;
    if ('V' in assignment) updated.hasConductCertificate = assignment.V;
    if ('W' in assignment) updated.signedAntiRagging = assignment.W;
    if ('X' in assignment) updated.hasHomeStateDomicile = assignment.X;
    if ('Y' in assignment) updated.isFirstGenOrGirlChild = assignment.Y;
    if ('Z' in assignment) updated.passedLanguagePaper = assignment.Z;

    setProfile(updated);
    setPersonaName('Custom Simulated State');
    setActiveTab('advisor');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Bar Contract compliant navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDossier={() => setIsDossierOpen(true)}
        isEligibleCurrent={isEligible}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Hero Section */}
      <HeroBanner
        onSelectPersona={handleSelectPersona}
        activePersonaName={personaName}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {activeTab === 'advisor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Decision Verdict, Math Formula, Proof Steps, Remediation */}
            <div className="lg:col-span-7">
              <EligibilityVerdict
                programs={programs}
                selectedProgram={selectedProgram}
                onSelectProgram={setSelectedProgram}
                isEligible={isEligible}
                evaluatedProps={evaluatedProps}
                steps={steps}
                missingPropositions={missingPropositions}
                onOpenDossier={() => setIsDossierOpen(true)}
                onJumpToTruthTable={() => setActiveTab('truth-table')}
              />
            </div>

            {/* Right Column: Interactive Profile Inputs & Atomic Proposition Status */}
            <div className="lg:col-span-5 sticky top-24">
              <StudentProfileForm
                profile={profile}
                onChangeProfile={(updated) => {
                  setProfile(updated);
                  if (personaName !== 'Customized Candidate') {
                    setPersonaName('Customized Candidate');
                  }
                }}
                evaluatedProps={evaluatedProps}
                onResetToDefault={handleResetToDefault}
              />
            </div>
          </div>
        )}

        {activeTab === 'truth-table' && (
          <TruthTableSection
            selectedProgram={selectedProgram}
            evaluatedProps={evaluatedProps}
            onApplyRowAssignment={handleApplyRowAssignment}
          />
        )}

        {activeTab === 'sandbox' && (
          <CustomRuleSandbox
            evaluatedProps={evaluatedProps}
            onAddCustomProgram={handleAddCustomProgram}
          />
        )}

        {activeTab === 'primer' && <LogicCheatSheet />}
      </main>

      {/* Official Dossier Modal */}
      <DossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        program={selectedProgram}
        profile={profile}
        evaluatedProps={evaluatedProps}
        isEligible={isEligible}
        steps={steps}
        missingPropositions={missingPropositions}
        personaName={personaName}
      />

      {/* Institutional Editorial Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors py-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">LogiScholar India</span>
            <span>·</span>
            <span>National Higher Education Admissions & Scholarship Advisory (JoSAA / AICTE / NSP)</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('primer')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Formal Logic Syntax
            </button>
            <button
              onClick={() => setActiveTab('truth-table')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Truth Tables
            </button>
            <button
              onClick={() => setIsDossierOpen(true)}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Eligibility Certificate
            </button>
          </div>

          <div>
            ISO/IEC Formal Propositional Logic Standard
          </div>
        </div>
      </footer>
    </div>
  );
}
