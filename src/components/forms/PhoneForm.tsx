import InputField from './InputField';
import type { PhoneFormData } from '../../types';
import { handlePhoneChange } from '../../utils/phoneFormatter';

interface PhoneFormProps {
  data: PhoneFormData;
  onChange: (data: PhoneFormData) => void;
}

export default function PhoneForm({ data, onChange }: PhoneFormProps) {
  const handleChange = (newValue: string) => {
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
        onChange={handleChange}
        placeholder="+1 (555) 123-4567"
        required
        helpText="Include country code for international numbers"
        maxLength={20}
      />
    </div>
  );
}
