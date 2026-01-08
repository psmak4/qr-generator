import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-[var(--color-text-secondary)]">
            © {currentYear} QR Generator. Free and open source.
          </p>
          
          <nav className="flex gap-6">
            <Link
              to="/privacy"
              className="text-sm text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-text-primary)]"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-text-primary)]"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
