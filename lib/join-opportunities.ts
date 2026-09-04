export type JoinInlinePart =
  | string
  | { type: "link"; href: string; label: string; bold?: boolean }
  | { type: "bold"; text: string };

export type JoinOpportunity = {
  id: string;
  title: string;
  defaultOpen?: boolean;
  sections: {
    heading?: string;
    /** Soft highlighted recruiting note */
    callout?: string;
    /** Collapse long subsections behind the heading */
    collapsible?: boolean;
    paragraphs?: JoinInlinePart[][];
    numberedItems?: { title: string; body: string }[];
    bullets?: string[];
  }[];
  howToApply?: JoinInlinePart[];
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
  return sectionId ? `/join?section=${sectionId}` : "/join";
}

/** Replace with your Google Form URL when ready. */
export const PHD_GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSebvU1ln4i35W7QBEce6m7GIixGBuQA4DYGQBjtG8tLPsYQqg/viewform?usp=publish-editor";

/** Replace with the UIC undergrad/master's interest form URL when ready. */
export const UIC_STUDENT_INTEREST_FORM_URL = "YOUR_UIC_STUDENT_INTEREST_FORM_URL_HERE";

export const UIC_CS_PHD_APPLY_URL =
  "https://cs.uic.edu/graduate/admissions/phd/";

/** Shared intro for all hiring tracks on the Join page */
export const joinResearchOverview = {
  title: "What Does Research in PEARL Look Like?",
  paragraphs: [
    "PEARL is a full-stack robotics lab focused on developing technologies—algorithms, interfaces, and robotic systems—that enable robots to work effectively with and around people. Our projects span human-robot interaction, robotics, and AI, and often involve taking ideas from algorithm and system development to deployment on physical robots and evaluation with people.",
  ] as string[],
  skillsIntro: [
    "Because our work is interdisciplinary, research in the lab draws on a broad range of technical and research skills. ",
    {
      type: "bold" as const,
      text: "You do not need to have experience in all of these areas before joining the lab.",
    },
    " We are excited to work with students who have strong foundations in some areas and are eager to learn others. Some areas that are particularly useful include:",
  ] as JoinInlinePart[],
  skillAreas: [
    {
      title: "Robotics, planning, and control:",
      body: "Experience working with physical robots and developing methods for robot control, task and motion planning, manipulation, perception, and navigation. Much of our research is ultimately deployed and tested on real robotic systems, often in environments where robots interact with people.",
    },
    {
      title: "Machine learning:",
      body: "Developing algorithms that allow robots to learn from data, people, demonstrations, or interaction. The specific methods vary across projects and may involve computer vision, natural language processing, or other approaches for enabling robots to behave effectively with people and in changing environments.",
    },
    {
      title: "Physical prototyping and systems building:",
      body: "Designing and building robot hardware, custom end-effectors, sensing systems, interaction devices, and experimental setups using tools such as CAD and rapid prototyping.",
    },
    {
      title: "Human-subject research:",
      body: "Designing and conducting quantitative and qualitative user studies to understand how people interact with robotic systems and to evaluate the systems we develop.",
    },
  ],
  closing:
    "Most importantly, we value students who are excited about building things, asking research questions about how robots and people can work together, and are enthusiastic to develop the range of skills needed to answer those questions.",
};

export const joinOpportunities: JoinOpportunity[] = [
  {
    id: "phd",
    title: "Prospective Ph.D. Students",
    sections: [
      {
        callout:
          "For the Fall 2027 application cycle, I am looking to recruit 1–2 Ph.D. students to join PEARL @ UIC.",
        paragraphs: [
          [
            "To apply to work with me, you will need to ",
            {
              type: "link",
              href: UIC_CS_PHD_APPLY_URL,
              label: "submit an application to the UIC Computer Science Ph.D. program",
            },
            " and mention my name (Debasmita Ghose) in your application. In your statement, please discuss your specific research interests—keeping in mind that these are a starting point rather than a commitment to a particular project—and describe why you want to pursue a Ph.D.",
          ],
          [
            "After submitting your application to UIC, please also fill out ",
            {
              type: "link",
              href: PHD_GOOGLE_FORM_URL,
              label: "this actively monitored Google Form",
              bold: true,
            },
            ". This will help me learn more about you and your application. I may follow up by email to learn more or schedule an interview.",
          ],
          [
            "Due to the volume of email I receive, I may not be able to respond to individual inquiries about prospective Ph.D. positions or assess fit over email. ",
            {
              type: "bold",
              text: "The best way to make sure I see your application is to submit the Google Form.",
            },
          ],
        ],
      },
      {
        heading: "Who might be a good fit",
        collapsible: true,
        paragraphs: [
          [
            "A few qualities and experiences that would make you a particularly good fit for PEARL:",
          ],
        ],
        numberedItems: [
          {
            title: "Excitement about helping build a new lab.",
            body: "You would be part of the first cohort of graduate students in PEARL and will have substantial opportunities to help shape the lab—from our robotics and software infrastructure to our research practices and lab culture. What you help build will not only impact your own research, but the research that comes out of the lab for many years to come. I am looking for students who are excited by that level of ownership, enjoy collaborating with others, and are enthusiastic about mentoring undergraduate and master's students as the lab grows.",
          },
          {
            title: "Experience working with physical robots.",
            body: "Prior hands-on experience building, programming, or conducting experiments with real robotic systems is especially valuable. Experience with robots operating around or interacting with people is a plus.",
          },
          {
            title:
              "A strong motivation for pursuing a Ph.D. in Human-Robot Interaction.",
            body: "I am looking for students who have thought carefully about why they want to pursue a Ph.D. and, more specifically, why they want to study human-robot interaction. You do not need to arrive with a fully defined dissertation topic, but you should have genuine research questions or problems that excite you and a clear interest in developing as an independent researcher.",
          },
        ],
      },
      {
        heading: "Fellowships and External Funding",
        collapsible: true,
        paragraphs: [
          [
            "I strongly encourage prospective Ph.D. students to apply for external fellowships when eligible. Fellowships are valuable additions to your CV and can provide greater flexibility in shaping your research. They can also make it easier for faculty to support and recruit students—though, of course, I hope you choose PEARL!",
          ],
          [
            {
              type: "bold",
              text: "External fellowship funding is not required to join PEARL.",
            },
            " If you have applied for or already received fellowship support, please indicate this in the Google Form. Once you join the lab, I will also support you in identifying and applying for fellowship opportunities for which you are eligible and that align with your research.",
          ],
          [
            "Eligibility varies considerably across programs, and many graduate fellowships have citizenship or residency restrictions. Some fellowship programs to explore include the ",
            {
              type: "link",
              href: "https://nsfgrfp.org/",
              label: "NSF GRFP",
            },
            ", ",
            {
              type: "link",
              href: "https://ndseg.sysplus.com/",
              label: "DOD NDSEG",
            },
            ", ",
            {
              type: "link",
              href: "https://www.nasa.gov/nasa-space-technology-graduate-research-opportunities-nstgro/",
              label: "NASA NSTGRO",
            },
            ", ",
            {
              type: "link",
              href: "https://www.hertzfoundation.org/the-fellowship/",
              label: "Hertz Fellowship",
            },
            ", ",
            {
              type: "link",
              href: "https://www.nationalacademies.org/our-work/ford-foundation-fellowships",
              label: "Ford Foundation Fellowship",
            },
            ", ",
            {
              type: "link",
              href: "https://metaresearchphdfellowship.smapply.io/",
              label: "Meta Ph.D. Fellowship",
            },
            ", ",
            {
              type: "link",
              href: "https://research.nvidia.com/graduate-fellowships",
              label: "NVIDIA Graduate Fellowship",
            },
            ", ",
            {
              type: "link",
              href: "https://www.bloomberg.com/company/values/tech-at-bloomberg/data-science/academic-engagement-programs/data-science-ph-d-fellowship/#eligibility",
              label: "Bloomberg Ph.D. Fellowship",
            },
            ", and ",
            {
              type: "link",
              href: "https://www.microsoft.com/en-us/research/academic-program/phd-fellowship/",
              label: "Microsoft Research Ph.D. Fellowship",
            },
            ".",
          ],
        ],
      },
    ],
  },
  {
    id: "uic-students",
    title: "Prospective Undergraduate and Master's Students at UIC",
    sections: [
      {
        callout:
          "We are currently looking to recruit approximately 4–6 UIC undergraduate and master's students to join PEARL as research assistants in Spring 2027 and Fall 2027.",
        paragraphs: [
          [
            "Each year, we plan to recruit undergraduate and master's students at UIC to join PEARL. We view undergraduate and master's researchers as core members of the lab. Students are expected to actively participate in their research projects, lab meetings, and other lab activities.",
          ],
          [
            "Because robotics research involves complex hardware and software and can have a significant learning curve, we generally ask students to commit to at least one year in the lab—and we hope many will stay longer! This gives you time to develop new skills, become comfortable with our research tools and systems, and make meaningful contributions to your project.",
          ],
          [
            "We generally prioritize students who have taken an undergraduate robotics course at UIC or have comparable robotics experience. You do not need to arrive with all of the skills required for a project, but you should be excited to learn, build, troubleshoot, and work collaboratively with others.",
          ],
          [
            "Whenever possible, undergraduate and master's students will work together in small project teams. This gives you peers to brainstorm, build, debug, and learn with, in addition to mentorship from graduate students and the lab PI.",
          ],
          [
            "Students should generally expect to dedicate around 10 hours per week to research, although the workload may vary somewhat throughout the semester. Research in the lab may be conducted voluntarily, for course credit, or through a paid research assistant position. Because paid positions depend on available research funding, we typically expect students to spend at least one semester working in the lab voluntarily or for course credit before being considered for paid research positions.",
          ],
          [
            "If you are interested in joining PEARL as an undergraduate or master's student researcher, please ",
            {
              type: "link",
              href: UIC_STUDENT_INTEREST_FORM_URL,
              label: "fill out the interest form",
              bold: true,
            },
            ". We actively monitor this form and will reach out if we see a potential fit.",
          ],
          [
            {
              type: "bold",
              text: "Undergraduate and master's research assistant positions are available only to UIC students.",
            },
            " Unfortunately, we are not able to hire undergraduate or master's students from other universities as research assistants.",
          ],
        ],
      },
    ],
  },
  {
    id: "postdoc",
    title: "Prospective Postdoctoral Researchers",
    sections: [
      {
        callout: "We are not currently actively recruiting postdoctoral researchers.",
        paragraphs: [
          [
            "However, if you see a strong alignment between your research interests and the work at PEARL, you are welcome to reach out to Debasmita. Please use the subject line ",
            {
              type: "bold",
              text: "[POTENTIAL POSTDOC]",
            },
            " and include your ",
            {
              type: "bold",
              text: "CV",
            },
            " and a ",
            {
              type: "bold",
              text: "short research statement",
            },
            " describing your research interests, why PEARL would be a good fit, and what you hope to accomplish during a postdoc.",
          ],
          [
            "At present, we do not have dedicated funding for postdoctoral positions, so candidates with external fellowship or other postdoctoral funding are especially encouraged to get in touch. Funding availability may change in the future, so please check this page for updates and potential openings.",
          ],
        ],
      },
    ],
  },
  {
    id: "visiting",
    title: "Everyone Else",
    sections: [
      {
        callout:
          "Unfortunately, we are not able to host high school students, undergraduate students from other institutions, or individuals seeking research assistant positions outside of UIC, including self-funded arrangements.",
        paragraphs: [
          [
            "Due to the volume of inquiries, we may not be able to respond to emails about these opportunities.",
          ],
          [
            "Graduate students at other institutions who are interested in visiting PEARL for a research collaboration are welcome to reach out. Please use the subject line ",
            {
              type: "bold",
              text: "[POTENTIAL VISITOR]",
            },
            " and include your ",
            {
              type: "bold",
              text: "CV",
            },
            ", a ",
            {
              type: "bold",
              text: "short description of what you hope to accomplish during the visit",
            },
            ", and a ",
            {
              type: "bold",
              text: "statement from your advisor supporting the visit",
            },
            ".",
          ],
          [
            "At this time, PEARL is not able to provide funding for visiting graduate students, so visitors would need to have their own source of financial support.",
          ],
        ],
      },
    ],
  },
];
