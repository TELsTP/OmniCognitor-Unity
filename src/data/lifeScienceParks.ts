export interface LifeSciencePark {
  name: string;
  location: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  contact: string;
  specialization: string[];
  priority: string;
  strategicValue: string;
}

export const LIFE_SCIENCE_PARKS: LifeSciencePark[] = [
  {
    name: "Cambridge Biomedical Campus",
    location: "Cambridge, UK",
    email: "hello@cambridge-biomedical.com",
    phone: "+44 1223 348490",
    address: "Hills Road, Cambridge, CB2 0QQ, United Kingdom",
    website: "https://cambridge-biomedical.com/",
    contact: "Industry Partnerships Team",
    specialization: ["Genomics", "Precision Medicine", "Clinical Research", "Medical Devices"],
    priority: "High",
    strategicValue: "World-leading genomics research hub, established university partnerships, advanced clinical trials infrastructure"
  },
  {
    name: "Singapore Biopolis",
    location: "Singapore",
    email: "attract@sbic.a-star.edu.sg",
    phone: "+65 6478 8298",
    address: "30 Biopolis Street, Singapore 138671",
    website: "https://www.a-star.edu.sg/",
    contact: "Christopher Leck - Chief International Partnerships Officer",
    specialization: ["Biomedical Research", "Drug Discovery", "Biomarkers", "International Collaboration"],
    priority: "High",
    strategicValue: "Gateway to Asia-Pacific market, strong government backing, multinational pharma presence"
  },
  {
    name: "Research Triangle Park",
    location: "North Carolina, USA",
    email: "communications@rtp.org",
    phone: "+1 919 541 9366",
    address: "700 Park Offices Drive, Suite 007, Research Triangle Park, NC 27709",
    website: "https://www.rtp.org/",
    contact: "RTP Foundation Partnership Team",
    specialization: ["Biotechnology", "Pharmaceuticals", "Medical Devices", "University Collaboration"],
    priority: "High",
    strategicValue: "Largest research park in North America, strong industry-academia model, established success framework"
  },
  {
    name: "Boston Biotech Cluster (MassBio)",
    location: "Boston/Cambridge, Massachusetts, USA",
    email: "info@massbio.org",
    phone: "+1 617 674 5100",
    address: "300 Technology Square, Cambridge, MA 02139",
    website: "https://www.massbio.org/",
    contact: "Partnership Development Team",
    specialization: ["Biotech Innovation", "Drug Development", "Venture Capital", "Startup Ecosystem"],
    priority: "High",
    strategicValue: "World's largest biotech cluster, extensive VC network, leading universities, mature ecosystem"
  },
  {
    name: "Medicon Valley Alliance",
    location: "Copenhagen, Denmark / Malmö, Sweden",
    email: "mva@mva.org",
    phone: "+45 70 20 15 03",
    address: "Arne Jacobsens Allé 15, 2., DK-2300 Copenhagen S, Denmark",
    website: "https://mva.org/",
    contact: "David Munis Zepernick - Head of Communication & Public Affairs",
    specialization: ["Life Sciences", "Medical Technology", "Cross-border Collaboration", "Nordic Innovation"],
    priority: "High",
    strategicValue: "Cross-border collaboration model, strong pharma presence, Nordic healthcare expertise"
  },
  {
    name: "Switzerland Innovation Park Basel Area",
    location: "Basel, Switzerland",
    email: "baselarea@switzerland-innovation.com",
    phone: "+41 61 577 23 16",
    address: "Hegenheimermattweg 167A, 4123 Allschwil, Switzerland",
    website: "https://sip-baselarea.com/",
    contact: "Partnership Development Team",
    specialization: ["Pharmaceuticals", "Life Sciences", "Healthcare Technology", "Innovation"],
    priority: "High",
    strategicValue: "Home to major pharma companies (Novartis, Roche), regulatory expertise, European market access"
  },
  {
    name: "Oxford Science Park",
    location: "Oxford, UK",
    email: "info@oxfordsp.com",
    phone: "+44 1865 784466",
    address: "Robert Robinson Avenue, Oxford OX4 4GA, United Kingdom",
    website: "https://oxfordsp.com/",
    contact: "Business Development Team",
    specialization: ["Technology Transfer", "Life Sciences", "Medical Devices", "University Spin-offs"],
    priority: "Medium",
    strategicValue: "University of Oxford connection, technology transfer expertise, strategic UK location"
  },
  {
    name: "Heidelberg Technology Park",
    location: "Heidelberg, Germany",
    email: "info@technologiepark-heidelberg.de",
    phone: "+49 6221 649 0",
    address: "Technologiepark Heidelberg, Im Neuenheimer Feld 583, 69120 Heidelberg",
    website: "https://www.technologiepark-heidelberg.de/",
    contact: "International Partnerships Team",
    specialization: ["Biotechnology", "Life Sciences", "Medical Technology", "Cancer Research"],
    priority: "Medium",
    strategicValue: "German biotech expertise, cancer research focus, European market position"
  },
  {
    name: "Wellcome Genome Campus",
    location: "Cambridge, UK",
    email: "hello@wellcomegenomecampus.com",
    phone: "+44 1223 834244",
    address: "Wellcome Genome Campus, Hinxton, Cambridge, CB10 1SA",
    website: "https://www.wellcomegenomecampus.org/",
    contact: "Partnerships and Projects Team",
    specialization: ["Genomics", "Computational Biology", "Data Science", "Global Health"],
    priority: "High",
    strategicValue: "World-leading genomics research, data science expertise, global health focus"
  },
  {
    name: "Montreal Biotech Cluster",
    location: "Montreal, Canada",
    email: "info@montreal-biotech.com",
    phone: "+1 514 636 6414",
    address: "Montreal, Quebec, Canada",
    website: "https://www.montreal-biotech.com/",
    contact: "Business Development Team",
    specialization: ["Biotechnology", "Pharmaceuticals", "Medical Devices", "AI in Healthcare"],
    priority: "Medium",
    strategicValue: "North American market access, bilingual advantage, government support"
  },
  {
    name: "Tel Aviv Biotech Hub",
    location: "Tel Aviv, Israel",
    email: "office@cbi.co.il",
    phone: "+972 3 612 1616",
    address: "Azrieli Center, Triangle Building 45th flr., Tel Aviv 67023, Israel",
    website: "https://www.cbi.co.il/",
    contact: "Partnership Development Team",
    specialization: ["Digital Health", "Medical Technology", "Precision Medicine", "Innovation"],
    priority: "High",
    strategicValue: "Middle East hub, innovation culture, digital health expertise, regional proximity"
  },
  {
    name: "San Francisco Bay Area Life Sciences",
    location: "San Francisco, California, USA",
    email: "info@bayarealifesciences.org",
    phone: "+1 415 000 0000",
    address: "San Francisco Bay Area, California, USA",
    website: "https://www.bayarealifesciences.org/",
    contact: "Regional Partnership Team",
    specialization: ["Biotech Innovation", "Digital Health", "Venture Capital", "Technology"],
    priority: "High",
    strategicValue: "Silicon Valley proximity, venture capital access, technology integration"
  },
  {
    name: "San Diego Biotech Cluster",
    location: "San Diego, California, USA",
    email: "info@biocom.org",
    phone: "+1 858 455 0300",
    address: "San Diego, California, USA",
    website: "https://www.biocom.org/",
    contact: "Partnership Development Team",
    specialization: ["Biotechnology", "Medical Devices", "Therapeutics", "Clinical Trials"],
    priority: "Medium",
    strategicValue: "Major biotech hub, clinical trials expertise, industry concentration"
  },
  {
    name: "BioMed Realty International",
    location: "San Diego, California, USA",
    email: "info@biomedrealty.com",
    phone: "+1 858 485 9840",
    address: "4570 Executive Drive Suite 400, San Diego, CA 92121",
    website: "https://www.biomedrealty.com/",
    contact: "International Partnerships Team",
    specialization: ["Real Estate Solutions", "Infrastructure Development", "Life Sciences Facilities"],
    priority: "Medium",
    strategicValue: "Infrastructure expertise, global presence, facility development experience"
  },
  {
    name: "Philadelphia Life Sciences Cluster",
    location: "Philadelphia, Pennsylvania, USA",
    email: "info@philadelphialifesciences.org",
    phone: "+1 215 000 0000",
    address: "Philadelphia, Pennsylvania, USA",
    website: "https://www.philadelphialifesciences.org/",
    contact: "Regional Development Team",
    specialization: ["Pharmaceuticals", "Cell and Gene Therapy", "Clinical Research"],
    priority: "Medium",
    strategicValue: "Cell and gene therapy leadership, clinical research capabilities"
  },
  {
    name: "London Life Sciences Cluster",
    location: "London, UK",
    email: "info@londonlifesciences.com",
    phone: "+44 20 0000 0000",
    address: "London, United Kingdom",
    website: "https://www.londonlifesciences.com/",
    contact: "Partnership Development Team",
    specialization: ["Life Sciences", "Financial Services", "Regulatory Affairs", "International Trade"],
    priority: "Medium",
    strategicValue: "Financial center, regulatory expertise, international business hub"
  },
  {
    name: "Shanghai Biotech Hub",
    location: "Shanghai, China",
    email: "info@shanghailifesciences.cn",
    phone: "+86 21 0000 0000",
    address: "Shanghai, China",
    website: "https://www.shanghailifesciences.cn/",
    contact: "International Cooperation Team",
    specialization: ["Traditional Medicine", "Modern Therapeutics", "Manufacturing", "Research"],
    priority: "High",
    strategicValue: "Chinese market access, traditional medicine expertise, manufacturing capabilities"
  },
  {
    name: "Tokyo Life Sciences Cluster",
    location: "Tokyo, Japan",
    email: "info@tokyolifesciences.jp",
    phone: "+81 3 0000 0000",
    address: "Tokyo, Japan",
    website: "https://www.tokyolifesciences.jp/",
    contact: "International Relations Team",
    specialization: ["Precision Medicine", "Medical Devices", "Aging Research", "Technology"],
    priority: "Medium",
    strategicValue: "Japanese technology, aging population research, precision medicine"
  },
  {
    name: "Sydney Life Sciences Precinct",
    location: "Sydney, Australia",
    email: "info@sydneylifesciences.com.au",
    phone: "+61 2 0000 0000",
    address: "Sydney, New South Wales, Australia",
    website: "https://www.sydneylifesciences.com.au/",
    contact: "Partnership Development Team",
    specialization: ["Medical Research", "Clinical Trials", "Biotechnology", "University Collaboration"],
    priority: "Medium",
    strategicValue: "Asia-Pacific access, clinical trials expertise, university partnerships"
  },
  {
    name: "Toronto Life Sciences Cluster",
    location: "Toronto, Canada",
    email: "info@torontolifesciences.ca",
    phone: "+1 416 000 0000",
    address: "Toronto, Ontario, Canada",
    website: "https://www.torontolifesciences.ca/",
    contact: "Business Development Team",
    specialization: ["AI in Healthcare", "Digital Health", "Medical Devices", "Research"],
    priority: "Medium",
    strategicValue: "AI healthcare integration, multicultural market, North American access"
  }
];
