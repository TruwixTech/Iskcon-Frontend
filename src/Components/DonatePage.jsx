import React, { useState } from 'react'
import BgOne from '../assets/bg2.webp'
import Navbar from './Navbar'
import Donate from '../assets/donateImage.webp'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const backend = import.meta.env.VITE_BACKEND_URL;

function DonatePage() {
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value < 0) {
            setAmount(0);
        } else {
            setAmount(value);
        }
    };

    const navigate = useNavigate()

    async function handlePayment() {
        setLoading(true);
        try {
            if(amount === 0) { 
                toast.error("Please enter a valid amount");
                return;
            }
            const response = await axios.post(`${backend}/admin/guestDonation/add`, { amount: amount });
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
                        amount: amount,
                    }
                    axios.post(`${backend}/admin/guestDonation/status`, option2)
                        .then((response) => {
                            if (response.status === 200) {
                                setLoading(true)
                                toast.success("Donation Placed successfully")
                                setAmount(0)
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
        <div className='w-full h-full flex flex-col bg-[#fde3b6]'
            style={{
                backgroundImage: `url(${BgOne})`,
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
            }}
        >
            <div className="px-4 md:px-20 pt-4 pb-10 z-10 relative">
                <Navbar />
            </div>
            <div className='w-full h-auto flex flex-col px-5 md:px-10 lg:px-20'>
                <h1 className='w-full h-auto text-center text-lg font-prata md:text-2xl xl:text-3xl'>
                    General Donation
                </h1>
                <div className='w-full h-auto flex justify-center items-center my-7'>
                    <img src={Donate} alt="Donate logo" className='w-60 md:w-80 xl:w-96' />
                </div>
                <h1 className='w-full h-auto text-center font-prata xl:text-lg'>
                    Try to donate a minimum of Rs. 500, this can be used to feed at least <br /> 10 Hungry (Needy) People.
                </h1>
                <div className='w-full h-auto flex flex-col justify-center items-center my-7 gap-3 md:gap-7'>
                    <h1 className='text-center font-semibold md:text-lg font-poppins'>Amount :</h1>
                    <input type="number" value={amount} onWheel={(e) => e.currentTarget.blur()} onChange={handleInputChange} min={0} className='w-full border bg-gray-100 rounded-3xl outline-none py-2 px-3 sm:w-[80%] md:w-[70%] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                    <span onClick={handlePayment} className='px-6 py-2 cursor-pointer text-white bg-[#eb852c] font-semibold rounded-3xl'>
                        DONATE
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DonatePage