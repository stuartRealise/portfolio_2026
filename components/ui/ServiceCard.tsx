import Link from 'next/link';
import type { Service } from '@/lib/content';
import styles from './ServiceCard.module.css';

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  if (service.status === 'coming-soon') {
    return (
      <div className={styles.comingSoon}>
        <p className={styles.comingSoonNumber}>{service.id.replace('service-0', '0')}</p>
        <p className={styles.comingSoonLabel}>Coming Soon</p>
        <p className={styles.comingSoonTagline}>{service.tagline}</p>
      </div>
    );
  }

  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        {service.duration && (
          <span className={styles.badge}>{service.duration}</span>
        )}
        <h3 className={styles.name}>{service.name}</h3>
        <p className={styles.tagline}>{service.tagline}</p>
      </header>
      {service.description.split('\n\n').map((para, i) => (
        <p key={i} className={styles.description}>{para}</p>
      ))}
      <div className={styles.ctaGroup}>
        <Link href={`/services#${service.slug}`} className={styles.link}>
          Learn more →
        </Link>
        {service.externalLink && (
          <a
            href={service.externalLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            {service.externalLink.label} ↗
          </a>
        )}
      </div>
    </article>
  );
}
