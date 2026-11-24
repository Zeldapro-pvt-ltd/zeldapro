import { Printer } from 'lucide-react'
import privacyHero from '../assets/images/privacy-hero.jpg'
import { Seo } from '../components/layout/Seo'
import { PrivacyPolicyDocument } from '../components/pages/privacy/PrivacyPolicyDocument'
import { EnterprisePageHero } from '../components/pages/EnterprisePageHero'
import { Container } from '../components/ui'
import {
  privacyHighlights,
  privacyPolicyMeta,
  privacySectionIndex,
} from '../data/privacyPolicy'

const metaFields = [
  { label: 'Legal entity', value: privacyPolicyMeta.legalEntity },
  { label: 'Product covered', value: privacyPolicyMeta.productCovered },
  { label: 'Last updated', value: privacyPolicyMeta.lastUpdated },
  { label: 'Jurisdiction', value: privacyPolicyMeta.jurisdiction },
] as const

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description={privacyPolicyMeta.subtitle}
      />
      <div className="print:hidden">
        <EnterprisePageHero
          eyebrow="Legal compliance"
          title={privacyPolicyMeta.title}
          description={privacyPolicyMeta.subtitle}
          backgroundImage={privacyHero}
          fullViewport
        />
      </div>

      <section className="border-b border-line bg-surface-0 print:hidden">
        <Container className="py-10 sm:py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metaFields.map((field) => (
              <div
                key={field.label}
                className="rounded-xl border border-line bg-surface-50 px-4 py-4 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-subtle">
                  {field.label}
                </p>
                <p className="mt-2 text-sm font-medium leading-snug text-brand-950">
                  {field.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {privacyHighlights.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-electric-500/20 bg-gradient-to-br from-electric-500/[0.08] to-surface-0 px-5 py-5"
              >
                <h2 className="font-heading text-base text-brand-950">{card.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{card.body}</p>
              </div>
            ))}
          </div>

          <PrivacyInquiriesBanner />
        </Container>
      </section>

      <section className="bg-surface-50 print:bg-white">
        <Container className="py-10 sm:py-12 print:max-w-none print:py-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 lg:col-span-full print:hidden">
            <p className="text-sm text-ink-muted">
              Save or share a copy of this policy.
            </p>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-0 px-5 py-2.5 text-sm font-semibold text-brand-950 shadow-sm transition-colors hover:border-electric-500/40 hover:text-electric-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-600"
            >
              <Printer size={18} aria-hidden />
              Print policy
            </button>
          </div>

          <div
            id="privacy-policy-printable"
            className="grid gap-10 lg:grid-cols-[minmax(0,260px)_1fr] lg:gap-14 print:block"
          >
            <aside className="flex max-h-none flex-col print:hidden lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:self-start">
              <h2 className="shrink-0 font-heading text-lg text-brand-950">
                Document index
              </h2>
              <p className="mt-1 shrink-0 text-xs text-ink-subtle">
                {privacySectionIndex.length} sections
              </p>
              <nav
                className="mt-4 min-h-0 flex-1 overflow-y-auto overscroll-y-contain pr-2 [-webkit-overflow-scrolling:touch]"
                aria-label="Privacy policy sections"
              >
                <ol className="space-y-1 pb-6 text-sm">
                  {privacySectionIndex.map((entry) => (
                    <li key={entry.id}>
                      <a
                        href={`#${entry.id}`}
                        className="block rounded-lg px-2 py-1.5 leading-snug text-ink-muted transition-colors hover:bg-surface-0 hover:text-electric-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-600"
                      >
                        <span className="font-medium text-brand-950">
                          {entry.num}.
                        </span>{' '}
                        {entry.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0 rounded-2xl border border-line bg-surface-0 px-5 py-10 shadow-sm sm:px-8 sm:py-12 lg:px-10 print:border-0 print:bg-white print:p-0 print:shadow-none">
              <header className="mb-10 hidden border-b border-line pb-8 print:block">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-electric-600">
                  Zeldapro Consultancy Private Limited
                </p>
                <h1 className="mt-2 font-heading text-2xl text-brand-950">
                  {privacyPolicyMeta.title}
                </h1>
                <p className="mt-2 text-sm text-ink-muted">
                  Last updated: {privacyPolicyMeta.lastUpdated}
                </p>
              </header>
              <PrivacyPolicyDocument />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function PrivacyInquiriesBanner() {
  return (
    <div className="mt-10 rounded-2xl border border-line bg-brand-950 px-6 py-8 text-on-dark shadow-lg sm:px-8">
      <h2 className="font-heading text-xl text-on-dark sm:text-2xl">
        Privacy &amp; data inquiries
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-on-dark-muted sm:text-base">
        Have questions or need to exercise your DPDP or Apple privacy rights? Contact our
        designated Data Protection and Grievance desk.
      </p>
      <p className="mt-4 text-sm text-on-dark-muted">
        <span className="font-medium text-on-dark">Carevie desk:</span>{' '}
        <a
          href="mailto:support@carevie.in"
          className="text-electric-400 underline decoration-electric-400/40 underline-offset-2 hover:text-electric-300"
        >
          support@carevie.in
        </a>
        <span className="mx-2 text-on-dark-muted/60">·</span>
        <span className="font-medium text-on-dark">Corporate:</span>{' '}
        <a
          href="mailto:support@zeldapro.com"
          className="text-electric-400 underline decoration-electric-400/40 underline-offset-2 hover:text-electric-300"
        >
          support@zeldapro.com
        </a>
      </p>
    </div>
  )
}