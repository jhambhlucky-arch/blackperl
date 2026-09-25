import React, { useEffect } from 'react';
import { 
  Shield, 
  Terminal, 
  Search, 
  Cpu, 
  Activity, 
  Database, 
  Network, 
  CloudLightning, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Calendar, 
  Award, 
  FileCheck, 
  HelpCircle, 
  Layers, 
  Users,
  Code
} from 'lucide-react';
import { MODULES, TOOL_CATEGORIES } from '../data/curriculumData';

interface ProgramPageProps {
  onNavigate: (path: string) => void;
}

export const ProgramPage: React.FC<ProgramPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = "BCAD Program | SOC, Threat Hunting, DFIR & Detection Engineering";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Explore the BCAD program from BlackPerl DFIR, including SOC operations, detection engineering, threat hunting, DFIR, incident response, practical labs and assessment.");
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans">
      
      {/* PROGRAM HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-to-br from-[#020617] via-[#051630] to-[#020617] animate-hero-gradient border-b border-slate-900/80">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#07152a_1px,transparent_1px),linear-gradient(to_bottom,#07152a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono text-[10px] uppercase tracking-wider font-semibold">
                CURRICULUM ARCHITECTURE
              </span>
              <span className="text-slate-300 font-sans font-medium text-xs">
                Comprehensive Technical Blueprint
              </span>
            </div>

            {/* LOCKED H1 */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              BCAD — A Connected Defensive-Security Learning Pathway
            </h1>

            <p className="font-sans text-slate-300 text-base md:text-[18px] leading-relaxed font-normal max-w-2xl">
              An exhaustive technical roadmap for defensive cybersecurity professionals. Connect enterprise telemetry, threat detection engineering, memory analysis, and structural enterprise response into a single unified operational discipline.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => onNavigate('/contact')}
                className="px-6 py-3.5 text-sm font-sans font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-all duration-200 shadow-[0_4px_20px_rgba(20,184,166,0.35)] flex items-center gap-2 group cursor-pointer"
              >
                Talk to a BCAD Advisor
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('curriculum-domains');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 text-sm font-sans font-semibold text-slate-200 hover:text-white bg-slate-900/70 hover:bg-slate-800/90 border border-slate-750 rounded-lg transition-all duration-200 cursor-pointer"
              >
                View the BCAD Curriculum
              </button>
            </div>

            {/* Proof Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-800/80 max-w-2xl">
              <div>
                <div className="font-display text-3xl font-extrabold text-teal-400">140+</div>
                <div className="font-sans text-xs text-slate-400 mt-1 font-medium">Training Hours</div>
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-teal-400">188</div>
                <div className="font-sans text-xs text-slate-400 mt-1 font-medium">Hands-On Labs</div>
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-teal-400">8</div>
                <div className="font-sans text-xs text-slate-400 mt-1 font-medium">Core Domains</div>
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-teal-400">24h</div>
                <div className="font-sans text-xs text-slate-400 mt-1 font-medium">Practical Assessment</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1: WHAT BCAD COVERS */}
      <section className="py-24 bg-gradient-to-b from-[#F8FBFC] via-[#EEF7F8] to-[#F4F9FA] text-slate-800 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">PROGRAM SCOPE</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#020617] tracking-tight">
              What BCAD Covers
            </h2>
            <p className="font-sans text-slate-655 text-base md:text-[17px] leading-relaxed font-normal">
              The BlackPerl Certified Advanced Defender curriculum spans eight interrelated technical domains. Rather than teaching siloed tools, BCAD focuses on the actual operational interactions between endpoints, identities, networks, and cloud providers during a cyber conflict.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MODULES.map((mod, idx) => (
              <div key={mod.id} className="bg-white/95 p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/50">
                      DOMAIN 0{idx + 1}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-medium">{mod.hours}h</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-[#020617] leading-snug">{mod.title}</h3>
                  <p className="font-sans text-xs text-slate-600 leading-relaxed font-normal">
                    {mod.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex flex-wrap gap-1">
                  {mod.tools.slice(0, 3).map((tool, i) => (
                    <span key={i} className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW THE DEFENSIVE-SECURITY SKILLS CONNECT */}
      <section className="py-24 bg-[#020617] text-slate-100 border-b border-slate-900/80 relative">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">INTEGRATED WORKFLOW</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              How the Defensive-Security Skills Connect
            </h2>
            <p className="font-sans text-slate-300 text-base md:text-[17px] leading-relaxed font-normal">
              In a modern cybersecurity operations center, an alert is not an isolated event. A signal from EDR requires contextual memory triage, which exposes a living-off-the-land persistence technique, demanding an immediate custom Sigma rule and rapid host containment.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#040e24] border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-teal-400 font-bold block">1. SIGNAL</span>
                <div className="font-display text-sm font-bold text-white">SOC Telemetry</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">Continuous ingestion from SIEM, Sysmon, and event correlation pipelines.</p>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-teal-400 font-bold block">2. ANALYSIS</span>
                <div className="font-display text-sm font-bold text-white">DFIR Investigation</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">Disk artefacts, process lineage reconstruction, and memory dump dissection.</p>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-teal-400 font-bold block">3. HUNT</span>
                <div className="font-display text-sm font-bold text-white">Threat Hunting</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">Enterprise-wide behavioral queries to locate stealthy lateral motion.</p>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-teal-400 font-bold block">4. CODIFY</span>
                <div className="font-display text-sm font-bold text-white">Detection Eng</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">Authoring narrow Sigma, YARA, and KQL rules to immunize the organization.</p>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-teal-400 font-bold block">5. RESPOND</span>
                <div className="font-display text-sm font-bold text-white">Incident Response</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">Host isolation, credential revocation, and clean remediation workflows.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE DOMAINS WITH LOCKED H2 HEADINGS */}
      <div id="curriculum-domains" className="py-24 bg-gradient-to-b from-[#F8FBFC] via-[#EEF7F8] to-[#F4F9FA] text-slate-800 border-b border-slate-200/50 space-y-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">DETAILED SYLLABUS BREAKDOWN</span>
            <div className="font-display text-3xl md:text-4xl font-bold text-[#020617] tracking-tight">
              Comprehensive Domain Modules
            </div>
            <p className="font-sans text-slate-655 text-base md:text-[17px] leading-relaxed font-normal">
              Each domain below represents an integral technical pillar of the BCAD live program.
            </p>
          </div>

          <div className="space-y-12">
            
            {/* H2: SOC & Security Operations */}
            <div className="bg-white/95 p-8 rounded-2xl border border-slate-200/80 shadow-md space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                <div>
                  <span className="text-xs font-mono text-teal-700 font-bold uppercase tracking-wider">DOMAIN 01</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#020617] mt-1">
                    SOC & Security Operations
                  </h2>
                </div>
                <div className="text-right">
                  <span className="font-display text-sm font-bold text-[#020617] block">26 Lessons · 20 Hours</span>
                  <span className="text-xs font-mono text-slate-500 font-medium">Splunk · Elastic · Sysmon · Wazuh</span>
                </div>
              </div>
              <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed font-normal">
                Modern security operations center engineering. Learn how to architect log pipelines, ingest high-volume telemetry, validate parser fidelity, and eliminate false positives while preserving vital security indicators.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div className="font-sans text-xs font-semibold text-slate-900 mb-2">Core Competencies:</div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-normal">
                    <li>Log pipeline architecture and forwarder security</li>
                    <li>Designing parsing and field extraction rules</li>
                    <li>Alert fidelity tuning and metric-driven thresholding</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div className="font-sans text-xs font-semibold text-slate-900 mb-2">Practical Lab Scenarios:</div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-normal">
                    <li>Debugging corrupt parser streams under heavy load</li>
                    <li>Normalizing multi-vendor Windows Security and Sysmon events</li>
                    <li>Synthesizing multi-stage correlation queries</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* H2: Detection Engineering */}
            <div className="bg-white/95 p-8 rounded-2xl border border-slate-200/80 shadow-md space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                <div>
                  <span className="text-xs font-mono text-teal-700 font-bold uppercase tracking-wider">DOMAIN 02</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#020617] mt-1">
                    Detection Engineering
                  </h2>
                </div>
                <div className="text-right">
                  <span className="font-display text-sm font-bold text-[#020617] block">28 Lessons · 22 Hours</span>
                  <span className="text-xs font-mono text-slate-500 font-medium">Sigma · YARA · KQL · Sysmon</span>
                </div>
              </div>
              <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed font-normal">
                Codify adversary tradecraft into durable, SIEM-agnostic rules. Learn the Detection Engineering lifecycle from research and threat hypothesis to rule deployment, testing, and continuous lifecycle maintenance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div className="font-sans text-xs font-semibold text-slate-900 mb-2">Core Competencies:</div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-normal">
                    <li>Authoring platform-independent Sigma detection logic</li>
                    <li>Crafting resilient YARA rules for memory payloads</li>
                    <li>Auditing Sysmon configurations for telemetry blind spots</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div className="font-sans text-xs font-semibold text-slate-900 mb-2">Practical Lab Scenarios:</div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-normal">
                    <li>Authoring narrow rules targeting Living-off-the-Land Binaries (LOLBINs)</li>
                    <li>Testing rules against synthetic adversary emulation traces</li>
                    <li>Translating Sigma into Splunk SPL and Microsoft Sentinel KQL</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* H2: Advanced Threat Hunting */}
            <div className="bg-white/95 p-8 rounded-2xl border border-slate-200/80 shadow-md space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                <div>
                  <span className="text-xs font-mono text-teal-700 font-bold uppercase tracking-wider">DOMAIN 03</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#020617] mt-1">
                    Advanced Threat Hunting
                  </h2>
                </div>
                <div className="text-right">
                  <span className="font-display text-sm font-bold text-[#020617] block">24 Lessons · 18 Hours</span>
                  <span className="text-xs font-mono text-slate-500 font-medium">MITRE ATT&CK · Splunk · Suricata</span>
                </div>
              </div>
              <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed font-normal">
                Formulate data-driven hypotheses to identify stealthy attackers who have bypassed traditional security controls. Search for anomalous persistence, beaconing cadences, and stealthy lateral traversal.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div className="font-sans text-xs font-semibold text-slate-900 mb-2">Core Competencies:</div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-normal">
                    <li>Developing hypothesis-driven threat hunt methodologies</li>
                    <li>Mapping organizational telemetry to MITRE ATT&CK techniques</li>
                    <li>Uncovering quiet C2 beaconing using statistical timing analysis</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div className="font-sans text-xs font-semibold text-slate-900 mb-2">Practical Lab Scenarios:</div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-normal">
                    <li>Executing hunting queries across 1,000+ endpoint logs</li>
                    <li>Isolating Kerberos Golden Ticket and Pass-the-Hash indicators</li>
                    <li>Operationalizing threat intelligence feeds into proactive hunts</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* H2: Digital Forensics & Incident Response */}
            <div className="bg-white/95 p-8 rounded-2xl border border-slate-200/80 shadow-md space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                <div>
                  <span className="text-xs font-mono text-teal-700 font-bold uppercase tracking-wider">DOMAIN 04</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#020617] mt-1">
                    Digital Forensics & Incident Response
                  </h2>
                </div>
                <div className="text-right">
                  <span className="font-display text-sm font-bold text-[#020617] block">28 Lessons · 22 Hours</span>
                  <span className="text-xs font-mono text-slate-500 font-medium">Autopsy · FTK Imager · KAPE · Plaso</span>
                </div>
              </div>
              <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed font-normal">
                Comprehensive digital forensics and incident response. Learn evidence preservation, live triage acquisition, file system forensics, and microscopic timeline reconstruction after adversary intrusion.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div className="font-sans text-xs font-semibold text-slate-900 mb-2">Core Competencies:</div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-normal">
                    <li>Live system triage collection using KAPE</li>
                    <li>Master File Table ($MFT) and USN Journal analysis</li>
                    <li>Windows Registry, Shimcache, and Amcache forensics</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div className="font-sans text-xs font-semibold text-slate-900 mb-2">Practical Lab Scenarios:</div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-normal">
                    <li>Reconstructing browser history, download paths, and link files</li>
                    <li>Building unified event timelines using log2timeline / plaso</li>
                    <li>Tracing initial access vectors through weaponized documents</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* H2: Memory Forensics & Malware Analysis */}
            <div className="bg-white/95 p-8 rounded-2xl border border-slate-200/80 shadow-md space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                <div>
                  <span className="text-xs font-mono text-teal-700 font-bold uppercase tracking-wider">DOMAIN 05 & 06</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#020617] mt-1">
                    Memory Forensics & Malware Analysis
                  </h2>
                </div>
                <div className="text-right">
                  <span className="font-display text-sm font-bold text-[#020617] block">42 Lessons · 32 Hours</span>
                  <span className="text-xs font-mono text-slate-500 font-medium">Volatility 3 · Ghidra · x64dbg · CAPA</span>
                </div>
              </div>
              <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed font-normal">
                Dissect live memory images and unknown malicious executables. Identify reflective DLL loading, process hollowing, thread hijacking, rootkits, and extract configuration blocks directly from malware binaries.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div className="font-sans text-xs font-semibold text-slate-900 mb-2">Core Competencies:</div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-normal">
                    <li>Volatility 3 plugin execution for VAD tree analysis</li>
                    <li>Detecting unbacked executable code pages with malfind</li>
                    <li>Static triage, PE headers, and dynamic behavioral analysis</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div className="font-sans text-xs font-semibold text-slate-900 mb-2">Practical Lab Scenarios:</div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-normal">
                    <li>Carving Cobalt Strike beacon configurations from memory dumps</li>
                    <li>Unpacking stage-1 loaders in an isolated analysis laboratory</li>
                    <li>Extracting embedded C2 URLs, mutexes, and encryption keys</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* H2: Security Engineering & Modern Threats */}
            <div className="bg-white/95 p-8 rounded-2xl border border-slate-200/80 shadow-md space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                <div>
                  <span className="text-xs font-mono text-teal-700 font-bold uppercase tracking-wider">DOMAIN 07 & 08</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#020617] mt-1">
                    Security Engineering & Modern Threats
                  </h2>
                </div>
                <div className="text-right">
                  <span className="font-display text-sm font-bold text-[#020617] block">40 Lessons · 26 Hours</span>
                  <span className="text-xs font-mono text-slate-500 font-medium">Auditd · AWS CloudTrail · Azure AD · K8s</span>
                </div>
              </div>
              <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed font-normal">
                Design hardened infrastructure and defend modern multi-cloud workloads. Deconstruct identity attack paths across AWS and Azure, secure container orchestration environments, and automate containment mechanisms.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div className="font-sans text-xs font-semibold text-slate-900 mb-2">Core Competencies:</div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-normal">
                    <li>Auditd policy engineering for Linux MITRE ATT&CK coverage</li>
                    <li>CloudTrail & GuardDuty threat correlation</li>
                    <li>Investigating Kubernetes pod compromises and service accounts</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <div className="font-sans text-xs font-semibold text-slate-900 mb-2">Practical Lab Scenarios:</div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-normal">
                    <li>Investigating AWS S3 data exfiltration and credential theft</li>
                    <li>Tracing Azure Active Directory privilege escalation</li>
                    <li>Deploying automated API containment hooks upon alert trigger</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION: TOOLS AND TECHNOLOGIES */}
      <section className="py-24 bg-[#020617] text-slate-100 border-b border-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">ECOSYSTEM</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Tools and Technologies
            </h2>
            <p className="font-sans text-slate-300 text-base md:text-[17px] leading-relaxed font-normal">
              Work hands-on with the exact security instrumentation utilized by tier-1 security operations teams and global intelligence organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOOL_CATEGORIES.map((cat, i) => (
              <div key={i} className="p-6 bg-[#040e24] border border-slate-800 rounded-2xl space-y-3">
                <div className="text-xs font-mono text-teal-400 font-bold uppercase">{cat.category}</div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cat.tools.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 text-slate-300 border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed pt-2">
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: THE PRACTICAL LEARNING ENVIRONMENT */}
      <section className="py-24 bg-gradient-to-b from-[#F8FBFC] via-[#EEF7F8] to-[#F4F9FA] text-slate-800 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">METHODOLOGY</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#020617] tracking-tight">
              The Practical Learning Environment
            </h2>
            <p className="font-sans text-slate-655 text-base md:text-[17px] leading-relaxed font-normal">
              Theory alone does not stop an intrusion. Every participant receives individual access to a cloud-hosted enterprise laboratory simulating active directory domains, Linux servers, cloud workloads, and real adversary attack scripts.
            </p>
            <div className="space-y-3 font-sans text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Pre-configured target workstations and domain controllers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Real malware traces executed under controlled sandbox isolation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Live SIEM clusters with multi-gigabyte historical telemetry</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-2xl text-slate-300 font-mono text-xs space-y-4">
            <div className="text-teal-400 font-bold border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>bcad-terminal // lab-cluster-session</span>
              <span className="text-[10px] bg-teal-950 px-2 py-0.5 rounded text-teal-300 border border-teal-500/20">CONNECTED</span>
            </div>
            <div className="space-y-1 text-slate-400">
              <div>&gt; target_ip: 10.14.2.11 [DC01.BLACKPERL.INTERNAL]</div>
              <div>&gt; telemetry_ingestion: Active (4,820 events/sec)</div>
              <div>&gt; attack_simulation: Cobalt Strike Lateral Movement</div>
              <div className="text-teal-300">&gt; analyst_action: Volatility 3 pslist & malfind running...</div>
              <div className="text-amber-300">&gt; alert: Process injection detected in PID 2490 (svchost.exe)</div>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-300 font-sans">
              "The practical learning environment gives you the confidence to run commands under pressure during high-impact security investigations."
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: LIVE INSTRUCTOR-LED TRAINING */}
      <section className="py-24 bg-[#020617] text-slate-100 border-b border-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">DELIVERY MODEL</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Live Instructor-Led Training
            </h2>
            <p className="font-sans text-slate-300 text-base md:text-[17px] leading-relaxed font-normal">
              BCAD is delivered exclusively through live, interactive sessions led by active defensive security practitioners and forensic experts. No pre-recorded passive slides. You interact directly with instructors who solve real cyber attacks daily.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#040e24] border border-slate-800 rounded-xl space-y-2">
                <Clock className="w-5 h-5 text-teal-400" />
                <div className="font-display text-sm font-bold text-white">Interactive Q&A</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">Ask real-time questions, debug lab setups together, and discuss live attack campaigns.</p>
              </div>
              <div className="p-4 bg-[#040e24] border border-slate-800 rounded-xl space-y-2">
                <Users className="w-5 h-5 text-teal-400" />
                <div className="font-display text-sm font-bold text-white">Cohort Collaboration</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">Collaborate with peers across government defense agencies, financial institutions, and global tech firms.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 bg-gradient-to-br from-[#06183a] to-[#040e24] p-8 rounded-2xl border border-teal-500/20 space-y-4">
            <div className="text-xs font-mono text-teal-300 font-bold uppercase tracking-wider">UPCOMING BATCH SCHEDULE</div>
            <div className="space-y-3 font-sans">
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-sm font-semibold text-white">Weekend Cohort</span>
                <span className="text-xs text-teal-400 font-mono">Saturday & Sunday</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-sm font-semibold text-white">Weekday Intensive</span>
                <span className="text-xs text-teal-400 font-mono">Evening Sessions</span>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('/contact')}
              className="w-full py-3 bg-teal-400 hover:bg-teal-300 text-slate-950 font-sans font-semibold text-xs rounded-xl transition-all shadow-md mt-4 cursor-pointer"
            >
              Discuss Batch Timings with an Advisor
            </button>
          </div>
        </div>
      </section>

      {/* SECTION: PRACTICAL CERTIFICATION ASSESSMENT */}
      <section className="py-24 bg-gradient-to-b from-[#F8FBFC] via-[#EEF7F8] to-[#F4F9FA] text-slate-800 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 max-w-4xl space-y-8 text-center">
          <div className="space-y-4">
            <span className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">EVALUATION</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#020617] tracking-tight">
              Practical Certification Assessment
            </h2>
            <p className="font-sans text-slate-655 text-base md:text-[17px] leading-relaxed font-normal max-w-2xl mx-auto">
              The BCAD credential is not awarded for passing multiple-choice quizzes. Candidates complete a comprehensive 24-hour practical cyber defense exam inside a live simulated enterprise environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <span className="text-xs font-mono text-teal-700 font-bold block">PHASE 1</span>
              <div className="font-display text-base font-bold text-[#020617]">Incident Investigation</div>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">Extract and analyze artifacts from compromised endpoints, determine root cause, and establish the timeline.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <span className="text-xs font-mono text-teal-700 font-bold block">PHASE 2</span>
              <div className="font-display text-base font-bold text-[#020617]">Detection Engineering</div>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">Author, test, and deploy verified Sigma rules to permanently block the adversary's technique.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <span className="text-xs font-mono text-teal-700 font-bold block">PHASE 3</span>
              <div className="font-display text-base font-bold text-[#020617]">Executive Report</div>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">Deliver a professional incident response and remediation report suitable for leadership and regulatory bodies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: WHO SHOULD CONSIDER BCAD */}
      <section className="py-24 bg-[#020617] text-slate-100 border-b border-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">ELIGIBILITY</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Who Should Consider BCAD
            </h2>
            <p className="font-sans text-slate-300 text-base md:text-[17px] leading-relaxed font-normal">
              BCAD is designed for individuals committed to developing rigorous, production-grade technical capability in defensive cybersecurity operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#040e24] border border-slate-800 rounded-2xl space-y-3">
              <div className="font-display text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-400" />
                Ideal Candidate Backgrounds:
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-5 font-sans leading-relaxed">
                <li>SOC Analysts (Tier 1/2) looking to transition to tier-3 investigation or detection engineering</li>
                <li>System & Network Administrators moving into enterprise cyber defense</li>
                <li>Junior Security Professionals seeking structured, hands-on operational depth</li>
                <li>Information Security graduates with basic networking foundation ready for real environments</li>
              </ul>
            </div>
            <div className="p-6 bg-[#040e24] border border-slate-800 rounded-2xl space-y-3">
              <div className="font-display text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-teal-400" />
                Recommended Prerequisites:
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-5 font-sans leading-relaxed">
                <li>Fundamental comprehension of TCP/IP networking, routing, and DNS</li>
                <li>Familiarity with basic Windows and Linux command-line utilities</li>
                <li>Basic understanding of security concepts (authentication, firewalls, ports)</li>
                <li>No prior reverse-engineering or coding experience required</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 bg-gradient-to-b from-[#F8FBFC] via-[#EEF7F8] to-[#F4F9FA] text-slate-800 border-b border-slate-200/50">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">CLARITY</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#020617] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-slate-655 text-base leading-relaxed font-normal">
              Clear answers to prospective learner inquiries regarding training delivery, lab access, and certification.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <h3 className="font-display text-base font-bold text-[#020617]">What is the difference between BCAD and entry-level courses?</h3>
              <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                Entry-level courses typically focus on theoretical concepts and multiple-choice quizzes. BCAD is 100% practitioner-focused, placing you directly inside live enterprise SIEMs, memory debuggers, and attack scenarios where you analyze real raw telemetry.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <h3 className="font-display text-base font-bold text-[#020617]">How long do I retain lab access?</h3>
              <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                Participants receive generous lab environment access throughout the training duration and an additional extended window for exam preparation.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <h3 className="font-display text-base font-bold text-[#020617]">Can I attend while working full-time?</h3>
              <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                Yes. Cohorts are scheduled on weekends and evenings to accommodate working cybersecurity, IT, and systems professionals.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <h3 className="font-display text-base font-bold text-[#020617]">How is the certification exam administered?</h3>
              <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                The 24-hour practical assessment is hosted in a secure cloud environment. You investigate an intrusion, write detection rules, and submit an evidence-backed incident report evaluated by BlackPerl senior examiners.
              </p>
            </div>
          </div>

          <div className="pt-8 text-center">
            <button 
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3.5 text-sm font-sans font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-all shadow-md cursor-pointer"
            >
              Talk to a BCAD Advisor
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
