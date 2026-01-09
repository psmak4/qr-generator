import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-background)">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-(--color-text-primary) no-underline">
            <FontAwesomeIcon icon={faQrcode} className="h-6 w-6 text-(--color-primary)" aria-hidden="true" />
            <span>The Best QR Generator</span>
          </Link>
          
          <nav className="flex items-center gap-4">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
