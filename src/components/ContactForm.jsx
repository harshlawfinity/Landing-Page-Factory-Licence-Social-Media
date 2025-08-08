"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiUser, FiPhone, FiMail } from "react-icons/fi";

const HeroForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    description: "",
    pageSource: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const phoneRegex = /^\d{10}$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && value && !phoneRegex.test(value)) {
      e.target.setCustomValidity("Phone number must be 10 digits.");
    } else {
      e.target.setCustomValidity("");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000;
      const istTime = new Date(now.getTime() + istOffset);
      const timestamp = istTime.toISOString().replace("T", " ").split(".")[0];

      const formBody = new URLSearchParams();
      formBody.append("name", formData.name);
      formBody.append("phone", formData.phone);
      formBody.append("email", formData.email);
      formBody.append("description", formData.description);
      formBody.append("pageSource", formData.pageSource);
      formBody.append("timestamp", timestamp);
      formBody.append("source", "factory-licence-landing-page");  

      const response = await fetch("/api/submit-contact", {
        method: "POST",
        body: formBody,
      });

      if (response.ok) {
         router.push("/thankyou");
      } else {
        const err = await response.json();
        console.error("Server error:", err);
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Client error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      pageSource: pathname,
    }));
  }, [pathname]);

  return (
    <div className="max-w-lg mx-auto bg-white md :p-8 p- 4 rounded-2xl">
      <div className="text-center mb-4">
        <h2 className="md:text-2xl text-xl font-semibold text-[#7A3EF2]">
          Let’s Connect Together
        </h2>
        <p className="text-gray-600 mt-2 text-sm">
          Share your details & we’ll connect with you.
        </p>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="flex items-center border border-gray-300 rounded-md p-3 shadow-sm">
          <FiUser className="text-gray-400 text-xl mr-3" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your name*"
            className="w-full bg-transparent outline-none text-gray-700"
            required
          />
        </div>

        {/* Phone */}
        <div className="flex items-center border border-gray-300 rounded-md p-3 shadow-sm">
          <FiPhone className="text-gray-400 text-xl mr-3" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="10-digit mobile number*"
            className="w-full bg-transparent outline-none text-gray-700"
            pattern="^\d{10}$"
            title="Phone number must be exactly 10 digits"
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center border border-gray-300 rounded-md p-3 shadow-sm">
          <FiMail className="text-gray-400 text-xl mr-3" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your email address"
            className="w-full bg-transparent outline-none text-gray-700"
            required
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="What do you need help with?"
          className="w-full border border-gray-300 rounded-md p-3 shadow-sm bg-white text-gray-700 outline-none"
          rows="3"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#7A3EF2] hover:bg-[#612ce0]"
          } text-white font-semibold py-3 rounded-md transition duration-300`}
        >
          {isSubmitting ? "Submitting..." : "Let's Talk"}
        </button>
      </form>
    </div>
  );
};

export default HeroForm;