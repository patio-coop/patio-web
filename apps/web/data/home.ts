import cooperativeData from "./cooperatives.json";

export type Cooperative = {
  name: string;
  enabled: boolean;
  region: string;
  country?: string;
  members?: number;
  services: string[];
  website: string;
  email?: string;
  description: string;
  headline: string;
  networkLayout: {
    column: number;
    row: number;
    height: number;
  };
  logo?: {
    src: string;
    width: number;
    height: number;
  };
};

export const allCooperatives: Cooperative[] = cooperativeData;
export const cooperatives = allCooperatives.filter(
  (cooperative) => cooperative.enabled,
);

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
        href: "#industries",
        items: [
          { label: "AI Product Dev", href: "/ai-product-development/" },
          { label: "GovTech", href: "#industries" },
          { label: "Web 3", href: "#industries" },
          { label: "CyberSecurity", href: "#industries" },
          { label: "HealthTech", href: "#industries" },
          { label: "EdTech", href: "#industries" },
          { label: "FinTech", href: "#industries" }
        ]
      },
      {
        label: "Services",
        href: "#services",
        items: [
          { label: "Full-Stack Development", href: "#services" },
          { label: "UI/UX Design & Animation", href: "#services" },
          { label: "Branding & Creative", href: "#services" },
          { label: "Mobile Development", href: "#services" },
          { label: "IoT", href: "#services" },
          { label: "DevOps", href: "#services" },
          { label: "Blockchain", href: "#services" },
          { label: "Machine Learning", href: "#services" }
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
        href: "#how-we-work",
        items: [
          { label: "Membership Model", href: "#membership" },
          { label: "Ways to Qualify", href: "#qualification" }
        ]
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
  { index: "01921", value: "80+", label: "cooperatives" },
  { index: "43119", value: "1.500", label: "members" },
  { index: "90192", value: "24+", label: "countries" },
  { index: "58119", value: "40+", label: "digital services" }
];

export const industries = [
  "AI Product Dev",
  "Government Tech",
  "Web3",
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
  "IoT",
  "DevOps",
  "Blockchain",
  "Machine Learning"
];

export const processSteps = [
  {
    number: "01",
    title: "Understanding your needs",
    text: "We meet with you to fully understand the problem you want solved."
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
  {
    title: "Supportive community",
    text: "Connect with people who genuinely want to help you succeed"
  },
  {
    title: "Shared learning",
    text: "Learn faster by building and solving problems together"
  },
  {
    title: "Diverse perspectives",
    text: "Collaborate with people from different backgrounds"
  },
  {
    title: "Access to expertise",
    text: "Tap into a network of experienced builders across disciplines"
  },
  {
    title: "Real collaboration",
    text: "Join teams and work on meaningful projects together"
  }
];

export const communityImages = [
  {
    src: "/assets/community/community-figma-01.webp",
    alt: "Five Patio members taking a group selfie among indoor plants"
  },
  {
    src: "/assets/community/community-figma-02.webp",
    alt: "Patio members taking a group selfie outdoors at a conference"
  },
  {
    src: "/assets/community/community-figma-03.webp",
    alt: "Six Patio members taking a group selfie indoors"
  },
  {
    src: "/assets/community/community-figma-04.webp",
    alt: "Patio members collaborating around a table"
  },
  {
    src: "/assets/community/community-figma-05.webp",
    alt: "Large Patio group photo in an indoor garden venue"
  },
  {
    src: "/assets/community/community-figma-06.webp",
    alt: "Patio members standing outdoors in front of leafy trees"
  },
  {
    src: "/assets/community/community-figma-07.webp",
    alt: "Large Patio retreat group photo in front of a lake"
  }
];
