import React, { useEffect, useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Terminal, 
  Users, 
  Target, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Briefcase, 
  Mail, 
  Phone 
} from 'lucide-react';
import { PARTNERS } from '../data/curriculumData';
import { db, doc, setDoc, serverTimestamp, handleFirestoreError, OperationType } from '../firebase';

interface CorporateTrainingPageProps {
  onNavigate: (path: string) => void;
}

export const CorporateTrainingPage: React.FC<CorporateTrainingPageProps> = ({ onNavigate }) => {
  const [teamSize, setTeamSize] = useState('10-25 Analysts');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Cybersecurity Team Training | SOC, Threat Hunting & DFIR | BlackPerl";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "BlackPerl DFIR provides cybersecurity team training across SOC operations, detection engineering, threat hunting, DFIR and incident response. Talk to our team.");
    }
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !workEmail || !phone) {
      setError('Please provide all requested enterprise contact details.');
      return;
    }
    setError(null);
    setLoading(true);
    const inquiryId = 'corp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    try {
      await setDoc(doc(db, 'corporate_inquiries', inquiryId), {
        companyName: companyName.trim().slice(0, 120),
        contactName: contactName.trim().slice(0, 100),
        workEmail: workEmail.trim().slice(0, 120),
        phone: phone.trim().slice(0, 40),
        teamSize: teamSize.slice(0, 60),
        primaryNeed: 'Enterprise SOC, Threat Hunting & DFIR Custom Cohort Training',
        createdAt: serverTimestamp(),
        status: 'pending'
      });
      setSubmitted(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `corporate_inquiries/${inquiryId}`);
      setError('Failed to record corporate inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans">
      
      {/* CORPORATE HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-to-br from-[#020617] via-[#051732] to-[#020617] animate-hero-gradient border-b border-slate-900/80">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#07152a_1px,transparent_1px),linear-gradient(to_bottom,#07152a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono text-[10px] uppercase tracking-wider font-semibold">
                ENTERPRISE WORKFORCE RESILIENCE
              </span>
              <span className="text-slate-300 font-sans font-medium text-xs">
                Dedicated Team Programs
              </span>
            </div>

            {/* LOCKED H1 */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Build Stronger Defensive Capability Across Your Security Team
            </h1>

            <p className="font-sans text-slate-300 text-base md:text-[18px] leading-relaxed font-normal max-w-2xl">
              Equip your enterprise security operations center with unified technical capability. BlackPerl DFIR delivers instructor-led team upskilling tailored to your specific SIEM, EDR, and cloud environments.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#corporate-inquiry"
                className="px-6 py-3.5 text-sm font-sans font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-all duration-200 shadow-[0_4px_20px_rgba(20,184,166,0.35)] flex items-center gap-2 group cursor-pointer"
              >
                Discuss Team Training
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <button 
                onClick={() => onNavigate('/program')}
                className="px-6 py-3.5 text-sm font-sans font-semibold text-slate-200 hover:text-white bg-slate-900/70 hover:bg-slate-800/90 border border-slate-750 rounded-lg transition-all duration-200 cursor-pointer"
              >
                Explore the BCAD Program
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* TRUSTED BY ENTERPRISE STRIP */}
      <section className="bg-slate-950 border-b border-slate-900/80 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-semibold">
            TRUSTED BY DEFENSE & ENTERPRISE TEAMS
          </span>
          <div className="flex flex-wrap gap-8 items-center">
            {PARTNERS.map(p => (
              <span key={p.name} className="font-display font-bold text-slate-400 text-sm">{p.name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1: THE DEFENSIVE-SECURITY CAPABILITY GAP */}
      <section className="py-24 bg-gradient-to-b from-[#F8FBFC] via-[#EEF7F8] to-[#F4F9FA] text-slate-800 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">ORGANIZATIONAL CHALLENGE</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#020617] tracking-tight">
              The Defensive-Security Capability Gap
            </h2>
            <p className="font-sans text-slate-655 text-base md:text-[17px] leading-relaxed font-normal">
              Most enterprise security failures do not occur because of missing security tools; they happen because analysts are isolated in siloed operational tasks. When Level 1 monitoring cannot conduct fast memory triage, or threat hunters cannot write custom detection rules, attacks slip through uncontained.
            </p>
            <p className="font-sans text-slate-655 text-sm md:text-base leading-relaxed font-normal">
              BlackPerl bridges this gap by turning alert processors into cohesive defensive engineers capable of diagnosing and neutralizing multi-stage intrusion campaigns.
            </p>
          </div>
          <div className="lg:col-span-6 p-8 bg-white/95 rounded-2xl border border-slate-200/80 shadow-md space-y-4">
            <div className="font-display text-base font-bold text-[#020617]">Key Enterprise Pain Points We Resolve:</div>
            <div className="space-y-3 font-sans text-xs md:text-sm text-slate-600">
              <div className="p-3 bg-red-50 border border-red-200/60 rounded-xl text-red-900 flex items-start gap-2">
                <span className="font-bold shrink-0">❌ Alert Fatigue:</span>
                <span>Passive forwarding without understanding root cause or attacker lineage.</span>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-xl text-amber-900 flex items-start gap-2">
                <span className="font-bold shrink-0">⚠️ Tribal Knowledge Gaps:</span>
                <span>Inability to translate threat intelligence into reliable, codified Sigma detections.</span>
              </div>
              <div className="p-3 bg-teal-50 border border-teal-200/60 rounded-xl text-teal-900 flex items-start gap-2">
                <span className="font-bold shrink-0">✓ Unified Response:</span>
                <span>Our program aligns your SOC, DFIR, and hunt specialists under a single, verified tradecraft baseline.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRAINING FOR MODERN SECURITY TEAMS */}
      <section className="py-24 bg-[#020617] text-slate-100 border-b border-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">ENTERPRISE CURRICULUM</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Training for Modern Security Teams
            </h2>
            <p className="font-sans text-slate-300 text-base md:text-[17px] leading-relaxed font-normal">
              Structured modules designed to level-up security teams across government defense, banking, managed detection (MDR), and enterprise security operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* H2: SOC & Security Operations */}
            <div className="p-6 bg-[#040e24] border border-slate-800 rounded-2xl space-y-3">
              <h2 className="font-display text-lg font-bold text-white">
                SOC & Security Operations
              </h2>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Elevate Tier 1/2 analysts into proactive investigators. Master log pipeline architectures, telemetry ingestion, and alert threshold tuning.
              </p>
            </div>

            {/* H2: Detection Engineering */}
            <div className="p-6 bg-[#040e24] border border-slate-800 rounded-2xl space-y-3">
              <h2 className="font-display text-lg font-bold text-white">
                Detection Engineering
              </h2>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Train your engineering team to author durable Sigma, YARA, and KQL rules, reducing false positives and operational overhead.
              </p>
            </div>

            {/* H2: Threat Hunting */}
            <div className="p-6 bg-[#040e24] border border-slate-800 rounded-2xl space-y-3">
              <h2 className="font-display text-lg font-bold text-white">
                Threat Hunting
              </h2>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Empower your analysts to build hypotheses and actively hunt for living-off-the-land techniques using the MITRE ATT&CK matrix.
              </p>
            </div>

            {/* H2: Incident Response & DFIR */}
            <div className="p-6 bg-[#040e24] border border-slate-800 rounded-2xl space-y-3">
              <h2 className="font-display text-lg font-bold text-white">
                Incident Response & DFIR
              </h2>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Standardize triage evidence collection, memory forensics, and forensic timelining to contain breaches before data exfiltration occurs.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: PRACTICAL SECURITY TRAINING */}
      <section className="py-24 bg-gradient-to-b from-[#F8FBFC] via-[#EEF7F8] to-[#F4F9FA] text-slate-800 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">SIMULATION EXCELLENCE</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#020617] tracking-tight">
              Practical Security Training
            </h2>
            <p className="font-sans text-slate-655 text-base md:text-[17px] leading-relaxed font-normal">
              Your security personnel train inside an isolated cyber range recreating enterprise domain architectures, multi-cloud identities, and live telemetry streams. Teams practice real threat containment against realistic adversary emulation campaigns.
            </p>
            <div className="p-4 bg-white/80 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs font-mono text-teal-700 font-bold uppercase">TEAM METRICS & REPORTING:</div>
              <p className="text-xs text-slate-600 font-sans leading-relaxed font-normal">
                Enterprise managers receive objective performance telemetry, lab completion velocity, and skill gap benchmark reports on every participating team member.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-2xl text-slate-300 font-mono text-xs space-y-3">
            <div className="text-teal-400 font-bold border-b border-slate-800 pb-2">
              ENTERPRISE LAB ORCHESTRATION PLATFORM
            </div>
            <div className="space-y-1.5 text-slate-400">
              <div>&gt; Organization: Global Financial Services</div>
              <div>&gt; Team Size: 18 Security Engineers</div>
              <div>&gt; Assigned Cyber Range: Hybrid Active Directory + AWS Infrastructure</div>
              <div>&gt; Live Scenario: Ransomware Stage-2 Execution Detection</div>
              <div className="text-teal-300">&gt; Status: 100% of analysts deployed validated Sigma containment rules</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: DESIGNED AROUND YOUR TEAM'S REQUIREMENTS */}
      <section className="py-24 bg-[#020617] text-slate-100 border-b border-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">CUSTOMIZATION</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Designed Around Your Team's Requirements
            </h2>
            <p className="font-sans text-slate-300 text-base md:text-[17px] leading-relaxed font-normal">
              Every enterprise operates a distinct technology stack and threat profile. We customize lab telemetry, tools, and schedule to match your organizational priorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#040e24] border border-slate-800 rounded-2xl space-y-3">
              <div className="font-display text-base font-bold text-white">Tool Stack Customization</div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed font-normal">
                Focus on the SIEM, EDR, and log backends your team uses daily (Splunk, Elastic, Microsoft Sentinel, Wazuh, Sysmon).
              </p>
            </div>
            <div className="p-6 bg-[#040e24] border border-slate-800 rounded-2xl space-y-3">
              <div className="font-display text-base font-bold text-white">Flexible Scheduling</div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed font-normal">
                Delivered across dedicated shift blocks, weekend intensives, or phased weekly modules so your SOC operations remain fully covered.
              </p>
            </div>
            <div className="p-6 bg-[#040e24] border border-slate-800 rounded-2xl space-y-3">
              <div className="font-display text-base font-bold text-white">Dedicated Instructor Lead</div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed font-normal">
                Direct access to senior BlackPerl DFIR forensic specialists for private enterprise Q&A and operational reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: TALK TO BLACKPERL ABOUT TEAM TRAINING */}
      <section id="corporate-inquiry" className="py-24 bg-gradient-to-b from-[#F8FBFC] via-[#EEF7F8] to-[#F4F9FA] text-slate-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8">
            <div className="space-y-4 text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">ENTERPRISE CONSULTATION</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#020617] tracking-tight">
                Talk to BlackPerl About Team Training
              </h2>
              <p className="font-sans text-slate-655 text-sm md:text-base leading-relaxed font-normal">
                Schedule a technical alignment session with our training directors to review curriculum mapping, lab requirements, and custom cohort pricing.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">ORGANIZATION / COMPANY NAME:</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enterprise Security Inc."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">TEAM SIZE TO TRAIN:</label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans"
                    >
                      <option value="5-10 Analysts">5 - 10 Security Analysts</option>
                      <option value="10-25 Analysts">10 - 25 Security Analysts</option>
                      <option value="25-50 Analysts">25 - 50 Security Analysts</option>
                      <option value="50+ Enterprise Cohort">50+ Enterprise Cohort</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">YOUR NAME & TITLE:</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Vikram Singh, SOC Director"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">WORK EMAIL:</label>
                    <input 
                      type="email" 
                      required
                      placeholder="vikram@company.com"
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">PHONE NUMBER:</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98000 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-teal-400 hover:bg-teal-300 text-slate-950 font-sans font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Transmitting Inquiry...
                    </>
                  ) : (
                    <>
                      Request Enterprise Syllabus & Pricing Proposal →
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="font-display text-xl font-bold text-slate-950">Enterprise Proposal Requested</div>
                <p className="text-xs md:text-sm text-slate-600 font-sans max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-teal-700">{contactName}</span>. Our enterprise cybersecurity training directors will connect with you at <span className="underline text-slate-800">{workEmail}</span> within one business day.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};
