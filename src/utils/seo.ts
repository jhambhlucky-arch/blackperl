/**
 * SEO & Canonical Metadata Configuration for BCAD
 * Production Domain: https://thecyberdefenders.online
 */

export interface RouteSEOConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  robots: 'index,follow' | 'noindex,follow';
}

export const PRODUCTION_DOMAIN = 'https://thecyberdefenders.online';

export const SEO_CONFIG: Record<string, RouteSEOConfig> = {
  '/': {
    title: 'BCAD | Advanced Defensive Cybersecurity Training | BlackPerl DFIR',
    description: 'BCAD by BlackPerl DFIR is a live, hands-on advanced defensive cybersecurity program covering SOC operations, detection engineering, threat hunting, DFIR and incident response.',
    canonicalUrl: 'https://thecyberdefenders.online/',
    robots: 'index,follow'
  },
  '/program': {
    title: 'BCAD Program | SOC, Threat Hunting, DFIR & Detection Engineering',
    description: 'Explore the BCAD program from BlackPerl DFIR, including SOC operations, detection engineering, threat hunting, DFIR, incident response, practical labs and assessment.',
    canonicalUrl: 'https://thecyberdefenders.online/program',
    robots: 'index,follow'
  },
  '/corporate-training': {
    title: 'Cybersecurity Team Training | SOC, Threat Hunting & DFIR | BlackPerl',
    description: 'BlackPerl DFIR provides cybersecurity team training across SOC operations, detection engineering, threat hunting, DFIR and incident response. Talk to our team.',
    canonicalUrl: 'https://thecyberdefenders.online/corporate-training',
    robots: 'index,follow'
  },
  '/contact': {
    title: 'Contact BCAD | Talk to a Cybersecurity Training Advisor',
    description: 'Speak with a BCAD advisor about advanced defensive cybersecurity training, SOC, threat hunting, detection engineering, DFIR and incident response.',
    canonicalUrl: 'https://thecyberdefenders.online/contact',
    robots: 'index,follow'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | BlackPerl DFIR',
    description: 'Privacy Policy for BlackPerl DFIR and the BCAD training program admissions and interactive simulation telemetry.',
    canonicalUrl: 'https://thecyberdefenders.online/privacy-policy',
    robots: 'noindex,follow'
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | BlackPerl DFIR',
    description: 'Terms & Conditions for BlackPerl DFIR and the BCAD practical training labs.',
    canonicalUrl: 'https://thecyberdefenders.online/terms-and-conditions',
    robots: 'noindex,follow'
  }
};

export function applySEO(path: string): void {
  if (typeof document === 'undefined') return;

  const cleanPath = path.split('#')[0] || '/';
  const config = SEO_CONFIG[cleanPath] || SEO_CONFIG['/'];

  // 1. Page Title
  document.title = config.title;

  // 2. Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', config.description);

  // 3. Meta robots (index,follow vs noindex,follow)
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    document.head.appendChild(metaRobots);
  }
  metaRobots.setAttribute('content', config.robots);

  // 4. Canonical URL (Strictly single canonical tag)
  const existingCanonicals = document.querySelectorAll('link[rel="canonical"]');
  existingCanonicals.forEach((el, index) => {
    if (index > 0) el.remove();
  });
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', config.canonicalUrl);

  // 5. OpenGraph Tags
  const setMetaProperty = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMetaProperty('og:title', config.title);
  setMetaProperty('og:description', config.description);
  setMetaProperty('og:url', config.canonicalUrl);

  // 6. Twitter Tags
  const setMetaName = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMetaName('twitter:title', config.title);
  setMetaName('twitter:description', config.description);
}
