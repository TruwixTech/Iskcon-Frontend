import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

const backend = import.meta.env.VITE_BACKEND_URL;

const TempleConstruction = () => {
  const [csrDonation, setCsrDonation] = useState([]);

  async function fetchCSRDonation() {
    try {
      const response = await axios.get(`${backend}/admin/csrdonation`);
      setCsrDonation(response.data);
    } catch (error) {
      console.log("Error while fetching CSRDonation", error);
    }
  }

  useEffect(() => {
    fetchCSRDonation();
  }, []);

  return (
    <>
      <div className="w-full h-full bg-[#fde3b6] pt-10 px-20">
        <Navbar />
        <div className="w-full h-full flex flex-col mt-10 px-4 md:px-10">
          {csrDonation.slice(2, 3).map((donation, index) => {
            // Calculate the percentage of amount raised
            const percentageRaised = Math.round(
              (donation.amountRaised / donation.totalAmount) * 100
            );

            return (
              <div key={index} className="w-full h-full flex flex-col">
                {/* Image */}
                <img
                  src={donation.image}
                  alt="Donation"
                  className="w-full h-[500px] object-cover rounded-xl"
                />

                {/* Title */}
                <h1 className="text-[16px] font-[400] font-nunito mt-2">
                  {donation.title}
                </h1>

                {/* Amount Raised */}
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-gray-900 font-bold flex items-center">
                    ₹{donation.amountRaised.toLocaleString()}
                    <span className="text-gray-600 text-sm pl-2">Raised</span>
                  </p>
                  <div className="flex justify-end mt-1 text-sm text-gray-600">
                    {percentageRaised}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full h-1.5 mt-2 bg-gray-200 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-1.5 bg-orange-500 rounded-full"
                    style={{
                      width: `${percentageRaised}%`,
                    }}
                  ></div>
                </div>

                {/* Loader Animation */}
                <div className="mt-6 flex justify-center">
                  <div className="relative w-40 h-40">
                    {/* Outer Circle */}
                    <div className="absolute w-full h-full rounded-full border-4 border-gray-200"></div>
                    {/* Inner Circle (Progress) */}
                    <div
                      className="absolute w-full h-full rounded-full border-4 border-orange-500"
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0%, ${
                          50 + 50 * Math.cos((2 * Math.PI * percentageRaised) / 100)
                        }% ${
                          50 + 50 * Math.sin((2 * Math.PI * percentageRaised) / 100)
                        }%)`,
                      }}
                    ></div>
                    {/* Percentage Text */}
                    <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-orange-500">
                      {percentageRaised}%
                    </div>
                  </div>
                </div>

                {/* Donate Button */}
                <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-full flex justify-center items-center">
                  Donate Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TempleConstruction;