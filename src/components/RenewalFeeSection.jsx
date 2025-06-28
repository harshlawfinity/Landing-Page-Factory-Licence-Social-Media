import { RefreshCcw, FileCheck, IndianRupee } from "lucide-react";

const RenewalFeeSection = () => {
  return (
    <section className="bg-violet-50 py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Factory Licence Renewal Fee – Haryana
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Haryana follows an HP and manpower-based fee structure for renewals, similar to new applications.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <RefreshCcw className="text-[#7A3EF2] w-8 h-8 mb-2" />
            <h4 className="text-sm font-semibold text-gray-800">Renewal Based on HP & Manpower</h4>
            <p className="text-xs text-gray-500">Charges vary by factory size & load</p>
          </div>

          <div className="flex flex-col items-center">
            <FileCheck className="text-[#7A3EF2] w-8 h-8 mb-2" />
            <h4 className="text-sm font-semibold text-gray-800">Includes Processing Charges</h4>
            <p className="text-xs text-gray-500">Covers inspection and documentation</p>
          </div>

          <div className="flex flex-col items-center">
            <IndianRupee className="text-[#7A3EF2] w-8 h-8 mb-2" />
            <h4 className="text-sm font-semibold text-gray-800">Government Treasury Fee</h4>
            <p className="text-xs text-gray-500">Payable via online challan/portal</p>
          </div>
        </div>

        {/* Note */}
        <p className="mt-10 text-sm text-center text-gray-600">
          <strong>Note:</strong> The exact renewal charges are disclosed during the application process on the Haryana Labour Department’s official portal.
        </p>
      </div>

      <p className="mt-4 text-sm text-center text-gray-700">
  <strong>Amendment Fee:</strong> ₹100 per change (e.g., name, occupier, address).
</p>
    </section>
  );
};

export default RenewalFeeSection;
