import type { ReactNode } from 'react'
import {
  dataPrincipalRights,
  iosPermissionsTable,
  registeredOffice,
  securitySafeguards,
  subProcessors,
} from '../../../data/privacyPolicy'

function SectionShell({
  id,
  label,
  title,
  children,
}: {
  id: string
  label: string
  title: string
  children: ReactNode
}) {
  return (
    <article
      id={id}
      className="scroll-mt-28 border-b border-line pb-12 last:border-b-0 last:pb-0"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-electric-600">
        {label}
      </p>
      <h2 className="mt-2 font-heading text-2xl text-brand-950 sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink-muted sm:text-base">
        {children}
      </div>
    </article>
  )
}

function Callout({
  title,
  children,
  tone = 'default',
}: {
  title: string
  children: ReactNode
  tone?: 'default' | 'warning'
}) {
  return (
    <div
      className={
        tone === 'warning'
          ? 'rounded-xl border border-amber-200/80 bg-amber-50/90 px-5 py-4 text-ink'
          : 'rounded-xl border border-electric-500/25 bg-electric-500/[0.06] px-5 py-4 text-ink'
      }
    >
      <h3 className="font-heading text-base font-semibold text-brand-950">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-ink-muted">{children}</div>
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function DefList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function SubHeading({ children }: { children: string }) {
  return <h3 className="font-heading text-lg text-brand-950">{children}</h3>
}

function PolicyTable({
  headers,
  rows,
}: {
  headers: readonly string[]
  rows: readonly (readonly string[])[]
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface-0 shadow-sm">
      <table className="min-w-[640px] w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-surface-50">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-semibold text-brand-950 first:rounded-tl-xl last:rounded-tr-xl"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line last:border-0 align-top">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-ink-muted">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CardGrid({
  items,
}: {
  items: readonly { title: string; description: string }[]
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-line bg-surface-50 p-5 shadow-sm"
        >
          <h4 className="font-heading text-base text-brand-950">{item.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  )
}

function ProcessorGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {subProcessors.map((p) => (
        <div
          key={p.name}
          className="rounded-xl border border-line bg-surface-50 p-5"
        >
          <p className="font-semibold text-brand-950">{p.name}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-electric-600">
            {p.role}
          </p>
          <p className="mt-2 text-sm text-ink-muted">{p.detail}</p>
        </div>
      ))}
    </div>
  )
}

export function PrivacyPolicyDocument() {
  return (
    <div className="space-y-14">
      <SectionShell
        id="section-1"
        label="SECTION 01 / INTRODUCTION & SCOPE"
        title="1. Executive Overview & Scope"
      >
        <p>
          This Privacy Policy (“Policy”) sets forth the principles, practices, and protocols
          governing how Zeldapro Consultancy Private Limited (referred to as “Zeldapro”, “the
          Company”, “we”, “us”, or “our”) collects, utilizes, processes, protects, stores,
          transfers, and purges personal and sensitive health data.
        </p>
        <p>
          This Policy covers our corporate website (zeldapro.com), our proprietary digital health
          product Carevie (accessible at carevie.in), its iOS and Android mobile applications,
          backend APIs, client portals, and all associated digital interactions.
        </p>
        <p>
          This Policy is enacted in strict compliance with the Digital Personal Data Protection
          Act, 2023 (“DPDP Act”), the Information Technology Act, 2000, the Information
          Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or
          Information) Rules, 2011 (“SPDI Rules”), the Information Technology (Intermediary
          Guidelines and Digital Media Ethics Code) Rules, 2021, and the Apple App Store Review
          Guidelines (specifically Guideline 5.1 on Privacy and Data Collection).
        </p>
        <Callout title="Our Core Privacy Commitment">
          We believe that health records belong exclusively to the patient. We do not sell user
          data to brokers, pharmaceutical marketers, advertising networks, or insurance
          underwriters. All data stored within Carevie is encrypted, access-restricted, and
          completely within your control.
        </Callout>
      </SectionShell>

      <SectionShell
        id="section-2"
        label="SECTION 02 / LEGAL ENTITY"
        title="2. Corporate Identity & Data Fiduciary"
      >
        <p>
          For the purposes of the DPDP Act and international data privacy regulations, the legal
          entity responsible for determining the purposes and means of personal data processing
          (“Data Fiduciary”) is:
        </p>
        <ul className="space-y-1 rounded-xl border border-line bg-surface-50 p-5 text-ink">
          <li>
            <strong className="text-brand-950">Legal Name:</strong> Zeldapro Consultancy Private
            Limited
          </li>
          <li>
            <strong className="text-brand-950">Corporate Type:</strong> Private Limited Company
            incorporated under the Companies Act, 2013 (India)
          </li>
          <li>
            <strong className="text-brand-950">Registered Office:</strong> {registeredOffice}
          </li>
          <li>
            <strong className="text-brand-950">Corporate Email:</strong>{' '}
            <a
              href="mailto:support@zeldapro.com"
              className="font-medium text-electric-600 underline decoration-electric-500/40 underline-offset-2"
            >
              support@zeldapro.com
            </a>
          </li>
          <li>
            <strong className="text-brand-950">Jurisdiction:</strong> Mumbai, Maharashtra, India
          </li>
        </ul>
        <p>
          When you use our services or the Carevie platform, you act as the “Data Principal”
          endowed with non-negotiable statutory privacy rights over your personal and sensitive
          health information.
        </p>
      </SectionShell>

      <SectionShell
        id="section-3"
        label="SECTION 03 / PRODUCT OVERVIEW"
        title="3. Carevie Healthcare Product Details"
      >
        <p>
          Carevie is a proprietary personal health records (PHR) and medical information
          management platform developed, owned, maintained, and operated by Zeldapro Consultancy
          Private Limited.
        </p>
        <p>The Carevie platform allows users to:</p>
        <BulletList
          items={[
            'Digitally Vault Medical Documents: Securely upload, categorize, and organize diagnostic laboratory reports, doctor prescriptions, medical bills, and discharge summaries.',
            'Manage Medication Logs: Track ongoing medication dosages, treatment plans, and appointment schedules.',
            'Form a Family CareCircle: Securely share selected health records with trusted family members, legal guardians, or emergency caregivers.',
            'Generate Temporary Clinical Share Links: Create time-limited, tokenized access links for treating physicians and clinical staff without requiring them to download the app.',
            'Emergency Health Card: Maintain voluntary blood group, allergy, and critical medical condition notes accessible during medical emergencies.',
            'AI Health Insights: Receive synthesized explanations of complex medical jargon extracted from uploaded test documents.',
          ]}
        />
        <Callout title="Crucial Medical Disclaimer" tone="warning">
          Carevie and Zeldapro Consultancy Private Limited are not licensed healthcare providers,
          medical clinics, pathology laboratories, or telemedicine practitioners. Carevie does not
          render clinical diagnoses, medical advice, drug prescriptions, or emergency triage
          services. All content, document summaries, and AI interpretations are provided solely for
          informational and personal organizational convenience. Always consult a licensed physician
          or registered medical specialist for health decisions.
        </Callout>
      </SectionShell>

      <SectionShell
        id="section-4"
        label="SECTION 04 / LEGAL DEFINITIONS"
        title="4. Key Legal & Technical Definitions"
      >
        <DefList
          items={[
            '“Personal Data”: Any data about an individual who is identifiable by or in relation to such data.',
            '“Sensitive Personal Data or Information” (“SPDI”): Personal data comprising medical history, lab reports, physiological records, health documents, biometric authentication tokens, and related records covered under Rule 3 of the SPDI Rules and the DPDP Act.',
            '“Data Principal”: The natural person to whom the personal or health data relates (you, the user).',
            '“Data Fiduciary”: Zeldapro Consultancy Private Limited, which determines the purpose and means of processing personal data.',
            '“CareCircle”: The feature within Carevie permitting users to grant granular, revocable access to designated records to family members or caregivers.',
            '“Child Profile”: A sub-profile created and supervised by a registered parent or lawful guardian for a minor below 18 years of age.',
            '“Processing”: Any wholly or partly automated operation or set of operations performed on personal data, including collection, recording, organization, structuring, storage, adaptation, retrieval, consultation, transmission, dissemination, erasure, or destruction.',
          ]}
        />
      </SectionShell>

      <SectionShell
        id="section-5"
        label="SECTION 05 / DATA CATEGORIES"
        title="5. Information We Collect"
      >
        <p>
          We collect personal and technical information strictly to provide, authenticate, and
          secure our services. The categories of data collected include:
        </p>
        <SubHeading>5.1 Identity & Authentication Data</SubHeading>
        <BulletList
          items={[
            'Mobile Phone Number: Used as your primary account identifier and for OTP (One-Time Password) cryptographic verification.',
            'Full Legal Name: To personalize your health vault and match uploaded medical reports.',
            'Date of Birth & Age: Required to compute age-appropriate health metrics and verify adult user consent status.',
            'Gender: Optionally provided for clinical calibration of normal laboratory reference ranges.',
            'Email Address: Optional or provided during support/grievance inquiries and transaction confirmations.',
            'Profile Photo: Optional image voluntarily uploaded to assist in CareCircle identification.',
            'Emergency Contacts: Phone numbers and names of relatives or caregivers voluntarily designated by you.',
          ]}
        />
        <SubHeading>5.2 Health & Medical Vault Data (Sensitive Personal Data - SPDI)</SubHeading>
        <BulletList
          items={[
            'Diagnostic & Lab Test Reports: Blood tests, lipid profiles, imaging reports, scans, and biopsies uploaded as PDFs or photographs.',
            'Prescriptions & Invoices: Doctor treatment slips, handwritten or printed prescriptions, and hospital billing receipts.',
            'Declared Blood Group: Stored along with voluntary blood report verification documentation.',
            'Medication Logs: Drug names, schedules, dosages, and treatment durations entered or extracted from prescriptions.',
            'Health Attributes: Voluntary entries regarding allergies, chronic conditions (e.g. hypertension, diabetes), and medical history.',
          ]}
        />
        <SubHeading>5.3 Technical, Device & Audit Data</SubHeading>
        <BulletList
          items={[
            'Device Telemetry: Device model, operating system version (iOS / Android), screen resolution, and language settings.',
            'Push Notification Token: Apple APNs or Google FCM device tokens used strictly to deliver transactional updates.',
            'IP Address & Network Logs: Recorded during logins and API calls solely for fraud prevention, rate-limiting, and security defense.',
            'Audit Trail: Timestamps of file uploads, CareCircle permission changes, and temporary share link creations.',
          ]}
        />
      </SectionShell>

      <SectionShell
        id="section-6"
        label="SECTION 06 / APPLE APP STORE & MOBILE COMPLIANCE"
        title="6. Apple iOS & Mobile Device Permissions"
      >
        <p>
          To satisfy the strict standards of Apple App Store Review Guideline 5.1 and equivalent
          Android specifications, our mobile applications request only the bare minimum device
          capabilities necessary to execute core user-requested actions:
        </p>
        <PolicyTable
          headers={iosPermissionsTable.headers}
          rows={iosPermissionsTable.rows}
        />
        <Callout title="No Apple IDFA / Tracking Transparency (ATT) Tracking">
          Carevie does not collect Apple’s Identifier for Advertisers (IDFA), does not engage in
          third-party ad tracking, does not profile users across external apps, and does not sell
          data to data brokers. Consequently, no App Tracking Transparency (ATT) cross-app tracking
          authorization is required because tracking does not occur.
        </Callout>
      </SectionShell>

      <SectionShell
        id="section-7"
        label="SECTION 07 / COLLECTION METHODS"
        title="7. How We Collect Your Data"
      >
        <DefList
          items={[
            'Direct User Input: When you register with your phone number, fill in your profile, take an onboarding survey, or upload health records.',
            'Camera & File Uploads: When you use in-app camera or document picker tools to submit medical tests, scans, or prescriptions.',
            'Cryptographic OTP Authentication: When you request and verify a 6-digit SMS code delivered via our telecommunications provider (2Factor).',
            'Delegated Family Uploads: When an authorized CareCircle family member or parent uploads records to a shared profile.',
            'Automated System Logging: Standard web server logs capturing IP addresses, browser user-agents, and API response latencies to ensure platform uptime and security defense.',
          ]}
        />
      </SectionShell>

      <SectionShell
        id="section-8"
        label="SECTION 08 / LAWFUL BASIS & PURPOSES"
        title="8. Lawful Basis & Purposes of Processing"
      >
        <p>
          Under the DPDP Act (Sections 4, 5, and 6) and the SPDI Rules, we process data only under
          legally recognized grounds:
        </p>
        <BulletList
          items={[
            'Explicit, Informed Consent: For all Sensitive Personal Data (health documents, lab tests, prescriptions). Consent is requested prior to upload and can be withdrawn at any time.',
            'Contractual Necessity: To deliver the Carevie services requested by you under our Terms of Service (e.g. authenticating your login, organizing your vault).',
            'Compliance with Legal Obligations: To adhere to statutory orders, tax regulations, and lawful investigative demands from judicial or regulatory authorities.',
            'Legitimate Operational Uses: Mitigating cyber security attacks, enforcing API rate-limits, detecting fraudulent multi-account generation, and investigating system anomalies.',
          ]}
        />
        <p className="font-semibold text-brand-950">
          PROHIBITED USES: We strictly forbid the use of personal or medical data for targeted
          behavioral advertising, automated credit risk scoring, health insurance denial, or
          surveillance.
        </p>
      </SectionShell>

      <SectionShell
        id="section-9"
        label="SECTION 09 / ARTIFICIAL INTELLIGENCE & LLM SERVICES"
        title="9. AI Processing & Third-Party LLM Services"
      >
        <p>
          Carevie integrates advanced Artificial Intelligence (AI) and Large Language Model (LLM)
          features to help users decipher complex medical reports and automate medicine schedules:
        </p>
        <Callout title="OpenAI API Integration">
          Employed to generate plain-language summaries of complex laboratory test values, defining
          medical terms and highlighting flagged reference ranges.
        </Callout>
        <Callout title="Google Gemini API Integration">
          Employed for optical character recognition (OCR) parsing of doctor handwriting, extracting
          medication dosages, frequency, and duration to auto-populate your prescription log.
        </Callout>
        <Callout title="Zero Model Training on Your Health Records">
          Data sent to OpenAI and Google Gemini is transmitted exclusively through enterprise
          commercial API contracts over encrypted TLS connections. Under these enterprise API
          agreements, your personal medical data is NOT retained by these providers to train public
          models. Processing is stateless and strictly transient.
        </Callout>
      </SectionShell>

      <SectionShell
        id="section-10"
        label="SECTION 10 / DATA DISCLOSURES & SUB-PROCESSORS"
        title="10. Data Sharing, Disclosures & Sub-Processors"
      >
        <p>
          We never sell, rent, or commercialize your personal data. To operate our infrastructure
          securely, we partner with industry-leading sub-processors under strict Data Processing
          Agreements (DPAs):
        </p>
        <ProcessorGrid />
      </SectionShell>

      <SectionShell
        id="section-11"
        label="SECTION 11 / USER-CONTROLLED SHARING"
        title="11. CareCircle & Secure Share Links"
      >
        <p>
          Carevie incorporates peer-to-peer sharing tools designed to keep patients in total command
          of who inspects their health data:
        </p>
        <Callout title="CareCircle Family Sharing">
          Grant granular read permissions to chosen family members or caregivers. You can revoke
          CareCircle members instantly with one click from within your account settings. Full
          revocation takes immediate effect across active sessions.
        </Callout>
        <Callout title="Tokenized Clinical Share Links">
          Generate temporary cryptographic URLs to share specific test results with doctors or
          hospital registries. Each link features configurable expiration times and can be revoked
          at any moment. Links become immediately invalid once revoked or expired.
        </Callout>
      </SectionShell>

      <SectionShell
        id="section-12"
        label="SECTION 12 / MINORS & CHILD DATA"
        title="12. Child Profiles & Protection of Minors"
      >
        <p>
          Carevie is strictly designed for operation by individuals who are at least 18 years of age.
          We do not knowingly permit minors to create independent accounts.
        </p>
        <p>
          Under Section 9 of the DPDP Act 2023, a registered adult parent or lawful legal guardian may
          create and manage a Child Profile solely to organize the minor child’s pediatric health
          documents:
        </p>
        <BulletList
          items={[
            'The parent or legal guardian represents and confirms full legal authority to grant consent for processing the child’s health information.',
            'We do not engage in behavioral monitoring, tracking, or targeted advertising directed at child profiles.',
            'We do not process any child data in any manner detrimental to the child’s physical or mental well-being.',
            'Parents can delete the child profile and all associated medical files permanently at any time.',
          ]}
        />
      </SectionShell>

      <SectionShell
        id="section-13"
        label="SECTION 13 / DATA TRANSFERS & HOSTING"
        title="13. Cross-Border Data Storage & Transfers"
      >
        <p>
          Our primary database infrastructure and medical document stores are hosted with Supabase and
          DigitalOcean, with primary servers situated to serve our Indian and global user base. When
          you utilize on-demand AI processing features (OpenAI / Google Gemini), document text is
          processed via encrypted cross-border API endpoints located in the United States or other
          jurisdictions adhering to rigorous international security protocols.
        </p>
        <p>
          Such transfers are permitted under Section 16 of the DPDP Act, and we ensure that all overseas
          sub-processors are contractually bound to provide levels of data protection at least equal to
          Indian statutory standards.
        </p>
      </SectionShell>

      <SectionShell
        id="section-14"
        label="SECTION 14 / CYBER SECURITY & SAFEGUARDS"
        title="14. Security Safeguards & Encryption"
      >
        <p>
          We implement comprehensive technical and organizational security measures meeting or exceeding
          ISO/IEC 27001 recommendations and Rule 8 of the SPDI Rules:
        </p>
        <CardGrid items={securitySafeguards} />
      </SectionShell>

      <SectionShell
        id="section-15"
        label="SECTION 15 / RETENTION & APPLE 5.1.1(v) ACCOUNT DELETION"
        title="15. Data Retention & Account Deletion"
      >
        <p>
          In strict adherence to Apple App Store Review Guideline 5.1.1(v) and Section 12 of the DPDP
          Act 2023, every user has the absolute right to terminate their account and request permanent
          deletion of all stored health files and credentials.
        </p>
        <SubHeading>How to Initiate Self-Service Account Deletion</SubHeading>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Within the iOS or Android App: Navigate to Settings → Account Settings → Delete Account.
          </li>
          <li>
            Confirmation: Confirm your intent. Your account enters an immediate deactivation state.
          </li>
          <li>
            Via Email Request: Alternatively, submit a deletion request from your registered phone
            number or email to{' '}
            <a href="mailto:support@carevie.in" className="text-electric-600 underline">
              support@carevie.in
            </a>{' '}
            or{' '}
            <a href="mailto:support@zeldapro.com" className="text-electric-600 underline">
              support@zeldapro.com
            </a>
            .
          </li>
        </ol>
        <SubHeading>Deletion Workflow & 30-Day Security Recovery Grace Period</SubHeading>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong className="text-brand-950">Immediate Deactivation (Day 0 to 30):</strong> Upon
            requesting deletion, your account is hidden immediately. Active CareCircle links and share
            tokens are revoked. All push notifications and automated processing are ceased. If you change
            your mind, you can restore your account within 30 days by authenticating via your registered
            phone number.
          </li>
          <li>
            <strong className="text-brand-950">Permanent Cryptographic Purge (Day 31):</strong> After 30
            days, all personal data, medical records, diagnostic scans, prescriptions, medications, and
            child profiles are permanently scrubbed from our active database systems.
          </li>
          <li>
            <strong className="text-brand-950">Minimal Residual Audit Data:</strong> A strictly hashed and
            minimal record (such as account creation/deletion timestamps and fraud-prevention flags) is
            retained for statutory compliance, anti-fraud prevention, and judicial defense under applicable
            laws.
          </li>
        </ol>
      </SectionShell>

      <SectionShell
        id="section-16"
        label="SECTION 16 / YOUR STATUTORY RIGHTS"
        title="16. Data Principal Rights (DPDP Act & Apple)"
      >
        <p>
          As a Data Principal, you are entitled to exercise the following legal rights without
          hindrance or fee:
        </p>
        <CardGrid items={dataPrincipalRights} />
        <p>
          To exercise any statutory right, simply send an email request to{' '}
          <a href="mailto:privacy@carevie.in" className="text-electric-600 underline">
            privacy@carevie.in
          </a>{' '}
          or{' '}
          <a href="mailto:support@zeldapro.com" className="text-electric-600 underline">
            support@zeldapro.com
          </a>
          .
        </p>
      </SectionShell>

      <SectionShell
        id="section-17"
        label="SECTION 17 / COOKIES & TELEMETRY"
        title="17. Cookies & Tracking Technologies"
      >
        <p>
          Our websites use essential first-party session cookies and security cookies to maintain secure
          user sessions, prevent Cross-Site Request Forgery (CSRF), and remember interface preferences. We
          do not use third-party behavioral retargeting or cross-site tracking cookies.
        </p>
        <p>
          You can manage or disable cookies via your browser settings; however, disabling essential session
          cookies may impair your ability to authenticate into the platform.
        </p>
      </SectionShell>

      <SectionShell
        id="section-18"
        label="SECTION 18 / STATUTORY GRIEVANCE DESK"
        title="18. Grievance Redressal Mechanism"
      >
        <p>
          In strict accordance with the DPDP Act 2023, the Information Technology (Intermediary Guidelines
          and Digital Media Ethics Code) Rules, 2021, and the SPDI Rules, Zeldapro Consultancy Private
          Limited has established a dedicated Grievance Redressal Office:
        </p>
        <div className="rounded-xl border border-line bg-surface-50 p-5 text-ink">
          <SubHeading>Statutory Grievance Officer Details</SubHeading>
          <ul className="mt-3 space-y-1 text-sm text-ink-muted">
            <li>
              <strong className="text-brand-950">Officer / Desk:</strong> Designated Grievance Officer,
              Zeldapro Consultancy Private Limited
            </li>
            <li>
              <strong className="text-brand-950">Company:</strong> Zeldapro Consultancy Private Limited
            </li>
            <li>
              <strong className="text-brand-950">Direct Email:</strong>{' '}
              <a href="mailto:grievance@zeldapro.com" className="text-electric-600 underline">
                grievance@zeldapro.com
              </a>
            </li>
            <li>
              <strong className="text-brand-950">Physical Address:</strong> {registeredOffice}
            </li>
            <li>
              <strong className="text-brand-950">Statutory Response Timelines:</strong> Acknowledgment
              within forty-eight (48) hours; complete resolution within fifteen (15) working days from date of
              receipt.
            </li>
          </ul>
        </div>
      </SectionShell>

      <SectionShell
        id="section-19"
        label="SECTION 19 / AMENDMENTS & REVISIONS"
        title="19. Updates to this Privacy Policy"
      >
        <p>
          We reserve the right to amend this Policy periodically to reflect technical advancements, changes in
          our mobile applications, or regulatory notifications issued by the Data Protection Board of India or
          Apple App Store review boards.
        </p>
        <p>
          Any material revisions will be accompanied by prominent notifications within the Carevie application,
          web banners, or registered email notifications. The “Last Updated” timestamp at the top of this
          document indicates the effective date of the current revision.
        </p>
      </SectionShell>

      <SectionShell
        id="section-20"
        label="SECTION 20 / CONTACT INFORMATION"
        title="20. Official Corporate Contact Details"
      >
        <p>
          For questions regarding this Privacy Policy, our Apple Developer Organization verification, or our
          Carevie health technology infrastructure, please connect with us:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-electric-600">
              Corporate Headquarters
            </p>
            <p className="mt-2 font-heading text-brand-950">
              Zeldapro Consultancy Private Limited
            </p>
            <p className="mt-2 text-sm text-ink-muted">{registeredOffice}</p>
            <a
              href="mailto:support@zeldapro.com"
              className="mt-3 inline-block text-sm font-medium text-electric-600 underline"
            >
              support@zeldapro.com
            </a>
          </div>
          <div className="rounded-xl border border-line bg-surface-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-electric-600">
              Product & User Support
            </p>
            <p className="mt-2 font-heading text-brand-950">Carevie Support Desk</p>
            <p className="mt-2 text-sm text-ink-muted">
              General, technical, and privacy support for Carevie users.
            </p>
            <div className="mt-3 flex flex-col gap-1 text-sm">
              <a href="mailto:support@carevie.in" className="font-medium text-electric-600 underline">
                support@carevie.in
              </a>
              <a href="mailto:privacy@carevie.in" className="font-medium text-electric-600 underline">
                privacy@carevie.in
              </a>
            </div>
          </div>
        </div>
      </SectionShell>
    </div>
  )
}