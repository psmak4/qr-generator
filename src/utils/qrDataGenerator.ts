import type {
  URLFormData,
  TextFormData,
  EmailFormData,
  PhoneFormData,
  SMSFormData,
  WifiFormData,
  VCardFormData,
  QRData,
} from '../types';

/**
 * Generate QR code data string from URL form data
 */
export function generateURLData(data: URLFormData): string {
  let url = data.url.trim();
  // Add https:// if no protocol is specified
  if (url && !url.match(/^https?:\/\//i)) {
    url = 'https://' + url;
  }
  return url;
}

/**
 * Generate QR code data string from text form data
 */
export function generateTextData(data: TextFormData): string {
  return data.text.trim();
}

/**
 * Generate QR code data string from email form data
 * Format: mailto:email?subject=...&body=...
 */
export function generateEmailData(data: EmailFormData): string {
  const params = new URLSearchParams();
  
  if (data.subject) {
    params.set('subject', data.subject);
  }
  if (data.body) {
    params.set('body', data.body);
  }
  
  const paramString = params.toString();
  return `mailto:${data.email.trim()}${paramString ? '?' + paramString : ''}`;
}

/**
 * Generate QR code data string from phone form data
 * Format: tel:+1234567890
 */
export function generatePhoneData(data: PhoneFormData): string {
  const phone = data.phone.trim().replace(/[^\d+]/g, '');
  return `tel:${phone}`;
}

/**
 * Generate QR code data string from SMS form data
 * Format: sms:+1234567890?body=...
 */
export function generateSMSData(data: SMSFormData): string {
  const phone = data.phone.trim().replace(/[^\d+]/g, '');
  if (data.message) {
    return `sms:${phone}?body=${encodeURIComponent(data.message)}`;
  }
  return `sms:${phone}`;
}

/**
 * Generate QR code data string from WiFi form data
 * Format: WIFI:T:WPA;S:ssid;P:password;H:hidden;;
 */
export function generateWifiData(data: WifiFormData): string {
  const escape = (str: string) => str.replace(/[\\;,:]/g, '\\$&');
  
  let wifiString = 'WIFI:';
  wifiString += `T:${data.encryption};`;
  wifiString += `S:${escape(data.ssid)};`;
  
  if (data.encryption !== 'nopass' && data.password) {
    wifiString += `P:${escape(data.password)};`;
  }
  
  if (data.hidden) {
    wifiString += 'H:true;';
  }
  
  wifiString += ';';
  return wifiString;
}

/**
 * Generate QR code data string from vCard form data
 * Format: vCard 3.0
 */
export function generateVCardData(data: VCardFormData): string {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
  ];
  
  // Full name
  const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ');
  if (fullName) {
    lines.push(`FN:${fullName}`);
    lines.push(`N:${data.lastName || ''};${data.firstName || ''};;;`);
  }
  
  // Organization and title
  if (data.organization) {
    lines.push(`ORG:${data.organization}`);
  }
  if (data.title) {
    lines.push(`TITLE:${data.title}`);
  }
  
  // Contact info
  if (data.email) {
    lines.push(`EMAIL:${data.email}`);
  }
  if (data.phone) {
    lines.push(`TEL;TYPE=WORK:${data.phone}`);
  }
  if (data.mobile) {
    lines.push(`TEL;TYPE=CELL:${data.mobile}`);
  }
  if (data.website) {
    lines.push(`URL:${data.website}`);
  }
  
  // Address
  const hasAddress = data.street || data.city || data.state || data.zip || data.country;
  if (hasAddress) {
    const addressParts = [
      '', // PO Box
      '', // Extended address
      data.street || '',
      data.city || '',
      data.state || '',
      data.zip || '',
      data.country || '',
    ];
    lines.push(`ADR;TYPE=WORK:${addressParts.join(';')}`);
  }
  
  lines.push('END:VCARD');
  return lines.join('\n');
}

/**
 * Generate QR code data string based on type and form data
 */
export function generateQRData(qrData: QRData): string {
  switch (qrData.type) {
    case 'url':
      return generateURLData(qrData.data);
    case 'text':
      return generateTextData(qrData.data);
    case 'email':
      return generateEmailData(qrData.data);
    case 'phone':
      return generatePhoneData(qrData.data);
    case 'sms':
      return generateSMSData(qrData.data);
    case 'wifi':
      return generateWifiData(qrData.data);
    case 'vcard':
      return generateVCardData(qrData.data);
  }
}

/**
 * Validate if form data has minimum required fields filled
 */
export function isFormValid(qrData: QRData): boolean {
  switch (qrData.type) {
    case 'url':
      return Boolean(qrData.data.url?.trim());
    case 'text':
      return Boolean(qrData.data.text?.trim());
    case 'email':
      return Boolean(qrData.data.email?.trim());
    case 'phone':
      return Boolean(qrData.data.phone?.trim());
    case 'sms':
      return Boolean(qrData.data.phone?.trim());
    case 'wifi':
      return Boolean(qrData.data.ssid?.trim());
    case 'vcard':
      return Boolean(qrData.data.firstName?.trim() || qrData.data.lastName?.trim());
  }
}