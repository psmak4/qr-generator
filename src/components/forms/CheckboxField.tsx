interface CheckboxFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  helpText?: string;
}

export default function CheckboxField({
  label,
  name,
  checked,
  onChange,
  helpText,
}: CheckboxFieldProps) {
  return (
    <div className="space-y-1">
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-primary)] focus:ring-2 focus:ring-blue-500/20"
        />
        <span className="text-sm text-[var(--color-text-primary)]">{label}</span>
      </label>
      
      {helpText && (
        <p className="ml-7 text-xs text-[var(--color-text-muted)]">{helpText}</p>
      )}
    </div>
  );
}
