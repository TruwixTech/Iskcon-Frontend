import React from 'react'
import BgOne from '../../assets/bg1.png'
import CalendorIcon from '../../assets/calenderIcon.png'
import COmmentIcon from '../../assets/commentIcon.png'

function Section3() {
    return (
        <div className='w-full h-screen flex flex-col bg-[#FDE3B6] px-5 md:px-10 lg:flex-row-reverse 2xl:h-screen' style={
            {
                backgroundImage: `url(${BgOne})`,
                backgroundPosition: 'bottom',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }
        }>
            <div className='w-full h-auto flex flex-col my-10 gap-8'>
                <div className='w-full h-auto flex flex-col gap-2 lg:gap-3'>
                    <h1 className='font-nunito text-center sm:text-base lg:text-lg'>The Wisdom Blog</h1>
                    <h1 className='font-prata text-center text-[#322038] sm:text-2xl lg:text-3xl'>
                        Find valuable information and <br />
                        inspiration in our stories
                    </h1>
                </div>
                <div className='w-full h-auto flex flex-col'>
                    <div className='w-full h-auto flex flex-col gap-4'>
                        <h1 className='font-nunito '>Spiritual</h1>
                        <h1 className='font-prata text-3xl'>
                            Kartik Purnima: <br />
                            A Festival of Light <br />
                            and Devotion
                        </h1>
                        <div className='w-full h-auto flex items-center gap-5 '>
                            <img src="" alt="" className='w-10 h-10 rounded-full bg-gray-300' />
                            <h1 className='font-nunito text-[#322038] font-bold'>Neha Yadav</h1>
                        </div>
                        <div className='w-full h-auto flex flex-col mt-4 gap-5'>
                            <div className='w-full h-auto flex gap-3 items-center'>
                                <img src={COmmentIcon} alt="Comment Icon" />
                                <span className='font-nunito text-[#322038] font-medium'>30 Comments</span>
                            </div>
                            <div className='w-full h-auto flex gap-3 items-center'>
                                <img src={CalendorIcon} alt="Comment Icon" />
                                <span className='font-nunito text-[#322038] font-medium'>15th December 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section3