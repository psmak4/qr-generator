import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto border-t border-(--color-border) bg-(--color-surface)">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-(--color-text-secondary)">
            © {currentYear} The Best QR Generator. All rights reserved.
          </p>
          
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <nav className="flex gap-6">
              <Link
                to="/privacy"
                className="text-sm text-(--color-text-secondary) no-underline hover:text-(--color-text-primary)"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-(--color-text-secondary) no-underline hover:text-(--color-text-primary)"
              >
                Terms of Service
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}