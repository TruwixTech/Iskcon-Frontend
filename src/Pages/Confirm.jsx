import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { CartContext } from "../Context/CartContext";
import axios from "axios";
import { Link } from "react-router-dom";

const backend = import.meta.env.VITE_BACKEND_URL;
function Confirm() {
  const { cartItems } = useContext(CartContext);
  const { id: merchantTransactionId } = useParams();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
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
    } catch (error) {
      console.error("❌ Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        if (!merchantTransactionId) return;

        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/admin/order/status?id=${merchantTransactionId}`
        );

        if (response.data.success) {
          setPaymentStatus("PAID");
        } else {
          setPaymentStatus("FAILED");
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
        setPaymentStatus("ERROR");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [merchantTransactionId]);

  const fetchOrder = async () => {
    if (!merchantTransactionId.trim()) {
      setError("wrong transaction id");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/admin/order/${merchantTransactionId}`
      );
      setOrder(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);


  return (
    <div className="bg-[#fde3b6] w-full h-auto">
      <div className="px-20 pt-4 relative z-50">
        <Navbar />
      </div>

      <div className="w-[90%] mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10 mb-5 transform transition-all duration-300 hover:shadow-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Order Confirmation */}
          <div className="flex flex-col gap-6 relative p-6">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl -z-10"></div>

            <h1
              className="text-5xl font-bold bg-gradient-to-r from-[#eb852c] to-yellow-500
 bg-clip-text text-transparent animate-fade-in"
            >
              Thank you for your <br /> Order! 🎉
            </h1>

            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed animate-slide-up delay-100">
                Your order is being processed and will ship soon. We'll send you
                tracking details shortly.
              </p>

              <div className="animate-fade-in delay-200">
                <span className="text-xl font-semibold text-gray-800">
                  Payment Status:
                </span>
                <div className="mt-2">
                  {loading ? (
                    <div className="flex items-center text-gray-600">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
                      Checking payment status...
                    </div>
                  ) : paymentStatus === "PAID" ? (
                    <div className="flex items-center text-green-600">
                      <div className="animate-bounce mr-2">✅</div>
                      <span className="font-semibold">Payment Successful</span>
                    </div>
                  ) : paymentStatus === "FAILED" ? (
                    <div className="flex items-center text-red-600">
                      <div className="animate-shake mr-2">❌</div>
                      <span className="font-semibold">Payment Failed</span>
                    </div>
                  ) : (
                    <p className="text-gray-600">Payment status unavailable</p>
                  )}
                </div>
              </div>

              <div className="animate-slide-up delay-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Billing Details
                </h3>
                <div className="flex gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>First Name:</p>
                    <p>Address:</p>
                    <p>Phone:</p>
                    <p>Email:</p>
                  </div>
                  <div className="space-y-2 font-medium text-sm text-gray-800">
                    <p>{user?.userData?.name}</p>
                    <p>{order?.shippingAddress}</p>
                    <p>{order?.contact}</p>
                    <p>{user?.userData?.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-10">
              <button
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#eb852c] to-yellow-500
 text-white font-semibold rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-200 animate-fade-in delay-400"
              >
                Track Order →
              </button>
              <Link to="/"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#eb852c] to-yellow-500
 text-white font-semibold rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-200 animate-fade-in delay-400"
              >
                Go to Homepage →
              </Link>
              </div>
             
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="bg-gradient-to-b from-white to-gray-50 p-6 rounded-2xl border border-gray-100 shadow-lg animate-slide-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">{order?.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium flex items-center">
                    <span className="mr-2">📱</span> PhonePe
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Items</h3>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                  {order?.orderItems?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-3xl">
                        <img src={item.productId.images[0]} alt=""/>

                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>₹{order?.amount / 100}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax:</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between pt-4 font-bold text-lg text-gray-800">
                  <span>Total:</span>
                  <span>₹{order?.amount / 100}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
