import React from "react";
import { Mail, Phone } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="max-w-screen mx-auto  p-6 text-gray-800 bg-white shadow-lg rounded-xl mt-10 pt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Terms of Service
      </h1>

      <p className="mb-4 text-gray-700">
        Welcome to <strong>BookMyCar</strong>. By accessing or using our platform,
        you agree to comply with and be bound by these Terms of Service. Please
        read them carefully.
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">1. Eligibility</h2>
        <p className="mb-4 text-gray-700">
          To use our services, you must be at least 18 years old and hold a valid
          driving licence. Providing false or misleading information may result in
          termination of your account.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">2. User Responsibilities</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700 space-y-1">
          <li>Provide accurate details during registration and booking.</li>
          <li>Be responsible for the vehicle during the rental period.</li>
          <li>Return the car in the same condition as received.</li>
          <li>Comply with all traffic laws and regulations.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">3. Bookings & Payments</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700 space-y-1">
          <li>All bookings are subject to availability and confirmation.</li>
          <li>Payment must be made through our secure payment gateway.</li>
          <li>Prices may vary depending on car type, duration, and location.</li>
          <li>Cancellations and refunds are subject to our cancellation policy.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">4. Prohibited Uses</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-700 space-y-1">
          <li>Illegal activities or transporting prohibited items.</li>
          <li>Racing, speed testing, or reckless driving.</li>
          <li>Subletting the car to another person without permission.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">5. Liability</h2>
        <p className="mb-4 text-gray-700">
          BookMyCar is not responsible for accidents, damages, or losses that occur
          during the rental period. Users are liable for any fines, penalties, or
          damages caused while using the vehicle.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">6. Account Suspension</h2>
        <p className="mb-4 text-gray-700">
          We reserve the right to suspend or terminate your account if you violate
          these terms or misuse our services.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">7. Changes to Terms</h2>
        <p className="mb-4 text-gray-700">
          We may update these Terms of Service at any time. Continued use of our
          platform after changes implies your acceptance of the updated terms.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">8. Contact Us</h2>
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

export default TermsOfService;
