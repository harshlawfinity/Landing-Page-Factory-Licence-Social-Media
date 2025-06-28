import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import heroimg from "../assets/heroimg.png";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  const [dynamicWord, setDynamicWord] = useState("Licensing");
  const [animate, setAnimate] = useState(false);

  const words = ["Licensing", "Compliance", "Setup", "Expansion", "Support"];

  useEffect(() => {
    let wordIndex = 0;
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        setDynamicWord(words[wordIndex]);
        setAnimate(false);
      }, 500);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroimg}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/80 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-12 min-h-screen">
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex items-center mb-5 md:mb-0">
          <div className="space-y-5 max-w-xl">
            <div className="bg-[#7A3EF2] text-white text-xs font-medium px-3 py-1 rounded-full w-max">
              Factory License Services
            </div>
            <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
              Your Gateway to <br />{" "}
              <span
                className={`inline-block text-[#7A3EF2] transition-all duration-500 ${
                  animate
                    ? "translate-y-full opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                {dynamicWord}
              </span>
            </h1>
            <p className="text-white text-sm md:text-base">
              Get your factory license approved fast — avoid legal hassles and
              start operations smoothly.
            </p>

            <div className="space-y-2">
              {[
                "Expert Compliance Handling",
                "Quick Government Approvals",
                "End-to-End Documentation",
                "Dedicated Licensing Consultant",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center text-white text-sm md:text-base"
                >
                  <CheckCircle className="w-5 h-5 text-[#7A3EF2] mr-2" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Form */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-white shadow-2xl rounded-xl p-6 md:p-10 w-full max-w-md">
            {/* <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-6">
              Apply for Your Factory License Now
            </h2> */}
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
