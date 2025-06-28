import { lazy, useState } from 'react';
const ChevronDown = lazy(() =>
  import('lucide-react').then((mod) => ({ default: mod.ChevronDown }))
);

const ChevronUp = lazy(() =>
  import('lucide-react').then((mod) => ({ default: mod.ChevronUp }))
);
const faqs = [
  {
    question: "Is a factory licence required for small-scale manufacturing units?",
    answer: "Yes, if the unit employs 10 or more workers with power or 20 or more without power.",
  },
  {
    question: "Can I operate my factory while the application is pending?",
    answer: "No, you must receive the licence before commencing manufacturing operations.",
  },
  {
    question: "What is the validity of a factory licence?",
    answer: "Typically valid for 1 year; some states offer up to 5 years with renewal options.",
  },
  {
    question: "Is the process online or offline?",
    answer: "Most states, including Haryana offer online applications and processing.",
  },
  {
    question: "Who issues the Factory Licence in Haryana?",
    answer: "The Labour Department, Government  of Haryana.",
  },
  {
    question: "Is physical inspection mandatory?",
    answer: "Yes, the concerned authority inspects the premises before issuing the licence.",
  },
  {
    question: "Can factorylicence.in help with inspections and renewals?",
    answer: "Yes, we offer end-to-end support including pre-inspection readiness and timely renewal services.",
  },
  {
    question: "Are fire and pollution NOCs mandatory?",
    answer: "Yes, especially for medium to large factories or those involved in chemical or hazardous production.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  // Split the FAQs into two halves
  const mid = Math.ceil(faqs.length / 2);
  const firstHalf = faqs.slice(0, mid);
  const secondHalf = faqs.slice(mid);

  return (
    <section className="bg-gradient-to-b from-[#f9f9ff] to-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-[#000000] mb-12">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[firstHalf, secondHalf].map((half, colIdx) => (
            <div key={colIdx} className="space-y-5">
              {half.map((faq, index) => {
                const actualIndex = colIdx === 0 ? index : index + mid;
                return (
                  <div
                    key={actualIndex}
                    className="bg-white rounded-xl shadow transition-all duration-300 ease-in-out"
                  >
                    <button
                      onClick={() => toggle(actualIndex)}
                      className="w-full flex justify-between items-center text-left px-6 py-5 sm:py-3 font-medium text-gray-800 hover:text-[#7A3EF2] focus:outline-none"
                    >
                      <span className="text-base">{faq.question}</span>
                      {openIndex === actualIndex ? (
                        <ChevronUp className="text-[#7A3EF2]" />
                      ) : (
                        <ChevronDown className="text-gray-400" />
                      )}
                    </button>

                    <div
                      className={`overflow-hidden px-6 transition-all duration-300 text-gray-600 text-base ${
                        openIndex === actualIndex ? 'max-h-96 pb-2' : 'max-h-0'
                      }`}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
