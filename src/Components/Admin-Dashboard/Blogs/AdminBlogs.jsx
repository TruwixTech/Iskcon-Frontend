import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import EditBlogsPopup from './EditBlogsPopup';
import axios from 'axios';

const backend = import.meta.env.VITE_BACKEND_URL;

function AdminBlogs() {
  const [popup, setPopup] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);

  function handleOpenPopup(blog = null) {
    setCurrentBlog(blog);
    setPopup(true);
  }

  const navigate = useNavigate();
  const handleCreateEvents = () => {
    navigate('/admin-dashboard/blogs/create-blog');
  };


  async function fetchBlogs() {
    try {
      const response = await axios.get(`${backend}/admin/blog/get`);
      setBlogs(response.data.data);
    } catch (error) {
      console.log("Error while fetching blogs", error);
    }
  }

  async function deleteBlog(id) {
    try {
      await axios.delete(`${backend}/admin/blog/delete/${id}`)
      fetchBlogs();
      alert("Blog deleted successfully!");
    } catch (error) {
      console.log("Error while deleting blog", error);
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className='w-full h-auto flex flex-col'>
      <h1 className='text-center text-4xl font-semibold my-3'>Admin-Blog-Section</h1>
      <div className='w-full h-auto flex flex-col my-10'>
        <div className='w-full h-auto flex flex-col justify-center items-center mb-10 gap-7'>
          <span onClick={handleCreateEvents} className='w-auto px-5 py-2 border text-yellow-500 rounded-md active:bg-yellow-600 active:text-white font-medium border-yellow-500 md:hover:bg-yellow-600 duration-300 ease-in-out md:hover:text-white cursor-pointer'>
            Create A New Blogs
          </span>
        </div>
        <div className='w-full h-auto px-5 md:px-10 lg:px-20 gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center'>
          {blogs.map((blog, index) => (
            <div className='w-full h-auto p-3 lg:p-5 flex flex-col items-center gap-3 duration-300 ease-in-out border rounded-lg shadow-md hover:shadow-xl' key={index}>
              <NavLink to={`/admin-dashboard/blogs/single-blog/${blog._id}`} className='w-full h-auto flex flex-col'>
                <img src={blog.image[0]} alt="" className='w-full h-40' />
                <h1 className='text-xl font-semibold'>{blog.title}</h1>
                <p className='text-sm text-gray-500'>{blog.description.length > 150 ? blog.description.slice(0, 150) + "..." : blog.description.slice(0, 150)}</p>
              </NavLink>
              <div className='w-full h-auto flex justify-between items-center'>
                <button onClick={() => handleOpenPopup(blog)} className='px-6 py-2 bg-green-500 rounded-lg text-white'>Edit</button>
                <button onClick={() => deleteBlog(blog._id)} className='px-6 py-2 bg-red-500 rounded-lg text-white'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {popup && (
        <EditBlogsPopup
          blog={currentBlog}
          closePopup={() => setPopup(false)}
          refreshBlogs={fetchBlogs}
        />
      )}
    </div>
  )
}

export default AdminBlogs