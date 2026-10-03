/**
 * Privacy-Safe Healthcare Analytics Tracking Utility
 * Master Specification Compliance:
 * - Uses allowlist for event names and parameters
 * - NEVER sends patient names, phone numbers, symptoms, or medical details
 * - Uses 'appointment_whatsapp_opened' instead of unconfirmed 'appointment_success'
 */

export type AnalyticsEventName =
  | 'phone_click'
  | 'whatsapp_click'
  | 'appointment_open'
  | 'appointment_submit'
  | 'appointment_whatsapp_opened'
  | 'directions_click'
  | 'google_maps_click'
  | 'review_link_click'
  | 'service_page_view'
  | 'article_view';

// Strict allowlist of safe parameter keys
const ALLOWED_PARAM_KEYS = new Set([
  'category',
  'label',
  'service_name',
  'article_id',
  'source',
  'method',
  'page_path',
]);

interface EventParams {
  category?: string;
  label?: string;
  service_name?: string;
  article_id?: string;
  source?: string;
  method?: string;
  page_path?: string;
  [key: string]: string | number | boolean | undefined;
}

export const trackEvent = (eventName: AnalyticsEventName, params: EventParams = {}) => {
  // Allowlist filtering: only pass recognized non-sensitive parameters
  const sanitizedParams: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && ALLOWED_PARAM_KEYS.has(key)) {
      sanitizedParams[key] = value;
    }
  }

  if (typeof window !== 'undefined') {
    const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

    // Push to dataLayer for Google Tag Manager / GA4
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({
        event: eventName,
        ...sanitizedParams,
        timestamp: new Date().toISOString(),
      });
    } else if (typeof w.gtag === 'function') {
      w.gtag('event', eventName, sanitizedParams);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics Event: ${eventName}]`, sanitizedParams);
    }
  }
};
