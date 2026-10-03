/**
 * Static Site Generation (SSG) & Route Pre-rendering Engine
 * Generates SEO-crawlable static HTML files for all routes during build.
 * Ensures Googlebot, Bingbot, and users receive fully-rendered semantic HTML with unique metadata,
 * canonical tags, and validated Schema.org structured data.
 */

import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import {
  CLINIC_INFO,
  CANONICAL_DOMAIN,
  ALL_SERVICES,
  HEALTH_INSIGHTS,
} from '../src/data/clinicData';

interface RouteSEO {
  path: string;
  outputPath: string;
  title: string;
  description: string;
  schema: object;
}

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error('Error: dist/index.html not found. Run "vite build" first.');
  process.exit(1);
}

const htmlTemplate = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

// Base Schema definitions
const clinicSchema = {
  '@type': ['LocalBusiness', 'MedicalBusiness'],
  '@id': `${CANONICAL_DOMAIN}/#clinic`,
  name: CLINIC_INFO.businessName,
  alternateName: CLINIC_INFO.siteName,
  description: CLINIC_INFO.tagline,
  image: `${CANONICAL_DOMAIN}/og-image.svg`,
  telephone: `+91${CLINIC_INFO.contact.phone}`,
  email: CLINIC_INFO.contact.email,
  url: `${CANONICAL_DOMAIN}/`,
  hasMap: CLINIC_INFO.location.googleMapsSearchUrl,
  medicalSpecialty: ['Audiology', 'SpeechPathology'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop No. 1, Ramkunwar Thakur Marg, Krishna Colony',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400068',
    addressCountry: 'IN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
  ],
  areaServed: [
    { '@type': 'Place', name: 'Dahisar East' },
    { '@type': 'Place', name: 'Dahisar West' },
    { '@type': 'Place', name: 'Borivali' },
    { '@type': 'Place', name: 'Mira Road' },
    { '@type': 'Place', name: 'Kandivali' },
    { '@type': 'City', name: 'Mumbai' },
  ],
};

const practitionerSchema = {
  '@type': 'Person',
  '@id': `${CANONICAL_DOMAIN}/#practitioner`,
  name: CLINIC_INFO.professionalName,
  jobTitle: CLINIC_INFO.professionalTitle,
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: CLINIC_INFO.professionalCredentials.institution,
  },
  award: CLINIC_INFO.professionalCredentials.meritRank,
  knowsLanguage: ['en', 'gu', 'hi', 'mr'],
  worksFor: {
    '@id': `${CANONICAL_DOMAIN}/#clinic`,
  },
};

const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${CANONICAL_DOMAIN}/#website`,
  url: `${CANONICAL_DOMAIN}/`,
  name: CLINIC_INFO.siteName,
  publisher: {
    '@id': `${CANONICAL_DOMAIN}/#clinic`,
  },
};

// Build route registry
const routes: RouteSEO[] = [];

// 1. Homepage
routes.push({
  path: '/',
  outputPath: path.join(DIST_DIR, 'index.html'),
  title: 'Audiologist & Speech Therapist in Dahisar East, Mumbai | Rajvi Vibhakar',
  description:
    'Audiologist and speech therapist in Dahisar East, Mumbai offering hearing tests, audiology services, hearing aid trials and speech-language therapy for children and adults. Call 8898330707.',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [clinicSchema, practitionerSchema, websiteSchema],
  },
});

// 2. About Page
routes.push({
  path: '/about',
  outputPath: path.join(DIST_DIR, 'about', 'index.html'),
  title: `About Rajvi Vibhakar Parikh | Audiologist & Speech-Language Therapist Dahisar East`,
  description: `Learn about Rajvi Vibhakar Parikh (BASLP, AYJNISHD Mumbai), State Merit Rank 1 under MUHS in Motor Speech Disorders (2020), clinical experience, and multilingual care.`,
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      practitionerSchema,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'About', item: `${CANONICAL_DOMAIN}/about` },
        ],
      },
    ],
  },
});

// 3. Contact Page
routes.push({
  path: '/contact',
  outputPath: path.join(DIST_DIR, 'contact', 'index.html'),
  title: `Contact Clinic in Dahisar East, Mumbai | Rajvi Vibhakar Speech & Hearing`,
  description: `Visit our Dahisar East clinic opposite Pragati Hospital on Ramkunwar Thakur Marg. Phone: 8898330707. Mon-Sat 9AM-8PM. Multilingual audiology and speech therapy.`,
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      clinicSchema,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: `${CANONICAL_DOMAIN}/contact` },
        ],
      },
    ],
  },
});

// 4. Book Appointment Page
routes.push({
  path: '/book-appointment',
  outputPath: path.join(DIST_DIR, 'book-appointment', 'index.html'),
  title: `Book Consultation | Hearing Test & Speech Therapy in Dahisar East`,
  description: `Reserve your hearing test, digital hearing aid trial, or speech-language therapy consultation at our Dahisar East clinic. Call or WhatsApp 8898330707.`,
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Book Appointment', item: `${CANONICAL_DOMAIN}/book-appointment` },
        ],
      },
    ],
  },
});

// 5. Privacy Policy Page
routes.push({
  path: '/privacy-policy',
  outputPath: path.join(DIST_DIR, 'privacy-policy', 'index.html'),
  title: `Privacy Policy | Rajvi Vibhakar Speech & Hearing Clinic`,
  description: `Our healthcare privacy policy explains how appointment inquiries and patient contact data are safeguarded in strict confidence without advertising tracking.`,
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${CANONICAL_DOMAIN}/privacy-policy` },
        ],
      },
    ],
  },
});

// 6. Insights Index Page
routes.push({
  path: '/insights',
  outputPath: path.join(DIST_DIR, 'insights', 'index.html'),
  title: `Hearing & Speech Health Insights | Dahisar East | Rajvi Vibhakar`,
  description: `Educational articles and guidance on hearing health, childhood communication development, stuttering, and aphasia.`,
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Insights', item: `${CANONICAL_DOMAIN}/insights` },
        ],
      },
    ],
  },
});

// 7. Individual Health Insights
for (const insight of HEALTH_INSIGHTS) {
  routes.push({
    path: `/insights/${insight.slug}`,
    outputPath: path.join(DIST_DIR, 'insights', insight.slug, 'index.html'),
    title: `${insight.title} | Rajvi Vibhakar Speech & Hearing`,
    description: insight.excerpt,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'MedicalWebPage',
          headline: insight.title,
          description: insight.excerpt,
          url: `${CANONICAL_DOMAIN}/insights/${insight.slug}`,
          publisher: {
            '@type': 'MedicalBusiness',
            name: CLINIC_INFO.businessName,
            url: `${CANONICAL_DOMAIN}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_DOMAIN}/` },
            { '@type': 'ListItem', position: 2, name: 'Insights', item: `${CANONICAL_DOMAIN}/insights` },
            { '@type': 'ListItem', position: 3, name: insight.title, item: `${CANONICAL_DOMAIN}/insights/${insight.slug}` },
          ],
        },
      ],
    },
  });
}

// 8. Individual Clinical Services
for (const service of ALL_SERVICES) {
  const serviceGraph: object[] = [
    {
      '@type': 'Service',
      name: service.name,
      description: service.description,
      serviceType: service.category === 'hearing' ? 'Audiology' : 'Speech-Language Therapy',
      provider: {
        '@id': `${CANONICAL_DOMAIN}/#clinic`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_DOMAIN}/` },
        { '@type': 'ListItem', position: 2, name: service.name, item: `${CANONICAL_DOMAIN}/${service.slug}` },
      ],
    },
  ];


  routes.push({
    path: `/${service.slug}`,
    outputPath: path.join(DIST_DIR, service.slug, 'index.html'),
    title: `${service.customerTitle} | Rajvi Vibhakar`,
    description: service.description,
    schema: {
      '@context': 'https://schema.org',
      '@graph': serviceGraph,
    },
  });
}

// 9. 404 Page
routes.push({
  path: '/404',
  outputPath: path.join(DIST_DIR, '404.html'),
  title: 'Page Not Found (404) | Rajvi Vibhakar Speech & Hearing',
  description: 'The requested page could not be found. Explore audiology services, hearing assessments, and speech therapy in Dahisar East, Mumbai.',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Page Not Found',
  },
});

console.log(`Starting static prerendering for ${routes.length} routes...`);

for (const route of routes) {
  const dir = path.dirname(route.outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Render React Component tree to string
  const appHtml = renderToString(React.createElement(App as React.ComponentType<{ initialPath?: string }>, { initialPath: route.path }));

  // Replace Title
  let pageHtml = htmlTemplate.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

  // Replace Meta Name Title
  pageHtml = pageHtml.replace(
    /<meta name="title" content=".*?" \/>/i,
    `<meta name="title" content="${route.title.replace(/"/g, '&quot;')}" />`
  );

  // Replace Meta Description
  pageHtml = pageHtml.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${route.description.replace(/"/g, '&quot;')}" />`
  );

  // Replace Canonical Link
  const canonicalUrl = route.path === '/' ? `${CANONICAL_DOMAIN}/` : `${CANONICAL_DOMAIN}${route.path}`;
  pageHtml = pageHtml.replace(
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace OpenGraph Title & Description & URL
  pageHtml = pageHtml.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${route.title.replace(/"/g, '&quot;')}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${route.description.replace(/"/g, '&quot;')}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  // Replace Twitter Title & Description
  pageHtml = pageHtml.replace(
    /<meta name="twitter:title" content=".*?" \/>/i,
    `<meta name="twitter:title" content="${route.title.replace(/"/g, '&quot;')}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta name="twitter:description" content=".*?" \/>/i,
    `<meta name="twitter:description" content="${route.description.replace(/"/g, '&quot;')}" />`
  );

  // Inject or Replace JSON-LD Schema
  const jsonLdString = `<script type="application/ld+json">\n${JSON.stringify(route.schema, null, 2)}\n    </script>`;
  if (pageHtml.includes('<script type="application/ld+json">')) {
    pageHtml = pageHtml.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, jsonLdString);
  } else {
    pageHtml = pageHtml.replace('</head>', `  ${jsonLdString}\n  </head>`);
  }

  // Inject prerendered markup into root div
  pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  // Write file
  fs.writeFileSync(route.outputPath, pageHtml, 'utf-8');
  console.log(`✓ Prerendered: ${route.path} -> ${path.relative(process.cwd(), route.outputPath)}`);
}

// Keep the sitemap synchronized with the exact static routes produced above.
const sitemapRoutes = routes.filter((route) => route.path !== '/404').map((route) => {
  const loc = route.path === '/' ? `${CANONICAL_DOMAIN}/` : `${CANONICAL_DOMAIN}${route.path}`;
  return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
});
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapRoutes.join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');

console.log(`\nAll ${routes.length} routes successfully prerendered into dist/ with static HTML and a real 404 page!`);\n