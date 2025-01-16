import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const backend = import.meta.env.VITE_BACKEND_URL;

function AdminSingleEvent() {
  const [singleEvent, setSingleEvent] = useState({});
  const [images, setImages] = useState([])
  const { id } = useParams()
  async function fetchSingleEvent() {
    try {
      const response = await axios.get(`${backend}/admin/event/get/${id}`);
      setSingleEvent(response.data.data);
      setImages(response.data.data.image)
    } catch (error) {
      console.log("Error while fetching single event", error);
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
    fetchSingleEvent();
  }, [id])

  return (
    <div className='w-full h-auto flex flex-col my-10 px-5 md:px-10 lg:px-20'>
      <img src={images[0]} alt="image" className='w-full h-40 rounded-lg bg-gray-200 sm:h-60 md:h-80 lg:h-[400px] object-cover xl:h-[550px]' />
      <div className='w-full h-auto flex flex-col gap-1 md:justify-between md:flex-row mt-4'>
        <div className='w-full h-auto flex gap-2 md:w-auto'>
          <span className='font-semibold flex-shrink-0'>Location : </span>{singleEvent?.location}
        </div>
        <div className='w-full h-auto flex flex-col gap-1 md:w-auto lg:flex-row lg:gap-4 xl:gap-8'>
          <div><span className='font-semibold flex-shrink-0'>Start Date : </span> <span>{formatDateToReadable(singleEvent?.startDate)}</span></div>
          <div><span className='font-semibold flex-shrink-0'>End Date : </span> <span>{formatDateToReadable(singleEvent?.endDate)}</span></div>
        </div>
      </div>
      <h1 className='my-4 lg:my-6 w-full h-auto text-xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold'>{singleEvent?.title}</h1>
      <p style={{ whiteSpace: "pre-wrap" }} className='w-full h-auto text-sm text-gray-500 sm:text-base lg:text-lg'>
        {singleEvent?.description}
      </p>
    </div>
  )
}

export default AdminSingleEvent