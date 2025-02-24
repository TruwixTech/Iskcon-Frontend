import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const backend = import.meta.env.VITE_BACKEND_URL;

const ShowDonations = () => {
    const [donations, setDonations] = useState([]);
    async function fetchDonations() {
        try {
          const response = await axios.get(`${backend}/admin/donation/get`);
          setDonations(response.data.data);
    
        } catch (error) {
          console.log("Error while fetching donations", error);
        }
      }
    
      useEffect(() => {
        fetchDonations()
      }, [])
    
      async function deleteDonation(id) {
        try {
          await axios.delete(`${backend}/admin/donation/delete/${id}`);
          fetchDonations();
          alert("Donation deleted successfully!");
        } catch (error) {
          console.log("Error while deleting donation", error);
        }
      }
  return (
    <div>
        <div className='w-full h-auto flex justify-center gap-6 flex-wrap my-10'>
        {
          donations.map((donation, index) => (
            <div className='w-[350px] h-auto p-3 lg:p-5 border flex flex-col justify-between gap-4 rounded-xl shadow-md duration-500 ease-in-out hover:shadow-2xl' key={index}>
              <NavLink to={`/admin-dashboard/donation/single-donation/${donation._id}`} className='w-full h-auto flex flex-col gap-3 justify-between flex-1'>
                <img src={donation.image[0]} alt="" className='w-full h-48 object-cover' />
                <h1 className='text-lg font-semibold'>{donation.title}</h1>
                <p className='text-sm text-gray-500'>{donation.description.length > 150 ? donation.description.slice(0, 150) + "..." : donation.description.slice(0, 150)}</p>
                <div className='w-full h-auto flex flex-col'>
                  <span>Start Date: (donation.startDate)</span>
                  <span>End Date: (donation.endDate)</span>
                </div>
              </NavLink>
              <div className='w-full h-auto flex justify-between items-center'>
                <button
                  onClick={() => handleOpenPopup(donation)}
                  className='px-6 py-2 bg-green-500 rounded-lg text-white'>Edit</button>
                <button
                  onClick={() => deleteDonation(donation._id)}
                  className='px-6 py-2 bg-red-500 rounded-lg text-white'>Delete</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ShowDonations
