import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react"; // ✅ cross icon

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const location = useLocation();

  // अगर state से previous page मिला तो वही redirect, वरना "/" fallback
  const previousPage = location.state?.from || "/";

  return (
    <div className="min-h-screen bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative">
      {/* ❌ Close Button */}
      <button
        onClick={() => navigate(previousPage)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
      >
        <X size={28} />
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Privacy Policy – SakaAI</h1>
        <p className="text-slate-400">Effective Date: 21 September 2025</p>

        {/* 1. Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-slate-300">
            Welcome to <strong>SakaAI</strong>. We provide an AI-powered platform for
            <strong> bulk messaging, automated replies, lead generation, and AI-assisted customer communication</strong> via WhatsApp and other digital channels.
            <br />
            This Privacy Policy explains how we collect, use, store, and protect your information when you use our website (<strong>www.sakaai.in</strong>) and services. By using our platform, you agree to the practices described here.
          </p>
        </section>

        {/* 2. Information We Collect */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            <li>Personal Information: Name, email, mobile number, company name.</li>
            <li>Account Information: Login credentials, usage preferences, templates created.</li>
            <li>Technical Data: IP address, browser type, device type, operating system.</li>
            <li>Usage Data: Features you use, messages sent, API interactions.</li>
          </ul>
        </section>

        {/* 3. How We Use Your Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            <li>Provide and operate our services efficiently.</li>
            <li>Send automated messages and manage bulk messaging.</li>
            <li>Enable AI-driven lead generation and customer support.</li>
            <li>Improve our platform and personalize your experience.</li>
            <li>Communicate with you about updates, promotions, or account issues.</li>
          </ul>
        </section>

        {/* 4. WhatsApp Business API Disclaimer */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. WhatsApp Business API Disclaimer</h2>
          <p className="text-slate-300">
            Our platform uses <strong>unofficial WhatsApp API integration</strong> to send bulk messages and automate responses. Please note:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            <li>Your mobile number may be subject to temporary or permanent blocking by WhatsApp if usage policies are violated.</li>
            <li>We do not control WhatsApp policies and are not responsible for account restrictions imposed by WhatsApp.</li>
            <li>Use the platform responsibly, respecting your recipients’ consent and WhatsApp terms of service.</li>
          </ul>
        </section>

        {/* 5. Data Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Data Security</h2>
          <p className="text-slate-300">
            We implement industry-standard measures to protect your data, including encryption, secure servers, and restricted access. However, no system is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* 6. Cookies and Tracking */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Cookies and Tracking</h2>
          <p className="text-slate-300">
            We use cookies and similar technologies to enhance your user experience and analyze website traffic. You can disable cookies via your browser settings, but some features may not work properly.
          </p>
        </section>

        {/* 7. Data Sharing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Data Sharing and Third Parties</h2>
          <p className="text-slate-300">
            We do not sell your personal information. We may share your data with service providers strictly for business operations. Your data may be disclosed if required by law.
          </p>
        </section>

        {/* 8. User Rights */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. User Rights</h2>
          <p className="text-slate-300">
            You can access, update, or delete your personal information, opt-out of marketing communications, or request data portability. Contact us at <strong>support@sakaai.in</strong>.
          </p>
        </section>

        {/* 9. Children’s Privacy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Children’s Privacy</h2>
          <p className="text-slate-300">
            Our platform is not intended for children under 13. We do not knowingly collect data from minors.
          </p>
        </section>

        {/* 10. International Users */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. International Users</h2>
          <p className="text-slate-300">
            SakaAI operates from India. By using our services, you consent to the transfer and storage of your data in India or other countries where our service providers operate.
          </p>
        </section>

        {/* 11. Limitation of Liability */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">11. Limitation of Liability</h2>
          <p className="text-slate-300">
            SakaAI is provided "as-is". We are not liable for any loss, including WhatsApp number blocking, lost leads, or downtime. Users are responsible for compliance with local laws and WhatsApp’s terms.
          </p>
        </section>

        {/* 12. Changes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">12. Changes to This Policy</h2>
          <p className="text-slate-300">
            We may update this Privacy Policy from time to time. Updated policies will be posted on this page with a new effective date.
          </p>
        </section>

        {/* 13. Contact Us */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">13. Contact Us</h2>
          <p className="text-slate-300">
            Email: <strong>support@sakaai.in</strong> <br />
            Website: <strong>www.sakaai.in</strong>
          </p>
        </section>
      </div>
    </div>
  );
}