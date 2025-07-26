"use client";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import Link  from "next/link";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray- px-4">
      <div className="bg-white rounded-2xl   p-8 max-w-md text-center">
        <FiCheckCircle className="text-[#7A3EF2] text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          We’ve received your details. Our team will connect with you shortly.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#7A3EF2] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#612ce0] transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
