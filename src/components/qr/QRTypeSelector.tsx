import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { QRCodeType } from '../../types';
import { QR_CODE_TYPES } from '../../constants';

interface QRTypeSelectionProps {
  selectedType: QRCodeType;
  onTypeChange: (type: QRCodeType) => void;
}

export default function QRTypeSelector({ selectedType, onTypeChange }: QRTypeSelectionProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-(--color-text-primary)">
        QR Code Type
      </label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {QR_CODE_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition-all ${
              selectedType === type.id
                ? 'border-(--color-primary) bg-blue-50 dark:bg-blue-950/30'
                : 'border-(--color-border) bg-(--color-background) hover:border-(--color-text-muted)'
            }`}
            aria-pressed={selectedType === type.id}
          >
            <FontAwesomeIcon 
              icon={type.icon} 
              className="h-5 w-5 text-(--color-text-secondary)"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-(--color-text-primary)">
              {type.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
