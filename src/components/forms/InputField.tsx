interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'url' | 'password';
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
  warningThreshold?: number;
}

export default function InputField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  helpText,
  multiline = false,
  rows = 3,
  maxLength,
  showCharCount = false,
  warningThreshold,
}: InputFieldProps) {
  const charCount = value.length;
  const isOverWarning = warningThreshold && charCount > warningThreshold;
  const isAtLimit = maxLength && charCount >= maxLength;
  const showCounter = showCharCount || maxLength;

  const handleChange = (newValue: string) => {
    // Enforce max length if specified
    if (maxLength && newValue.length > maxLength) {
      return;
    }
    onChange(newValue);
  };

  const inputClasses =
    'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-2 focus:ring-blue-500/20';

  const getCounterColor = () => {
    if (isAtLimit) return 'text-[var(--color-error)]';
    if (isOverWarning) return 'text-amber-500';
    return 'text-[var(--color-text-muted)]';
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-[var(--color-text-primary)]"
        >
          {label}
          {required && <span className="ml-1 text-[var(--color-error)]">*</span>}
        </label>
        {showCounter && (
          <span className={`text-xs ${getCounterColor()}`}>
            {charCount}{maxLength ? `/${maxLength}` : ''}
          </span>
        )}
      </div>
      
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          maxLength={maxLength}
          className={inputClasses + ' resize-y'}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className={inputClasses}
        />
      )}
      
      {isOverWarning && !isAtLimit && (
        <p className="text-xs text-amber-500">
          Long content may result in a larger, harder-to-scan QR code
        </p>
      )}
      
      {helpText && !isOverWarning && (
        <p className="text-xs text-[var(--color-text-muted)]">{helpText}</p>
      )}
    </div>
  );
}
