import React from 'react'
import { useState,useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { use } from 'react';
import EditCSRDonationPopup from './EditCSRDonationPopup';
const backend = import.meta.env.VITE_BACKEND_URL;
const CSRDonation = () => {
     const [popup, setPopup] = useState(false);
     const [currentCSRDonation, setCurrentCSRDonation] = useState(null);
     const [csrDonation, setCsrDonation] = useState([]);

     function handleOpenPopup(currentCSRDonation = null) {
        setCurrentcsrDonation(csrDonation);
        setPopup(true);
      }

      const navigate = useNavigate();
      const handleCreateEvents = () => {
        navigate('/admin-dashboard/csr-donation/create-csr-donation');
      };

      async function fetchCSRDonation() {
        try {
          const response = await axios.get(`${backend}/admin/csrdonation`);
          setCsrDonation(response.data.data);
        } catch (error) {
          console.log("Error while fetching CSRDonation", error);
        }
      }

      async function deletecsrDonation(id) {
        try {
          await axios.delete(`${backend}/admin/csrdonation/delete/${id}`);
          fetchCSRDonation();
          alert("CSRDonation deleted successfully!");
        } catch (error) {
          console.log("Error while deleting CSRDonation", error);
        }
      }

      useEffect(() => {
        fetchCSRDonation()
      }, [])

    
  return (
    <div className='w-full h-auto flex flex-col'>
      <h1 className='text-center text-4xl font-semibold my-3'>CSR-DONATION-SECTION</h1>
      <div className='w-full h-auto flex flex-col my-10'>
        <div className='w-full h-auto flex flex-col justify-center items-center mb-10 gap-7'>
          <span onClick={handleCreateEvents} className='w-auto px-5 py-2 border text-yellow-500 rounded-md active:bg-yellow-600 active:text-white font-medium border-yellow-500 md:hover:bg-yellow-600 duration-300 ease-in-out md:hover:text-white cursor-pointer'>
            Create A New CSR Donation
          </span>
        </div>
        <div className='w-full h-auto px-5 md:px-10 lg:px-20 gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center'>
          {csrDonation?.map((csrDonation, index) => (
            <div className='w-full h-auto p-3 lg:p-5 flex flex-col items-center gap-3 duration-300 ease-in-out border rounded-lg shadow-md hover:shadow-xl' key={index}>
              <NavLink to={`/admin-dashboard/csr-donation/${csrDonation._id}`} className='w-full h-auto flex flex-col'>
                <img src={csrDonation.image[0]} alt="" className='w-full h-40' />
                <h1 className='text-xl font-semibold'>{csrDonation.title}</h1>
                <p className='text-sm text-gray-500'>{csrDonation.description.length > 150 ? csrDonation.description.slice(0, 150) + "..." : csrDonation.description.slice(0, 150)}</p>
              </NavLink>
              <div className='w-full h-auto flex justify-between items-center'>
                <button onClick={() => handleOpenPopup(csrDonation)} className='px-6 py-2 bg-green-500 rounded-lg text-white'>Edit</button>
                <button onClick={() => deletecsrDonation(csrDonation._id)} className='px-6 py-2 bg-red-500 rounded-lg text-white'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {popup && (
        <EditCSRDonationPopup
          csrDonation={currentcsrDonation}
          closePopup={() => setPopup(false)}
          refreshcsrDonations={fetchcsrDonations}
        />
      )}
    </div>
  )
}

export default CSRDonation
