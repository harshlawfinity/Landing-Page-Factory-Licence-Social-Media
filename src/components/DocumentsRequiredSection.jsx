import {
  FileText,
  ClipboardList,
  User,
  Building2,
  FileBadge,
  PlugZap,
} from "lucide-react";

const DocumentsRequiredSection = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Documents Required 
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto text-base sm:text-lg">
            Here's a checklist of essential documents needed to apply for a Factory Licence in Haryana.
          </p>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Building Plan Approval */}
          <div className="flex items-start gap-4">
            <Building2 className="text-[#7A3EF2] w-8 h-8 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Building Plan Approval</h3>
              <p className="text-sm text-gray-600">
                Approved plan of the factory building from competent authority.
              </p>
            </div>
          </div>

          {/* Layout Plan */}
          <div className="flex items-start gap-4">
            <ClipboardList className="text-[#7A3EF2] w-8 h-8 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Layout Plan (Factories Act)
              </h3>
              <p className="text-sm text-gray-600">
                Internal layout as per the norms of the Factories Act, 1948.
              </p>
            </div>
          </div>

          {/* KYC of Owners/Directors */}
          <div className="flex items-start gap-4">
            <User className="text-[#7A3EF2] w-8 h-8 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">KYC of Owners/Directors</h3>
              <p className="text-sm text-gray-600">
                Aadhaar, PAN, or passport of all key stakeholders.
              </p>
            </div>
          </div>

          {/* Business Registration */}
          <div className="flex items-start gap-4">
            <FileBadge className="text-[#7A3EF2] w-8 h-8 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Business Registration</h3>
              <p className="text-sm text-gray-600">
                Company/Firm registration documents like GST, CIN, or Partnership Deed.
              </p>
            </div>
          </div>

          {/* Sale Deed / Rent Agreement */}
          <div className="flex items-start gap-4">
            <FileText className="text-[#7A3EF2] w-8 h-8 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Sale Deed / Rent Agreement
              </h3>
              <p className="text-sm text-gray-600">
                Legal ownership or lease documents of the manufacturing premises.
              </p>
            </div>
          </div>

          {/* Electricity Sanction */}
          <div className="flex items-start gap-4">
            <PlugZap className="text-[#7A3EF2] w-8 h-8 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Electricity Sanction
              </h3>
              <p className="text-sm text-gray-600">
                Sanctioned load from HVPNL or latest electricity bill copy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentsRequiredSection;
