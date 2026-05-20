'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import type { CaseStudyImage } from '@/lib/content';
import styles from './Lightbox.module.css';

const SWIPE_THRESHOLD = 50;

interface Props {
  images: CaseStudyImage[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, activeIndex, onClose, onNavigate }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(
    () => onNavigate((activeIndex - 1 + images.length) % images.length),
    [activeIndex, images.length, onNavigate],
  );
  const next = useCallback(
    () => onNavigate((activeIndex + 1) % images.length),
    [activeIndex, images.length, onNavigate],
  );

  // Focus close button on open; keyboard navigation
  useEffect(() => {
    closeRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowLeft')  { prev(); return; }
      if (e.key === 'ArrowRight') { next(); return; }

      // Basic focus trap
      if (e.key !== 'Tab') return;
      const focusable = Array.from(
        overlayRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, prev, next]);

  const active = images[activeIndex];
  if (!active) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={(e) => e.target === overlayRef.current && onClose()}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > SWIPE_THRESHOLD) dx < 0 ? next() : prev();
        touchStartX.current = null;
      }}
    >
      <button
        ref={closeRef}
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ×
      </button>

      <div className={styles.imageArea}>
        <div className={styles.imageWrapper}>
          <Image
            src={active.url}
            alt={active.caption}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 90vw"
          />
        </div>
        {active.caption && (
          <p className={styles.caption}>{active.caption}</p>
        )}
      </div>

      {images.length > 1 && (
        <>
          <button
            className={`${styles.navBtn} ${styles.navPrev}`}
            onClick={prev}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className={`${styles.navBtn} ${styles.navNext}`}
            onClick={next}
            aria-label="Next image"
          >
            ›
          </button>
          <p className={styles.counter} aria-live="polite">
            {activeIndex + 1} / {images.length}
          </p>
        </>
      )}
    </div>
  );
}
