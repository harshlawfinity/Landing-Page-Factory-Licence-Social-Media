import { CalendarDays } from "lucide-react";

const TimelineSection = () => {
  return (
    <section className="bg-violet-50 py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CalendarDays className="w-10 h-10 text-[#7A3EF2]" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Timeline to Get Factory Licence in Haryana
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
          The process typically takes <strong>15 to 18 working days</strong>, depending on the availability of documents and timely government approvals.
        </p>
      </div>
    </section>
  );
};

export default TimelineSection;
