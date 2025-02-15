import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import DonationCircle from '../Components/DonationCircle'
import axios from 'axios';
import { toast } from 'react-toastify';

const backend = import.meta.env.VITE_BACKEND_URL;


function LiveDarshan() {
  const [liveDarshan, setLiveDarshan] = useState({});

  async function getLiveDarshanByDate() {
    try {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-GB').split('/').join('-');
      const response = await axios.post(`${backend}/admin/liveDarshan/get-date`, {
        date: formattedDate
      });

      setLiveDarshan(response.data.liveDarshan);
    } catch (error) {
      console.log("Error while fetching live darshan", error);
      toast.error("Failed to fetch live darshan!");
    }
  }

  useEffect(() => {
    getLiveDarshanByDate();
  }, [])


  return (
    <div className='w-full h-auto flex flex-col bg-[#fde3b6]'>
      <div className="px-4 md:px-20 pt-4 relative z-50">
        <Navbar />
      </div>
      <div className='w-full h-auto px-5 md:px-10 lg:px-20 my-10 lg:my-20'>
        <h1 className='font-prata text-lg md:text-2xl xl:text-3xl font-semibold'>Live Darshan</h1>
        {
          liveDarshan.youtubeLiveLink
            ? <div className='w-full h-80 sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] mt-5 lg:mt-8'>
              <iframe
                src={`${liveDarshan.youtubeLiveLink}?autoplay=1&live=1`}
                title="YouTube Video"
                className="w-full h-full"
                allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="origin"
              ></iframe>

            </div>
            : <div className='w-full h-80 flex justify-center items-center'>
              <span className='font-prata text-2xl lg:text-4xl'>No live darshan available Today</span>
            </div>
        }
      </div>
      <DonationCircle />
    </div>
  )
}

export default LiveDarshan