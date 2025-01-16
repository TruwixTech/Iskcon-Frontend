import React from 'react'
import Navbar from './Navbar'
import formbg from '../assets/formbg.png'
const DonationForm = () => {
  return (
    <div className='bg-white w-full h-full'>
      <div className="px-4 md:px-20 pt-10 z-10 relative">
        <Navbar />
      </div>
      <div className='w-full px-4 md:px-20 h-[300px] roudned-3xl my-10 relative'>
        <img src={formbg} alt="" className='w-full h-full object-cover rounded-3xl'/>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
        <h1 className='w-full text-2xl text-center md:text-6xl text-white font-semibold font-prata'>Donated Us Before ?</h1>
        <button className='bg-[#eb852c] text-white px-4 py-2 rounded-full w-[150px] mt-4 flex justify-center items-center'>Sign In</button>
        </div>
      </div>
      <div>
      <div className="w-full min-h-screen flex items-center justify-center p-10 font-prata">
      <div className="bg-white w-full  p-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Section - Form */}
          <div className="col-span-2">
            <h2 className="text-xl font-bold text-orange-600 mb-6">Your Details</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Mobile Number</label>
                <div className="flex mt-2">
                  <select
                    className="p-3 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="US">US +1</option>
                    <option value="IN">IN +91</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="987654321"
                    className="flex-1 p-3 border-t border-b border-r rounded-r-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <small className="text-gray-500 mt-2">
                  Kindly enter your number without the leading '0'.
                </small>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Country</label>
                <input
                  type="text"
                  value="India"
                  disabled
                  className="mt-2 p-3 border rounded-xl bg-gray-100 text-gray-600 focus:outline-none focus:ring focus:ring-orange-500"
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label className="text-gray-700 font-medium">Complete Address</label>
                <textarea
                  placeholder="Enter Address"
                  className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Pincode</label>
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">State</label>
                <select
                  className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <option value="">Select State</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="DL">Delhi</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">City/District</label>
                <input
                  type="text"
                  placeholder="Enter City/ District"
                  className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label className="text-gray-700 font-medium">Additional Information</label>
                <textarea
                  placeholder="Enter Additional Info"
                  className="mt-2 p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div className="col-span-2 flex items-center space-x-3">
                <input type="checkbox" id="updates" />
                <label htmlFor="updates" className="text-gray-700">
                  Send me updates and notifications via Msg/Whatsapp
                </label>
              </div>
              <div className="col-span-2 flex items-center space-x-3">
                <input type="checkbox" id="receipt" />
                <label htmlFor="receipt" className="text-gray-700">
                  Do you want 80G receipt to claim tax
                </label>
              </div>
            </form>
          </div>
          {/* Right Section - Summary */}
          <div>
            <div className="bg-white border border-[#eb852c] rounded-xl p-6 shadow">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Total MRP</span>
                <span>₹6990</span>
              </div>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>MRP Discount</span>
                <span>₹6990</span>
              </div>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Payment Gateway Fee</span>
                <span>₹275</span>
              </div>
              <div className="border-t my-4"></div>
              <div className="flex justify-between font-bold text-gray-900">
                <span>Total Amount</span>
                <span>₹6990</span>
              </div>
             
            </div>
            <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-full mt-6 hover:bg-orange-600">
                Pay Now
              </button>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  )
}

export default DonationForm
