import React, { useEffect, useState } from "react";
import axios from "axios";
import BgOne from "../../assets/bg2.webp";
import Navbar from "../Navbar";

const backend = import.meta.env.VITE_BACKEND_URL;

function DonationHistory() {
  const [donation, setDonation] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchDonations() {
    try {
      const response = await axios.get(`${backend}/admin/donationOrder/get`);
      // console.log("API Response:", response.data); // Check the structure
      setDonation(response.data || []); // Ensure it's an array
    } catch (error) {
      console.log("Error while fetching donations", error);
      setDonation([]); // Prevent errors if request fails
    }
  }

  useEffect(() => {
    fetchDonations();
  }, []);

  function bufferToUUID(buffer) {
    return [...buffer.data]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
  }

  const openModal = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  return (
    <div
      className="w-full h-auto flex flex-col bg-[#fde3b6]"
      style={{
        backgroundImage: `url(${BgOne})`,
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div className="px-4 md:px-20 pt-4 pb-10 z-10 relative">
        <Navbar />
      </div>
      <div className="w-full h-auto flex flex-col mt-10 px-5 md:px-10 lg:px-20">
        <div className="w-full h-auto flex justify-between items-center">
          <h1 className="font-prata text-lg font-semibold sm:text-xl md:text-2xl xl:text-3xl">
            Donation History
          </h1>
        </div>
        <div className="container mx-auto p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-black rounded-lg shadow-md">
              <thead>
                <tr className="text-center text-gray-600 uppercase text-xs">
                  <th className="py-3 px-6">Donation</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Transaction ID</th>
                  <th className="py-3 px-6">Amount</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(donation) && donation.length > 0 ? (
                  donation.map((donationItem, index) => (
                    <tr
                      key={index}
                      className="border-t border-black text-center"
                    >
                      <td className="py-3 px-6">
                        {donationItem.donationId || "N/A"}
                      </td>
                      <td className="py-3 px-6">
                        {donationItem.createdAt || "N/A"}
                      </td>

                      <td className="py-3 px-6">
                        {donationItem.transactionId || "N/A"}
                      </td>
                      <td className="py-3 px-6">
                        {donationItem.amount
                          ? `₹ ${(donationItem.amount / 100).toFixed(2)}`
                          : "N/A"}
                      </td>
                      <td className="py-3 px-6">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            donationItem.paymentDetails.paymentStatus === "PAID"
                              ? "bg-green-200 text-green-700 px-4"
                              : "bg-yellow-200 text-yellow-700 px-4"
                          }`}
                        >
                          {donationItem.paymentDetails.paymentStatus ||
                            "PENDING"}
                        </span>
                      </td>
                      <td className="py-3 px-6">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={() => openModal(donationItem)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No donations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && selectedDonation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-6xl">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p><strong>Donor Name : </strong>{selectedDonation.user.name}</p>
            <p><strong>Donor email :</strong> {selectedDonation.user.email}</p>
            <p>
              <strong>Transaction ID:</strong> {selectedDonation.transactionId}
            </p>
            <p>
              <strong>Amount:</strong> ₹{" "}
              {(selectedDonation.amount / 100).toFixed(2)}
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              {selectedDonation.paymentDetails?.paymentStatus}
            </p>
            <p>
              <strong>Shipping Address:</strong>{" "}
              {selectedDonation.shippingAddress}
            </p>
            <p>
              <strong>Contact:</strong> {selectedDonation.contact}
            </p>
            <p>
              <strong>Order Status:</strong>{" "}
              {selectedDonation.donationOrderStatus}
            </p>

            <h3 className="text-lg font-semibold mt-4">Donated Items</h3>
            <ul className="list-disc pl-5">
              {selectedDonation.donationItems.map((item, index) => (
                <li key={index}>
                  <strong>{item.title}</strong> - ₹ {item.amount} (Qty:{" "}
                  {item.quantity})
                </li>
              ))}
            </ul>
            

            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DonationHistory;
