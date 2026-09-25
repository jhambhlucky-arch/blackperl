import React, { useEffect, useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  Check, 
  RefreshCw, 
  AlertCircle, 
  MessageSquare, 
  BookOpenCheck,
  ArrowRight
} from 'lucide-react';
import { db, doc, setDoc, serverTimestamp, handleFirestoreError, OperationType } from '../firebase';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [currentJourney, setCurrentJourney] = useState('Already Working in a SOC');
  const [focusArea, setFocusArea] = useState('Detection Engineering & Sigma');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Contact BCAD | Talk to a Cybersecurity Training Advisor";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Speak with a BCAD advisor about advanced defensive cybersecurity training, SOC, threat hunting, detection engineering, DFIR and incident response.");
    }
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date || !time) {
      setError('Please fill in all contact and schedule fields.');
      return;
    }
    setError(null);
    setLoading(true);
    const inquiryId = 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    try {
      await setDoc(doc(db, 'advisory_inquiries', inquiryId), {
        fullName: name.trim().slice(0, 100),
        email: email.trim().slice(0, 120),
        phone: phone.trim().slice(0, 40),
        preferredDate: date.slice(0, 30),
        preferredTime: time.slice(0, 30),
        journeyStage: currentJourney.slice(0, 100),
        focusArea: focusArea.slice(0, 100),
        createdAt: serverTimestamp(),
        status: 'pending'
      });
      setSubmitted(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `advisory_inquiries/${inquiryId}`);
      setError('Failed to record your inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans">
      
      {/* CONTACT HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden bg-gradient-to-br from-[#020617] via-[#051733] to-[#020617] animate-hero-gradient border-b border-slate-900/80">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#07152a_1px,transparent_1px),linear-gradient(to_bottom,#07152a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono text-[10px] uppercase tracking-wider font-semibold">
              TECHNICAL ADVISORY
            </span>
            <span className="text-slate-300 font-sans font-medium text-xs">
              Direct Peer-to-Peer Exploration
            </span>
          </div>

          {/* LOCKED H1 */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Talk to a BCAD Advisor
          </h1>

          <p className="font-sans text-slate-300 text-base md:text-[18px] leading-relaxed font-normal">
            Speak with an active defensive cybersecurity instructor. Evaluate your networking and systems foundation, review upcoming cohort timings, and clarify practical lab requirements.
          </p>
        </div>
      </section>

      {/* MAIN CONSULTATION WORKFLOW SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#F8FBFC] via-[#EEF7F8] to-[#F4F9FA] text-slate-800 border-b border-slate-200/50">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-xl space-y-12">
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* LOCKED H2: Tell Us Where You Are in Your Cybersecurity Journey */}
                <div className="space-y-4">
                  <span className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">STEP 01</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#020617] tracking-tight">
                    Tell Us Where You Are in Your Cybersecurity Journey
                  </h2>
                  <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                    Select the profile that best describes your background so our instructors can calibrate technical expectations.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                    {[
                      'Already Working in a SOC',
                      'Working in IT, Systems or Networks',
                      'Junior Security Professional',
                      'New to Cybersecurity'
                    ].map((j) => (
                      <button
                        type="button"
                        key={j}
                        onClick={() => setCurrentJourney(j)}
                        className={`p-4 rounded-xl border text-left text-xs font-sans transition-all cursor-pointer ${
                          currentJourney === j
                            ? 'bg-teal-50 border-teal-500/80 text-teal-950 font-semibold shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-normal'
                        }`}
                      >
                        {j}
                      </button>
                    ))}
                  </div>
                </div>

                {/* LOCKED H2: What Would You Like to Develop? */}
                <div className="space-y-4 border-t border-slate-100 pt-8">
                  <span className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">STEP 02</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#020617] tracking-tight">
                    What Would You Like to Develop?
                  </h2>
                  <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                    Identify your primary technical focus domain within the defensive security lifecycle.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                    {[
                      'SOC & Security Operations Depth',
                      'Detection Engineering & Sigma',
                      'Advanced Threat Hunting & KQL',
                      'DFIR & Disk/Memory Forensics',
                      'Malware Analysis & Triage',
                      'Cloud & Container Security (AWS/K8s)'
                    ].map((f) => (
                      <button
                        type="button"
                        key={f}
                        onClick={() => setFocusArea(f)}
                        className={`p-4 rounded-xl border text-left text-xs font-sans transition-all cursor-pointer ${
                          focusArea === f
                            ? 'bg-teal-50 border-teal-500/80 text-teal-950 font-semibold shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-normal'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SCHEDULING & CONTACT DETAILS */}
                <div className="space-y-4 border-t border-slate-100 pt-8">
                  <span className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">STEP 03</span>
                  <div className="font-display text-xl font-bold text-[#020617]">
                    Schedule Your Technical Consultation Call
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">YOUR FULL NAME:</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Rohan Varma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">EMAIL ADDRESS:</label>
                      <input 
                        type="email" 
                        required
                        placeholder="rohan@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">PHONE / WHATSAPP:</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 98000 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">PREFERRED DATE:</label>
                      <input 
                        type="date" 
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 text-xs mb-1.5 font-sans font-semibold">PREFERRED TIME SLOT:</label>
                      <select
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-sans shadow-inner"
                      >
                        <option value="">Select a time slot</option>
                        <option value="10:00 AM - 11:00 AM IST">10:00 AM - 11:00 AM IST</option>
                        <option value="02:00 PM - 03:00 PM IST">02:00 PM - 03:00 PM IST</option>
                        <option value="05:00 PM - 06:00 PM IST">05:00 PM - 06:00 PM IST</option>
                        <option value="08:00 PM - 09:00 PM IST">08:00 PM - 09:00 PM IST</option>
                      </select>
                    </div>
                  </div>

                  {error && (
                    <div className="text-xs text-red-500 font-sans flex items-center gap-1.5 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-teal-400 hover:bg-teal-300 text-slate-950 font-sans font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Locking Technical Slot...
                      </>
                    ) : (
                      <>
                        Confirm Advisor Session →
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-500 text-center font-sans">
                    No marketing spam · Direct technical advisor discussion only.
                  </p>
                </div>

              </form>
            ) : (
              <div className="text-center py-8 space-y-4 animate-fadeIn">
                <div className="w-14 h-14 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <div className="font-display text-2xl font-bold text-slate-950">Technical Advisor Session Confirmed</div>
                <p className="text-xs md:text-sm text-slate-700 font-sans max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-teal-700">{name}</span>. Your 1-on-1 consultation regarding <span className="font-bold text-teal-700">{focusArea}</span> is locked for <span className="font-bold text-teal-700">{date}</span> at <span className="font-bold text-teal-700">{time}</span>. Confirmation sent to <span className="underline text-slate-800">{email}</span>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-sans font-semibold rounded-lg"
                  >
                    Book Another Session
                  </button>
                </div>
              </div>
            )}

            {/* LOCKED H2: Prefer to Speak Directly? */}
            <div className="border-t border-slate-200/80 pt-10 space-y-4">
              <span className="text-xs font-mono text-teal-700 uppercase tracking-widest font-bold">DIRECT CHANNELS</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#020617] tracking-tight">
                Prefer to Speak Directly?
              </h2>
              <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                Reach our Hyderabad instructional facility via telephone, WhatsApp, or official institutional email.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <Phone className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#020617]">Telephone Support</div>
                    <div className="text-xs font-mono text-slate-600 mt-0.5">+91-9000-BPDFIR</div>
                    <div className="text-[10px] text-slate-500 font-sans">Mon-Sat, 9am - 7pm IST</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <Mail className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#020617]">Admissions Email</div>
                    <div className="text-xs font-mono text-slate-600 mt-0.5">bcad@blackperldfir.com</div>
                    <div className="text-[10px] text-slate-500 font-sans">24h response SLA</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#020617]">Operational Headquarters</div>
                    <div className="text-xs text-slate-600 mt-0.5 font-sans">Hyderabad, Telangana</div>
                    <div className="text-[10px] text-slate-500 font-sans">India Cyber Defense Hub</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
