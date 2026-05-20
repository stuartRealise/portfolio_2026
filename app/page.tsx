import { getSiteData, getServices, getFeaturedWork } from '@/lib/content';
import Hero from '@/components/home/Hero';
import Intro from '@/components/home/Intro';
import ServicesTeaser from '@/components/home/ServicesTeaser';
import WorkTeaser from '@/components/home/WorkTeaser';
import CtaBanner from '@/components/home/CtaBanner';
import ParallaxSection from '@/components/ui/ParallaxSection';
import SectionLabel from '@/components/ui/SectionLabel';

export default function HomePage() {
  const site = getSiteData();
  const services = getServices();
  const featured = getFeaturedWork(3);

  return (
    <main id="main-content">
      <Hero tagline={site.tagline} subline="Better products start with better decisions.
I work with founders and product leaders to bring clarity to complex product challenges before misalignment, inconsistency, and technical debt become expensive." />

      <Intro pullQuote={site.about.pullQuote} bio={site.bio} />

      <ParallaxSection
        imageUrl="/assets/homepage/decisions.png"
        imageAlt="Strategy session — team at a whiteboard planning product direction"
        height="60vh"
        overlayOpacity={0.62}
      >
        <SectionLabel light>— Services</SectionLabel>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 400,
            color: 'var(--color-white)',
            maxWidth: '40ch',
            lineHeight: 1.3,
            // marginTop: '0.75rem',
          }}
        >
          Decisions that move products forward.
        </p>
      </ParallaxSection>

      <ServicesTeaser services={services} />

      <WorkTeaser items={featured} />

      <CtaBanner />
    </main>
  );
}
