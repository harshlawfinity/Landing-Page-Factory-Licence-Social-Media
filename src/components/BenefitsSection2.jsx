import { ShieldCheck, FileCheck, UserCheck , Sparkles} from "lucide-react";

const BenefitsSection = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Benefits of Obtaining a Factory Licence
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Empower your factory with legal credibility, operational safety, and government support.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {/* Legal Recognition */}
          <div className="group hover:shadow-md transition-all duration-300 p-6 rounded-xl border border-gray-100 text-center">
            <ShieldCheck className="text-[#7A3EF2] w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#7A3EF2]">
              Legal Recognition
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Ensures lawful operations and smooth functioning of your unit.
            </p>
          </div>

          {/* Enhanced Credibility */}
          <div className="group hover:shadow-md transition-all duration-300 p-6 rounded-xl border border-gray-100 text-center">
            <UserCheck className="text-[#7A3EF2] w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#7A3EF2]">
              Enhanced Credibility
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Builds trust among stakeholders through compliance.
            </p>
          </div>

          {/* Government Schemes */}
          <div className="group hover:shadow-md transition-all duration-300 p-6 rounded-xl border border-gray-100 text-center">
            <FileCheck className="text-[#7A3EF2] w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#7A3EF2]">
              Access to Government Schemes
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Unlock subsidies and industrial benefits from the government.
            </p>
          </div>

          {/* Employee Welfare */}
          <div className="group hover:shadow-md transition-all duration-300 p-6 rounded-xl border border-gray-100 text-center">
            <ShieldCheck className="text-[#7A3EF2] w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#7A3EF2]">
              Employee Welfare
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Promotes safety, health, and productivity in the workplace.
            </p>
          </div>

          {/* Avoidance of Penalties */}
          <div className="group hover:shadow-md transition-all duration-300 p-6 rounded-xl border border-gray-100 text-center">
            <UserCheck className="text-[#7A3EF2] w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#7A3EF2]">
              Avoidance of Penalties
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Avoid shutdowns, fines, or legal issues with timely compliance.
            </p>
          </div>
        
<div className="group hover:shadow-md transition-all duration-300 p-6 rounded-xl border border-gray-100 text-center">
  <Sparkles className="text-[#7A3EF2] w-10 h-10 mb-4 mx-auto" />
  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#7A3EF2]">
    Many More Benefits
  </h3>
  <p className="text-sm text-gray-600 mt-2">
    Discover additional perks tailored to your factory’s growth and compliance journey.
  </p>
</div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
