export type JoinOpportunity = {
  id: string;
  title: string;
  summary: string;
  defaultOpen?: boolean;
  sections: {
    heading?: string;
    paragraphs?: string[];
    bullets?: string[];
  }[];
  howToApply: string;
};

/** Team page role → Join page section id */
export const memberRoleToJoinSection: Record<string, string> = {
  graduate_student: "phd",
  masters_student: "uic-students",
  undergraduate: "uic-students",
  postdoc: "postdoc",
};

export function joinHrefForMemberRole(role: string) {
  const sectionId = memberRoleToJoinSection[role];
  return sectionId ? `/join#${sectionId}` : "/join";
}

export const joinOpportunities: JoinOpportunity[] = [
  {
    id: "phd",
    title: "PhD Students",
    summary:
      "Ph.D. students interested in human–robot interaction, robot learning, and deploying robots in real-world social settings.",
    defaultOpen: true,
    sections: [
      {
        heading: "What we look for",
        bullets: [
          "Strong programming skills (Python; robotics middleware experience is a plus)",
          "Curiosity about how people think, communicate, and collaborate",
          "Comfort with both empirical HRI studies and technical implementation",
        ],
      },
      {
        paragraphs: [
          "We are actively building the lab and welcome inquiries before you apply.",
        ],
      },
    ],
    howToApply:
      "Email Dr. Ghose with your CV, a brief statement of research interests, and links to any relevant projects or papers. UIC Computer Science Ph.D. applicants should also follow the department application timeline and mention PEARL in your application.",
  },
  {
    id: "uic-students",
    title: "Current UIC Master's Students & Undergraduates",
    summary:
      "UIC master's and undergraduate students who want hands-on research in HRI, software, studies, and robot experiments.",
    sections: [
      {
        heading: "What you might work on",
        bullets: [
          "Thesis and project-based research in HRI and social robotics",
          "Implement and test robot interaction prototypes",
          "Assist with human-participant studies and data analysis",
          "Hands-on work with mobile manipulators and socially assistive platforms",
        ],
      },
      {
        paragraphs: [
          "No prior robotics experience is required for undergraduates—enthusiasm and reliability matter most. Master's students typically contribute through software development, user studies, and robot experiments.",
        ],
      },
    ],
    howToApply:
      "Email Dr. Ghose with your CV, a short note about your background and interests, and your availability for the semester or summer.",
  },
  {
    id: "postdoc",
    title: "Postdoctoral Researchers",
    summary:
      "Postdoctoral scholars with expertise in human–robot interaction, robot learning, or socially assistive robotics.",
    sections: [
      {
        heading: "Ideal background",
        bullets: [
          "Ph.D. in robotics, computer science, or a related field",
          "Publication record in HRI, robotics, or ML venues",
          "Interest in leading projects and mentoring students",
        ],
      },
      {
        paragraphs: [
          "Postdocs will have opportunities to shape the lab's research agenda, publish at top venues, and collaborate across UIC and the broader Chicago robotics community.",
        ],
      },
    ],
    howToApply:
      "Email Dr. Ghose with your CV, cover letter, and two representative publications.",
  },
  {
    id: "visiting",
    title: "Visiting Researchers",
    summary:
      "Visiting students, scholars, and faculty interested in collaborating with PEARL for a research visit or exchange.",
    sections: [
      {
        heading: "Who this is for",
        bullets: [
          "Visiting Ph.D. students and postdocs seeking a research stay",
          "Faculty and scholars interested in short- or long-term collaboration",
          "Researchers aligned with HRI, robot adaptation, and socially assistive robotics",
        ],
      },
      {
        paragraphs: [
          "Visit length and funding arrangements are discussed case by case. Strong alignment with ongoing PEARL projects is especially welcome.",
        ],
      },
    ],
    howToApply:
      "Email Dr. Ghose with your CV, a short description of your research interests, proposed visit timing and duration, and any funding or institutional constraints.",
  },
];
