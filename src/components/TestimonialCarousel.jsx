'use client'
import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

import innobev from '../assets/logo/innobev.webp';
import lathar from '../assets/logo/lathar.webp';
import servotec from '../assets/logo/servotec.webp';
import sleepy from '../assets/logo/sleepy.webp';
import smc from '../assets/logo/smc.webp';
import sugar from '../assets/logo/sugar.webp';
import syfo from '../assets/logo/syfo.webp';
import jaypee from '../assets/logo/jaypee.png';

const testimonials = [
  {
    name: 'Sarika Bhatia',
    role: 'Director, Servotech Power System Ltd.',
    avatar: servotec,
    quote:
      'FactoryLicence.in made the entire process of getting our factory licence smooth and stress-free. Their team was responsive, well-informed, and extremely professional.',
  },
  {
    name: 'Amit',
    role: 'Purchase Manager, Jaypee Infratech Limited',
    avatar: jaypee,
    quote:
      'Pollution NOC ka process initially bahut confusing tha, lekin Lawfinity India ne pura kaam handle kiya—from documentation to approvals. Bohot hi efficient aur trustworthy service.',
  },
  {
    name: 'Tanul Rustagi',
    role: 'Director, Innobev Solution Private Limited',
    avatar: innobev,
    quote:
      'With FactoryLicence.in, we secured our factory licence without a hitch. Their end-to-end support helped us launch production on time with complete legal compliance.',
  },
  {
    name: 'Anil Kakkar',
    role: 'Director, SPRU Products Pvt Ltd',
    avatar: syfo,
    quote:
      'We highly recommend FactoryLicence.in for factory setup compliance. Their detailed knowledge and proactive approach helped us avoid delays and penalties.',
  },
  {
    name: 'Jhanvi Mishra',
    role: 'Product Manager, Sugar Cosmetics',
    avatar: sugar,
    quote:
      'FactoryLicence.in ensured that every form and requirement for our factory licence was handled efficiently. The service was prompt and saved us countless hours.',
  },
  {
    name: 'Mithilesh Gautam',
    role: 'Product Manager, Lather Green Energy Pvt Ltd',
    avatar: lathar,
    quote:
      'Lawfinity India ke through Pollution NOC lena kaafi asaan ho gaya. Har step par proper guidance mila. Compliance ke bina kaam start karna risk hota hai – unhone woh risk hata diya.',
  },
  {
    name: 'Prakash Raj',
    role: 'Sleepy Owl Private Coffee Pvt Ltd',
    avatar: sleepy,
    quote:
      'Hamari factory ke liye sabhi licences jaise Factory Licence, Pollution NOC, Labour aur Fire Safety approvals ek hi jagah – Lawfinity India – se mile. Ek hi trusted source se saara compliance complete karna bahut hi suvidha janak aur safe tha.',
  },
  {
    name: 'Nawam Gupta',
    role: 'SMC Enterprises',
    avatar: smc,
    quote:
      'We obtained all our factory-related licences—such as the Factory Licence, Pollution NOC, Labour Compliance, and Fire Safety Approvals—from a single source: Lawfinity India. Completing all compliances through one trusted partner was extremely convenient and ensured full legal safety.',
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoPlay = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
  };

  const stopAutoPlay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, []);

  const { name, role, avatar, quote } = testimonials[index];

  return (
    <div
      className="py-20 px-6 sm:px-10 bg-gradient-to-bl  from-[#7A3EF8] via-[#7a3ef2e1] to-[#7A3EF2] text-white"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left - Avatar & Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative bg-white w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
            <Image src={avatar} alt={name} fill className="object-contain" />
          </div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-white/80">{role}</p>
          <div className="flex mt-3 space-x-1 text-yellow-300">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
          </div>
        </div>

        {/* Right - Quote */}
        <div className="relative bg-white text-[#333] p-6 rounded-xl shadow-md">
          <Quote className="w-8 h-8 text-[#7A3EF2] absolute -top-4 -left-4 bg-white p-1 rounded-full shadow" />
          <p className="text-base md:text-lg leading-relaxed italic">
            "{quote}"
          </p>
        </div>
      </div>

      <p className="text-center text-white/90 text-sm mt-10 tracking-wide">
        Trusted by over 1000+ factories and manufacturing businesses across India.
      </p>
    </div>
  );
}
