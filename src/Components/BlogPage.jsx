import Navbar from "./Navbar";
import blogbg from "../assets/blogbg.jpeg";
import { useEffect, useState } from "react";
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
        image: "image-url-1.jpg",
      },
      {
        id: 2,
        title:
          "The Significance of Bali Daityaraja Puja in Vedic Rituals and Worship",
        date: "22 July 2024",
        readTime: "4 min",
        description:
          "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus...",
        image: "image-url-2.jpg",
      },
      {
        id: 3,
        title: "Disappearance Day: Srila Raghunatha Bhatta Goswami",
        date: "22 July 2024",
        readTime: "4 min",
        description:
          "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus...",
        image: "image-url-3.jpg",
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
        image: "image-url-1.jpg",
      },
      {
        id: 2,
        title: "What is the Significance of Utthana Ekadashi?",
        date: "22 July 2024",
        readTime: "4 min",
        description:
          "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus...",
        image: "image-url-4.jpg",
      },
      {
        id: 3,
        title: "Srila JIVA Goswami Disappearing Day",
        date: "22 July 2024",
        readTime: "4 min",
        description:
          "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus...",
        image: "image-url-5.jpg",
      },
    ],
    related: [
      {
        id: 1,
        title: "Srila JIVA Goswami Disappearing Day",
        date: "22 July 2024",
        readTime: "4 min",
        image: "image-url-5.jpg",
      },
    ],
  };
  
  return (
    <div className="bg-[#fde5bc] w-full h-full">
      <div className="px-20 pt-10">
        <Navbar />
      </div>
      <div className="my-10">
        <div className="w-full h-[300px] rounded-3xl relative overflow-hidden px-4 md:px-20 ">
          <img
            src={blogbg}
            alt=""
            className="w-full h-full rounded-3xl object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl mx-20  "></div>
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
        <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      

      {/* Trending Blogs */}
      <section className="px-4 md:px-20 mt-10">
        <div className="w-full flex gap-10">
          <div className="w-1/3">        <h2 className="text-2xl font-bold mb-6">Trending Blogs</h2>
          </div>
        <div className="flex items-center justify-between gap-10 mb-8 w-2/3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search blog"
            className="w-full px-4 py-2 border rounded-full shadow-sm focus:ring focus:ring-blue-300"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-2 right-4 h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 10l7 7m-7-7h0a4 4 0 11-5.66 0 4 4 0 015.66 0z"
            />
          </svg>
        </div>
        <div>
          <select
            className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
          >
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
              className=" overflow-hidden  transform transition duration-300 hover:scale-105"
            >
              <div className="rounded-lg border-2 border-black">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
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
      <section className="mt-12 px-4 md:px-20">
        <h2 className="text-2xl font-bold mb-6">Latest Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {blogs.latest.map((blog) => (
            <div
              key={blog.id}
              className=" overflow-hidden  transform transition duration-300 hover:scale-105"
            >
              
              <div className="rounded-lg border-2 border-black">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
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

      {/* Related Blogs */}
      <aside className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Blogs</h2>
        <div className="space-y-4">
          {blogs.related.map((blog) => (
            <div key={blog.id} className="flex items-center space-x-4">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
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
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
