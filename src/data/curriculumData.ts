export interface Module {
  id: string;
  number: string;
  title: string;
  description: string;
  lessonsCount: number;
  hours: number;
  labs: string[];
  tools: string[];
  syllabusDetails: string[];
}

export interface ToolCategory {
  category: string;
  tools: string[];
  description: string;
  icon: string;
}

export interface RoleDetail {
  title: string;
  level: string;
  description: string;
  skillsNeeded: string[];
  salaryExpectation: string;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export const PARTNERS = [
  { name: 'DRDO', logoText: 'DRDO', desc: 'Defense Research' },
  { name: 'Indian Army', logoText: 'Indian Army', desc: 'National Defense' },
  { name: 'AIRBUS', logoText: 'AIRBUS', desc: 'Aerospace & Defense' },
  { name: 'NUTANIX', logoText: 'NUTANIX', desc: 'Enterprise Cloud' },
  { name: 'Cyderes', logoText: 'Cyderes', desc: 'Managed Security Services' }
];

export const CERTIFICATION_INFO = {
  provider: 'Pearson',
  status: 'Blockchain Verified',
  recognition: 'Globally Recognized',
  title: 'BCAD Practical Certification Assessment'
};

export const CAPABILITIES = [
  {
    phase: 'DETECT',
    tagline: 'Identify real threats in real telemetry',
    tech: 'SOC / SIEM / EDR',
    description: 'Go beyond shallow alerts. Gain precision visibility using enterprise SIEMs and endpoint telemetry to detect stealthy persistence and lateral movement.'
  },
  {
    phase: 'INVESTIGATE',
    tagline: 'Analyse and understand the attack',
    tech: 'IR / Forensics / Memory',
    description: 'Unravel the threat timeline. Conduct deep memory and disk forensics, trace execution paths, and reconstruct the adversary\'s steps from initial compromise.'
  },
  {
    phase: 'HUNT',
    tagline: 'Go beyond alerts',
    tech: 'Threat Intel / MITRE ATT&CK',
    description: 'Proactively search for hidden indicators. Apply MITRE ATT&CK frameworks and threat intelligence to identify undetected living-off-the-land techniques.'
  },
  {
    phase: 'ENGINEER',
    tagline: 'Build better detections',
    tech: 'Sigma / YARA / Sysmon / KQL',
    description: 'Codify security logic. Author custom Sigma and YARA rules, telemetry filters, and SIEM queries to prevent future security lapses permanently.'
  },
  {
    phase: 'RESPOND',
    tagline: 'Contain and recover',
    tech: 'Incident Response / Defensive Ops',
    description: 'Halt attack execution immediately. Orchestrate network containment, process termination, credential revocation, and clean system recovery workflows.'
  }
];

export const MODULES: Module[] = [
  {
    id: 'soc-ops',
    number: '01',
    title: 'SOC & Security Operations',
    description: 'Go beyond basic alert monitoring. Build an analytical core in modern security monitoring, log pipeline architecture, telemetry enrichment, and high-stakes incident triage.',
    lessonsCount: 26,
    hours: 20,
    tools: ['Splunk', 'Elasticsearch', 'Sysmon', 'Wazuh'],
    labs: ['Log pipeline debugging', 'Telemetry ingestion & normalization', 'Event correlation design'],
    syllabusDetails: [
      'Modern SOC Architecture & Telemetry Sources',
      'Log Ingestion, Normalization, and Event Parsers',
      'Designing High-Fidelity Alerting Conditions',
      'Incident Triage Frameworks & Analyst Workflows'
    ]
  },
  {
    id: 'detection-eng',
    number: '02',
    title: 'Detection Engineering',
    description: 'Codify tribal knowledge into resilient, high-fidelity security alerts using industry-standard rulesets across endpoints, identities, and multi-cloud environments.',
    lessonsCount: 28,
    hours: 22,
    tools: ['Sigma Rules', 'YARA', 'KQL', 'Sysmon'],
    labs: ['Authoring Sigma rules for LOLBINs', 'Developing custom YARA rules for memory payloads', 'Designing Windows Event Filter profiles'],
    syllabusDetails: [
      'The Detection Engineering Lifecycle',
      'Telemetry Source Validation and Sysmon Configuration',
      'Sigma Rule Format & Abstracting Detection Logic',
      'Advanced KQL & Log Queries for Rule Engineering'
    ]
  },
  {
    id: 'threat-hunting',
    number: '03',
    title: 'Advanced Threat Hunting',
    description: 'Stop waiting for alerts. Develop hypotheses to search for hidden attackers utilizing living-off-the-land techniques, quiet persistence, and credential theft.',
    lessonsCount: 24,
    hours: 18,
    tools: ['MITRE ATT&CK', 'Splunk', 'Suricata', 'Threat Intel Feeds'],
    labs: ['Hypothesis-led hunt on process creation', 'Searching for active Beaconing behavior', 'Identifying lateral movement in Kerberos logs'],
    syllabusDetails: [
      'Hypothesis Generation & Hunt Methodologies',
      'Mapping Telemetry Coverage to MITRE ATT&CK',
      'Detecting Lateral Movement (SMB, RPC, Kerberos)',
      'Threat Intelligence Integration & IOC Operationalization'
    ]
  },
  {
    id: 'dfir-ir',
    number: '04',
    title: 'Digital Forensics & Incident Response',
    description: 'Analyse systems under compromise. Reconstruct attack timelines from file system artefacts, system event records, and compromised machine images.',
    lessonsCount: 28,
    hours: 22,
    tools: ['Autopsy', 'FTK Imager', 'KAPE', 'Plaso'],
    labs: ['Triage-scale host collection with KAPE', 'Reconstructing Browser and Registry attack paths', 'Timeline analysis of lateral movement'],
    syllabusDetails: [
      'Live Response & Evidence Preservation Standards',
      'Windows Registry & Link File Forensics',
      'Master File Table ($MFT) and USN Journal Forensics',
      'Timelining Attacks using plaso / log2timeline'
    ]
  },
  {
    id: 'memory-forensics',
    number: '05',
    title: 'Memory Forensics',
    description: 'Inspect running system memory under the microscope. Detect reflective DLL injection, process hollowing, hook injections, and hidden thread execution.',
    lessonsCount: 20,
    hours: 16,
    tools: ['Volatility 3', 'Rekall', 'MemProcFS', 'Procdump'],
    labs: ['Carving injected Cobalt Strike beacons from memory', 'Detecting unbacked executable pages with malfind', 'Extracting kernel-level hooks and rootkits'],
    syllabusDetails: [
      'Memory Acquisition Best Practices on Live Systems',
      'VAD Tree Traversal & Memory Injection Detection',
      'Process Hollowing & Process Doppelgänging Identification',
      'Extracting Memory Resident Credentials and Hashes'
    ]
  },
  {
    id: 'malware-analysis',
    number: '06',
    title: 'Malware Analysis',
    description: 'Perform static and dynamic triage of unknown adversary payloads. Extract indicators of compromise (IOCs), understand persistence techniques, and unpack loaders safely.',
    lessonsCount: 22,
    hours: 16,
    tools: ['Ghidra', 'x64dbg', 'PEStudio', 'CAPA'],
    labs: ['Static property inspection & string decryption', 'Dynamic sandbox execution & API monitoring', 'Extracting C2 configuration from ransomware loaders'],
    syllabusDetails: [
      'Safe Malware Laboratory Setup & Isolation',
      'Static Triage, Hashes, PE Headers & CAPA Capability Analysis',
      'Behavioral Dynamic Analysis & Process Monitoring',
      'Extracting Configuration Blocks from Modern Loaders'
    ]
  },
  {
    id: 'security-eng',
    number: '07',
    title: 'Security Engineering',
    description: 'Design resilient defensive security infrastructure. Deploy log shippers, engineer robust audit configurations, and automate defensive containment pipelines.',
    lessonsCount: 20,
    hours: 14,
    tools: ['Auditd', 'Syslog-ng', 'Logstash', 'OpenSearch'],
    labs: ['Hardening Linux auditd configurations for MITRE coverage', 'Architecting resilient log forwarders with TLS', 'Automating firewall containment via API hooks'],
    syllabusDetails: [
      'Enterprise Telemetry Architecture & Log Pipeline Design',
      'Operating System Auditing Baseline & Policy Enforcement',
      'Network Sensor Deployment & Suricata IDS Integration',
      'Defensive Orchestration & Automated Containment Triggers'
    ]
  },
  {
    id: 'cloud-threats',
    number: '08',
    title: 'Cloud & Modern Threats',
    description: 'Secure the modern enterprise frontier. Identify and respond to compromises targeting AWS, Azure, container environments, and SaaS identity providers.',
    lessonsCount: 20,
    hours: 12,
    tools: ['AWS CloudTrail', 'Azure Activity Logs', 'Kubernetes Audit', 'Wazuh'],
    labs: ['Investigating AWS S3 exfiltration', 'Tracing Azure AD privilege escalation', 'Analyzing compromised Kubernetes pods logs'],
    syllabusDetails: [
      'Cloud Identity & Access Management (IAM) Attack Paths',
      'Analyzing CloudTrail & GuardDuty Logs',
      'Kubernetes Cluster Logging & Incident Response',
      'Investigating Microsoft 365 / OAuth App Consent Hijacking'
    ]
  }
];

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    category: 'Security Operations',
    tools: ['SIEM', 'EDR', 'SOAR'],
    description: 'Centralize security event monitoring and defensive actions.',
    icon: 'Terminal'
  },
  {
    category: 'Detection',
    tools: ['Sigma', 'YARA', 'Sysmon', 'KQL'],
    description: 'Author platform-agnostic alerts and inspect endpoint execution patterns.',
    icon: 'Cpu'
  },
  {
    category: 'Threat Hunting',
    tools: ['MITRE ATT&CK', 'Threat Intel'],
    description: 'Map behavioral patterns and track advanced persistent threats (APTs).',
    icon: 'Radar'
  },
  {
    category: 'Investigation',
    tools: ['DFIR', 'Memory Forensics'],
    description: 'Uncover deeply hidden memory injections and trace disk-based registry trails.',
    icon: 'Compass'
  },
  {
    category: 'Security Platforms',
    tools: ['Splunk', 'Elastic', 'Wazuh'],
    description: 'Enterprise telemetry backends used to index, search, and analyze big logs.',
    icon: 'Database'
  },
  {
    category: 'Network & Malware',
    tools: ['Suricata', 'Malware Analysis', 'Sandbox'],
    description: 'Intercept malicious wire-level traffic and safely detonate unknown payloads.',
    icon: 'Network'
  },
  {
    category: 'Cloud & Modern Threats',
    tools: ['Cloud Security', 'Modern Threats', 'Logs & Telemetry'],
    description: 'Deconstruct cloud attack paths and container orchestration level telemetry.',
    icon: 'CloudLightning'
  }
];

export const ROLES_APPLICABILITY: RoleDetail[] = [
  {
    title: 'SOC Analyst (L1 / L2 / L3)',
    level: 'L1 to L3 Engineering',
    description: 'Equip yourself to analyze complex telemetry and lead multi-stage incident investigations, elevating you beyond simple ticket-passing.',
    skillsNeeded: ['Log Parsers', 'Event Correlation', 'Alert Tuning', 'Incident Triage'],
    salaryExpectation: '$85,000 - $140,000'
  },
  {
    title: 'Detection Engineer',
    level: 'Engineering Specialty',
    description: 'Design, write, and audit the alerts that protect the enterprise. Turn threat research reports into working, reliable production rules.',
    skillsNeeded: ['Sigma Format', 'YARA Payload Writing', 'KQL Query Design', 'Telemetry Filters'],
    salaryExpectation: '$110,000 - $165,000'
  },
  {
    title: 'Threat Hunter',
    level: 'Proactive Specialty',
    description: 'Search for persistent actors that bypassed standard defenses. Formulate advanced behavioral hypotheses and execute query hunts.',
    skillsNeeded: ['MITRE ATT&CK Matrix', 'Behavioral Logs', 'Anomaly Analytics', 'IOC Stash'],
    salaryExpectation: '$120,000 - $180,000'
  },
  {
    title: 'Incident Responder',
    level: 'Defensive Ops Core',
    description: 'Lead emergency threat containments, isolate networks, clean lateral threats, and direct the recovery of major corporate infrastructure.',
    skillsNeeded: ['Host Containment', 'Live Response Collection', 'Incident Orchestration', 'Remediation Plans'],
    salaryExpectation: '$105,000 - $160,000'
  },
  {
    title: 'DFIR Analyst',
    level: 'Specialist Investigator',
    description: 'Examine disk and memory telemetry under the microscope. Perform full-scope root-cause analysis for sophisticated cyber breaches.',
    skillsNeeded: ['Volatility 3 Memory Analysis', 'Registry Carving', 'Browser Timelines', 'File Carving'],
    salaryExpectation: '$115,000 - $170,000'
  },
  {
    title: 'Security Engineer',
    level: 'Infrastructure & Guard',
    description: 'Deploy advanced security controls, design robust log shipping topologies, and construct reliable alert routing configurations.',
    skillsNeeded: ['Log Forwarders', 'SIEM Cluster Management', 'Sysmon Deployments', 'Telemetry Auditing'],
    salaryExpectation: '$100,000 - $155,000'
  }
];

export const STUDENT_TESTIMONIALS: Testimonial[] = [
  {
    name: 'Amit S.',
    role: 'SOC Analyst',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop',
    quote: 'BCAD gave me the practical confidence to handle real investigation scenarios. The hands-on labs made all the difference.',
    rating: 5
  },
  {
    name: 'Neha K.',
    role: 'Security Engineer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop',
    quote: 'The depth of coverage from detection to DFIR is exactly what I needed to grow in my role. The instructors bring real-world experience.',
    rating: 5
  },
  {
    name: 'Rahul M.',
    role: 'Threat Hunter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop',
    quote: 'This isn\'t a theory course. You work with real tools and real scenarios. It helped me think like a defender.',
    rating: 5
  }
];
