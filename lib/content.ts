import { readFileSync } from 'fs';
import path from 'path';

// ============================================================
// Type Definitions
// ============================================================

export interface SiteCredential {
  year: string;
  role: string;
  context: string;
}

export interface SiteValue {
  name: string;
  description: string;
}

export interface SiteData {
  name: string;
  company: string;
  title: string;
  tagline: string;
  bio: string;
  domain: string;
  email: string;
  social: { linkedin: string };
  about: {
    pullQuote: string;
    heroImage: string;
    portraitImage: string;
    credentials: SiteCredential[];
    values: SiteValue[];
  };
}

export interface ServiceField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'url';
  required: boolean;
  options?: string[];
}

export interface Service {
  id: string;
  slug?: string;
  status: 'active' | 'coming-soon';
  name: string;
  shortName?: string;
  tagline: string;
  description: string;
  duration?: string;
  deliverable?: string;
  image?: string;
  imageAlt?: string;
  intakeFields?: ServiceField[];
  externalLink?: { href: string; label: string };
}

export interface WorkIndexItem {
  slug: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  indexImage: string;
  indexTeaser: string;
  featured: boolean;
}

export interface ContactField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'url';
  required: boolean;
  options?: string[];
}

export interface ContactConfig {
  generalInquiry: {
    heading: string;
    description: string;
    fields: ContactField[];
  };
  successMessage: string;
  errorMessage: string;
}

export interface KeyFact {
  label: string;
  value: string;
}

export interface CaseStudyImage {
  url: string;
  caption: string;
}

export interface MethodStep {
  number: string;
  title: string;
  description: string;
  image?: string;
  imageCaption?: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface CaseStudySections {
  oversight: {
    blurb: string;
    keyFacts: KeyFact[];
  };
  problem: {
    heading: string;
    body: string;
    images?: CaseStudyImage[];
  };
  decision: {
    heading: string;
    body: string;
    images?: CaseStudyImage[];
  };
  methods: {
    heading: string;
    body: string;
    steps: MethodStep[];
  };
  solution: {
    heading: string;
    body: string;
    images?: CaseStudyImage[];
  };
  outcomes: {
    heading: string;
    body: string;
    metrics: Metric[];
    images?: CaseStudyImage[];
  };
  reflection: {
    heading: string;
    body: string;
    images?: CaseStudyImage[];
  };
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  logoUrl?: string;
  heroImage: string;
  summary: string;
  role: string;
  duration: string;
  year: string;
  tags: string[];
  indexImage: string;
  indexTeaser: string;
  sections: CaseStudySections;
  gallery?: CaseStudyImage[];
}

// ============================================================
// Static imports — bundled at build time
// ============================================================

import siteRaw from '@/content/site.json';
import servicesRaw from '@/content/services.json';
import workRaw from '@/content/work.json';
import contactRaw from '@/content/contact.json';

// ============================================================
// Helpers
// ============================================================

export function getSiteData(): SiteData {
  return siteRaw as SiteData;
}

export function getServices(): Service[] {
  return servicesRaw as Service[];
}

export function getActiveServices(): Service[] {
  return getServices().filter((s) => s.status === 'active');
}

export function getServiceById(id: string): Service | undefined {
  return getServices().find((s) => s.id === id);
}

export function getWorkIndex(): WorkIndexItem[] {
  return workRaw as WorkIndexItem[];
}

export function getFeaturedWork(count = 3): WorkIndexItem[] {
  const featured = getWorkIndex().filter((w) => w.featured);
  return featured.slice(0, count);
}

export function getContactConfig(): ContactConfig {
  return contactRaw as ContactConfig;
}

// ============================================================
// Case study helpers — read from fs for dynamic slug routing
// ============================================================

const CASE_STUDIES_DIR = path.join(process.cwd(), 'content', 'case-studies');

export function getCaseStudy(slug: string): CaseStudy | null {
  try {
    const filePath = path.join(CASE_STUDIES_DIR, `${slug}.json`);
    const raw = readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as CaseStudy;
  } catch {
    return null;
  }
}

export function getAllCaseStudySlugs(): string[] {
  try {
    const { readdirSync } = require('fs') as typeof import('fs');
    return readdirSync(CASE_STUDIES_DIR)
      .filter((f: string) => f.endsWith('.json'))
      .map((f: string) => f.replace('.json', ''));
  } catch {
    return [];
  }
}

export function getAdjacentCaseStudy(
  currentSlug: string,
  direction: 'next' | 'prev'
): WorkIndexItem | null {
  const work = getWorkIndex();
  const index = work.findIndex((w) => w.slug === currentSlug);
  if (index === -1) return null;
  const adjacent =
    direction === 'next'
      ? work[(index + 1) % work.length]
      : work[(index - 1 + work.length) % work.length];
  return adjacent ?? null;
}
