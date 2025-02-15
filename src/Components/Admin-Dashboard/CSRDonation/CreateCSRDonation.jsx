import React, { useState, useEffect } from "react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const CreateCSRDonationPage = ({ mode = "create", donationData = {}, onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        totalAmount: "",
        startDate: "",
        endDate: "",
    });

    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Prepopulate form data if editing
    useEffect(() => {
        if (mode === "edit" && donationData) {
            setFormData({
                title: donationData.title || "",
                description: donationData.description || "",
                totalAmount: donationData.totalAmount || "",
                startDate: donationData.startDate || "",
                endDate: donationData.endDate || "",
            });
            setImage(null); // Image will be uploaded separately if needed
        }
    }, [mode, donationData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (file) => {
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("totalAmount", formData.totalAmount);
        data.append("startDate", formData.startDate);
        data.append("endDate", formData.endDate);
        if (image) data.append("image", image);

        try {
            const url = 
                mode === "create"
                    ? `${backend}/admin/csrdonation/create`
                    : `${backend}/admin/csrdonation/update/${donationData._id}`;

            const res = await axios({
                method: mode === "create" ? "post" : "put",
                url,
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 200 || res.status === 201) {
                const message = mode === "create"
                    ? "CSR Donation created successfully!"
                    : "CSR Donation updated successfully!";
                setSuccessMessage(message);
                alert(message);

                if (mode === "create") {
                    setFormData({
                        title: "",
                        description: "",
                        totalAmount: "",
                        startDate: "",
                        endDate: "",
                    });
                    setImage(null);
                }

                onClose && onClose(); // Close the modal or page after success
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="pt-10 pb-20 flex items-center justify-center font-marcellus">
            <div className="bg-white p-8  w-full max-w-7xl">
                <h2 className="w-full text-center text-5xl font-bold text-gray-800 mb-6">
                    {mode === "create" ? "Create CSR Donation" : "Edit CSR Donation"}
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows="5"
                            required
                        />
                    </div>
                    {/* Total Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                        <input
                            type="number"
                            name="totalAmount"
                            value={formData.totalAmount}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    {/* Start Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    {/* End Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={(e) => handleImageChange(e.target.files[0])}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {mode === "edit" && !image && (
                            <p className="text-sm text-gray-500 mt-2">Current image will remain if none is uploaded.</p>
                        )}
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-end mt-8">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            {mode === "create" ? "Create Donation" : "Update Donation"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCSRDonationPage;
