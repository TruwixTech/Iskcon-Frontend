import React from "react";
import scan from "../assets/scan.webp";

const PaymentDetailsCard = () => {
  return (
    <div className="bg-gradient-to-r from-[#9c693d] to-[#7b4c2f] text-white rounded-2xl p-8 shadow-2xl flex flex-col md:flex-row gap-10 md:gap-0 justify-between items-center w-full transform transition-all duration-500 hover:scale-105">
      {/* Left Section: Payment Details */}
      <div className="space-y-6">
        <h2 className="text-4xl font-bold animate-pulse">Payment Details For Seva :::</h2>
        <div className="space-y-3">
          <p className="text-lg">
            <span className="font-semibold">Account Name</span> : ISKCON
          </p>
          <p className="text-lg">
            <span className="font-semibold">Account Number</span> :{" "}
            <span className="font-bold">50100411384861</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">IFSC Code</span> :{" "}
            <span className="font-bold">HDFC0000153</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">UPI ID</span> :{" "}
            iskcontempleghzb.62341144@hdfcbank
          </p>
        </div>
      </div>

      {/* Right Section: QR Code */}
      <div className="flex flex-col items-center transform transition-all duration-500 hover:scale-110">
        <img
          src={scan}
          alt="Scan To Donate"
          className="w-[250px] h-[250px] rounded-lg shadow-lg border-4 border-white"
        />
        <p className="text-lg font-semibold mt-3 animate-bounce">Scan To Donate</p>
      </div>
    </div>
  );
};

export default PaymentDetailsCard;