import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faDesktop } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useTheme } from '../context/ThemeContext';
import type { Theme } from '../types';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options: { value: Theme; label: string; icon: IconDefinition }[] = [
    { value: 'light', label: 'Light', icon: faSun },
    { value: 'dark', label: 'Dark', icon: faMoon },
    { value: 'system', label: 'System', icon: faDesktop },
  ];

  return (
    <div className="flex items-center gap-1 rounded-lg bg-(--color-surface) p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            theme === option.value
              ? 'bg-(--color-background) text-(--color-text-primary) shadow-sm'
              : 'text-(--color-text-secondary) hover:text-(--color-text-primary)'
          }`}
          aria-label={`Switch to ${option.label} theme`}
          title={option.label}
        >
          <FontAwesomeIcon icon={option.icon} className="h-4 w-4" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
