import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import BgOne from '../../assets/bg2.png'
import Navbar from '../Navbar'
import product from '../../assets/singleProductThali.png'
import { FaChevronLeft } from "react-icons/fa6"
import { FaChevronRight } from "react-icons/fa6"
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiTruckLine } from "react-icons/ri";
import { FaRegCalendar } from "react-icons/fa";

const backend = import.meta.env.VITE_BACKEND_URL;

function SingleProduct() {
    const [singleProduct, setSingleProduct] = useState({});
    const [images, setImages] = useState([]);
    const { id } = useParams()
    const sliderRef = useRef(null);

    async function fetchSingleProduct() {
        try {
            const response = await axios.get(`${backend}/admin/product/${id}`);
            setSingleProduct(response.data.data);
            setImages(response.data.data.image)
        } catch (error) {
            console.log("Error while fetching single product", error);
        }
    }

    function handleScroll() {
        const slider = sliderRef.current;
        slider.scrollLeft += slider.offsetWidth;
    }

    function handleScrollLeft() {
        const slider = sliderRef.current;
        slider.scrollLeft -= slider.offsetWidth;
    }

    useEffect(() => {
        fetchSingleProduct();
    }, [])

    return (
        <>
            <div
                className="w-full h-auto flex flex-col bg-[#fde5bc]"
                style={{
                    backgroundImage: `url(${BgOne})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top',
                }}
            >
                <div className="px-4 md:px-20 py-10 relative z-50">
                    <Navbar />
                </div>
                <div className='w-full h-auto flex flex-col px-5 md:px-10 xl:px-20 md:flex-row md:justify-between'>
                    <div className='w-full h-auto flex flex-col gap-2 md:w-[45%] md:px-5 lg:w-[450px] xl:w-[550px]'>
                        <div className='w-full h-auto flex flex-col gap-2 pb-8 md:gap-4'>
                            <div className='w-full h-full rounded-2xl overflow-hidden sm:w-[70%] sm:mx-auto md:w-full'>
                                <img src={product} alt="product Image" className='w-full h-full rounded-2xl object-cover' />
                            </div>
                            <div className='w-full h-auto flex justify-between items-center sm:w-[70%] sm:mx-auto md:w-full'>
                                <span><FaChevronLeft onClick={handleScrollLeft} size={20} className='text-black' /></span>
                                <div ref={sliderRef} className='w-full flex-1 scroll-smooth h-auto overflow-x-scroll flex gap-1 md:gap-3' style={{
                                    scrollbarWidth: 'none',
                                }}>
                                    {
                                        Array.from({ length: 8 }).map((item, index) => (
                                            <img src={product} alt="product image" className='w-24 h-20 object-cover rounded-xl md:h-24 xl:w-[107px] xl:h-[110px]' key={index} />
                                        ))
                                    }
                                </div>
                                <span><FaChevronRight onClick={handleScroll} size={20} className='text-black' /></span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-auto flex flex-col gap-1 md:gap-2 xl:gap-3 pb-8 md:w-[55%]'>
                        <h1 className='text-[#1E1E1E] font-poppins md:text-3xl xl:text-4xl'>Herbal Tea - Product of Mayapur</h1>
                        <h1 className='font-poppins flex gap-1 items-center md:text-lg xl:text-2xl'>
                            <span className='text-[#111111] font-semibold'>₹ 10000</span>
                            <span className='text-sm md:text-base xl:text-lg'>60% off</span>
                        </h1>
                        <p className='font-poppins text-[#00000080] line-through md:text-lg xl:text-2xl'>$ 5500.00</p>
                        <p className='font-poopins text-[#686363] text-sm md:text-base'>Sleek and timeless. Titanium glasses with an innovative bridge. A frame to suit every face, Morgan is a classic ‘panto’ shape.</p>
                        <div className='w-full h-auto flex flex-col gap-3 items-center mt-5 sm:flex-row'>
                            <button className='w-60 py-1.5 bg-[#EB852C] text-white font-poppins rounded-3xl font-semibold sm:w-80 xl:py-3'>ADD TO CART</button>
                            <button className='w-40 py-1.5 bg-[#FDFDFD] text-[#999999] border border-[#ECA242] font-poppins rounded-3xl flex justify-center items-center gap-2 xl:py-3 xl:w-48'>
                                <MdKeyboardArrowDown size={20} />
                                <span>Wishlist</span>
                            </button>
                        </div>
                        <div className='w-full h-auto flex flex-col gap-3 mt-4 xl:mt-8'>
                            <h1 className='text-[#1A1A1A] font-poppins font-semibold md:text-lg xl:text-xl'>Check for Delivery Details</h1>
                            <div className='w-full h-10 bg-white flex justify-between items-center rounded-xl px-3 md:w-[300px] xl:w-[400px]'>
                                <input type="text" placeholder='Enter Pincode' className="w-full rounded-l-xl h-full outline-none flex-1" />
                                <button className='text-sm font-poppins'>Check</button>
                            </div>
                            <div className='w-full h-auto flex gap-1 items-center mt-3 xl:gap-3'>
                                <RiTruckLine size={20} className='md:size-7' />
                                <p className='font-poppins text-xs md:text-sm'>Enter Pincode for Estimated Delivery Date</p>
                            </div>
                            <div className='w-full h-auto flex gap-1 items-center xl:gap-3'>
                                <FaRegCalendar size={20} className='md:size-6'/>
                                <p className='font-poppins text-xs md:text-sm'>Estimated Delivery Time: 12 Aug - 15 Aug</p>
                            </div>
                        </div>
                        <div className='w-full h-auto flex flex-col gap-3 mt-5 font-poppins'>
                            <h1 className='text-[#344054] font-medium text-lg xl:text-2xl'>Product Description</h1>
                            <p className='text-sm md:text-base xl:text-lg'>Lorem ipsum dolor sit amet consectetur. Sit blandit tristique pretium duis accumsan adipiscing elementum elementum. Leo viverra euismod lorem at pharetra odio faucibus. Mollis pharetra est imperdiet tortor sit. Sodales in odio convallis ut id elementum in. Elementum mauris ipsum integer mauris leo vel. Cras leo auctor nisl arcu posuere vel mauris lacus amet. Cursus odio et nunc gravida hendrerit eget nunc.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct