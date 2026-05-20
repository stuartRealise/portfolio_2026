'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { CaseStudyImage } from '@/lib/content';
import Lightbox from './Lightbox';
import styles from './LightboxGallery.module.css';

interface Props {
  images: CaseStudyImage[];
}

export default function LightboxGallery({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Signal to the vanilla JS fallback that React has hydrated and owns the lightbox.
  // Also hide the static lightbox if it was open before hydration.
  useEffect(() => {
    document.body.setAttribute('data-lightbox-react-mounted', 'true');
    const staticLb = document.getElementById('lightbox-static') as HTMLElement | null;
    if (staticLb) staticLb.style.display = 'none';
    return () => {
      document.body.removeAttribute('data-lightbox-react-mounted');
    };
  }, []);

  return (
    <>
      <div className={styles.grid} data-lightbox-gallery="true">
        {images.map((img, i) => (
          <figure key={i} className={styles.item}>
            {/* data-lightbox-* attributes are picked up by the vanilla JS fallback
                when React hasn't hydrated. onClick + preventDefault takes over when it has. */}
            <a
              href={img.url}
              className={styles.imageBtn}
              onClick={(e) => { e.preventDefault(); setActiveIndex(i); }}
              aria-label={`View full size: ${img.caption}`}
              data-lightbox-src={img.url}
              data-lightbox-index={i}
              data-lightbox-caption={img.caption}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={img.url}
                  alt={img.caption}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.hoverOverlay} aria-hidden="true">
                  <span className={styles.expandIcon}>⤢</span>
                </div>
              </div>
            </a>
            <figcaption className={styles.caption}>{img.caption}</figcaption>
          </figure>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={images}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
