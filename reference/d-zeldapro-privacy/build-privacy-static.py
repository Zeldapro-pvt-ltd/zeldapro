# One-off generator: reads reference copies in this folder only; writes privacy.html to site root.
import html
import json
import re
from pathlib import Path

SITE = Path(__file__).resolve().parents[2]
REF = Path(__file__).resolve().parent

def esc(s: str) -> str:
    return html.escape(s, quote=True)

def parse_ts_string_array(block: str) -> list[str]:
    return re.findall(r"'((?:\\'|[^'])*)'", block)

def load_policy_data() -> dict:
    text = (REF / "privacyPolicy.ts").read_text(encoding="utf-8")
    office = re.search(r"export const registeredOffice\s*=\s*'([^']*)'", text)
    meta_block = re.search(r"export const privacyPolicyMeta\s*=\s*\{([^}]+)\}", text, re.S)
    meta = {}
    if meta_block:
        for key in ("title", "subtitle", "legalEntity", "productCovered", "lastUpdated", "jurisdiction"):
            m = re.search(rf"{key}:\s*'([^']*)'", meta_block.group(1))
            if m:
                meta[key] = m.group(1)
    highlights = []
    for m in re.finditer(
        r"title:\s*'([^']*)',\s*body:\s*'([^']*)'", text
    ):
        highlights.append({"title": m.group(1), "body": m.group(2)})
    section_index = []
    for m in re.finditer(
        r"\{\s*num:\s*(\d+),\s*id:\s*'([^']+)',\s*title:\s*'([^']+)'\s*\}",
        text,
    ):
        section_index.append({"num": int(m.group(1)), "id": m.group(2), "title": m.group(3)})
    ios_headers = parse_ts_string_array(
        re.search(r"headers:\s*\[([^\]]+)\]", text).group(1)
    )
    ios_rows = []
    rows_block = re.search(r"rows:\s*\[([\s\S]*?)\],\s*\} as const", text)
    if rows_block:
        for row in re.findall(r"\[([\s\S]*?)\]", rows_block.group(1)):
            ios_rows.append(parse_ts_string_array(row))
    sub_processors = []
    for block in re.finditer(
        r"\{\s*name:\s*'([^']*)',\s*role:\s*'([^']*)',\s*detail:\s*'([^']*)'\s*\}",
        text,
    ):
        sub_processors.append(
            {"name": block.group(1), "role": block.group(2), "detail": block.group(3)}
        )
    rights_block = re.search(
        r"export const dataPrincipalRights\s*=\s*\[([\s\S]*?)\] as const",
        text,
    )
    rights = []
    if rights_block:
        for block in re.finditer(
            r"title:\s*'([^']*)',\s*description:\s*\n\s*'([^']*)'",
            rights_block.group(1),
        ):
            rights.append({"title": block.group(1), "description": block.group(2)})
    safeguards = []
    for block in re.finditer(
        r"title:\s*'([^']*)',\s*description:\s*\n\s*'([^']*)'",
        text[text.find("export const securitySafeguards") :],
    ):
        safeguards.append({"title": block.group(1), "description": block.group(2)})
    return {
        "registeredOffice": office.group(1) if office else "",
        "meta": meta,
        "highlights": highlights[:4],
        "sectionIndex": section_index,
        "iosTable": {"headers": ios_headers, "rows": ios_rows},
        "subProcessors": sub_processors,
        "dataPrincipalRights": rights[:6],
        "securitySafeguards": safeguards[:4],
    }


def bullets(items: list[str]) -> str:
    return "<ul class=\"pp-list pp-list--disc\">" + "".join(
        f"<li>{esc(i)}</li>" for i in items
    ) + "</ul>"


def deflist(items: list[str]) -> str:
    return "<ul class=\"pp-list\">" + "".join(f"<li>{esc(i)}</li>" for i in items) + "</ul>"


def callout(title: str, body: str, warning: bool = False) -> str:
    tone = " pp-callout--warning" if warning else ""
    return f'<div class="pp-callout{tone}"><h3 class="pp-callout__title">{esc(title)}</h3><div class="pp-callout__body">{body}</div></div>'


def table(headers: list[str], rows: list[list[str]]) -> str:
    th = "".join(f"<th>{esc(h)}</th>" for h in headers)
    body = ""
    for row in rows:
        body += "<tr>" + "".join(f"<td>{esc(c)}</td>" for c in row) + "</tr>"
    return f'<div class="pp-table-wrap"><table class="pp-table"><thead><tr>{th}</tr></thead><tbody>{body}</tbody></table></div>'


def card_grid(items: list[dict]) -> str:
    cards = ""
    for item in items:
        cards += (
            f'<article class="pp-card"><h4 class="pp-card__title">{esc(item["title"])}</h4>'
            f'<p class="pp-card__text">{esc(item["description"])}</p></article>'
        )
    return f'<div class="pp-card-grid">{cards}</div>'


def processor_grid(items: list[dict]) -> str:
    cards = ""
    for p in items:
        cards += (
            f'<article class="pp-processor"><p class="pp-processor__name">{esc(p["name"])}</p>'
            f'<p class="pp-processor__role">{esc(p["role"])}</p>'
            f'<p class="pp-processor__detail">{esc(p["detail"])}</p></article>'
        )
    return f'<div class="pp-processor-grid">{cards}</div>'


def section(id_: str, label: str, title: str, inner: str) -> str:
    return (
        f'<article id="{esc(id_)}" class="pp-section">'
        f'<p class="pp-section__label">{esc(label)}</p>'
        f'<h2 class="pp-section__title">{esc(title)}</h2>'
        f'<div class="pp-section__body">{inner}</div></article>'
    )


def build_document(data: dict) -> str:
    office = data["registeredOffice"]
    ios = data["iosTable"]
    sp = data["subProcessors"]
    rights = data["dataPrincipalRights"]
    sec = data["securitySafeguards"]

    s1 = section(
        "section-1",
        "SECTION 01 / INTRODUCTION & SCOPE",
        "1. Executive Overview & Scope",
        "<p>This Privacy Policy (“Policy”) sets forth the principles, practices, and protocols governing how Zeldapro Consultancy Private Limited (referred to as “Zeldapro”, “the Company”, “we”, “us”, or “our”) collects, utilizes, processes, protects, stores, transfers, and purges personal and sensitive health data.</p>"
        "<p>This Policy covers our corporate website (zeldapro.com), our proprietary digital health product Carevie (accessible at carevie.in), its iOS and Android mobile applications, backend APIs, client portals, and all associated digital interactions.</p>"
        "<p>This Policy is enacted in strict compliance with the Digital Personal Data Protection Act, 2023 (“DPDP Act”), the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (“SPDI Rules”), the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, and the Apple App Store Review Guidelines (specifically Guideline 5.1 on Privacy and Data Collection).</p>"
        + callout(
            "Our Core Privacy Commitment",
            "<p>We believe that health records belong exclusively to the patient. We do not sell user data to brokers, pharmaceutical marketers, advertising networks, or insurance underwriters. All data stored within Carevie is encrypted, access-restricted, and completely within your control.</p>",
        ),
    )

    s2 = section(
        "section-2",
        "SECTION 02 / LEGAL ENTITY",
        "2. Corporate Identity & Data Fiduciary",
        "<p>For the purposes of the DPDP Act and international data privacy regulations, the legal entity responsible for determining the purposes and means of personal data processing (“Data Fiduciary”) is:</p>"
        f'<ul class="pp-list pp-list--boxed"><li><strong>Legal Name:</strong> Zeldapro Consultancy Private Limited</li>'
        "<li><strong>Corporate Type:</strong> Private Limited Company incorporated under the Companies Act, 2013 (India)</li>"
        f"<li><strong>Registered Office:</strong> {esc(office)}</li>"
        '<li><strong>Corporate Email:</strong> <a href="mailto:support@zeldapro.com">support@zeldapro.com</a></li>'
        "<li><strong>Jurisdiction:</strong> Mumbai, Maharashtra, India</li></ul>"
        "<p>When you use our services or the Carevie platform, you act as the “Data Principal” endowed with non-negotiable statutory privacy rights over your personal and sensitive health information.</p>",
    )

    carevie_bullets = [
        "Digitally Vault Medical Documents: Securely upload, categorize, and organize diagnostic laboratory reports, doctor prescriptions, medical bills, and discharge summaries.",
        "Manage Medication Logs: Track ongoing medication dosages, treatment plans, and appointment schedules.",
        "Form a Family CareCircle: Securely share selected health records with trusted family members, legal guardians, or emergency caregivers.",
        "Generate Temporary Clinical Share Links: Create time-limited, tokenized access links for treating physicians and clinical staff without requiring them to download the app.",
        "Emergency Health Card: Maintain voluntary blood group, allergy, and critical medical condition notes accessible during medical emergencies.",
        "AI Health Insights: Receive synthesized explanations of complex medical jargon extracted from uploaded test documents.",
    ]
    s3 = section(
        "section-3",
        "SECTION 03 / PRODUCT OVERVIEW",
        "3. Carevie Healthcare Product Details",
        "<p>Carevie is a proprietary personal health records (PHR) and medical information management platform developed, owned, maintained, and operated by Zeldapro Consultancy Private Limited.</p>"
        "<p>The Carevie platform allows users to:</p>"
        + bullets(carevie_bullets)
        + callout(
            "Crucial Medical Disclaimer",
            "<p>Carevie and Zeldapro Consultancy Private Limited are not licensed healthcare providers, medical clinics, pathology laboratories, or telemedicine practitioners. Carevie does not render clinical diagnoses, medical advice, drug prescriptions, or emergency triage services. All content, document summaries, and AI interpretations are provided solely for informational and personal organizational convenience. Always consult a licensed physician or registered medical specialist for health decisions.</p>",
            warning=True,
        ),
    )

    defs = [
        "“Personal Data”: Any data about an individual who is identifiable by or in relation to such data.",
        "“Sensitive Personal Data or Information” (“SPDI”): Personal data comprising medical history, lab reports, physiological records, health documents, biometric authentication tokens, and related records covered under Rule 3 of the SPDI Rules and the DPDP Act.",
        "“Data Principal”: The natural person to whom the personal or health data relates (you, the user).",
        "“Data Fiduciary”: Zeldapro Consultancy Private Limited, which determines the purpose and means of processing personal data.",
        "“CareCircle”: The feature within Carevie permitting users to grant granular, revocable access to designated records to family members or caregivers.",
        "“Child Profile”: A sub-profile created and supervised by a registered parent or lawful guardian for a minor below 18 years of age.",
        "“Processing”: Any wholly or partly automated operation or set of operations performed on personal data, including collection, recording, organization, structuring, storage, adaptation, retrieval, consultation, transmission, dissemination, erasure, or destruction.",
    ]
    s4 = section(
        "section-4",
        "SECTION 04 / LEGAL DEFINITIONS",
        "4. Key Legal & Technical Definitions",
        deflist(defs),
    )

    identity = [
        "Mobile Phone Number: Used as your primary account identifier and for OTP (One-Time Password) cryptographic verification.",
        "Full Legal Name: To personalize your health vault and match uploaded medical reports.",
        "Date of Birth & Age: Required to compute age-appropriate health metrics and verify adult user consent status.",
        "Gender: Optionally provided for clinical calibration of normal laboratory reference ranges.",
        "Email Address: Optional or provided during support/grievance inquiries and transaction confirmations.",
        "Profile Photo: Optional image voluntarily uploaded to assist in CareCircle identification.",
        "Emergency Contacts: Phone numbers and names of relatives or caregivers voluntarily designated by you.",
    ]
    health = [
        "Diagnostic & Lab Test Reports: Blood tests, lipid profiles, imaging reports, scans, and biopsies uploaded as PDFs or photographs.",
        "Prescriptions & Invoices: Doctor treatment slips, handwritten or printed prescriptions, and hospital billing receipts.",
        "Declared Blood Group: Stored along with voluntary blood report verification documentation.",
        "Medication Logs: Drug names, schedules, dosages, and treatment durations entered or extracted from prescriptions.",
        "Health Attributes: Voluntary entries regarding allergies, chronic conditions (e.g. hypertension, diabetes), and medical history.",
    ]
    technical = [
        "Device Telemetry: Device model, operating system version (iOS / Android), screen resolution, and language settings.",
        "Push Notification Token: Apple APNs or Google FCM device tokens used strictly to deliver transactional updates.",
        "IP Address & Network Logs: Recorded during logins and API calls solely for fraud prevention, rate-limiting, and security defense.",
        "Audit Trail: Timestamps of file uploads, CareCircle permission changes, and temporary share link creations.",
    ]
    s5 = section(
        "section-5",
        "SECTION 05 / DATA CATEGORIES",
        "5. Information We Collect",
        "<p>We collect personal and technical information strictly to provide, authenticate, and secure our services. The categories of data collected include:</p>"
        "<h3 class=\"pp-subheading\">5.1 Identity & Authentication Data</h3>"
        + bullets(identity)
        + "<h3 class=\"pp-subheading\">5.2 Health & Medical Vault Data (Sensitive Personal Data - SPDI)</h3>"
        + bullets(health)
        + "<h3 class=\"pp-subheading\">5.3 Technical, Device & Audit Data</h3>"
        + bullets(technical),
    )

    s6 = section(
        "section-6",
        "SECTION 06 / APPLE APP STORE & MOBILE COMPLIANCE",
        "6. Apple iOS & Mobile Device Permissions",
        "<p>To satisfy the strict standards of Apple App Store Review Guideline 5.1 and equivalent Android specifications, our mobile applications request only the bare minimum device capabilities necessary to execute core user-requested actions:</p>"
        + table(ios["headers"], ios["rows"])
        + callout(
            "No Apple IDFA / Tracking Transparency (ATT) Tracking",
            "<p>Carevie does not collect Apple’s Identifier for Advertisers (IDFA), does not engage in third-party ad tracking, does not profile users across external apps, and does not sell data to data brokers. Consequently, no App Tracking Transparency (ATT) cross-app tracking authorization is required because tracking does not occur.</p>",
        ),
    )

    collect = [
        "Direct User Input: When you register with your phone number, fill in your profile, take an onboarding survey, or upload health records.",
        "Camera & File Uploads: When you use in-app camera or document picker tools to submit medical tests, scans, or prescriptions.",
        "Cryptographic OTP Authentication: When you request and verify a 6-digit SMS code delivered via our telecommunications provider (2Factor).",
        "Delegated Family Uploads: When an authorized CareCircle family member or parent uploads records to a shared profile.",
        "Automated System Logging: Standard web server logs capturing IP addresses, browser user-agents, and API response latencies to ensure platform uptime and security defense.",
    ]
    s7 = section(
        "section-7",
        "SECTION 07 / COLLECTION METHODS",
        "7. How We Collect Your Data",
        deflist(collect),
    )

    lawful = [
        "Explicit, Informed Consent: For all Sensitive Personal Data (health documents, lab tests, prescriptions). Consent is requested prior to upload and can be withdrawn at any time.",
        "Contractual Necessity: To deliver the Carevie services requested by you under our Terms of Service (e.g. authenticating your login, organizing your vault).",
        "Compliance with Legal Obligations: To adhere to statutory orders, tax regulations, and lawful investigative demands from judicial or regulatory authorities.",
        "Legitimate Operational Uses: Mitigating cyber security attacks, enforcing API rate-limits, detecting fraudulent multi-account generation, and investigating system anomalies.",
    ]
    s8 = section(
        "section-8",
        "SECTION 08 / LAWFUL BASIS & PURPOSES",
        "8. Lawful Basis & Purposes of Processing",
        "<p>Under the DPDP Act (Sections 4, 5, and 6) and the SPDI Rules, we process data only under legally recognized grounds:</p>"
        + bullets(lawful)
        + "<p class=\"pp-emphasis\">PROHIBITED USES: We strictly forbid the use of personal or medical data for targeted behavioral advertising, automated credit risk scoring, health insurance denial, or surveillance.</p>",
    )

    s9 = section(
        "section-9",
        "SECTION 09 / ARTIFICIAL INTELLIGENCE & LLM SERVICES",
        "9. AI Processing & Third-Party LLM Services",
        "<p>Carevie integrates advanced Artificial Intelligence (AI) and Large Language Model (LLM) features to help users decipher complex medical reports and automate medicine schedules:</p>"
        + callout(
            "OpenAI API Integration",
            "<p>Employed to generate plain-language summaries of complex laboratory test values, defining medical terms and highlighting flagged reference ranges.</p>",
        )
        + callout(
            "Google Gemini API Integration",
            "<p>Employed for optical character recognition (OCR) parsing of doctor handwriting, extracting medication dosages, frequency, and duration to auto-populate your prescription log.</p>",
        )
        + callout(
            "Zero Model Training on Your Health Records",
            "<p>Data sent to OpenAI and Google Gemini is transmitted exclusively through enterprise commercial API contracts over encrypted TLS connections. Under these enterprise API agreements, your personal medical data is NOT retained by these providers to train public models. Processing is stateless and strictly transient.</p>",
        ),
    )

    s10 = section(
        "section-10",
        "SECTION 10 / DATA DISCLOSURES & SUB-PROCESSORS",
        "10. Data Sharing, Disclosures & Sub-Processors",
        "<p>We never sell, rent, or commercialize your personal data. To operate our infrastructure securely, we partner with industry-leading sub-processors under strict Data Processing Agreements (DPAs):</p>"
        + processor_grid(sp),
    )

    s11 = section(
        "section-11",
        "SECTION 11 / USER-CONTROLLED SHARING",
        "11. CareCircle & Secure Share Links",
        "<p>Carevie incorporates peer-to-peer sharing tools designed to keep patients in total command of who inspects their health data:</p>"
        + callout(
            "CareCircle Family Sharing",
            "<p>Grant granular read permissions to chosen family members or caregivers. You can revoke CareCircle members instantly with one click from within your account settings. Full revocation takes immediate effect across active sessions.</p>",
        )
        + callout(
            "Tokenized Clinical Share Links",
            "<p>Generate temporary cryptographic URLs to share specific test results with doctors or hospital registries. Each link features configurable expiration times and can be revoked at any moment. Links become immediately invalid once revoked or expired.</p>",
        ),
    )

    child = [
        "The parent or legal guardian represents and confirms full legal authority to grant consent for processing the child’s health information.",
        "We do not engage in behavioral monitoring, tracking, or targeted advertising directed at child profiles.",
        "We do not process any child data in any manner detrimental to the child’s physical or mental well-being.",
        "Parents can delete the child profile and all associated medical files permanently at any time.",
    ]
    s12 = section(
        "section-12",
        "SECTION 12 / MINORS & CHILD DATA",
        "12. Child Profiles & Protection of Minors",
        "<p>Carevie is strictly designed for operation by individuals who are at least 18 years of age. We do not knowingly permit minors to create independent accounts.</p>"
        "<p>Under Section 9 of the DPDP Act 2023, a registered adult parent or lawful legal guardian may create and manage a Child Profile solely to organize the minor child’s pediatric health documents:</p>"
        + bullets(child),
    )

    s13 = section(
        "section-13",
        "SECTION 13 / DATA TRANSFERS & HOSTING",
        "13. Cross-Border Data Storage & Transfers",
        "<p>Our primary database infrastructure and medical document stores are hosted with Supabase and DigitalOcean, with primary servers situated to serve our Indian and global user base. When you utilize on-demand AI processing features (OpenAI / Google Gemini), document text is processed via encrypted cross-border API endpoints located in the United States or other jurisdictions adhering to rigorous international security protocols.</p>"
        "<p>Such transfers are permitted under Section 16 of the DPDP Act, and we ensure that all overseas sub-processors are contractually bound to provide levels of data protection at least equal to Indian statutory standards.</p>",
    )

    s14 = section(
        "section-14",
        "SECTION 14 / CYBER SECURITY & SAFEGUARDS",
        "14. Security Safeguards & Encryption",
        "<p>We implement comprehensive technical and organizational security measures meeting or exceeding ISO/IEC 27001 recommendations and Rule 8 of the SPDI Rules:</p>"
        + card_grid(sec),
    )

    s15 = section(
        "section-15",
        "SECTION 15 / RETENTION & APPLE 5.1.1(v) ACCOUNT DELETION",
        "15. Data Retention & Account Deletion",
        "<p>In strict adherence to Apple App Store Review Guideline 5.1.1(v) and Section 12 of the DPDP Act 2023, every user has the absolute right to terminate their account and request permanent deletion of all stored health files and credentials.</p>"
        "<h3 class=\"pp-subheading\">How to Initiate Self-Service Account Deletion</h3>"
        "<ol class=\"pp-list pp-list--decimal\">"
        "<li>Within the iOS or Android App: Navigate to Settings → Account Settings → Delete Account.</li>"
        "<li>Confirmation: Confirm your intent. Your account enters an immediate deactivation state.</li>"
        "<li>Via Email Request: Alternatively, submit a deletion request from your registered phone number or email to "
        '<a href="mailto:support@carevie.in">support@carevie.in</a> or <a href="mailto:support@zeldapro.com">support@zeldapro.com</a>.</li>'
        "</ol>"
        "<h3 class=\"pp-subheading\">Deletion Workflow & 30-Day Security Recovery Grace Period</h3>"
        "<ol class=\"pp-list pp-list--decimal\">"
        "<li><strong>Immediate Deactivation (Day 0 to 30):</strong> Upon requesting deletion, your account is hidden immediately. Active CareCircle links and share tokens are revoked. All push notifications and automated processing are ceased. If you change your mind, you can restore your account within 30 days by authenticating via your registered phone number.</li>"
        "<li><strong>Permanent Cryptographic Purge (Day 31):</strong> After 30 days, all personal data, medical records, diagnostic scans, prescriptions, medications, and child profiles are permanently scrubbed from our active database systems.</li>"
        "<li><strong>Minimal Residual Audit Data:</strong> A strictly hashed and minimal record (such as account creation/deletion timestamps and fraud-prevention flags) is retained for statutory compliance, anti-fraud prevention, and judicial defense under applicable laws.</li>"
        "</ol>",
    )

    s16 = section(
        "section-16",
        "SECTION 16 / YOUR STATUTORY RIGHTS",
        "16. Data Principal Rights (DPDP Act & Apple)",
        "<p>As a Data Principal, you are entitled to exercise the following legal rights without hindrance or fee:</p>"
        + card_grid(rights)
        + "<p>To exercise any statutory right, simply send an email request to "
        '<a href="mailto:privacy@carevie.in">privacy@carevie.in</a> or <a href="mailto:support@zeldapro.com">support@zeldapro.com</a>.</p>',
    )

    s17 = section(
        "section-17",
        "SECTION 17 / COOKIES & TELEMETRY",
        "17. Cookies & Tracking Technologies",
        "<p>Our websites use essential first-party session cookies and security cookies to maintain secure user sessions, prevent Cross-Site Request Forgery (CSRF), and remember interface preferences. We do not use third-party behavioral retargeting or cross-site tracking cookies.</p>"
        "<p>You can manage or disable cookies via your browser settings; however, disabling essential session cookies may impair your ability to authenticate into the platform.</p>",
    )

    s18 = section(
        "section-18",
        "SECTION 18 / STATUTORY GRIEVANCE DESK",
        "18. Grievance Redressal Mechanism",
        "<p>In strict accordance with the DPDP Act 2023, the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, and the SPDI Rules, Zeldapro Consultancy Private Limited has established a dedicated Grievance Redressal Office:</p>"
        '<div class="pp-list pp-list--boxed"><h3 class="pp-subheading">Statutory Grievance Officer Details</h3>'
        "<ul class=\"pp-list\"><li><strong>Officer / Desk:</strong> Designated Grievance Officer, Zeldapro Consultancy Private Limited</li>"
        "<li><strong>Company:</strong> Zeldapro Consultancy Private Limited</li>"
        '<li><strong>Direct Email:</strong> <a href="mailto:grievance@zeldapro.com">grievance@zeldapro.com</a></li>'
        f"<li><strong>Physical Address:</strong> {esc(office)}</li>"
        "<li><strong>Statutory Response Timelines:</strong> Acknowledgment within forty-eight (48) hours; complete resolution within fifteen (15) working days from date of receipt.</li></ul></div>",
    )

    s19 = section(
        "section-19",
        "SECTION 19 / AMENDMENTS & REVISIONS",
        "19. Updates to this Privacy Policy",
        "<p>We reserve the right to amend this Policy periodically to reflect technical advancements, changes in our mobile applications, or regulatory notifications issued by the Data Protection Board of India or Apple App Store review boards.</p>"
        "<p>Any material revisions will be accompanied by prominent notifications within the Carevie application, web banners, or registered email notifications. The “Last Updated” timestamp at the top of this document indicates the effective date of the current revision.</p>",
    )

    s20 = section(
        "section-20",
        "SECTION 20 / CONTACT INFORMATION",
        "20. Official Corporate Contact Details",
        "<p>For questions regarding this Privacy Policy, our Apple Developer Organization verification, or our Carevie health technology infrastructure, please connect with us:</p>"
        '<div class="pp-contact-grid">'
        '<article class="pp-contact-card"><p class="pp-contact-card__label">Corporate Headquarters</p>'
        "<p class=\"pp-contact-card__title\">Zeldapro Consultancy Private Limited</p>"
        f"<p class=\"pp-contact-card__text\">{esc(office)}</p>"
        '<a href="mailto:support@zeldapro.com">support@zeldapro.com</a></article>'
        '<article class="pp-contact-card"><p class="pp-contact-card__label">Product &amp; User Support</p>'
        "<p class=\"pp-contact-card__title\">Carevie Support Desk</p>"
        "<p class=\"pp-contact-card__text\">General, technical, and privacy support for Carevie users.</p>"
        '<a href="mailto:support@carevie.in">support@carevie.in</a><br>'
        '<a href="mailto:privacy@carevie.in">privacy@carevie.in</a></article></div>',
    )

    return "\n".join([s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20])


def build_page():
    data = load_policy_data()
    meta = data["meta"]
    doc = build_document(data)
    idx_nav = ""
    for entry in data["sectionIndex"]:
        idx_nav += (
            f'<li><a href="#{esc(entry["id"])}"><span class="pp-index__num">{entry["num"]}.</span> '
            f'{esc(entry["title"])}</a></li>'
        )
    meta_cards = ""
    for label, key in (
        ("Legal entity", "legalEntity"),
        ("Product covered", "productCovered"),
        ("Last updated", "lastUpdated"),
        ("Jurisdiction", "jurisdiction"),
    ):
        meta_cards += (
            f'<article class="pp-meta-card"><p class="pp-meta-card__label">{label}</p>'
            f'<p class="pp-meta-card__value">{esc(meta.get(key, ""))}</p></article>'
        )
    highlights = ""
    for card in data["highlights"]:
        highlights += (
            f'<article class="pp-highlight"><h2 class="pp-highlight__title">{esc(card["title"])}</h2>'
            f'<p class="pp-highlight__body">{esc(card["body"])}</p></article>'
        )

    footer_connect = '<div class="footer-connect"><h4>Connect</h4><a href="contact.html">Contact Zeldapro</a><a href="management-team.html">Management Team</a><a href="privacy.html" class="pp-footer-active">Privacy Policy</a></div>'

    page = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Privacy Policy | Zeldapro</title><meta name="description" content="{esc(meta.get("subtitle", ""))}">
<meta name="theme-color" content="#081d29"><link rel="icon" href="assets/Zeldalogo-CAKomwG1.png" type="image/png"><link rel="apple-touch-icon" href="assets/Zeldalogo-CAKomwG1.png"><link rel="canonical" href="https://www.zeldapro.com/privacy.html">
<meta property="og:title" content="Privacy Policy | Zeldapro"><meta property="og:description" content="{esc(meta.get("subtitle", ""))}"><meta property="og:type" content="website">
<link rel="stylesheet" href="assets/styles.css"><link rel="stylesheet" href="privacy.css"></head><body data-pp-page="true">
<div class="topbar"><div class="container"><span>Enterprise AI · Technology Consulting · Software Engineering</span><span>Intelligence. Innovation. Impact.</span></div></div>
<header class="site-header"><div class="container nav"><a class="brand" href="index.html" aria-label="Zeldapro home"><img src="assets/zeldapro-logo-horizontal.png" alt="Zeldapro" class="brand-logo"></a><button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">Menu</button><nav class="nav-links"><a class="" href="index.html">Home</a><a class="" href="about.html">About</a><a class="" href="services.html">Services</a><a class="" href="solutions.html">AI Solutions</a><a class="" href="industries.html">Industries</a><a class="" href="software.html">Software</a><a class="" href="innovation.html">Innovation</a><a class="" href="insights.html">Insights</a><a class="" href="careers.html">Careers</a><a class="" href="contact.html">Contact</a></nav><a class="nav-cta" href="contact.html">Talk to our experts ↗</a></div></header>
<main>
<section class="pp-hero" aria-labelledby="pp-hero-title">
<div class="pp-hero__bg" role="img" aria-label="Abstract technology background"></div>
<div class="container pp-hero__inner">
<p class="eyebrow">Legal compliance</p>
<h1 id="pp-hero-title">{esc(meta.get("title", "Privacy Policy"))}</h1>
<p class="pp-hero__lead">{esc(meta.get("subtitle", ""))}</p>
</div>
</section>
<section class="pp-band pp-band--meta">
<div class="container"><div class="pp-meta-grid">{meta_cards}</div>
<div class="pp-highlight-grid">{highlights}</div>
<div class="pp-inquiries">
<h2>Privacy &amp; data inquiries</h2>
<p>Have questions or need to exercise your DPDP or Apple privacy rights? Contact our designated Data Protection and Grievance desk.</p>
<p><strong>Carevie desk:</strong> <a href="mailto:support@carevie.in">support@carevie.in</a> · <strong>Corporate:</strong> <a href="mailto:support@zeldapro.com">support@zeldapro.com</a></p>
</div></div>
</section>
<section class="section pp-doc-section">
<div class="container">
<div class="pp-toolbar"><p>Save or share a copy of this policy.</p><button type="button" class="btn btn-primary" id="pp-print-btn">Print policy</button></div>
<div id="privacy-policy-printable" class="pp-doc-layout">
<aside class="pp-index" aria-label="Privacy policy sections">
<h2 class="pp-index__title">Document index</h2>
<p class="pp-index__count">{len(data["sectionIndex"])} sections</p>
<nav><ol class="pp-index__list">{idx_nav}</ol></nav>
</aside>
<div class="pp-doc">
<header class="pp-doc__print-header">
<p class="pp-doc__print-entity">Zeldapro Consultancy Private Limited</p>
<h2 class="pp-doc__print-title">{esc(meta.get("title", ""))}</h2>
<p class="pp-doc__print-updated">Last updated: {esc(meta.get("lastUpdated", ""))}</p>
</header>
{doc}
</div>
</div></div>
</section>
</main>
<footer class="footer"><div class="container"><div class="footer-grid">
<div><a class="brand" href="index.html" aria-label="Zeldapro home"><img src="assets/zeldapro-logo-horizontal.png" alt="Zeldapro" class="brand-logo"></a><p style="max-width:290px;margin-top:18px">Engineering intelligence for a smarter enterprise. AI consulting, technology services and software products for a changing world.</p></div>
<div><h4>Explore</h4><a href="about.html">About Zeldapro</a><a href="services.html">AI & Technology Services</a><a href="solutions.html">AI Solutions</a><a href="software.html">Software Engineering</a></div>
<div><h4>Discover</h4><a href="industries.html">Industries</a><a href="innovation.html">Innovation & R&D</a><a href="insights.html">Insights</a><a href="careers.html">Careers</a></div>
{footer_connect}
</div><div class="footer-bottom"><span>© <span data-year></span> Zeldapro. All rights reserved.</span><span>AI · Engineering · Enterprise Transformation</span></div></div></footer>
<script src="assets/site.js"></script><script src="privacy.js"></script></body></html>"""
    (SITE / "privacy.html").write_text(page, encoding="utf-8")
    print("Wrote", SITE / "privacy.html")


if __name__ == "__main__":
    build_page()