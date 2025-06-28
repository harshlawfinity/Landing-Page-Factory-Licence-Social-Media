export default function LocationSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900">
          Find Us On The <span className="text-[#7A3EF2]">Map</span>.
        </h2>
        <p className="text-gray-600 mt-2">
          Explore our exact location here!
        </p>
      </div>

      <div className="max-w-7xl mx-auto h-[450px] overflow-hidden rounded-xl shadow-lg">
        <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.2988248919987!2d77.04086977537945!3d28.59081087568755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b52f4553e01%3A0x721ecdfa948756e8!2sLawfinity%20India%20Pvt%20Ltd%20(Business%20Compliance%20Group)!5e0!3m2!1sen!2sin!4v1748757590171!5m2!1sen!2sin"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
        ></iframe>
      </div>
    </section>
  );
}
