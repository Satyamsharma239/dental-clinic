import React from 'react';
import FadeIn from '@/components/FadeIn';
import { CLINIC } from '@/data/clinicInfo';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <FadeIn>
        <h1 className="text-4xl font-heading text-primary-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-12">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div className="prose prose-primary max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-heading text-primary-900 mb-4">Information We Collect</h2>
            <p>
              When you book an appointment or contact Bright Smiles Dental Clinic, we collect standard information needed to provide you with healthcare services. This typically includes your name, phone number, email address, age, and a brief description of your dental concerns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading text-primary-900 mb-4">How We Use It</h2>
            <p>
              The information we collect is used strictly for the operations of our clinic. This includes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Scheduling and managing your dental appointments.</li>
              <li>Sending appointment reminders via WhatsApp or SMS.</li>
              <li>Providing you with accurate medical advice and treatment plans.</li>
              <li>Processing payments and sending receipts.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading text-primary-900 mb-4">Data Security</h2>
            <p>
              We take the security of your personal and medical information seriously. All physical records are kept in locked cabinets, and our digital records are stored on secure, encrypted practice management software accessible only by authorized clinic staff.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading text-primary-900 mb-4">Third Parties</h2>
            <p>
              We <strong>do not</strong> sell, rent, or share your personal information with third-party marketers. Your data is only shared with third parties when absolutely necessary for your treatment (e.g., referring you to a specialist or sending lab work), and only with your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading text-primary-900 mb-4">Your Rights</h2>
            <p>
              You have the right to access the personal and medical information we hold about you. You may also request corrections to any inaccurate data or ask for the deletion of your data, provided it does not conflict with legal requirements for medical record retention.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading text-primary-900 mb-4">Contact Us</h2>
            <p>
              If you have any questions or concerns about how we handle your data, please reach out to us:
            </p>
            <ul className="mt-2 space-y-1">
              <li><strong>Email:</strong> {CLINIC.email}</li>
              <li><strong>Phone:</strong> {CLINIC.phoneDisplay}</li>
              <li><strong>Address:</strong> {CLINIC.address.full}</li>
            </ul>
          </section>
        </div>
      </FadeIn>
    </div>
  );
}
