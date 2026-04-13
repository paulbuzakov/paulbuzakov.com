import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import PostCover from "../components/PostCover";
import styles from "./Blog.module.css";

function readTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 250));
}

export default function Blog() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Blog</h1>
        <p className={styles.sub}>
          Thoughts on software engineering, architecture, and developer tooling.
        </p>
      </header>

      <div className={styles.list}>
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className={styles.row}
            style={{ animationDelay: `${0.1 + i * 0.07}s` }}
          >
            <PostCover slug={post.slug} title={post.title} className={styles.cover} />
            <div className={styles.rowBody}>
              <div className={styles.rowMeta}>
                <time>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span>&middot;</span>
                <span>{readTime(post.content)} min</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className={styles.tags}>
                {post.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
