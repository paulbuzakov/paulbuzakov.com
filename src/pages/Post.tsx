import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostBySlug } from "../data/posts";
import PostCover from "../components/PostCover";
import styles from "./Post.module.css";

function readTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 250));
}

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min((window.scrollY / h) * 100, 100) : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) {
    return (
      <div className={styles.empty}>
        <h1>Post not found</h1>
        <Link to="/blog">&larr; Back to blog</Link>
      </div>
    );
  }

  const blocks = post.content.trim().split("\n\n");

  return (
    <>
      <div className={styles.bar} style={{ transform: `scaleX(${progress / 100})` }} />
      <article className={styles.article}>
        <header className={styles.head}>
          <Link to="/blog" className={styles.back}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </Link>
          <PostCover slug={post.slug} title={post.title} className={styles.heroCover} />
          <h1>{post.title}</h1>
          <div className={styles.meta}>
            <time>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>&middot;</span>
            <span>{readTime(post.content)} min read</span>
          </div>
          <div className={styles.tags}>
            {post.tags.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        </header>

        <div className={styles.body}>
          {blocks.map((block, i) => {
            if (block.startsWith("```")) {
              const lines = block.split("\n");
              const lang = lines[0].replace("```", "").trim();
              const code = lines.slice(1, -1).join("\n");
              return (
                <pre key={i} className={styles.pre}>
                  {lang && <span className={styles.lang}>{lang}</span>}
                  <code>{code}</code>
                </pre>
              );
            }
            if (block.startsWith("## ")) return <h2 key={i}>{block.slice(3)}</h2>;
            if (block.startsWith("### ")) return <h3 key={i}>{block.slice(4)}</h3>;
            if (block.includes("\n1. ") || block.startsWith("1. ")) {
              const items = block.split("\n").filter((l) => /^\d+\./.test(l));
              return (
                <ol key={i}>
                  {items.map((it, j) => (
                    <li key={j} dangerouslySetInnerHTML={{
                      __html: it.replace(/^\d+\.\s*/, "")
                        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                        .replace(/`(.+?)`/g, "<code>$1</code>"),
                    }} />
                  ))}
                </ol>
              );
            }
            if (block.includes("\n- ") || block.startsWith("- ")) {
              const items = block.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={i}>
                  {items.map((it, j) => (
                    <li key={j} dangerouslySetInnerHTML={{
                      __html: it.replace(/^-\s*/, "")
                        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                        .replace(/`(.+?)`/g, "<code>$1</code>"),
                    }} />
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} dangerouslySetInnerHTML={{
                __html: block
                  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                  .replace(/`(.+?)`/g, "<code>$1</code>"),
              }} />
            );
          })}
        </div>
      </article>
    </>
  );
}
