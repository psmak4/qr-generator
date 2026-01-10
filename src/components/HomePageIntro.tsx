export const HomePageIntro: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 pt-8 pb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-(--color-text-primary) mb-4 text-center">
        Free QR Code Generator
      </h1>
      
      <div className="space-y-3 text-(--color-text-primary) text-justify">
        <p className="text-lg md:text-xl leading-relaxed">
          Create professional QR codes instantly with our free QR code generator. 
          Generate QR codes for URLs, WiFi networks, business cards (vCard), email, 
          SMS, phone numbers, and plain text - completely free with no signup, no 
          watermarks, and 100% private processing in your browser.
        </p>
        
        <p className="text-base md:text-lg leading-relaxed text-(--color-text-secondary)">
          Download your QR codes in multiple formats (PNG, SVG, JPG, PDF) at various 
          resolutions. Perfect for business cards, marketing materials, restaurant menus, 
          event tickets, and more. Start creating QR codes now - no registration required.
        </p>
      </div>
    </section>
  );
};