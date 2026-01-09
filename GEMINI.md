# Project Overview

**qr-generator** is a privacy-focused, client-side web application for generating QR codes. It supports various data types (URL, Text, Email, Phone, SMS, WiFi, vCard) and allows users to download the generated QR codes in multiple formats (PNG, JPG, SVG, PDF).

**Key Features:**
*   **Client-Side Processing:** All QR code generation happens in the browser; no data is sent to a server.
*   **Multiple Formats:** Supports various QR code standards (e.g., vCard, WiFi config).
*   **Export Options:** Users can download QR codes as images or PDF documents.
*   **Responsive Design:** Built with Tailwind CSS for mobile and desktop compatibility.

## Tech Stack

*   **Frontend Framework:** React 19
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS (v4)
*   **Routing:** React Router DOM
*   **QR Generation Library:** `qrcode`
*   **PDF Generation Library:** `jspdf`
*   **Icons:** Font Awesome

## Architecture

The project follows a standard React/Vite structure:

*   **`src/components/`**: Reusable UI components.
    *   **`forms/`**: specialized form components for each QR code type (e.g., `URLForm.tsx`, `WifiForm.tsx`).
    *   **`QRFormRenderer.tsx`**: A component that dynamically renders the correct form based on the selected QR type.
    *   **`QRPreview.tsx`**: Displays the live preview of the generated QR code.
*   **`src/utils/`**: Helper functions.
    *   **`qrDataGenerator.ts`**: Contains the core logic for formatting data strings for different QR types (e.g., constructing the `WIFI:T:WPA;...` string).
    *   **`download.ts`**: Handles file download logic.
*   **`src/types/`**: TypeScript definitions for form data structures.
*   **`src/context/`**: React context providers (e.g., `ThemeContext`).

## Building and Running

### Prerequisites
*   Node.js (v18+ recommended)
*   npm or yarn

### Development Scripts

*   **Install Dependencies:**
    ```bash
    npm install
    ```

*   **Start Development Server:**
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:5173`.

*   **Build for Production:**
    ```bash
    npm run build
    ```
    Outputs static files to the `dist/` directory.

*   **Preview Production Build:**
    ```bash
    npm run preview
    ```

*   **Lint Code:**
    ```bash
    npm run lint
    ```

## Development Conventions

*   **Type Safety:** Strict TypeScript usage is enforced. Define interfaces for all data structures in `src/types/`.
*   **Component Structure:** Feature-specific logic (like form inputs) is separated into dedicated components under `src/components/forms/`.
*   **Formatting Logic:** Keep data formatting logic (e.g., constructing `mailto:` links) pure and testable within `src/utils/qrDataGenerator.ts`.
*   **Styling:** Use Tailwind CSS utility classes for styling.
*   **State Management:** Local state is used for forms, with `ThemeContext` for global theme preference.
