import { ShieldCheck, FileCheck, UserCheck } from "lucide-react";

const BenefitsSection = () => {
  return (
    <div className="bg-gradient-to-tr from-white to-violet-100 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {/* 1. Broad Industry Support */}
        <div>
          <ShieldCheck className="mx-auto text-[#7A3EF2] w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">
            Covers All Factory Types
          </h3>
          <p className="text-sm text-gray-600">
            From small-scale to manufacturing zones — we’ve got it licensed.
          </p>
        </div>

        {/* 2. No Prior Experience Needed */}
        <div>
          <UserCheck className="mx-auto text-[#7A3EF2] w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">
            No Legal Knowledge Needed
          </h3>
          <p className="text-sm text-gray-600">
            We handle end-to-end compliance so you don’t have to.
          </p>
        </div>

        {/* 3. All-in-One Licensing */}
        <div>
          <FileCheck className="mx-auto text-[#7A3EF2] w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">
            Single-Window Process
          </h3>
          <p className="text-sm text-gray-600">
            One platform for registration, documentation, and approvals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
