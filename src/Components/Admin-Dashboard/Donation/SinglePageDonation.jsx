import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const backend = import.meta.env.VITE_BACKEND_URL;

function SinglePageDonation() {
    const [singleDonation, setSingleDonation] = useState({});
    const [images, setImages] = useState([]);

    const { id } = useParams();

    async function fetchSingleDonation() {
        try {
            const response = await axios.get(`${backend}/admin/donation/get/${id}`);
            setSingleDonation(response.data.data);
            setImages(response.data.data.image)
        } catch (error) {
            console.log("Error while fetching single donation", error);
        }
    }

    const formatDateToReadable = (isoDate) => {
        if (!isoDate) return ''; // Handle empty or invalid input

        const date = new Date(isoDate);

        // Convert to IST (UTC+5:30)
        const offset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
        const istDate = new Date(date.getTime() + offset);

        // Extract date components
        const day = String(istDate.getUTCDate()).padStart(2, '0');
        const month = String(istDate.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = istDate.getUTCFullYear();
        const hours = String(istDate.getUTCHours()).padStart(2, '0');
        const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
        const seconds = String(istDate.getUTCSeconds()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        fetchSingleDonation();
    }, [])

    return (
        <div className='w-full h-auto flex flex-col px-5 my-10 md:my-20 md:px-10 xl:px-20'>
            <div className='w-full h-auto flex flex-col sm:flex-row sm:justify-center gap-6 bg-gray-100 rounded-xl p-5'>
                <div className='w-full h-auto'>
                    <img src={images[0]} alt="image" className='w-full h-48 rounded-lg bg-gray-200 sm:h-60 md:h-80 object-cover' />
                </div>
                <div className='w-full h-auto flex flex-col'>
                    <h1 className='my-4 lg:my-6 w-full h-auto text-3xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold'>{singleDonation.title}</h1>
                    <p style={{ whiteSpace: "pre-wrap" }} className='w-full h-auto text-sm text-gray-500 sm:text-base lg:text-lg'>
                        {singleDonation.description}
                    </p>
                </div>
            </div>
            <div className='w-full h-auto flex flex-col'>
                {
                    singleDonation?.donationsCategory?.map((donation, index) => (
                        <div key={index} className='w-full h-auto flex flex-col my-4 gap-2'>
                            <h1 className='my-4 lg:my-6 w-full h-auto text-3xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold'>{donation.title}</h1>
                            <div className='w-full h-auto flex flex-wrap gap-6'>
                                {
                                    donation?.donationTypes?.map((donationType, index) => (
                                        <div className='w-[350px] h-[150px] p-5 lg:p-7 border flex flex-col justify-between gap-4 rounded-xl shadow-md duration-500 ease-in-out hover:shadow-2xl' key={index}>
                                            <h1 className='text-lg font-bold'>{donationType.title}</h1>
                                            <div className='w-full h-auto flex justify-between items-center'>
                                                <span className='text-lg text-gray-700 font-semibold'>₹{donationType.amount}</span>
                                                <button className='px-6 py-2 text-white bg-[#866dcf] rounded-xl'>
                                                    Donate
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SinglePageDonation