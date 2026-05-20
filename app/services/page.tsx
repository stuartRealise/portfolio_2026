import Image from 'next/image';
import type { Metadata } from 'next';
import { getServices } from '@/lib/content';
import ParallaxSection from '@/components/ui/ParallaxSection';
import SectionLabel from '@/components/ui/SectionLabel';
import EnquireButton from '@/components/ui/EnquireButton';
import CtaBanner from '@/components/home/CtaBanner';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Services — Aitken Interactive',
  description:
    'Structured, evidence-based services — including a Decision Intelligence Audit and expert Heuristic Evaluation — delivered in 72 hours.',
};

export default function ServicesPage() {
  const services = getServices();
  const active = services.filter((s) => s.status === 'active');
  const comingSoon = services.filter((s) => s.status === 'coming-soon');

  return (
    <main id="main-content">
      {/* ——— Hero ——— */}
      <ParallaxSection
        imageUrl="/assets/homepage/decisionMaker.png"
        imageAlt="Strategic planning session — team reviewing options and evidence"
        height="70vh"
        overlayOpacity={0.6}
      >
        <div className={styles.heroContent}>
          <p className={`${styles.heroLabel} animate-fade-up animate-delay-200`}>
            Services
          </p>
          <h1 className={`${styles.heroHeading} animate-fade-up animate-delay-400`}>
            What I Offer
          </h1>
          <p className={`${styles.heroSub} animate-fade-up animate-delay-600`}>
            Two services. Both structured, evidence-based, and delivered in 72 hours.
          </p>
        </div>
      </ParallaxSection>

      {/* ——— Active Services (alternating layout) ——— */}
      {active.map((service, i) => {
        const isReversed = i % 2 !== 0;
        return (
          <section
            key={service.id}
            id={service.slug}
            className={`${styles.serviceSection} ${
              isReversed ? styles.charcoalBg : styles.parchmentBg
            }`}
          >
            <div className={`${styles.serviceInner} ${isReversed ? styles.reversed : ''}`}>
              <div className={`${styles.serviceText} reveal`}>
                <SectionLabel light={isReversed}>
                  {String(i + 1).padStart(2, '0')} — Service
                </SectionLabel>
                <h2 className={`${styles.serviceName} ${isReversed ? styles.nameLight : ''}`}>
                  {service.name}
                </h2>
                <p className={`${styles.serviceTagline} ${isReversed ? styles.taglineLight : ''}`}>
                  {service.tagline}
                </p>

                {service.duration && (
                  <span className={styles.durationBadge}>{service.duration} turnaround</span>
                )}

                {service.description.split('\n\n').map((para, i) => (
                  <p key={i} className={`${styles.serviceDesc} ${isReversed ? styles.descLight : ''}`}>
                    {para}
                  </p>
                ))}

                {service.deliverable && (
                  <p className={`${styles.deliverable} ${isReversed ? styles.deliverableLight : ''}`}>
                    <span className={styles.deliverableLabel}>Deliverable — </span>
                    {service.deliverable}
                  </p>
                )}

                <div className={styles.ctaGroup}>
                  <EnquireButton serviceId={service.id} />
                  {service.externalLink && (
                    <a
                      href={service.externalLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.serviceExternalLink} ${isReversed ? styles.serviceExternalLinkLight : ''}`}
                    >
                      {service.externalLink.label} ↗
                    </a>
                  )}
                </div>
              </div>

              <div className={`${styles.serviceImage} reveal reveal-delay-2`}>
                <div className={styles.serviceImageWrapper}>
                  <Image
                    src={
                      service.image ??
                      '/assets/about/aboutStu_portrait.png'
                    }
                    alt={service.imageAlt ?? service.name}
                    fill
                    className={styles.serviceImg}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ——— Coming Soon Grid ——— */}
      <section className={styles.comingSoonSection}>
        <div className={styles.comingSoonInner}>
          <header className={`${styles.comingSoonHeader} reveal`}>
            <SectionLabel>On the Horizon</SectionLabel>
            <h2 className={styles.comingSoonHeading}>More services in development.</h2>
          </header>

          <div className={`${styles.comingSoonGrid} reveal`}>
            {comingSoon.map((service, i) => (
              <div key={service.id} className={styles.comingSoonCard}>
                <p className={styles.comingSoonNum}>0{i + 3}</p>
                <p className={styles.comingSoonName}>Coming Soon</p>
                <p className={styles.comingSoonTagline}>{service.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CTA ——— */}
      <CtaBanner
        heading="Ready to get started?"
        subline="Both services deliver in 72 hours. Pick the one that fits your situation."
      />
    </main>
  );
}
