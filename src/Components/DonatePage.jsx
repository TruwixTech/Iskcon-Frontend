import React from 'react'
import BgOne from '../assets/bg2.png'
import Navbar from './Navbar'
import Donate from '../assets/donateImage.jpeg'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function DonatePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
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
                    <input type="number" className='w-full border bg-gray-100 rounded-3xl outline-none py-2 px-3 sm:w-[80%] md:w-[70%]' />
                    <Link to='/donate-form' className='px-6 py-2 text-white bg-[#eb852c] font-semibold rounded-3xl'>
                            DONATE
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DonatePage