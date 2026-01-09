import InputField from './InputField';
import type { VCardFormData } from '../../types';
import { QR_LIMITS } from '../../constants';

interface VCardFormProps {
  data: VCardFormData;
  onChange: (data: VCardFormData) => void;
}

const VCARD_FIELD_LIMIT = QR_LIMITS.FIELD_LIMITS.vcard.field;

export default function VCardForm({ data, onChange }: VCardFormProps) {
  const updateField = <K extends keyof VCardFormData>(field: K, value: VCardFormData[K]) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Name Section */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-(--color-text-secondary)">
          Personal Information
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            label="First Name"
            name="firstName"
            value={data.firstName}
            onChange={(v) => updateField('firstName', v)}
            placeholder="John"
            required
            maxLength={100}
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={data.lastName}
            onChange={(v) => updateField('lastName', v)}
            placeholder="Doe"
            maxLength={100}
          />
        </div>
      </div>

      {/* Organization Section */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-(--color-text-secondary)">
          Work Information
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            label="Organization"
            name="organization"
            value={data.organization || ''}
            onChange={(v) => updateField('organization', v)}
            placeholder="Company Name"
            maxLength={200}
          />
          <InputField
            label="Job Title"
            name="title"
            value={data.title || ''}
            onChange={(v) => updateField('title', v)}
            placeholder="Software Engineer"
            maxLength={100}
          />
        </div>
      </div>

      {/* Contact Section */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-(--color-text-secondary)">
          Contact Details
        </h3>
        <div className="space-y-4">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={data.email || ''}
            onChange={(v) => updateField('email', v)}
            placeholder="john@example.com"
            maxLength={254}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Work Phone"
              name="phone"
              type="tel"
              value={data.phone || ''}
              onChange={(v) => updateField('phone', v)}
              placeholder="+1 (555) 123-4567"
              maxLength={30}
            />
            <InputField
              label="Mobile Phone"
              name="mobile"
              type="tel"
              value={data.mobile || ''}
              onChange={(v) => updateField('mobile', v)}
              placeholder="+1 (555) 987-6543"
              maxLength={30}
            />
          </div>
          <InputField
            label="Website"
            name="website"
            type="url"
            value={data.website || ''}
            onChange={(v) => updateField('website', v)}
            placeholder="https://example.com"
            maxLength={VCARD_FIELD_LIMIT}
          />
        </div>
      </div>

      {/* Address Section */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-(--color-text-secondary)">
          Address
        </h3>
        <div className="space-y-4">
          <InputField
            label="Street Address"
            name="street"
            value={data.street || ''}
            onChange={(v) => updateField('street', v)}
            placeholder="123 Main Street"
            maxLength={200}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="City"
              name="city"
              value={data.city || ''}
              onChange={(v) => updateField('city', v)}
              placeholder="San Francisco"
              maxLength={100}
            />
            <InputField
              label="State/Province"
              name="state"
              value={data.state || ''}
              onChange={(v) => updateField('state', v)}
              placeholder="CA"
              maxLength={50}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="ZIP/Postal Code"
              name="zip"
              value={data.zip || ''}
              onChange={(v) => updateField('zip', v)}
              placeholder="94102"
              maxLength={20}
            />
            <InputField
              label="Country"
              name="country"
              value={data.country || ''}
              onChange={(v) => updateField('country', v)}
              placeholder="USA"
              maxLength={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
