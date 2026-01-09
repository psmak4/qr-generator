import type { QRData, FormData } from '../types';
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
  qrData: QRData;
  onFormChange: (data: FormData) => void;
}

export default function QRFormRenderer({
  qrData,
  onFormChange,
}: QRFormRendererProps) {
  switch (qrData.type) {
    case 'url':
      return (
        <URLForm
          data={qrData.data}
          onChange={onFormChange}
        />
      );
    case 'text':
      return (
        <TextForm
          data={qrData.data}
          onChange={onFormChange}
        />
      );
    case 'email':
      return (
        <EmailForm
          data={qrData.data}
          onChange={onFormChange}
        />
      );
    case 'phone':
      return (
        <PhoneForm
          data={qrData.data}
          onChange={onFormChange}
        />
      );
    case 'sms':
      return (
        <SMSForm
          data={qrData.data}
          onChange={onFormChange}
        />
      );
    case 'wifi':
      return (
        <WifiForm
          data={qrData.data}
          onChange={onFormChange}
        />
      );
    case 'vcard':
      return (
        <VCardForm
          data={qrData.data}
          onChange={onFormChange}
        />
      );
    default:
      return null;
  }
}