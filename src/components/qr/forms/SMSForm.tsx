import InputField from './InputField';
import type { SMSFormData } from '../../../types';
import { QR_LIMITS } from '../../../constants';
import { handlePhoneChange } from '../../../utils/phoneFormatter';

interface SMSFormProps {
  data: SMSFormData;
  onChange: (data: SMSFormData) => void;
}

export default function SMSForm({ data, onChange }: SMSFormProps) {
  const handlePhoneFieldChange = (newValue: string) => {
    handlePhoneChange(newValue, data.phone, (formatted) => {
      onChange({ ...data, phone: formatted });
    });
  };

  return (
    <div className="space-y-4">
      <InputField
        label="Phone Number"
        name="phone"
        type="tel"
        value={data.phone}
        onChange={handlePhoneFieldChange}
        placeholder="+1 (555) 123-4567"
        required
        helpText="Include country code for international numbers"
        maxLength={20}
      />
      
      <InputField
        label="Message"
        name="message"
        value={data.message || ''}
        onChange={(message) => onChange({ ...data, message })}
        placeholder="Pre-filled message text (optional)"
        multiline
        rows={3}
        maxLength={QR_LIMITS.FIELD_LIMITS.sms.message}
        showCharCount
        warningThreshold={QR_LIMITS.WARNING_THRESHOLD}
      />
    </div>
  );
}
