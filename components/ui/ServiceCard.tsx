'use client';

import { useContactModal } from '@/lib/ContactModalContext';
import type { Service } from '@/lib/content';
import styles from './ServiceCard.module.css';

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  const { openContactModal } = useContactModal();

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
        <button
          type="button"
          className={styles.link}
          onClick={() => openContactModal(service.id)}
          data-contact-trigger="true"
          data-service-id={service.id}
        >
          {service.contactOnly ? 'Get in touch →' : 'Enquire →'}
        </button>
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
