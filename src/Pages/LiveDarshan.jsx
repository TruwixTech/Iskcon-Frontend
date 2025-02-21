import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import DonationCircle from '../Components/DonationCircle';
import axios from 'axios';
import { toast } from 'react-toastify';

const backend = import.meta.env.VITE_BACKEND_URL;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // Your YouTube Data API key
const CHANNEL_ID = 'YOUR_YOUTUBE_CHANNEL_ID'; // Replace with your YouTube channel ID

function LiveDarshan() {
  const [liveVideoId, setLiveVideoId] = useState(null);

  async function getLiveVideoId() {
    try {
      // Fetch the live broadcast details
      const liveResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`
      );

      if (liveResponse.data.items.length > 0) {
        // If live, set the live video ID
        setLiveVideoId(liveResponse.data.items[0].id.videoId);
      } else {
        // If not live, fetch the latest uploaded video
        const uploadResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&key=${YOUTUBE_API_KEY}`
        );

        if (uploadResponse.data.items.length > 0) {
          setLiveVideoId(uploadResponse.data.items[0].id.videoId);
        }
      }
    } catch (error) {
      console.log("Error while fetching live video", error);
      toast.error("Failed to fetch live video!");
    }
  }

  useEffect(() => {
    getLiveVideoId();
  }, []);

  return (
    <div className='w-full h-auto flex flex-col bg-[#fde3b6]'>
      <div className="px-4 md:px-20 pt-4 relative z-50">
        <Navbar />
      </div>
      <div className='w-full h-auto px-5 md:px-10 lg:px-20 my-10 lg:my-20'>
        <h1 className='font-prata text-lg md:text-2xl xl:text-3xl font-semibold'>Live Darshan</h1>
        {
          liveVideoId
            ? <div className='w-full h-80 sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] mt-5 lg:mt-8'>
              <iframe
                src={`https://www.youtube.com/embed/${liveVideoId}?autoplay=1`}
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
  );
}

export default LiveDarshan;