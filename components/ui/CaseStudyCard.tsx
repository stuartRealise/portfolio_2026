import Image from 'next/image';
import Link from 'next/link';
import type { WorkIndexItem } from '@/lib/content';
import styles from './CaseStudyCard.module.css';

interface Props {
  item: WorkIndexItem;
}

export default function CaseStudyCard({ item }: Props) {
  return (
    <article className={styles.card}>
      <Link href={`/work/${item.slug}`} className={styles.imageLink} aria-hidden tabIndex={-1}>
        <div className={styles.imageWrapper}>
          <Image
            src={item.indexImage}
            alt={item.title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles.overlay}>
            <p className={styles.overlayTeaser}>{item.indexTeaser}</p>
          </div>
        </div>
      </Link>

      <div className={styles.info}>
        <div className={styles.tags}>
          {item.tags.slice(0, 2).map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <h3 className={styles.title}>
          <Link href={`/work/${item.slug}`} className={styles.titleLink}>
            {item.title}
          </Link>
        </h3>
        <p className={styles.meta}>
          {item.client} — {item.year}
        </p>
      </div>
    </article>
  );
}
