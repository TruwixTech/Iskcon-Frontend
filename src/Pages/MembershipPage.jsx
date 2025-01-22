import React from "react";
import Circlebg from "../assets/circlebg.png";
import Navbar from "../Components/Navbar";
import { FaMedal } from "react-icons/fa6";
import bronge from "../assets/bronze.svg";
import silver from "../assets/silver.svg";
import gold from "../assets/gold.svg";
import diamond from "../assets/diamond.svg";
import platinum from "../assets/platinum.svg";

const MembershipPage = () => {
  return (
    <div className="bg-[#fde3b6] w-full h-auto relative py-20">
      <div className="w-full h-[70px] z-[100] absolute top-10 px-4 md:px-20">
        <Navbar />
      </div>
      <div className="w-full absolute top-0 left-1/2 -translate-x-1/2">
        <img src={Circlebg} alt="" className="w-full opacity-10" />
      </div>
      <h1 className="text-5xl text-center text-[#3b2106] mt-20 font-prata uppercase font-[400px]">
        MemberShip categories
      </h1>
      <div className="w-full px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-50 py-20">
  {/* Bronze Membership Card */}
  <div className="membership-card shiny-bronze p-6 rounded-lg text-white text-center font-bold shadow-md h-[250px] flex flex-col justify-between">
    <div className="flex justify-center items-center mb-4">
   <img src={bronge} alt="" className="w-20 h-20"/>
    </div>
    <h1 className="text-2xl">Bronze</h1>
    <p className="text-lg">₹ 2,25,555/-</p>
    <button className="bg-white text-bronze font-semibold py-2 px-4 rounded-md">
      See Facilities
    </button>
  </div>

  {/* Silver Membership Card */}
  <div className="membership-card shiny-silver p-6 rounded-lg text-black text-center font-bold shadow-md h-[250px] flex flex-col justify-between">
    <div className="flex justify-center items-center mb-4">
    <img src={silver} alt="" className="w-20 h-20"/>
    </div>
    <h1 className="text-2xl">Silver</h1>
    <p className="text-lg">₹ 5,55,555/-</p>
    <button className="bg-black text-silver font-semibold py-2 px-4 rounded-md">
      See Facilities
    </button>
  </div>

  {/* Gold Membership Card */}
  <div className="membership-card shiny-gold p-6 rounded-lg text-white text-center font-bold shadow-md h-[250px] flex flex-col justify-between">
    <div className="flex justify-center items-center mb-4">
    <img src={gold} alt="" className="w-20 h-20"/>
    </div>
    <h1 className="text-2xl">Gold</h1>
    <p className="text-lg">₹ 11,00,000/-</p>
    <button className="bg-white text-gold font-semibold py-2 px-4 rounded-md">
      See Facilities
    </button>
  </div>

  {/* Diamond Membership Card */}
  <div className="membership-card shiny-diamond p-6 rounded-lg text-black text-center font-bold shadow-md h-[250px] flex flex-col justify-between">
    <div className="flex justify-center items-center mb-4">
    <img src={diamond} alt="" className="w-20 h-20"/>
    </div>
    <h1 className="text-2xl">Diamond</h1>
    <p className="text-lg">₹ 21,00,000/-</p>
    <button className="bg-black text-diamond font-semibold py-2 px-4 rounded-md">
      See Facilities
    </button>
  </div>

  {/* Platinum Membership Card */}
  <div className="membership-card shiny-platinum p-6 rounded-lg text-white text-center font-bold shadow-md h-[250px] flex flex-col justify-between">
    <div className="flex justify-center items-center mb-4">
    <img src={platinum} alt="" className="w-20 h-20"/>
    </div>
    <h1 className="text-2xl">Platinum</h1>
    <p className="text-lg">₹ 31,00,000/-</p>
    <button className="bg-white text-platinum font-semibold py-2 px-4 rounded-md">
      See Facilities
    </button>
  </div>

  {/* Steering Committee Member Card */}
  <div className="membership-card shiny-super-gold p-6 rounded-lg text-black text-center font-bold shadow-md h-[250px] flex flex-col justify-between">
    <div className="flex justify-center items-center mb-4">
    <FaMedal size={50} />
    </div>
    <h1 className="text-2xl">Steering Committee Member</h1>
    <p className="text-lg">₹ 51,00,000/-</p>
    <button className="bg-black text-super-gold font-semibold py-2 px-4 rounded-md">
      See Facilities
    </button>
  </div>
</div>



      {/* <div className="w-full px-4 md:px-20 my-10 relative z-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
          <div className="bg-gradient-to-r from-[#b08d57] to-[#cd7f32]  h-auto rounded-3xl shadow-lg px-4 py-6">
            <h1 className="text-4xl font-prata font-semibold text-center">
              Bronze
            </h1>
            <p className="text-3xl font-nunito font-bold text-center py-4">
              ₹ 2,25,555/-
            </p>
            <div className="w-full h-auto flex flex-col gap-4">
              <p className="text-2xl font-semibold font-nunito">Facilities:-</p>
              <ul>
                <li>Name Encriptions On Wall Of Fame</li>
                <li>Certificate Of Appreciation</li>

                <li>Pandav Sadasyata Card</li>
                <li>
                  Prasadam On Your Special Occasions Like Birthday, Anniversary,
                  Etc.
                </li>
                <li>Special Aarti On Special Occasions</li>
                <li>ISKCON Life Membership</li>
                <li>(10% discount) on Dham Yatra Once In A Year</li>
                <li>Govinda's Meal Discounts</li>
                <li>Festivals Mahaprasadam</li>
                <li>Special Invitation For Vigrah Installation</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#c0c0c0] to-[#a8a8a8]  h-auto rounded-3xl shadow-lg px-4 py-6">
            <h1 className="text-4xl font-prata font-semibold text-center">
              Silver
            </h1>
            <p className="text-3xl font-nunito font-bold text-center py-4">
              ₹ 2,25,555/-
            </p>
            <div className="w-full h-auto flex flex-col gap-4">
              <p className="text-2xl font-semibold font-nunito">Facilities:-</p>
              <ul>
                <li>Name Encriptions On Wall Of Fame</li>
                <li>Certificate Of Appreciation</li>
                <li>
                  Token Of Appreciation (In Form Of Silver Coin Encripted With
                  Deities Pics)
                </li>
                <li>Pandav Sadasyata Card</li>
                <li>
                  Prasadam On Your Special Occasions Like Birthday, Anniversary,
                  Etc.
                </li>
                <li>Special Aarti On Special Occasions</li>
                <li>ISKCON Life Membership</li>
                <li>(15% Discount) Dham Yatra Once In A Year</li>
                <li>VIP Entries During Larged Gathering Festivals</li>
                <li>Special Aarti During Rath Yatra For Entire Family</li>
                <li>Special Yearly Kirtan At Home</li>
                <li>Govinda's Meal Discounts (5% In a Year & Once in a month)</li>
                <li>Festivals Mahaprasadam</li>
                <li>Priority Banquet Hall Booking</li>
                <li>Special Invitation For Vigrah Installation</li>
                <li>Guest of Honors For Vigrah Installation</li>
                <li>
                  Special Deities Paraphernalias Like Garlands, Dresses, Etc.
                </li>
                <li>
                  Reserved Seats On Priority In Temple Hall During Grand Festive
                  Ceremony
                </li>
                <li>Valet Parking During Festivals</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#ffd700] to-[#ffcc00]  h-[600px] rounded-3xl shadow-lg px-4 py-6">
            <h1 className="text-4xl font-prata font-semibold text-center">
              Gold
            </h1>
            <p className="text-3xl font-nunito font-bold text-center py-4">
              ₹ 2,25,555/-
            </p>
            <div className="w-full h-auto flex flex-col gap-4">
              <p className="text-2xl font-semibold font-nunito">Facilities:-</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MembershipPage;
