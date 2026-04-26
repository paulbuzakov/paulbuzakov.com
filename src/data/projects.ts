export interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "Get-Due.com",
    description:
      "A personal finance tracking app for stocks, properties, cash accounts, loans, and recurring payments with a unified calendar view. Clean Architecture .NET 10 API with JWT auth and Quartz-scheduled jobs, paired with a Next.js 16 App Router frontend backed by React Query and Zustand. Fully containerized with Docker Compose.",
    tech: [".NET 10", "Next.js 16", "PostgreSQL", "Docker", "TypeScript"],
    github: "https://github.com/paulbuzakov/get-due.com",
    live: "https://get-due.com",
  },
];
