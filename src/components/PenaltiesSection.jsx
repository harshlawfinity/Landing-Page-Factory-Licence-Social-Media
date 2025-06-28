import { Gavel, AlertTriangle } from "lucide-react";

const PenaltiesSection = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <Gavel className="w-10 h-10 text-red-600" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6">
          Penalties in Case of Non-Compliance
        </h2>

        {/* Fines & Imprisonment */}
        <div className="flex items-start gap-4 mb-6">
          <AlertTriangle className="w-6 h-6 text-red-500 mt-1" />
          <p className="text-gray-700 text-base">
            <strong>Non-compliance with the Factories Act, 1948</strong> may lead to penalties including fines of up to <strong>₹1,00,000</strong> or imprisonment for up to <strong>2 years</strong>, depending on the severity of the violation.
          </p>
        </div>

        {/* Late Renewal */}
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-500 mt-1" />
          <p className="text-gray-700 text-base">
            A <strong>25% late fee</strong> is applicable on factory licence renewal if delayed. The late fee is calculated from the date of submission of the renewal application.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PenaltiesSection;
