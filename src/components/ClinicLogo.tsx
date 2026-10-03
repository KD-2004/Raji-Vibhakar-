import React from 'react';
const logoImg = '/logo.jpg';

interface ClinicLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ClinicLogo: React.FC<ClinicLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-8 sm:h-9 w-auto max-w-[130px]',
    md: 'h-9 sm:h-12 w-auto max-w-[170px]',
    lg: 'h-12 sm:h-16 w-auto max-w-[220px]',
  };

  return (
    <img
      src={logoImg || '/logo.jpg'}
      alt="Rajvi Vibhakar Speech & Hearing Clinic"
      className={`${sizeClasses[size]} object-contain shrink-0 rounded-sm ${className}`}
    />
  );
};
