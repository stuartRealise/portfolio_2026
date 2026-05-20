'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { CaseStudyImage } from '@/lib/content';
import styles from './ImageCarousel.module.css';

interface Props {
  images: CaseStudyImage[];
  onImageClick?: (index: number) => void;
}

export default function ImageCarousel({ images, onImageClick }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement;
    track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
    setActiveIndex(index);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const scrollLeft = track.scrollLeft;
    const slideWidth = (track.children[0] as HTMLElement)?.offsetWidth ?? 1;
    setActiveIndex(Math.round(scrollLeft / slideWidth));
  }

  if (images.length === 0) return null;

  return (
    <div className={styles.carousel}>
      <div ref={trackRef} className={styles.track} onScroll={handleScroll}>
        {images.map((img, i) => (
          <figure
            key={i}
            className={styles.slide}
            onClick={() => onImageClick?.(i)}
            role={onImageClick ? 'button' : undefined}
            tabIndex={onImageClick ? 0 : undefined}
            onKeyDown={onImageClick ? (e) => e.key === 'Enter' && onImageClick(i) : undefined}
            aria-label={onImageClick ? `View full size: ${img.caption}` : undefined}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={img.url}
                alt={img.caption}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 90vw, 60vw"
              />
            </div>
            {img.caption && (
              <figcaption className={styles.caption}>{img.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>

      {images.length > 1 && (
        <div className={styles.dots} aria-hidden>
          {images.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
