export type NavItem = {
  label: string;
  href: string;
  hidden?: boolean;
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Team", href: "/team" },
  { label: "Research", href: "/research" },
  { label: "Publications", href: "/publications" },
  { label: "News", href: "/news", hidden: true },
  { label: "Join the Lab", href: "/join" },
];

export const visibleNavigation = navigation.filter((item) => !item.hidden);

export const memberRoleOrder = [
  "pi",
  "graduate_student",
  "masters_student",
  "undergraduate",
  "postdoc",
  "alumni",
] as const;

export const roleLabels: Record<string, string> = {
  pi: "Principal Investigator",
  graduate_student: "Ph.D. Students",
  masters_student: "Master's Students",
  undergraduate: "Undergraduates",
  postdoc: "Postdoctoral Researchers",
  alumni: "Alumni",
};

export const defaultSiteSettings = {
  labName: "PEARL",
  labSubtitle: "PEople Aligned Robots Lab",
  institution: "University of Illinois Chicago",
  tagline:
    "Designing robots that adapt to people in shared tasks—with minimal burden on the humans they work with.",
  researchSummary:
    "The PEople Aligned Robots Lab (PEARL) studies how robots infer, anticipate, and adapt to human goals during collaboration.",
  contactEmail: "debasmita.ghose@uic.edu",
  address:
    "Department of Computer Science, University of Illinois Chicago, Chicago, IL",
  footerText: "PEARL — University of Illinois Chicago",
  githubUrl: "",
  twitterUrl: "",
};
