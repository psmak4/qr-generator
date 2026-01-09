import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { generateQRCodeDataURL } from '../utils/download';

interface QRPreviewProps {
  data: string;
  isValid: boolean;
}

export default function QRPreview({ data, isValid }: QRPreviewProps) {
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!data || !isValid) {
      setQrCodeImage(null);
      return;
    }

    const generateQR = async () => {
      setIsLoading(true);
      try {
        const dataURL = await generateQRCodeDataURL(data, 512);
        setQrCodeImage(dataURL);
      } catch (error) {
        console.error('Failed to generate QR code:', error);
        setQrCodeImage(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the QR code generation
    const timer = setTimeout(generateQR, 150);
    return () => clearTimeout(timer);
  }, [data, isValid]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-64 w-64 items-center justify-center rounded-lg border border-(--color-border) bg-white sm:h-72 sm:w-72">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-(--color-border) border-t-(--color-primary)" />
          </div>
        )}
        
        {qrCodeImage && !isLoading ? (
          <img
            src={qrCodeImage}
            alt="Generated QR Code"
            className="h-full w-full rounded-lg object-contain p-2"
          />
        ) : !isLoading ? (
          <div className="flex flex-col items-center gap-2 p-8 text-center">
            <FontAwesomeIcon icon={faQrcode} className="h-12 w-12 text-(--color-text-muted)" />
            <p className="text-sm text-(--color-text-muted)">
              Fill in the form to generate a QR code
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
