import Avatar from "../components/Avatar";
import styles from "./About.module.css";

const stack = [
  { label: "Languages", items: ["C#", "TypeScript", "JavaScript"] },
  { label: "Backend", items: [".NET", "ASP.NET Web API", "Entity Framework"] },
  { label: "Architecture", items: ["Microservices", "Distributed Systems", "REST APIs", "Clean Architecture"] },
  { label: "Databases", items: ["PostgreSQL", "SQL Server"] },
  { label: "Infra", items: ["Docker", "Nginx", "YARP", "CI/CD", "Azure"] },
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
          I'm Paul Buzakov, a Senior Software Engineer with{" "}
          <strong>11+ years of experience</strong> building high-load
          distributed systems in fintech and enterprise domains. I've led
          engineering teams up to 17 people and owned system design for
          microservices platforms at national scale.
        </p>
        <p>
          I'm most at home working with <strong>C#</strong>,{" "}
          <strong>.NET</strong>, and <strong>distributed architectures</strong>,
          consistently delivering measurable improvements in performance,
          reliability, and delivery speed.
        </p>
      </section>

      <section className={styles.section}>
        <h2>What I Do</h2>
        <div className={styles.doGrid}>
          {[
            "Architect high-load distributed systems & microservices",
            "Design backend services for fintech & enterprise platforms",
            "Lead engineering teams and conduct technical interviews",
            "Optimize performance, reliability, and delivery pipelines",
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
                  [
                  {group.items.map((it, j) => (
                    <span key={it}>
                      {j > 0 && ", "}
                      <span className={styles.termStr}>"{it}"</span>
                    </span>
                  ))}
                  ]
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
          <a href="mailto:paulbuzakov@gmail.com" className={styles.contactLink}>
            paulbuzakov@gmail.com
          </a>
          <a
            href="https://github.com/paulbuzakov"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            github.com/paulbuzakov
          </a>
          <a
            href="https://linkedin.com/in/paulbuzakov"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            linkedin.com/in/paulbuzakov
          </a>
        </div>
      </section>
    </div>
  );
}
