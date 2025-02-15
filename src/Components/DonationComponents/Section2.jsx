import React, { useEffect, useState } from "react";
import circlebg from "../../assets/circlebg.png";
import krishnadonation from "../../assets/krishnadon.png";
import leaf1 from "../../assets/leaf1.png";
import leaf2 from "../../assets/leaf2.png";
import DonationCircle from "../DonationCircle";

import PaymentDetailsCard from "../PaymentDetailsCard";

const Section2 = () => {
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
    <>
      <div className="bg-[#fde3b6] w-full h-[1000px] md:h-screen relative overflow-hidden font-prata flex flex-col md:flex-row justify-center items-center py-20">
        <div className="w-[1200px] absolute -top-52 left-1/2 -translate-x-1/2 opacity-20">
          <img src={circlebg} alt="" className="" />
        </div>
        <div className="bg-white rounded-2xl relative  h-[550px]  w-[95%] md:w-[80%]">
          <div className="absolute md:-left-10 left-1/2 -translate-x-1/2 md:-translate-x-0  -top-20  h-[325px] md:h-[630px]">
            <img src={krishnadonation} alt="" className="w-full h-full" />
          </div>
          <div className="bg-white rounded-2xl  h-auto w-[80%] hidden">
            <h1 className="text-4xl text-[#3B2106] font-bold">
              Donation is a Maha Daan
            </h1>
            <div className="text-sm flex flex-col gap-4 w-[85%]">
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
                The offering should connect us to our giving to Lord Krishna in
                some way;
                <br />
                For example, when we provide to ISKCON programs, we support
                Krishna’s wish that his education can be sow throughout. The
                supreme Lord is atmarama, or self-satisfied. He does not need
                our offerings; he is entirely whole in himself.
              </p>
              <p>
                Yet he commands us to give in charity to him. Why? Because it
                refines and helps us spiritually, providing in charity to
                Krishna is one way we recognize that everything belongs to him
              </p>
            </div>
            <h1 className="text-3xl text-[#EB852C] font-semibold">
              ~Lets donate to support the Temple~
            </h1>
          </div>
          <div className="hidden absolute left-1/3 top-1/2 -translate-y-1/2 md:flex flex-col gap-4 font-nunito ">
            <h1 className="text-4xl text-[#3B2106] font-bold">
              Donation is a Maha Daan
            </h1>
            <div className="text-sm flex flex-col gap-4 w-[85%]">
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
                The offering should connect us to our giving to Lord Krishna in
                some way;
                <br />
                For example, when we provide to ISKCON programs, we support
                Krishna’s wish that his education can be sow throughout. The
                supreme Lord is atmarama, or self-satisfied. He does not need
                our offerings; he is entirely whole in himself.
              </p>
              <p>
                Yet he commands us to give in charity to him. Why? Because it
                refines and helps us spiritually, providing in charity to
                Krishna is one way we recognize that everything belongs to him
              </p>
            </div>
            <h1 className="text-3xl text-[#EB852C] font-semibold">
              ~Lets donate to support the Temple~
            </h1>
          </div>
        </div>
        <div className="bg-white rounded-2xl w-[95%] h-auto flex flex-col justify-center items-center px-2 py-8 mt-6 md:hidden ">
          <h1 className="text-2xl sm:text-4xl text-[#3B2106] font-bold text-center sm:text-left py-6">
            Donation is a Maha Daan
          </h1>
          <div className="text-sm flex flex-col gap-2 sm:w-[85%] text-center md:text-start">
            <p>
              The offering teaches us to help others, especially those less
              fortunate and without demanding anything in return.
            </p>
            <p>
              All the charity is done without expecting anything in return.
              This charity is mainly to create a world of abundance and
              sustainability for the people who are a little less fortunate than
              us.
            </p>
            <p>
              The offering should connect us to our giving to Lord Krishna in
              some way;
              <br />
              For example, when we provide to ISKCON programs, we support
              Krishna’s wish that his education can be sow throughout. The
              supreme Lord is atmarama, or self-satisfied. He does not need our
              offerings; he is entirely whole in himself.
            </p>
            <p>
              Yet he commands us to give in charity to him. Why? Because it
              refines and helps us spiritually, providing in charity to Krishna
              is one way we recognize that everything belongs to him.
            </p>
          </div>
          <h1 className="text-lg sm:text-3xl text-[#EB852C] font-semibold text-center sm:text-left pt-4">
            ~Let's donate to support the Temple~
          </h1>
        </div>
      </div>

      {/* next section */}

      <div className="bg-gradient-to-r from-[#EB852C] to-[#854B19] w-full h-auto flex flex-col justify-center items-center text-center py-16 text-white font-nunito px-4 md:px-0 text-md md:text-lg">
        <h1>
          All Donations paid within India are Tax Exempted under the 80G Section
          of Income Tax Department, Govt. of India.
          <br />
          AVAIL 80G BENEFITS ON THE DONATIONS MADE TO ISKCON AS PER INCOME TAX
          RULE
        </h1>
      </div>

      {/* next section */}
     

      {/* section5 */}
    </>
  );
};

export default Section2;
