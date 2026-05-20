/**
 * Client-safe content helpers — no fs dependency, safe to import in 'use client' components.
 * Uses static JSON imports only.
 */
import type { Service, ContactConfig } from './content';
import servicesRaw from '@/content/services.json';
import contactRaw from '@/content/contact.json';

export function getServicesClient(): Service[] {
  return servicesRaw as Service[];
}

export function getActiveServicesClient(): Service[] {
  return getServicesClient().filter((s) => s.status === 'active');
}

export function getServiceByIdClient(id: string): Service | undefined {
  return getServicesClient().find((s) => s.id === id);
}

export function getContactConfigClient(): ContactConfig {
  return contactRaw as ContactConfig;
}
