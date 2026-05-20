'use client';

import { useContactModal } from '@/lib/ContactModalContext';
import styles from './EnquireButton.module.css';

interface Props {
  serviceId: string;
  label?: string;
}

export default function EnquireButton({ serviceId, label = 'Enquire about this service' }: Props) {
  const { openContactModal } = useContactModal();

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={() => openContactModal(serviceId)}
      data-contact-trigger="true"
      data-service-id={serviceId}
    >
      {label}
    </button>
  );
}
