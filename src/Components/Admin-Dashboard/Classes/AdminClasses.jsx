import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import EditOfflineClassPopup from './EditOfflineClassPopup';

function AdminClasses() {
    const [popup, setPopup] = useState(false);
    const [currentOfflineClass, setCurrentOfflineClass] = useState(null);

    function handleOpenPopup(guestHouse = null) {
        setCurrentOfflineClass(guestHouse);
        setPopup(true);
    }

    const navigate = useNavigate();

    const handleCreateClasses = () => {
        navigate('/admin-dashboard/classes/create-classes');
    };
    return (
        <div className='w-full h-auto flex flex-col'>
            <h1 className='text-center text-4xl font-semibold my-3'>Admin-OfflineClasses-Section</h1>
            <div className='w-full h-auto flex flex-col my-10'>
                <div className='w-full h-auto flex flex-col justify-center items-center mb-10 gap-7'>
                    <span onClick={handleCreateClasses} className='w-auto px-5 py-2 border text-yellow-500 rounded-md active:bg-yellow-600 active:text-white font-medium border-yellow-500 md:hover:bg-yellow-600 duration-300 ease-in-out md:hover:text-white cursor-pointer'>
                        Create A Offline class
                    </span>
                </div>
                <div className='w-full h-auto px-5 md:px-10 lg:px-20 gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center'>
                    {[{ image: "", title: "Class title", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores labore quam consequuntur. Saepe, incidunt eaque, totam exercitationem assumenda doloremque ipsa optio dolores cum fuga possimus quasi vel nulla vitae corrupti." }, { image: "", title: "The title of first event", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores labore quam consequuntur. Saepe, incidunt eaque, totam exercitationem assumenda doloremque ipsa optio dolores cum fuga possimus quasi vel nulla vitae corrupti." }, { image: "", title: "The title of first event", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores labore quam consequuntur. Saepe, incidunt eaque, totam exercitationem assumenda doloremque ipsa optio dolores cum fuga possimus quasi vel nulla vitae corrupti." }, { image: "", title: "The title of first event", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores labore quam consequuntur. Saepe, incidunt eaque, totam exercitationem assumenda doloremque ipsa optio dolores cum fuga possimus quasi vel nulla vitae corrupti." }].map((event, index) => (
                        <div className='w-full h-auto p-3 lg:p-5 flex flex-col items-center gap-3 duration-300 ease-in-out border rounded-lg shadow-md hover:shadow-xl' key={index}>
                            <NavLink to='/admin-dashboard/classes/class/12345' className='w-full h-auto flex flex-col'>
                                <img src={event.image} alt="" className='w-full h-40' />
                                <h1 className='text-xl font-semibold'>{event.title}</h1>
                                <p className='text-sm text-gray-500'>{event.content.length > 150 ? event.content.slice(0, 150) + "..." : event.content.slice(0, 150)}</p>
                                <span className='flex justify-between'><h1>Monday to Friday</h1><h1>10:30 am to 5:30 pm</h1></span>
                            </NavLink>
                            <div className='w-full h-auto flex justify-between items-center'>
                                <button onClick={() => handleOpenPopup(event)} className='px-6 py-2 bg-green-500 rounded-lg text-white'>Edit</button>
                                <button className='px-6 py-2 bg-red-500 rounded-lg text-white'>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {popup && (
                <EditOfflineClassPopup
                    product={currentOfflineClass}
                    closePopup={() => setPopup(false)}
                // refreshProducts={fetchProducts}
                />
            )}
        </div>
    )
}

export default AdminClasses