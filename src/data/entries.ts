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


  {
    id: 7,
    title: 'Cleaner coding style locked in',
    date: '3/7/26',
    summary:
      'I tightened up the coding style and moved toward a cleaner format. Less clutter, better spacing, and a structure that feels more under control when I look at the file.',
    tag: 'Frontend',
  },
  {
    id: 8,
    title: 'DevLog running smoother',
    date: '3/7/26',
    summary:
      'After the cleanup, I tested the DevLog and got it running smoother. The app felt more stable, looked cleaner, and matched the direction I want my projects to have going forward.',
    tag: 'Frontend',
  },
  {
    id: 9,
    title: 'New coding standard established',
    date: '3/7/26',
    summary:
      'This session helped set the standard for how I want to write code from here on out: simple, clean, readable, and easy to maintain without stripping away personality.',
    tag: 'Learning',
  },
  {
    id: 10,
    title: 'Long-term direction confirmed',
    date: '3/7/26',
    summary:
      'This ended up being more than just a cleanup. It confirmed the kind of developer style I want attached to my work — organized, intentional, and built to grow without turning into chaos later.',
    tag: 'Learning',
  },
  {
    id: 11,
    title: 'Boot screen tightened up',
    date: '3/7/26',
    summary:
      'I went back and refined the DevLog boot screen so it felt more polished and more in line with the overall theme. Small visual details started making the project feel more real and more like my own.',
    tag: 'Frontend',
  },
  {
    id: 12,
    title: 'Visual identity sharpened',
    date: '3/7/26',
    summary:
      'This was one of those sessions where the project started to gain a stronger identity. The styling choices felt less random and more like part of one connected system.',
    tag: 'Frontend',
  },
  {
    id: 13,
    title: 'Simple style chosen for future builds',
    date: '3/7/26',
    summary:
      'I made the call to stick with a simpler coding style moving forward. Cleaner files mean faster edits, easier debugging, and a better shot at staying consistent as the project grows.',
    tag: 'Learning',
  },
  {
    id: 14,
    title: 'Controlled forms prep started early',
    date: '3/7/26',
    summary:
      'Instead of waiting for the next class session, I decided to get ahead and start learning controlled form basics now. The idea was to beat the lesson to the punch and walk in already understanding the flow.',
    tag: 'Learning',
  },
  {
    id: 15,
    title: 'Control flow clicked',
    date: '3/7/26',
    summary:
      'Working through the concepts helped me understand controlled forms in a simpler way. Once the logic clicked, it stopped feeling like random React behavior and started feeling like something I could control.',
    tag: 'Learning',
  },
  {
    id: 16,
    title: 'Study-first mindset in action',
    date: '3/7/26',
    summary:
      'This was a reminder that momentum matters. Every time I study something before class instead of during it, I give myself a better chance to keep up, ask smarter questions, and move with confidence.',
    tag: 'Learning',
  },
  {
    id: 17,
    title: 'Custom icon pack created',
    date: '3/7/26',
    summary:
      'I started building a custom icon pack for my personal computer so even the folders on my desktop could match the style I have been building. It was a small detail, but it added a lot of personality.',
    tag: 'Design',
  },
  {
    id: 18,
    title: 'Desktop theme made more personal',
    date: '3/7/26',
    summary:
      'The custom folder icon work pushed the setup further away from default and closer to something that actually feels like mine. The system is starting to reflect the same creative identity as the projects.',
    tag: 'Design',
  },
  {
    id: 19,
    title: 'Learned the catch-all route concept',
    date: '3/7/26',
    summary:
      'I ran into the idea of a catch-all 404 route and took time to understand what it actually does. It clicked that this is the safety net that catches bad routes and keeps the app from feeling broken.',
    tag: 'Routing',
  },
  {
    id: 20,
    title: 'Better understanding of app structure',
    date: '3/7/26',
    summary:
      'Learning about the 404 route helped me think more clearly about how the app is organized. It is not just about making pages appear — it is about controlling what happens when something goes wrong too.',
    tag: 'Routing',
  },
  {
    id: 21,
    title: 'DevLog story arc taking shape',
    date: '3/7/26',
    summary:
      'Looking over everything together, I can see the bigger pattern now. This was not just random work across different files — it was the beginning of shaping the DevLog into something cleaner, smarter, and more personal.',
    tag: 'Learning',
  }

];