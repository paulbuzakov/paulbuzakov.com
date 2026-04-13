export interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "DevLog CLI",
    description:
      "A command-line tool for developers to maintain a structured work journal. Supports markdown entries, tagging, and full-text search.",
    tech: ["Go", "SQLite", "Cobra"],
    github: "https://github.com/paulbuzakov/devlog-cli",
  },
  {
    title: "API Gateway",
    description:
      "A lightweight API gateway with rate limiting, JWT validation, and request routing. Built for microservice architectures.",
    tech: ["Go", "Redis", "Docker"],
    github: "https://github.com/paulbuzakov/api-gateway",
  },
  {
    title: "Task Board",
    description:
      "A real-time Kanban board with drag-and-drop, WebSocket updates, and team collaboration features.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    github: "https://github.com/paulbuzakov/task-board",
    live: "https://taskboard.paulbuzakov.com",
  },
  {
    title: "Infra Dashboard",
    description:
      "A monitoring dashboard that aggregates metrics from multiple cloud providers into a unified view.",
    tech: ["React", "TypeScript", "Grafana API", "Docker"],
    github: "https://github.com/paulbuzakov/infra-dashboard",
  },
];
