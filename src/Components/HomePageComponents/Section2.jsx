import React from "react";
import BgOne from "../../assets/bg2.png";
import KrishnaJiClouds from "../../assets/krishnajiClouds.png";
import { Link } from "react-router-dom";
function Section2() {
  return (
    <div
      className="w-full h-auto flex flex-col justify-center items-end bg-[#FDE3B6] lg:flex-row-reverse 2xl:h-screen"
      style={{
        backgroundImage: `url(${BgOne})`,
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-auto flex flex-col pt-10">
        <h1 className="font-prata text-2xl px-5 md:px-10 sm:text-3xl lg:text-4xl lg:pb-8">
          Timeline
        </h1>
        <div className="w-full h-auto flex flex-col gap-8 my-10 lg:flex-row relative lg:mb-0 lg:overflow-hidden">
          <div className="w-full h-auto flex flex-col gap-5 px-5 md:px-10 lg:w-[60%] lg:ml-auto relative z-40 lg:h-[500px] 2xl:w-[55%] xl:gap-8 2xl:mr-10">
            <div className="w-full h-auto flex flex-col gap-1">
              <h1 className="font-nunito text-xl font-bold sm:text-2xl lg:text-3xl">
                The Beginning
              </h1>
              <span className="w-[24%] h-[2px] bg-[#9195EF]"></span>
            </div>
            <p className="font-nunito text-sm text-[#4A5D88] sm:text-base lg:text-lg">
              In 1965, His Divine Grace Srila Prabhupada left Vrindavan behind
              for spreading the message of Lord Krishna in Western countries. He
              entered Boston with a trunk full of Lord Krishna’s books and a
              negligible amount of money in his pocket.
              <br />
              <br />
              Initially, he struggled a lot, but within a few days, people
              started noticing him. Some curious people joined him in his
              chanting and lectures, while some started to acquire serious
              concern about his holy mission. He lived in New York until the
              year 1966.
              <br />
              <br />
              He had started giving lectures on the sacred Bhagavad Gita weekly.
              In 1966, he established ISKCON in New York City successfully.
            </p>
            <div className="w-full h-auto font-poppins">
              <a href="/donation#donationcircle">
                <button className="px-3 py-2 text-sm text-white bg-[#EB852C] rounded-3xl xl:px-6 xl:py-3 xl:text-base">
                  Donate
                </button>
              </a>
            </div>
          </div>
          <img
            src={KrishnaJiClouds}
            alt="krishna ji clouds"
            className="w-full h-auto object-cover lg:absolute lg:-bottom-10"
          />
        </div>
      </div>
    </div>
  );
}

export default Section2;
