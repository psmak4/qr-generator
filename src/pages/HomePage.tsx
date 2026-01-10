import { useState, useMemo, useEffect } from 'react';
import type { QRCodeType, QRData, FormData, QRCustomizationOptions } from '../types';
import QRTypeSelector from '../components/qr/QRTypeSelector';
import QRFormRenderer from '../components/qr/QRFormRenderer';
import QRPreview from '../components/qr/QRPreview';
import QRCustomization from '../components/QRCustomization';
import DownloadOptions from '../components/DownloadOptions';
import { generateQRData, isFormValid } from '../utils/qrDataGenerator';
import { HomePageIntro } from '../components/HomePageIntro';
import { HomePageDetailedContent } from '../components/HomePageDetailedContent';

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
  
  const [customizationOptions, setCustomizationOptions] = useState<QRCustomizationOptions>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('qr-customization');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved customization options', e);
        }
      }
    }
    return {
      colors: { foreground: '#000000', background: '#ffffff' },
      errorCorrectionLevel: 'M',
    };
  });

  // Save to local storage when changed
  useEffect(() => {
    localStorage.setItem('qr-customization', JSON.stringify(customizationOptions));
  }, [customizationOptions]);

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
      <HomePageIntro />

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

          {/* Customization */}
          <div className="rounded-xl border border-(--color-border) bg-(--color-background) p-6">
            <QRCustomization
              options={customizationOptions}
              onChange={setCustomizationOptions}
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
            <QRPreview 
              data={qrDataString} 
              isValid={isValid} 
              options={customizationOptions}
            />
          </div>

          {/* Download Options */}
          <div className="rounded-xl border border-(--color-border) bg-(--color-background) p-6">
            <DownloadOptions 
              qrData={qrDataString} 
              isValid={isValid} 
              options={customizationOptions}
            />
          </div>
        </div>
      </div>

      <HomePageDetailedContent />
    </div>
  );
}