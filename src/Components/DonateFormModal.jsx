import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DonateFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, contact, amount } = formData;

    // Name Validation (Only letters and spaces)
    if (!name.trim()) {
      toast.error("Name is required.");
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
      toast.error("Name should contain only letters and spaces.");
      return false;
    }

    // Email Validation
    if (!email.trim()) {
      toast.error("Email is required.");
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      toast.error("Enter a valid email address.");
      return false;
    }

    // Contact Validation (Only numbers, exactly 10 digits)
    if (!contact.trim()) {
      toast.error("Contact number is required.");
      return false;
    }
    if (!/^\d{10}$/.test(contact)) {
      toast.error("Contact number must be exactly 10 digits.");
      return false;
    }

    // Amount Validation (Greater than ₹0)
    if (!amount || amount <= 0) {
      toast.error("Enter a valid donation amount.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      toast.success("Donation submitted successfully!");
      setFormData({ name: "", email: "", contact: "", amount: "" });
    }
  };

  if (!isOpen) return null; // Hide modal if not open

  return (
    <div className="w-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl relative">
        <h2 className="text-xl font-semibold mb-4">Donate Now</h2>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="mb-2 font-medium">Name:</label>
          <input
            type="text"
            name="name"
            className="border p-2 rounded mb-3"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />

          <label className="mb-2 font-medium">Email:</label>
          <input
            type="email"
            name="email"
            className="border p-2 rounded mb-3"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label className="mb-2 font-medium">Contact:</label>
          <input
            type="text"
            name="contact"
            className="border p-2 rounded mb-3"
            placeholder="Enter your contact"
            value={formData.contact}
            onChange={handleChange}
          />

          <label className="mb-2 font-medium">Amount (₹):</label>
          <input
            type="number"
            name="amount"
            className="border p-2 rounded mb-3"
            placeholder="Enter donation amount"
            value={formData.amount}
            onChange={handleChange}
          />

          <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-full mt-3">
            Donate Now
          </button>
        </form>

        <button onClick={onClose} className="text-gray-500 mt-3 font-bold absolute text-4xl top-2 right-8">
          X
        </button>
      </div>
    </div>
  );
};

export default DonateFormModal;
