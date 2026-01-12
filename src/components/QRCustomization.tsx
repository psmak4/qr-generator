import type { QRCustomizationOptions, QRErrorCorrectionLevel } from '../types';

interface QRCustomizationProps {
  options: QRCustomizationOptions;
  onChange: (options: QRCustomizationOptions) => void;
}

export default function QRCustomization({ options, onChange }: QRCustomizationProps) {
  const handleChange = (key: string, value: string) => {
    if (key === 'foreground' || key === 'background') {
      onChange({
        ...options,
        colors: {
          ...options.colors,
          [key]: value,
        },
      });
    } else if (key === 'errorCorrectionLevel') {
      onChange({
        ...options,
        errorCorrectionLevel: value as QRErrorCorrectionLevel,
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-(--color-text-primary)">
        Customization
      </h3>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Colors */}
        <div className="space-y-2">
          <div className="block text-sm font-medium text-(--color-text-secondary)">
            Colors
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="fg-color" className="text-xs text-(--color-text-muted)">Foreground</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="fg-color"
                  value={options.colors.foreground}
                  onChange={(e) => handleChange('foreground', e.target.value)}
                  className="h-9 w-14 cursor-pointer rounded border border-(--color-border) bg-(--color-background) p-0.5"
                />
                <span className="text-xs text-(--color-text-secondary) font-mono uppercase hidden sm:inline-block">
                  {options.colors.foreground}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="bg-color" className="text-xs text-(--color-text-muted)">Background</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="bg-color"
                  value={options.colors.background}
                  onChange={(e) => handleChange('background', e.target.value)}
                  className="h-9 w-14 cursor-pointer rounded border border-(--color-border) bg-(--color-background) p-0.5"
                />
                <span className="text-xs text-(--color-text-secondary) font-mono uppercase hidden sm:inline-block">
                  {options.colors.background}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Correction */}
        <div className="space-y-2">
          <label htmlFor="error-correction" className="block text-sm font-medium text-(--color-text-secondary)">
            Error Correction
          </label>
          <select
            id="error-correction"
            value={options.errorCorrectionLevel}
            onChange={(e) => handleChange('errorCorrectionLevel', e.target.value)}
            className="w-full rounded-lg border border-(--color-border) bg-(--color-background) px-3 py-2 text-sm text-(--color-text-primary) focus:border-(--color-border-focus) focus:outline-none"
          >
            <option value="L">Low (~7%)</option>
            <option value="M">Medium (~15%)</option>
            <option value="Q">Quartile (~25%)</option>
            <option value="H">High (~30%)</option>
          </select>
          <p className="text-xs text-(--color-text-muted)">
            Higher levels allow scanning damaged codes but increase density.
          </p>
        </div>
      </div>
    </div>
  );
}
