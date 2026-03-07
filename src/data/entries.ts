export interface Entry {
  id: number;
  title: string;
  date: string;
  summary: string;
  tag: string;
}

export const entries: Entry[] = [
  {
    id: 1,
    title: "Sprint 1 Kickoff — Backend Skeleton + Route Pattern",
    date: "3/1/26",
    summary:
      "Locked the backend folder structure, route modules, and server entrypoint so the project could scale without turning into spaghetti.",
    tag: "Backend",
  },
  {
    id: 2,
    title: "SQL Server Connection Battle",
    date: "3/2/26",
    summary:
      "Worked through connection failures, instance confusion, and timeouts until the database connection was verified and stable.",
    tag: "Database",
  },
  {
    id: 3,
    title: "Core JD Workflow",
    date: "3/3/26",
    summary:
      "Built the transactional flow for creating a job description, creating version 1, and linking the current version cleanly.",
    tag: "Backend",
  },
  {
    id: 4,
    title: "Versioning v2+",
    date: "3/3/26",
    summary:
      "Added version history and version creation so each new update increments correctly and keeps the workflow traceable.",
    tag: "Routing",
  },
  {
    id: 5,
    title: "Feedback + Approvals",
    date: "3/4/26",
    summary:
      "Added feedback and approval routes so the workflow started to feel like a real tracked system instead of a loose prototype.",
    tag: "Testing",
  },
  {
    id: 6,
    title: "Publishing Flow",
    date: "3/4/26",
    summary:
      "Built publishing routes and history tracking so approved job descriptions could move into a true published state.",
    tag: "Publishing",
  },
];