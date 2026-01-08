import InputField from './InputField';
import type { EmailFormData } from '../../types';
import { QR_LIMITS } from '../../constants';

interface EmailFormProps {
  data: EmailFormData;
  onChange: (data: EmailFormData) => void;
}

export default function EmailForm({ data, onChange }: EmailFormProps) {
  return (
    <div className="space-y-4">
      <InputField
        label="Email Address"
        name="email"
        type="email"
        value={data.email}
        onChange={(email) => onChange({ ...data, email })}
        placeholder="example@email.com"
        required
        maxLength={QR_LIMITS.FIELD_LIMITS.email.address}
      />
      
      <InputField
        label="Subject"
        name="subject"
        value={data.subject || ''}
        onChange={(subject) => onChange({ ...data, subject })}
        placeholder="Email subject (optional)"
        maxLength={QR_LIMITS.FIELD_LIMITS.email.subject}
        showCharCount
      />
      
      <InputField
        label="Body"
        name="body"
        value={data.body || ''}
        onChange={(body) => onChange({ ...data, body })}
        placeholder="Email body text (optional)"
        multiline
        rows={3}
        maxLength={QR_LIMITS.FIELD_LIMITS.email.body}
        showCharCount
        warningThreshold={QR_LIMITS.WARNING_THRESHOLD}
      />
    </div>
  );
}
