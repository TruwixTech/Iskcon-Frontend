import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const backend = import.meta.env.VITE_BACKEND_URL;

function AdminLiveDarshan() {
  const [createLiveDarshanPopup, setCreateLiveDarshanPopup] = useState(false);
  const [liveDarshan, setLiveDarshan] = useState([]);
  const [formData, setFormData] = useState({
    LiveDarshanLink: '',
  });
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.LiveDarshanLink) {
      toast.dismiss();
      toast.error("Please enter a valid YouTube embed link.");
      return;
    }

    if (!/^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+$/.test(formData.LiveDarshanLink)) {
      toast.dismiss();
      toast.error("Please enter a valid YouTube embed link.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${backend}/admin/liveDarshan/create`, formData);
      toast.dismiss();
      toast.success("Live Darshan created successfully!");
      getAllLiveDarshan();
      setCreateLiveDarshanPopup(false);
      setFormData({ LiveDarshanLink: '' });
    } catch (error) {
      console.error('Error creating live darshan:', error);
      toast.dismiss();
      toast.error("Failed to create live darshan!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backend}/admin/liveDarshan/delete/${id}`);
      toast.dismiss();
      toast.success("Live Darshan deleted successfully!");
      getAllLiveDarshan();
    } catch (error) {
      console.error('Error deleting live darshan:', error);
      toast.dismiss();
      toast.error("Failed to delete live darshan!");
    }
  };

  function formatReadableDate(dateStr) {
    const [day, month, yearAndTime] = dateStr.split('-');
    const [year, time] = yearAndTime.split(' ');
    const date = new Date(`${year}-${month}-${day}T${time}`);

    return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // hour: '2-digit',
        // minute: '2-digit',
        // second: '2-digit',
        // hour12: true
    });
}

  async function getAllLiveDarshan() {
    try {
      const response = await axios.get(`${backend}/admin/liveDarshan/get`);
      setLiveDarshan(response.data.liveDarshan);
    } catch (error) {
      console.log("Error while fetching live darshan", error);
      toast.dismiss();
      toast.error("Failed to fetch live darshan!");
    }
  }

  useEffect(() => {
    getAllLiveDarshan();
  }, [])

  return (
    <div className='w-full h-auto flex flex-col items-center min-h-screen'>
      <h1 className='text-center text-4xl font-semibold my-3'>Admin Live Darshan Section</h1>

      {/* Button to trigger the popup */}
      <button
        onClick={() => setCreateLiveDarshanPopup(true)}
        className='px-5 py-2 border text-yellow-500 rounded-md my-6 active:bg-yellow-600 active:text-white font-medium border-yellow-500 hover:bg-yellow-600 duration-300 ease-in-out hover:text-white cursor-pointer'
      >
        Create A New Live Darshan
      </button>

      <div className='w-full h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-content-center my-10 px-5 md:px-10 lg:px-20'>
        {
          liveDarshan.map((item, index) => (
            <div className='w-full h-auto flex flex-col gap-3 bg-gray-100 rounded-xl overflow-hidden pb-7 shadow-md md:hover:shadow-xl duration-500 ease-in-out' key={index}>
              <iframe
                src={item.youtubeLiveLink}
                title="YouTube Video"
                className="w-full h-56"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div className='w-full h-auto flex justify-between px-2'>
                <span className='font-semibold'>{formatReadableDate(item.createdAt)}</span>
                <MdDelete onClick={() => handleDelete(item._id)} className='text-red-500 cursor-pointer' size={25} />
              </div>
            </div>
          ))
        }
      </div>

      {/* Popup Form */}
      {createLiveDarshanPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Live Darshan</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* YouTube Live Link Input */}
              <div className="flex flex-col">
                <label className="font-medium mb-1" htmlFor="LiveDarshanLink">YouTube Embed Link</label>
                <input
                  type="text"
                  id="LiveDarshanLink"
                  name="LiveDarshanLink"
                  value={formData.LiveDarshanLink}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Use an embed link like: <br /> <code>https://www.youtube.com/embed/VIDEO_ID</code></p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCreateLiveDarshanPopup(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminLiveDarshan;
