import React, { useState } from 'react';
import { STUDENT_PERSONAS } from '../data/programs';
import { StudentProfile } from '../types/logic';
import { GraduationCap } from 'lucide-react';
import heroAcademicImage from '../assets/images/hero_academic_logic_1794227047816.jpg';

interface HeroBannerProps {
  onSelectPersona: (profile: StudentProfile, name: string) => void;
  activePersonaName: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectPersona,
  activePersonaName,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Propositional Logic Proposition & Headings */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold">INDIAN HIGHER EDUCATION ADMISSIONS</span>
              <span aria-hidden="true">·</span>
              <span>JoSAA / AICTE / NSP / DST</span>
              <span aria-hidden="true">·</span>
              <span>Session 2026–2027</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              Scholarship & Admission Eligibility Assistant
            </h1>

            <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Admission cutoffs and national scholarships (JoSAA, Central Universities, AICTE Pragati, DST INSPIRE, and NSP Merit-cum-Means) operate on strict Boolean rules. 
              Our propositional logic system validates your Class 12th Board marks, JEE Main / CUET percentiles, and EWS criteria through formal logic formulas <span className="font-mono text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">(P ∨ Q) ∧ R ∧ W</span> to tell you definitively whether to apply.
            </p>

            {/* Quick Test Drive Personas */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Test Drive with Sample Candidate Profiles:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {STUDENT_PERSONAS.map((persona) => {
                  const isSelected = activePersonaName === persona.name;
                  return (
                    <button
                      key={persona.id}
                      onClick={() => onSelectPersona(persona.profile, persona.name)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap text-left ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <span className="font-semibold">{persona.name}</span>
                      <span className="text-[11px] opacity-75 ml-1.5 hidden sm:inline">({persona.tagline})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Campus Architectural Anchor */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 aspect-16/10">
              {!imageError && (
                <img
                  src={heroAcademicImage}
                  alt="Ramanujan Hall of Advanced Learning with students and geometric logic courtyard"
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}

              {/* Styled Fallback Container if image fails or while loading */}
              {(!imageLoaded || imageError) && (
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent">
                  <div className="text-xs font-mono text-blue-400">RAMANUJAN HALL · NATIONAL ADMISSIONS CONSORTIUM</div>
                  <div className="text-sm font-semibold text-white mt-1">Indian Higher Education Decision Portal</div>
                  <div className="text-xs text-slate-300 mt-1">JoSAA / AICTE / DST INSPIRE Logic System</div>
                </div>
              )}

              {/* Discreet photo overlay caption */}
              {imageLoaded && !imageError && (
                <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent text-white text-xs">
                  <div className="font-semibold text-slate-100">Ramanujan Centre for Admissions Reasoning</div>
                  <div className="text-[11px] text-slate-300">National Scholarship & College Allocation Framework</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
