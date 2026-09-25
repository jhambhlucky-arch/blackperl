/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Terminal,
  Search,
  Cpu,
  Database,
  Network,
  CloudLightning,
  Award,
  CheckCircle2,
  ChevronRight,
  Play,
  Code,
  AlertTriangle,
  AlertCircle,
  RefreshCw,
  Calendar,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Stars,
  Check,
  Clock,
  BookOpen,
  Filter,
  Activity,
  User,
  Users,
  BookOpenCheck,
  Info,
  Target,
  FileText,
  LogIn,
  LogOut,
  Cloud
} from 'lucide-react';

import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  FirebaseUser,
  db,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  handleFirestoreError,
  OperationType
} from './firebase';

import {
  MODULES,
  TOOL_CATEGORIES,
  ROLES_APPLICABILITY,
  STUDENT_TESTIMONIALS,
  CAPABILITIES,
  PARTNERS,
  CERTIFICATION_INFO,
  Module
} from './data/curriculumData';

import {
  SANDBOX_STEPS,
  RAW_SECURITY_LOG,
  SIGMA_TEMPLATE
} from './data/threatScenarios';

import { ProgramPage } from './pages/ProgramPage';
import { CorporateTrainingPage } from './pages/CorporateTrainingPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';

export default function App() {
  // Client Path Routing
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path: string) => {
    if (path.startsWith('/#')) {
      const hash = path.replace('/', '');
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.getElementById(hash.replace('#', ''));
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
      const el = document.getElementById(hash.replace('#', ''));
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (path.startsWith('#')) {
      const el = document.getElementById(path.replace('#', ''));
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'curriculum' | 'sandbox' | 'roles'>('home');

  // Capability Selector State (Hero)
  const [heroActiveCapability, setHeroActiveCapability] = useState<number>(0);

  // Curriculum State
  const [selectedModule, setSelectedModule] = useState<Module>(MODULES[0]);

  // Tool Interactive State
  const [selectedToolFilter, setSelectedToolFilter] = useState<string>('All');
  const allUniqueTools = ['All', 'Splunk', 'Elastic', 'Sysmon', 'Sigma Rules', 'YARA', 'KQL', 'Volatility 3', 'Suricata', 'KAPE', 'AWS CloudTrail'];

  // Sandbox Game State
  const [sandboxPhase, setSandboxPhase] = useState<'SIGNAL' | 'INVESTIGATION' | 'UNDERSTANDING' | 'HUNT' | 'ENGINEER' | 'RESPOND'>('SIGNAL');
  const [sandboxAnswer, setSandboxAnswer] = useState<string | null>(null);
  const [huntQuery, setHuntQuery] = useState<string>('');
  const [huntResults, setHuntResults] = useState<{ hostname: string; ip: string; count: number }[] | null>(null);
  const [huntLoading, setHuntLoading] = useState<boolean>(false);
  
  // Sigma Builder State
  const [sigmaImage, setSigmaImage] = useState<string>('powershell.exe');
  const [sigmaCommand, setSigmaCommand] = useState<string>('DownloadString');
  const [sigmaBuilt, setSigmaBuilt] = useState<string>('');

  // Response Sandbox State
  const [containState, setContainState] = useState<'IDLE' | 'CONTAINING' | 'SUCCESS'>('IDLE');

  // Lab Preview Interactive Terminal State
  const [labTab, setLabTab] = useState<'logs' | 'sigma' | 'alert'>('logs');
  const [scrolled, setScrolled] = useState(false);

  // Booking Form State
  const [bookingProfile, setBookingProfile] = useState<string>('Already Working in a SOC?');
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingEmail, setBookingEmail] = useState<string>('');
  const [bookingPhone, setBookingPhone] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  // Active role details
  const [activeRoleIndex, setActiveRoleIndex] = useState<number>(0);

  // Testimonial index
  const [testimonialIndex, setTestimonialIndex] = useState<number>(0);

  // Firebase Auth & Cloud Sync State
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [cloudSynced, setCloudSynced] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        try {
          const snapshot = await getDoc(doc(db, 'user_labs', currentUser.uid));
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (data.sigmaDraft) {
              setSigmaBuilt(data.sigmaDraft);
            }
          }
        } catch (err) {
          console.warn("Could not retrieve lab state:", err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Sign-in failed:", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign-out failed:", err);
    }
  };

  const syncLabStateToCloud = async () => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'user_labs', user.uid), {
        userId: user.uid,
        activeScenarioId: 'ransomware_initial_access',
        completedSteps: sandboxPhase,
        sigmaDraft: sigmaBuilt.slice(0, 3000),
        bookmarkedModules: selectedModule.id,
        updatedAt: serverTimestamp()
      }, { merge: true });
      setCloudSynced(true);
      setTimeout(() => setCloudSynced(false), 2500);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `user_labs/${user.uid}`);
    }
  };

  // Monitor scroll for premium glassmorphic header transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update Sigma rules text live as user selects values
  useEffect(() => {
    let replaced = SIGMA_TEMPLATE.replace('IMAGE_VALUE', sigmaImage).replace('COMMAND_VALUE', sigmaCommand);
    setSigmaBuilt(replaced);
  }, [sigmaImage, sigmaCommand]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingPhone || !bookingDate || !bookingTime) {
      setFormError('Please fill out all fields to schedule your advisor session.');
      return;
    }
    setFormError('');
    setBookingLoading(true);

    const inquiryId = 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    try {
      await setDoc(doc(db, 'advisory_inquiries', inquiryId), {
        fullName: bookingName.trim().slice(0, 100),
        email: bookingEmail.trim().slice(0, 120),
        phone: bookingPhone.trim().slice(0, 40),
        preferredDate: bookingDate.slice(0, 30),
        preferredTime: bookingTime.slice(0, 30),
        journeyStage: bookingProfile.slice(0, 100),
        focusArea: 'Defensive Operations & SOC',
        createdAt: serverTimestamp(),
        status: 'pending'
      });
      setBookingSubmitted(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `advisory_inquiries/${inquiryId}`);
      setFormError('Failed to record consultation booking. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  const executeHunt = () => {
    if (!huntQuery.toLowerCase().includes('103.45.12.89')) {
      alert('Your query is missing the critical Indicator of Compromise (C2 IP: 103.45.12.89). Ensure you scan for the correct adversary IP!');
      return;
    }
    setHuntLoading(true);
    setTimeout(() => {
      setHuntResults([
        { hostname: 'WS-DEV-04.BLACKPERL.INTERNAL', ip: '10.10.42.14', count: 4 },
        { hostname: 'WS-HR-09.BLACKPERL.INTERNAL', ip: '10.10.88.91', count: 12 }
      ]);
      setHuntLoading(false);
    }, 1200);
  };

  const triggerContainment = () => {
    setContainState('CONTAINING');
    setTimeout(() => {
      setContainState('SUCCESS');
    }, 2000);
  };

  const resetSandbox = () => {
    setSandboxPhase('SIGNAL');
    setSandboxAnswer(null);
    setHuntQuery('');
    setHuntResults(null);
    setSigmaImage('powershell.exe');
    setSigmaCommand('DownloadString');
    setContainState('IDLE');
  };

  // Filter tools logic
  const filteredModules = selectedToolFilter === 'All'
    ? MODULES
    : MODULES.filter(m => m.tools.some(t => t.toLowerCase().includes(selectedToolFilter.toLowerCase())));

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-teal-500/20 selection:text-teal-300">
      
      {/* HEADER: Top Bar Contract */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-[#020617]/90 backdrop-blur-md border-slate-800/80 py-3' : 'bg-transparent border-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* ZONE 1: BRAND ZONE */}
          <div className="flex flex-col cursor-pointer" onClick={() => navigate('/')}>
            <span className="font-display text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-teal-100 to-teal-400 bg-clip-text text-transparent">
              BlackPerl DFIR
            </span>
            <span className="text-[9px] font-mono tracking-widest text-teal-400 uppercase leading-none mt-1">
              Cyber Security · Forensics · Resilience
            </span>
          </div>

          {/* ZONE 2: NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-sans font-medium text-slate-300">
            <button 
              onClick={() => navigate('/program')} 
              className={`hover:text-teal-400 transition-colors cursor-pointer ${currentPath === '/program' ? 'text-teal-400 font-semibold' : ''}`}
            >
              Program
            </button>
            <button 
              onClick={() => navigate('/corporate-training')} 
              className={`hover:text-teal-400 transition-colors cursor-pointer ${currentPath === '/corporate-training' ? 'text-teal-400 font-semibold' : ''}`}
            >
              Corporate Training
            </button>
            <button 
              onClick={() => navigate('/#sandbox')} 
              className="hover:text-teal-400 transition-colors cursor-pointer"
            >
              Interactive Range
            </button>
            <button 
              onClick={() => navigate('/#tools')} 
              className="hover:text-teal-400 transition-colors cursor-pointer"
            >
              Technologies
            </button>
            <button 
              onClick={() => navigate('/contact')} 
              className={`hover:text-teal-400 transition-colors cursor-pointer font-semibold bg-slate-900/40 px-3 py-1 rounded-md border border-slate-800/60 ${currentPath === '/contact' ? 'text-teal-400 border-teal-500/50' : 'text-slate-200'}`}
            >
              Contact
            </button>
          </nav>

          {/* ZONE 3: PRIMARY ACTION */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-lg px-2.5 py-1.5">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'Analyst'} className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-teal-400" />
                )}
                <span className="text-xs font-mono text-slate-300 max-w-[90px] truncate hidden sm:inline">
                  {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
                </span>
                <button
                  onClick={handleSignOut}
                  title="Sign Out"
                  className="text-slate-400 hover:text-rose-400 transition-colors ml-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={authLoading}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-teal-400" />
                <span>Analyst Login</span>
              </button>
            )}

            <button 
              onClick={() => navigate('/contact')}
              className="px-4 py-2 text-xs font-sans font-semibold tracking-wide text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(20,184,166,0.3)] whitespace-nowrap active:scale-[0.98] cursor-pointer"
            >
              Talk to an Advisor →
            </button>
          </div>
        </div>
      </header>

      {/* CONDITIONAL PAGE RENDERING */}
      {currentPath === '/program' ? (
        <ProgramPage onNavigate={navigate} />
      ) : currentPath === '/corporate-training' ? (
        <CorporateTrainingPage onNavigate={navigate} />
      ) : currentPath === '/contact' ? (
        <ContactPage onNavigate={navigate} />
      ) : currentPath === '/privacy-policy' ? (
        <LegalPage type="privacy" onNavigate={navigate} />
      ) : currentPath === '/terms-and-conditions' ? (
        <LegalPage type="terms" onNavigate={navigate} />
      ) : (
        <>
          {/* HERO SECTION: The Visual Anchor */}
          <section id="about" className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden bg-[#020617] animate-hero-gradient">
            
            {/* Full Hero Environment Background Image (Spread across background, NOT in a container square) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src="/src/assets/images/hero_cybersecurity_soc_1790340612978.jpg" 
                alt="Cybersecurity analyst reviewing threat investigation telemetry in a SOC environment" 
                className="w-full h-full object-cover object-center lg:object-right opacity-65 brightness-115 contrast-125 saturate-[1.15] pointer-events-none"
                referrerPolicy="no-referrer"
              />
              {/* Sophisticated gradient overlays ensuring text readability and smooth transition */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/85 to-[#020617]/45 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-transparent to-[#020617] pointer-events-none" />
            </div>

            {/* Subtle geometric grid background overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#07152a_1px,transparent_1px),linear-gradient(to_bottom,#07152a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none z-0" />
            
            {/* Luminous animating ambient light source glows directing visual flow */}
            <div className="absolute -top-10 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-teal-500/18 via-cyan-400/12 to-transparent rounded-full blur-[110px] animate-aura-1 pointer-events-none z-0" />
            <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-teal-400/20 via-cyan-500/10 to-transparent rounded-full blur-[120px] animate-aura-2 pointer-events-none z-0" />
            <div className="absolute -bottom-16 left-12 w-[350px] h-[350px] bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* HERO LEFT SIDE */}
                <div className="lg:col-span-7 space-y-8">
                  
                  {/* Product Identifier (Pill with subtle gradient glow) */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono text-[10px] uppercase tracking-wider font-semibold">
                      BCAD
                    </span>
                    <span className="text-slate-300 font-sans font-medium text-xs">
                      BlackPerl Certified Advanced Defender
                    </span>
                  </div>

                  {/* LOCKED H1 */}
                  <h1 className="font-display text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12] text-wrap-balance">
                    Build the Skills Behind <br className="hidden md:inline" />
                    <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-white bg-clip-text text-transparent">
                      Advanced Defensive Security
                    </span>
                  </h1>

                  {/* Supporting Statement: Inter body copy */}
                  <p className="font-sans text-slate-300 text-base md:text-[18px] max-w-2xl leading-relaxed font-normal">
                    A live, hands-on program that connects SOC operations, detection engineering, threat hunting, DFIR and incident response — the way modern security teams work.
                  </p>

                  {/* Hero Proof Metrics: Numbers use Manrope 700-800, labels use Inter */}
                  <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-800/80 max-w-xl">
                    <div>
                      <div className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-teal-400">140+</div>
                      <div className="font-sans text-xs text-slate-400 mt-1 font-medium">Hours of Training</div>
                    </div>
                    <div>
                      <div className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-teal-400">188</div>
                      <div className="font-sans text-xs text-slate-400 mt-1 font-medium">Lessons & Labs</div>
                    </div>
                    <div>
                      <div className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-teal-400">35+</div>
                      <div className="font-sans text-xs text-slate-400 mt-1 font-medium">Technical Topics</div>
                    </div>
                  </div>

                  {/* Primary & Secondary CTAs with Focal Aura that makes you want to click */}
                  <div className="relative pt-4">
                    <div className="absolute -top-1 left-2 w-56 h-14 bg-teal-400/25 rounded-full blur-xl animate-aura-cta pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-wrap gap-4">
                      <button 
                        onClick={() => navigate('/contact')}
                        className="px-6 py-3.5 text-sm font-sans font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-all duration-200 shadow-[0_4px_20px_rgba(20,184,166,0.35)] animate-cta-magnetic flex items-center gap-2 group cursor-pointer active:scale-[0.98]"
                      >
                        Talk to a BCAD Advisor
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                      <button 
                        onClick={() => navigate('/program')}
                        className="px-6 py-3.5 text-sm font-sans font-semibold text-slate-200 hover:text-white bg-slate-900/70 hover:bg-slate-800/90 border border-slate-750 hover:border-teal-500/40 rounded-lg transition-all duration-200 backdrop-blur-sm cursor-pointer active:scale-[0.98]"
                      >
                        Explore the BCAD Program
                      </button>
                    </div>
                  </div>

                  {/* Quick Info Badge */}
                  <div className="flex items-center gap-3 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-850 max-w-md font-sans backdrop-blur-sm">
                    <div className="p-1.5 rounded-md bg-teal-500/10 text-teal-400 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-300">Live Instructor-Led Training</span> with Hands-On Labs & Certification Blueprint.
                    </div>
                  </div>

                </div>

                {/* HERO RIGHT SIDE: Floating Pearl-Glass Defensive Capability Spotlight Panel (NOT in a container square, floating above background) */}
                <div className="lg:col-span-5 relative">
                  <div className="relative space-y-4 bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-2xl p-6 md:p-7 rounded-3xl border border-white shadow-[0_20px_50px_-15px_rgba(2,6,23,0.3),0_0_40px_rgba(255,255,255,0.35)] text-slate-900 mt-6 lg:mt-12">
                    {/* Floating Signal telemetry indicator */}
                    <div className="absolute -top-3 -right-3 bg-slate-950/90 px-3 py-1.5 rounded-lg border border-teal-500/30 backdrop-blur-sm text-[10px] font-mono text-teal-300 flex items-center gap-2 shadow-lg">
                      <div className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                      <span>C2_IP SEARCH ACTIVE</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-slate-200/80">
                      <span className="text-[11px] font-mono text-teal-950 uppercase tracking-widest font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                        Defensive Capability Spotlight
                      </span>
                      <span className="text-xs text-slate-600 font-mono font-semibold">0{heroActiveCapability + 1} / 05</span>
                    </div>
                    
                    {/* Tab Selector */}
                    <div className="grid grid-cols-5 gap-1 pt-1">
                      {CAPABILITIES.map((cap, idx) => (
                        <button
                          key={cap.phase}
                          onClick={() => setHeroActiveCapability(idx)}
                          className={`py-1 text-[10px] font-mono tracking-wider text-center border-b-2 transition-all cursor-pointer ${
                            heroActiveCapability === idx 
                              ? 'border-teal-700 text-teal-950 font-extrabold' 
                              : 'border-slate-300/70 text-slate-600 hover:text-slate-950'
                          }`}
                        >
                          {cap.phase}
                        </button>
                      ))}
                    </div>

                    {/* Active Capability Display */}
                    <div className="pt-2 animate-fadeIn">
                      <div className="font-display text-sm font-bold text-slate-950 flex items-center gap-2">
                        {CAPABILITIES[heroActiveCapability].phase} 
                        <span className="font-mono text-slate-700 font-medium text-xs">— {CAPABILITIES[heroActiveCapability].tech}</span>
                      </div>
                      <div className="font-sans text-[12px] text-teal-900 font-bold mt-0.5">
                        {CAPABILITIES[heroActiveCapability].tagline}
                      </div>
                      <p className="font-sans text-xs text-slate-900 mt-2 leading-relaxed font-normal">
                        {CAPABILITIES[heroActiveCapability].description}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

      {/* TRUST STRIP & CERTIFICATION INFO */}
      <section className="bg-slate-950 border-y border-slate-900/80 py-8 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Logos Strip */}
            <div className="lg:col-span-8">
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-4 font-semibold">
                TRUSTED BY PROFESSIONALS FROM
              </span>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
                {PARTNERS.map(partner => (
                  <div key={partner.name} className="flex flex-col group">
                    <span className="font-display text-slate-300 font-bold tracking-tight text-sm md:text-base group-hover:text-teal-400 transition-colors">
                      {partner.name}
                    </span>
                    <span className="text-[9px] font-mono text-slate-600 uppercase mt-0.5">
                      {partner.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification Badge */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-900 pt-6 lg:pt-0 lg:pl-8 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-500/20 text-teal-400 shrink-0">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs font-mono text-teal-400 font-semibold">{CERTIFICATION_INFO.provider} Verification</div>
                <div className="font-display text-sm font-bold text-white mt-0.5">{CERTIFICATION_INFO.title}</div>
                <div className="text-xs text-slate-400 mt-1 font-sans">{CERTIFICATION_INFO.status} · Globally Recognized</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: THE SKILL GAP */}
      <section className="py-28 bg-gradient-to-b from-[#F8FBFC] via-[#EEF7F8] to-[#F4F9FA] text-slate-800 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Skill Gap Text */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">The Skill Gap</div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#020617] leading-tight">
              Cybersecurity Isn't One Skill.
            </h2>
            <p className="font-sans text-slate-650 text-base md:text-[17px] leading-relaxed font-normal">
              Modern defensive security requires more than just monitoring dashboards. It demands the coordinated ability to investigate deep memory, hunt stealthy actors, engineer detections, and respond — across multiple environments.
            </p>
            <div className="p-4 bg-white/80 border border-teal-200/40 rounded-xl space-y-3 shadow-sm">
              <div className="text-xs font-mono text-teal-700 font-bold flex items-center gap-2">
                <Info className="w-3.5 h-3.5" />
                The Integrated Journey
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-normal">
                By synthesizing these 5 competencies into a unified operational cycle, you transition from a passive alert reporter into a formidable cybersecurity engineer.
              </p>
            </div>
          </div>

          {/* Skill Gap Visual Capability Chain */}
          <div className="lg:col-span-8 space-y-8 bg-white/95 p-6 md:p-8 rounded-2xl border border-slate-200/80 backdrop-blur-sm shadow-md">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#020617] tracking-tight">
              BCAD Brings These Capabilities Together.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {/* Connector arrows behind items in desktop */}
              <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-teal-200 via-teal-400 to-teal-200 -translate-y-1/2 z-0" />

              {CAPABILITIES.map((cap, index) => (
                <div key={cap.phase} className="relative z-10 p-4 bg-slate-50 border border-slate-200/80 hover:border-teal-400/50 hover:bg-white rounded-xl flex flex-col items-center text-center transition-all duration-300 group hover:-translate-y-1 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-750 flex items-center justify-center font-mono font-bold text-xs border border-teal-200 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                    {index + 1}
                  </div>
                  <div className="text-xs font-bold text-[#020617] tracking-widest uppercase mt-3 font-mono">
                    {cap.phase}
                  </div>
                  <div className="text-[10px] text-teal-700 font-mono font-semibold mt-1">
                    {cap.tech}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-2 leading-relaxed font-sans font-normal">
                    {cap.tagline}
                  </p>
                </div>
              ))}
            </div>

            {/* Practical metrics of the capabilities: Numbers use Manrope, labels use Inter */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-6 border-t border-slate-200/80">
              <div className="text-center md:border-r border-slate-200/80 p-2">
                <span className="block font-display text-2xl md:text-3xl font-extrabold text-[#020617]">140+</span>
                <span className="font-sans text-xs text-slate-500 font-medium">Hours of Training</span>
              </div>
              <div className="text-center md:border-r border-slate-200/80 p-2">
                <span className="block font-display text-2xl md:text-3xl font-extrabold text-[#020617]">188</span>
                <span className="font-sans text-xs text-slate-500 font-medium">Total Lessons</span>
              </div>
              <div className="text-center md:border-r border-slate-200/80 p-2">
                <span className="block font-display text-2xl md:text-3xl font-extrabold text-[#020617]">35+</span>
                <span className="font-sans text-xs text-slate-500 font-medium">Advanced Topics</span>
              </div>
              <div className="text-center md:border-r border-slate-200/80 p-2">
                <span className="block font-display text-2xl md:text-3xl font-extrabold text-[#020617]">10</span>
                <span className="font-sans text-xs text-slate-500 font-medium">Core Modules</span>
              </div>
              <div className="text-center p-2">
                <span className="block font-display text-2xl md:text-3xl font-extrabold text-[#020617]">24h</span>
                <span className="font-sans text-xs text-slate-500 font-medium">Practical Assessment</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE THREAT RANGE SANDBOX */}
      <section id="sandbox" className="py-28 bg-[#EEF7F8] bg-gradient-to-b from-[#F4F9FA] via-[#EEF7F8] to-[#F4F9FA] border-b border-slate-200/65 relative text-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-mono text-teal-750 font-bold">
              INTERACTIVE CYBER RANGE
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#020617] tracking-tight">
              Test Your Defender Instincts
            </h2>
            <p className="font-sans text-slate-650 text-base md:text-[17px] leading-relaxed font-normal">
              Step into the shoes of a BCAD security analyst. Investigate an active intrusion, search for persistence, craft a custom detection rule, and contain the threat.
            </p>
          </div>

          {/* Sandbox Terminal Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Step Selection Left */}
            <div className="lg:col-span-4 space-y-2.5">
              <div className="text-xs font-mono text-slate-500 mb-3 px-1 font-bold">INVESTIGATION WORKFLOW</div>
              {SANDBOX_STEPS.map((step) => {
                const isActive = sandboxPhase === step.key;
                return (
                  <button
                    key={step.key}
                    disabled={sandboxPhase !== step.key && !sandboxAnswer} // Disable random jumps to force completion sequence
                    onClick={() => setSandboxPhase(step.key)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 relative ${
                      isActive 
                        ? 'bg-white border-teal-500/60 text-[#020617] shadow-[0_4px_15px_rgba(20,184,166,0.12)]' 
                        : 'bg-white/95 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                      isActive 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                      {SANDBOX_STEPS.findIndex(s => s.key === step.key) + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold font-mono tracking-wide uppercase">{step.label}</div>
                      <div className="text-xs text-slate-500 leading-snug font-medium font-sans">{step.description}</div>
                    </div>
                    {/* Active caret indicator */}
                    {isActive && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-600">
                        <ChevronRight className="w-4 h-4 animate-bounceHorizontal" />
                      </div>
                    )}
                  </button>
                );
              })}
              
              <button 
                onClick={resetSandbox} 
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-sans text-slate-700 font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Investigation Range
              </button>
            </div>

            {/* Terminal Main Viewer Right */}
            <div className="lg:col-span-8 bg-[#030918] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              
              {/* Terminal Title Bar */}
              <div className="bg-[#050f25] px-5 py-3.5 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/40" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                    <div className="w-3 h-3 rounded-full bg-green-500/40" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 ml-2">cyber-range // dc01-syslogs.log</span>
                </div>
                <div className="text-[10px] font-mono bg-teal-950/40 text-teal-400 px-2.5 py-1 rounded border border-teal-500/10">
                  DEFENDER SIMULATION MODE
                </div>
              </div>

              {/* Terminal Content Screen */}
              <div className="p-6 md:p-8 min-h-[360px] flex flex-col justify-between font-mono text-xs leading-relaxed">
                
                {/* SIGNAL PHASE */}
                {sandboxPhase === 'SIGNAL' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-lg flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <div>
                        <div className="font-bold text-sm">CRITICAL WARNING [T1053.005]</div>
                        <p className="mt-1 text-xs text-amber-200">
                          Scheduled Task creation detected on system <span className="font-bold underline">DC01.BLACKPERL.INTERNAL</span> by administrative user <span className="text-white">SYSTEM</span>.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-slate-300 font-bold">THE INTRUSION INCIDENT STORY:</div>
                      <p className="text-slate-400 leading-relaxed font-sans">
                        At 11:42 AM, our SIEM automatically generated an alert flagging that the Windows task scheduler was modified. Attackers often deploy scheduled tasks for stealth persistence to restart backdoors silently. 
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                      <div className="text-slate-400">WHAT IS YOUR FIRST ACTION?</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        <button 
                          onClick={() => {
                            setSandboxAnswer('correct');
                            setSandboxPhase('INVESTIGATION');
                          }}
                          className="p-3 text-left bg-teal-950/20 hover:bg-teal-900/30 border border-teal-500/30 rounded-lg text-teal-300 transition-colors"
                        >
                          → Inspect raw event telemetry logs for the task arguments and execution path
                        </button>
                        <button 
                          onClick={() => alert('Ignore alert? That allows the adversary to maintain absolute quiet control over your directory controller!')}
                          className="p-3 text-left bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-lg text-slate-400 transition-colors"
                        >
                          → Mark the alert as a false positive and close the ticket
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* INVESTIGATION PHASE */}
                {sandboxPhase === 'INVESTIGATION' && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="text-teal-400 font-bold text-sm mb-2">RAW EVENT ID 4688: SECURITY AUDITING LOGS</div>
                    
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 overflow-x-auto font-mono text-[11px] text-teal-300">
                      <pre>{JSON.stringify(RAW_SECURITY_LOG, null, 2)}</pre>
                    </div>

                    <div className="space-y-4">
                      <div className="text-slate-300 font-bold font-sans">Analyze the suspicious parameters inside the CommandLine argument:</div>
                      
                      <div className="space-y-2">
                        <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 cursor-pointer hover:border-teal-500/20">
                          <input 
                            type="radio" 
                            name="investigation_choice" 
                            className="accent-teal-400"
                            onChange={() => setSandboxAnswer('correct')} 
                          />
                          <span className="text-slate-300">
                            PowerShell executes silently via <code className="text-teal-300">-w hidden -ep bypass</code> and invokes <code className="text-teal-300">DownloadString</code> from a external IP Address
                          </span>
                        </label>
                        
                        <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 cursor-pointer hover:border-teal-500/20">
                          <input 
                            type="radio" 
                            name="investigation_choice" 
                            className="accent-teal-400"
                            onChange={() => setSandboxAnswer('incorrect')}
                          />
                          <span className="text-slate-400">
                            The command runs standard Windows Update configurations natively hosted on Microsoft.com.
                          </span>
                        </label>
                      </div>

                      {sandboxAnswer === 'correct' && (
                        <div className="pt-3 flex justify-end">
                          <button
                            onClick={() => {
                              setSandboxAnswer(null);
                              setSandboxPhase('UNDERSTANDING');
                            }}
                            className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold font-sans rounded-lg flex items-center gap-1.5 transition-all"
                          >
                            Proceed to Process Map
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* UNDERSTANDING PHASE */}
                {sandboxPhase === 'UNDERSTANDING' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="text-teal-400 font-bold text-sm">PROCESS EXECUTION LINEAGE (T1059)</div>
                    <p className="text-slate-300 font-sans leading-relaxed">
                      Tracing the ancestor process structure allows us to pinpoint exactly how the command got scheduled. Below is the parsed process tree:
                    </p>

                    {/* Interactive Process Tree Chart */}
                    <div className="p-5 bg-slate-950/80 rounded-xl border border-slate-900 space-y-4">
                      
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                        <span className="text-slate-400">services.exe (PID 620)</span>
                      </div>
                      
                      <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                        <span className="text-slate-400">svchost.exe (PID 840)</span>
                      </div>
                      
                      <div className="flex items-center gap-3 pl-12 border-l border-slate-800">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-amber-400 font-semibold">schtasks.exe (PID 14002)</span>
                        <span className="text-[10px] bg-amber-950/40 border border-amber-900 text-amber-400 px-2 rounded">Invoked Task Register</span>
                      </div>

                      <div className="flex items-center gap-3 pl-20 border-l border-slate-800">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span className="text-red-400 font-bold">cmd.exe (PID 15300)</span>
                        <span className="text-[10px] text-slate-500 font-mono">/c powershell.exe ...</span>
                      </div>

                      <div className="flex items-center gap-3 pl-28 border-l border-slate-800">
                        <div className="w-3.5 h-3.5 rounded bg-red-600 flex items-center justify-center font-mono text-[9px] text-white font-bold animate-ping" />
                        <span className="text-red-500 font-bold">powershell.exe (PID 15324)</span>
                        <span className="text-teal-400">→ Outbound Connection to 103.45.12.89</span>
                      </div>
                    </div>

                    <div className="p-4 bg-teal-950/10 border border-teal-900/40 rounded-xl">
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        <span className="font-bold text-teal-300">Understanding Statement:</span> The execution trace confirms that <code className="text-white">schtasks.exe</code> registered a task which triggered command prompt executing PowerShell to fetch and execute a remote beacon.
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-teal-400 font-mono">Process lineage identified correctly</span>
                      <button
                        onClick={() => {
                          setSandboxPhase('HUNT');
                        }}
                        className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold font-sans rounded-lg flex items-center gap-1.5 transition-all"
                      >
                        Launch Threat Hunt
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* HUNT PHASE */}
                {sandboxPhase === 'HUNT' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="text-teal-400 font-bold text-sm">ENTERPRISE WIDE SCOPE SEARCH</div>
                    <p className="text-slate-300 font-sans">
                      Let's run a KQL network hunting query to find if other workstations in the BlackPerl network have made outbound connections to the Command & Control (C2) IP <code className="text-teal-300">103.45.12.89</code>.
                    </p>

                    <div className="space-y-3">
                      <div className="text-xs font-mono text-slate-400">FORMULATE HUNT QUERY (KQL):</div>
                      <div className="relative">
                        <textarea
                          value={huntQuery}
                          onChange={(e) => setHuntQuery(e.target.value)}
                          placeholder="DeviceNetworkEvents | where RemoteIP == '103.45.12.89' | project DeviceName, LocalIP, RemoteIP"
                          className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-teal-300 focus:outline-none focus:border-teal-400 h-24 text-[11px]"
                        />
                        <button
                          onClick={() => setHuntQuery("DeviceNetworkEvents | where RemoteIP == '103.45.12.89' | project DeviceName, LocalIP, RemoteIP")}
                          className="absolute right-3 bottom-3 px-2 py-1 bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-400 border border-slate-800 rounded"
                        >
                          Use Autocomplete Query
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={executeHunt}
                        disabled={huntLoading}
                        className="px-4 py-2.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold rounded-lg flex items-center gap-2 transition-all duration-150 disabled:opacity-50"
                      >
                        {huntLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                        Run Enterprise Hunt
                      </button>
                    </div>

                    {/* Hunt Output Results */}
                    {huntResults && (
                      <div className="space-y-3 p-4 bg-[#050f25] border border-teal-500/10 rounded-xl animate-fadeIn">
                        <div className="text-[11px] font-bold text-teal-400 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          HUNT RESULTS: 2 SUSPICIOUS CONNECTIONS DETECTED
                        </div>
                        <div className="divide-y divide-slate-800 font-mono text-[11px]">
                          {huntResults.map((res, i) => (
                            <div key={i} className="py-2 flex justify-between">
                              <span className="text-white">{res.hostname}</span>
                              <span className="text-teal-300">Outbound Connections: {res.count} times</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-amber-300 font-sans pt-1">
                          ⚠️ Workstations <span className="font-bold">WS-DEV-04</span> and <span className="font-bold">WS-HR-09</span> have established active outbound socket tunnels!
                        </div>
                        
                        <div className="pt-3 flex justify-end">
                          <button
                            onClick={() => {
                              setSandboxPhase('ENGINEER');
                            }}
                            className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold font-sans rounded-lg flex items-center gap-1.5 transition-all"
                          >
                            Deploy Detection Rule
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ENGINEER PHASE */}
                {sandboxPhase === 'ENGINEER' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="text-teal-400 font-bold text-sm">CODIFY DETECTIONS WITH SIGMA RULES</div>
                    <p className="text-slate-300 font-sans">
                      Let's design a reusable, SIEM-agnostic <span className="text-white font-bold">Sigma Rule</span> to automatically identify and flag future PowerShell downloads of remote scripts.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Interactive selectors */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-slate-400 text-xs mb-1.5 font-sans">1. TARGET IMAGE ENDS WITH:</label>
                          <select 
                            value={sigmaImage}
                            onChange={(e) => setSigmaImage(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-teal-400 font-mono"
                          >
                            <option value="powershell.exe">\powershell.exe</option>
                            <option value="notepad.exe">\notepad.exe (Not related)</option>
                            <option value="explorer.exe">\explorer.exe (Too noisy)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-400 text-xs mb-1.5 font-sans">2. COMMAND LINE ARGUMENT CONTAINS:</label>
                          <select 
                            value={sigmaCommand}
                            onChange={(e) => setSigmaCommand(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-teal-400 font-mono"
                          >
                            <option value="DownloadString">DownloadString (Remote PowerShell fetch)</option>
                            <option value="WindowsUpdate">WindowsUpdate (Generic system utility)</option>
                            <option value="-help">--help (Standard utility helper)</option>
                          </select>
                        </div>

                        <div className="p-3 bg-teal-950/10 border border-teal-900/40 rounded-lg">
                          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                            <span className="font-bold text-teal-300">Why this matters:</span> BCAD teaches you to architect detection rules that are extremely narrow to block malicious actions, avoiding system noise.
                          </p>
                        </div>
                      </div>

                      {/* Code preview of rule */}
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[10px] text-teal-400 h-60 overflow-y-auto">
                        <div className="text-slate-500 mb-2 border-b border-slate-900 pb-1 flex justify-between items-center">
                          <span>sigma_rules_generator.yml</span>
                          <span className="text-[9px] bg-teal-500/20 px-1 rounded text-teal-300">LIVE RULES</span>
                        </div>
                        <pre>{sigmaBuilt}</pre>
                      </div>

                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-slate-400">Sigma rule logic updated automatically</span>
                      <button
                        onClick={() => {
                          setSandboxPhase('RESPOND');
                        }}
                        className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold font-sans rounded-lg flex items-center gap-1.5 transition-all"
                      >
                        Enter Incident Response
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* RESPOND PHASE */}
                {sandboxPhase === 'RESPOND' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="text-red-400 font-bold text-sm">ACTIVE INCIDENT CONTAINMENT & RESPONSE</div>
                    <p className="text-slate-300 font-sans">
                      Our intelligence scan confirmed that <span className="font-bold text-white">WS-DEV-04</span> and <span className="font-bold text-white">WS-HR-09</span> have active Cobalt Strike beacon execution states pointing to the threat actor. If left uncontained, they will launch ransomware encryption within hours.
                    </p>

                    {containState === 'IDLE' && (
                      <div className="space-y-4">
                        <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl flex items-center gap-3">
                          <AlertCircle className="w-6 h-6 text-red-500 animate-pulse" />
                          <span className="text-xs text-red-300 font-bold font-sans">STATUS: BEACON CONNECTED (2 COMPROMISED HOSTS)</span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <button
                            onClick={triggerContainment}
                            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold font-sans rounded-lg shadow-lg shadow-red-900/30 transition-all flex items-center gap-2"
                          >
                            <Shield className="w-4 h-4" />
                            CONTAIN WS-DEV-04 & WS-HR-09
                          </button>
                          <button
                            onClick={() => alert('No action? That allows the attacker to steal the Active Directory database! Run containment!')}
                            className="px-4 py-3 bg-slate-900 border border-slate-800 text-slate-500 rounded-lg text-xs"
                          >
                            Monitor behavior further
                          </button>
                        </div>
                      </div>
                    )}

                    {containState === 'CONTAINING' && (
                      <div className="space-y-4 py-8 flex flex-col items-center justify-center">
                        <RefreshCw className="w-8 h-8 text-teal-400 animate-spin" />
                        <div className="text-sm font-semibold text-teal-300 animate-pulse">Isolating network interfaces, revoking credentials & killing malicious thread stacks...</div>
                      </div>
                    )}

                    {containState === 'SUCCESS' && (
                      <div className="space-y-6 p-5 bg-teal-950/20 border border-teal-500/30 rounded-2xl animate-fadeIn">
                        <div className="flex items-center gap-3 text-teal-300 font-bold text-base">
                          <CheckCircle2 className="w-6 h-6 shrink-0" />
                          SECURED: INCIDENT SUCCESSFULLY RESOLVED!
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          You isolated the compromised hosts from the corporate network, revoked AD credential hashes, and successfully deployed your Sigma rules. The ransomware deploy mechanism has been rendered fully impotent.
                        </p>
                        
                        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 space-y-2">
                          <div className="text-[10px] font-mono text-teal-400 font-bold">DEFENDER SUMMARY:</div>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                            This is the level of technical confidence you build in BCAD. You don't just stare at charts—you understand the signals, investigate the files, run queries, author detection code, and neutralize real threats.
                          </p>
                        </div>

                        <div className="flex flex-wrap justify-between items-center gap-3 pt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-teal-400 font-mono">Completed BCAD Threat Journey</span>
                            {user ? (
                              <button
                                onClick={syncLabStateToCloud}
                                className="px-3 py-1.5 bg-slate-900 border border-teal-500/40 hover:border-teal-400 text-teal-300 text-xs font-mono rounded-md flex items-center gap-1.5 transition-all cursor-pointer"
                              >
                                <Cloud className="w-3.5 h-3.5" />
                                {cloudSynced ? 'Progress Saved to Cloud ✓' : 'Save to Cloud Profile'}
                              </button>
                            ) : (
                              <button
                                onClick={handleSignIn}
                                className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-mono rounded-md flex items-center gap-1.5 transition-all cursor-pointer"
                              >
                                <LogIn className="w-3.5 h-3.5 text-teal-400" />
                                <span>Sign In to Save Completion</span>
                              </button>
                            )}
                          </div>
                          <a
                            href="#booking"
                            className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold font-sans rounded-lg transition-all"
                          >
                            Talk to a BCAD Advisor
                          </a>
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: INDUSTRY-RELEVANT TOOLS & TECHNOLOGIES */}
      <section id="tools" className="py-24 max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Header left */}
          <div className="lg:col-span-4 space-y-5">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">WHAT YOU WILL WORK WITH</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug">
              Industry-Relevant Tools and Technologies
            </h2>
            <p className="font-sans text-slate-300 text-base md:text-[17px] leading-relaxed font-normal">
              Work with the same tools and technologies used by modern security teams to detect, investigate and respond to real-world threats.
            </p>
            <div>
              <a 
                href="#curriculum"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-teal-400 hover:text-teal-300 border border-teal-500/20 bg-teal-950/15 px-4 py-2 rounded-lg transition-all"
              >
                View Full Curriculum
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Interactive Tool Highlights Map */}
            <div className="p-5 bg-slate-950/80 border border-slate-900 rounded-xl space-y-4">
              <div className="text-xs font-mono text-teal-400 font-bold">Interactive Tool Search Filter:</div>
              <div className="flex flex-wrap gap-1.5">
                {allUniqueTools.map(tool => (
                  <button
                    key={tool}
                    onClick={() => setSelectedToolFilter(tool)}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all ${
                      selectedToolFilter === tool 
                        ? 'bg-teal-500 text-slate-950 font-bold' 
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                {selectedToolFilter === 'All' 
                  ? 'Click a tech badge to see where in the BCAD curriculum modules it is heavily utilized.' 
                  : `Filtering modules that feature training on: ${selectedToolFilter}. See matches below on the right.`
                }
              </p>
            </div>
          </div>

          {/* Tools Grid Right */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {TOOL_CATEGORIES.map((cat, i) => (
              <div 
                key={i} 
                className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  selectedToolFilter !== 'All' && cat.tools.some(t => t.toLowerCase().includes(selectedToolFilter.toLowerCase()))
                    ? 'bg-[#081930] border-teal-500/40 shadow-lg shadow-teal-950/20 scale-[1.02]' 
                    : 'bg-[#030917] border-slate-900 hover:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                    <h3 className="font-display text-sm font-bold text-white tracking-wide">{cat.category}</h3>
                    <div className="p-1.5 rounded-md bg-teal-950/40 text-teal-400 border border-teal-500/10">
                      {cat.category === 'Security Operations' && <Terminal className="w-4 h-4" />}
                      {cat.category === 'Detection' && <Cpu className="w-4 h-4" />}
                      {cat.category === 'Threat Hunting' && <Activity className="w-4 h-4" />}
                      {cat.category === 'Investigation' && <Search className="w-4 h-4" />}
                      {cat.category === 'Security Platforms' && <Database className="w-4 h-4" />}
                      {cat.category === 'Network & Malware' && <Network className="w-4 h-4" />}
                      {cat.category === 'Cloud & Modern Threats' && <CloudLightning className="w-4 h-4" />}
                    </div>
                  </div>
                  <p className="font-sans text-xs text-slate-400 mt-3 leading-relaxed font-normal">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900/40">
                  <div className="flex flex-wrap gap-1.5">
                    {cat.tools.map((t, index) => {
                      const isHighlighted = selectedToolFilter !== 'All' && t.toLowerCase().includes(selectedToolFilter.toLowerCase());
                      return (
                        <span 
                          key={index} 
                          className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                            isHighlighted 
                              ? 'bg-teal-500/20 text-teal-300 border-teal-500/30 font-bold' 
                              : 'bg-slate-950 text-slate-300 border-slate-900'
                          }`}
                        >
                          {t}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: PRACTICAL ENVIRONMENT */}
      <section className="py-24 bg-gradient-to-b from-[#020617] via-[#051125] to-[#020617] border-t border-slate-900/60 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Practical Text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">PRACTICAL ENVIRONMENT</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-snug tracking-tight">
                Learn Through Investigation, Not Just Explanation.
              </h2>
              <p className="font-sans text-slate-300 text-base md:text-[17px] leading-relaxed font-normal">
                Gain hands-on experience in realistic security environments. Work with real telemetry, analyse evidence, investigate attacks and build detections through guided, practical scenarios.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-teal-500/20 text-teal-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-display font-semibold text-slate-200 text-sm block">Realistic Scenarios</span>
                    <span className="font-sans text-xs text-slate-400 font-normal">Based on real-world threat intelligence and actual APT campaigns.</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-teal-500/20 text-teal-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-display font-semibold text-slate-200 text-sm block">Guided Investigations</span>
                    <span className="font-sans text-xs text-slate-400 font-normal">Step-by-step interactive logs analyzing system and kernel events.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-teal-500/20 text-teal-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-display font-semibold text-slate-200 text-sm block">Hands-On Practice</span>
                    <span className="font-sans text-xs text-slate-400 font-normal">Deploy live rules and verify containment states inside browser logs.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href="#sandbox"
                  className="px-5 py-3 text-xs font-sans font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-all inline-flex items-center gap-2"
                >
                  Explore the Lab Range
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Lab Image Screenshot & Terminal Interactive Toggles */}
            <div className="lg:col-span-7">
              <div className="bg-[#030917] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                
                {/* Lab header */}
                <div className="px-5 py-3 bg-[#051025] border-b border-slate-800/80 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-xs font-mono text-slate-300">Live Lab Session Preview</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button 
                      onClick={() => setLabTab('logs')}
                      className={`px-2 py-0.5 rounded font-mono text-[10px] ${labTab === 'logs' ? 'bg-teal-500 text-slate-950' : 'bg-slate-900 text-slate-400'}`}
                    >
                      Audit Logs
                    </button>
                    <button 
                      onClick={() => setLabTab('sigma')}
                      className={`px-2 py-0.5 rounded font-mono text-[10px] ${labTab === 'sigma' ? 'bg-teal-500 text-slate-950' : 'bg-slate-900 text-slate-400'}`}
                    >
                      Sigma Rule
                    </button>
                    <button 
                      onClick={() => setLabTab('alert')}
                      className={`px-2 py-0.5 rounded font-mono text-[10px] ${labTab === 'alert' ? 'bg-teal-500 text-slate-950' : 'bg-slate-900 text-slate-400'}`}
                    >
                      Alert Logic
                    </button>
                  </div>
                </div>

                {/* Lab visual contents */}
                <div className="relative">
                  <img 
                    src="/src/assets/images/cybersecurity_lab_simulation_1790340626345.jpg" 
                    alt="Cybersecurity Lab Simulation Dashboard" 
                    className="w-full h-[320px] object-cover opacity-60 mix-blend-screen"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Absolute Terminal Simulator Overlaid */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 border border-slate-800/80 p-4 rounded-xl font-mono text-[10px] text-teal-300 leading-normal backdrop-blur-sm shadow-xl">
                    {labTab === 'logs' && (
                      <div className="space-y-1">
                        <div className="text-slate-500 border-b border-slate-900 pb-1 mb-1">C:\Users\TargetWS&gt; wevtutil qe Security /f:text /c:1</div>
                        <div><span className="text-slate-400">EventID:</span> 4624 (Logon Success)</div>
                        <div><span className="text-slate-400">TargetUserName:</span> <span className="text-white">bp_admin</span></div>
                        <div><span className="text-slate-400">LogonType:</span> 3 (Network Logon - possible lateral motion)</div>
                        <div><span className="text-slate-400">IpAddress:</span> 10.10.22.84 (Source Node)</div>
                        <div className="text-teal-400/80 animate-pulse mt-1">&gt; ANALYZING EVENT CORRELATION... STATUS: OK</div>
                      </div>
                    )}

                    {labTab === 'sigma' && (
                      <div className="space-y-1">
                        <div className="text-slate-500 border-b border-slate-900 pb-1 mb-1">Sigma Query: credential_access_lsass_dump.yml</div>
                        <div><span className="text-slate-400">title:</span> LSASS Process Memory Dump via Procdump</div>
                        <div><span className="text-slate-400">selection:</span></div>
                        <div>&nbsp;&nbsp;<span className="text-slate-400">CommandLine|contains:</span> <span className="text-white">-ma lsass</span></div>
                        <div><span className="text-slate-400">condition:</span> selection</div>
                        <div className="text-amber-400 mt-1">&gt; Matching Sigma targets: Splunk Search, Elastic Query, Sentinel KQL</div>
                      </div>
                    )}

                    {labTab === 'alert' && (
                      <div className="space-y-1">
                        <div className="text-slate-500 border-b border-slate-900 pb-1 mb-1">SIEM Correlation Alert Blueprint</div>
                        <div><span className="text-slate-400">Trigger:</span> Multiple EventID 4625 (Failed Logon) followed by EventID 4624</div>
                        <div><span className="text-slate-400">Time Window:</span> &lt; 60 seconds</div>
                        <div><span className="text-slate-400">Assessment:</span> Bruteforce attack followed by success state</div>
                        <div className="text-red-400 animate-pulse mt-1">&gt; PRIORITY: HIGH | ACTION REQUIRED: TRIGGER IP BLOCK</div>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: SYLLABUS / CURRICULUM EXPLORER */}
      <section id="curriculum" className="py-28 bg-gradient-to-b from-[#F8FBFC] via-[#EEF7F8] to-[#F4F9FA] text-slate-800 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">WHAT YOU WILL DEVELOP</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#020617] tracking-tight">
              From Skills to Capability
            </h2>
            <p className="font-sans text-slate-655 text-base md:text-[17px] leading-relaxed font-normal">
              BCAD develops connected defensive-security capability across the modern security operations lifecycle. Select a module to explore details.
            </p>
          </div>

          {/* Modules Selector Accordion & Tab Combo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Module Selection Buttons (Left) */}
            <div className="lg:col-span-5 space-y-2">
              {MODULES.map((m) => {
                const isSelected = selectedModule.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModule(m)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                      isSelected 
                        ? 'bg-white border-teal-500/60 text-[#020617] shadow-md' 
                        : 'bg-white/90 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-sm font-bold ${isSelected ? 'text-teal-600' : 'text-slate-400'}`}>
                        {m.number}
                      </span>
                      <div>
                        <div className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">MODULE</div>
                        <div className="font-display text-sm font-bold text-[#020617] tracking-wide">{m.title}</div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected ? 'translate-x-1 text-teal-600' : 'text-slate-500 group-hover:translate-x-0.5'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Module Detailed Panel Display (Right) */}
            <div className="lg:col-span-7 bg-white/95 border border-slate-200/85 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden text-slate-800">
              
              {/* Soft decorative background seal */}
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header info */}
              <div className="flex justify-between items-start pb-4 border-b border-slate-200/80">
                <div>
                  <span className="text-[10px] font-mono bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200/50 uppercase tracking-widest font-bold">
                    Module {selectedModule.number}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#020617] mt-2">{selectedModule.title}</h3>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-bold text-[#020617] font-display">{selectedModule.lessonsCount} Lessons</span>
                  <span className="text-xs text-slate-500 font-mono font-medium">{selectedModule.hours} Core Hours</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-655 text-sm md:text-[15px] leading-relaxed font-sans font-normal">
                {selectedModule.description}
              </p>

              {/* Syllabus Details Bullet Points */}
              <div className="space-y-3.5">
                <span className="text-xs font-mono text-slate-500 block uppercase tracking-wider font-bold">CORE SYLLABUS OUTLINE</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedModule.syllabusDetails.map((item, index) => (
                    <div key={index} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50/90 border border-slate-200/60">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      <span className="text-xs text-slate-700 leading-snug font-sans font-normal">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Associated Tools & Practical Labs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200/80">
                
                {/* Tools trained */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Code className="w-3.5 h-3.5 text-teal-600" />
                    Tools & Languages
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedModule.tools.map(tool => (
                      <span key={tool} className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 rounded text-[10px] font-mono font-semibold">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Labs */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Terminal className="w-3.5 h-3.5 text-teal-600" />
                    Hands-On Lab Scenarios
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed font-sans font-normal">
                    {selectedModule.labs.map((lab, idx) => (
                      <li key={idx}>{lab}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* CTA action inside Curriculum */}
              <div className="pt-4 border-t border-slate-200/80 flex justify-between items-center flex-wrap gap-4">
                <div className="text-xs text-slate-500 font-sans font-normal">
                  Ready to practice these scenarios? Download Syllabus brochure for all details.
                </div>
                <a 
                  href="#booking"
                  className="px-4 py-2 bg-teal-50/80 hover:bg-teal-100 text-teal-700 hover:text-teal-800 border border-teal-200/80 rounded-lg text-xs font-sans font-semibold transition-all"
                >
                  Request Full Syllabus Packet
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CAREER ALIGNMENT & ROLES */}
      <section id="careers" className="py-24 bg-slate-950/60 border-y border-slate-900/60 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">CAREER PATHWAYS</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Where These Skills Apply
            </h2>
            <p className="font-sans text-slate-300 text-base md:text-[17px] leading-relaxed font-normal">
              BCAD develops capabilities relevant to these defensive-security roles. Actual role requirements vary by employer and experience.
            </p>
          </div>

          {/* Interactive Roles Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Roles List Grid */}
            <div className="lg:col-span-4 grid grid-cols-1 gap-2.5">
              {ROLES_APPLICABILITY.map((role, idx) => {
                const isActive = activeRoleIndex === idx;
                return (
                  <button
                    key={role.title}
                    onClick={() => setActiveRoleIndex(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                      isActive 
                        ? 'bg-[#08152e] border-teal-500/40 text-white' 
                        : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:bg-slate-900/40'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-mono text-teal-400 font-semibold">{role.level}</div>
                      <div className="font-display text-sm font-bold tracking-wide mt-0.5">{role.title}</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-150 ${isActive ? 'text-teal-400 translate-x-1' : 'text-slate-700'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Active Role Details Panel */}
            <div className="lg:col-span-8 bg-[#040c1e] border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl">
              <div className="space-y-6">
                
                <div className="flex justify-between items-start pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold">{ROLES_APPLICABILITY[activeRoleIndex].level}</span>
                    <h3 className="font-display text-2xl font-bold text-white mt-1">{ROLES_APPLICABILITY[activeRoleIndex].title}</h3>
                  </div>
                  <div className="bg-teal-950/40 border border-teal-500/20 px-3 py-1.5 rounded-lg text-right">
                    <span className="block text-[10px] font-mono text-teal-400 uppercase leading-none font-semibold">Salary Index</span>
                    <span className="text-sm font-bold text-white font-display mt-1 block">
                      {ROLES_APPLICABILITY[activeRoleIndex].salaryExpectation}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">ROLE MISSION OVERVIEW</h4>
                  <p className="text-slate-300 text-sm md:text-[15px] leading-relaxed font-sans font-normal">
                    {ROLES_APPLICABILITY[activeRoleIndex].description}
                  </p>
                </div>

                {/* Skills Highlight tags */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                    <Target className="w-4 h-4 text-teal-400" />
                    Target Defensive Skills Acquired
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {ROLES_APPLICABILITY[activeRoleIndex].skillsNeeded.map((skill, sIdx) => (
                      <span key={sIdx} className="px-3 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg text-xs font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action */}
              <div className="pt-6 border-t border-slate-800 mt-6 flex justify-between items-center flex-wrap gap-4">
                <p className="text-xs text-slate-400 max-w-md font-sans font-normal">
                  BCAD structures realistic assessments modeled exactly after standard job interviews and security engineering tests.
                </p>
                <button
                  onClick={() => {
                    setBookingProfile(ROLES_APPLICABILITY[activeRoleIndex].title);
                    const el = document.getElementById('booking');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-sans font-semibold rounded-lg transition-all"
                >
                  Match My Career Path
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: WHO BCAD IS FOR */}
      <section className="py-28 bg-gradient-to-b from-[#EEF7F8] to-[#F4F9FA] text-slate-800 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">WHO BCAD IS FOR</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#020617] tracking-tight">
              Built for Professionals Who Want to Go Deeper
            </h2>
            <p className="font-sans text-slate-655 text-base md:text-[17px] leading-relaxed font-normal">
              Whether you seek to break out of basic ticket-level SOC triage or transition completely into threat hunting operations, the program adjusts to match your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-white/95 p-5 rounded-2xl border border-slate-200/80 hover:border-teal-400/50 hover:bg-white transition-all duration-300 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md">
              <div className="space-y-2">
                <span className="p-2 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/40 inline-block">
                  <Terminal className="w-5 h-5" />
                </span>
                <h3 className="font-display font-bold text-[#020617] text-base">Already Working in a SOC?</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                  Build capability beyond basic alert monitoring and passive forwarding. Develop the depth to lead high-stakes investigations.
                </p>
              </div>
              <button 
                onClick={() => {
                  setBookingProfile('Already Working in a SOC?');
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-sans font-semibold text-teal-700 hover:text-teal-900 text-left pt-2 flex items-center gap-1 group"
              >
                Select Profile <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="bg-white/95 p-5 rounded-2xl border border-slate-200/80 hover:border-teal-400/50 hover:bg-white transition-all duration-300 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md">
              <div className="space-y-2">
                <span className="p-2 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/40 inline-block">
                  <Network className="w-5 h-5" />
                </span>
                <h3 className="font-display font-bold text-[#020617] text-base">Working in IT / Systems?</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                  Develop deeper defensive-security skills. Leverage your existing knowledge of systems and directories into direct threat defense operations.
                </p>
              </div>
              <button 
                onClick={() => {
                  setBookingProfile('Working in IT / Systems / Networks?');
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-sans font-semibold text-teal-700 hover:text-teal-900 text-left pt-2 flex items-center gap-1 group"
              >
                Select Profile <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="bg-white/95 p-5 rounded-2xl border border-slate-200/80 hover:border-teal-400/50 hover:bg-white transition-all duration-300 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md">
              <div className="space-y-2">
                <span className="p-2 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/40 inline-block">
                  <Users className="w-5 h-5" />
                </span>
                <h3 className="font-display font-bold text-[#020617] text-base">Junior Security Expert?</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                  Expand into proactive threat hunting, custom detection engineering, memory analysis, and structural enterprise response patterns.
                </p>
              </div>
              <button 
                onClick={() => {
                  setBookingProfile('Junior Security Professional?');
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-sans font-semibold text-teal-700 hover:text-teal-900 text-left pt-2 flex items-center gap-1 group"
              >
                Select Profile <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="bg-white/95 p-5 rounded-2xl border border-slate-200/80 hover:border-teal-400/50 hover:bg-white transition-all duration-300 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md">
              <div className="space-y-2">
                <span className="p-2 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/40 inline-block">
                  <Award className="w-5 h-5" />
                </span>
                <h3 className="font-display font-bold text-[#020617] text-base">New to Cybersecurity?</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                  Speak with a professional advisor to evaluate your networking foundation and determine if the BCAD modules are right for you.
                </p>
              </div>
              <button 
                onClick={() => {
                  setBookingProfile('New to Cybersecurity?');
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-sans font-semibold text-teal-700 hover:text-teal-900 text-left pt-2 flex items-center gap-1 group"
              >
                Select Profile <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: TESTIMONIALS */}
      <section className="py-24 bg-gradient-to-b from-[#020617] via-[#040c1e] to-[#020617] border-t border-slate-900/60 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Header left */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">STUDENT PERSPECTIVES</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug">
                Real Learning. Real Impact.
              </h2>
              <p className="font-sans text-slate-300 text-base md:text-[17px] leading-relaxed font-normal">
                Read how our graduates converted their raw interest into highly complex security engineering careers. Our program leads directly to practical operational capability.
              </p>

              {/* Slider dots indicator */}
              <div className="flex items-center gap-2 pt-4">
                {STUDENT_TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTestimonialIndex(idx)}
                    className={`w-3.5 h-1.5 rounded-full transition-all ${idx === testimonialIndex ? 'bg-teal-400 w-6' : 'bg-slate-800 hover:bg-slate-700'}`}
                  />
                ))}
              </div>
            </div>

            {/* Testimonials cards carousel wrapper right */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {STUDENT_TESTIMONIALS.map((test, idx) => (
                <div 
                  key={idx}
                  onClick={() => setTestimonialIndex(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-[240px] cursor-pointer ${
                    testimonialIndex === idx 
                      ? 'bg-[#06142a] border-teal-500/40 shadow-xl scale-[1.01]' 
                      : 'bg-slate-950/60 border-slate-900 opacity-60 hover:opacity-90'
                  }`}
                >
                  <div className="space-y-3.5">
                    <div className="flex gap-0.5 text-teal-400">
                      {[...Array(test.rating)].map((_, i) => <Stars key={i} className="w-3.5 h-3.5 fill-teal-400" />)}
                    </div>
                    <p className="text-xs md:text-[13px] text-slate-300 leading-relaxed font-sans font-normal italic">
                      "{test.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-slate-900/60 mt-4">
                    <div className="w-9 h-9 rounded-full bg-slate-800 overflow-hidden flex items-center justify-center font-bold text-teal-400 font-mono text-xs border border-teal-500/20">
                      {test.name[0]}
                    </div>
                    <div>
                      <div className="text-xs font-sans font-semibold text-white">{test.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{test.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9: ADVISOR BOOKING CALENDAR SYSTEM */}
      <section id="booking" className="py-24 max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-[#F4F9FA] shadow-xl text-slate-800">
          
          {/* Luminous background design on CTA using generated image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/src/assets/images/cyber_gateway_capability_1790340638191.jpg" 
              alt="From Curiosity to Capability Cyber Gateway" 
              className="w-full h-full object-cover opacity-20"
              referrerPolicy="no-referrer"
            />
            {/* Bright soft icy-blue/teal gradient veil */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F4F9FA] via-[#EEF7F8]/95 to-white/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#EEF7F8] via-transparent to-[#F4F9FA]/35" />
          </div>
 
          <div className="relative z-10 p-8 md:p-12 xl:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">NEXT STEP</div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#020617] leading-tight tracking-tight">
                Talk to a BCAD Advisor
              </h2>
              <p className="font-sans text-slate-700 text-base md:text-[17px] leading-relaxed font-normal">
                Get your questions answered, evaluate your technical background, understand batch timings, and discover how our hands-on security labs will boost your cyber operations career.
              </p>
 
              {/* Trust disclaimer */}
              <div className="p-4 bg-white/80 rounded-xl border border-slate-200 shadow-sm max-w-md">
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                  ⚠️ <span className="text-[#020617] font-bold">No obligation.</span> Just a technical, peer-to-peer exploration session focused strictly on your cybersecurity goals and career blueprint.
                </p>
              </div>
 
              {/* Text visual block representing capability bridge */}
              <div className="pt-4 border-t border-slate-200/80">
                <div className="text-xs font-mono text-teal-700 font-bold uppercase tracking-widest">
                  FROM CURIOSITY TO DEFENSIVE CAPABILITY.
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1 font-semibold">
                  BlackPerl DFIR - Built for a Safer Digital World.
                </div>
              </div>
            </div>
 
            {/* Right Booking Form */}
            <div className="lg:col-span-6 bg-white/95 border border-slate-200/80 p-6 md:p-8 rounded-2xl backdrop-blur-md relative shadow-lg text-slate-800">
              
              {!bookingSubmitted ? (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  
                  <div className="font-display text-base font-bold text-[#020617] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    Schedule Advisor Call
                  </div>
                  <p className="text-xs text-slate-600 font-sans pb-2 font-normal">
                    Select your current experience path and schedule a slot with our training engineers.
                  </p>
 
                  {/* Profile Picker linked to 'Who BCAD is For' */}
                  <div>
                    <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">1. CHOOSE YOUR PROFILE PATH:</label>
                    <select
                      value={bookingProfile}
                      onChange={(e) => setBookingProfile(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans font-medium shadow-inner"
                    >
                      <option value="Already Working in a SOC?">Already Working in a SOC?</option>
                      <option value="Working in IT / Systems / Networks?">Working in IT / Systems / Networks?</option>
                      <option value="Junior Security Professional?">Junior Security Professional?</option>
                      <option value="New to Cybersecurity?">New to Cybersecurity?</option>
                      <option value="SOC Analyst (L1 / L2 / L3)">SOC Analyst Track</option>
                      <option value="Detection Engineer">Detection Engineer Track</option>
                      <option value="Threat Hunter">Threat Hunter Track</option>
                    </select>
                  </div>
 
                  {/* Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">2. YOUR NAME:</label>
                      <input
                        type="text"
                        placeholder="Amit Sharma"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans font-medium shadow-inner"
                        required
                      />
                    </div>
 
                    <div>
                      <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">3. EMAIL ADDRESS:</label>
                      <input
                        type="email"
                        placeholder="amit@company.com"
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans font-medium shadow-inner"
                        required
                      />
                    </div>
                  </div>
 
                  {/* Phone & Date/Time selection */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">4. PHONE:</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans font-medium shadow-inner"
                        required
                      />
                    </div>
 
                    <div>
                      <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">5. SELECT DATE:</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans font-medium shadow-inner"
                        required
                      />
                    </div>
 
                    <div>
                      <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">6. PREFERRED TIME:</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans font-medium shadow-inner"
                        required
                      >
                        <option value="">Select slot</option>
                        <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM IST</option>
                        <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM IST</option>
                        <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM IST</option>
                        <option value="08:00 PM - 09:00 PM">08:00 PM - 09:00 PM IST</option>
                      </select>
                    </div>
                  </div>
 
                  {formError && (
                    <div className="text-xs text-red-500 font-sans flex items-center gap-1.5 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formError}
                    </div>
                  )}
 
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full py-3.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-sans font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {bookingLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Analyzing slot availability...
                      </>
                    ) : (
                      <>
                        Confirm Advisor Booking →
                      </>
                    )}
                  </button>
 
                  <div className="text-center text-[11px] text-slate-500 font-sans font-medium">
                    Privacy Assured · No marketing spam · 1-to-1 Technical Session Only
                  </div>
 
                </form>
              ) : (
                <div className="space-y-6 text-center py-6 animate-fadeIn">
                  <div className="w-16 h-16 bg-teal-100 text-teal-700 border border-teal-200 shadow-sm rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-slate-950">Advisor Booking Confirmed!</h3>
                    <p className="text-xs md:text-sm text-slate-700 font-sans leading-relaxed max-w-md mx-auto font-normal">
                      Thank you, <span className="font-bold text-teal-700">{bookingName}</span>. Your technical orientation call is locked on <span className="font-bold text-teal-700">{bookingDate}</span> during the <span className="font-bold text-teal-700">{bookingTime}</span> slot. An email confirmation has been sent to <span className="underline text-slate-800">{bookingEmail}</span>.
                    </p>
                  </div>
 
                  <div className="p-4 bg-slate-50 border border-slate-200 shadow-sm rounded-xl text-left max-w-md mx-auto space-y-3">
                    <div className="text-xs font-mono text-teal-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpenCheck className="w-4 h-4" />
                      PRE-CALL PREPARATION CHECKLIST:
                    </div>
                    <ul className="text-[11px] text-slate-600 space-y-1.5 list-disc pl-4 font-sans leading-relaxed font-normal">
                      <li>Download the Sigma Rules checklist provided in Module 02 preview.</li>
                      <li>Review the Incident Range Sandbox parameters you completed today.</li>
                      <li>Bring details of your team's existing technology stack (Splunk, Elastic, Sentinel, etc.) to customize the curriculum alignment.</li>
                    </ul>
                  </div>
 
                  <div className="flex gap-3 justify-center pt-2">
                    <button
                      onClick={() => setBookingSubmitted(false)}
                      className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-sans text-slate-700 hover:bg-slate-200 transition-all font-semibold"
                    >
                      Book Another Slot
                    </button>
                    <a
                      href="#about"
                      className="px-4 py-2 bg-teal-400 text-slate-950 text-xs font-sans font-semibold rounded-lg hover:bg-teal-300 transition-all"
                    >
                      Return to Top
                    </a>
                  </div>
                </div>
              )}
 
            </div>
 
          </div>
        </div>
      </section>
        </>
      )}

      {/* FOOTER: Premium, clean design */}
      <footer className="bg-slate-950 border-t border-slate-900 py-16 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo & Description */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex flex-col cursor-pointer" onClick={() => navigate('/')}>
              <span className="font-display text-lg font-bold text-white tracking-tight">BlackPerl DFIR</span>
              <span className="text-[9px] font-mono tracking-widest text-teal-400 uppercase leading-none mt-1">
                CYBER SECURITY · FORENSICS · RESILIENCE
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm font-sans font-normal text-xs">
              BlackPerl DFIR is a premier technical training provider delivering intense, hands-on, globally recognized defensive security programs.
            </p>
            <div className="text-[11px] text-slate-500 font-sans font-normal">
              © {new Date().getFullYear()} BlackPerl DFIR. All rights reserved. <br />
              Built for a Safer Digital World.
            </div>
          </div>

          {/* Programs Links Column */}
          <div className="md:col-span-2.5 space-y-3.5">
            <div className="text-xs font-sans text-white font-semibold tracking-wider uppercase">Programs</div>
            <ul className="space-y-2 text-[11px] font-sans">
              <li><button onClick={() => navigate('/program')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">BCAD Program Curriculum</button></li>
              <li><button onClick={() => navigate('/corporate-training')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">Cybersecurity Team Training</button></li>
              <li><button onClick={() => navigate('/#tools')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">Industry Tools & Technologies</button></li>
              <li><button onClick={() => navigate('/#sandbox')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">Threat Range Sandbox</button></li>
            </ul>
          </div>

          {/* Company Links Column */}
          <div className="md:col-span-2.5 space-y-3.5">
            <div className="text-xs font-sans text-white font-semibold tracking-wider uppercase">Company</div>
            <ul className="space-y-2 text-[11px] font-sans">
              <li><button onClick={() => navigate('/')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">About BlackPerl DFIR</button></li>
              <li><button onClick={() => navigate('/program')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">Instructor Team & Syllabus</button></li>
              <li><button onClick={() => navigate('/contact')} className="hover:text-teal-400 transition-colors text-left cursor-pointer">Talk to a Training Advisor</button></li>
              <li><span className="text-slate-600 cursor-not-allowed">Partner Portal</span></li>
            </ul>
          </div>

          {/* Legal Links Column */}
          <div className="md:col-span-3 space-y-3.5">
            <div className="text-xs font-sans text-white font-semibold tracking-wider uppercase">Legal & Advisory</div>
            <ul className="space-y-2 text-[11px] font-sans">
              <li><button onClick={() => navigate('/privacy-policy')} className="text-slate-400 hover:text-teal-400 transition-colors cursor-pointer text-left">Privacy & Telemetry Policy</button></li>
              <li><button onClick={() => navigate('/terms-and-conditions')} className="text-slate-400 hover:text-teal-400 transition-colors cursor-pointer text-left">Terms & Conditions of Labs</button></li>
              <li><button onClick={() => navigate('/contact')} className="text-slate-400 hover:text-teal-400 transition-colors cursor-pointer text-left">Refund & Support Inquiry</button></li>
            </ul>
            <div className="pt-3 border-t border-slate-900 space-y-1 text-slate-400 font-sans">
              <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" /> +91-9000-BPDFIR</div>
              <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" /> bcad@blackperldfir.com</div>
              <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" /> Hyderabad, Telangana, India</div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
