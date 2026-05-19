// src/lib/constants.js
export const BRAND = {
  name: "Adrish Ghosh",
  tagline: "CSIR NET Life Science",
  email: "theadirsh.ghosh@gmail.com",
  phone: "+918777091519",
  upiId: "theadirsh.ghosh-1@okicici",
};

export const IMAGES = {
  // Replace these with actual URLs or import them from a local assets folder
  hero: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000&auto=format&fit=crop", 
  mentor: "https://i.ibb.co/XxP3kjTm/mentor.jpg",
  qr: "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=upi://pay?pa=theadirsh.ghosh-1@okicici&color=FFFFFF&bgcolor=0B1120",
};

export const FEATURES = [
  { icon: "Brain", title: "Concept-First Approach", body: "Deep dive into molecular biology and biochemistry without relying on rote memorization." },
  { icon: "Target", title: "Targeted PYQs", body: "Solve Section C questions with a researcher's mindset, focusing on experimental data." },
  { icon: "Microscope", title: "Research Oriented", body: "Learn techniques and applied biology directly from real-life lab scenarios." },
  { icon: "FileSearch", title: "In-depth Analysis", body: "Detailed breakdown of the most frequently asked topics in CSIR NET." },
  { icon: "MessageCircleQuestion", title: "Live Doubt Solving", body: "Direct interaction during live classes to clear your concepts instantly." },
  { icon: "BadgeIndianRupee", title: "Affordable Excellence", body: "Premium content and mentorship at a fraction of standard coaching fees." },
];

export const TRUST_BADGES = [
  { icon: "Trophy", label: "CSIR NET AIR 86" },
  { icon: "GraduationCap", label: "IISER Kolkata" },
  { icon: "BookOpen", label: "Khorana Scholar" },
];

export const MENTOR_CARDS = [
  { eyebrow: "Education", title: "BS-MS Dual Degree", body: "Completed integrated BS-MS at IISER Kolkata with a major in Biological Sciences.", accent: "cyan" },
  { eyebrow: "National Rank", title: "CSIR NET AIR 86", body: "Cracked the exam with a top 100 rank, securing the JRF fellowship.", accent: "gold" },
  { eyebrow: "USA Research Stint", title: "Emory University", body: "Selected as a Khorana Scholar '25 for research at Emory University, Atlanta.", accent: "cyan" },
  { eyebrow: "Research Experience", title: "Wet Lab & Comp Bio", body: "Extensive experience in molecular cloning, protein expression, and bioinformatics.", accent: "cyan" },
  { eyebrow: "Medical Entrance", title: "MCAT Qualified", body: "Qualified the MCAT exam (Medical College Admission Test).", accent: "gold" },
  { eyebrow: "Advanced Training", title: "EMBO, Germany", body: "Trained in CRISPR technology at EMBO, Germany.", accent: "cyan" },
];

export const PRICING_INCLUDES = [
  "Live Interactive Classes",
  "Unlimited Recording Access",
  "Doubt Solving Group",
  "High-Yield PDF Notes",
  "Weekly Unit Tests",
  "PYQ Strategy Sessions"
];

export const SYLLABUS_DATA = [
  { unit: 'U3', domain: 'Fundamental Processes (Replication, Transcription, Translation, Repair)', pctB: 14, pctC: 13, density: 'VERY HIGH', dominant: 'C > B', priority: 1 },
  { unit: 'U5', domain: 'Developmental Biology (Drosophila, C. elegans, Xenopus, Mouse, Plant)', pctB: 8, pctC: 15, density: 'VERY HIGH', dominant: 'C >> B', priority: 2 },
  { unit: 'U2', domain: 'Cellular Organization (Membranes, Organelles, Cytoskeleton, Trafficking)', pctB: 13, pctC: 12, density: 'HIGH', dominant: 'B ≈ C', priority: 3 },
  { unit: 'U13', domain: 'Methods in Biology (Microscopy, Chromatography, PCR, Blotting, Statistics)', pctB: 7, pctC: 7, density: 'HIGH', dominant: 'C > B', priority: 3 },
  { unit: 'U4', domain: 'Cell Communication & Signaling (RTKs, GPCRs, cAMP, Wnt, Hedgehog)', pctB: 8, pctC: 10, density: 'HIGH', dominant: 'C > B', priority: 4 },
  { unit: 'U8', domain: 'Inheritance Biology (Genetics, Linkage, QTL, Epigenetics, Population)', pctB: 10, pctC: 9, density: 'HIGH', dominant: 'B > C', priority: 5 },
  { unit: 'U6', domain: 'Plant Physiology (Hormones, Photosynthesis, Defense, Water Relations)', pctB: 9, pctC: 9, density: 'HIGH', dominant: 'B ≈ C', priority: 6 },
  { unit: 'U1', domain: 'Molecules & Interactions (Biochemistry, Enzyme Kinetics, Protein Structure)', pctB: 12, pctC: 14, density: 'HIGH', dominant: 'C > B', priority: 7 },
  { unit: 'U7', domain: 'Animal Physiology (Renal, Cardiac, Neural, Endocrine)', pctB: 9, pctC: 9, density: 'HIGH', dominant: 'B ≈ C', priority: 8 },
  { unit: 'U12', domain: 'Applied Biology (Immunology, Microbiology, Biotech, GMOs)', pctB: 6, pctC: 5, density: 'MODERATE', dominant: 'B > C', priority: 8 },
  { unit: 'U11', domain: 'Evolution & Behavior (Selection, Speciation, Ethology, Foraging)', pctB: 5, pctC: 6, density: 'MODERATE', dominant: 'C > B', priority: 9 },
  { unit: 'U9', domain: 'Diversity of Life Forms (Taxonomy, Phylogeny, Systematics)', pctB: 5, pctC: 4, density: 'MODERATE', dominant: 'B > C', priority: 10 },
  { unit: 'U10', domain: 'Ecological Principles (Population, Community, Ecosystem, Conservation)', pctB: 8, pctC: 8, density: 'HIGH', dominant: 'C > B', priority: 10 },
];

export const KEY_FINDINGS = [
  { icon: "⚠️", type: "warn", text: "U3 + U5 dominate Section C — Drosophila segmentation, mRNA splicing, and Xenopus axis patterning confirm this bias." },
  { icon: "📌", type: "info", text: "U8 + U1 dominate Section B — Hardy-Weinberg, enzyme kinetics, and protein structure appear across every shift." },
  { icon: "🚨", type: "alert", text: "U13 is systematically underestimated — Every paper contains 3–5 experimental design questions in Part C." },
  { icon: "🔗", type: "warn", text: "Inter-unit hybrids are the norm in Section C — particularly U3+U13, U5+U4, and U10+U11." }
];
