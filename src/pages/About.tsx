import Avatar from "../components/Avatar";
import styles from "./About.module.css";

const stack = [
  { label: "Languages", items: ["Go", "TypeScript", "Python", "SQL"] },
  { label: "Frontend", items: ["React", "Next.js", "HTML/CSS", "Tailwind"] },
  { label: "Backend", items: ["Node.js", "PostgreSQL", "Redis", "gRPC"] },
  { label: "Infra", items: ["Docker", "Kubernetes", "Terraform", "GH Actions"] },
];

export default function About() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Avatar size={96} className={styles.avatar} />
        <div>
          <h1>About</h1>
        </div>
      </header>

      <section className={styles.intro}>
        <p>
          I'm Paul Buzakov, a software engineer who enjoys building reliable
          backend systems and polished user interfaces. I care deeply about
          clean code, developer experience, and shipping software that works
          well under pressure.
        </p>
        <p>
          I'm most at home working with <strong>Go</strong>,{" "}
          <strong>TypeScript</strong>, and <strong>React</strong>, but I'm
          always exploring new tools and ideas. Right now I'm particularly
          interested in distributed systems, observability, and infrastructure
          as code.
        </p>
      </section>

      <section className={styles.section}>
        <h2>What I Do</h2>
        <div className={styles.doGrid}>
          {[
            "Design & build APIs and microservices",
            "Create responsive, accessible web applications",
            "Set up CI/CD pipelines and deployment infra",
            "Mentor engineers and lead code reviews",
          ].map((item, i) => (
            <div key={item} className={styles.doItem}>
              <span className={styles.doNum}>0{i + 1}</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Tech Stack</h2>
        <div className={styles.terminal}>
          <div className={styles.termBar}>
            <span className={styles.termDot} />
            <span className={styles.termDot} />
            <span className={styles.termDot} />
            <span className={styles.termTitle}>stack.ts</span>
          </div>
          <div className={styles.termBody}>
            {stack.map((group) => (
              <div key={group.label} className={styles.termLine}>
                <span className={styles.termKey}>{group.label}</span>
                <span className={styles.termColon}>:</span>
                <span className={styles.termVal}>
                  [{group.items.map((it, j) => (
                    <span key={it}>
                      {j > 0 && ", "}
                      <span className={styles.termStr}>"{it}"</span>
                    </span>
                  ))}]
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Get in Touch</h2>
        <p className={styles.contactText}>
          Always open to interesting conversations and collaboration.
        </p>
        <div className={styles.contactRow}>
          <a href="mailto:paul@paulbuzakov.com" className={styles.contactLink}>
            paul@paulbuzakov.com
          </a>
          <a href="https://github.com/paulbuzakov" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
            github.com/paulbuzakov
          </a>
          <a href="https://linkedin.com/in/paulbuzakov" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
            linkedin.com/in/paulbuzakov
          </a>
        </div>
      </section>
    </div>
  );
}
