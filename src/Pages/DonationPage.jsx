import React from "react";
import Section1 from "../Components/DonationComponents/Section1";
import Section2 from "../Components/DonationComponents/Section2";
import DonationCircle from "../Components/DonationCircle";
import PaymentDetailsCard from "../Components/PaymentDetailsCard";
import leaf1 from "../assets/leaf1.png";
import leaf2 from "../assets/leaf2.png";
import styleborder from "../assets/styleborder.png";
import pea from "../assets/pea.png";
import borderbg from "../assets/borderbg.png";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const DonationPage = () => {
   const carousal = [
      {
        title:
          "Online pooja participation on the concluding day of Temple Inauguration",
        id: "1",
      },
      {
        title:
          "Online pooja participation on the concluding day of Temple Inauguration",
        id: "2",
      },
      {
        title:
          "Online pooja participation on the concluding day of Temple Inauguration",
        id: "3",
      },
      {
        title:
          "Online pooja participation on the concluding day of Temple Inauguration",
        id: "4",
      },
    ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  
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
    <div>
      <Section1 />
      <div id="section2">
        <Section2 />
        <div id="donationcircle">
          <DonationCircle />
        </div>

        <div className="w-full md:px-20 px-4 py-20">
          <PaymentDetailsCard />
        </div>

        {/* {another section} */}

        <div className="bg-white relative w-full h-[550px] md:h-[560px]">
          <div className="absolute left-0">
            <img src={leaf1} alt="" />
          </div>
          <div className="absolute right-0">
            <img src={leaf2} alt="" />
          </div>
          <div className="absolute md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-center text-3xl md:text-5xl my-10 text-[#3B2106] font-prata">
                Donation is a Maha Daan
              </h1>
              <div className="text-sm md:text-base flex flex-col gap-6 text-center items-center font-nunito px-2">
                <p>
                  The offering teaches us to help others, especially those less
                  fortunate and without demanding anything in return.
                </p>
                <p>
                  All the charity is done without expecting anything in return.
                  This charity is mainly to create a world of abundance and
                  sustainability for the people who are a little less fortunate
                  than us.
                </p>
                <p>
                  The offering should connect us to our giving to Lord Krishna
                  in some way; For example, when we provide to ISKCON programs,
                  we support Krishna’s wish that his education can be sow
                  throughout. The supreme Lord is atmarama, or self-satisfied.
                  He does not need our offerings; he is entirely whole in
                  himself.
                </p>
                <p>
                  Yet he commands us to give in charity to him. Why? Because it
                  refines and helps us spiritually, providing in charity to
                  Krishna is one way we recognize that everything belongs to him
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* section4 */}

        <div className="w-full h-auto flex justify-center items-center py-20 lg:pt-24">
          <div className="relative h-[450px] md:h-[500px] lg:h-[700px]">
            <img
              src={styleborder}
              alt="border image"
              className="w-full h-full"
            />
            <img
              src={pea}
              alt="peacock image"
              className="absolute -top-16 left-1/2 -translate-x-1/2 lg:-top-10"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col gap-2 md:gap-6 justify-center items-center">
              <h1 className="text-xl md:text-2xl text-center text-[#3B2106] font-prata lg:text-3xl xl:text-4xl">
                Donor Privileges
              </h1>
              <p className="w-[80%] md:w-[50%] md:text-base h-auto text-xs text-[#444444] font-nunito text-center">
                Each one of our respected contributors of at least one square
                feet donation will receive below privileges:
              </p>
              <div className="w-[80%] h-auto flex flex-col mx-auto">
                <div className="relative w-full max-w-2xl lg:max-w-4xl mx-auto">
                  {/* Carousel Content */}
                  <div className="overflow-hidden w-full">
                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                      }}
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
                          <h3
                            className="font-semibold text-sm font-prata md:text-lg lg:w-[45%] lg:mb-8 lg:text-xl"
                            style={{
                              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            {item.title}
                          </h3>
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
                          currentIndex === index
                            ? "bg-[#EB852C]"
                            : "bg-gray-300"
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
