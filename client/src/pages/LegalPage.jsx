import { useState } from 'react'

// ─── Sources ──────────────────────────────────────────────────────────────────
const LEGAL_SOURCES = [
  {
    label: 'EPA — Real Estate Disclosures About Potential Lead Hazards',
    url: 'https://www.epa.gov/lead/real-estate-disclosures-about-potential-lead-hazards',
    note: 'Primary source for the Lead-Based Paint Disclosure Rule. Contains the full text of Title X requirements, disclosure form templates, and inspection rights for pre-1978 housing.',
  },
  {
    label: 'CFPB — Home Mortgage Disclosure Act (HMDA) Data & Overview',
    url: 'https://www.consumerfinance.gov/data-research/hmda/',
    note: 'Official CFPB resource explaining HMDA requirements, Regulation C, and annual mortgage market reporting data.',
  },
  {
    label: 'FTC — Warranties: Your Rights When a Product Has Problems',
    url: 'https://consumer.ftc.gov/articles/warranties',
    note: 'Federal Trade Commission guidance on written warranties, implied warranties, and the Magnuson-Moss Warranty Act. Covers repair and refund rights.',
  },
  {
    label: 'HUD — Fair Housing Rights and Obligations',
    url: 'https://www.hud.gov/program_offices/fair_housing_equal_opp/fair_housing_rights_and_obligations',
    note: 'Covers the Fair Housing Act (1968) and its seven protected classes. Details complaint procedures through HUD and FHEO.',
  },
  {
    label: 'HUD — Tenant Rights, Laws, and Protections',
    url: 'https://www.hud.gov/topics/rental_assistance/tenantrights',
    note: 'HUD tenant rights overview covering habitability, discrimination, and housing assistance resources.',
  },
  {
    label: 'USALawExplained.com — The Ultimate Guide to Tenant Rights in the U.S.',
    url: 'https://usalawexplained.com/tenant-rights',
    note: 'Comprehensive educational guide covering the Implied Warranty of Habitability (Javins v. First National Realty, 1970), state-by-state comparison of eviction notice rules, security deposits, and legal remedies.',
  },
  {
    label: 'Florida SB 360 (2023) — Pre-Analysis from FL Senate',
    url: 'https://www.flsenate.gov/Session/Bill/2023/360/Analyses/2023s00360.pre.rc.PDF',
    note: 'The Florida legislation that reduced the statute of repose for latent construction defect claims from 10 to 7 years.',
  },
  {
    label: 'Texas Inspector — RCLA Inspection Rights During Construction',
    url: 'https://www.texasinspector.com/2024/11/your-right-to-independent-inspections-during-construction/',
    note: 'Explains the Texas Residential Construction Liability Act (RCLA) and the mandatory notice-before-litigation procedure.',
  },
]

// ─── Law Data ─────────────────────────────────────────────────────────────────
const LAWS = [
  {
    icon: '🏠',
    tag: 'Federal · 1992',
    title: 'Residential Lead-Based Paint Hazard Reduction Act (Title X)',
    statute: 'Public Law 102-550 · Section 1018',
    agency: 'U.S. Environmental Protection Agency (EPA)',
    summary:
      'The primary federal disclosure law governing home sales and rentals. Lead-based paint was banned in U.S. homes in 1978, but remains present in millions of older properties.',
    rights: [
      'Sellers and landlords of pre-1978 housing MUST disclose all known lead-based paint hazards before signing a contract or lease.',
      'You must receive the EPA-approved pamphlet "Protect Your Family From Lead In Your Home" before signing.',
      'A "Lead Warning Statement" must be included in the sales contract or lease.',
      'As a homebuyer, you have a federally guaranteed 10-day period to conduct a lead-based paint inspection or risk assessment (parties may adjust this in writing).',
      'All disclosure documents must be retained for 3 years after sale completion.',
      'Violations are enforceable by the EPA — non-compliant sellers or landlords face civil penalties.',
    ],
    exceptions: [
      'Zero-bedroom units (unless a child under 6 lives there).',
      'Short-term leases of 100 days or less where no renewal occurs.',
      'Housing built after 1977.',
      'Housing tested and certified lead-free by a certified inspector.',
    ],
    source: 'epa.gov',
    sourceUrl: 'https://www.epa.gov/lead/real-estate-disclosures-about-potential-lead-hazards',
  },
  {
    icon: '⚖️',
    tag: 'Federal · 1968',
    title: 'Fair Housing Act (FHA)',
    statute: 'Title VIII of the Civil Rights Act of 1968',
    agency: 'Department of Housing and Urban Development (HUD)',
    summary:
      'The cornerstone of federal housing protection. It is illegal for landlords, sellers, or agents to discriminate based on membership in any of the seven protected classes.',
    rights: [
      'A landlord CANNOT refuse to rent to you based on race, color, national origin, religion, sex, familial status (having children), or disability.',
      'A landlord CANNOT charge you a higher security deposit or different rent terms based on a protected class.',
      'Discriminatory advertising ("Ideal for single professional," "No kids") is explicitly illegal.',
      'Landlords MUST make reasonable accommodations for tenants with disabilities — including allowing service animals in "no pets" buildings.',
      'You can file a complaint with HUD (Fair Housing and Equal Opportunity office) within 1 year of the discriminatory act.',
    ],
    source: 'hud.gov',
    sourceUrl: 'https://www.hud.gov/program_offices/fair_housing_equal_opp/fair_housing_rights_and_obligations',
  },
  {
    icon: '🏡',
    tag: 'Case Law · 1970',
    title: 'Implied Warranty of Habitability',
    statute: 'Javins v. First National Realty Corp. (D.C. Circuit, 1970)',
    agency: 'Applicable across all U.S. states',
    summary:
      'The foundational legal doctrine establishing that a residential lease is a contract for livable services — not merely a property transfer. Your landlord has an ongoing legal duty to maintain safe and habitable conditions.',
    rights: [
      'Your unit must be weatherproof and structurally sound (no major leaks, crumbling walls, broken windows).',
      'Essential utilities (hot and cold water, heat, electricity) must function.',
      'Property must be free from significant pest infestations.',
      'Smoke detectors, carbon monoxide detectors, and working door/window locks are required.',
      'If the landlord breaches this warranty, your obligation to pay full rent is legally suspended in many states.',
      'You can sue for damages — including the difference between rent paid and the value of the defective conditions — even if you chose to stay rather than move.',
    ],
    source: 'USALawExplained.com',
    sourceUrl: 'https://usalawexplained.com/tenant-rights',
  },
  {
    icon: '📋',
    tag: 'Federal · 1975',
    title: 'Home Mortgage Disclosure Act (HMDA)',
    statute: 'HMDA 1975 · Regulation C · Updated by Dodd-Frank (2010)',
    agency: 'Consumer Financial Protection Bureau (CFPB)',
    summary:
      'Requires financial institutions to collect and report loan-level mortgage data. Designed to shed light on discriminatory lending patterns and ensure lenders serve community housing needs.',
    rights: [
      'Lenders are required to publicly disclose mortgage data — giving you access to lending pattern information for your area.',
      'This data is used to enforce fair lending laws and detect discriminatory mortgage denial practices.',
      'Public HMDA data can reveal if lenders are disproportionately denying loans in specific neighborhoods (redlining).',
      'The CFPB publishes annual data reports — you can access your region\'s lending patterns at consumerfinance.gov.',
    ],
    source: 'consumerfinance.gov',
    sourceUrl: 'https://www.consumerfinance.gov/data-research/hmda/',
  },
  {
    icon: '🔨',
    tag: 'Federal · 1975',
    title: 'Magnuson-Moss Warranty Act & Implied Warranties',
    statute: '15 U.S.C. §§ 2301–2312 · FTC Enforcement',
    agency: 'Federal Trade Commission (FTC)',
    summary:
      'Governs written and implied warranties on consumer products, including major home appliances. Sellers cannot eliminate implied warranty protections without explicit disclosure.',
    rights: [
      'Any written warranty on a product must be available for you to read BEFORE you buy — whether in person or online.',
      '"Warranty of merchantability" automatically applies to everything you buy: it guarantees the product will do what it\'s supposed to do.',
      '"Warranty of fitness for a particular purpose" applies when a seller recommends a product for a specific job.',
      'If you report a defect during the warranty period and it\'s not fixed properly, the company must correct the problem — even if the warranty expires before the fix is complete.',
      'If a company refuses to honor a warranty, you can report them to the FTC at ReportFraud.ftc.gov or your state attorney general.',
    ],
    source: 'consumer.ftc.gov',
    sourceUrl: 'https://consumer.ftc.gov/articles/warranties',
  },
  {
    icon: '🔑',
    tag: 'Right to Privacy',
    title: 'Right to Quiet Enjoyment & Landlord Entry Restrictions',
    statute: 'State Statutes (CA: Civ. Code §1954 · FL: §83.53 · NY: RPL §235-b)',
    agency: 'Enforced at state level',
    summary:
      'A covenant implied in every residential lease. Your landlord cannot enter your home without proper advance notice, cannot harass you, and cannot interfere with your normal use of the property.',
    rights: [
      'California: Landlord must give 24 hours\' written notice before non-emergency entry.',
      'Florida: Landlord must give 12 hours\' "reasonable notice" before entry.',
      'New York: "Reasonable notice" required — typically 24 hours by court interpretation.',
      'Texas: "Reasonable notice" required, though not defined by a specific time period.',
      'A landlord who repeatedly enters without notice, shuts off utilities, or makes threats is engaging in illegal harassment ("constructive eviction").',
    ],
    source: 'USALawExplained.com',
    sourceUrl: 'https://usalawexplained.com/tenant-rights',
  },
  {
    icon: '🏗️',
    tag: 'State Law · Texas',
    title: 'Texas Residential Construction Liability Act (RCLA)',
    statute: 'Texas Property Code, Chapter 27',
    agency: 'Enforced through Texas civil courts',
    summary:
      'Governs all construction defect disputes between homeowners and builders in Texas. Before any lawsuit can be filed, a rigid mandatory procedure must be exhausted.',
    rights: [
      'You must provide formal written notice (via certified mail) to the contractor describing all specific defects.',
      'The contractor has a legal right to inspect the property up to 3 times within 35 days of receiving notice.',
      'The builder has 60 days to make a written settlement offer — including a right to repair, hire independent contractors, or buy back the property.',
      'If the builder\'s offer is reasonable and you reject it, your recoverable damages may be limited.',
      'Recovery limited to: actual repair costs, temporary housing costs during repair, and reasonable attorney/engineering fees.',
      'Disputes exceeding $7,500 may be subject to mandatory mediation.',
    ],
    source: 'texasinspector.com',
    sourceUrl: 'https://www.texasinspector.com/2024/11/your-right-to-independent-inspections-during-construction/',
  },
  {
    icon: '⏱️',
    tag: 'State Law · Florida · 2023',
    title: 'Florida Senate Bill 360 (SB 360) — Reduced Statute of Repose',
    statute: 'FL SB 360 · 2023 Tort Reform Act',
    agency: 'Florida Legislature — effective 2023',
    summary:
      'Critical 2023 reform that drastically reduces the time Florida homeowners have to discover and file claims for hidden (latent) construction defects. Primarily benefits developers at the expense of homeowners.',
    rights: [
      'You now have ONLY 7 years to discover and file a claim for latent (hidden) construction defects — reduced from 10 years.',
      'The statute clock often starts EARLIER in the construction process, not from when you take possession.',
      'Slow-acting structural failures (corroding underslab plumbing, degrading waterproofing membranes, settling soils) commonly take 8–10 years to manifest — meaning SB 360 shields builders from these claims by design.',
      'ACTION REQUIRED: Florida buyers should schedule independent post-purchase inspections at years 2, 4, and 6 to document issues before the statute expires.',
    ],
    warning: 'This law strongly favors builders. If you purchased a Florida home after 2017, your legal window to sue for hidden defects is narrower than it was previously.',
    source: 'flsenate.gov',
    sourceUrl: 'https://www.flsenate.gov/Session/Bill/2023/360/Analyses/2023s00360.pre.rc.PDF',
  },
]

function SourcesDropdown({ sources }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--c-border-light)', paddingTop: '1.5rem' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--c-text-muted)', fontSize: 'var(--text-sm)', fontWeight: 600,
          padding: 0, transition: 'color var(--t-fast)',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--c-text)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--c-text-muted)'}
      >
        <span>📎</span>
        <span>{sources.length} Sources Used in This Section</span>
        <span style={{ fontSize: '0.7rem', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--t-base)', marginLeft: '4px' }}>▼</span>
      </button>
      {open && (
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {sources.map((s, i) => (
            <div key={i} style={{
              background: 'var(--c-surface-2)', border: '1px solid var(--c-border-light)',
              borderRadius: 'var(--r-sm)', padding: 'var(--sp-3) var(--sp-4)',
              display: 'flex', flexDirection: 'column', gap: '4px',
            }}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" style={{
                color: 'var(--c-primary)', fontWeight: 600, fontSize: 'var(--text-sm)', wordBreak: 'break-word',
              }}>{s.label}</a>
              <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--c-text-muted)', lineHeight: 1.5 }}>{s.note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function LawCard({ law }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: 'var(--sp-5)', display: 'flex', alignItems: 'flex-start',
          gap: 'var(--sp-4)', textAlign: 'left',
          transition: 'background var(--t-fast)',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--c-surface-2)'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
      >
        <span style={{ fontSize: '1.8rem', flexShrink: 0, marginTop: '2px' }}>{law.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
            <span style={{
              background: 'var(--c-primary-light)', color: 'var(--c-primary-dark)',
              padding: '2px 10px', borderRadius: 'var(--r-full)',
              fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.04em', whiteSpace: 'nowrap',
            }}>{law.tag}</span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-text-muted)' }}>{law.agency}</span>
          </div>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--c-text)', margin: '0 0 4px', lineHeight: 1.3 }}>{law.title}</h3>
          <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--c-text-muted)', fontFamily: 'monospace' }}>{law.statute}</p>
        </div>
        <span style={{
          fontSize: '0.75rem', color: 'var(--c-text-muted)', flexShrink: 0, marginTop: '4px',
          transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform var(--t-base)',
        }}>▼</span>
      </button>

      {expanded && (
        <div style={{ padding: '0 var(--sp-5) var(--sp-5)', borderTop: '1px solid var(--c-border-light)', paddingTop: 'var(--sp-4)' }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-text-2)', lineHeight: 1.65, marginBottom: 'var(--sp-4)' }}>
            {law.summary}
          </p>

          {law.warning && (
            <div style={{
              background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5',
              borderRadius: 'var(--r-sm)', padding: 'var(--sp-3) var(--sp-4)',
              fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-4)', display: 'flex', gap: '10px',
            }}>
              <span>⚠️</span>
              <span>{law.warning}</span>
            </div>
          )}

          <div style={{ marginBottom: 'var(--sp-4)' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--c-primary)', marginBottom: 'var(--sp-2)' }}>
              Your Rights Under This Law
            </div>
            <ul style={{ paddingLeft: 'var(--sp-5)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              {law.rights.map((r, i) => (
                <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--c-text)', lineHeight: 1.55 }}>{r}</li>
              ))}
            </ul>
          </div>

          {law.exceptions && (
            <div style={{ marginBottom: 'var(--sp-4)' }}>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--c-text-muted)', marginBottom: 'var(--sp-2)' }}>
                Exceptions / Does Not Apply To
              </div>
              <ul style={{ paddingLeft: 'var(--sp-5)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
                {law.exceptions.map((e, i) => (
                  <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--c-text-muted)', lineHeight: 1.5 }}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <a href={law.sourceUrl} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: 'var(--text-xs)', color: 'var(--c-primary)', fontWeight: 600,
          }}>
            <span>↗</span> Read official source: {law.source}
          </a>
        </div>
      )}
    </div>
  )
}

export default function LegalPage() {
  return (
    <div className="container legal-page fade-in" style={{ paddingTop: 'var(--sp-8)', paddingBottom: 'var(--sp-16)' }}>

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fffe 60%, #ffffff 100%)',
        border: '1px solid var(--c-border)', borderRadius: 'var(--r-xl)',
        padding: 'var(--sp-10) var(--sp-8)', marginBottom: 'var(--sp-8)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--sp-3)' }}>
            <span style={{ fontSize: '2rem' }}>⚖️</span>
            <span style={{
              background: 'var(--c-primary-light)', color: 'var(--c-primary-dark)', borderRadius: 'var(--r-full)',
              padding: '3px 12px', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>Legal Awareness</span>
          </div>
          <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--c-text)', marginBottom: 'var(--sp-4)', lineHeight: 1.2 }}>
            Your Rights as a Tenant &amp; Buyer
          </h1>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--c-text-2)', lineHeight: 1.7, marginBottom: 'var(--sp-3)' }}>
            A working knowledge of key federal and state housing laws is your most effective protection against illegal landlord conduct, undisclosed defects, and predatory builder practices.
          </p>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--c-text-muted)', lineHeight: 1.7 }}>
            Click any law below to expand its full details, including your specific rights, exceptions, and a link to the official source.
          </p>
        </div>
        <div style={{
          position: 'absolute', right: '-20px', top: '-20px', width: '200px', height: '200px',
          background: 'radial-gradient(circle, rgba(58,125,68,0.10) 0%, transparent 70%)',
          borderRadius: '50%', zIndex: 0,
        }} />
      </div>

      {/* ── Law Cards ── */}
      <section style={{ marginBottom: 'var(--sp-10)' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-2)', color: 'var(--c-text)' }}>Federal &amp; State Laws</h2>
        <p style={{ color: 'var(--c-text-muted)', marginBottom: 'var(--sp-5)' }}>
          Compiled from official U.S. government sources (EPA, HUD, CFPB, FTC) and state legal statutes. Sourced from data collected April 2025.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
          {LAWS.map((law, i) => <LawCard key={i} law={law} />)}
        </div>
      </section>

      {/* ── State Comparison Table ── */}
      <section style={{ marginBottom: 'var(--sp-10)' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-2)', color: 'var(--c-text)' }}>State-by-State Comparison</h2>
        <p style={{ color: 'var(--c-text-muted)', marginBottom: 'var(--sp-5)' }}>
          Tenant rights vary dramatically by jurisdiction. "Location, location, location" applies to your rights, not just real estate value.
        </p>
        <div className="card" style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: 'var(--c-surface-2)', borderBottom: '1.5px solid var(--c-border)' }}>
                {['Right', 'California', 'Texas', 'New York', 'Florida'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: 'var(--sp-3) var(--sp-4)', color: 'var(--c-text)', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Security Deposit Limit', '2–3 months\' rent', 'No state limit', '1 month\'s rent', 'No state limit'],
                ['Landlord Entry Notice', '24 hours written', '"Reasonable" (undefined)', '~24 hours (court-interpreted)', '12 hours'],
                ['Rent Withholding for Repairs', '✅ Allowed (strict rules)', '⚠️ Allowed (very risky)', '✅ Allowed (common remedy)', '❌ Not allowed'],
                ['Eviction Notice (Non-Payment)', '3-Day Notice to Pay or Quit', '3-Day Notice to Vacate', '14-Day Written Demand', '3-Day Notice (excl. weekends)'],
                ['Tenant Protections Overall', '🟢 Very Strong (renter-friendly)', '🔴 Moderate (landlord-friendly)', '🟢 Strong (esp. NYC stabilized)', '🟡 Specific & time-sensitive'],
              ].map(([right, ca, tx, ny, fl], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--c-border-light)', background: i % 2 === 0 ? 'var(--c-surface)' : 'var(--c-surface-2)' }}>
                  <td style={{ padding: 'var(--sp-3) var(--sp-4)', fontWeight: 600, color: 'var(--c-text)' }}>{right}</td>
                  <td style={{ padding: 'var(--sp-3) var(--sp-4)', color: 'var(--c-text-2)' }}>{ca}</td>
                  <td style={{ padding: 'var(--sp-3) var(--sp-4)', color: 'var(--c-text-2)' }}>{tx}</td>
                  <td style={{ padding: 'var(--sp-3) var(--sp-4)', color: 'var(--c-text-2)' }}>{ny}</td>
                  <td style={{ padding: 'var(--sp-3) var(--sp-4)', color: 'var(--c-text-2)' }}>{fl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Sources ── */}
      <SourcesDropdown sources={LEGAL_SOURCES} />

      {/* ── Disclaimer ── */}
      <div style={{
        marginTop: 'var(--sp-8)', padding: 'var(--sp-5) var(--sp-6)',
        background: 'var(--c-surface-2)', border: '1px solid var(--c-border)',
        borderRadius: 'var(--r-md)', display: 'flex', gap: 'var(--sp-4)', alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>📌</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--c-text)', marginBottom: '6px' }}>
            Legal Disclaimer — Informational Purposes Only
          </div>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--c-text-muted)', lineHeight: 1.65 }}>
            This section provides general educational information about U.S. housing laws and tenant rights. It is not legal advice, does not constitute an attorney-client relationship, and should not be relied upon as a substitute for professional legal counsel. Laws vary by jurisdiction and change over time. Always consult a qualified real estate attorney or licensed legal aid organization for guidance on your specific situation. RentTrack does not provide enforcement services, legal representation, or government referrals.
          </p>
        </div>
      </div>
    </div>
  )
}
