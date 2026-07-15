export const profile = {
  name: "Abeen Poudel",
  title: "Computer Engineer / Certified Scrum Master",
  location: "Kathmandu, Bagmati, Nepal",
  email: "avinpaudel07@gmail.com",
  phone: "+977 9843547777",
  linkedin: "https://www.linkedin.com/in/abeen-poudel-b071b91b4",
  tagline:
    "I turn messy backlogs into shipped products — bridging engineering and business as a CSM-certified Product Manager and Scrum Master.",
  summary:
    "CSM-certified Business Analyst and Project Coordinator with a background in IT project delivery, business analysis, and Agile facilitation. Skilled in requirement gathering (BRD, SRS, user stories), backlog management, sprint planning, and cross-team collaboration. I've supported Agile teams across multiple projects — from documenting requirements and refining product backlogs to coordinating UAT and tracking Agile metrics. My approach bridges business needs and technical solutions to deliver projects on time, within scope, and aligned to strategic goals.",
};

export const skills = [
  { name: "Agile / Scrum Facilitation", level: 95 },
  { name: "Product Management", level: 90 },
  { name: "Sprint Planning & Retrospectives", level: 90 },
  { name: "Backlog Management & Refinement", level: 88 },
  { name: "Jira & Confluence", level: 88 },
  { name: "Requirement Gathering (BRD, SRS, User Stories)", level: 92 },
  { name: "Stakeholder & Vendor Management", level: 94 },
  { name: "Agile Metrics (Velocity, Burndown, Capacity)", level: 82 },
  { name: "UAT Coordination", level: 80 },
  { name: "Trello", level: 78 },
  { name: "System Architecture", level: 65 },
  { name: "Network Engineering", level: 55 },
  { name: "Telecommunications", level: 60 },
];

export const certifications = [
  { name: "Certified ScrumMaster (CSM)", file: "/certificates/csm.pdf" },
  { name: "Agile with Atlassian Jira", file: "/certificates/jira.pdf" },
  { name: "PMP Certification Training Course", file: "/certificates/pmp.pdf" },
  { name: "Agile Project Management", file: "/certificates/agile-pm.pdf" },
];
export const education = [
  {
    school: "Advanced College of Engineering and Management",
    degree: "Bachelor of Engineering, Computer Engineering",
    period: "2015 — 2019",
  },
];

export type Role = {
  id: string; // ticket-style id, e.g. POUDEL-01
  company: string;
  title: string;
  period: string;
  location: string;
  status: "in-progress" | "done";
  points: string[];
};

export const experience: Role[] = [
  {
    id: "POUDEL-08",
    company: "Maatri Nepal",
    title: "Product Project Manager",
    period: "October 2025 — Present",
    location: "Kupondole, Lalitpur",
    status: "in-progress",
    points: [
      "Currently leading product and project management efforts, bringing Agile discipline to a growing product organization.",
    ],
  },
  {
    id: "POUDEL-07",
    company: "Hotstone Innovations",
    title: "Technical Team Incharge / Business Support Manager",
    period: "August 2025 — October 2025",
    location: "Bhaktapur, Bagmati, Nepal",
    status: "done",
    points: [
      "Led the technical team while supporting core business operations during a period of transition.",
    ],
  },
  {
    id: "POUDEL-06",
    company: "CrossOver Nepal",
    title: "Operations Manager",
    period: "June 2024 — July 2025",
    location: "Lalitpur District",
    status: "done",
    points: [
      "Led daily technical operations, ensuring optimal system availability, performance, and reliability across all IT environments.",
      "Managed cross-functional teams (Development, Support, Sales/Marketing) to resolve issues, streamline deployments, and enhance operational efficiency.",
      "Implemented Agile and DevOps best practices, driving continuous improvements and operational excellence.",
      "Oversaw the full lifecycle of infrastructure management — system design, implementation, monitoring, backups, and routine maintenance.",
      "Monitored KPIs and provided actionable insights to senior leadership to support strategic decision-making while reducing costs.",
      "Managed vendor relationships and contract negotiations, ensuring SLA compliance and cost-effective technology solutions.",
      "Oversaw incident response processes, using root cause analysis to reduce recurring issues.",
    ],
  },
  {
    id: "POUDEL-05",
    company: "Mokshya Tech and IT Solutions",
    title: "Project Engineer",
    period: "October 2022 — April 2024",
    location: "Kathmandu, Bagmati, Nepal",
    status: "done",
    points: [
      "Led end-to-end planning and execution of IT projects, ensuring delivery within scope, time, and budget using Jira and Trello.",
      "Liaised with cross-functional stakeholders — clients, vendors, developers, and support teams — to gather technical and business requirements.",
      "Developed detailed project plans, managed timelines and budgets, and ensured alignment with organizational IT strategy.",
      "Coordinated project teams and facilitated sprint planning and daily stand-ups using Agile/Scrum methodologies.",
      "Delivered multiple projects with 90% on-time delivery and 10–15% cost savings through optimized resource planning and vendor negotiation.",
    ],
  },
  {
    id: "POUDEL-04",
    company: "Mokshya Tech and IT Solutions",
    title: "Project Manager / Scrum Master",
    period: "May 2021 — October 2022",
    location: "Kathmandu, Bagmati, Nepal",
    status: "done",
    points: [
      "Facilitated Agile Scrum ceremonies — daily stand-ups, sprint planning, retrospectives, and reviews — to ensure smooth, timely delivery.",
      "Coached and mentored development teams on Agile principles, fostering continuous improvement and high performance.",
      "Served as a servant leader, removing impediments so teams could focus on delivering high-value increments.",
      "Worked closely with Product Owners to maintain a prioritized product backlog aligned with business goals.",
      "Tracked and reported Agile metrics — velocity, burn-down, team capacity — to stakeholders for transparency.",
    ],
  },
  {
    id: "POUDEL-03",
    company: "Mokshya Tech and IT Solutions",
    title: "QA Engineer",
    period: "October 2020 — May 2021",
    location: "Kathmandu, Bagmati, Nepal",
    status: "done",
    points: [
      "Collaborated with developers and stakeholders in Agile environments using Jira and Confluence.",
      "Designed and executed manual test cases validating web and mobile application functionality and stability.",
      "Identified, logged, and tracked bugs in Jira, ensuring timely resolution and retesting.",
      "Conducted smoke and regression testing during deployment cycles.",
      "Performed basic API testing using Postman, validating request/response flows.",
    ],
  },
  {
    id: "POUDEL-02",
    company: "Nepal Telecom",
    title: "Intern",
    period: "December 2019 — March 2020",
    location: "Kathmandu, Bagmati, Nepal",
    status: "done",
    points: [
      "Supported major and minor network disruptions — connectivity, failed servers, DNS redirection, and exchange synchronization.",
      "Performed analysis to determine antenna size, radio equipment, and frequency band for optimal system performance.",
      "Performed inspection, monitoring, and maintenance of wireless equipment and facilities.",
    ],
  },
];

export type CaseStudy = {
  id: string;
  title: string;
  tag: string;
  summary: string;
  outcomes: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "POUDEL-CS1",
    title: "Agile Transformation at CrossOver Nepal",
    tag: "Operations · Agile Coaching",
    summary:
      "Introduced Agile and DevOps practices into an operations organization that had been running ad hoc, aligning Development, Support, and Sales/Marketing under one delivery rhythm.",
    outcomes: [
      "Unified cross-functional teams under shared sprint cadences",
      "Reduced recurring incidents through root-cause-driven retrospectives",
      "Improved system availability and reliability across IT environments",
    ],
  },
  {
    id: "POUDEL-CS2",
    title: "Delivery Turnaround at Mokshya Tech",
    tag: "Project Management · Delivery",
    summary:
      "Took ownership of a portfolio of client IT projects and rebuilt the planning, budgeting, and stakeholder-communication process from the ground up.",
    outcomes: [
      "90% on-time delivery across managed projects",
      "10–15% cost savings via optimized resource and vendor planning",
      "Higher repeat engagement from satisfied clients",
    ],
  },
  {
    id: "POUDEL-CS3",
    title: "Scrum Master to Servant Leader",
    tag: "Agile Facilitation · Coaching",
    summary:
      "Grew from facilitating ceremonies to actively coaching development teams, removing impediments, and protecting the team's focus on high-value work.",
    outcomes: [
      "Consistent velocity and burn-down reporting adopted by stakeholders",
      "Backlog prioritization aligned tightly with business goals",
      "Measurable increase in team morale and productivity",
    ],
  },
];
