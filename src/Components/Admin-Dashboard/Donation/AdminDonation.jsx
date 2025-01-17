import { useEffect, useState } from 'react';
import CreateDonationForm from './DonationModal.jsx';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import EditDonationsPopup from './EditDonationPopup.jsx';

const backend = import.meta.env.VITE_BACKEND_URL;

function AdminDonation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donations, setDonations] = useState([])
  const [popup, setPopup] = useState(false);
  const [currentDonation, setCurrentDonation] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  function handleOpenPopup(donation = null) {
    setCurrentDonation(donation);
    setPopup(true);
  }

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

  return (
    <div className="w-full h-auto flex flex-col">
      <h1 className="text-center text-2xl md:text-4xl font-semibold my-3">Admin-Donation-Section</h1>
      <div className="text-center">
        <button
          onClick={toggleModal}
          className="px-4 py-2 border-[#ca8a04] border-2 text-[#ca8a04] rounded hover:bg-[#ca8a04] hover:text-white duration-300"
        >
          Create Donation
        </button>
      </div>
      <div className='w-full h-auto flex justify-center gap-6 flex-wrap my-10'>
        {
          donations.map((donation, index) => (
            <div className='w-[350px] h-auto p-3 lg:p-5 border flex flex-col justify-between gap-4 rounded-xl shadow-md duration-500 ease-in-out hover:shadow-2xl' key={index}>
              <NavLink to={`/admin-dashboard/donation/single-donation/${donation._id}`} className='w-full h-auto flex flex-col gap-3 justify-between flex-1'>
                <img src={donation.image[0]} alt="" className='w-full h-48 object-cover' />
                <h1 className='text-lg font-semibold'>{donation.title}</h1>
                <p className='text-sm text-gray-500'>{donation.description.length > 150 ? donation.description.slice(0, 150) + "..." : donation.description.slice(0, 150)}</p>
                <div className='w-full h-auto flex flex-col'>
                  <span>Start Date: {formatDateToReadable(donation.startDate)}</span>
                  <span>End Date: {formatDateToReadable(donation.endDate)}</span>
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
      {
        isModalOpen && <CreateDonationForm isOpen={isModalOpen} onClose={toggleModal} refreshDonations={fetchDonations} />
      }
      
      {popup && (
        <EditDonationsPopup
          donation={currentDonation}
          closePopup={() => setPopup(false)}
          refreshDonations={fetchDonations}
        />
      )}
    </div>
  );
}

export default AdminDonation;
