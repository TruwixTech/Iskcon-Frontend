import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import BgOne from '../../assets/bg2.webp'
import Navbar from '../Navbar';
import axios from 'axios';
import DonationCircle from '../DonationCircle';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const backend = import.meta.env.VITE_BACKEND_URL;

function SingleBlog() {
    const [singleBlog, setSingleBlog] = useState({})
    const [relatedBlogs, setRelatedBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const { id } = useParams()

    async function fetchSingleBlog() {
        try {
            setLoading(true)
            const response = await axios.get(`${backend}/admin/blog/get`)
            const singleBlog = response.data.data.find(blog => blog._id === id)
            const relatedBlogs = response.data.data.filter(blog => blog._id !== id)
            setRelatedBlogs(relatedBlogs.slice(0, 4))
            setSingleBlog(singleBlog)
            setImages(singleBlog.image)
            setLoading(false)
        } catch (error) {
            console.error('Error while fetching single blog', error)
        }
    }

    function timeSince(dateTimeString) {
        // Extract date and time parts
        const [datePart, timePart] = dateTimeString.split(" ");
        const [day, month, year] = datePart.split("-");
        const [hour, minute, seconds] = timePart.split(":");

        // Convert to a proper Date object (YYYY-MM-DDTHH:mm:ss format)
        const givenDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:${seconds}`);

        if (isNaN(givenDate.getTime())) {
            return "Invalid Date";
        }

        const now = new Date();
        const secondsDiff = Math.floor((now - givenDate) / 1000);

        if (secondsDiff < 0) return "In the future"; // Handle future dates

        const minutes = Math.floor(secondsDiff / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (years > 0) return `${years} ${years === 1 ? "year" : "years"} ago`;
        if (months > 0) return `${months} ${months === 1 ? "month" : "months"} ago`;
        if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
        if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
        if (minutes > 0) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
        return `${secondsDiff} ${secondsDiff === 1 ? "second" : "seconds"} ago`;
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchSingleBlog()
    }, [id])

    return (
        <div className='bg-[#fde5bc] w-full h-full' style={{
            backgroundImage: `url(${BgOne})`,
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain'
        }}
        >
            <div className="px-4 md:px-20 pt-4 z-10 relative">
                <Navbar />
            </div>
            <div className='w-full h-auto flex flex-col my-10 px-5 md:px-10 xl:px-20'>
                <h1 className='font-prata text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>{singleBlog?.title}</h1>
                <LazyLoadImage src={images[0]} alt="blog image" effect="blur" className='w-full h-auto rounded-xl mt-3 md:mt-6 md:h-[550px] object-cover' />
                <h1 className='w-full h-auto flex gap-2 items-center text-[#4F4F4F] font-poppins mt-4 md:text-lg xl:text-xl'>
                    {singleBlog?.createdAt?.slice(0, 10)} • {" "}
                    {
                        loading
                            ? "Loading..."
                            : singleBlog?.createdAt && timeSince(singleBlog?.createdAt)
                    }
                </h1>
                <section className="w-full mt-12">
                    <div className="w-full flex flex-col md:flex-row gap-10">
                        <div className=" w-full md:w-2/3 ">
                            <p className='font-poppins md:text-lg' style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: singleBlog?.description }}></p>
                        </div>
                        {/* Related Blogs */}
                        <aside className="w-full md:w-1/3">
                            <h2 className="text-3xl font-semibold mb-6 font-poppins">
                                Related Blogs
                            </h2>
                            <div className="space-y-4">
                                {relatedBlogs?.map((blog) => (
                                    <NavLink
                                        to={`/blogs/single-blog/${blog._id}`}
                                        key={blog._id}
                                        className="flex items-center cursor-pointer space-x-4 font-prata"
                                    >
                                        <div className="w-[100px] md:w-[120px] h-20 md:h-24 lg:w-[150px]">
                                            <LazyLoadImage
                                                src={blog.image[0]}
                                                alt={blog.title}
                                                effect="blur"
                                                className="w-full h-full object-fit rounded-lg"
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold">{blog.title}</h3>
                                            <p className="text-sm text-[#4F4F4F] mt-3">
                                                {blog.createdAt.slice(0, 10)} •
                                                {
                                                    loading
                                                        ? "Loading..."
                                                        : singleBlog?.createdAt && timeSince(singleBlog?.createdAt)
                                                }
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
    )
}

export default SingleBlog