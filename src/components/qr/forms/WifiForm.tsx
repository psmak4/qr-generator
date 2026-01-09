import InputField from './InputField';
import SelectField from './SelectField';
import CheckboxField from './CheckboxField';
import type { WifiFormData, WifiEncryption } from '../../../types';
import { WIFI_ENCRYPTION_OPTIONS, QR_LIMITS } from '../../../constants';

interface WifiFormProps {
  data: WifiFormData;
  onChange: (data: WifiFormData) => void;
}

export default function WifiForm({ data, onChange }: WifiFormProps) {
  const showPassword = data.encryption !== 'nopass';
  
  return (
    <div className="space-y-4">
      <InputField
        label="Network Name (SSID)"
        name="ssid"
        value={data.ssid}
        onChange={(ssid) => onChange({ ...data, ssid })}
        placeholder="My WiFi Network"
        required
        maxLength={QR_LIMITS.FIELD_LIMITS.wifi.ssid}
        showCharCount
        helpText="WiFi network names are limited to 32 characters"
      />
      
      <SelectField
        label="Security Type"
        name="encryption"
        value={data.encryption}
        onChange={(encryption) => onChange({ ...data, encryption: encryption as WifiEncryption })}
        options={[...WIFI_ENCRYPTION_OPTIONS]}
        helpText="Select the encryption type of your network"
      />
      
      {showPassword && (
        <InputField
          label="Password"
          name="password"
          type="password"
          value={data.password}
          onChange={(password) => onChange({ ...data, password })}
          placeholder="Network password"
          required
          maxLength={QR_LIMITS.FIELD_LIMITS.wifi.password}
          showCharCount
          helpText="WiFi passwords can be up to 63 characters"
        />
      )}
      
      <CheckboxField
        label="Hidden Network"
        name="hidden"
        checked={data.hidden}
        onChange={(hidden) => onChange({ ...data, hidden })}
        helpText="Check if your network doesn't broadcast its name"
      />
    </div>
  );
}
