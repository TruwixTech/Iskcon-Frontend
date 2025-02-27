import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import BgOne from "../../assets/bg2.webp";
import Navbar from "../Navbar";
import axios from "axios";
import DonationCircle from "../DonationCircle";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const backend = import.meta.env.VITE_BACKEND_URL;

function SingleEventPage() {
  const [singleEvent, setSingleEvent] = useState({});
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const { id } = useParams();

  async function fetchSingleEvent() {
    try {
      setLoading(true);
      const response = await axios.get(`${backend}/admin/event/get`);
      const singleEvent = response.data.data.find((event) => event._id === id);
      const relatedEvents = response.data.data.filter(
        (event) => event._id !== id
      );
      setRelatedEvents(relatedEvents.slice(0, 4));
      setSingleEvent(singleEvent);
      setImages(singleEvent.image);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching single event", error);
    }
  }

  function formatDate(dateString) {
    let date = new Date(dateString);
    let day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    let year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSingleEvent();
  }, [id]);
  
  return (
    <div
      className="bg-[#fde5bc] w-full h-full"
      style={{
        backgroundImage: `url(${BgOne})`,
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div className="px-4 md:px-20 pt-4 z-10 relative">
        <Navbar />
      </div>
      <div className="w-full h-auto flex flex-col my-10 px-5 md:px-10 xl:px-20">
        <h1 className="font-prata text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          {singleEvent?.title}
        </h1>
        <LazyLoadImage
          src={images[0]}
          alt="blog image"
          effect="blur"
          className="w-full h-auto rounded-xl mt-3 md:mt-6 md:h-[550px] object-cover"
        />
        <h1 className="w-full h-auto flex gap-2 items-center text-[#4F4F4F] font-poppins mt-4 md:text-lg xl:text-xl">
          {formatDate(singleEvent?.startDate)} •{" "}
          {formatDate(singleEvent?.endDate)}
        </h1>
        <section className="w-full mt-12">
          <div className="w-full flex flex-col md:flex-row gap-10">
            <div className=" w-full md:w-2/3 ">
              <p
                className="font-poppins md:text-lg"
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{ __html: singleEvent?.description }}
              ></p>
            </div>
            {/* Related Events */}
            <aside className="w-full md:w-1/3">
              <h2 className="text-3xl font-semibold mb-6 font-poppins">
                Related Events
              </h2>
              <div className="space-y-4">
                {relatedEvents?.map((event) => (
                  <NavLink
                    to={`/events/single-event/${event._id}`}
                    key={event._id}
                    className="flex items-center cursor-pointer space-x-4 font-prata"
                  >
                    <div className="w-[100px] md:w-[120px] h-20 md:h-24 lg:w-[150px]">
                      <LazyLoadImage
                        src={event.image[0]}
                        alt={event.title}
                        effect="blur"
                        className="w-full h-full object-fit rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">{event.title}</h3>
                      <p className="text-sm text-[#4F4F4F] mt-3">
                        {formatDate(singleEvent?.startDate)} •{" "}
                        {formatDate(singleEvent?.endDate)}
                      </p>
                    </div>
                  </NavLink>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </div>
      <DonationCircle />
    </div>
  );
}

export default SingleEventPage;
