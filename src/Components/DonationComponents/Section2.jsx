import React from "react";
import circlebg from "../../assets/circlebg.png";
import krishnadonation from "../../assets/krishnadon.png";
import leaf1 from "../../assets/leaf1.png";
import leaf2 from "../../assets/leaf2.png";

const Section2 = () => {
  return (
    <>
      <div className="bg-[#fde3b6] w-full h-screen relative overflow-hidden font-prata flex justify-center items-center">
        <div className="w-[1000px] absolute -top-52 left-1/2 -translate-x-1/2 opacity-20">
          <img src={circlebg} alt="" className="" />
        </div>
        <div className="bg-white rounded-2xl relative h-[550px] w-[80%]">
          <div className="absolute -left-10 -top-20 h-[630px]">
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

      <div className="bg-[#fde3b6] relative w-full h-[700px] md:h-[560px]">
        <div className="absolute left-0">
          <img src={leaf1} alt="" />
        </div>
        <div className="absolute right-0">
          <img src={leaf2} alt="" />
        </div>
        <div className="absolute md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-center text-5xl my-10 text-[#3B2106] font-prata">
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
                The offering should connect us to our giving to Lord Krishna in
                some way; For example, when we provide to ISKCON programs, we
                support Krishna’s wish that his education can be sow throughout.
                The supreme Lord is atmarama, or self-satisfied. He does not
                need our offerings; he is entirely whole in himself.
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
    </>
  );
};

export default Section2;
