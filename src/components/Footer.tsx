import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.line} />
      <div className={styles.inner}>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Paul Buzakov
        </p>
        <nav className={styles.links}>
          <a href="https://github.com/paulbuzakov" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/paulbuzakov" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:paulbuzakov@gmail.com">Email</a>
        </nav>
      </div>
    </footer>
  );
}
