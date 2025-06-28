import { PlayCircle } from "lucide-react";

export default function VideoCtaSection() {
  return (
    <section className="bg-gradient-to-br from-[#f4f0ff] to-white py-20 px-4 sm:px-8 text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl capitalize font-bold text-[#7A3EF2] mb-6">
          Take Factory Licence for a spin!
        </h2>

        <button
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-full inline-flex items-center gap-2 transition mb-12"
        >
          <PlayCircle className="w-5 h-5" />
          Watch Overview
        </button>

        {/* Video Placeholder / Iframe */}
        <div className="aspect-w-16 aspect-h-9 md:h-96 h-60 w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/AZsh13Zb-PQ?rel=0" // Replace with actual video link
            title="FactoryLicence Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
