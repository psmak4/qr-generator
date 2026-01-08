import type { QRCodeTypeConfig } from '../types';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faLink,
  faFileLines,
  faEnvelope,
  faPhone,
  faComment,
  faWifi,
  faAddressCard,
} from '@fortawesome/free-solid-svg-icons';

export const QR_CODE_TYPES: QRCodeTypeConfig[] = [
  {
    id: 'url',
    label: 'URL',
    icon: faLink,
    description: 'Link to a website',
  },
  {
    id: 'text',
    label: 'Text',
    icon: faFileLines,
    description: 'Plain text content',
  },
  {
    id: 'email',
    label: 'Email',
    icon: faEnvelope,
    description: 'Email with optional subject and body',
  },
  {
    id: 'phone',
    label: 'Phone',
    icon: faPhone,
    description: 'Phone number for calling',
  },
  {
    id: 'sms',
    label: 'SMS',
    icon: faComment,
    description: 'Text message with pre-filled content',
  },
  {
    id: 'wifi',
    label: 'WiFi',
    icon: faWifi,
    description: 'WiFi network credentials',
  },
  {
    id: 'vcard',
    label: 'Contact',
    icon: faAddressCard,
    description: 'Contact information (vCard)',
  },
];

export const PNG_RESOLUTIONS = [256, 512, 1024, 2048] as const;
export const JPG_RESOLUTIONS = [512, 1024, 2048] as const;

export const WIFI_ENCRYPTION_OPTIONS = [
  { value: 'WPA', label: 'WPA/WPA2' },
  { value: 'WEP', label: 'WEP' },
  { value: 'nopass', label: 'None (Open Network)' },
] as const;

/**
 * QR Code Character Limits
 * 
 * QR codes have capacity limits based on:
 * - Error correction level (we use 'M' = Medium, ~15% recovery)
 * - Data type (binary/UTF-8 for general text)
 * 
 * Theoretical max for Level M with binary data: ~2,331 characters
 * 
 * We use conservative limits for:
 * - Better scanning reliability across devices
 * - Reasonable QR code sizes for printing
 * - Good user experience
 */
export const QR_LIMITS = {
  /** Soft limit - show warning above this */
  WARNING_THRESHOLD: 500,
  /** Hard limit - prevent input beyond this */
  MAX_CHARACTERS: 2000,
  /** Individual field limits for specific types */
  FIELD_LIMITS: {
    url: 2000,
    text: 2000,
    email: {
      address: 254, // RFC 5321 limit
      subject: 500,
      body: 1500,
    },
    sms: {
      message: 1500,
    },
    wifi: {
      ssid: 32, // WiFi spec limit
      password: 63, // WPA2 limit
    },
    vcard: {
      field: 500, // Per-field limit for vCard
    },
  },
} as const;

// Re-export IconDefinition for use in types
export type { IconDefinition };
