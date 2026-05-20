'use client';

import { useCallback, useEffect, useReducer, useRef } from 'react';
import { useContactModal } from '@/lib/ContactModalContext';
import { getActiveServicesClient, getContactConfigClient } from '@/lib/clientContent';
import { FORMSPREE_ENDPOINT } from '@/lib/constants';
import styles from './ContactModal.module.css';

const ACTIVE_SERVICES = getActiveServicesClient();
const CONTACT_CONFIG = getContactConfigClient();

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Status = 'idle' | 'loading' | 'success' | 'error';

type FormState = {
  step: 1 | 2;
  activeServiceId: string | null;
  formValues: Record<string, string>;
  status: Status;
  errorMsg: string;
};

type FormAction =
  | { type: 'open'; selectedServiceId: string | null }
  | { type: 'select_service'; id: string }
  | { type: 'back' }
  | { type: 'set_field'; name: string; value: string }
  | { type: 'submit_start' }
  | { type: 'submit_success' }
  | { type: 'submit_error'; message: string };

const initialState: FormState = {
  step: 1,
  activeServiceId: null,
  formValues: {},
  status: 'idle',
  errorMsg: '',
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'open':
      return {
        step: action.selectedServiceId ? 2 : 1,
        activeServiceId: action.selectedServiceId,
        formValues: {},
        status: 'idle',
        errorMsg: '',
      };
    case 'select_service':
      return { ...state, activeServiceId: action.id, step: 2 };
    case 'back':
      return { ...state, step: 1 };
    case 'set_field':
      return { ...state, formValues: { ...state.formValues, [action.name]: action.value } };
    case 'submit_start':
      return { ...state, status: 'loading', errorMsg: '' };
    case 'submit_success':
      return { ...state, status: 'success' };
    case 'submit_error':
      return { ...state, status: 'error', errorMsg: action.message };
  }
}

export default function ContactModal() {
  const { isOpen, selectedServiceId, closeContactModal } = useContactModal();
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [{ step, activeServiceId, formValues, status, errorMsg }, dispatch] = useReducer(
    formReducer,
    initialState,
  );

  // Single dispatch — one render — instead of five separate setState calls
  useEffect(() => {
    if (isOpen) {
      dispatch({ type: 'open', selectedServiceId: selectedServiceId ?? null });
    }
  }, [isOpen, selectedServiceId]);

  // Focus trap + ESC — re-runs when step changes so selector picks up new fields
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const timer = setTimeout(() => {
      const first = modal.querySelectorAll<HTMLElement>(FOCUSABLE)[0];
      first?.focus();
    }, 60);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeContactModal();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = Array.from(modal.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, step, closeContactModal]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) closeContactModal();
    },
    [closeContactModal],
  );

  const activeService = ACTIVE_SERVICES.find((s) => s.id === activeServiceId) ?? null;
  const fields = activeService?.intakeFields ?? [];

  function handleServiceSelect(id: string) {
    dispatch({ type: 'select_service', id });
  }

  function handleField(name: string, value: string) {
    dispatch({ type: 'set_field', name, value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: 'submit_start' });

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...formValues, _service: activeServiceId }),
      });

      if (res.ok) {
        dispatch({ type: 'submit_success' });
      } else {
        const data = await res.json().catch(() => ({}));
        dispatch({
          type: 'submit_error',
          message: (data as { error?: string }).error ?? CONTACT_CONFIG.errorMessage,
        });
      }
    } catch {
      dispatch({ type: 'submit_error', message: CONTACT_CONFIG.errorMessage });
    }
  }

  if (!isOpen) return null;

  const modalHeadingId = 'contact-modal-heading';

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="presentation"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalHeadingId}
        className={styles.panel}
      >
        {/* ——— Header ——— */}
        <div className={styles.header}>
          <div>
            <p className={styles.progress}>Step {step} of 2</p>
            <h2 id={modalHeadingId} className={styles.heading}>
              {step === 1
                ? 'How can I help?'
                : (activeService?.name ?? 'Get in touch')}
            </h2>
          </div>
          <button
            className={styles.closeBtn}
            onClick={closeContactModal}
            aria-label="Close contact form"
          >
            ×
          </button>
        </div>

        {/* ——— Step 1: Service Picker ——— */}
        {step === 1 && (
          <div className={styles.picker}>
            <p className={styles.pickerHint}>
              Choose the service that fits your situation.
            </p>
            <div className={styles.serviceCards}>
              {ACTIVE_SERVICES.map((s) => (
                <button
                  key={s.id}
                  className={styles.serviceCard}
                  onClick={() => handleServiceSelect(s.id)}
                >
                  <span className={styles.cardName}>{s.name}</span>
                  <span className={styles.cardTagline}>{s.tagline}</span>
                  <span className={styles.cardDesc}>{s.description}</span>
                  {s.duration && (
                    <span className={styles.cardBadge}>{s.duration}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ——— Step 2: Intake Form ——— */}
        {step === 2 && status !== 'success' && (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {fields.map((field) => (
              <div key={field.name} className={styles.fieldGroup}>
                <label htmlFor={`cf-${field.name}`} className={styles.label}>
                  {field.label}
                  {field.required && (
                    <span className={styles.required} aria-hidden="true"> *</span>
                  )}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    id={`cf-${field.name}`}
                    name={field.name}
                    required={field.required}
                    rows={4}
                    className={styles.textarea}
                    value={formValues[field.name] ?? ''}
                    onChange={(e) => handleField(field.name, e.target.value)}
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={`cf-${field.name}`}
                    name={field.name}
                    required={field.required}
                    className={styles.select}
                    value={formValues[field.name] ?? ''}
                    onChange={(e) => handleField(field.name, e.target.value)}
                  >
                    <option value="">Select…</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={`cf-${field.name}`}
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    className={styles.input}
                    value={formValues[field.name] ?? ''}
                    onChange={(e) => handleField(field.name, e.target.value)}
                  />
                )}
              </div>
            ))}

            {status === 'error' && (
              <p className={styles.errorMsg} role="alert">{errorMsg}</p>
            )}

            <div className={styles.formFooter}>
              {!selectedServiceId && (
                <button
                  type="button"
                  className={styles.backBtn}
                  onClick={() => dispatch({ type: 'back' })}
                >
                  ← Back
                </button>
              )}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'loading'}
                aria-busy={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className={styles.spinner} aria-label="Sending" role="status" />
                ) : (
                  'Send enquiry'
                )}
              </button>
            </div>
          </form>
        )}

        {/* ——— Success ——— */}
        {step === 2 && status === 'success' && (
          <div className={styles.success} role="status" aria-live="polite">
            <span className={styles.successCheck} aria-hidden="true">✓</span>
            <p className={styles.successMsg}>{CONTACT_CONFIG.successMessage}</p>
            <button className={styles.successClose} onClick={closeContactModal}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
