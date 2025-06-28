import {
  Factory,
  Users,
  BadgeCheck,
  LayoutDashboard,
  ShieldCheck,
  Trash2,
  Gavel,
  RefreshCcw,
  FileCheck,
} from "lucide-react";

const WhyNeedSection = () => {
  return (
    <section className="bg-violet-50 py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Why You Need a Factory Licence
          </h2>
        </div>

        {/* Intro */}
        <div className="text-base sm:text-lg text-gray-700 leading-relaxed mb-12 max-w-4xl mx-auto text-center">
          <p>
            If you're planning to set up a manufacturing plant in India, a Factory Licence is your first legal step. It is mandatory under the <strong>Factories Act, 1948</strong> and proves your unit complies with all safety, health, and welfare standards.
          </p>
        </div>

        {/* Main Icons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Power & Worker Threshold */}
          <div className="flex items-start gap-4">
            <Users className="text-[#7A3EF2] w-8 h-8 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">Who Needs It</h3>
              <p className="text-gray-600 text-sm mt-1">
                Mandatory if using power with <strong>10+ workers</strong> or without power and employing <strong>20+ workers</strong>.
              </p>
            </div>
          </div>

          {/* Issuing Authority */}
          <div className="flex items-start gap-4">
            <BadgeCheck className="text-[#7A3EF2] w-8 h-8 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">Issued By</h3>
              <p className="text-gray-600 text-sm mt-1">
                Provided by the <strong>Labour Department</strong> or <strong>Chief Inspector of Factories</strong> in your state.
              </p>
            </div>
          </div>

          {/* Layout Review */}
          <div className="flex items-start gap-4">
            <LayoutDashboard className="text-[#7A3EF2] w-8 h-8 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">Layout & Safety Review</h3>
              <p className="text-gray-600 text-sm mt-1">
                Authorities inspect layout plans, fire safety, and emergency measures.
              </p>
            </div>
          </div>

          {/* Waste Management */}
          <div className="flex items-start gap-4">
            <Trash2 className="text-[#7A3EF2] w-8 h-8 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">Waste Management</h3>
              <p className="text-gray-600 text-sm mt-1">
                Your waste disposal system must align with environmental standards.
              </p>
            </div>
          </div>

          {/* Legal Compliance */}
          <div className="flex items-start gap-4">
            <ShieldCheck className="text-[#7A3EF2] w-8 h-8 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">Legal Compliance</h3>
              <p className="text-gray-600 text-sm mt-1">
                A valid licence protects your unit from legal risks and liabilities.
              </p>
            </div>
          </div>

          {/* Penalties */}
          <div className="flex items-start gap-4">
            <Gavel className="text-red-600 w-8 h-8 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">Avoid Penalties</h3>
              <p className="text-gray-600 text-sm mt-1">
                Non-compliance may lead to <strong>fines, shutdowns, or legal action</strong>.
              </p>
            </div>
          </div>

          {/* Renewal */}
          <div className="flex items-start gap-4">
            <RefreshCcw className="text-[#7A3EF2] w-8 h-8 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">Renewal Requirements</h3>
              <p className="text-gray-600 text-sm mt-1">
                Most states require annual renewal — delays can impact operations.
              </p>
            </div>
          </div>

          {/* We Handle It */}
          <div className="flex items-start gap-4">
            <FileCheck className="text-[#7A3EF2] w-8 h-8 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">We Handle Everything</h3>
              <p className="text-gray-600 text-sm mt-1">
                <strong>Factorylicence.in</strong> manages end-to-end — applications, inspections, and compliance.
              </p>
            </div>
          </div>
        </div>

        {/* Outro */}
        <div className="mt-14 text-center text-gray-800 text-lg font-medium">
          Focus on growth. We'll handle the licensing, compliance, and peace of mind.
        </div>
      </div>
    </section>
  );
};

export default WhyNeedSection;
