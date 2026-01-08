import { Link } from 'react-router-dom';

export default function TermsOfServicePage() {
  const lastUpdated = 'January 8, 2026';

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          to="/"
          className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] no-underline"
        >
          ← Back to Generator
        </Link>
      </div>

      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
          Terms of Service
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-8 space-y-8 text-[var(--color-text-secondary)]">
          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using QR Generator ("the Service"), you accept and agree 
              to be bound by these Terms of Service. If you do not agree to these terms, 
              please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              2. Description of Service
            </h2>
            <p>
              QR Generator is a free, client-side web application that allows users to 
              create QR codes for various data types including URLs, text, email addresses, 
              phone numbers, SMS messages, WiFi credentials, and contact information (vCard).
            </p>
            <p>
              The Service operates entirely within your web browser. No data is transmitted 
              to our servers during the QR code generation process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              3. Free Use
            </h2>
            <p>
              The Service is provided free of charge. There are no paid tiers, premium 
              features, or subscriptions. All features are available to all users without 
              limitation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              4. User Responsibilities
            </h2>
            <p>When using the Service, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service only for lawful purposes</li>
              <li>
                Not create QR codes that link to or contain illegal, harmful, threatening, 
                abusive, harassing, defamatory, or otherwise objectionable content
              </li>
              <li>
                Not use the Service to distribute malware, phishing attempts, or other 
                malicious content
              </li>
              <li>
                Not attempt to interfere with or disrupt the Service or servers connected 
                to the Service
              </li>
              <li>
                Not use automated means (bots, scrapers, etc.) to access the Service in 
                a manner that negatively impacts service availability for other users
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              5. Intellectual Property
            </h2>
            <p>
              <strong className="text-[var(--color-text-primary)]">Your Content:</strong>{' '}
              You retain all rights to any content you input into the Service. We do not 
              claim any ownership over your data or the QR codes you generate.
            </p>
            <p>
              <strong className="text-[var(--color-text-primary)]">Our Service:</strong>{' '}
              The Service, including its original content (excluding user-generated content), 
              features, and functionality, is owned by us and is protected by copyright, 
              trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              6. Generated QR Codes
            </h2>
            <p>
              QR codes generated using the Service are yours to use as you see fit. You may:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use them for personal or commercial purposes</li>
              <li>Include them in printed materials, websites, or digital media</li>
              <li>Distribute them freely</li>
            </ul>
            <p>
              We do not add watermarks, tracking codes, or any other modifications to the 
              QR codes you generate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              7. Disclaimer of Warranties
            </h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF 
              ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>WARRANTIES OF MERCHANTABILITY</li>
              <li>FITNESS FOR A PARTICULAR PURPOSE</li>
              <li>NON-INFRINGEMENT</li>
              <li>
                THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE
              </li>
            </ul>
            <p>
              We do not warrant that QR codes generated will be scannable by all devices 
              or applications, although we make reasonable efforts to ensure compatibility 
              with standard QR code readers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              8. Limitation of Liability
            </h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY 
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY 
              LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR 
              ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your use or inability to use the Service</li>
              <li>
                Any unauthorized access to or use of our servers and/or any personal 
                information stored therein (noting that we do not store personal information)
              </li>
              <li>Any bugs, viruses, or other harmful code that may be transmitted through the Service</li>
              <li>
                Any errors or omissions in any content or for any loss or damage incurred 
                as a result of the use of any content generated through the Service
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              9. Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless QR Generator and its 
              operators from and against any claims, damages, obligations, losses, 
              liabilities, costs, and expenses arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>
                Your violation of any third-party right, including intellectual property 
                rights
              </li>
              <li>Any content you create using the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              10. Modifications to Service
            </h2>
            <p>
              We reserve the right to modify, suspend, or discontinue the Service (or any 
              part thereof) at any time, with or without notice. We shall not be liable 
              to you or any third party for any modification, suspension, or discontinuation 
              of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              11. Changes to Terms
            </h2>
            <p>
              We reserve the right to update these Terms at any time. We will notify users 
              of any material changes by posting the new Terms on this page and updating 
              the "Last updated" date. Your continued use of the Service after changes 
              constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              12. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws 
              of the jurisdiction in which the Service operator resides, without regard 
              to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              13. Severability
            </h2>
            <p>
              If any provision of these Terms is held to be invalid or unenforceable, 
              the remaining provisions will continue in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              14. Contact
            </h2>
            <p>
              If you have any questions about these Terms of Service, please contact us 
              through the repository where this project is hosted.
            </p>
          </section>

          <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              Summary
            </h2>
            <p className="mb-0">
              Use our free QR code generator responsibly and legally. The QR codes you 
              create are yours. We provide this service as-is, without guarantees. 
              Don't use it for malicious purposes.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
