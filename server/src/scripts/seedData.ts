export type SeedEntry = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  mood: string;
  createdAt: string;
};

const seedData: SeedEntry[] = [
  {
    title: "DevLog cleanup operation",
    date: "2026-03-07",
    summary:
      "Today I went back into the DevLog and cleaned up the structure. The mission was simple: make the layout easier to read, easier to manage, and stronger for whatever comes next.",
    tags: ["devlog", "cleanup", "structure", "ui"],
    mood: "locked in",
    createdAt: "2026-03-07T09:00:00.000Z",
  },
  {
    title: "Cleaner coding style locked in",
    date: "2026-03-07",
    summary:
      "I tightened up the coding style and moved toward a cleaner format. Less clutter, better spacing, and a structure that feels more under control when I look at the file.",
    tags: ["coding-style", "refactor", "readability", "typescript"],
    mood: "clean and focused",
    createdAt: "2026-03-07T09:15:00.000Z",
  },
  {
    title: "DevLog running smoother",
    date: "2026-03-07",
    summary:
      "After the cleanup, I tested the DevLog and got it running smoother. The app felt more stable, looked cleaner, and matched the direction I want my projects to have going forward.",
    tags: ["testing", "stability", "frontend", "performance"],
    mood: "cooking",
    createdAt: "2026-03-07T09:30:00.000Z",
  },
  {
    title: "New coding standard established",
    date: "2026-03-07",
    summary:
      "This session helped set the standard for how I want to write code from here on out: simple, clean, readable, and easy to maintain without stripping away personality.",
    tags: ["standards", "workflow", "clean-code", "devlog"],
    mood: "dialed in",
    createdAt: "2026-03-07T09:45:00.000Z",
  },
  {
    title: "Long-term direction confirmed",
    date: "2026-03-07",
    summary:
      "This ended up being more than just a cleanup. It confirmed the kind of developer style I want attached to my work — organized, intentional, and built to grow without turning into chaos later.",
    tags: ["direction", "planning", "growth", "identity"],
    mood: "clear-headed",
    createdAt: "2026-03-07T10:00:00.000Z",
  },
  {
    title: "Boot screen tightened up",
    date: "2026-03-07",
    summary:
      "I went back and refined the DevLog boot screen so it felt more polished and more in line with the overall theme. Small visual details started making the project feel more real and more like my own.",
    tags: ["boot-screen", "polish", "theme", "design"],
    mood: "locked in",
    createdAt: "2026-03-07T10:15:00.000Z",
  },
  {
    title: "Visual identity sharpened",
    date: "2026-03-07",
    summary:
      "This was one of those sessions where the project started to gain a stronger identity. The styling choices felt less random and more like part of one connected system.",
    tags: ["branding", "visuals", "identity", "ui"],
    mood: "vision getting sharper",
    createdAt: "2026-03-07T10:30:00.000Z",
  },
  {
    title: "Simple style chosen for future builds",
    date: "2026-03-07",
    summary:
      "I made the call to stick with a simpler coding style moving forward. Cleaner files mean faster edits, easier debugging, and a better shot at staying consistent as the project grows.",
    tags: ["future", "coding-style", "simplicity", "workflow"],
    mood: "thinking long-term",
    createdAt: "2026-03-07T10:45:00.000Z",
  },
  {
    title: "Controlled forms prep started early",
    date: "2026-03-07",
    summary:
      "Instead of waiting for the next class session, I decided to get ahead and start learning controlled form basics now. The idea was to beat the lesson to the punch and walk in already understanding the flow.",
    tags: ["react", "forms", "controlled-components", "study"],
    mood: "ahead of the game",
    createdAt: "2026-03-07T11:00:00.000Z",
  },
  {
    title: "Control flow clicked",
    date: "2026-03-07",
    summary:
      "Working through the concepts helped me understand controlled forms in a simpler way. Once the logic clicked, it stopped feeling like random React behavior and started feeling like something I could control.",
    tags: ["react", "logic", "learning", "forms"],
    mood: "it clicked",
    createdAt: "2026-03-07T11:15:00.000Z",
  },
  {
    title: "Study-first mindset in action",
    date: "2026-03-07",
    summary:
      "This was a reminder that momentum matters. Every time I study something before class instead of during it, I give myself a better chance to keep up, ask smarter questions, and move with confidence.",
    tags: ["mindset", "study", "growth", "discipline"],
    mood: "disciplined",
    createdAt: "2026-03-07T11:30:00.000Z",
  },
  {
    title: "Custom icon pack created",
    date: "2026-03-07",
    summary:
      "I started building a custom icon pack for my personal computer so even the folders on my desktop could match the style I have been building. It was a small detail, but it added a lot of personality.",
    tags: ["icons", "desktop", "customization", "design"],
    mood: "creative mode",
    createdAt: "2026-03-07T11:45:00.000Z",
  },
  {
    title: "Desktop theme made more personal",
    date: "2026-03-07",
    summary:
      "The custom folder icon work pushed the setup further away from default and closer to something that actually feels like mine. The system is starting to reflect the same creative identity as the projects.",
    tags: ["desktop", "theme", "identity", "customization"],
    mood: "making it mine",
    createdAt: "2026-03-07T12:00:00.000Z",
  },
  {
    title: "Learned the catch-all route concept",
    date: "2026-03-07",
    summary:
      "I ran into the idea of a catch-all 404 route and took time to understand what it actually does. It clicked that this is the safety net that catches bad routes and keeps the app from feeling broken.",
    tags: ["routing", "404", "react-router", "learning"],
    mood: "curious and locked in",
    createdAt: "2026-03-07T12:15:00.000Z",
  },
  {
    title: "Better understanding of app structure",
    date: "2026-03-07",
    summary:
      "Learning about the 404 route helped me think more clearly about how the app is organized. It is not just about making pages appear — it is about controlling what happens when something goes wrong too.",
    tags: ["architecture", "routing", "structure", "frontend"],
    mood: "seeing the bigger picture",
    createdAt: "2026-03-07T12:30:00.000Z",
  },
  {
    title: "DevLog story arc taking shape",
    date: "2026-03-07",
    summary:
      "Looking over everything together, I can see the bigger pattern now. This was not just random work across different files — it was the beginning of shaping the DevLog into something cleaner, smarter, and more personal.",
    tags: ["devlog", "growth", "story", "project"],
    mood: "this shit is coming together",
    createdAt: "2026-03-07T12:45:00.000Z",
  },
];

export default seedData;