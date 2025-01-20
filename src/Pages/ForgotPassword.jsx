import React from 'react'
import Slider from '../utils/Slider'
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

function ForgotPassword() {
    return (
        <div className='w-full h-auto flex flex-col mt-10 gap-8 md:flex-row-reverse md:mt-0'>
            <div className='w-full h-[70vh] flex justify-center items-center px-5 lg:px-10 xl:px-20 md:h-auto sm:w-[70%] sm:mx-auto md:mx-0 md:w-[50%] lg:my-10'>
                <div className='w-[90%] h-auto flex flex-col gap-2 lg:w-[80%]'>
                    <Link to='/signin' className='w-full h-auto mb-5'>
                        <FaArrowLeft size={25} className='text-black cursor-pointer' />
                    </Link>
                    <h2 className="text-xl font-semibold">Forgot Password</h2>
                    <p className="text-gray-600 mt-2">
                    Please enter your email or phone number to reset your password
                    </p>

                    <input type="text" placeholder='Enter Your Email Id' className='w-full h-auto px-3 py-2 rounded-3xl border my-4' />

                    {/* Submit Button */}
                    <button
                        className="w-full py-3 bg-orange-500 text-white font-semibold rounded-3xl hover:bg-orange-600 transition"
                    >
                        Submit
                    </button>

                </div>
            </div>
            <Slider />
        </div>
    )
}

export default ForgotPassword