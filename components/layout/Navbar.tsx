'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useContactModal } from '@/lib/ContactModalContext';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'My Work', href: '/work' },
  { label: 'My Services', href: '/services' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { openContactModal } = useContactModal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    // Listen on both window and document — iOS Safari can route scroll events
    // to either depending on overflow/body settings
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    // Signal to the inline fallback script that React has mounted and is in control.
    // Also remove any DOM state the fallback applied before hydration.
    if (menuButtonRef.current) {
      menuButtonRef.current.setAttribute('data-react-mounted', 'true');
    }
    document.getElementById('mobile-menu')?.classList.remove('nav-open');
  }, []);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () => {
      document.documentElement.style.setProperty(
        '--navbar-height-actual',
        `${header.getBoundingClientRect().height}px`,
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const firstFocusable = mobileMenuRef.current?.querySelector<HTMLElement>(
      'button, a, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeMenu(); return; }
      if (e.key !== 'Tab') return;

      const focusable = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen, closeMenu]);

  function handleContactClick() {
    closeMenu();
    openContactModal();
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <Link href="/" className={styles.logo} aria-label="Aitken Interactive — Home">
          {/* <img src="./logo.svg" alt="Aitken-interactive logo" className={styles.logoAitken}/> */}
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.navLink} ${pathname === href ? styles.active : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className={styles.navButton}
                onClick={() => openContactModal()}
                aria-label="Open contact form"
                data-contact-trigger="true"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className={styles.hamburger}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </header>

      {/* Mobile full-screen overlay — always in DOM, hidden via display:none.
          React toggles mobileMenuOpen class; inline script in layout.tsx toggles
          nav-open class as a fallback when the JS bundle hasn't loaded. */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        aria-label="Mobile navigation"
      >
        <button
          type="button"
          className={styles.mobileClose}
          onClick={closeMenu}
          aria-label="Close menu"
        >
          ×
        </button>
        <nav aria-label="Mobile navigation links">
          <ul className={styles.mobileNavList}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.mobileNavLink} ${pathname === href ? styles.mobileActive : ''}`}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className={styles.mobileNavLink}
                onClick={handleContactClick}
                data-contact-trigger="true"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
