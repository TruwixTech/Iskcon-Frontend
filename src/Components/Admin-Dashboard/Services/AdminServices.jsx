import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function AdminServices() {

  const navigate = useNavigate();
  const handleCreateEvents = () => {
    navigate('/admin-dashboard/services/create-service');
  };

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
          {[{ image: "", title: "The title of first event", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores labore quam consequuntur. Saepe, incidunt eaque, totam exercitationem assumenda doloremque ipsa optio dolores cum fuga possimus quasi vel nulla vitae corrupti." }, { image: "", title: "The title of first event", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores labore quam consequuntur. Saepe, incidunt eaque, totam exercitationem assumenda doloremque ipsa optio dolores cum fuga possimus quasi vel nulla vitae corrupti." }, { image: "", title: "The title of first event", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores labore quam consequuntur. Saepe, incidunt eaque, totam exercitationem assumenda doloremque ipsa optio dolores cum fuga possimus quasi vel nulla vitae corrupti." }, { image: "", title: "The title of first event", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores labore quam consequuntur. Saepe, incidunt eaque, totam exercitationem assumenda doloremque ipsa optio dolores cum fuga possimus quasi vel nulla vitae corrupti." }].map((event, index) => (
            <NavLink to='/admin-dashboard/services/single-service/125366434' className='w-full h-auto p-3 lg:p-5 flex flex-col items-center gap-3 duration-300 ease-in-out border rounded-lg shadow-md hover:shadow-xl' key={index}>
              <img src={event.image} alt="" className='w-full h-40' />
              <h1 className='text-xl font-semibold'>{event.title}</h1>
              <p className='text-sm text-gray-500'>{event.content.length > 150 ? event.content.slice(0, 150) + "..." : event.content.slice(0, 150)}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminServices