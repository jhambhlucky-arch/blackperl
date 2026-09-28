import React from 'react';

interface BlackPerlLogoProps {
  className?: string;
  size?: number;
}

export const BlackPerlLogo: React.FC<BlackPerlLogoProps> = ({ className = 'w-9 h-9', size }) => {
  return (
    <img
      src="/logo.svg"
      alt="BlackPerl"
      width={size || 36}
      height={size || 36}
      className={`object-contain shrink-0 ${className}`}
    />
  );
};
