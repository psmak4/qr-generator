import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-background)">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-semibold text-(--color-text-primary) no-underline">
            <FontAwesomeIcon icon={faQrcode} className="h-6 w-6 text-(--color-primary)" aria-hidden="true" />
            <span>The Best QR Generator</span>
          </Link>

          <nav className="flex gap-6">
            <Link 
              to="/" 
              className="text-lg font-medium text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}