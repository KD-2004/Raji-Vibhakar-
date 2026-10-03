import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  onNavigate?: (path: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  onNavigate,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // If default was prevented, do nothing
    if (e.defaultPrevented) return;

    // Standard modifiers should open in new tab (Ctrl/Cmd/Shift/Alt or right click)
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    // Only handle internal relative paths
    if (href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(href);
      } else if (typeof window !== 'undefined') {
        window.history.pushState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};
