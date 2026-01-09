import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 8, 2026';

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          to="/"
          className="text-sm text-(--color-text-secondary) hover:text-(--color-text-primary) no-underline"
        >
          ← Back to Generator
        </Link>
      </div>

      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-(--color-text-primary)">
          Privacy Policy
        </h1>
        <p className="text-sm text-(--color-text-muted)">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-8 space-y-8 text-(--color-text-secondary)">
          <section>
            <h2 className="text-xl font-semibold text-(--color-text-primary)">
              Overview
            </h2>
            <p>
              QR Generator ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how our free QR code generator handles information 
              when you use our service.
            </p>
            <p>
              <strong className="text-(--color-text-primary)">
                The short version: We don't collect, store, or transmit any of your data. 
                Everything happens locally in your browser.
              </strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-(--color-text-primary)">
              Information We Don't Collect
            </h2>
            <p>
              Our QR code generator is designed with privacy as a core principle. We do not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Collect any personal information you enter into the forms</li>
              <li>Store any QR codes you generate</li>
              <li>Track the content of your QR codes</li>
              <li>Require account creation or login</li>
              <li>Use cookies to identify or track users</li>
              <li>Transmit any data you enter to our servers or third parties</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-(--color-text-primary)">
              How Our Service Works
            </h2>
            <p>
              All QR code generation happens entirely within your web browser using 
              client-side JavaScript. This means:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Your data (URLs, text, contact information, WiFi credentials, etc.) 
                is processed locally on your device
              </li>
              <li>QR codes are generated using your device's computing resources</li>
              <li>Downloaded files are created directly in your browser</li>
              <li>No information is sent to any server during the QR code creation process</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-(--color-text-primary)">
              Local Storage
            </h2>
            <p>
              We may use your browser's local storage to save your theme preference 
              (light mode, dark mode, or system preference). This data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Stays on your device and is never transmitted</li>
              <li>Can be cleared by clearing your browser data</li>
              <li>Does not contain any personal information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-(--color-text-primary)">
              Third-Party Services
            </h2>
            <p>
              Our website is hosted on static hosting infrastructure. While the hosting 
              provider may collect basic server logs (IP addresses, browser types, access 
              times) for security and operational purposes, we do not have access to or 
              use this information to identify individual users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-(--color-text-primary)">
              Security
            </h2>
            <p>
              We take reasonable precautions to protect the security of our website:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Our website is served over HTTPS to ensure encrypted connections</li>
              <li>We regularly update our dependencies to address security vulnerabilities</li>
              <li>
                Since we don't store your data, there is no database that could be 
                compromised
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-(--color-text-primary)">
              Children's Privacy
            </h2>
            <p>
              Our service does not knowingly collect any information from anyone, 
              including children under 13. Since we don't collect personal information, 
              there are no special provisions needed for children's data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-(--color-text-primary)">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you 
              of any changes by posting the new Privacy Policy on this page and updating 
              the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-(--color-text-primary)">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us 
              through the repository where this project is hosted.
            </p>
          </section>

          <section className="rounded-lg border border-(--color-border) bg-(--color-surface) p-6">
            <h2 className="text-xl font-semibold text-(--color-text-primary)">
              Summary
            </h2>
            <p className="mb-0">
              We built this QR generator to be privacy-first. Your data is your data. 
              We never see it, store it, or share it. Generate QR codes with confidence 
              knowing that your information stays on your device.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
