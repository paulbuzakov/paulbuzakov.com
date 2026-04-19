import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import { projects } from "../data/projects";
import Avatar from "../components/Avatar";
import PostCover from "../components/PostCover";
import ProjectPreview from "../components/ProjectPreview";
import styles from "./Home.module.css";

function readTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 250));
}

export default function Home() {
  const recent = posts.slice(0, 3);
  const favorites = projects.slice(0, 2);

  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden />

      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.label}>Software Engineer</p>
          <h1 className={styles.title}>
            Paul<br />
            <span className={styles.accent}>Buzakov</span>
          </h1>
          <p className={styles.bio}>
            Building reliable systems and clean interfaces.
            Writing about backend architecture, TypeScript, DevOps,
            and engineering culture.
          </p>
          <div className={styles.actions}>
            <Link to="/blog" className={styles.btnPrimary}>
              Read the Blog
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/projects" className={styles.btnGhost}>
              Projects
            </Link>
          </div>
        </div>
        <Avatar size={280} className={styles.avatar} />
      </section>

      <div className={styles.rule}>
        <span className={styles.ruleLabel}>Favorites</span>
      </div>

      <section className={styles.projects}>
        {favorites.map((p, i) => (
          <Link
            key={p.title}
            to="/projects"
            className={styles.projectCard}
            style={{ animationDelay: `${0.5 + i * 0.1}s` }}
          >
            <ProjectPreview title={p.title} tech={p.tech} className={styles.projectPreview} />
            <div className={styles.projectBody}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className={styles.projectTech}>
                {p.tech.map((t) => (
                  <span key={t} className={styles.projectBadge}>{t}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </section>

      <Link to="/projects" className={styles.viewAll}>
        View all projects
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </Link>

      <div className={styles.rule}>
        <span className={styles.ruleLabel}>Latest</span>
      </div>

      <section className={styles.posts}>
        {recent.map((post, i) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className={styles.card}
            style={{ animationDelay: `${0.6 + i * 0.1}s` }}
          >
            <PostCover slug={post.slug} title={post.title} className={styles.cardCover} />
            <div className={styles.cardBody}>
              <div className={styles.cardMeta}>
                <time>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <span className={styles.dot}>&middot;</span>
                <span>{readTime(post.content)} min</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </section>

      <Link to="/blog" className={styles.viewAll}>
        View all posts
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </Link>
    </div>
  );
}
