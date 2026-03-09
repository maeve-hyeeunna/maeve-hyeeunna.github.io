"use client";

import Container from "@/components/layout/container";
import { Mail, MapPin, Phone, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CONTACT_INFO } from "@/../data/contact/data";

const ContactPage = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-white fade-in">
      <Container>
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-10">

          {/* Profile Image */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center group">
            <Image
              src={CONTACT_INFO.profileImage}
              alt={CONTACT_INFO.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Name & Title */}
          <div className="space-y-3 animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-cormorant font-medium text-gray-900 tracking-tight">
              {CONTACT_INFO.name}
            </h1>
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] font-medium">
              {CONTACT_INFO.title}
            </p>
          </div>

          {/* Introduction */}
          <div className="max-w-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <p className="text-gray-600 font-cormorant text-lg md:text-2xl leading-relaxed italic">
              "{CONTACT_INFO.quote}"
            </p>
          </div>

          {/* Divider */}
          <div className="w-10 h-[1px] bg-gray-200 my-4"></div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4 items-center w-full max-w-xs animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <button
              onClick={handleCopyEmail}
              className="group flex items-center justify-center gap-3 text-gray-500 hover:text-black transition-all w-full py-2 hover:bg-gray-50 rounded-lg cursor-pointer relative"
              title="Click to copy email"
            >
              {isCopied ? (
                <Check className="w-4 h-4 text-green-500" strokeWidth={1.5} />
              ) : (
                <Mail className="w-4 h-4" strokeWidth={1.5} />
              )}
              <span className="font-inter text-sm tracking-wide">
                {isCopied ? "Copied!" : CONTACT_INFO.email}
              </span>
            </button>

            {/* Phone Numbers */}
            {CONTACT_INFO.phoneNumbers.length > 0 && (
              <div className="group flex items-start justify-center gap-3 text-gray-500 hover:text-black transition-all w-full py-2 hover:bg-gray-50 rounded-lg">
                <Phone className="w-4 h-4 mt-1" strokeWidth={1.5} />
                <div className="flex flex-col gap-1 items-start">
                  {CONTACT_INFO.phoneNumbers.map((phone) => (
                    <a
                      key={phone.tel}
                      href={`tel:${phone.tel}`}
                      className="font-inter text-sm tracking-wide hover:font-medium transition-all"
                    >
                      <span className="text-gray-400 text-xs mr-2">{phone.country}</span>
                      {phone.number}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {CONTACT_INFO.socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 text-gray-500 hover:text-black transition-all w-full py-2 hover:bg-gray-50 rounded-lg"
              >
                {social.platform === "linkedin" && (
                  <svg 
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                   <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1h.02C3.87 1 4.98 2.12 4.98 3.5ZM.5 8h4V24h-4V8Zm7 0h3.83v2.16h.05c.53-1.01 1.84-2.16 3.79-2.16 4.05 0 4.8 2.66 4.8 6.12V24h-4v-7.01c0-1.67-.03-3.82-2.33-3.82-2.33 0-2.69 1.82-2.69 3.7V24h-4V8Z" />
                  </svg>
                )}
                <span className="font-inter text-sm tracking-wide">{social.handle}</span>
              </a>
            ))}

            {/* Location */}
            <div className="flex items-center justify-center gap-3 text-gray-400 w-full py-2 mt-2">
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              <div className="flex flex-col items-center">
                <span className="font-inter text-sm tracking-wide text-gray-600">
                  Currently based in{" "}
                  <span className="font-medium text-gray-800">
                    {CONTACT_INFO.location.city}, {CONTACT_INFO.location.region}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactPage;
