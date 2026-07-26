import { FileText, ShieldCheck, AlertCircle } from 'lucide-react';

export function Terms() {
  return (
    <main className="px-4 md:px-6 lg:px-12 py-12 lg:py-24 max-w-[1000px] mx-auto">
      <div className="mb-12 border-b border-brand-border pb-12 text-center">
        <div className="w-20 h-20 bg-brand-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
          <FileText className="w-10 h-10 text-[#8CC63F]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-brand-text">Terms of Service</h1>
        <p className="text-brand-text-muted text-lg">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="space-y-12 text-brand-text-muted leading-relaxed">
        <section>
          <div className="flex items-center gap-4 mb-4">
            <ShieldCheck className="w-6 h-6 text-[#8CC63F]" />
            <h2 className="text-2xl font-bold text-brand-text">1. Agreement to Terms</h2>
          </div>
          <p className="mb-4">
            By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our service. ecollect provides smart waste management solutions, and these terms outline the rules and regulations for the use of our platform and physical collection services.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-4">
            <AlertCircle className="w-6 h-6 text-[#8CC63F]" />
            <h2 className="text-2xl font-bold text-brand-text">2. Service Guidelines</h2>
          </div>
          <p className="mb-4">
            Our waste collection services depend on accurate categorization and proper disposal in designated bins. You agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Properly sort waste into general, recyclable, and organic categories as instructed.</li>
            <li>Ensure bins are accessible on scheduled pickup days before 8:00 AM.</li>
            <li>Not dispose of hazardous materials, electronics, or unauthorized items in standard bins.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-text mb-4">3. Subscription and Payments</h2>
          <p className="mb-4">
            If you subscribe to a premium plan, you agree to pay all applicable fees related to your subscription. Payments are billed on a recurring monthly or annual basis. We reserve the right to modify our pricing, though we will provide at least 30 days' notice before any changes take effect on your next billing cycle.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand-text mb-4">4. Eco Points and Rewards</h2>
          <p className="mb-4">
            The Eco Points system is a complimentary reward program. Points have no cash value and cannot be exchanged for real currency. ecollect reserves the right to alter the points value of actions or change available rewards at any time without prior notice.
          </p>
        </section>
        
        <div className="bg-brand-secondary p-8 rounded-lg mt-12 border border-[#8CC63F]/20">
          <h3 className="text-xl font-bold text-brand-text mb-2">Have Questions?</h3>
          <p className="mb-4">If you have any questions about these Terms, please contact our support team.</p>
          <a href="mailto:info@ecollect.com" className="text-[#8CC63F] font-bold hover:text-brand-text transition-colors">
            Contact Support &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
