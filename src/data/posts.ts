export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
}

export const posts: Post[] = [
  {
    slug: "building-scalable-apis-with-go",
    title: "Building Scalable APIs with Go",
    date: "2026-04-10",
    excerpt:
      "Lessons learned from designing high-throughput REST APIs using Go, including middleware patterns, graceful shutdown, and structured logging.",
    tags: ["Go", "API Design", "Backend"],
    content: `
When I started building APIs in Go, the standard library's \`net/http\` felt almost too simple. Coming from frameworks with heavy abstractions, the directness was refreshing — and ultimately, it's what makes Go APIs so performant.

## Project Structure

I've settled on a layout that scales well:

\`\`\`
cmd/api/main.go
internal/handler/
internal/service/
internal/repository/
internal/middleware/
\`\`\`

Keeping a clean separation between handlers (HTTP concerns), services (business logic), and repositories (data access) makes testing straightforward.

## Middleware That Matters

Three middleware functions I include in every project:

1. **Request ID** — Attach a unique ID to every request for tracing.
2. **Structured Logging** — Log method, path, status, and duration in JSON.
3. **Recovery** — Catch panics and return a 500 instead of crashing.

## Graceful Shutdown

Always handle \`SIGINT\` and \`SIGTERM\`. Give in-flight requests time to complete before the server exits. This is critical for zero-downtime deployments behind a load balancer.

## Key Takeaway

Go's simplicity is a feature, not a limitation. The less magic in your framework, the easier it is to reason about performance and debug production issues.
    `,
  },
  {
    slug: "typescript-patterns-i-use-daily",
    title: "TypeScript Patterns I Use Daily",
    date: "2026-03-25",
    excerpt:
      "A collection of TypeScript patterns that have improved my code quality — discriminated unions, branded types, and the satisfies operator.",
    tags: ["TypeScript", "Frontend", "Patterns"],
    content: `
After years of writing TypeScript professionally, a few patterns have become second nature. Here are the ones I reach for most.

## Discriminated Unions

Instead of optional fields, use a shared literal field to discriminate:

\`\`\`typescript
type Result<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string };
\`\`\`

The compiler narrows the type automatically inside \`if\` blocks — no type assertions needed.

## Branded Types

Prevent mixing up primitive types that represent different things:

\`\`\`typescript
type UserId = string & { readonly __brand: "UserId" };
type OrderId = string & { readonly __brand: "OrderId" };
\`\`\`

Now passing a \`UserId\` where an \`OrderId\` is expected is a compile-time error.

## The \`satisfies\` Operator

Use \`satisfies\` to validate a value against a type while preserving its narrower inferred type:

\`\`\`typescript
const config = {
  port: 3000,
  host: "localhost",
} satisfies Record<string, string | number>;
\`\`\`

You get both type checking and precise autocomplete.

## Key Takeaway

Lean into the type system. The more constraints you express at compile time, the fewer bugs slip into runtime.
    `,
  },
  {
    slug: "docker-compose-for-local-dev",
    title: "Docker Compose for Local Development",
    date: "2026-03-12",
    excerpt:
      "How I use Docker Compose to replicate production environments locally — databases, caches, and message queues with a single command.",
    tags: ["Docker", "DevOps", "Tooling"],
    content: `
Running \`docker compose up\` and having your entire stack ready in seconds is one of the best developer experience investments you can make.

## My Typical Stack

\`\`\`yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: app
      POSTGRES_PASSWORD: dev
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgres://postgres:dev@postgres:5432/app
      REDIS_URL: redis://redis:6379
\`\`\`

## Tips That Save Time

- **Named volumes** keep database state across restarts.
- **Health checks** on databases prevent your app from starting before they're ready.
- **Override files** (\`docker-compose.override.yml\`) let you customize settings per developer without touching the committed file.
- **Profiles** group optional services so you only run what you need.

## Key Takeaway

Invest in your local dev environment. The closer it mirrors production, the fewer "works on my machine" surprises you'll encounter.
    `,
  },
  {
    slug: "lessons-from-code-reviews",
    title: "What I Look for in Code Reviews",
    date: "2026-02-28",
    excerpt:
      "After reviewing thousands of pull requests, these are the patterns and anti-patterns I've learned to spot quickly.",
    tags: ["Engineering Culture", "Code Review", "Best Practices"],
    content: `
Code reviews are one of the highest-leverage activities on a team. Here's what I focus on.

## What I Look For

### 1. Clarity Over Cleverness
Can I understand the intent in one read? Clever one-liners that require mental gymnastics are a maintenance burden.

### 2. Error Handling
What happens when things go wrong? Missing error handling is the #1 source of production incidents in my experience.

### 3. Naming
Good names eliminate the need for comments. If a function is called \`process\`, that's a red flag — process *what*?

### 4. Test Quality
Tests should break when behavior changes, not when implementation details change. I look for tests that describe *what* the code does, not *how* it does it.

### 5. Scope
Is this PR doing one thing well, or three things partially? Smaller, focused PRs get better reviews and ship faster.

## What I Don't Nitpick

- Formatting — that's what linters and formatters are for.
- Minor style preferences — consistency matters, but not at the cost of review velocity.
- Missing features — if it's not in the ticket, it's not in the PR.

## Key Takeaway

The best code reviews are conversations, not gatekeeping. Focus on understanding the author's intent and helping them ship confidently.
    `,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
