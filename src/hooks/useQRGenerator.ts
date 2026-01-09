import { useState, useEffect } from 'react';
import { generateQRCodeDataURL } from '../utils/download';

export function useQRGenerator(data: string, isValid: boolean) {
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

  return { qrCodeImage, isLoading };
}
