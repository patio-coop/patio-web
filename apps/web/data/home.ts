export type Cooperative = {
  name: string;
  region: string;
  country: string;
  members: number;
  services: string[];
  website: string;
  email: string;
  description: string;
};

export const navItems = [
  {
    index: "01",
    label: "Who we are",
    href: "#who-we-are"
  },
  {
    index: "02",
    label: "What we do",
    href: "#what-we-do",
    groups: [
      {
        label: "Industries",
        items: [
          "AI Product Dev",
          "Government Tech",
          "Web 3",
          "CyberSecurity",
          "HealthTech",
          "EdTech",
          "FinTech"
        ]
      },
      {
        label: "Services",
        items: [
          "Full-Stack Development",
          "UI/UX Design & Animation",
          "Branding & Creative",
          "Mobile Development",
          "DevOps",
          "Blockchain",
          "Machine Learning"
        ]
      }
    ]
  },
  {
    index: "03",
    label: "How we work",
    href: "#how-we-work",
    groups: [
      {
        label: "Our model",
        items: ["Membership Model", "Ways to Qualify"]
      }
    ]
  },
  {
    index: "04",
    label: "Our philosophy",
    href: "#philosophy"
  },
  {
    index: "05",
    label: "Community building",
    href: "#community"
  }
];

export const stats = [
  { value: "80+", label: "cooperatives" },
  { value: "1.500", label: "members" },
  { value: "24+", label: "countries" },
  { value: "40+", label: "digital services" }
];

export const cooperatives: Cooperative[] = [
  {
    name: "Camplight",
    region: "Europe",
    country: "Bulgaria",
    members: 42,
    services: [
      "AI Development",
      "Software Development",
      "Mobile Development",
      "Product Development"
    ],
    website: "https://camplight.net",
    email: "hi@camplight.net",
    description:
      "Camplight is a global network of digital artisans evolving human collaboration through software."
  },
  {
    name: "Animus",
    region: "Europe",
    country: "Italy",
    members: 18,
    services: ["Branding", "Creative", "UI/UX", "Animation"],
    website: "https://patio.coop",
    email: "hello@patio.coop",
    description:
      "A cooperative studio focused on identity, product experience, and digital storytelling."
  },
  {
    name: "CocosoLab",
    region: "Europe",
    country: "Spain",
    members: 21,
    services: ["Software Development", "Product Strategy", "DevOps"],
    website: "https://patio.coop",
    email: "hello@patio.coop",
    description:
      "A technology cooperative building resilient products and long-term software partnerships."
  },
  {
    name: "Eryx",
    region: "Americas",
    country: "Argentina",
    members: 27,
    services: ["Web 3", "FinTech", "CyberSecurity"],
    website: "https://patio.coop",
    email: "hello@patio.coop",
    description:
      "An engineering collective working across secure digital systems, fintech, and decentralized products."
  },
  {
    name: "Focus",
    region: "Europe",
    country: "Germany",
    members: 15,
    services: ["HealthTech", "Education Tech", "Research"],
    website: "https://patio.coop",
    email: "hello@patio.coop",
    description:
      "A cooperative team helping mission-driven organizations design and ship useful digital services."
  },
  {
    name: "Cambá",
    region: "Americas",
    country: "Argentina",
    members: 38,
    services: ["Government Tech", "Training", "Open Source"],
    website: "https://patio.coop",
    email: "hello@patio.coop",
    description:
      "A cooperative committed to open source, public-interest technology, and technical education."
  }
];

export const industries = [
  "AI Product Dev",
  "Government Tech",
  "Web 3",
  "Cyber Security",
  "Health Tech",
  "Education Tech",
  "Financial Tech"
];

export const services = [
  "Full-Stack Development",
  "UI/UX Design & Animation",
  "Branding & Creative",
  "Mobile Development",
  "DevOps",
  "Blockchain",
  "Machine Learning"
];

export const processSteps = [
  {
    number: "01",
    title: "Understanding your needs",
    text: "We meet with you to fully understand the problem and your success criteria."
  },
  {
    number: "02",
    title: "Building the right team",
    text: "We find the right team for your project and manage the entire recruitment process."
  },
  {
    number: "03",
    title: "Proposal & Roadmap",
    text: "We present a detailed quote, introduce the team, and outline the collaboration plan."
  },
  {
    number: "04",
    title: "Team Assessment",
    text: "You review the team and have the opportunity to ask any questions."
  },
  {
    number: "05",
    title: "Project kickoff",
    text: "Once agreed, we schedule a kickoff meeting to start the project."
  }
];

export const qualificationPaths = [
  {
    title: "Annual membership fee",
    text: "Each cooperative pays €500 per year for the Full Patio Membership Package. A straightforward, transparent, and sustainable default for all cooperatives."
  },
  {
    title: "Active unpaid contribution",
    text: "A cooperative with a team member actively contributing in a Patio circle without pay is not required to pay the fee. Time and expertise count as membership."
  },
  {
    title: "Financial hardship application",
    text: "Cooperatives unable to pay or contribute labour may apply for a scholarship. The Internal Organisation & Community Support circle reviews each case based on a stated timeframe of need."
  }
];

export const philosophy = [
  "Supportive community",
  "Shared learning",
  "Diverse perspectives",
  "Access to expertise",
  "Real collaboration"
];

export const communityImages = [
  {
    src: "/assets/community/community-01.jpg",
    alt: "Patio members smiling together outside a large wooden door"
  },
  {
    src: "/assets/community/community-02.jpg",
    alt: "Patio members taking a group selfie at a conference"
  },
  {
    src: "/assets/community/community-03.jpg",
    alt: "Large Patio group photo in an indoor garden venue"
  },
  {
    src: "/assets/community/community-04.jpg",
    alt: "Small Patio group selfie in front of plants"
  },
  {
    src: "/assets/community/community-05.jpg",
    alt: "Patio members seated around a table with Patio signs"
  },
  {
    src: "/assets/community/community-06.jpg",
    alt: "Patio members standing outdoors in front of leafy trees"
  },
  {
    src: "/assets/community/community-07.jpeg",
    alt: "Large Patio retreat group photo in front of a lake"
  }
];
