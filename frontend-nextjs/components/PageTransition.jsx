'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

// Utility function to wait
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const PageTransition = ({ children, href, className, ...props }) => {
  const router = useRouter();

  const handleTransition = async (e) => {
    e.preventDefault();
    const body = document.querySelector('body');
    body?.classList.add('page-transition');
    await sleep(400);
    router.push(href);
    body?.classList.remove('page-transition');
  };

  return (
    <Link
      href={href}
      onClick={handleTransition}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PageTransition;
