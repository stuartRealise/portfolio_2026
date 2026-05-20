'use client';

import Image from 'next/image';
import { useContactModal } from '@/lib/ContactModalContext';
import styles from './Hero.module.css';

interface Props {
  tagline: string;
  subline: string;
}

export default function Hero({ tagline, subline }: Props) {
  const { openContactModal } = useContactModal();

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.bg}>
        <Image
          src="/assets/Homepage/Homepage.jpg"
          alt="Warm Workspace"
          fill
          priority
          className={styles.bgImage}
          sizes="100vw"
        />
      </div>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <p className={`${styles.eyebrow} animate-fade-up animate-delay-200`}>
          Aitken-Interactive
        </p>
        <h1 className={`${styles.heading} animate-fade-up animate-delay-400`}>
          {tagline}
        </h1>
        <p className={`${styles.subline} animate-fade-up animate-delay-600`}>
          {subline}
        </p>
        <button
          type="button"
          className={`${styles.cta} animate-fade-up animate-delay-800`}
          onClick={() => openContactModal()}
          data-contact-trigger="true"
        >
          Start a conversation
        </button>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.chevron} />
      </div>
    </section>
  );
}
