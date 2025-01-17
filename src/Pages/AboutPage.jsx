import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import about1 from "../assets/about1.jpg";
import about2 from "../assets/about2.png";
import about3 from "../assets/about3.png";
import about4 from "../assets/bout4.jpg";

const data = [
  {
    id: 1,
    title: "About Srila Prabhuapada",
    image: about1,
    description: "Detailed information about Srila Prabhuapada.",
  },
  {
    id: 2,
    title: "History Of ISKCON",
    image: about2,
    description: "The history and origin of ISKCON.",
  },
  {
    id: 3,
    title: "Our Philosophy",
    image: about3,
    description: "The philosophy behind ISKCON.",
  },
  {
    id: 4,
    title: "Hare Krishna Movement",
    image: about4,
    description: "Details about the Hare Krishna movement.",
  },
];

const AboutUs = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="bg-[#fde3b6] w-full h-full">
        <div className="px-20 pt-10 relative z-50">
        <Navbar />
      </div>
      <h1 className="text-3xl font-bold text-center mb-8 mt-20">
        About <span className="text-yellow-500">Us</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 pb-20 px-4 md:px-20">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all"
            onClick={() => handleCardClick(item.id)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-center">{item.title}</h2>
              <button className="w-full rounded-full mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 px-4 ">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
