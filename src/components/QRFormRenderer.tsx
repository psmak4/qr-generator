import type { QRCodeType } from '../types';
import {
  URLForm,
  TextForm,
  EmailForm,
  PhoneForm,
  SMSForm,
  WifiForm,
  VCardForm,
} from './forms';

interface QRFormRendererProps {
  type: QRCodeType;
  formData: Record<string, unknown>;
  onFormChange: (data: Record<string, unknown>) => void;
}

export default function QRFormRenderer({
  type,
  formData,
  onFormChange,
}: QRFormRendererProps) {
  // Create a typed onChange handler that converts specific form data to Record
  const handleChange = (data: unknown) => {
    onFormChange(data as Record<string, unknown>);
  };

  switch (type) {
    case 'url':
      return (
        <URLForm
          data={{ url: (formData.url as string) || '' }}
          onChange={handleChange}
        />
      );
    case 'text':
      return (
        <TextForm
          data={{ text: (formData.text as string) || '' }}
          onChange={handleChange}
        />
      );
    case 'email':
      return (
        <EmailForm
          data={{
            email: (formData.email as string) || '',
            subject: formData.subject as string,
            body: formData.body as string,
          }}
          onChange={handleChange}
        />
      );
    case 'phone':
      return (
        <PhoneForm
          data={{ phone: (formData.phone as string) || '' }}
          onChange={handleChange}
        />
      );
    case 'sms':
      return (
        <SMSForm
          data={{
            phone: (formData.phone as string) || '',
            message: formData.message as string,
          }}
          onChange={handleChange}
        />
      );
    case 'wifi':
      return (
        <WifiForm
          data={{
            ssid: (formData.ssid as string) || '',
            password: (formData.password as string) || '',
            encryption: (formData.encryption as 'WPA' | 'WEP' | 'nopass') || 'WPA',
            hidden: (formData.hidden as boolean) || false,
          }}
          onChange={handleChange}
        />
      );
    case 'vcard':
      return (
        <VCardForm
          data={{
            firstName: (formData.firstName as string) || '',
            lastName: (formData.lastName as string) || '',
            organization: formData.organization as string,
            title: formData.title as string,
            email: formData.email as string,
            phone: formData.phone as string,
            mobile: formData.mobile as string,
            website: formData.website as string,
            street: formData.street as string,
            city: formData.city as string,
            state: formData.state as string,
            zip: formData.zip as string,
            country: formData.country as string,
          }}
          onChange={handleChange}
        />
      );
    default:
      return null;
  }
}
