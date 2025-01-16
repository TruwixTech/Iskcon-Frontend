import Navbar from "./Navbar";
import blogbg from "../assets/blogbg.jpeg";
import { useEffect, useState } from "react";
import blog1 from "../assets/blog1.png";
import blog2 from "../assets/blog2.png";
import DonationCircle from "./DonationCircle.jsx";
const BlogPage = () => {
  // const [scrollPosition, setScrollPosition] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollPosition(window.scrollY); // Track vertical scroll position
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   // Cleanup event listener on component unmount
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  const blogs = {
    trending: [
      {
        id: 1,
        title: "Sri Mahesha Pandita Appearance",
        date: "22 July 2024",
        readTime: "4 min",
        description:
          "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus...",
        image: blog2,
      },
      {
        id: 2,
        title:
          "The Significance of Bali Daityaraja Puja in Vedic Rituals and Worship",
        date: "22 July 2024",
        readTime: "4 min",
        description:
          "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus...",
        image: blog1,
      },
      {
        id: 3,
        title: "Disappearance Day: Srila Raghunatha Bhatta Goswami",
        date: "22 July 2024",
        readTime: "4 min",
        description:
          "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus...",
        image: blog2,
      },
    ],
    latest: [
      {
        id: 1,
        title: "Sri Mahesha Pandita Appearance",
        date: "22 July 2024",
        readTime: "4 min",
        description:
          "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus...",
        image: blog1,
      },
      {
        id: 2,
        title: "What is the Significance of Utthana Ekadashi?",
        date: "22 July 2024",
        readTime: "4 min",
        description:
          "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus...",
        image: blog2,
      },
      {
        id: 3,
        title: "Srila JIVA Goswami Disappearing Day",
        date: "22 July 2024",
        readTime: "4 min",
        description:
          "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus...",
        image: blog1,
      },
      {
        id: 4,
        title: "Sri Mahesha Pandita Appearance",
        date: "22 July 2024",
        readTime: "4 min",
        description:
          "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus...",
        image: blog2,
      },
      {
        id: 5,
        title: "What is the Significance of Utthana Ekadashi?",
        date: "22 July 2024",
        readTime: "4 min",
        description:
          "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus...",
        image: blog1,
      },
      {
        id: 6,
        title: "Srila JIVA Goswami Disappearing Day",
        date: "22 July 2024",
        readTime: "4 min",
        description:
          "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus...",
        image: blog2,
      },
    ],
  };

  return (
    <div className="bg-[#fde5bc] w-full h-full">
      <div className="px-4 md:px-20 pt-10 z-10 relative">
        <Navbar />
      </div>
      <div className="mt-10">
        <div className="w-full h-[300px] rounded-3xl relative -z-1 overflow-hidden px-4 md:px-20 ">
          <img
            src={blogbg}
            alt=""
            className="w-full h-full rounded-3xl object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl mx-4 md:mx-20  "></div>
        </div>
        <div className="my-10">
          <h1 className="font-prata text-3xl text-[#ED683C]  overflow-y-hidden">
            राधे श्री राध राधे श्री राध राधे श्री राध राधे श्री राध राधे श्री
            राध राधे श्री राध राधे श्री राध राधे श्री राध राध राधे श्री राध राधे
            श्री राध राधे श्री राध
          </h1>
        </div>
        <div className="w-full flex justify-center items-center mt-10 px-4 md:px-20  ">
          <h1 className="font-prata text-xl text-[#3B2106] text-center">
            “The essence of devotion is in giving without expecting, loving
            without boundaries,
            <br />
            and serving without hesitation”
          </h1>
        </div>
        {/* blog */}
        <div>
          <div className="container mx-auto py-8">
            {/* Trending Blogs */}
            <section className="px-4 md:px-20 mt-10">
              <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-10">
                <div className="w-full md:w-1/3 text-center md:text-start">

                  <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-poppins">
                    Trending Blogs
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-end gap-4 mb-8 w-full md:w-2/3">
                  <div className="relative w-[90%] md:w-[60%] ">
                    <input
                      type="text"
                      placeholder="Search blog"
                      className="w-full px-4 py-2 border rounded-full shadow-sm "
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-1/2 -translate-y-1/2 right-4 h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35m2.1-6.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <select className="px-4 py-2  bg-transparent ">
                      <option value="default">Sort By: Default</option>
                      <option value="date">Date</option>
                      <option value="popularity">Popularity</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
                {blogs.trending.map((blog) => (
                  <div
                    key={blog.id}
                    className=" overflow-hidden  transform transition duration-300 hover:scale-105 font-prata"
                  >
                    <div className="rounded-lg ">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-[250px] object-fit"
                      />
                    </div>

                    <div className="p-4">
                      <p className="text-sm text-gray-600">
                        {blog.date} • {blog.readTime}
                      </p>
                      <h3 className="text-lg font-bold mt-2">{blog.title}</h3>
                      <p className="text-sm text-gray-700 mt-2">
                        {blog.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Latest Blogs */}
            <section className="w-full mt-12 px-4 md:px-20">
              <h2 className="text-3xl font-semibold mb-6 font-poppins">
                Latest Blog
              </h2>
              <div className="w-full flex flex-col md:flex-row gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 w-full md:w-2/3 ">
                  {blogs.latest.map((blog) => (
                    <div
                      key={blog.id}
                      className=" overflow-hidden  transform transition duration-300 hover:scale-105 font-prata"
                    >
                      <div className="rounded-lg ">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-[250px] object-fit"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600">
                          {blog.date} • {blog.readTime}
                        </p>
                        <h3 className="text-lg font-bold mt-2">{blog.title}</h3>
                        <p className="text-sm text-gray-700 mt-2">
                          {blog.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <aside className="w-full md:w-1/3">
                  <h2 className="text-3xl font-semibold mb-6 font-poppins">
                    Related Blogs
                  </h2>
                  <div className="space-y-4">
                    {blogs.latest.slice(0, 6).map((blog) => (
                      <div
                        key={blog.id}
                        className="flex items-center space-x-4 font-prata"
                      >
                        <div className="w-[100px] md:w-[120px] h-20 md:h-24">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-fit rounded-lg"
                          />
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">
                            {blog.date} • {blog.readTime}
                          </p>
                          <h3 className="text-sm font-bold">{blog.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            </section>

            {/* Related Blogs */}
          </div>
        </div>
        
        {/* Donation Circles */}
         <DonationCircle/>
      </div>

    </div>
  );
};

export default BlogPage;
