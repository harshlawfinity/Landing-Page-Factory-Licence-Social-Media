"use client"
import { ArrowRight } from 'lucide-react';
import ContactForm from "./ContactForm";
import { useState } from "react";
export default function HowItWorks() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        {/* Left Section */}
        <div>
          <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
            How it Works
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-4">
            How Our Licensing Services Work
          </h2>
          <p className="mt-4 text-gray-600">
            We simplify the licensing journey for your manufacturing unit with a guided and efficient process. Just follow these simple steps to get started.
          </p>
          <button                 onClick={() => setShowPopup(true)}
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#642bd5d5] to-[#642bd5] text-white font-medium rounded-full shadow-lg hover:scale-105 transition">
            Get Started
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Right Section – Timeline */}
        <div className="space-y-10 relative">
          {[
            {
              title: 'Identify Your Licence Type',
              desc: 'Choose the appropriate licence type based on your industry and manufacturing needs.',
            },
            {
              title: 'Schedule a Consultation',
              desc: 'Book a call with our compliance expert to understand the process and requirements.',
            },
            {
              title: 'Submit Documentation',
              desc: 'Provide all necessary documents with our team  for further processing.',
            },
            {
              title: 'Receive Your Factory Licence',
              desc: 'Get your licence delivered digitally once approved by the authorities.',
            },
          ].map((step, i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="w-4 h-4 mt-1 bg-gradient-to-br from-[#642bd5] to-purple-600 rounded-md"></div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{step.title}</h3>
                <p className="text-gray-600 mt-1 text-justify">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
       {showPopup && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-gray-50 p-6 rounded-lg max-w-md w-full relative shadow-lg">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-3 text-gray-500 text-4xl"
              aria-label="Close contact form"
            >
              ×
            </button>
            <ContactForm />
          </div>
        </div>
      )}
    </section>
  );
}
