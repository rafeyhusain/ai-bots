import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <div className="sign-in">
          <Link href="/signin">
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
