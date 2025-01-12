import grass from "../assets/grass.png";
import tree from "../assets/tree.png";
import krishna from "../assets/krishna.png";
import morpankh from "../assets/morpankh.png";
import mandir from "../assets/mandir.png";
import cloud from "../assets/cloud.png";
import cloud2 from "../assets/cloud2.png";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Sun from "../assets/sun.png";

const Homepage = () => {
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1; // Increment the animation progress
      if (progress <= 100) {
        setAnimationProgress(progress);
      } else {
        clearInterval(interval); // Clear the interval when animation completes
      }
    }, 15); // Adjust the interval time to control animation speed
    return () => clearInterval(interval);
  }, []);

  const grassStyle = {
    transform: `translateY(${Math.min(animationProgress * 0.6, 60)}px)`, // Move down slightly
  };

  const treeStyle = {
    transform: `translateX(${Math.max(-animationProgress * 2, -180)}px)`, // Move left more
  };

  const krishnaStyle = {
    transform: `translateX(${Math.max(-animationProgress * 2, -200)}px)`, // Move left
  };

  const morpankhStyle = {
    transform: `translateX(${Math.max(-animationProgress * 2, -200)}px)`, // Move left faster
  };

  const mandirStyle = {
    transform: `scale(${1 + animationProgress * 0.002})`, // Scale up slightly
  };

  const cloudStyle = {
    transform: `translateY(${Math.min(animationProgress * 1.2, 50)}px)`, // Move down
  };

  const cloud2Style = {
    transform: `translateY(${Math.min(animationProgress * 1.2, 50)}px)`, // Move down
  };

  const sunStyle = {
    transform: `translateY(${Math.min(-animationProgress * 4, 500)}px) translateX(${Math.min(animationProgress * 3.4, 800)}px) scale(${1 + animationProgress * 0.040})`, // Move up and right diagonally and scale
  };

  const textStyle = {
    transform: `translateX(${Math.min(animationProgress * 4, 320)}px)`, // Move down slightly
  };

  return (
    <>
      <div className="w-full h-auto relative font-poppins">
        {/* Hero Section */}
        <div className="w-full h-screen relative bg-[#fde3b6] overflow-hidden">
          <div className="w-full h-[70px] z-[100] absolute top-10 px-20">
            <Navbar />
          </div>

          <div
            className="w-full h-full absolute top-[35%] z-50 -left-60"
            style={textStyle}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-xl">
                Connect to SHRI SHRI RADHA MADAN MOHAN JI
              </h3>
              <h2 className="text-4xl">Welcome to</h2>
              <h1 className="text-6xl font-[500]">ISCKON Ghaziabad</h1>
              <button className="w-[180px] rounded-full bg-white text-[#eb852c] py-2 px-4 cursor-pointer">
                Donate
              </button>
            </div>
          </div>

          <div className="w-full h-full absolute -top-32 " style={grassStyle}>
            <img src={grass} alt="grass" className="w-full" />
          </div>
          <div className="w-full h-full relative -right-48 z-50">
            <img
              src={tree}
              alt="tree"
              className="w-full max-h-[880px] absolute -top-[8px]"
              style={treeStyle}
            />
            <img
              src={krishna}
              alt="krishna"
              className="absolute top-1/3 left-[45%] "
              style={krishnaStyle}
            />
            <img
              src={morpankh}
              alt="morpankh"
              className="absolute top-[28%] right-[29%]"
              style={morpankhStyle}
            />
          </div>
          <div
            className="w-full h-full absolute -bottom-10 "
            style={mandirStyle}
          >
            <img src={mandir} alt="mandir" className="w-full h-full " />
          </div>
          <div
            className="w-full h-full absolute bottom-0 z-50"
            style={cloudStyle}
          >
            <img src={cloud} alt="cloud" className="w-full h-full" />
          </div>
          <div
            className="w-full h-full absolute bottom-0 z-50"
            style={cloud2Style}
          >
            <img src={cloud2} alt="cloud2" className="w-full h-full" />
          </div>
          <div
            className="w-[100px] h-auto absolute bottom-10 left-[40%] z-40"
            style={sunStyle}
          >
            <img src={Sun} alt="" className="" />
          </div>
        </div>

        {/* Next Section */}
        <div className="bg-[#fde3b6] h-[600px] text-center pt-20">
          My font is good
        </div>
      </div>
    </>
  );
};

export default Homepage;
