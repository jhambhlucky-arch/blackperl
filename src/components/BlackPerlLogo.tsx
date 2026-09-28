import React from 'react';

interface BlackPerlLogoProps {
  className?: string;
  size?: number;
}

export const BlackPerlLogo: React.FC<BlackPerlLogoProps> = ({ className = 'h-9 w-auto', size }) => {
  return (
    <img
      src="/logo.svg"
      alt="BlackPerl DFIR"
      width={size}
      height={size}
      className={`object-contain shrink-0 ${className}`}
    />
  );
};
