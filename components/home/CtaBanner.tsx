'use client';

import { useContactModal } from '@/lib/ContactModalContext';
import styles from './CtaBanner.module.css';

export interface CtaButton {
  label: string;
  serviceId?: string;
  variant?: 'primary' | 'outline';
}

interface Props {
  heading?: string;
  subline?: string;
  buttons?: CtaButton[];
}

const DEFAULT_BUTTONS: CtaButton[] = [
  { label: 'Get the Audit', serviceId: 'decision-intelligence-audit', variant: 'primary' },
  { label: 'Get the Evaluation', serviceId: 'heuristic-evaluation', variant: 'outline' },
];

export default function CtaBanner({
  heading = 'Have a decision to make?',
  subline = 'Both services deliver in 72 hours. Pick the one that fits your situation.',
  buttons = DEFAULT_BUTTONS,
}: Props) {
  const { openContactModal } = useContactModal();

  return (
    <section className={styles.section}>
      <div className={`${styles.inner} reveal`}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subline}>{subline}</p>
        <div className={styles.buttons}>
          {buttons.map((btn) => (
            <button
              key={btn.label}
              type="button"
              className={`${styles.btn} ${btn.variant === 'outline' ? styles.btnOutline : ''}`}
              onClick={() => openContactModal(btn.serviceId)}
              data-contact-trigger="true"
              data-service-id={btn.serviceId ?? ''}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
