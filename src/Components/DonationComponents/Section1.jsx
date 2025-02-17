import React from "react";
import Navbar from "../Navbar";
import bg from "../../assets/krishnabg.png";
import frame from "../../assets/frame.png";

const Section1 = () => {
  return (
    <div
      className="w-full h-screen flex relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar Section */}
      <div className="absolute top-0 left-0 w-full px-4 md:px-20 pt-4 z-50">
        <Navbar />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#FDE3B6]/80 to-[#FDE3B6]/20"
        style={{
          mixBlendMode: "multiply", // Blend the gradient with the background image
        }}
      ></div>

      {/* Left Half (Content Centered) */}
      <div className="md:w-1/3 w-full h-full flex flex-col justify-end pb-20 px-2 md:px-10 relative z-10">
        <div className="relative z-50">
          <h1 className="font-prata text-2xl text-white md:text-4xl md:text-black font-bold md:font-semibold mb-4">
            General Donation
          </h1>
          <p className="text-white md:text-[#444444] text-sm md:text-base mb-6 w-full">
            Donation is the most valuable human act; it is all about creating a
            sustainable environment in which every human being can persevere and
            flourish. All Donations are Tax Exempted here. Please After Donation
            contact us on Thank You Page!
          </p>
          <a href="/donation#donationcircle">
          <button className="bg-[#EB852C] text-white px-6 py-2 md:py-3 rounded-3xl">
            Donate Now
          </button>
          </a>
        </div>
      </div>

      {/* Right Half (Transparent to let `krishnabg.png` show) */}
      <div className="w-1/2 h-full"></div>
    </div>
  );
};

export default Section1;