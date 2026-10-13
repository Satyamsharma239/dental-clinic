import FadeIn from '@/components/FadeIn';
import { CLINIC } from '@/data/clinicInfo';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 bg-bg">
      <FadeIn>
        <span className="editorial-badge mb-3">
          Legal & Privacy
        </span>
        <h1 className="text-4xl font-heading text-primary font-normal mb-3">Privacy & Demonstration Policy</h1>
        <p className="text-text-light text-xs font-mono mb-12">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        
        <div className="space-y-8 text-text-muted text-sm leading-relaxed">
          <section className="bg-white p-6 rounded-2xl border border-border">
            <h2 className="text-lg font-heading text-primary font-semibold mb-2">1. Demonstration Project Scope</h2>
            <p>
              {CLINIC.name} is a demonstration website developed for product design, user experience, and frontend engineering showcase. Form submissions (such as appointment reservations or contact inquiries) are processed purely in client-side storage (such as browser localStorage) to illustrate application flow, validation, and confirmation slip generation.
            </p>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-border">
            <h2 className="text-lg font-heading text-primary font-semibold mb-2">2. Information Handled In Demonstrations</h2>
            <p>
              Any sample details entered into the booking wizard (such as mock names, contact numbers, or treatment selections) remain local to your browser session. No medical histories or private health data are transmitted to external cloud databases.
            </p>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-border">
            <h2 className="text-lg font-heading text-primary font-semibold mb-2">3. Calendar & Messaging Handoffs</h2>
            <p>
              When utilizing features such as "Add to Google Calendar" or "WhatsApp Handoff", standard public URL query parameters are constructed locally to prefill event information on your device.
            </p>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-border">
            <h2 className="text-lg font-heading text-primary font-semibold mb-2">4. Contact & Inquiries</h2>
            <p>
              For questions regarding the design system, code architecture, or engineering patterns used in this demonstration:
            </p>
            <p className="mt-2 font-mono text-xs text-primary">
              Email: {CLINIC.email}
            </p>
          </section>
        </div>
      </FadeIn>
    </div>
  );
}
