import React, { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import formbg from "../assets/formbg.png";
import BgOne from "../assets/bg2.png";
import { CartContext } from "../Context/CartContext";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const statesList = [
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

const Checkout = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

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
      console.log("✅ User Data:", data);
    } catch (error) {
      console.error("❌ Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const { getCartTotal, cartItems } = useContext(CartContext);

  const totalAmount = getCartTotal();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    try {
      const payload = {
        userId: user.userData.userId,
        amount: totalAmount,
        shippingAddress:
          formData.address +
          ", " +
          formData.city +
          ", " +
          formData.state +
          ", " +
          formData.pincode,
        orderStatus: "PENDING",
        orderItems: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        contact: formData.mobile,
        transactionId: "T" + Date.now(),
        paymentDetails: {
          paymentStatus: "PENDING", // Default payment status
          paymentId: "T" + Date.now(), // Assign transactionId as paymentId
        },
      };

      console.log("payload", payload);

      // Send payment request to backend
      const response = await axios.post(`${backend}/admin/order/add`, payload);

      if (
        response.data &&
        response.data.data &&
        response.data.data.instrumentResponse
      ) {
        const redirectInfo = response.data.data.instrumentResponse.redirectInfo;

        if (redirectInfo && redirectInfo.url) {
          // Redirect the user to the payment gateway URL
          window.location.href = redirectInfo.url;
        } else {
          console.log("Redirect URL not found in the response");
          // Optionally, notify the user that payment initiation failed.
        }
      } else {
        console.log("Invalid response structure from payment gateway");
        // Optionally, notify the user of an error with payment initiation.
      }
      console.log(response.data);
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-transparent w-full h-full"
      style={{
        backgroundImage: `url(${BgOne})`,
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div className="px-4 md:px-20 pt-10 z-10 relative">
        <Navbar />
      </div>

      <div>
        <div className="w-full min-h-screen flex items-center justify-center p-10 font-nunito">
          <div className="bg-trasnparent w-full p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <h2 className="text-xl font-bold text-orange-600 mb-6">
                  Your Details
                </h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter First Name"
                      className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Last Name"
                      className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Email</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter Email"
                      className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">
                      Mobile Number
                    </label>
                    <input
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      type="tel"
                      placeholder="9876543210"
                      className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex flex-col col-span-2">
                    <label className="text-gray-700 font-medium">
                      Complete Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter Address"
                      className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">
                      City/District
                    </label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter City/ District"
                      className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">State</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="">Select State</option>
                      {statesList.map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Pincode</label>
                    <input
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Pincode"
                      className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </form>
              </div>
              <div>
                <div className="bg-white border border-[#eb852c] rounded-xl p-6 shadow">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">
                    Order Summary
                  </h2>
                  <div className="flex justify-between text-gray-700 mb-2">
                    <span>Total MRP</span>
                    <span>₹{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 mb-2">
                    <span>MRP Discount</span>
                    <span>₹0</span>
                  </div>
                  <div className="flex justify-between text-gray-700 mb-2">
                    <span>Payment Gateway Fee</span>
                    <span>₹0</span>
                  </div>
                  <div className="border-t my-4"></div>
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total Amount</span>
                    <span>₹{getCartTotal()}</span>
                  </div>
                </div>
                <button
                  className="w-full bg-orange-500 text-white font-bold py-3 rounded-full mt-6 hover:bg-orange-600"
                  onClick={handleSubmit}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
