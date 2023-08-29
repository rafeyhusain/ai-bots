import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link href="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/privacy">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/terms">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link href="/cookies">
              Cookie Settings
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
