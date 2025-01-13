import { useState } from 'react';
import CreateDonationForm from './DonationModal.jsx';

function AdminDonation() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="w-full h-auto flex flex-col">
      <h1 className="text-center text-4xl font-semibold my-3">Admin-Donation-Section</h1>
      <div className="text-center">
        <button
          onClick={toggleModal}
          className="px-4 py-2 border-[#ca8a04] border-2 text-[#ca8a04] rounded hover:bg-[#ca8a04] hover:text-white duration-300"
        >
          Create Donation
        </button>
      </div>
      <CreateDonationForm isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
}

export default AdminDonation;
