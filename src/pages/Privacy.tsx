import { Lock, Eye, Server } from 'lucide-react';

export function Privacy() {
  return (
    <main className="px-4 md:px-6 lg:px-12 py-12 lg:py-24 max-w-[1000px] mx-auto">
      <div className="mb-12 border-b border-brand-border pb-12 text-center">
        <div className="w-20 h-20 bg-brand-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Lock className="w-10 h-10 text-[#8CC63F]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-brand-text">Privacy Policy</h1>
        <p className="text-brand-text-muted text-lg">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="space-y-12 text-brand-text-muted leading-relaxed">
        
        <p className="text-lg">
          At ecollect, we take your privacy seriously. This policy describes what personal information we collect and how we use it to provide our smart waste disposal services.
        </p>

        <section>
          <div className="flex items-center gap-4 mb-4">
            <Eye className="w-6 h-6 text-[#8CC63F]" />
            <h2 className="text-2xl font-bold text-brand-text">1. Information We Collect</h2>
          </div>
          <p className="mb-4">
            We collect information necessary to provide and improve our services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-brand-text/80">Account Data:</strong> Name, email address, phone number, and residential address for pickup coordination.</li>
            <li><strong className="text-brand-text/80">Service Data:</strong> Waste volume, pickup frequency, and recycling habits to calculate Eco Points and optimize routes.</li>
            <li><strong className="text-brand-text/80">Payment Data:</strong> Billing address and partial credit card information (processed securely by third-party payment gateways).</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-4">
            <Server className="w-6 h-6 text-[#8CC63F]" />
            <h2 className="text-2xl font-bold text-brand-text">2. How We Use Your Data</h2>
          </div>
          <p className="mb-4">
            We use the information we collect primarily to provide, maintain, and improve our waste collection services. This includes scheduling pickups, processing payments, calculating your environmental impact, and communicating service updates.
          </p>
          <p>
            We may also use aggregated, anonymized data to improve routing efficiency and generate community-level environmental impact reports. We will never sell your personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-text mb-4">3. Data Security</h2>
          <p className="mb-4">
            We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-text mb-4">4. Your Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have rights to access, correct, or delete your personal data. You can update your account information at any time through your Profile dashboard. To request complete account deletion, please contact our support team.
          </p>
        </section>

      </div>
    </main>
  );
}
