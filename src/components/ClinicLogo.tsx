import React from 'react';

const logoSource = '/logo.jpg';
const logoTransform = (width: number) =>
  `/.netlify/images?url=${encodeURIComponent(logoSource)}&w=${width}&fm=webp&q=75`;

interface ClinicLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
}

export const ClinicLogo: React.FC<ClinicLogoProps> = ({
  className = '',
  size = 'md',
  priority = false,
}) => {
  const sizeConfig = {
    sm: { classes: 'h-8 sm:h-9 w-auto max-w-[130px]', sizes: '(min-width: 640px) 130px, 120px' },
    md: { classes: 'h-9 sm:h-12 w-auto max-w-[170px]', sizes: '(min-width: 640px) 170px, 130px' },
    lg: { classes: 'h-12 sm:h-16 w-auto max-w-[220px]', sizes: '(min-width: 640px) 220px, 180px' },
  } as const;

  const config = sizeConfig[size];

  return (
    <img
      src={logoTransform(220)}
      srcSet={`${logoTransform(220)} 220w, ${logoTransform(440)} 440w`}
      sizes={config.sizes}
      width={220}
      height={136}
      alt="Rajvi Vibhakar Speech & Hearing Clinic"
      className={`${config.classes} object-contain shrink-0 rounded-sm ${className}`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
};
