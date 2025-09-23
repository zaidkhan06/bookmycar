import React from "react";
import { Mail, Phone } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-screen mx-auto p-6 text-gray-800 bg-white shadow-lg rounded-xl mt-10 pt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Privacy Policy
      </h1>

      <p className="mb-4 text-gray-700">
        Welcome to <strong>BookMyCar</strong>. Your privacy is very important to us.
        This Privacy Policy explains how we collect, use, and protect your
        information when you use our platform.
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">1. Information We Collect</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700 space-y-1">
          <li>Personal details like name, email, phone number, and address.</li>
          <li>Government IDs such as Aadhaar and Driving Licence (for verification).</li>
          <li>Booking details including car type, rental period, and payment info.</li>
          <li>Device and usage data (IP address, browser type, etc.).</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700 space-y-1">
          <li>To process your bookings and payments securely.</li>
          <li>To verify your identity and prevent fraud.</li>
          <li>To improve our services and provide customer support.</li>
          <li>To send updates, confirmations, and promotional offers (with your consent).</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">3. Sharing of Information</h2>
        <p className="mb-4 text-gray-700">
          We do not sell your personal information. We may share your data only:
        </p>
        <ul className="list-disc ml-6 mb-4 text-gray-700 space-y-1">
          <li>With service providers (like payment gateways) for transaction processing.</li>
          <li>When required by law or government authorities.</li>
          <li>To protect our platform against fraud or misuse.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">4. Data Security</h2>
        <p className="mb-4 text-gray-700">
          We use industry-standard security measures (encryption, secure servers)
          to safeguard your personal information. However, no method of transmission
          over the internet is 100% secure.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">5. Your Rights</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700 space-y-1">
          <li>You can access, update, or delete your personal data anytime.</li>
          <li>You may opt out of promotional emails.</li>
          <li>You can request account deletion by contacting our support team.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">6. Updates to This Policy</h2>
        <p className="mb-4 text-gray-700">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with the updated date.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">7. Contact Us</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mt-2 space-y-2 sm:space-y-0 text-gray-700">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-blue-800" />
            <span>support@bookmycar.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-blue-800" />
            <span>+91 98765 43210</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
