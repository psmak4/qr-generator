# Free QR Code Generator

A free, privacy-focused QR code generator web application. Create QR codes for URLs, text, emails, phone numbers, SMS, WiFi networks, and contact cards—all processed entirely in your browser with no data sent to any server.

## Features

- **Multiple QR Code Types:**
  - **URL** - Link to any website
  - **Text** - Plain text content
  - **Email** - Email address with optional subject and body
  - **Phone** - Phone number for direct calling
  - **SMS** - Phone number with pre-filled message
  - **WiFi** - Network credentials (SSID, password, encryption type)
  - **vCard** - Contact information (name, phone, email, address, etc.)

- **Download Options:**
  - PNG (256px, 512px, 1024px, 2048px)
  - JPG (512px, 1024px, 2048px)
  - SVG (scalable vector format)
  - PDF (print-ready document)

- **Privacy First:** 100% client-side processing—your data never leaves your browser
- **No Account Required:** Generate QR codes instantly without registration
- **Responsive Design:** Works on desktop, tablet, and mobile devices
- **Dark/Light Mode:** Theme toggle for comfortable viewing

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **QR Generation:** qrcode.js
- **PDF Generation:** jsPDF
- **Icons:** Font Awesome
- **Routing:** React Router

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd qr-generator

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── components/          # React components
│   ├── forms/          # QR type-specific form components
│   ├── DownloadOptions.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── QRFormRenderer.tsx
│   ├── QRPreview.tsx
│   ├── QRTypeSelector.tsx
│   └── ThemeToggle.tsx
├── constants/          # App constants and configuration
├── context/            # React context providers
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx
├── main.tsx
└── index.css
```

## Deployment

This app is configured for deployment on Netlify (see `netlify.toml`), but can be deployed to any static hosting provider:

- Netlify
- Vercel
- Cloudflare Pages
- GitHub Pages

## License

This project is open source and available under the MIT License.
