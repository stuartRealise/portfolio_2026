'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import ContactModal from '@/components/ui/ContactModal';

interface ContactModalContextValue {
  isOpen: boolean;
  selectedServiceId: string | null;
  openContactModal: (serviceId?: string) => void;
  closeContactModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const openContactModal = useCallback((serviceId?: string) => {
    setSelectedServiceId(serviceId ?? null);
    setIsOpen(true);
    // iOS Safari ignores overflow:hidden on body and breaks position:fixed.
    // The correct lock: freeze body at current scroll position using position:fixed.
    const y = window.scrollY;
    document.body.dataset.scrollY = String(y);
    document.body.style.position = 'fixed';
    document.body.style.top = `-${y}px`;
    document.body.style.width = '100%';
  }, []);

  // Signal to the inline fallback script that React has mounted and is in control.
  // Also hides the static fallback modal if it was open before hydration.
  useEffect(() => {
    document.body.setAttribute('data-contact-react-mounted', 'true');
    const staticModal = document.getElementById('contact-modal-static') as HTMLElement | null;
    if (staticModal) staticModal.style.display = 'none';
    return () => {
      document.body.removeAttribute('data-contact-react-mounted');
    };
  }, []);

  const closeContactModal = useCallback(() => {
    setIsOpen(false);
    setSelectedServiceId(null);
    // Restore scroll position lost when body was fixed
    const y = parseInt(document.body.dataset.scrollY ?? '0', 10);
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    delete document.body.dataset.scrollY;
    window.scrollTo(0, y);
  }, []);

  return (
    <ContactModalContext.Provider
      value={{ isOpen, selectedServiceId, openContactModal, closeContactModal }}
    >
      {children}
      <ContactModal />
    </ContactModalContext.Provider>
  );
}

export function useContactModal(): ContactModalContextValue {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error('useContactModal must be used within ContactModalProvider');
  return ctx;
}
