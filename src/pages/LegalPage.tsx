import React, { useEffect } from 'react';
import { ArrowLeft, Shield, CheckCircle2, Lock, FileText, Mail, Phone, MessageSquare } from 'lucide-react';
import { applySEO } from '../utils/seo';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacy';

  useEffect(() => {
    applySEO(isPrivacy ? '/privacy-policy' : '/terms-and-conditions');
    window.scrollTo(0, 0);
  }, [isPrivacy]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans">
      {/* Header Section */}
      <section className="relative pt-36 pb-16 md:pt-40 md:pb-20 bg-gradient-to-br from-[#020617] via-[#051733] to-[#020617] border-b border-slate-900/80">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <button 
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs font-mono text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
          </h1>
          <p className="font-mono text-xs text-slate-400">
            BlackPerl DFIR · BlackPerl Certified Advanced Defender (BCAD)
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#F8FBFC] via-[#EEF7F8] to-[#F4F9FA] text-slate-800 flex-1">
        <div className="max-w-4xl mx-auto px-6 space-y-8 font-sans text-sm leading-relaxed text-slate-700">
          
          {isPrivacy ? (
            <>
              {/* Section 1: Overview */}
              <div className="p-6 md:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="font-display text-lg font-bold text-[#020617] flex items-center gap-2">
                  <Shield className="w-5 h-5 text-teal-600" />
                  1. Information We Collect
                </div>
                <p>
                  BlackPerl DFIR collects information strictly necessary to process admissions enquiries, schedule advisor consultations, and administer the Defender Readiness Snapshot:
                </p>
                <ul className="space-y-2 list-disc pl-5 text-xs md:text-sm text-slate-600 pt-1">
                  <li><strong className="text-slate-800">Admissions & Contact Information:</strong> Full Name, Email Address, and Phone Number / WhatsApp contact provided when booking a consultation or submitting an inquiry.</li>
                  <li><strong className="text-slate-800">Consent Records:</strong> Explicit affirmative consent checkboxes recorded when submitting admissions requests or requesting snapshot access.</li>
                  <li><strong className="text-slate-800">Simulation Interaction Data:</strong> Non-personal interaction telemetry from the 6-stage Interactive Range (alert triage, query input, Sigma configuration, containment execution).</li>
                  <li><strong className="text-slate-800">Private Snapshot Reference ID:</strong> A randomized reference identifier (e.g., <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-teal-700">BCAD-REF-XXXX</code>) generated to associate a specific simulation result without exposing personal identifiers.</li>
                </ul>
              </div>

              {/* Section 2: Data Storage & Infrastructure */}
              <div className="p-6 md:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="font-display text-lg font-bold text-[#020617] flex items-center gap-2">
                  <Lock className="w-5 h-5 text-teal-600" />
                  2. Data Storage & Infrastructure
                </div>
                <p>
                  Admissions submissions and contact requests are securely transmitted to and stored within Google Cloud Firestore database infrastructure (<code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">advisory_inquiries</code>). 
                </p>
                <p>
                  The interactive simulation operates within client-side browser session memory. We do not use third-party advertising tracking pixels, commercial data-sharing networks, or behavioral advertising cookies.
                </p>
              </div>

              {/* Section 3: Purpose & Usage */}
              <div className="p-6 md:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="font-display text-lg font-bold text-[#020617] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  3. How Information Is Used
                </div>
                <p>
                  Information collected through this site is used exclusively for:
                </p>
                <ul className="space-y-1.5 list-disc pl-5 text-xs md:text-sm text-slate-600 pt-1">
                  <li>Responding to prospective learner and corporate batch enquiries.</li>
                  <li>Providing cohort dates, batch timings, and curriculum details via email, phone, or WhatsApp.</li>
                  <li>Delivering the requested Defender Readiness Snapshot summary.</li>
                </ul>
                <p className="pt-1">
                  We never sell, rent, or trade your personal contact information to third-party recruitment agencies, advertisers, or brokers.
                </p>
              </div>

              {/* Section 4: Admissions Contact */}
              <div className="p-6 md:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="font-display text-lg font-bold text-[#020617] flex items-center gap-2">
                  <Mail className="w-5 h-5 text-teal-600" />
                  4. Admissions & Data Contact
                </div>
                <p>
                  For any privacy enquiries, data update requests, or admissions queries, please contact the BlackPerl Admissions Office directly:
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs md:text-sm font-sans">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Email: <a href="mailto:Jhambhlucky@gmail.com" className="text-teal-700 font-semibold hover:underline font-mono">Jhambhlucky@gmail.com</a></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Phone / WhatsApp: <a href="tel:+919972641801" className="text-teal-700 font-semibold hover:underline font-mono">+91 99726 41801</a></span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Terms Section 1: Use of Site */}
              <div className="p-6 md:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="font-display text-lg font-bold text-[#020617] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  1. Website Use & Informational Purpose
                </div>
                <p>
                  This website is provided by BlackPerl DFIR to present curriculum information, corporate training details, and admissions booking options for the BlackPerl Certified Advanced Defender (BCAD) program.
                </p>
                <p>
                  All curriculum outlines, tool references, module descriptions, and schedules are provided for informational and planning purposes.
                </p>
              </div>

              {/* Terms Section 2: Interactive Range & Snapshot Disclaimer */}
              <div className="p-6 md:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="font-display text-lg font-bold text-[#020617] flex items-center gap-2">
                  <Shield className="w-5 h-5 text-teal-600" />
                  2. Interactive Range & Defender Readiness Snapshot Disclaimer
                </div>
                <p>
                  The six-stage Interactive Range hosted on this site is a simulated, browser-based demonstration designed to illustrate practical cyber defense workflows (alert triage, log investigation, threat hunting, detection engineering, and containment).
                </p>
                <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200/80 text-xs md:text-sm text-amber-900 space-y-2">
                  <p className="font-semibold">Important Indicative Snapshot Notice:</p>
                  <p>
                    The Defender Readiness Snapshot generated upon completing the simulation is an <strong>indicative learning snapshot</strong> summarizing user interactions during the demo challenge. It is <strong>not</strong> a formal certification, accredited qualification, proof of employability, or job guarantee. Formal BCAD certification is awarded only upon successful completion of the live training program and 24-hour practical examination.
                  </p>
                </div>
              </div>

              {/* Terms Section 3: Admissions & Enquiries */}
              <div className="p-6 md:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="font-display text-lg font-bold text-[#020617] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  3. Admissions & Communications
                </div>
                <p>
                  By submitting an advisor booking form or requesting a readiness snapshot, you agree to receive direct communication from BlackPerl DFIR admissions representatives regarding cohort schedules, prerequisites, and program details. You may opt out of further communications at any time by notifying our admissions team.
                </p>
              </div>

              {/* Terms Section 4: Intellectual Property */}
              <div className="p-6 md:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="font-display text-lg font-bold text-[#020617] flex items-center gap-2">
                  <Lock className="w-5 h-5 text-teal-600" />
                  4. Intellectual Property
                </div>
                <p>
                  All curriculum materials, threat scenarios, simulated log artifacts, brand marks, and site designs are the intellectual property of BlackPerl DFIR. Unauthorised reproduction or commercial redistribution without prior written consent is strictly prohibited.
                </p>
              </div>

              {/* Terms Section 5: Admissions Contact */}
              <div className="p-6 md:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="font-display text-lg font-bold text-[#020617] flex items-center gap-2">
                  <Mail className="w-5 h-5 text-teal-600" />
                  5. Contact Information
                </div>
                <p>
                  For questions regarding these Terms & Conditions or BCAD admissions, contact:
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs md:text-sm font-sans">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Email: <a href="mailto:Jhambhlucky@gmail.com" className="text-teal-700 font-semibold hover:underline font-mono">Jhambhlucky@gmail.com</a></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Phone / WhatsApp: <a href="tel:+919972641801" className="text-teal-700 font-semibold hover:underline font-mono">+91 99726 41801</a></span>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </section>
    </div>
  );
};
