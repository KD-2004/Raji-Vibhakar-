# Rajvi Vibhakar Speech & Hearing

Production website for Rajvi Vibhakar Parikh, Audiologist & Speech-Language Therapist, serving Dahisar East, Mumbai.

## Verified business information

- Professional: Rajvi Vibhakar Parikh
- Designation: Audiologist & Speech-Language Therapist
- Phone: +91 8898330707
- Email: rajvivibhakar@gmail.com
- Address: Shop No. 1, Ramkunwar Thakur Marg, Opp. Pragati Hospital, Krishna Colony, Dahisar East, Mumbai, Maharashtra 400068, India
- Website: https://rajvivibhakar.com/

## Build

Node.js 22.x is recommended.

```bash
npm ci
npm run lint
npm run build
```

The build creates statically prerendered HTML for the public routes, plus `404.html`, `robots.txt`, and `sitemap.xml`.

## Deployment

### Netlify

The repository includes `netlify.toml`.

- Build command: `npm run build`
- Publish directory: `dist`
- Node: 22

Because the important routes are statically generated, do not add a blanket SPA rewrite that sends every unknown URL to the homepage. The generated `404.html` should remain the fallback for invalid URLs.

### Other static hosting

Publish the `dist/` directory after running the production build. Configure the host so the generated route directories and `404.html` are served directly.

## SEO launch checklist

1. Confirm the canonical domain is correct.
2. Deploy over HTTPS.
3. Verify `/robots.txt` and `/sitemap.xml`.
4. Verify every service and article URL loads directly.
5. Verify invalid URLs return the 404 page.
6. Add and verify the domain in Google Search Console.
7. Submit the sitemap.
8. Inspect the homepage and priority service pages.
9. Connect GA4 only after a real Measurement ID is available.
10. Keep Google Business Profile name, address, phone, hours, services and website accurate and consistent.
11. Use only genuine reviews and authentic clinic photos.

## Important content policy

This is a healthcare website. Do not add fabricated credentials, reviews, testimonials, medical claims, success rates, or business details.

Medical/educational content should be reviewed by the clinician before being presented as clinician-reviewed material.

## Source

The implementation uses a React/Vite frontend with static prerendering and a privacy-safe analytics utility. The website does not claim an appointment has been delivered merely because WhatsApp was opened.
