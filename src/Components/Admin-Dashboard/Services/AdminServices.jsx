import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import EditServicesPopup from './EditServicesPopup';
import { useEffect } from 'react';
import axios from 'axios';

const backend = import.meta.env.VITE_BACKEND_URL;

function AdminServices() {
  const [popup, setPopup] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [services, setServices] = useState([]);

  function handleOpenPopup(service = null) {
    setCurrentService(service);
    setPopup(true);
  }


  async function fetchServices() {
    try {
      const response = await axios.get(`${backend}/admin/service/get`);
      setServices(response.data.data);
    } catch (error) {
      console.log("Error while fetching service", error);
    }
  }

  async function deleteService(id) {
    try {
      await axios.delete(`${backend}/admin/service/delete/${id}`)
      fetchServices();
      alert("Service deleted successfully!");
    } catch (error) {
      console.log("Error while deleting service", error);
    }
  }

  const navigate = useNavigate();
  const handleCreateEvents = () => {
    navigate('/admin-dashboard/services/create-service');
  };

  useEffect(() => {
    fetchServices()
  }, [])

  return (
    <div className='w-full h-auto flex flex-col'>
      <h1 className='text-center text-4xl font-semibold my-3'>Admin-Services-Section</h1>
      <div className='w-full h-auto flex flex-col my-10'>
        <div className='w-full h-auto flex flex-col justify-center items-center mb-10 gap-7'>
          <span onClick={handleCreateEvents} className='w-auto px-5 py-2 border text-yellow-500 rounded-md active:bg-yellow-600 active:text-white font-medium border-yellow-500 md:hover:bg-yellow-600 duration-300 ease-in-out md:hover:text-white cursor-pointer'>
            Create A New Service
          </span>
        </div>
        <div className='w-full h-auto px-5 md:px-10 lg:px-20 gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center'>
          {services.map((service, index) => (
            <div className='w-full h-auto p-3 lg:p-5 flex flex-col items-center gap-3 duration-300 ease-in-out border rounded-lg shadow-md hover:shadow-xl' key={index}>
              <NavLink to={`/admin-dashboard/services/single-service/${service._id}`} className='w-full h-auto flex flex-col gap-3 justify-between flex-1'>
                <img src={service.image[0]} alt="" className='w-full h-40' />
                <h1 className='text-xl font-semibold'>{service.title}</h1>
                <p className='text-sm text-gray-500'>{service.description.length > 150 ? service.description.slice(0, 150) + "..." : service.description.slice(0, 150)}</p>
              </NavLink>
              <div className='w-full h-auto flex justify-between items-center'>
                <button onClick={() => handleOpenPopup(service)} className='px-6 py-2 bg-green-500 rounded-lg text-white'>Edit</button>
                <button onClick={() => deleteService(service._id)} className='px-6 py-2 bg-red-500 rounded-lg text-white'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {popup && (
        <EditServicesPopup
          service={currentService}
          closePopup={() => setPopup(false)}
          refreshServices={fetchServices}
        />
      )}
    </div>
  )
}

export default AdminServices