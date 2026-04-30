import { useState } from 'react'

// ─── Sources ──────────────────────────────────────────────────────────────────
const SOURCES = [
  {
    label: 'Zac Rios — "New Construction Homes Are Falling Apart" (2025)',
    url: 'https://www.youtube.com/watch?v=w4Rr8tLHrpo',
    note: 'Primary video source. Documents rushed framing, skipped concrete curing, builder inspection obstruction, and Miami "jail view" developments.',
  },
  {
    label: 'Housing.com — Common Construction Defects in Buildings',
    url: 'https://housing.com/news/common-construction-defects-in-buildings/',
    note: 'Covers foundation damage, plumbing failures, waterproofing breakdown, electrical system faults.',
  },
  {
    label: 'UK Construction Blog — Common Defects & Prevention (2025)',
    url: 'https://ukconstructionblog.co.uk/2025/03/26/common-construction-defects-and-how-to-prevent-them/',
    note: 'International reference on workmanship errors, finishing quality, and structural framing defects.',
  },
  {
    label: 'Realtors Kenya — Signs of Poor Construction in Apartments',
    url: 'https://realtors.co.ke/signs-of-poor-construction-in-apartments/',
    note: 'Identifies substandard materials, fixture quality, and pest entry gaps as universal warning signs.',
  },
  {
    label: 'Builder Connect NZ — 10 Warning Signs of Poor Quality Construction',
    url: 'https://builderconnect.co.nz/blog/10-warning-signs-of-poor-quality-construction-work/',
    note: 'Finishing quality indicators, HVAC defects, structural framing red flags.',
  },
  {
    label: 'Douglas Enclave Miami — Example of "Luxury" Marketing Dissonance',
    url: 'https://www.douglasenclave.com/',
    note: 'Real property adjacent to TGK Correctional Center marketed as luxury — referenced in essay as a case study.',
  },
  {
    label: 'ConsumerAffairs — D.R. Horton Complaints & Warranty Disputes',
    url: 'https://www.consumeraffairs.com/housing/dr_horton.html',
    note: 'Large collection of verified post-sale abandonment and warranty denial complaints against major builders.',
  },
  {
    label: 'Florida SB 360 (2023) — Statute of Repose Reduction',
    url: 'https://www.flsenate.gov/Session/Bill/2023/360/Analyses/2023s00360.pre.rc.PDF',
    note: 'Florida law reducing the window to sue builders for latent defects from 10 years to 7 years.',
  },
  {
    label: 'Florida HB 683 — Private Provider Inspections Expansion',
    url: 'https://www.flhouse.gov/Sections/Bills/billsdetail.aspx?BillId=81299',
    note: 'Enables developers to hire private inspectors, creating conflicts of interest in code enforcement.',
  },
  {
    label: 'Texas Inspector — Your Right to Independent Inspections',
    url: 'https://www.texasinspector.com/2024/11/your-right-to-independent-inspections-during-construction/',
    note: 'Explains Texas RCLA and the importance of Phase 1/2 independent inspection rights.',
  },
  {
    label: 'Procore — Construction Punch List Guide',
    url: 'https://www.procore.com/en-ca/library/construction-punch-list',
    note: 'Explains punch list management, deficiency tracking, and builder closeout processes.',
  },
]

// ─── Problem Data ──────────────────────────────────────────────────────────────
const PROBLEMS = [
  {
    icon: '🏗️',
    title: 'Compressed Timelines',
    severity: 'critical',
    detail:
      'Builders erect structural framing in 4 days or less under corporate pressure to hit closing quotas. Foundations are poured and immediately built upon before concrete achieves adequate curing strength, causing premature cracking and long-term settling. The industry-standard minimum curing period is abandoned in favor of chemical accelerators that weaken the pour.',
  },
  {
    icon: '💰',
    title: 'Cosmetics Over Structure',
    severity: 'high',
    detail:
      'Builders operate on the empirically proven assumption that buyers are swayed by visible finishes — quartz countertops, premium paint — rather than paying a premium for superior HVAC systems, insulation quality, or engineered foundations. The result: beautiful surfaces hiding sub-standard skeletal systems.',
  },
  {
    icon: '🔍',
    title: 'Inspection Obstruction',
    severity: 'critical',
    detail:
      'Builders systematically deny Phase 1 (pre-pour foundation) and Phase 2 (pre-drywall framing) independent inspections, often citing OSHA "safety" rules. By Phase 3 (final walkthrough), inspectors are legally prohibited from destructive testing — meaning crushed plumbing, missing insulation, and severed electrical grounds are permanently hidden behind drywall.',
  },
  {
    icon: '🏛️',
    title: 'Regulatory Capture (Private Inspectors)',
    severity: 'high',
    detail:
      'Florida HB 683 and Statute 553.791 allow developers to hire their own "private providers" for municipal code compliance. These private inspectors are paid by the developers whose work they scrutinize — a direct conflict of interest. Inspectors who consistently flag issues are simply replaced by more compliant firms.',
  },
  {
    icon: '📱',
    title: 'Virtual Inspection Loopholes',
    severity: 'high',
    detail:
      'State laws increasingly permit asynchronous video submissions as substitutes for in-person inspections. Since the contractor controls the camera angle and lighting, critical structural flaws — missing hurricane ties in dark attics, subtle honeycombing in concrete — can easily be kept off-screen while still receiving a passing "stamp."',
  },
  {
    icon: '💸',
    title: 'Mortgage Rate Buydown Illusion',
    severity: 'high',
    detail:
      'Builders like D.R. Horton and Lennar offer 2-1 temporary buydowns (e.g., 0.99% introductory rate) to sustain demand without officially dropping the sticker price. When the buydown expires at year 3, monthly payments spike — leaving buyers with inflated-priced homes whose structural quality doesn\'t justify the valuation.',
  },
  {
    icon: '🏚️',
    title: 'Post-Sale Abandonment',
    severity: 'critical',
    detail:
      'Consumers report catastrophic slab leaks ($40,000+) within 2.5 years of purchase — only to learn their "plumbing warranty" expired at 24 months. Builders redefine structural defects as "plumbing defects" to deny claims. Corporate builders redirect repair crews to new profitable units while existing buyers cycle through a never-ending punch list.',
  },
  {
    icon: '🧱',
    title: 'Foundation & Structural Failures',
    severity: 'critical',
    detail:
      'Poured foundations without proper vibration cause "honeycombing" — gravelly voids where cement paste failed to fill aggregate. Moisture penetrates these voids, corroding internal rebar. As rebar oxidizes and expands, it shatters the surrounding concrete (spalling), destroying structural integrity. Remediation costs range from $10,000 to $70,000+.',
  },
  {
    icon: '💧',
    title: 'Water Infiltration Failures',
    severity: 'high',
    detail:
      'Missing vapor barriers between concrete foundations and structural wood framing allow capillary moisture into walls. Improper flashing around rooflines and chimneys causes chronic leaks. Failed wet-area waterproofing membranes lead to delaminated tiles, toxic mold, and internal rot. Average water damage claims exceed $12,000 per incident.',
  },
  {
    icon: '⚡',
    title: 'MEP (Mechanical, Electrical, Plumbing) Defects',
    severity: 'critical',
    detail:
      'Undersized electrical cabling melts insulation under load, creating fire risk. Missing GFCI protection in wet areas violates code and endangers occupants. Underslab plumbing damaged during slab pours requires jackhammering interior floors to access. HVAC flexible ducts bent at tight angles severely restrict airflow and cause short-cycling.',
  },
]

const SEVERITY_LABELS = {
  critical: { label: 'Critical Risk', color: '#dc2626', bg: '#fee2e2', border: '#fca5a5' },
  high:     { label: 'High Risk',     color: '#ea580c', bg: '#ffedd5', border: '#fdba74' },
}

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
                color: 'var(--c-primary)', fontWeight: 600, fontSize: 'var(--text-sm)',
                wordBreak: 'break-word',
              }}>
                {s.label}
              </a>
              <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--c-text-muted)', lineHeight: 1.5 }}>{s.note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function AwarenessPage() {
  return (
    <div className="container awareness-page fade-in" style={{ paddingTop: 'var(--sp-8)', paddingBottom: 'var(--sp-16)' }}>

      {/* ── Hero ── */}
      <div className="info-page-hero" style={{
        background: 'linear-gradient(135deg, #fff7ed 0%, #fef9f0 60%, #ffffff 100%)',
        border: '1px solid #fed7aa', borderRadius: 'var(--r-xl)',
        padding: 'var(--sp-10) var(--sp-8)', marginBottom: 'var(--sp-8)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--sp-3)' }}>
            <span style={{ fontSize: '2rem' }}>🏗️</span>
            <span style={{
              background: '#fed7aa', color: '#9a3412', borderRadius: 'var(--r-full)',
              padding: '3px 12px', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>Housing Quality Crisis</span>
          </div>
          <h1 style={{ fontSize: 'var(--text-3xl)', color: '#1c1917', marginBottom: 'var(--sp-4)', lineHeight: 1.2 }}>
            Why This Application Exists
          </h1>
          <p style={{ fontSize: 'var(--text-lg)', color: '#57534e', lineHeight: 1.7, marginBottom: 'var(--sp-5)' }}>
            The United States residential construction market is in a profound structural crisis. Despite record-high home prices, new builds are simultaneously shrinking in lot size, skipping foundational curing processes, and obscuring severe defects behind premium cosmetic finishes. Buyers and renters pay 5× the price and receive homes that fail within 4 years.
          </p>
          <p style={{ fontSize: 'var(--text-base)', color: '#78716c', lineHeight: 1.7 }}>
            RentTrack was built to give tenants and buyers a structured, evidence-based tool to document these issues — because most people do not recognize defects until they become catastrophic, and by then, the builder's warranty has conveniently expired.
          </p>
        </div>
        <div style={{
          position: 'absolute', right: '-20px', top: '-20px', width: '220px', height: '220px',
          background: 'radial-gradient(circle, rgba(251,146,60,0.12) 0%, transparent 70%)',
          borderRadius: '50%', zIndex: 0,
        }} />
      </div>

      {/* ── Problem Statement ── */}
      <section style={{ marginBottom: 'var(--sp-10)' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-2)', color: 'var(--c-text)' }}>The Core Problem</h2>
        <p style={{ color: 'var(--c-text-muted)', marginBottom: 'var(--sp-6)', maxWidth: '700px' }}>
          A chronic 2.6 million-unit housing deficit has pressured developers to maximize output at the expense of quality. These are the systemic failures shaping today's new housing market.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--sp-4)' }}>
          {PROBLEMS.map((p, i) => {
            const sev = SEVERITY_LABELS[p.severity]
            return (
              <div key={i} className="card" style={{ padding: 'var(--sp-5)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--sp-3)', marginBottom: 'var(--sp-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{p.icon}</span>
                    <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--c-text)', margin: 0 }}>{p.title}</h3>
                  </div>
                  <span style={{
                    flexShrink: 0, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.04em',
                    padding: '2px 8px', borderRadius: 'var(--r-full)', textTransform: 'uppercase',
                    background: sev.bg, color: sev.color, border: `1px solid ${sev.border}`,
                  }}>{sev.label}</span>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-text-2)', lineHeight: 1.65, margin: 0 }}>{p.detail}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Defect Cost Table ── */}
      <section style={{ marginBottom: 'var(--sp-10)' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-2)', color: 'var(--c-text)' }}>Estimated Remediation Costs</h2>
        <p style={{ color: 'var(--c-text-muted)', marginBottom: 'var(--sp-5)' }}>Based on industry repair averages from construction defect litigation data.</p>
        <div className="card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ background: 'var(--c-surface-2)', borderBottom: '1.5px solid var(--c-border)' }}>
                {['Defect Category', 'Observable Warning Signs', 'Est. Remediation Cost'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: 'var(--sp-3) var(--sp-4)', color: 'var(--c-text)', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Foundation / Structural', 'Bouncing floors, diagonal/stair-step wall cracks, sticking doors, out-of-plumb walls', '$10,000 – $70,000+'],
                ['Water Infiltration', 'Sagging ceilings, efflorescence (white salt deposits) on walls, mold, hollow-sounding tiles', '$500 – $24,000+'],
                ['Plumbing / HVAC', 'Gurgling drains, slab leaks, uneven room temperatures, high indoor humidity, sewer gas odors', '$500 – $30,000+'],
                ['Electrical Systems', 'Flickering lights, tripping breakers, dead outlets, missing GFCI protection', '$500 – $30,000+'],
                ['Cosmetic & Finishing', '"Lippage" (uneven adjacent tiles), peeling paint, misaligned hinges, visible trim gaps', 'Varies by scope'],
              ].map(([cat, signs, cost], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--c-border-light)', background: i % 2 === 0 ? 'var(--c-surface)' : 'var(--c-surface-2)' }}>
                  <td style={{ padding: 'var(--sp-3) var(--sp-4)', fontWeight: 600, color: 'var(--c-text)', whiteSpace: 'nowrap' }}>{cat}</td>
                  <td style={{ padding: 'var(--sp-3) var(--sp-4)', color: 'var(--c-text-muted)' }}>{signs}</td>
                  <td style={{ padding: 'var(--sp-3) var(--sp-4)', fontWeight: 700, color: 'var(--c-critical)', whiteSpace: 'nowrap' }}>{cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Video Reference ── */}
      <section style={{ marginBottom: 'var(--sp-10)' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-2)', color: 'var(--c-text)' }}>Primary Reference</h2>
        <p style={{ color: 'var(--c-text-muted)', marginBottom: 'var(--sp-5)' }}>
          The following documentary investigation by Zac Rios is the primary catalyst for this project. It was published in 2025 and features on-the-ground documentation of construction quality failures across the U.S.
        </p>
        <a
          href="https://www.youtube.com/watch?v=w4Rr8tLHrpo"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', textDecoration: 'none', maxWidth: '600px' }}
        >
          <div className="card card-clickable" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <div style={{
                width: '70px', height: '70px', background: 'rgba(255,0,0,0.9)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(255,0,0,0.4)',
              }}>
                <span style={{ fontSize: '1.8rem', marginLeft: '4px' }}>▶</span>
              </div>
              <div style={{
                position: 'absolute', bottom: '12px', left: '16px',
                background: 'rgba(0,0,0,0.7)', borderRadius: 'var(--r-sm)',
                padding: '4px 10px', fontSize: 'var(--text-xs)', color: '#fff',
              }}>
                youtube.com
              </div>
            </div>
            <div style={{ padding: 'var(--sp-4) var(--sp-5)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--c-text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Zac Rios · 2025
              </div>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--c-text)', margin: '0 0 8px', lineHeight: 1.3 }}>
                New Construction Homes Are Falling Apart
              </h3>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--c-text-muted)', lineHeight: 1.5 }}>
                Documents rushed timelines, skipped foundation curing, builder obstruction of independent inspectors, and the "jail view" Miami apartment crisis. One of the most comprehensive visual investigations into the 2025 U.S. new construction quality crisis.
              </p>
            </div>
          </div>
        </a>
      </section>

      {/* ── Sources ── */}
      <SourcesDropdown sources={SOURCES} />
    </div>
  )
}
