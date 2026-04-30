import 'dotenv/config'
import mongoose from 'mongoose'
import Issue from './src/models/issue.model.js'

// ─────────────────────────────────────────────────────────────
// Base URL for static media served from the uploads/ directory
// ─────────────────────────────────────────────────────────────
const BASE = 'http://localhost:5000/uploads'

/**
 * Seed issues based on real-world construction defects documented
 * across multiple inspection industry sources and the 2025 US
 * housing quality crisis.
 *
 * Sources:
 *   - housing.com/news/common-construction-defects-in-buildings/
 *   - eliteinspections.com/10-common-construction-defects-found-during-inspections/
 *   - ownerinspections.com.au/articles/australias-top-10-most-common-building-defects
 *   - realtors.co.ke/signs-of-poor-construction-in-apartments/
 *   - builderconnect.co.nz/blog/10-warning-signs-of-poor-quality-construction-work/
 *   - homeinspectioninsider.com/home-inspection-structural-issues/
 *   - shreepadgroup.com/blogs/signs-of-poor-construction-property-visit/
 *   - "New Construction Homes Are Falling Apart" — Zac Rios (2025)
 *     https://www.youtube.com/watch?v=w4Rr8tLHrpo
 *
 * All photos are stored locally in uploads/ and used strictly
 * for development and educational purposes.
 */
export const INITIAL_ISSUES = [
  // ── WATER ─────────────────────────────────────────────
  {
    title: 'Active water leak behind kitchen drywall — membrane failure',
    description:
      'Growing damp patch discovered on the kitchen wall near the sink connection. Paint is bubbling, drywall is soft to the touch, and water pools at the baseboard overnight. ' +
      'Water leaks and waterproofing failures are the most reported building defect globally. According to Owner Inspections Australia, common causes include poor application of waterproofing membranes, deterioration of sealants around wet areas, and movement in the building causing membrane cracking. ' +
      'Warning signs include water stains on ceilings or walls below wet areas, musty odours, peeling paint, and damp or soft flooring — all of which are present here. ' +
      'Prolonged exposure leads to structural timber decay, mould growth posing health risks, and damage to finishes and fixtures. Rectification can be costly, particularly where tiling and finishes must be removed to access the membrane. ' +
      '[Source: ownerinspections.com.au — Water Leaks and Waterproofing Issues]',
    category: 'water',
    severity: 'critical',
    status: 'open',
    pinned: true,
    media: [
      { type: 'image', name: 'Water-leakage_1.jpg', size: 85000, mimeType: 'image/jpeg', url: `${BASE}/water/Water-leakage_1.jpg` },
      { type: 'image', name: 'Water-leakage_2.jpeg', size: 92000, mimeType: 'image/jpeg', url: `${BASE}/water/Water-leakage_2.jpeg` },
    ],
  },

  // ── ELECTRICAL ────────────────────────────────────────
  {
    title: 'Exposed wiring behind outlet — no ground, no wire nuts',
    description:
      'Removed the outlet cover in the living room and discovered bare copper wiring with no grounding conductor. Wires are loosely twisted together without wire nuts or proper junction box containment. ' +
      'According to housing.com, faulty electrical systems pose serious safety hazards including fire risk, electrical shorts, and power outages. Frequently seen issues include insecure wiring, overloaded circuits, dead outlets, tripping breakers, and improper installation of electrical components. ' +
      'The NFPA (National Fire Protection Association) reports that four out of every five home fires caused by electrical distribution are attributed to electrical failures or malfunctions (cited by Elite Inspections). ' +
      'Owner Inspections Australia notes that electrical defects are a leading cause of house fires, often resulting from ageing wiring, DIY work without licensed electricians, and overloaded circuits. Warning signs include frequently tripping circuit breakers, flickering lights, warm or discoloured power points, and burning smells from switches. ' +
      '[Sources: housing.com — Faulty Electrical Systems; eliteinspections.com — Electrical Hazards; ownerinspections.com.au — Electrical Issues]',
    category: 'electrical',
    severity: 'critical',
    status: 'in_progress',
    media: [
      { type: 'image', name: 'electrical_1.jpg', size: 78000, mimeType: 'image/jpeg', url: `${BASE}/electrical/electrical_1.jpg` },
      { type: 'image', name: 'electrical_2.jpg', size: 81000, mimeType: 'image/jpeg', url: `${BASE}/electrical/electrical_2.jpg` },
    ],
  },

  // ── HVAC ──────────────────────────────────────────────
  {
    title: 'AC compressor rattling — blowing warm air at 68°F setting',
    description:
      'Central AC unit has been blowing lukewarm air for 3 days despite thermostat set to 68°F. Audible rattling coming from the outdoor compressor unit during operation cycles. ' +
      'Elite Inspections identifies HVAC installation errors as a top-10 construction defect. Three major defects are undersized systems, faulty ductwork, and ineffective system placement — all translating to poor air circulation and increased energy expenses. ' +
      'The property was listed as "move-in ready" but the HVAC system was never pressure-tested or commissioned before occupancy. In 2025, independent inspection reports frequently cite improperly installed HVAC systems in new builds where builders rush to meet closing deadlines (Zac Rios, 2025). ' +
      'Builder Connect NZ notes that inconsistent indoor temperatures and rooms that are noticeably hotter or colder than others are key warning signs of HVAC defects. ' +
      '[Sources: eliteinspections.com — HVAC Installation Errors; builderconnect.co.nz — Warning Signs of Poor Construction]',
    category: 'hvac',
    severity: 'high',
    status: 'open',
    media: [
      { type: 'image', name: 'broken_AC.jpeg', size: 105000, mimeType: 'image/jpeg', url: `${BASE}/hvac/broken_AC.jpeg` },
    ],
  },

  // ── PEST ──────────────────────────────────────────────
  {
    title: 'Pantry weevil infestation — spreading through unsealed gaps',
    description:
      'Weevils discovered in sealed rice bag. Inspection revealed larvae in flour, cereal, and cabinet shelf crevices. Infestation likely originated from unsealed gaps between countertop and wall where caulking was never applied during construction. ' +
      'Elite Inspections notes that inadequate window and door installation creates spaces that allow pests into living areas. Shreepad Group identifies pest entry points as a sign of poor construction quality — specifically gaps between wall junctions, poorly sealed window frames, and missing weatherstripping. ' +
      'Realtors Kenya highlights that visible cracks and gaps in walls, floors, and ceilings are direct indicators of poor-quality construction that allow moisture entry and pest infiltration. ' +
      'In speed-built developments, builders frequently skip finish-work sealing to hit delivery dates, leaving unsealed penetrations that become pest highways (Zac Rios, 2025). ' +
      '[Sources: eliteinspections.com — Window and Door Installation Flaws; shreepadgroup.com — Signs of Poor Construction; realtors.co.ke — Signs of Poor Construction in Apartments]',
    category: 'pest',
    severity: 'high',
    status: 'in_progress',
    media: [
      { type: 'image', name: 'pest_1.jpg', size: 67000, mimeType: 'image/jpeg', url: `${BASE}/pest/pest_1.jpg` },
      { type: 'image', name: 'weevels_2.jpg', size: 71000, mimeType: 'image/jpeg', url: `${BASE}/pest/weevels_2.jpg` },
    ],
  },

  // ── STRUCTURAL ────────────────────────────────────────
  {
    title: 'Diagonal crack from window frame to ceiling — foundation settlement',
    description:
      'A diagonal crack approximately 18 inches long has appeared on the bedroom wall, running from the window frame corner toward the ceiling. The crack is wide enough to insert a coin into. ' +
      'According to housing.com, foundation problems due to improper measurement and construction lead to major structural issues including wall cracks, floor slab cracking, misalignment of doors, and uneven flooring. Common causes include insufficient foundation depth, clayey soil with high sulphate content, soft spots in soil, and inadequate landfill support. ' +
      'Owner Inspections Australia identifies diagonal cracks above door and window frames as a primary warning sign of building movement (subsidence). Cracks wider than 2mm or those that are growing indicate active settlement, often caused by reactive clay soils or inadequate footing design for soil conditions. ' +
      'Home Inspection Insider confirms that diagonal cracking typically indicates differential settlement, where one part of the foundation sinks more than another. ' +
      'Builder Connect NZ lists uneven floors and visible cracks as critical warning signs, noting that structural framing errors usually result from rushed work or poor planning during construction. ' +
      '[Sources: housing.com — Foundation and Structural Damages; ownerinspections.com.au — Cracking + Building Movement; homeinspectioninsider.com — Structural Issues; builderconnect.co.nz — Structural Framing Errors]',
    category: 'structural',
    severity: 'critical',
    status: 'open',
    pinned: true,
    media: [
      { type: 'image', name: 'structural_issue_1.png', size: 120000, mimeType: 'image/png', url: `${BASE}/structural/structural_issue_1.png` },
      { type: 'image', name: 'structural_2.jpeg', size: 95000, mimeType: 'image/jpeg', url: `${BASE}/structural/structural_2.jpeg` },
    ],
  },

  // ── APPLIANCES ────────────────────────────────────────
  {
    title: 'Refrigerator compressor coil crushed — food spoiling within 24hrs',
    description:
      'Refrigerator stopped cooling effectively 2 weeks after move-in. Pulled the unit from the wall and found the compressor coil is bent and partially crushed — damaged during the builder\'s installation. Food is spoiling within 24 hours. ' +
      'The unit was listed as a "new builder-grade appliance" but shows clear signs of impact damage from improper handling. ' +
      'Shreepad Group notes that broken or malfunctioning fixtures within weeks of occupancy are a direct indicator of poor construction quality and careless installation practices. Tiles, fixtures, and appliances that fail early suggest the use of substandard materials or rough handling during the building phase. ' +
      'Realtors Kenya highlights that fixtures and fittings that break easily or show wear within a short period are signs of the use of low-quality, substandard materials by the builder. ' +
      'Zac Rios (2025) documents multiple cases where builders place time restrictions on inspectors, often forbidding testing of key components like appliances, HVAC, and electrical panels before closing. ' +
      '[Sources: shreepadgroup.com — Signs of Poor Construction; realtors.co.ke — Signs of Poor Construction in Apartments]',
    category: 'appliances',
    severity: 'high',
    status: 'closed',
    closureNote: 'Landlord replaced the entire refrigerator unit after confirming the compressor coil was damaged during original builder installation. New Samsung unit verified working at 37°F.',
    media: [
      { type: 'image', name: 'broken_coil_fridge.jpeg', size: 88000, mimeType: 'image/jpeg', url: `${BASE}/appliances/broken_coil_fridge.jpeg` },
    ],
  },

  // ── SECURITY ──────────────────────────────────────────
  {
    title: 'Smoke detector ripped from ceiling — no backup fire detection',
    description:
      'Hallway smoke detector has been forcibly removed from its mounting bracket. Wires dangle from the ceiling. No secondary or battery-operated backup unit exists in the apartment. ' +
      'Owner Inspections Australia lists inadequate fire safety measures as a top-10 building defect. Common issues include missing or non-functional smoke alarms, incomplete fire-rated construction, blocked fire exits, and non-compliant fire doors. ' +
      'Warning signs include smoke alarms that are missing, expired, or disconnected, and gaps around penetrations through fire-rated walls and floors. Fire safety deficiencies place occupants at direct risk of injury or death. ' +
      'Housing.com notes that faulty electrical connections to safety systems can increase fire risk across the entire building. Non-compliance with fire safety regulations creates legal liability for building owners. ' +
      'The building was supposedly code-inspected before occupancy, but this unit clearly has no functioning fire detection system — a direct life-safety violation. ' +
      '[Sources: ownerinspections.com.au — Inadequate Fire Safety Measures; housing.com — Faulty Electrical Systems]',
    category: 'security',
    severity: 'critical',
    status: 'in_progress',
    media: [
      { type: 'image', name: 'broken-fire-alarm-on-a-wall.jpg', size: 73000, mimeType: 'image/jpeg', url: `${BASE}/security/broken-fire-alarm-on-a-wall.jpg` },
      { type: 'image', name: 'broken-home-alarm-system-destroyed-1.webp', size: 65000, mimeType: 'image/webp', url: `${BASE}/security/broken-home-alarm-system-destroyed-1.webp` },
    ],
  },

  // ── MAINTENANCE ───────────────────────────────────────
  {
    title: 'Cabinet hardware failing — hinges screwed into drywall, not studs',
    description:
      'Multiple kitchen cabinet knobs are loose or have fallen off. Hinges on 3 upper cabinets are stiff and squeaking — never lubricated during installation. One door has started sagging because the top hinge screws were driven into drywall instead of a stud. ' +
      'Builder Connect NZ identifies poor finishing quality as a key warning sign of substandard construction work. Uneven paint application, gaps between mouldings and walls, poorly aligned fixtures and cabinet doors that don\'t close properly all point to a lack of care in workmanship. ' +
      'Shreepad Group notes that when builders cut corners on fit-and-finish items like cabinet hardware, door handles, and drawer slides, it suggests the same shortcuts were likely taken on more critical systems hidden behind the walls. ' +
      'Housing.com explains that poor maintenance combined with original construction shortcuts causes accelerated deterioration — small defects left unaddressed compound into structural problems over time. ' +
      '[Sources: builderconnect.co.nz — Poor Finishing Quality; shreepadgroup.com — Signs of Poor Construction; housing.com — Causes for Common Structure Issues]',
    category: 'maintenance',
    severity: 'low',
    status: 'closed',
    closureNote: 'Re-anchored all cabinet knobs with longer screws into studs. Applied silicone lubricant to all hinges. Replaced the sagging door hinge assembly with a stud-mounted bracket. All cabinets now close and operate smoothly.',
    media: [
      { type: 'image', name: 'cabinet_knob_failing.jpg', size: 54000, mimeType: 'image/jpeg', url: `${BASE}/maintenance/cabinet_knob_failing.jpg` },
      { type: 'image', name: 'lubricate-hinges.png', size: 62000, mimeType: 'image/png', url: `${BASE}/maintenance/lubricate-hinges.png` },
    ],
  },
]


// ─────────────────────────────────────────────────────────────
// Execution
// ─────────────────────────────────────────────────────────────
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'renttrack' })
    console.log('Connected to MongoDB')

    await Issue.deleteMany({})
    console.log('Cleared existing issues')

    // Build timeline events to match each issue's current status
    const issuesWithTimeline = INITIAL_ISSUES.map(issue => {
      const timeline = [{ type: 'created', note: 'Issue reported' }]

      if (issue.status === 'in_progress') {
        timeline.push({ type: 'status_changed', status: 'in_progress', note: 'Status changed to In Progress' })
      }

      if (issue.status === 'closed') {
        timeline.push({ type: 'status_changed', status: 'in_progress', note: 'Status changed to In Progress' })
        timeline.push({ type: 'closed', note: issue.closureNote || 'Issue resolved' })
        issue.closedAt = new Date()
      }

      return { ...issue, timeline }
    })

    await Issue.insertMany(issuesWithTimeline)
    console.log(`Seeded ${issuesWithTimeline.length} issues with sourced descriptions and media`)

  } catch (error) {
    console.error('SEED ERROR:', error)
  } finally {
    mongoose.connection.close()
    console.log('Disconnected from DB')
  }
}

seedDB()
// updated descriptions with real defect literature
// added citations and static media references
