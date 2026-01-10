import { useState } from 'react';
import { downloadQRCode, downloadAllFormats } from '../utils/download';
import { PNG_RESOLUTIONS, JPG_RESOLUTIONS } from '../constants';
import type { DownloadFormat, PNGResolution, JPGResolution } from '../types';
import Button from './Button';

interface DownloadOptionsProps {
  qrData: string;
  isValid: boolean;
}

export default function DownloadOptions({ qrData, isValid }: DownloadOptionsProps) {
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [selectedPngRes, setSelectedPngRes] = useState<PNGResolution>(512);
  const [selectedJpgRes, setSelectedJpgRes] = useState<JPGResolution>(512);

  const handleDownload = async (format: DownloadFormat, resolution?: PNGResolution | JPGResolution) => {
    if (!qrData || !isValid) return;

    setIsDownloading(format);
    try {
      await downloadQRCode(qrData, format, 'qrcode', resolution);
    } catch (error) {
      console.error(`Failed to download ${format}:`, error);
      alert(`Failed to download ${format}. Please try again.`);
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadAll = async () => {
    if (!qrData || !isValid) return;

    setIsDownloading('all');
    try {
      await downloadAllFormats(qrData, 'qrcode');
    } catch (error) {
      console.error('Failed to download all formats:', error);
      alert('Failed to download all formats. Please try again.');
    } finally {
      setIsDownloading(null);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-(--color-text-primary)">
        Download QR Code
      </h3>

      {/* PNG Download */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-(--color-text-secondary) w-12">
            PNG
          </span>
          <select
            value={selectedPngRes}
            onChange={(e) => setSelectedPngRes(Number(e.target.value) as PNGResolution)}
            className="rounded-lg border border-(--color-border) bg-(--color-background) px-3 py-2.5 text-sm text-(--color-text-primary) focus:border-(--color-border-focus) focus:outline-none"
            disabled={!isValid}
            aria-label="PNG Resolution"
          >
            {PNG_RESOLUTIONS.map((res) => (
              <option key={res} value={res}>
                {res}×{res}px
              </option>
            ))}
          </select>
          <Button
            onClick={() => handleDownload('png', selectedPngRes)}
            disabled={!isValid || isDownloading === 'png'}
            isLoading={isDownloading === 'png'}
          >
            {isDownloading === 'png' ? 'Downloading...' : 'Download PNG'}
          </Button>
        </div>
      </div>

      {/* SVG Download */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-(--color-text-secondary) w-12">
            SVG
          </span>
          <span className="text-xs text-(--color-text-muted) mr-auto sm:mr-0">
            Scalable vector format
          </span>
          <Button
            onClick={() => handleDownload('svg')}
            disabled={!isValid || isDownloading === 'svg'}
            isLoading={isDownloading === 'svg'}
          >
            {isDownloading === 'svg' ? 'Downloading...' : 'Download SVG'}
          </Button>
        </div>
      </div>

      {/* JPG Download */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-(--color-text-secondary) w-12">
            JPG
          </span>
          <select
            value={selectedJpgRes}
            onChange={(e) => setSelectedJpgRes(Number(e.target.value) as JPGResolution)}
            className="rounded-lg border border-(--color-border) bg-(--color-background) px-3 py-2.5 text-sm text-(--color-text-primary) focus:border-(--color-border-focus) focus:outline-none"
            disabled={!isValid}
            aria-label="JPG Resolution"
          >
            {JPG_RESOLUTIONS.map((res) => (
              <option key={res} value={res}>
                {res}×{res}px
              </option>
            ))}
          </select>
          <Button
            onClick={() => handleDownload('jpg', selectedJpgRes)}
            disabled={!isValid || isDownloading === 'jpg'}
            isLoading={isDownloading === 'jpg'}
          >
            {isDownloading === 'jpg' ? 'Downloading...' : 'Download JPG'}
          </Button>
        </div>
      </div>

      {/* PDF Download */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-(--color-text-secondary) w-12">
            PDF
          </span>
          <span className="text-xs text-(--color-text-muted) mr-auto sm:mr-0">
            Print-ready A4 document
          </span>
          <Button
            onClick={() => handleDownload('pdf')}
            disabled={!isValid || isDownloading === 'pdf'}
            isLoading={isDownloading === 'pdf'}
          >
            {isDownloading === 'pdf' ? 'Downloading...' : 'Download PDF'}
          </Button>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-(--color-border)" />

      {/* Download All */}
      <Button
        variant="primary"
        fullWidth
        onClick={handleDownloadAll}
        disabled={!isValid || isDownloading === 'all'}
        isLoading={isDownloading === 'all'}
      >
        {isDownloading === 'all' ? 'Downloading All Formats...' : 'Download All Formats'}
      </Button>
    </div>
  );
}