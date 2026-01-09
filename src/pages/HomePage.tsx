import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved, faGift, faBolt, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { QRCodeType, QRData, FormData } from '../types';
import QRTypeSelector from '../components/QRTypeSelector';
import QRFormRenderer from '../components/QRFormRenderer';
import QRPreview from '../components/QRPreview';
import DownloadOptions from '../components/DownloadOptions';
import { generateQRData, isFormValid } from '../utils/qrDataGenerator';

// Initial form data for each QR code type
const getInitialQRData = (type: QRCodeType): QRData => {
  switch (type) {
    case 'url':
      return { type, data: { url: '' } };
    case 'text':
      return { type, data: { text: '' } };
    case 'email':
      return { type, data: { email: '', subject: '', body: '' } };
    case 'phone':
      return { type, data: { phone: '' } };
    case 'sms':
      return { type, data: { phone: '', message: '' } };
    case 'wifi':
      return { type, data: { ssid: '', password: '', encryption: 'WPA', hidden: false } };
    case 'vcard':
      return {
        type,
        data: {
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
        },
      };
    default:
      // Fallback for type safety, though strict typing prevents reaching here with valid QRCodeType
      return { type: 'url', data: { url: '' } } as QRData;
  }
};

export default function HomePage() {
  const [qrState, setQrState] = useState<QRData>(getInitialQRData('url'));

  const handleTypeChange = (type: QRCodeType) => {
    setQrState(getInitialQRData(type));
  };

  const handleFormChange = (newData: FormData) => {
    setQrState((prevState) => ({
      ...prevState,
      data: newData,
    } as QRData));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all fields?')) {
      setQrState(getInitialQRData(qrState.type));
    }
  };

  const isValid = useMemo(
    () => isFormValid(qrState),
    [qrState]
  );

  const qrDataString = useMemo(
    () => (isValid ? generateQRData(qrState) : ''),
    [qrState, isValid]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-(--color-text-primary) sm:text-4xl">
          The Best QR Code Generator
        </h1>
        <p className="mt-2 text-(--color-text-secondary)">
          Generate QR codes for URLs, text, contacts, WiFi, and more. No signup required.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Panel - Input Form */}
        <div className="space-y-6">
          {/* Type Selector */}
          <div className="rounded-xl border border-(--color-border) bg-(--color-background) p-6">
            <QRTypeSelector
              selectedType={qrState.type}
              onTypeChange={handleTypeChange}
            />
          </div>

          {/* Form Fields */}
          <div className="rounded-xl border border-(--color-border) bg-(--color-background) p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-(--color-text-primary)">
                Enter Information
              </h2>
              <button
                onClick={handleReset}
                className="text-sm text-(--color-text-secondary) hover:text-(--color-text-primary)"
              >
                Reset
              </button>
            </div>
            
            <QRFormRenderer
              qrData={qrState}
              onFormChange={handleFormChange}
            />
          </div>
        </div>

        {/* Right Panel - Preview and Download */}
        <div className="space-y-6">
          {/* QR Code Preview */}
          <div className="rounded-xl border border-(--color-border) bg-(--color-background) p-6">
            <h2 className="mb-4 text-lg font-medium text-(--color-text-primary)">
              Preview
            </h2>
            <QRPreview data={qrDataString} isValid={isValid} />
          </div>

          {/* Download Options */}
          <div className="rounded-xl border border-(--color-border) bg-(--color-background) p-6">
            <DownloadOptions qrData={qrDataString} isValid={isValid} />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-(--color-text-primary)">
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
    <div className="rounded-xl border border-(--color-border) bg-(--color-background) p-6 text-center">
      <FontAwesomeIcon 
        icon={icon} 
        className="mb-3 h-8 w-8 text-(--color-primary)" 
        aria-hidden="true" 
      />
      <h3 className="mb-2 font-medium text-(--color-text-primary)">{title}</h3>
      <p className="text-sm text-(--color-text-secondary)">{description}</p>
    </div>
  );
}