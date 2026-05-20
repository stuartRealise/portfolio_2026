import Link from 'next/link';
import styles from './Footer.module.css';
import Image from 'next/image';
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'My Work', href: '/work' },
  { label: 'My Services', href: '/services' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.grid}>
        <div className={styles.col}>
           <Image
            src="/logo2.svg"
            alt="Aitken-interactive logo"
            width={200}
            height={60}
            className="logo2"
          />
        </div>

        <nav className={styles.col} aria-label="Footer navigation">
          <p className={styles.colHeading}>Navigation</p>
          <ul className={styles.linkList}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={styles.footerLink}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <p className={styles.colHeading}>Connect</p>
          <ul className={styles.linkList}>
            <li>
              <a
                href="https://linkedin.com/in/aitkeninteractive"
                className={styles.footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:stuart@aitken-interactive.co.uk"
                className={styles.footerLink}
              >
                stuart@aitken-interactive.co.uk
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© {year} Aitken Interactive. All rights reserved.</p>
      </div>
    </footer>
  );
}
