import {
  Globe,
  FileEdit,
  Upload,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Globe,
    title: "Online Registration",
    desc: "Create an account on the Haryana Labour Department Portal.",
  },
  {
    number: 2,
    icon: FileEdit,
    title: "Application Form",
    desc: "Fill in all factory details accurately.",
  },
  {
    number: 3,
    icon: Upload,
    title: "Document Upload",
    desc: "Submit all required documents in proper format.",
  },
  {
    number: 4,
    icon: IndianRupee,
    title: "Fee Payment",
    desc: "Pay application fee via online treasury.",
  },
  {
    number: 5,
    icon: ShieldCheck,
    title: "Inspection",
    desc: "Site inspection by Labour Department officers.",
  },
  {
    number: 6,
    icon: CheckCircle2,
    title: "Licence Approval",
    desc: "Receive your factory licence upon approval.",
  },
];

const FactoryLicenceStepsSection = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Steps to Get a Factory Licence
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            A guided step-by-step process to ensure you meet all compliance requirements.
          </p>
        </div>

        {/* Steps Flow */}
        <div className="flex flex-col items-center space-y-12 md:space-y-0 md:flex-row md:justify-between relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center w-40 relative">
                {/* Step Circle */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#7A3EF2] text-white font-semibold mb-3">
                  {step.number}
                </div>

                {/* Icon */}
                <Icon className="w-6 h-6 text-[#7A3EF2] mb-2" />

                {/* Title & Desc */}
                <h4 className="text-sm font-semibold text-gray-800">{step.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{step.desc}</p>

                {/* Arrow - hide last */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 right-[-28px]">
                    <ArrowRight className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FactoryLicenceStepsSection;
