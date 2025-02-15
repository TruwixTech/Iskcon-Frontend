import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import EditEventsPopup from './EditEventsPopup';
import { useEffect } from 'react';
import axios from 'axios';

const backend = import.meta.env.VITE_BACKEND_URL;

function AdminEvents() {
  const [popup, setPopup] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [events, setEvents] = useState([]);

  function handleOpenPopup(event = null) {
    setCurrentEvent(event);
    setPopup(true);
  }
  const navigate = useNavigate();

  async function fetchEvents() {
    try {
      const response = await axios.get(`${backend}/admin/event/get`);
      setEvents(response.data.data);
    } catch (error) {
      console.log("Error while fetching events", error);
    }
  }

  async function deleteEvent(id) {
    try {
      await axios.delete(`${backend}/admin/event/delete/${id}`)
      fetchEvents();
      alert("Event deleted successfully!");
    } catch (error) {
      console.log("Error while deleting event", error);
    }
  }

  const handleCreateEvents = () => {
    navigate('/admin-dashboard/events/create-event');
  };

  const formatDateToReadable = (isoDate) => {
    if (!isoDate) return ''; // Handle empty or invalid input

    const date = new Date(isoDate);

    // Convert to IST (UTC+5:30)
    const offset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const istDate = new Date(date.getTime() + offset);

    // Extract date components
    const day = String(istDate.getUTCDate()).padStart(2, '0');
    const month = String(istDate.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = istDate.getUTCFullYear();
    const hours = String(istDate.getUTCHours()).padStart(2, '0');
    const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(istDate.getUTCSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className='w-full h-auto flex flex-col'>
      <h1 className='text-center text-4xl font-semibold my-3'>Admin-Events-Section</h1>
      <div className='w-full h-auto flex flex-col my-10'>
        <div className='w-full h-auto flex flex-col justify-center items-center mb-10 gap-7'>
          <span onClick={handleCreateEvents} className='w-auto px-5 py-2 border text-yellow-500 rounded-md active:bg-yellow-600 active:text-white font-medium border-yellow-500 md:hover:bg-yellow-600 duration-300 ease-in-out md:hover:text-white cursor-pointer'>
            Create A New Event
          </span>
        </div>
        <div className='w-full h-auto px-5 md:px-10 lg:px-20 gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center'>
          {events.map((event, index) => (
            <div className='w-full h-auto p-3 lg:p-5 flex flex-col justify-between items-center gap-3 duration-300 ease-in-out border rounded-lg shadow-md hover:shadow-xl' key={index}>
              <NavLink to={`/admin-dashboard/events/single-event/${event._id}`} className='w-full h-auto flex flex-col gap-3 justify-between flex-1'>
                <img src={event.image[0]} alt="" className='w-full h-40' />
                <h1 className='text-lg font-semibold'>{event.title}</h1>
                <p className='text-sm text-gray-500'>{event.description.length > 150 ? event.description.slice(0, 150) + "..." : event.description.slice(0, 150)}</p>
                <p className='text-sm text-gray-500'><span className='text-black font-semibold'>Location : </span>{event.location}</p>
                <div className='w-full h-auto flex flex-col'>
                  <span>Start Date: {formatDateToReadable(event.startDate)}</span>
                  <span>End Date: {formatDateToReadable(event.endDate)}</span>
                </div>
              </NavLink>
              <div className='w-full h-auto flex justify-between items-center'>
                <button onClick={() => handleOpenPopup(event)} className='px-6 py-2 bg-green-500 rounded-lg text-white'>Edit</button>
                <button onClick={()=> deleteEvent(event._id)} className='px-6 py-2 bg-red-500 rounded-lg text-white'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {popup && (
        <EditEventsPopup
          event={currentEvent}
          closePopup={() => setPopup(false)}
          refreshEvents={fetchEvents}
        />
      )}
    </div>
  )
}

export default AdminEvents