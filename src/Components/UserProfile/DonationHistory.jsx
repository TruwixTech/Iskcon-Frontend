import React, { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";
import Navbar from "../Navbar";

const backend = import.meta.env.VITE_BACKEND_URL;

const DonationHistory = () => {
  const [userId, setUserId] = useState(""); // State to store user ID
  const [donations, setDonations] = useState([]); // State to store all donations
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const [user, setUser] = useState({});

  const fetchUserData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const response = await fetch(`${backend}/secure/decode`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }

      const data = await response.json();
      setUser(data);
      setUserId(data?.userData?.userId);

      // console.log("✅ User Data:", data);
    } catch (error) {
      console.error("❌ Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Fetch Donations by User ID
  const fetchDonationsByUserId = async () => {
    if (!userId) {
      setError("Please enter a valid user ID.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Fetch normal donations
      let normalDonations = [];
      try {
        const normalResponse = await axios.get(
          `${backend}/admin/donationOrder/${userId}`
        );
        normalDonations = normalResponse.data.data || []; // Ensure it's an array
      } catch (normalError) {
        console.error("Error fetching normal donations:", normalError);
        // Do not throw error or set message if normal donations are missing
      }

      // Fetch CSR donations
      let csrDonations = [];
      try {
        const csrResponse = await axios.get(
          `${backend}/admin/csdonation/orders/${user?.userData?.email}`
        );
        csrDonations = csrResponse.data.response || []; // Ensure it's an array
      } catch (csrError) {
        console.error("Error fetching CSR donations:", csrError);
        // Do not throw error or set message if CSR donations are missing
      }

      // Combine all donations
      const allDonations = [...normalDonations, ...csrDonations];

      if (allDonations.length === 0) {
        setError("No donations found for this user.");
        setDonations([]);
      } else {
        setDonations(allDonations);
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
      setError("Failed to fetch donations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchDonationsByUserId();
    }
  }, [userId]);

  return (
    <div className="relative w-full h-full bg-[#f3f4f6]">
      {/* Search Bar */}
      <div className="w-full h-[70px] z-[100] absolute top-4 px-4 md:px-20">
            <Navbar />
          </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Donations Table */}
      <div className="w-full  h-[550px] flex flex-col gap-3 overflow-y-auto px-5 py-5 bg-[#fff4dc] rounded-3xl shadow-lg">
        <div className="w-full px-4 md:px-20 rounded-lg pt-40 p-4">
          <h2 className="text-2xl font-bold mb-6 text-amber-900 font-serif">
            Donations by {user?.userData?.name}
          </h2>

          {donations.length > 0 ? (
            <table className="w-full border-collapse overflow-y-scroll">
              <thead>
                <tr className="bg-amber-200">
                  <th className="p-3 text-left text-amber-900 font-semibold">
                    Order ID
                  </th>
                  <th className="p-3 text-left text-amber-900 font-semibold">
                    Amount
                  </th>
                  <th className="p-3 text-left text-amber-900 font-semibold">
                    Payment
                  </th>
                  <th className="p-3 text-left text-amber-900 font-semibold">
                    Status
                  </th>
                  <th className="p-3 text-left text-amber-900 font-semibold">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {donations.map((order) => (
                  <tr
                    key={order._id || order.guestDonationId}
                    className="hover:bg-amber-100 transition-colors border-b border-amber-100 cursor-pointer"
                  >
                    <td className="p-3 text-amber-900 font-medium">
                      {order._id || order.guestDonationId}
                    </td>
                    <td className="p-3 text-amber-900">₹{order.amount}</td>
                    <td className="p-3 text-amber-800">
                      <span
                        className={`px-6 py-1 rounded-full ${
                          order.paymentStatus === "PAID"
                            ? "bg-green-100 text-green-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {order.paymentStatus || "PENDING"}
                      </span>
                    </td>
                    <td className="p-3 text-amber-800">
                      {order.donationOrderStatus || "Completed"}
                    </td>
                    <td className="p-3 text-amber-600 font-mono">
                      {order.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No donations found for this user.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;
