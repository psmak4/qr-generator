import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved, faGift, faBolt, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { QRCodeType } from '../types';
import QRTypeSelector from '../components/QRTypeSelector';
import QRFormRenderer from '../components/QRFormRenderer';
import QRPreview from '../components/QRPreview';
import DownloadOptions from '../components/DownloadOptions';
import { generateQRData, isFormValid } from '../utils/qrDataGenerator';

// Initial form data for each QR code type
const getInitialFormData = (type: QRCodeType): Record<string, unknown> => {
  switch (type) {
    case 'url':
      return { url: '' };
    case 'text':
      return { text: '' };
    case 'email':
      return { email: '', subject: '', body: '' };
    case 'phone':
      return { phone: '' };
    case 'sms':
      return { phone: '', message: '' };
    case 'wifi':
      return { ssid: '', password: '', encryption: 'WPA', hidden: false };
    case 'vcard':
      return {
        firstName: '',
        lastName: '',
        organization: '',
        title: '',
        email: '',
        phone: '',
        mobile: '',
        website: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      };
    default:
      return {};
  }
};

export default function HomePage() {
  const [selectedType, setSelectedType] = useState<QRCodeType>('url');
  const [formData, setFormData] = useState<Record<string, unknown>>(
    getInitialFormData('url')
  );

  const handleTypeChange = (type: QRCodeType) => {
    setSelectedType(type);
    setFormData(getInitialFormData(type));
  };

  const handleFormChange = (data: Record<string, unknown>) => {
    setFormData(data);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all fields?')) {
      setFormData(getInitialFormData(selectedType));
    }
  };

  const isValid = useMemo(
    () => isFormValid(selectedType, formData),
    [selectedType, formData]
  );

  const qrData = useMemo(
    () => (isValid ? generateQRData(selectedType, formData) : ''),
    [selectedType, formData, isValid]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
          Free QR Code Generator
        </h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Generate QR codes for URLs, text, contacts, WiFi, and more. No signup required.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Panel - Input Form */}
        <div className="space-y-6">
          {/* Type Selector */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6">
            <QRTypeSelector
              selectedType={selectedType}
              onTypeChange={handleTypeChange}
            />
          </div>

          {/* Form Fields */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-[var(--color-text-primary)]">
                Enter Information
              </h2>
              <button
                onClick={handleReset}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              >
                Reset
              </button>
            </div>
            
            <QRFormRenderer
              type={selectedType}
              formData={formData}
              onFormChange={handleFormChange}
            />
          </div>
        </div>

        {/* Right Panel - Preview and Download */}
        <div className="space-y-6">
          {/* QR Code Preview */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6">
            <h2 className="mb-4 text-lg font-medium text-[var(--color-text-primary)]">
              Preview
            </h2>
            <QRPreview data={qrData} isValid={isValid} />
          </div>

          {/* Download Options */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6">
            <DownloadOptions qrData={qrData} isValid={isValid} />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-[var(--color-text-primary)]">
          Why Use Our QR Generator?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={faShieldHalved}
            title="100% Private"
            description="All processing happens in your browser. Your data never leaves your device."
          />
          <FeatureCard
            icon={faGift}
            title="Completely Free"
            description="No hidden costs, no watermarks, no account required. Just generate and download."
          />
          <FeatureCard
            icon={faBolt}
            title="Instant Generation"
            description="QR codes generate in real-time as you type. No waiting, no delays."
          />
          <FeatureCard
            icon={faFileArrowDown}
            title="Multiple Formats"
            description="Download in PNG, SVG, JPG, or PDF. Perfect for any use case."
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: IconDefinition;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 text-center">
      <FontAwesomeIcon 
        icon={icon} 
        className="mb-3 h-8 w-8 text-[var(--color-primary)]" 
        aria-hidden="true" 
      />
      <h3 className="mb-2 font-medium text-[var(--color-text-primary)]">{title}</h3>
      <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
    </div>
  );
}
