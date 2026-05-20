import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCaseStudy, getAdjacentCaseStudy, getAllCaseStudySlugs } from '@/lib/content';
import ParallaxSection from '@/components/ui/ParallaxSection';
import SectionLabel from '@/components/ui/SectionLabel';
import LightboxGallery from '@/components/ui/LightboxGallery';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Aitken Interactive`,
    description: cs.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const next = getAdjacentCaseStudy(slug, 'next');
  const { sections, gallery } = cs;

  return (
    <main id="main-content">
      {/* ——— 1. Hero ——— */}
      <ParallaxSection
        imageUrl={cs.heroImage}
        imageAlt={`${cs.title} — ${cs.client}`}
        height="85vh"
        overlayOpacity={0.55}
      >
        <div className={styles.heroContent}>
          <p className={`${styles.heroClient} animate-fade-up animate-delay-200`}>{cs.client}</p>
          <h1 className={`${styles.heroTitle} animate-fade-up animate-delay-400`}>{cs.title}</h1>
          <div className={`${styles.heroMeta} animate-fade-up animate-delay-600`}>
            <span>{cs.role}</span>
            <span className={styles.heroMetaSep}>·</span>
            <span>{cs.duration}</span>
            <span className={styles.heroMetaSep}>·</span>
            <span>{cs.year}</span>
          </div>
        </div>
      </ParallaxSection>

      {/* ——— 2. Oversight ——— */}
      <section className={styles.overviewSection}>
        <div className={styles.overviewInner}>
          {sections.oversight.blurb.split('\n\n').map((para, i) => (
            <p key={i} className={`${styles.blurb} reveal`}>{para}</p>
          ))}
          <dl className={`${styles.factStrip} reveal`}>
            {sections.oversight.keyFacts.map((fact) => (
              <div key={fact.label} className={styles.factItem}>
                <dt className={styles.factLabel}>{fact.label}</dt>
                <dd className={styles.factValue}>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ——— 3. Problem ——— */}
      <section className={`${styles.contentSection} ${styles.charcoal}`}>
        <div className={styles.contentInner}>
          <span className={styles.sectionNum} aria-hidden>01</span>
          <div className={`${styles.contentBody} reveal`}>
            <SectionLabel light>{sections.problem.heading}</SectionLabel>
            <h2 className={`${styles.sectionHeading} ${styles.headingLight}`}>
              {sections.problem.heading}
            </h2>
            {sections.problem.body.split('\n\n').map((para, i) => (
              <p key={i} className={`${styles.bodyText} ${styles.bodyLight}`}>{para}</p>
            ))}
          </div>
        </div>
        {(sections.problem.images?.length ?? 0) > 0 && (
          <div className={styles.inlineImages}>
            {sections.problem.images!.map((img) => (
              <figure key={img.url} className={styles.inlineFigure}>
                <div className={styles.inlineImgWrapper}>
                  <Image src={img.url} alt={img.caption} fill className={styles.inlineImg}
                    sizes="(max-width: 900px) 100vw, 80vw" />
                </div>
                <figcaption className={styles.figCaptionLight}>{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* ——— 4. Decision ——— */}
      <section className={`${styles.contentSection} ${styles.parchment}`}>
        <div className={styles.contentInner}>
          <span className={styles.sectionNum} aria-hidden>02</span>
          <div className={`${styles.contentBody} reveal`}>
            <SectionLabel>{sections.decision.heading}</SectionLabel>
            <h2 className={styles.sectionHeading}>{sections.decision.heading}</h2>
            {sections.decision.body.split('\n\n').map((para, i) => (
              <p key={i} className={styles.bodyText}>{para}</p>
            ))}
          </div>
        </div>
        {(sections.decision.images?.length ?? 0) > 0 && (
          <div className={styles.inlineImages}>
            {sections.decision.images!.map((img) => (
              <figure key={img.url} className={styles.inlineFigure}>
                <div className={styles.inlineImgWrapper}>
                  <Image src={img.url} alt={img.caption} fill className={styles.inlineImg}
                    sizes="(max-width: 900px) 100vw, 80vw" />
                </div>
                <figcaption className={styles.figCaption}>{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* ——— 5. Methods ——— */}
      <section className={`${styles.contentSection} ${styles.charcoal}`}>
        <div className={styles.contentInner}>
          <span className={styles.sectionNum} aria-hidden>03</span>
          <div className={`${styles.contentBody} reveal`}>
            <SectionLabel light>{sections.methods.heading}</SectionLabel>
            <h2 className={`${styles.sectionHeading} ${styles.headingLight}`}>
              {sections.methods.heading}
            </h2>
            <p className={`${styles.bodyText} ${styles.bodyLight}`}>{sections.methods.body}</p>
          </div>
        </div>
        <div className={styles.stepsGrid}>
          {sections.methods.steps.map((step) => (
            <div key={step.number} className={`${styles.step} reveal`}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNum}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
              </div>
              <p className={styles.stepDesc}>{step.description}</p>
              {step.image && (
                <figure className={styles.stepFigure}>
                  <div className={styles.stepImgWrapper}>
                    <Image src={step.image} alt={step.title} fill className={styles.stepImg}
                      sizes="(max-width: 900px) 100vw, 50vw" />
                  </div>
                  {step.imageCaption && (
                    <figcaption className={styles.figCaptionLight}>{step.imageCaption}</figcaption>
                  )}
                </figure>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ——— 6. Solution ——— */}
      <section className={`${styles.contentSection} ${styles.parchment}`}>
        <div className={styles.contentInner}>
          <span className={styles.sectionNum} aria-hidden>04</span>
          <div className={`${styles.contentBody} reveal`}>
            <SectionLabel>{sections.solution.heading}</SectionLabel>
            <h2 className={styles.sectionHeading}>{sections.solution.heading}</h2>
            {sections.solution.body.split('\n\n').map((para, i) => (
              <p key={i} className={styles.bodyText}>{para}</p>
            ))}
          </div>
        </div>
        {(sections.solution.images?.length ?? 0) > 0 && (
          <div className={styles.inlineImages}>
            {sections.solution.images!.map((img) => (
              <figure key={img.url} className={styles.inlineFigure}>
                <div className={styles.inlineImgWrapper}>
                  <Image src={img.url} alt={img.caption} fill className={styles.inlineImg}
                    sizes="(max-width: 900px) 100vw, 80vw" />
                </div>
                <figcaption className={styles.figCaption}>{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* ——— 7. Outcomes ——— */}
      <section className={`${styles.contentSection} ${styles.charcoal}`}>
        <div className={styles.contentInner}>
          <span className={styles.sectionNum} aria-hidden>05</span>
          <div className={`${styles.contentBody} reveal`}>
            <SectionLabel light>{sections.outcomes.heading}</SectionLabel>
            <h2 className={`${styles.sectionHeading} ${styles.headingLight}`}>
              {sections.outcomes.heading}
            </h2>
          </div>
        </div>
        <div className={`${styles.metricsStrip} reveal`}>
          {sections.outcomes.metrics.map((m) => (
            <div key={m.label} className={styles.metric}>
              <span className={styles.metricValue}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>
        <div className={styles.contentInner}>
          <div className={`${styles.contentBody} reveal`}>
            <p className={`${styles.bodyText} ${styles.bodyLight}`}>{sections.outcomes.body}</p>
          </div>
        </div>
        {(sections.outcomes.images?.length ?? 0) > 0 && (
          <div className={styles.inlineImages}>
            {sections.outcomes.images!.map((img) => (
              <figure key={img.url} className={styles.inlineFigure}>
                <div className={styles.inlineImgWrapper}>
                  <Image src={img.url} alt={img.caption} fill className={styles.inlineImg}
                    sizes="(max-width: 900px) 100vw, 80vw" />
                </div>
                <figcaption className={styles.figCaptionLight}>{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* ——— 8. Reflection ——— */}
      <section className={`${styles.contentSection} ${styles.parchment}`}>
        <div className={styles.contentInner}>
          <span className={styles.sectionNum} aria-hidden>06</span>
          <div className={`${styles.contentBody} reveal`}>
            <SectionLabel>{sections.reflection.heading}</SectionLabel>
            <h2 className={styles.sectionHeading}>{sections.reflection.heading}</h2>
            {sections.reflection.body.split('\n\n').map((para, i) => (
              <p key={i} className={styles.bodyText}>{para}</p>
            ))}
          </div>
        </div>
        {(sections.reflection.images?.length ?? 0) > 0 && (
          <div className={styles.inlineImages}>
            {sections.reflection.images!.map((img) => (
              <figure key={img.url} className={styles.inlineFigure}>
                <div className={styles.inlineImgWrapper}>
                  <Image src={img.url} alt={img.caption} fill className={styles.inlineImg}
                    sizes="(max-width: 900px) 100vw, 80vw" />
                </div>
                <figcaption className={styles.figCaption}>{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* ——— 9. Gallery ——— */}
      {gallery && gallery.length > 0 && (
        <section className={styles.gallerySection}>
          <div className={styles.galleryInner}>
            <header className={`${styles.galleryHeader} reveal`}>
              <SectionLabel>Project Gallery</SectionLabel>
              <h2 className={styles.galleryHeading}>Project Gallery</h2>
            </header>
            <div className="reveal">
              <LightboxGallery images={gallery} />
            </div>
          </div>
        </section>
      )}

      {/* ——— 10. Next Case Study ——— */}
      {next && (
        <Link href={`/work/${next.slug}`} className={styles.nextProject}>
          <div className={styles.nextBg}>
            <Image
              src={next.indexImage}
              alt={next.title}
              fill
              className={styles.nextImg}
              sizes="100vw"
            />
            <div className={styles.nextOverlay} />
          </div>
          <div className={styles.nextContent}>
            <SectionLabel light>Next Project</SectionLabel>
            <p className={styles.nextTitle}>{next.title}</p>
            <span className={styles.nextArrow}>→</span>
          </div>
        </Link>
      )}
    </main>
  );
}
