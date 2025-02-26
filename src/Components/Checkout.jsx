import React, { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import formbg from "../assets/formbg.webp";
import BgOne from "../assets/bg2.webp";
import { CartContext } from "../Context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));

        if (!token) {
          console.error("No token found in localStorage");
          toast.error("Please sign in to continue");
          navigate('/signin')
          return;
        }

        const response = await fetch(`${backend}/secure/decode`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const data = await response.json();
        setUser(data);

        // Pre-fill form fields if user data exists
        setFormData((prev) => ({
          ...prev,
          firstName: data?.userData?.name || "",
          lastName: data?.userData?.lastName || "",
          email: data?.userData?.email || "",
        }));
      } catch (error) {
        localStorage.removeItem("token")
        navigate('/signin')
        console.error("❌ Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const { getCartTotal, cartItems, clearCart } = useContext(CartContext);
  const totalAmount = getCartTotal();
  const [formData, setFormData] = useState({
    firstName: "",
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
  const validateForm = () => {
    const { firstName, email, mobile, address, city, state, pincode } = formData;

    // Check for empty fields
    if (!firstName || !email || !mobile || !address || !city || !state || !pincode) {
      toast.dismiss();
      toast.error("All fields are required!");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.dismiss();
      toast.error("Invalid email format!");
      return false;
    }

    // Mobile number validation (10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      toast.dismiss();
      toast.error("Mobile number must be 10 digits!");
      return false;
    }

    // Pincode validation (6 digits)
    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(pincode)) {
      toast.dismiss();
      toast.error("Pincode must be 6 digits!");
      return false;
    }
    return true;
  };

  async function handlePayment(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!validateForm()) {
        setLoading(false);
        return;
      }
      const response = await axios.post(`${backend}/admin/order/add`, { amount: 1 });
      const data = response.data.data

      const paymentObject = new window.Razorpay({
        key: "rzp_live_BMJ2CcMdY7bNr6",
        order_id: data.id,
        ...data,
        handler: function (response) {
          const option2 = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            userId: user?.userData?.userId,
            amount: totalAmount,
            shippingAddress:
              formData.address +
              ", " +
              formData.city +
              ", " +
              formData.state +
              ", " +
              formData.pincode,
            orderItems: cartItems.map((item) => ({
              productId: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
            contact: formData.mobile,
          }
          axios.post(`${backend}/admin/order/status`, option2)
            .then((response) => {
              if (response.status === 200) {
                setLoading(true)
                clearCart()
                toast.success("Order placed successfully")
                navigate('/')
              } else {
                console.log("error while placing order");
              }
            }).catch((error) => {
              console.log(error);
            })
        }
      })
      paymentObject.open()
    } catch (error) {
      console.log("error while order placement", error);
    }
  }

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
      <div className="px-4 md:px-20 pt-4 z-10 relative">
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
                    <label className="text-gray-700 font-medium">Name</label>
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
                      className="mt-2 p-3 border rounded-xl focus:outline-none resize-none h-32 focus:ring-1 focus:ring-orange-500"
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
                  onClick={handlePayment}
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
