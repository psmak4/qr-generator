// QR Code types supported by the application
export type QRCodeType = 
  | 'url'
  | 'text'
  | 'email'
  | 'phone'
  | 'sms'
  | 'wifi'
  | 'vcard';

// Download format options
export type DownloadFormat = 'png' | 'svg' | 'jpg' | 'pdf';

// PNG resolution options
export type PNGResolution = 256 | 512 | 1024 | 2048;

// JPG resolution options
export type JPGResolution = 512 | 1024 | 2048;

// WiFi encryption types
export type WifiEncryption = 'WPA' | 'WEP' | 'nopass';

// Form data types for each QR code type
export interface URLFormData {
  url: string;
}

export interface TextFormData {
  text: string;
}

export interface EmailFormData {
  email: string;
  subject?: string;
  body?: string;
}

export interface PhoneFormData {
  phone: string;
}

export interface SMSFormData {
  phone: string;
  message?: string;
}

export interface WifiFormData {
  ssid: string;
  password: string;
  encryption: WifiEncryption;
  hidden: boolean;
}

export interface VCardFormData {
  firstName: string;
  lastName: string;
  organization?: string;
  title?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  website?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

// Union type for all form data
export type FormData = 
  | URLFormData
  | TextFormData
  | EmailFormData
  | PhoneFormData
  | SMSFormData
  | WifiFormData
  | VCardFormData;

// Discriminated Union for strict type safety
export type QRData =
  | { type: 'url'; data: URLFormData }
  | { type: 'text'; data: TextFormData }
  | { type: 'email'; data: EmailFormData }
  | { type: 'phone'; data: PhoneFormData }
  | { type: 'sms'; data: SMSFormData }
  | { type: 'wifi'; data: WifiFormData }
  | { type: 'vcard'; data: VCardFormData };

// QR Code type configuration
export interface QRCodeTypeConfig {
  id: QRCodeType;
  label: string;
  icon: import('@fortawesome/fontawesome-svg-core').IconDefinition;
  description: string;
}

// Theme type
export type Theme = 'light' | 'dark' | 'system';
