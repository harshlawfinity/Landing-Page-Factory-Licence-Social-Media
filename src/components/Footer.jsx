"use client";

import React from "react";
import Link from "next/link";
import { Mail, PhoneCall, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import FL from "./FL2.jsx";

export default function Footer() {
  return (
    <footer className="bg-[#8653F4] text-gray-200 px-6 py-16 ">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-12 text-sm">
        {/* Column 1 */}
        <div className="w-full flex items-center justify-center flex-col">
          <FL />
          <h4 className="text-2xl mt-10 italic font-semibold mb-6 tracking-wide text-purple-100">
            Factory Licencing Made Simple With factorylicence.in
          </h4>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-2xl font-semibold mb-6 tracking-wide text-purple-100">
            Contacts
          </h4>
          <address className="not-italic text-gray-100 leading-relaxed">
            T-10, Plot No. -7, 3rd Floor, Pankaj Plaza, Pocket-7, Sector-12,
            Dwarka, New Delhi - 110078
          </address>

          <p className="text-gray-100 mt-6 leading-relaxed">
            <span className="font-semibold">Mon – Sat:</span> 10am – 7pm
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-3">
              <PhoneCall size={20} />
              <a
                href="tel:+919910774687"
                className="hover:text-purple-100 transition-colors font-medium"
              >
                +91 99107 74687
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={20} />
              <a
                href="mailto:info@factorylicence.in"
                className="hover:text-purple-100 transition-colors font-medium"
              >
                info@factorylicence.in
              </a>
            </div>
          </div>

        
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-2xl font-semibold mb-6 tracking-wide text-purple-100">
            Our Support
          </h4>
          <p className="text-purple-100 font-semibold text-2xl mb-3 flex gap-2 items-center">
            <PhoneCall size={24} />
            +91 99107 74687
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-xs text-gray-100 border-t border-gray-200 pt-6 space-y-2">
        <p>
          All Rights Reserved 2025.{" "}
          <Link
            href="/"
            className="text-purple-100 hover:text-purple-800 transition-colors font-semibold"
          >
            factorylicence.in |
          </Link>{" "}
          <span className="italic">Powered by Lawfinity India PVT. LTD.</span>
        </p>
       
      </div>
    </footer>
  );
}
