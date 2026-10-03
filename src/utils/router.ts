import { useState, useEffect } from 'react';
import { CANONICAL_DOMAIN } from '../data/clinicData';

// Custom lightweight SPA routing helper
export function usePath(): [string, (to: string) => void] {
  const [path, setPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (typeof window !== 'undefined') {
      const hashIndex = to.indexOf('#');

      if (to.startsWith('#')) {
        const element = document.querySelector(to);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      const pathname = hashIndex >= 0 ? to.slice(0, hashIndex) || '/' : to;
      const hash = hashIndex >= 0 ? to.slice(hashIndex + 1) : '';

      window.history.pushState({}, '', to);
      setPath(pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (hash) {
        window.setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
      }
    }
  };

  return [path, navigate];
}

export function updatePageMeta(title: string, description: string, canonicalPath: string = '/') {
  if (typeof document === 'undefined') return;

  // Title
  document.title = title;

  // Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  const cleanPath = canonicalPath === '/' ? '' : canonicalPath;
  canonical.setAttribute('href', `${CANONICAL_DOMAIN}${cleanPath}`);

  // OpenGraph Tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', `${CANONICAL_DOMAIN}${cleanPath}`);
}
