import styles from './StaticLightbox.module.css';

export default function StaticLightbox() {
  return (
    <div
      id="lightbox-static"
      className={styles.overlay}
      aria-hidden="true"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        id="lightbox-static-close"
        type="button"
        className={styles.closeBtn}
        aria-label="Close lightbox"
      >
        ×
      </button>

      <button
        id="lightbox-static-prev"
        type="button"
        className={`${styles.navBtn} ${styles.navPrev}`}
        aria-label="Previous image"
      >
        ‹
      </button>

      <div className={styles.imageArea}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img id="lightbox-static-img" className={styles.image} alt="" />
        <p id="lightbox-static-caption" className={styles.caption} />
      </div>

      <button
        id="lightbox-static-next"
        type="button"
        className={`${styles.navBtn} ${styles.navNext}`}
        aria-label="Next image"
      >
        ›
      </button>

      <p id="lightbox-static-counter" className={styles.counter} />
    </div>
  );
}
