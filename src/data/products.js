export const CATEGORIES = [
  { id: 'all', label: 'All objects' },
  { id: 'lighting', label: 'Lighting' },
  { id: 'drafting', label: 'Writing & drafting' },
  { id: 'desk', label: 'Desk organization' },
  { id: 'hardware', label: 'Hardware' },
];

export const PRODUCTS = [
  {
    id: 'kw-01',
    catalogNo: 'KW-01',
    name: 'Articulated cantilever lamp',
    category: 'lighting',
    price: 240,
    weightGrams: 1480,
    dimensions: '420 × 160 mm',
    material: 'Unlacquered C36000 brass & cast iron',
    finish: 'Raw machined brass / Charcoal iron base',
    batch: 'Batch 09 · 14 units remaining',
    tolerance: '±0.02 mm pivot journal',
    origin: 'Kyoto machine shop',
    summary:
      'Counterbalanced desk light with friction-locked brass joints and a warm 2700K high-CRI ceramic LED module',
    agingNote:
      'Joint sleeves darken where adjusted by hand within three weeks of daily studio use',
    visualType: 'lamp',
    featured: true,
  },
  {
    id: 'kw-02',
    catalogNo: 'KW-02',
    name: 'Triangular architects scale',
    category: 'drafting',
    price: 68,
    weightGrams: 210,
    dimensions: '300 × 22 mm',
    material: 'Solid C36000 free-cutting brass',
    finish: 'Brushed satin with acid-etched markings',
    batch: 'Batch 09 · In stock',
    tolerance: '±0.01 mm graduation pitch',
    origin: 'Osaka precision mill',
    summary:
      'Six metric ratios deeply etched and hand-filled with carbon lampblack ink for zero-glare reading under task lights',
    agingNote:
      'Beveled edges polish to a warm amber sheen along the thumb chamfer over months of drafting',
    visualType: 'ruler',
  },
  {
    id: 'kw-03',
    catalogNo: 'KW-03',
    name: 'Knurled lead holder 2.0 mm',
    category: 'drafting',
    price: 54,
    weightGrams: 46,
    dimensions: '142 × 9.5 mm',
    material: 'Turned brass barrel & tool-steel jaws',
    finish: 'Diamond-pitch lathe knurl',
    batch: 'Batch 09 · In stock',
    tolerance: '3-jaw hardened collet',
    origin: 'Kyoto machine shop',
    summary:
      'Front-weighted mechanical clutch pencil balanced at the index finger rest, ships with six 2B graphite leads',
    agingNote:
      'Knurled grip collects natural skin oils and transitions from bright gold to deep bronze',
    visualType: 'pencil',
  },
  {
    id: 'kw-04',
    catalogNo: 'KW-04',
    name: 'Fluted walnut pen tray',
    category: 'desk',
    price: 85,
    weightGrams: 340,
    dimensions: '240 × 84 mm',
    material: 'Kiln-dried claro walnut & brass feet',
    finish: 'Hand-rubbed tung oil & beeswax',
    batch: 'Batch 09 · 9 units remaining',
    tolerance: '4 milled parallel channels',
    origin: 'Portland woodshop',
    summary:
      'Carved from a single plank of Pacific Northwest walnut with four radiused grooves that prevent cylindrical tools from rolling',
    agingNote:
      'Heartwood grain deepens in contrast when exposed to indirect morning window light',
    visualType: 'tray',
  },
  {
    id: 'kw-05',
    catalogNo: 'KW-05',
    name: 'Cast iron paper anvil',
    category: 'desk',
    price: 48,
    weightGrams: 820,
    dimensions: '96 × 48 mm',
    material: 'Sand-cast grey iron & Portuguese cork',
    finish: 'Baked linseed oil patina',
    batch: 'Batch 09 · In stock',
    tolerance: '2.5 mm recessed cork base',
    origin: 'Iwate foundry',
    summary:
      'Heavy low-profile paperweight shaped to hold rolled A1 architectural drawings flat without creasing the vellum',
    agingNote:
      'Linseed finish resists rust while developing a smooth graphite luster on the lifting ridge',
    visualType: 'weight',
  },
  {
    id: 'kw-06',
    catalogNo: 'KW-06',
    name: 'Rotary dimmer desk switch',
    category: 'hardware',
    price: 110,
    weightGrams: 490,
    dimensions: '88 × 88 mm',
    material: 'Bead-blasted aluminum & solid brass dial',
    finish: 'Natural anodize with 32-detent encoder',
    batch: 'Batch 09 · 6 units remaining',
    tolerance: 'Weighted 180g brass knob',
    origin: 'Kyoto machine shop',
    summary:
      'Inline desktop lighting controller with tactile mechanical detents and braided linen cord for studio lamps',
    agingNote:
      'Indicator notch on the brass dial stays bright while the knurled perimeter darkens',
    visualType: 'dimmer',
  },
  {
    id: 'kw-07',
    catalogNo: 'KW-07',
    name: 'Bookbinders brass shears',
    category: 'drafting',
    price: 95,
    weightGrams: 195,
    dimensions: '205 × 64 mm',
    material: 'High-carbon Yasugi steel & brass pivot',
    finish: 'Hammered黒打 (Kurouchi) blades',
    batch: 'Batch 09 · In stock',
    tolerance: 'Adjustable tension pivot screw',
    origin: 'Sakai bladesmith',
    summary:
      'Hollow-ground blades tensioned with a slotted brass machine screw for clean single-pass cuts through heavy cotton stock',
    agingNote:
      'Can be disassembled via the central brass screw for honing on a 3000-grit waterstone',
    visualType: 'shears',
  },
  {
    id: 'kw-08',
    catalogNo: 'KW-08',
    name: 'Monolithic bookend pair',
    category: 'desk',
    price: 140,
    weightGrams: 2640,
    dimensions: '160 × 120 mm',
    material: '6 mm bent architectural bronze plate',
    finish: 'Directional satin grain & cork pads',
    batch: 'Batch 09 · 8 sets remaining',
    tolerance: '90.0° press-brake bend',
    origin: 'Osaka precision mill',
    summary:
      'A pair of heavy L-section bronze plates engineered to support tall quarto monographs and material sample binders',
    agingNote:
      'Architectural bronze oxidizes slowly toward an olive-umber museum finish over five years',
    visualType: 'bookend',
  },
];

export const MATERIALS_DATA = [
  {
    id: '01',
    name: 'Unlacquered C36000 Brass',
    summary:
      'We machine our barrels, scales, and lamp joints from solid free-cutting brass bar stock and leave the surface bare of synthetic urethane coatings. Where your hands touch the metal most often, it records the history of your work.',
    specs: [
      { label: 'Alloy composition', value: '61.5% Cu · 35.5% Zn · 3.0% Pb' },
      { label: 'Density', value: '8.50 g/cm³' },
      { label: 'Surface treatment', value: '320-grit lathe satin, uncoated' },
      { label: 'Machining tolerance', value: '±0.02 mm' },
    ],
  },
  {
    id: '02',
    name: 'Kiln-Dried Claro Walnut',
    summary:
      'Sourced from salvaged orchard and windfall logs in Oregon, air-dried for eighteen months before slow kiln stabilization and CNC fluting. Finished exclusively with pure tung oil and raw beeswax.',
    specs: [
      { label: 'Moisture content', value: '7.5% ± 0.5%' },
      { label: 'Janka hardness', value: '1,130 lbf' },
      { label: 'Finish coat', value: 'Polymerized tung oil & wax' },
    ],
  },
  {
    id: '03',
    name: 'Sand-Cast Iwate Grey Iron',
    summary:
      'Poured into green-sand molds for our lamp bases and paper anvils, yielding a dense, vibration-damping mass with a pebble grain that anchors articulated tools without clamping to the table.',
    specs: [
      { label: 'Casting method', value: 'Traditional green-sand mold' },
      { label: 'Patina', value: '420°C baked linseed oil' },
      { label: 'Underside pad', value: '2.5 mm high-density cork' },
    ],
  },
];
