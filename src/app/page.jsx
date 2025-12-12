"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroFactoryLicense from "@/components/HeroFactoryLicense";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import FactoryCta from "@/components/FactoryCta";
import FaqSection from "@/components/FaqSection";
import VideoCtaSection from "@/components/VideoCtaSection";
import FactoryLicenseGrid from "@/components/FactoryLicenseGrid";
import StatsSection from "@/components/Stats";
import BenefitsSection2 from "@/components/BenefitsSection2";
import LocationSection from "@/components/LocationSection";
import HowItWorks from "@/components/HowItWorks";
import WhyNeedSection from "@/components/WhyNeedSection";
import Footer from "@/components/Footer";
import DocumentsRequiredSection from "@/components/DocumentsRequiredSection";
import FeeStructure from "@/components/FeeStructure";
import RenewalFeeSection from "@/components/RenewalFeeSection";
import FactoryLicenceStepsSection from "@/components/FactoryLicenceStepsSection";
import TimelineSection from "@/components/TimelineSection";
import PenaltiesSection from "@/components/PenaltiesSection";
import ContactForm from "@/components/ContactForm";
import wh from '@/assets/wh.png';
import Image from "next/image";
const Page = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupClosedOnce, setPopupClosedOnce] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 30000); // open popup after 10 sec

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (popupClosedOnce) {
      const reopenTimer = setTimeout(() => {
        setShowPopup(true);
        setPopupClosedOnce(false); // allow future auto close/reopens
      }, 30000);

      return () => clearTimeout(reopenTimer);
    }
  }, [popupClosedOnce]);

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupClosedOnce(true);
  };

  return (
    <div>
      <Header />

      {/* Let's Talk Button */}
      <a
      href="https://wa.me/+919910792080"
         className="fixed animate-bounce md:bottom-10 bottom-4 right-2 md:right-10   text-xl   text-white rounded-full   z-20 cursor-pointer"
      >
        <Image src={wh} alt="WhatsApp" className="inline-block mr-2 h-20 w-20" />
 
       </a>

      {/* Popup Contact Form */}
      {showPopup && (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <ContactForm />
          </div>
        </div>
      )}

      {/* Page Sections */}
      <HeroFactoryLicense />
      <FactoryLicenseGrid />
      <VideoCtaSection />
      <StatsSection />
      <WhyNeedSection />
      <BenefitsSection2 />
      <DocumentsRequiredSection />
      {/* <FeeStructure /> */}
      <RenewalFeeSection />
      <FactoryLicenceStepsSection />
      <TimelineSection />
      <PenaltiesSection />
      <HowItWorks />
      <BenefitsSection />
      <LocationSection />
      <TestimonialCarousel />
      <FaqSection />
      <FactoryCta />
      {/* <Footer /> */}
    </div>
  );
};

export default Page;
