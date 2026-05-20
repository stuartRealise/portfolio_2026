import Image from 'next/image';
import type { Metadata } from 'next';
import { getSiteData } from '@/lib/content';
import ParallaxSection from '@/components/ui/ParallaxSection';
import SectionLabel from '@/components/ui/SectionLabel';
import CtaBanner from '@/components/home/CtaBanner';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About — Aitken Interactive',
  description:
    'Stuart Aitken is a Decision Designer and UX Strategist with over 20 years of experience helping founders and product leaders build better SaaS products.',
};

export default function AboutPage() {
  const site = getSiteData();

  return (
    <main id="main-content">
      {/* ——— 1. Hero ——— */}
      <ParallaxSection
        imageUrl={"/assets/Homepage/indexImage.jpg"}
        imageAlt="Modern strategic workspace with architectural detail"
        height="70vh"
        overlayOpacity={0.58}
      >
        <div className={styles.heroContent}>
          <p className={`${styles.heroLabel} animate-fade-up animate-delay-200`}>
            Aitken Interactive
          </p>
          <h1 className={`${styles.heroName} animate-fade-up animate-delay-400`}>
            {site.name}
          </h1>
          <p className={`${styles.heroTitle} animate-fade-up animate-delay-600`}>
            {site.title}
          </p>
        </div>
      </ParallaxSection>

      {/* ——— 2. Who I Am ——— */}
      <section className={styles.whoSection}>
        <div className={styles.whoInner}>
          <div className={`${styles.quoteCol} reveal`}>
            <SectionLabel>Who I Am</SectionLabel>
            <blockquote className={styles.pullQuote}>
              <p>{site.about.pullQuote}</p>
            </blockquote>
          </div>
          <div className={`${styles.portraitCol} reveal reveal-delay-2`}>
            <div className={styles.portraitWrapper}>
              <Image
                src={site.about.portraitImage}
                alt="Stuart Aitken — designer and strategist"
                fill
                className={styles.portraitImage}
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
        <div className={`${styles.bioRow} reveal`}>
          <p className={styles.bio}>{site.bio}</p>
        </div>
      </section>

      {/* ——— 3. Experience ——— */}
      <section className={styles.experienceSection}>
        <div className={styles.experienceInner}>
          <header className={`${styles.experienceHeader} reveal`}>
            <SectionLabel light>Experience</SectionLabel>
            <h2 className={styles.experienceHeading}>Twenty years shaping products and decisions.</h2>
          </header>

          <ol className={styles.timeline}>
            {site.about.credentials.map((item, i) => (
              <li
                key={item.id}
                className={`${styles.timelineItem} reveal reveal-delay-${Math.min(i + 1, 4)}`}
              >
                <span className={styles.timelineYear}>{item.year}</span>
                <div className={styles.timelineBody}>
                  <p className={styles.timelineRole}>{item.role}</p>
                  <p className={styles.timelineContext}>{item.context}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— 4. Values ——— */}
      <section className={styles.valuesSection}>
        <div className={styles.valuesInner}>
          <header className={`${styles.valuesHeader} reveal`}>
            <SectionLabel>What I Stand For</SectionLabel>
            <h2 className={styles.valuesHeading}>The principles behind every engagement.</h2>
          </header>

          <div className={styles.valuesGrid}>
            {site.about.values.map((value, i) => (
              <article
                key={value.name}
                className={`${styles.valueCard} reveal reveal-delay-${i + 1}`}
              >
                <h3 className={styles.valueName}>{value.name}</h3>
                <p className={styles.valueDesc}>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ——— 5. CTA ——— */}
      <CtaBanner
        heading="Work with me."
        subline="Ready to bring clarity to your next decision? Let's start a conversation."
        buttons={[{ label: 'Start a conversation', variant: 'primary' }]}
      />
    </main>
  );
}
