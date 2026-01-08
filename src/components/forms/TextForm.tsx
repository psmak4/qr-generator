import InputField from './InputField';
import type { TextFormData } from '../../types';
import { QR_LIMITS } from '../../constants';

interface TextFormProps {
  data: TextFormData;
  onChange: (data: TextFormData) => void;
}

export default function TextForm({ data, onChange }: TextFormProps) {
  return (
    <div className="space-y-4">
      <InputField
        label="Text Content"
        name="text"
        value={data.text}
        onChange={(text) => onChange({ ...data, text })}
        placeholder="Enter your text here..."
        required
        multiline
        rows={4}
        helpText="Enter any text you want to encode in the QR code"
        maxLength={QR_LIMITS.FIELD_LIMITS.text}
        showCharCount
        warningThreshold={QR_LIMITS.WARNING_THRESHOLD}
      />
    </div>
  );
}
