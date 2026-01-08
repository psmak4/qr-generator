import { useState } from 'react';
import { downloadQRCode, downloadAllFormats } from '../utils/download';
import { PNG_RESOLUTIONS, JPG_RESOLUTIONS } from '../constants';
import type { DownloadFormat, PNGResolution, JPGResolution } from '../types';

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

  const buttonBaseClass =
    'flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50';
  const primaryButtonClass = `${buttonBaseClass} bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]`;
  const secondaryButtonClass = `${buttonBaseClass} border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]`;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
        Download QR Code
      </h3>

      {/* PNG Download */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-text-secondary)] w-12">
            PNG
          </span>
          <select
            value={selectedPngRes}
            onChange={(e) => setSelectedPngRes(Number(e.target.value) as PNGResolution)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-primary)]"
            disabled={!isValid}
          >
            {PNG_RESOLUTIONS.map((res) => (
              <option key={res} value={res}>
                {res}×{res}px
              </option>
            ))}
          </select>
          <button
            onClick={() => handleDownload('png', selectedPngRes)}
            disabled={!isValid || isDownloading === 'png'}
            className={secondaryButtonClass}
          >
            {isDownloading === 'png' ? 'Downloading...' : 'Download PNG'}
          </button>
        </div>
      </div>

      {/* SVG Download */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-text-secondary)] w-12">
            SVG
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            Scalable vector format
          </span>
          <button
            onClick={() => handleDownload('svg')}
            disabled={!isValid || isDownloading === 'svg'}
            className={secondaryButtonClass}
          >
            {isDownloading === 'svg' ? 'Downloading...' : 'Download SVG'}
          </button>
        </div>
      </div>

      {/* JPG Download */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-text-secondary)] w-12">
            JPG
          </span>
          <select
            value={selectedJpgRes}
            onChange={(e) => setSelectedJpgRes(Number(e.target.value) as JPGResolution)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-primary)]"
            disabled={!isValid}
          >
            {JPG_RESOLUTIONS.map((res) => (
              <option key={res} value={res}>
                {res}×{res}px
              </option>
            ))}
          </select>
          <button
            onClick={() => handleDownload('jpg', selectedJpgRes)}
            disabled={!isValid || isDownloading === 'jpg'}
            className={secondaryButtonClass}
          >
            {isDownloading === 'jpg' ? 'Downloading...' : 'Download JPG'}
          </button>
        </div>
      </div>

      {/* PDF Download */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-text-secondary)] w-12">
            PDF
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            Print-ready A4 document
          </span>
          <button
            onClick={() => handleDownload('pdf')}
            disabled={!isValid || isDownloading === 'pdf'}
            className={secondaryButtonClass}
          >
            {isDownloading === 'pdf' ? 'Downloading...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-[var(--color-border)]" />

      {/* Download All */}
      <button
        onClick={handleDownloadAll}
        disabled={!isValid || isDownloading === 'all'}
        className={`${primaryButtonClass} w-full`}
      >
        {isDownloading === 'all' ? 'Downloading All Formats...' : 'Download All Formats'}
      </button>
    </div>
  );
}
