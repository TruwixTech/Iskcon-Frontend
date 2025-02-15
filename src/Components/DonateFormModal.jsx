import { useState } from "react";

const DonateFormModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Hide modal if not open

  return (
    <div className="w-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl relative">
        <h2 className="text-xl font-semibold mb-4">Donate Now</h2>
        
        <form className="flex flex-col">
          <label className="mb-2 font-medium">Name:</label>
          <input type="text" className="border p-2 rounded mb-3" placeholder="Enter your name" required />

          <label className="mb-2 font-medium">Email:</label>
          <input type="email" className="border p-2 rounded mb-3" placeholder="Enter your email" required />

          <label className="mb-2 font-medium">Contact:</label>
          <input type="text" className="border p-2 rounded mb-3" placeholder="Enter your contact" required />

          <label className="mb-2 font-medium">Amount (₹):</label>
          <input type="number" className="border p-2 rounded mb-3" placeholder="Enter donation amount" required />

          <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-full mt-3">
            Donate Now
          </button>
        </form>

        <button onClick={onClose} className="text-gray-500 mt-3 font-bold absolute text-4xl top-2 right-8">X</button>
      </div>
    </div>
  );
};

export default DonateFormModal;
