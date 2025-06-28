import React from "react";

export default function FactoryCta() {
  return (
    <div className="relative bg-[#F7F6F2] py-20 px-6 overflow-hidden bg-gradient-to-tl from-white via-[#7a3ef223] to-white">
      {/* Yellow gradient shape */}
      {/* <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-gradient-to-tl from-white via-[#7A3EF2] to-white opacity-70 transform rotate-45 translate-x-1/3 -translate-y-1/3 blur-2xl" /> */}

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
          Get your factory licence in a matter of days.
        </h2>
        <p className="mt-4 text-gray-700 text-lg">
          No delays. No confusion. Just compliant setup, fast.
        </p>
        <button className="mt-8 px-6 py-3 bg-black text-white rounded-md text-base font-medium hover:bg-gray-800 transition">
          Apply Now
        </button>
      </div>
    </div>
  );
}
