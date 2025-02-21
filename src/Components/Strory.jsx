import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import img1 from "../assets/krishna2.webp";
import axios from "axios";

const stories = [
  { type: "image", src: img1, text: "Welcome to the event! lorem ipsum lorem4 ipsum lorem4 Welcome to the event! lorem ipsum lorem4 ipsum lorem4 Welcome to the event! lorem ipsum lorem4 ipsum lorem4 Welcome to the event! lorem ipsum lorem4 ipsum lorem4 Welcome to the event! lorem ipsum lorem4 ipsum lorem4" },
  { type: "video", src: "https://www.youtube.com/watch?v=9hvXjIPiAsA&t=0s", text: "Live Kirtan Happening Now!" },
  { type: "image", src: img1, text: "Join the Bhagavad Gita class!" },
];
const backend = import.meta.env.VITE_BACKEND_URL;

export default function StoryViewer({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const [Story, setStory] = useState([]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextStory();
            return 0;
          }
          return prev + 1;
        });
      }, 100); // Progress bar updates every 50ms (5s total for each story)

      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused]);

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1 < stories.length ? prev + 1 : 0));
    setProgress(0);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : stories.length - 1));
    setProgress(0);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current && touchEndX.current) {
      const deltaX = touchEndX.current - touchStartX.current;
      if (deltaX > 50) {
        prevStory(); // Swipe right
      } else if (deltaX < -50) {
        nextStory(); // Swipe left
      }
    }
    setIsPaused(false);
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(`${backend}/admin/daily-story`);
        setStory(response.data.story);  // Make sure to access `story`
        console.log(response.data.story);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
  
    fetchStories();
  }, []); 
  // Dependency array to run once when the component mounts
  
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative w-[90vw] max-w-[500px] h-screen max-h-[800px] bg-black rounded-lg overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-4 left-4 right-4 flex space-x-1 z-50 ">
          {stories.map((_, index) => (
            <div
              key={index}
              className="h-1 bg-gray-500 rounded-full flex-1"
            >
              {index === currentIndex && (
                <div
                  className="h-1 bg-white rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Left Click - Previous */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1/3"
          onClick={prevStory}
        ></div>

        {/* Story Content */}
        <div
          className="relative w-full h-full flex items-center justify-center "
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {stories[currentIndex].type === "image" ? (
            <img
              src={stories[currentIndex].src}
              alt="Story"
              className="w-[80%] h-[90%] object-cover"
            />
          ) : (
            <ReactPlayer
              url={stories[currentIndex].src}
              playing={!isPaused}
              width="100%"
              height="100%"
              loop={false}
              controls={false}
              onEnded={nextStory}
            />
          )}
            
            <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>


          {/* Text Overlay */}
          <div className="absolute bottom-0 w-full h-auto  text-center text-white text-xl font-bold ">
            {stories[currentIndex].text}
          </div>

          {/* Pause on Hold */}
          <div
            className="absolute inset-0"
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
          ></div>
        </div>

        {/* Right Click - Next */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3"
          onClick={nextStory}
        ></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-6 border border-gray-600 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-2xl z-50"
        >
          ✖
        </button>
      </div>
    </div>
  );
}