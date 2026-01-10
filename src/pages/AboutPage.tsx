export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-3xl font-bold text-(--color-text-primary) sm:text-4xl">
        Free QR Code Generator - No Signup Required
      </h1>
      
      <p className="mb-6 text-lg text-(--color-text-secondary)">
        Create professional QR codes instantly with The Best QR Generator. 
        Our free QR code generator lets you create QR codes for URLs, WiFi networks, 
        business cards (vCard), email, SMS, phone numbers, and plain text. 
        No signup, no watermarks, and 100% private - all processing happens 
        directly in your browser.
      </p>
      
      <div className="space-y-6 text-(--color-text-secondary)">
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-(--color-text-primary)">
            Why Choose Our QR Code Generator?
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li><strong className="text-(--color-text-primary)">Completely Free:</strong> No hidden costs or premium tiers</li>
            <li><strong className="text-(--color-text-primary)">No Signup Required:</strong> Start generating QR codes immediately</li>
            <li><strong className="text-(--color-text-primary)">100% Private:</strong> Your data never leaves your browser</li>
            <li><strong className="text-(--color-text-primary)">No Watermarks:</strong> Clean QR codes for professional use</li>
            <li><strong className="text-(--color-text-primary)">Multiple Formats:</strong> Download as PNG, SVG, JPG, or PDF</li>
            <li><strong className="text-(--color-text-primary)">Multiple Resolutions:</strong> From 256px to 2048px</li>
          </ul>
        </section>
        
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-(--color-text-primary)">
            Supported QR Code Types
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li><strong className="text-(--color-text-primary)">URL QR Codes:</strong> Direct links to any website</li>
            <li><strong className="text-(--color-text-primary)">WiFi QR Codes:</strong> Share network credentials instantly</li>
            <li><strong className="text-(--color-text-primary)">vCard QR Codes:</strong> Digital business cards</li>
            <li><strong className="text-(--color-text-primary)">Email QR Codes:</strong> Pre-filled email messages</li>
            <li><strong className="text-(--color-text-primary)">SMS QR Codes:</strong> Send text messages</li>
            <li><strong className="text-(--color-text-primary)">Phone QR Codes:</strong> Direct dial phone numbers</li>
            <li><strong className="text-(--color-text-primary)">Text QR Codes:</strong> Any plain text content</li>
          </ul>
        </section>
        
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-(--color-text-primary)">
            How It Works
          </h2>
          <ol className="list-decimal space-y-2 pl-6">
            <li>Select the type of QR code you want to create</li>
            <li>Enter your information (URL, text, contact details, etc.)</li>
            <li>Watch your QR code generate instantly</li>
            <li>Download in your preferred format (PNG, SVG, JPG, or PDF)</li>
          </ol>
        </section>
        
        <p className="text-lg text-(--color-text-primary)">
          Start creating professional QR codes now - no registration required!
        </p>
      </div>
    </div>
  );
}
