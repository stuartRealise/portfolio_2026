import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getWorkIndex } from '@/lib/content';
import SectionLabel from '@/components/ui/SectionLabel';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Work — Aitken Interactive',
  description:
    'Selected case studies from Aitken Interactive — UX strategy, decision design, and design systems for SaaS founders and product leaders.',
};

export default function WorkPage() {
  const work = getWorkIndex();

  return (
    <main id="main-content">
      {/* ——— Hero ——— */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <SectionLabel light>Selected Work</SectionLabel>
          <h1 className={styles.heroHeading}>My work.</h1>
        </div>
      </section>

      {/* ——— Editorial intro ——— */}
      <section className={styles.introSection}>
        <div className={styles.introInner}>
          <p className={styles.introText}>
            Every project begins with a decision that needs to be made well. These case studies
            document what happens when structured thinking, deep user research, and clear strategy
            come together — and what it changes for the businesses and teams involved.
          </p>
        </div>
      </section>

      {/* ——— Work Grid ——— */}
      <section className={styles.gridSection}>
        <div className={styles.gridInner}>
          {work.map((item, i) => {
            const isWide = i % 3 === 0;
            return (
              <article
                key={item.slug}
                className={`${styles.item} reveal`}
              >
                <Link href={`/work/${item.slug}`} className={styles.imageLink}>
                  <div className={`${styles.imageWrapper} `}>
                    <Image
                      src={item.indexImage}
                      alt={item.title}
                      fill
                      className={styles.image}
                      // sizes={isWide ? '(max-width: 900px) 100vw, 66vw' : '(max-width: 900px) 100vw, 33vw'}
                    />
                    <div className={styles.imageOverlay} />
                  </div>
                </Link>

                <div className={styles.itemMeta}>
                  <div className={styles.tags}>
                    {item.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>

                  <h2 className={styles.itemTitle}>
                    <Link href={`/work/${item.slug}`} className={styles.itemTitleLink}>
                      {item.title}
                    </Link>
                  </h2>

                  <p className={styles.itemClientYear}>
                    {item.client} — {item.year}
                  </p>

                  <p className={styles.itemTeaser}>{item.indexTeaser}</p>

                  <Link href={`/work/${item.slug}`} className={styles.readLink}>
                    Read the case study →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
