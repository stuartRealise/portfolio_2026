import styles from './Intro.module.css';

interface Props {
  pullQuote: string;
  bio: string;
}

export default function Intro({ pullQuote, bio }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={`${styles.pullQuoteCol} reveal`}>
          <blockquote className={styles.pullQuote}>
            <p>{pullQuote}</p>
          </blockquote>
        </div>
        <div className={`${styles.bioCol} reveal reveal-delay-2`}>
          <p className={styles.bio}>{bio}</p>
        </div>
      </div>
    </section>
  );
}
