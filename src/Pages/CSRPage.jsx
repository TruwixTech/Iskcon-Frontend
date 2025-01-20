import React from "react";
import Navbar from "../Components/Navbar";
import csr from "../assets/csr.png";
import circlebg from "../assets/circlebg.png";
import scroll from "../assets/scroll.png";
import rectcsr from "../assets/rectcsr.png";
import { useEffect, useState } from "react";
import Border1 from "../assets/section1border1.svg";
import Border2 from "../assets/section1border2.svg";
import c1 from "../assets/c1.png";
import c2 from "../assets/c2.png";
import c3 from "../assets/c3.png";
import c4 from "../assets/c4.png";
import leaf1 from "../assets/leaf1.png";
import leaf2 from "../assets/leaf2.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CSRPage = () => {
  const content = [
    {
      title: "Feeding the hungry",
      desc: "Daily meal distribution to those in need.",
      icon: c4,
    },
    {
      title: "Education for All",
      desc: "Providing resources and support for underprivileged children.",
      icon: c3,
    },
    {
      title: "HealthCare Services",
      desc: "Free medical checkups and treatments",
      icon: c2,
    },
    {
      title: "Environmental Sustainability",
      desc: "Tree plantations and eco-awareness programs.",
      icon: c1,
    },
  ];
  const [citizenship, setCitizenship] = useState("Indian Citizen");
  const [donationType, setDonationType] = useState("Monthly");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {/* first section */}
      <div className="bg-[#fde3b6] w-full h-[500px] lg:h-screen relative ">
        <div className="px-4 md:px-20 pt-10 relative z-50 ">
          <Navbar />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full opacity-15">
          <img src={circlebg} alt="" className="w-full" />
        </div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full sm:w-auto lg:h-[75%] ">
          <img src={csr} alt="csr" className="" />
        </div>
        <div className="absolute bottom-0 right-20 md:flex gap-10 hidden">
          <img src={rectcsr} alt="" className="" />
          <img src={scroll} alt="" />
        </div>
        <div className="absolute bottom-24 sm:bottom-20  md:pl-6 lg:pl-20 flex flex-col items-center sm:items-start gap-1 md:gap-4 w-full ">
          <h1 className="hidden sm:block text-3xl font-bold md:font-normal text-center md:text-start md:text-3xl lg:text-4xl xl:text-6xl text-[#3b2106] font-prata lg:leading-[70px]">
            Our <br /> CSR Initiatives
          </h1>
          <p className=" hidden sm:block text-sm w-1/2 md:w-1/3 text-[#444444] font-nunito">
            At [Temple Name], we are committed to uplifting our community
            through compassion and service. Our CSR initiatives focus on feeding
            the hungry, supporting education, and promoting environmental
            sustainability.
          </p>
          <button className="w-[250px] md:w-[180px] bg-[#EB852C] text-white py-2 rounded-full">
            Donate Now
          </button>
        </div>
        <div className="w-full absolute bottom-1 sm:hidden flex justify-center">
          <h1 className="text-3xl font-bold md:font-normal text-center md:text-start md:text-3xl lg:text-4xl xl:text-6xl text-[#3b2106] font-prata lg:leading-[70px]">
            Our <br /> CSR Initiatives
          </h1>
        </div>
      </div>

      {/* second section */}
      <div className="w-full h-auto flex flex-col  px-4 md:px-10 lg:flex-row-reverse 2xl:h-[600px] ">
        <div className="w-full h-auto flex flex-col justify-center mt-10 md:mt-0 relative">
          <div className="absolute left-0">
            <img src={leaf1} alt="" />
          </div>
          <div className="absolute right-0">
            <img src={leaf2} alt="" />
          </div>
          <h1 className="font-prata mb-10 text-[#3B2106] flex justify-center text-3xl  md:text-3xl lg:text-end lg:text-4xl  2xl:text-6xl">
            Our Key CSR Initiatives
          </h1>
          <div className="w-full h-auto flex flex-wrap justify-center items-center gap-6 mb-10 overflow-hidden">
            {content.map((item, index) => (
              <div
                key={index}
                className="w-[300px] h-72 rounded-full flex justify-center items-center relative 2xl:h-80 2xl:w-[320px]"
              >
                <div className="w-[85%] h-[85%] border-[10px] rounded-full border-[#bf9d78] relative flex justify-center items-center">
                  <div className="w-full h-full flex flex-col justify-center items-center relative py-3 gap-3 2xl:py-8 z-50">
                    <div className="w-full h-auto flex flex-col justify-center items-center gap-2">
                      <img
                        src={item.icon}
                        alt="icons"
                        className="mx-auto w-auto h-auto"
                      />
                      <h1 className="text-center font-bold font-nunito text-xl 2xl:text-2xl">
                        {item.title}
                      </h1>
                      <h2 className="w-[80%] text-center text-sm text-gray-700">
                        {item.desc}
                      </h2>
                    </div>
                  </div>
                  <img
                    src={Border2}
                    alt="border 2"
                    className="w-full h-full absolute "
                  />
                </div>
                <img
                  src={Border1}
                  alt="border 1"
                  className="w-full h-full absolute"
                  style={{
                    transform: `rotate(${scrollY}deg)`, // Spins the image
                    transition: "transform 5s linear",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* third section */}
      <div className="bg-[#fde3b6] w-full h-full py-20 flex flex-col gap-10 items-center justify-center">
        <h1 className="text-3xl md:text-4xl text-center md:text-started font-prata">
          Giving you can trust
        </h1>
        <p className="text-sm md:text-lg text-center font-nunito">
          We conduct thorough and comprehensive checks on all nonprofits and
          their projects to ensure your donation fulfills its purpose—making a{" "}
          <br /> real difference and transforming lives. Learn more.
        </p>
        <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-6 md:gap-0 items-center md:justify-between ">
          <div className="flex flex-col items-center text-center gap-4">
            <h1 className="text-[#eb852c] font-bold text-4xl">700cr+</h1>
            <p className="text-base w-full md:w-[80%] text-gray-700">
              Raised for Non-profits
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <h1 className="text-[#eb852c] font-bold text-4xl">15M+</h1>
            <p className="text-base w-full md:w-[80%] text-gray-700">
              Lives Impacted
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <h1 className="text-[#eb852c] font-bold text-4xl">2M+</h1>
            <p className="text-base w-full md:w-[80%] text-gray-700">
              Donors have Contributed to the cause
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <h1 className="text-[#eb852c] font-bold text-4xl">150+</h1>
            <p className="text-base w-full md:w-[80%] text-gray-700">
              Trusted by Corporate and Brand
            </p>
          </div>
        </div>
      </div>

      {/* fourht section */}
      <div className="w-full h-screen bg-white py-20">
        <div className="w-full flex justify-center items-center">
          <h1 className="w-full text-center text-5xl font-semibold font-prata">
            Joining our mission is the most <br /> impactful way to give
          </h1>
        </div>
      </div>

      {/* fifth section */}
      <div className="bg-[#fde3b6] w-full relative ">
        <div className="absolute top-0 opacity-10 z-20 w-full">
          <img
            src={circlebg}
            alt=""
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <div className="p-3 md:p-8 rounded-md max-w-5xl mx-auto py-20 z-50 relative">
          <div className="w-full flex justify-center ietms-center text-5xl font-prata my-10">
            Online Donations
          </div>
          <h1 className="text-[#eb852c] font-prata text-2xl font-bold my-6">
            Your Details
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-nunito">
            <input
              type="text"
              placeholder="Enter First Name"
              className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
            />
            <input
              type="text"
              placeholder="Enter Last Name"
              className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
            />
            <input
              type="email"
              placeholder="Enter Email"
              className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
            />
            <PhoneInput
              country={"us"}
              value={phoneNumber}
              onChange={setPhoneNumber}
              containerClass=""
              inputClass="border !h-12 !w-full  rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 w-full"
              buttonClass="!h-11 !my-auto !bg-white !border-none"
            />
            <input
              type="text"
              placeholder="Country"
              className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
            />
          </div>

          <div className="mt-6">
            <h2 className="text-gray-700 mb-2">Select your citizenship</h2>
            <div className="flex items-center gap-4">
              {[
                "Indian Citizen",
                "Foreign National",
                "NRI (Non Residential Indian)",
              ].map((option) => (
                <label key={option} className="flex items-center text-sm gap-2">
                  <input
                    type="radio"
                    value={option}
                    checked={citizenship === option}
                    onChange={() => setCitizenship(option)}
                    className="form-radio text-[#eb852c]  focus:ring-orange-300"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-gray-700 mb-2">Donation Type</h2>
            <div className="flex items-center gap-4">
              {["Monthly", "One Time"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={type}
                    checked={donationType === type}
                    onChange={() => setDonationType(type)}
                    className="form-radio text-[#eb852c] focus:ring-orange-300"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-gray-700 mb-2">Choose Donation Amount</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[300, 1000, 1500, 4500].map((amount) => (
                <button
                  key={amount}
                  className={`py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 ${
                    selectedAmount === amount
                      ? "bg-orange-400 text-white border border-black"
                      : "bg-orange-300 text-white hover:bg-orange-400"
                  }`}
                  onClick={() => setSelectedAmount(amount)}
                >
                  {amount}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={selectedAmount || ""}
              onChange={(e) => setSelectedAmount(Number(e.target.value) || 0)}
              placeholder="Enter Amount"
              className="mt-4 p-3 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
            />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Enter Pincode"
              className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
            />
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
            >
              <option value="">Select State</option>
              {states.map((stateOption) => (
                <option key={stateOption} value={stateOption}>
                  {stateOption}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Enter City/ District"
              className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
            />
          </div>

          <textarea
            placeholder="Complete Address"
            className="mt-4 p-3 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
          ></textarea>
          <textarea
            placeholder="Additional Information"
            className="mt-4 p-3 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
          ></textarea>

          <div className="mt-6 flex flex-col gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox text-[#eb852c] focus:ring-orange-300"
              />
              Send me updates and notifications via Msg/WhatsApp
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox text-[#eb852c] focus:ring-orange-300"
              />
              Do you want 80G receipt to claim Tax
            </label>
            <p className="text-gray-500 text-sm">
              (80G receipt will be sent to you over email in next 7-12 working
              days)
            </p>
          </div>
          <div className="w-full flex justify-center mt-6">
            <button className="mt-6 bg-[#eb852c] hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full w-[300px]">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CSRPage;
