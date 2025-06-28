 
// Lazy load icons
import { FiFileText, FiShield, FiUsers } from "react-icons/fi";
import { FaFireExtinguisher } from "react-icons/fa";
import { TbBuildingFactory } from "react-icons/tb";
import { MdAutorenew } from "react-icons/md";


const FactoryLicenseGrid = () => {
  const services = [
    {
      title: "Factory Licence Application",
      desc: "End-to-end support for obtaining your factory licence under the Factories Act.",
      icon: <FiFileText className="text-purple-600 text-2xl" />,
    },
    {
      title: "Labour Law Compliance",
      desc: "Ensure your   industrial space adheres to labour regulations and safety mandates.",
      icon: <FiShield className="text-purple-600 text-2xl" />,
    },
    {
      title: "Fire & Safety Approvals",
      desc: "We help secure fire and safety NOCs needed for licence issuance and renewals.",
      icon: <FaFireExtinguisher className="text-purple-600 text-2xl" />,
    },
    {
      title: "Pollution NOC",
      desc: "Obtain Trade, Pollution and Construction clearances for your factory setup.",
      icon: <TbBuildingFactory className="text-purple-600 text-2xl" />,
    },
    {
      title: "Liaison with Government",
      desc: "Our team coordinates with local departments to speed up inspection and approval process.",
      icon: <FiUsers className="text-purple-600 text-2xl" />,
    },
    {
      title: "Renewals & Audit Support",
      desc:  "Feel at ease regarding timely renewals and documentation audits for ongoing compliance.",
       icon: <MdAutorenew className="text-purple-600 text-2xl" />,
    },
  ];

  return (
    <div className="py-16 px-4 bg-white" aria-label="Factory Licence Services Grid Section">
    

      {/* Content */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="md:text-4xl text-3xl font-semibold text-gray-900 mb-10">
          Factory Licence & Compliance Services
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-left"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm text-justify">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default  FactoryLicenseGrid
