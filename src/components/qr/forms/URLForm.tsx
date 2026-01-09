import InputField from './InputField';
import type { URLFormData } from '../../../types';
import { QR_LIMITS } from '../../../constants';

interface URLFormProps {
  data: URLFormData;
  onChange: (data: URLFormData) => void;
}

export default function URLForm({ data, onChange }: URLFormProps) {
  return (
    <div className="space-y-4">
      <InputField
        label="Website URL"
        name="url"
        type="url"
        value={data.url}
        onChange={(url) => onChange({ ...data, url })}
        placeholder="https://example.com"
        required
        helpText="Enter the full URL including https://"
        maxLength={QR_LIMITS.FIELD_LIMITS.url}
        showCharCount
        warningThreshold={QR_LIMITS.WARNING_THRESHOLD}
      />
    </div>
  );
}
