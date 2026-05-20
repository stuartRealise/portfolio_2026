'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './ParallaxSection.module.css';

interface Props {
  imageUrl: string;
  imageAlt: string;
  height?: string;
  overlayOpacity?: number;
  children?: React.ReactNode;
}

export default function ParallaxSection({
  imageUrl,
  imageAlt,
  height = '60vh',
  overlayOpacity = 0.4,
  children,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const imageWrapper = imageWrapperRef.current;
    if (!container || !imageWrapper) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = elementCenter - viewportCenter;
        const offset = Math.max(-80, Math.min(80, distanceFromCenter * 0.3));
        imageWrapper.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container} style={{ height }}>
      <div ref={imageWrapperRef} className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className={styles.image}
          sizes="100vw"
        />
      </div>
      <div className={styles.overlay} style={{ opacity: overlayOpacity }} />
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
