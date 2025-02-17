import React, { useEffect, useState } from "react";
import styleborder from "../../assets/styleborder.webp";
import pea from "../../assets/pea.webp";
import borderbg from "../../assets/donateImg.webp";

function Section3() {
  const carousal = [
    {
      title:
        "Make a donation for Srila Prabhupada booksdisctribution directly at ISKCON Ghaziabad",
      id: "1",
    },
    {
      title:
        "Make a donation for Srila Prabhupada booksdisctribution directly at ISKCON Ghaziabad",
      id: "2",
    },
    {
      title:
        "Make a donation for Srila Prabhupada booksdisctribution directly at ISKCON Ghaziabad",
      id: "3",
    },
    {
      title:
        "Make a donation for Srila Prabhupada booksdisctribution directly at ISKCON Ghaziabad",
      id: "4",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carousal.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change slides every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [carousal.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  return (
    <div className="w-full h-auto flex justify-center items-center py-20 lg:pt-24">
      <div className="relative h-[450px] md:h-[500px] lg:h-[700px]">
        <img src={styleborder} alt="border image" className="w-full h-full" />
        <img
          src={pea}
          alt="peacock image"
          className="absolute -top-16 left-1/2 -translate-x-1/2 lg:-top-10"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col gap-6 justify-center items-center">
          <h1 className="text-xl md:text-2xl text-center text-[#3B2106] font-prata lg:text-3xl xl:text-4xl">
            Donate for Srila Prabhupada <br />
            Books Distribution Now
          </h1>
          <div className="w-[80%] h-auto flex flex-col mx-auto">
            <div className="relative w-full max-w-2xl lg:max-w-4xl mx-auto">
              {/* Carousel Content */}
              <div className="overflow-hidden w-full">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {carousal.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex-shrink-0 w-full md:px-8 h-48 rounded-l-2xl text-white flex items-end p-4 lg:h-60 xl:h-80"
                      style={{
                        backgroundImage: `url(${borderbg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "right",
                      }}
                    >
                      <div className="w-full h-auto flex flex-col gap-2 md:w-[50%] md:mb-6 lg:gap-8">
                        <h3
                          className="font-semibold text-sm font-prata md:text-lg"
                          style={{
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          {item.title}
                        </h3>
                        <div>
                          <button className="text-white font-poppins text-sm lg:text-base">
                            Donate Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bullets */}
              <div className="flex justify-center mt-4">
                {carousal.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-3 w-3 rounded-full mx-1 ${
                      currentIndex === index ? "bg-[#EB852C]" : "bg-gray-300"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
          {/* <img src={borderbg} alt="border" className="h-[150px] px-10 md:px-32" /> */}
        </div>
      </div>
    </div>
  );
}

export default Section3;
