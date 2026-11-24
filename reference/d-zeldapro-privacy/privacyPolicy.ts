export const privacyPolicyMeta = {
  title: 'Privacy Policy & Health Data Protection Protocol',
  subtitle:
    'Governing the personal, technical, and health data processing practices of Zeldapro Consultancy Private Limited, its corporate digital infrastructure, and its flagship digital health platform and mobile application suite, Carevie.',
  legalEntity: 'Zeldapro Consultancy Private Limited',
  productCovered: 'Carevie Health Platform',
  lastUpdated: 'November 11, 2026',
  jurisdiction: 'Mumbai, Maharashtra, India',
}

export const privacyHighlights = [
  {
    title: 'Zero Data Monetization',
    body: 'We never sell, rent, or trade your personal or health data. We do not use health data for third-party advertising or cross-app tracking.',
  },
  {
    title: 'Carevie Health Vault',
    body: 'Medical records, lab tests, and prescriptions are stored with zero third-party access, available strictly to you and your authorized CareCircle members.',
  },
  {
    title: 'Apple Privacy Compliance',
    body: 'iOS permissions (Camera, Photos, Face ID) operate strictly on-demand for document uploads. Biometrics never leave the local Apple Secure Enclave.',
  },
  {
    title: 'Full Account Deletion',
    body: 'In full compliance with Apple Guideline 5.1.1(v), delete your account directly inside the app (Settings → Delete Account) with complete data purging.',
  },
] as const

export const privacySectionIndex = [
  { num: 1, id: 'section-1', title: 'Executive Overview & Scope' },
  { num: 2, id: 'section-2', title: 'Corporate Identity & Data Fiduciary' },
  { num: 3, id: 'section-3', title: 'Carevie Healthcare Product Details' },
  { num: 4, id: 'section-4', title: 'Key Legal & Technical Definitions' },
  { num: 5, id: 'section-5', title: 'Information We Collect' },
  { num: 6, id: 'section-6', title: 'Apple iOS & Mobile Device Permissions' },
  { num: 7, id: 'section-7', title: 'How We Collect Your Data' },
  { num: 8, id: 'section-8', title: 'Lawful Basis & Purposes of Processing' },
  { num: 9, id: 'section-9', title: 'AI Processing & Third-Party LLM Services' },
  { num: 10, id: 'section-10', title: 'Data Sharing, Disclosures & Sub-Processors' },
  { num: 11, id: 'section-11', title: 'CareCircle & Secure Share Links' },
  { num: 12, id: 'section-12', title: 'Child Profiles & Protection of Minors' },
  { num: 13, id: 'section-13', title: 'Cross-Border Data Storage & Transfers' },
  { num: 14, id: 'section-14', title: 'Security Safeguards & Encryption' },
  { num: 15, id: 'section-15', title: 'Data Retention & Account Deletion' },
  { num: 16, id: 'section-16', title: 'Data Principal Rights (DPDP Act & Apple)' },
  { num: 17, id: 'section-17', title: 'Cookies & Tracking Technologies' },
  { num: 18, id: 'section-18', title: 'Grievance Redressal Mechanism' },
  { num: 19, id: 'section-19', title: 'Updates to this Privacy Policy' },
  { num: 20, id: 'section-20', title: 'Official Corporate Contact Details' },
] as const

export const iosPermissionsTable = {
  headers: [
    'iOS Permission Key',
    'User-Facing Purpose',
    'Data Handled & Restrictions',
  ],
  rows: [
    [
      'NSCameraUsageDescription',
      'Allows capturing images of paper prescriptions, lab reports, and medical bills directly from the device camera.',
      'Camera stream is active only while the capture UI is open. Images are saved directly to your private vault; no background camera access occurs.',
    ],
    [
      'NSPhotoLibraryUsageDescription',
      'Allows browsing and selecting existing medical report photographs, scan images, or PDF receipts from your Photo Library.',
      'Access is limited only to items you explicitly select. We do not index, scan, or transmit unselected photos.',
    ],
    [
      'NSFaceIDUsageDescription',
      'Provides local on-device biometric app lock/unlock for enhanced health record confidentiality.',
      'Biometric validation is processed exclusively by Apple’s LocalAuthentication framework within the device’s Secure Enclave. We never access, capture, or store your facial geometry or fingerprint data.',
    ],
    [
      'Push Notifications (APNs)',
      'Delivers medication reminders, CareCircle sharing notifications, and critical security login alerts.',
      'We never transmit medical records, diagnosis text, or health details through push notification payloads. Can be toggled off anytime in iOS Settings.',
    ],
  ],
} as const

export const subProcessors = [
  {
    name: 'Supabase Inc.',
    role: 'Database & Object Storage Infrastructure (AES-256)',
    detail: 'Primary Encrypted Vault Storage',
  },
  {
    name: 'DigitalOcean LLC',
    role: 'Cloud Compute & Application Servers',
    detail: 'Backend API Host & Microservices',
  },
  {
    name: 'Upstash Inc.',
    role: 'Distributed Redis Cache & Edge Rate Limiting',
    detail: 'Security Defense & Abuse Prevention',
  },
  {
    name: '2Factor (SMS Gateway)',
    role: 'Telecommunications Provider (India)',
    detail: 'Cryptographic OTP SMS Delivery',
  },
  {
    name: 'Apple Push Notification service (APNs)',
    role: 'Apple Inc. Notification Gateways',
    detail: 'Transactional iOS Push Alerts',
  },
  {
    name: 'Google Analytics',
    role: 'Anonymized Web Performance Analytics',
    detail: 'Aggregated Metrics (Zero Health Data)',
  },
] as const

export const dataPrincipalRights = [
  {
    title: 'Right to Access Summary',
    description:
      'Receive a full summary of all personal and health data stored about you and the list of sub-processors with whom it has been shared.',
  },
  {
    title: 'Right to Rectification',
    description:
      'Correct, update, or complete any inaccurate or out-of-date personal information in your profile.',
  },
  {
    title: 'Right to Erasure',
    description:
      'Request complete permanent erasure of personal data that is no longer required for the purpose it was collected.',
  },
  {
    title: 'Right to Grievance Redressal',
    description:
      'Register complaints with our designated Grievance Officer and escalate to the Data Protection Board of India.',
  },
  {
    title: 'Right to Nominate',
    description:
      'Nominate a surrogate individual to exercise your privacy rights in the event of death or legal incapacity.',
  },
  {
    title: 'Right to Withdraw Consent',
    description:
      'Revoke previously granted consent at any time without impacting processing conducted prior to the withdrawal.',
  },
] as const

export const securitySafeguards = [
  {
    title: 'AES-256 At-Rest Encryption',
    description:
      'All stored files, medical scans, PDF reports, and database records are encrypted using Advanced Encryption Standard (AES) 256-bit keys.',
  },
  {
    title: 'TLS 1.3 In-Transit Encryption',
    description:
      'All data exchanged between client applications, web browsers, and our APIs is protected by modern Transport Layer Security (TLS 1.3 / HTTPS).',
  },
  {
    title: 'OTP-Only Authentication',
    description:
      'Eliminates weak, reused, or compromised passwords through cryptographically throttled one-time mobile verification tokens.',
  },
  {
    title: 'Principle of Least Privilege',
    description:
      'Internal engineers and personnel do not have arbitrary read access to unencrypted patient health records or diagnostic files.',
  },
] as const

export const registeredOffice =
  '1st FLR/102, C-38-39, PARINEE CRESCENZO, Bandra(East), Mumbai, Mumbai- 400051, Maharashtra'