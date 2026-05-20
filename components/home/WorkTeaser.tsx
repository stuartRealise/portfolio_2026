import Link from 'next/link';
import SectionLabel from '@/components/ui/SectionLabel';
import CaseStudyCard from '@/components/ui/CaseStudyCard';
import type { WorkIndexItem } from '@/lib/content';
import styles from './WorkTeaser.module.css';

interface Props {
  items: WorkIndexItem[];
}

export default function WorkTeaser({ items }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={`${styles.header} reveal`}>
          <SectionLabel>02 — Selected Work</SectionLabel>
          <h2 className={styles.heading}>
            Projects that changed how decisions get made.
          </h2>
        </header>

        <div className={styles.grid}>
          {items.map((item, i) => (
            <div key={item.slug} className={`reveal reveal-delay-${i + 1}`}>
              <CaseStudyCard item={item} />
            </div>
          ))}
        </div>

        <div className={`${styles.cta} reveal`}>
          <Link href="/work" className={styles.ctaLink}>
            View all work →
          </Link>
        </div>
      </div>
    </section>
  );
}
