interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  helpText?: string;
}

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  helpText,
}: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-[var(--color-text-primary)]"
      >
        {label}
        {required && <span className="ml-1 text-[var(--color-error)]">*</span>}
      </label>
      
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-[var(--color-text-primary)] focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {helpText && (
        <p className="text-xs text-[var(--color-text-muted)]">{helpText}</p>
      )}
    </div>
  );
}
