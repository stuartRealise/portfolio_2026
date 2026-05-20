import servicesData from '@/content/services.json';
import styles from './StaticContactModal.module.css';

type ServiceEntry = { id: string; status: string; name: string };
const activeServices = (servicesData as ServiceEntry[]).filter((s) => s.status === 'active');

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/YOUR_FORM_ID';

export default function StaticContactModal() {
  return (
    <div
      id="contact-modal-static"
      className={styles.overlay}
      aria-hidden="true"
      role="presentation"
    >
      <div
        id="contact-modal-static-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cmf-heading"
        className={styles.panel}
      >
        <div className={styles.header}>
          <h2 id="cmf-heading" className={styles.heading}>
            Get in touch
          </h2>
          <button
            type="button"
            id="contact-modal-static-close"
            className={styles.closeBtn}
            aria-label="Close contact form"
          >
            ×
          </button>
        </div>

        <form className={styles.form} action={FORMSPREE_ENDPOINT} method="POST">
          <input type="hidden" name="_subject" value="New enquiry — Aitken Interactive" />
          <input type="hidden" name="_to" value="stuart@aitken-interactive.co.uk" />

          <div className={styles.fieldGroup}>
            <label htmlFor="cmf-service" className={styles.label}>
              Service<span className={styles.required} aria-hidden="true"> *</span>
            </label>
            <select id="cmf-service" name="_service" required className={styles.select}>
              <option value="">Select a service…</option>
              {activeServices.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="cmf-name" className={styles.label}>
              Your name<span className={styles.required} aria-hidden="true"> *</span>
            </label>
            <input id="cmf-name" type="text" name="name" required className={styles.input} />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="cmf-email" className={styles.label}>
              Email address<span className={styles.required} aria-hidden="true"> *</span>
            </label>
            <input id="cmf-email" type="email" name="email" required className={styles.input} />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="cmf-phone" className={styles.label}>
              Contact number
            </label>
            <input
              id="cmf-phone"
              type="tel"
              name="phone"
              className={styles.input}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="cmf-message" className={styles.label}>
              Your enquiry
              <span className={styles.required} aria-hidden="true"> *</span>
            </label>
            <textarea
              id="cmf-message"
              name="message"
              required
              rows={4}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formFooter}>
            <button type="submit" className={styles.submitBtn}>
              Send enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
