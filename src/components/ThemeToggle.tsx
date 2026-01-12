import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faDesktop } from '@fortawesome/free-solid-svg-icons';
import type { Theme } from '../types';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize state
  useEffect(() => {
    setMounted(true);
    // Get stored theme
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      setTheme(stored);
    }

    // Get initial system theme
    if (typeof window !== 'undefined') {
      setSystemTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const resolvedTheme = theme === 'system' ? systemTheme : theme;
    const root = document.documentElement;
    
    // Remove previous classes
    root.classList.remove('light', 'dark');
    // Add new class
    root.classList.add(resolvedTheme);
    
    // Save to local storage
    localStorage.setItem('theme', theme);
  }, [theme, systemTheme]);

  const options: { value: Theme; label: string; icon: IconDefinition }[] = [
    { value: 'light', label: 'Light', icon: faSun },
    { value: 'dark', label: 'Dark', icon: faMoon },
    { value: 'system', label: 'System', icon: faDesktop },
  ];

  // Prevent hydration mismatch by rendering a placeholder or the "system" default structure until mounted
  // However, for the toggle, it's better to render *something* that looks stable.
  // Since we use client:load, it hydrates quickly.
  // Using `mounted` check to avoid mismatched server content if we want to be strict.
  // But strictly speaking, the initial render on server for "system" might differ if we tried to guess.
  // Let's just render.

  return (
    <div className="flex items-center gap-1 rounded-lg bg-(--color-surface) p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={`rounded-md px-3 py-1.5 text-sm transition-colors cursor-pointer ${
            mounted && theme === option.value
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
