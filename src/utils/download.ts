import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import type { DownloadFormat, PNGResolution, JPGResolution, QRCustomizationOptions } from '../types';

/**
 * Generate QR code as a data URL (PNG)
 */
export async function generateQRCodeDataURL(
  data: string,
  size: number = 512,
  options?: QRCustomizationOptions
): Promise<string> {
  return QRCode.toDataURL(data, {
    width: size,
    margin: 2,
    errorCorrectionLevel: options?.errorCorrectionLevel || 'M',
    color: {
      dark: options?.colors.foreground || '#000000',
      light: options?.colors.background || '#FFFFFF',
    },
  });
}

/**
 * Generate QR code as SVG string
 */
export async function generateQRCodeSVG(
  data: string,
  options?: QRCustomizationOptions
): Promise<string> {
  return QRCode.toString(data, {
    type: 'svg',
    margin: 2,
    errorCorrectionLevel: options?.errorCorrectionLevel || 'M',
    color: {
      dark: options?.colors.foreground || '#000000',
      light: options?.colors.background || '#FFFFFF',
    },
  });
}

/**
 * Generate QR code as Canvas element
 */
export async function generateQRCodeCanvas(
  data: string,
  size: number = 512,
  options?: QRCustomizationOptions
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  await QRCode.toCanvas(canvas, data, {
    width: size,
    margin: 2,
    errorCorrectionLevel: options?.errorCorrectionLevel || 'M',
    color: {
      dark: options?.colors.foreground || '#000000',
      light: options?.colors.background || '#FFFFFF',
    },
  });
  return canvas;
}

/**
 * Download QR code as PNG
 */
export async function downloadAsPNG(
  data: string,
  filename: string,
  resolution: PNGResolution,
  options?: QRCustomizationOptions
): Promise<void> {
  const dataURL = await generateQRCodeDataURL(data, resolution, options);
  const blob = dataURLToBlob(dataURL);
  saveAs(blob, `${filename}.png`);
}

/**
 * Download QR code as JPG
 */
export async function downloadAsJPG(
  data: string,
  filename: string,
  resolution: JPGResolution,
  options?: QRCustomizationOptions
): Promise<void> {
  const canvas = await generateQRCodeCanvas(data, resolution, options);
  
  // Create a new canvas with the selected background color for JPG
  // Note: JPG doesn't support transparency, so we use the user's background color
  const jpgCanvas = document.createElement('canvas');
  jpgCanvas.width = canvas.width;
  jpgCanvas.height = canvas.height;
  const ctx = jpgCanvas.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = options?.colors.background || '#FFFFFF';
    ctx.fillRect(0, 0, jpgCanvas.width, jpgCanvas.height);
    ctx.drawImage(canvas, 0, 0);
  }
  
  jpgCanvas.toBlob(
    (blob) => {
      if (blob) {
        saveAs(blob, `${filename}.jpg`);
      }
    },
    'image/jpeg',
    0.95
  );
}

/**
 * Download QR code as SVG
 */
export async function downloadAsSVG(
  data: string, 
  filename: string,
  options?: QRCustomizationOptions
): Promise<void> {
  const svgString = await generateQRCodeSVG(data, options);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  saveAs(blob, `${filename}.svg`);
}

/**
 * Download QR code as PDF
 */
export async function downloadAsPDF(
  data: string, 
  filename: string,
  options?: QRCustomizationOptions
): Promise<void> {
  const size = 1024; // High resolution for PDF
  const dataURL = await generateQRCodeDataURL(data, size, options);
  
  // Dynamically import jsPDF to reduce initial bundle size
  const { jsPDF } = await import('jspdf');
  
  // Create PDF with the QR code centered
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // QR code size in mm (100mm x 100mm)
  const qrSize = 100;
  const x = (pageWidth - qrSize) / 2;
  const y = (pageHeight - qrSize) / 2;
  
  pdf.addImage(dataURL, 'PNG', x, y, qrSize, qrSize);
  pdf.save(`${filename}.pdf`);
}

/**
 * Download QR code in specified format
 */
export async function downloadQRCode(
  data: string,
  format: DownloadFormat,
  filename: string = 'qrcode',
  resolution?: PNGResolution | JPGResolution,
  options?: QRCustomizationOptions
): Promise<void> {
  switch (format) {
    case 'png':
      await downloadAsPNG(data, filename, (resolution as PNGResolution) || 512, options);
      break;
    case 'jpg':
      await downloadAsJPG(data, filename, (resolution as JPGResolution) || 512, options);
      break;
    case 'svg':
      await downloadAsSVG(data, filename, options);
      break;
    case 'pdf':
      await downloadAsPDF(data, filename, options);
      break;
  }
}

/**
 * Download QR code in all formats
 */
export async function downloadAllFormats(
  data: string,
  filename: string = 'qrcode',
  options?: QRCustomizationOptions
): Promise<void> {
  await downloadAsPNG(data, filename, 1024, options);
  await downloadAsSVG(data, filename, options);
  await downloadAsJPG(data, filename, 1024, options);
  await downloadAsPDF(data, filename, options);
}

/**
 * Convert data URL to Blob
 */
function dataURLToBlob(dataURL: string): Blob {
  const parts = dataURL.split(',');
  const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
