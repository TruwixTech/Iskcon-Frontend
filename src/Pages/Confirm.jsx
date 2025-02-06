import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { CartContext } from "../Context/CartContext";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;
function Confirm() {
  const { cartItems } = useContext(CartContext);
  const { id: merchantTransactionId } = useParams();  
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("id",merchantTransactionId)
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
        console.log("✅ User Data:", data);
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
          `${import.meta.env.VITE_BACKEND_URL}/admin/order/status?id=${merchantTransactionId}`
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

  return (
    <div className="bg-[#fde3b6] w-full h-auto">
      <div className="px-20 pt-10 relative z-50">
        <Navbar />
      </div>

      <div className="w-[90%] mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 mb-5">
        <div className="flex">
          {/* Left Side: Order Confirmation */}
          <div className="w-[50%] flex flex-col gap-7">
            <h1 className="text-5xl font-bold text-black px-5">
              Thank you for your <br /> purchase!
            </h1>
            <p className="px-5">
              Your order is processing. It is currently being verified and prepared for shipment.
            </p>

            <span className="text-xl font-bold text-black px-5 mt-4">
              Payment Status:
            </span>
            <div className="px-5">
              {loading ? (
                <p className="text-gray-700">Checking payment status...</p>
              ) : paymentStatus === "PAID" ? (
                <p className="text-green-600 font-semibold">Payment Successful ✅</p>
              ) : paymentStatus === "FAILED" ? (
                <p className="text-red-600 font-semibold">Payment Failed ❌</p>
              ) : (
                <p className="text-gray-700">Unable to retrieve payment status</p>
              )}
            </div>

            <span className="text-xl font-bold text-black px-5 mt-4">Billing address</span>
            <div className="flex mb-5">
              <div className="w-1/3 flex flex-col font-bold text-black px-5">
                <span> First Name :</span>
                <span> Address :</span>
                <span> Phone :</span>
                <span> Email :</span>
              </div>
              <div className="w-2/3 flex flex-col text-black px-5">
                <span>{user?.userData?.name}</span>
                <span> Vill + Post Bijoli, Meerut</span>
                <span>{user?.userData?.phone}</span>
                <span>{user?.userData?.email}</span>
              </div>
            </div>

            <div className="flex mb-4 px-5">
              <button className="w-[20%] bg-[#eb852c] text-white font-semibold py-3 rounded-full">
                Track Order
              </button>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-[50%] flex flex-col items-center gap-7">
            <div className="w-[80%] h-auto bg-slate-200 shadow-xl rounded-lg px-5">
              <h1 className="text-black text-[23px] px-5 py-5 font-bold">Order Summary</h1>
              <hr className="bg-gray-400 h-[1px] border-0" />

              <div className="grid grid-cols-2 gap-2 md:grid-cols-3 mt-2 place-content-center pb-3">
                <div className="w-auto h-auto flex flex-col gap-1">
                  <label className="font-semibold text-gray-700 py-1">Date</label>
                  <span>02 May 2023</span>
                </div>

                <div className="w-auto h-auto flex flex-col items-center border-l border-r border-gray-600 mt-2 gap-1">
                  <label className="font-semibold text-gray-700 py-1">Order Number</label>
                  <span>1234567890</span>
                </div>

                <div className="w-auto h-auto flex flex-col mt-2 gap-1">
                  <label className="font-semibold text-gray-700 py-1">Payment Method</label>
                  <span>PhonePe</span>
                </div>
              </div>

              <hr className="bg-gray-400 h-[1px] border-dotted" />

              <div className="flex gap-1">
                <div className="w-full flex flex-col h-auto gap-1 my-2">
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex items-center border-b gap-2 sm:gap-3">
                        <img src={item.image} alt={item.name} className="w-12 rounded-lg sm:w-32 xl:w-12" />
                        <div className="flex flex-col gap-1 justify-between h-full sm:py-2">
                          <h3 className="text-[15px] font-semibold sm:text-base xl:text-[15px]">
                            {item.name}
                          </h3>
                          <p className="text-xs sm:text-sm xl:text-base">
                            &#x20B9; {item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-lg font-semibold h-80 flex justify-center items-center">
                      Cart is Empty
                    </p>
                  )}
                </div>
              </div>

              <hr className="bg-gray-400 h-[1px] border-0" />

              <div className="flex mb-3 mt-3 justify-between">
                <div className="w-1/3 flex flex-col text-black px-5">
                  <span> Subtotal:</span>
                  <span> Shipping:</span>
                  <span> Tax:</span>
                </div>
                <div className="w-2/3 flex flex-col items-end text-black px-5">
                  <span>₹ 2110</span>
                  <span>₹ 2.00</span>
                  <span>₹ 1.00</span>
                </div>
              </div>

              <hr className="bg-gray-400 h-[1px] border-0" />

              <div className="mt-2 flex justify-between mb-3 px-5">
                <h1>Order Total:</h1>
                <span className="text-black font-bold">₹ 2250</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
