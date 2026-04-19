import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import styles from "./Header.module.css";

const links: { to: string; label: string; end?: boolean }[] = [
  { to: "/", label: "Home", end: true },
  { to: "/blog", label: "Blog" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          PB<span className={styles.logoAccent}>.</span>
        </NavLink>

        <div className={styles.right}>
          <nav className={`${styles.nav} ${menuOpen ? styles.navVisible : ""}`}>
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
          </nav>

          <ThemeToggle />

          <button
            className={`${styles.burger} ${menuOpen ? styles.open : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
