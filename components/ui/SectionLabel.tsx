import styles from './SectionLabel.module.css';

interface Props {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

export default function SectionLabel({ children, light, className }: Props) {
  return (
    <p className={`${styles.label} ${light ? styles.light : ''} ${className ?? ''}`}>
      {children} 
    </p>
  );
}
