import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css'; 

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
    <nav>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href="/contact" passHref>
            Contact
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href="/privacy" passHref>
            Privacy Policy
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href="/terms" passHref>
            Terms of Service
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href="/cookies" passHref>
            Cookie Settings
          </Link>
        </li>
      </ul>
    </nav>
  </footer>
  );
};

export default Footer;
