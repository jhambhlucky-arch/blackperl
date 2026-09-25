import React, { useEffect } from 'react';
import { Shield, ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacy';

  useEffect(() => {
    document.title = isPrivacy ? "Privacy Policy | BlackPerl DFIR" : "Terms & Conditions | BlackPerl DFIR";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", isPrivacy 
        ? "Privacy Policy for BlackPerl DFIR and the BCAD training program." 
        : "Terms & Conditions for BlackPerl DFIR and the BCAD practical training labs."
      );
    }
    window.scrollTo(0, 0);
  }, [isPrivacy]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans">
      <section className="relative pt-36 pb-20 md:pt-40 md:pb-24 bg-gradient-to-br from-[#020617] via-[#051733] to-[#020617] border-b border-slate-900/80">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <button 
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs font-mono text-teal-400 hover:text-teal-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          
          {/* LOCKED H1 */}
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            {isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
          </h1>
          <p className="font-mono text-xs text-slate-400">
            Last Updated: January 2026 · BlackPerl DFIR Legal & Compliance
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#F8FBFC] via-[#EEF7F8] to-[#F4F9FA] text-slate-800 flex-1">
        <div className="max-w-4xl mx-auto px-6 space-y-8 font-sans text-sm leading-relaxed text-slate-700">
          {isPrivacy ? (
            <>
              <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="font-display text-lg font-bold text-[#020617]">1. Information We Collect</div>
                <p>
                  BlackPerl DFIR collects registration details (name, email address, corporate telephone number) strictly to administer instructional communications, cohort schedules, and individual laboratory provisioning credentials.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="font-display text-lg font-bold text-[#020617]">2. Cyber Range Telemetry & Privacy</div>
                <p>
                  All cyber range activities are hosted on isolated virtual infrastructure. We monitor analytical command execution, query strings, and lab scoring strictly for grading, exam assessment, and instructor feedback. We never access personal devices.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="font-display text-lg font-bold text-[#020617]">3. Data Protection & Sharing</div>
                <p>
                  We maintain zero third-party commercial data-sharing agreements. Your information is never sold to recruitment vendors or advertising brokers. For enterprise cohorts, candidate progress reports are shared solely with authorized organizational sponsors.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="font-display text-lg font-bold text-[#020617]">1. Laboratory Code of Conduct</div>
                <p>
                  Laboratory access credentials and simulated adversary malware samples are provided exclusively for defensive pedagogical analysis within designated BlackPerl sandboxes. Exporting payloads outside isolated sandbox networks is strictly prohibited.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="font-display text-lg font-bold text-[#020617]">2. Certification Evaluation Standards</div>
                <p>
                  BCAD credential eligibility requires authentic completion of practical lab milestones and submission of an original 24-hour examination incident dossier. Plagiarism or automated unauthorized AI tooling during exam sessions results in immediate disqualification.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="font-display text-lg font-bold text-[#020617]">3. Skill Alignment Disclaimer</div>
                <p>
                  BCAD structures realistic assessments modeled after industry defensive engineering roles. BlackPerl DFIR does not issue speculative guarantees of third-party employment, as employer hiring criteria vary by organization and candidate experience.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
