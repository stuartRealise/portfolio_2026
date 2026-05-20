import Link from 'next/link';
import SectionLabel from '@/components/ui/SectionLabel';
import ServiceCard from '@/components/ui/ServiceCard';
import type { Service } from '@/lib/content';
import styles from './ServicesTeaser.module.css';

interface Props {
  services: Service[];
}

export default function ServicesTeaser({ services }: Props) {
  const active = services.filter((s) => s.status === 'active');
  const comingSoon = services.filter((s) => s.status === 'coming-soon');

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={`${styles.header} reveal`}>
          <SectionLabel light>01 — What I Do</SectionLabel>
          <h2 className={styles.heading}>
            Every engagement starts with clarity.
          </h2>
          <p className={styles.p}>Whether through a grounded heuristic evaluation or a decision intelligence audit, the goal is the same: to quickly surface the problems slowing teams down and provide clear, evidence-backed next steps within 72 hours.</p>
        </header>

        <div className={styles.activeGrid}>
          {active.map((service, i) => (
            <div key={service.id} className={`reveal reveal-delay-${i + 1}`}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {comingSoon.length > 0 && (
          <div className={`${styles.comingSoonGrid} reveal`}>
            {comingSoon.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        <div className={`${styles.cta} reveal`}>
          <Link href="/services" className={styles.ctaLink}>
            Explore all services →
          </Link>
        </div>
      </div>
    </section>
  );
}
