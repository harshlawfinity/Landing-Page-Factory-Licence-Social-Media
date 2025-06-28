"use client";
import React from "react";

const workerHeaders = [
  "Up - 20",
  "21 - 40",
  "41 - 150",
  "151 - 250",
  "251 - 500",
  "501 - 1000",
  "1001 - 2000",
  "2001 - 3000",
  "Above 3000",
];

const feeData = [
  { hp: "Without HP", values: [1500, 3000, 4500, 6000, 7500, 9000, 10500, 12000, 13500] },
  { hp: "Up to 10", values: [3000, 6000, 9000, 12000, 15000, 18000, 21000, 24000, 27000] },
  { hp: "Above 10 Up to 50", values: [4500, 9000, 13500, 18000, 22500, 27000, 31500, 36000, 40500] },
  { hp: "Above 50 Up to 100", values: [6000, 12000, 18000, 24000, 30000, 36000, 42000, 48000, 54000] },
  { hp: "Above 100 Up to 500", values: [7500, 15000, 22500, 30000, 37500, 45000, 52500, 60000, 67500] },
  { hp: "Above 500 Up to 1000", values: [9000, 18000, 27000, 36000, 45000, 54000, 63000, 72000, 81000] },
  { hp: "Above 1000 Up to 2000", values: [10500, 21000, 31500, 42000, 52500, 63000, 73500, 84000, 94500] },
  { hp: "Above 2000", values: [12000, 24000, 36000, 48000, 60000, 72000, 84000, 96000, 108000] },
];

export default function FactoryFeeStructureSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Haryana Factory Licence Fee Structure
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            The government fee depends on the number of workers and connected horsepower (HP) installed. Refer to the table below for detailed fee slabs applicable in Haryana.
          </p>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto   border-gray-300 rounded-lg shadow-sm">
          <table className="min-w-[1000px] border-collapse w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-medium text-center">
              <tr>
                <th className="  px-4 py-2 bg-purple-500 text-white">H.P. Installed</th>
                {workerHeaders.map((header, idx) => (
                  <th key={idx} className="border-t px-4 py-2 bg-purple-500 text-white">{header} Employee</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {feeData.map((row, rowIndex) => (
                <tr key={rowIndex} className="even:bg--500 bg-zinc-100 text-zinc-700 text-center">
                  <td className="border-t px-4 py-2 font-semibold">{row.hp}</td>
                  {row.values.map((val, colIndex) => (
                    <td key={colIndex} className="border-t px-4 py-2">₹{val.toLocaleString()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <p className="mt-6 text-sm text-gray-600 text-center">
          <strong>Note:</strong> This fee is indicative and subject to change as per state notifications. It excludes consultancy or professional charges.
        </p>
      </div>
    </section>
  );
}
