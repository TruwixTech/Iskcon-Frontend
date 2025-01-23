import { useEffect, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const EditCSRDonationPopup = ({ csrDonation, closePopup, refreshCsrDonations }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        totalAmount: "",
        startDate: "",
        endDate: "",
    });

    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Store the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("totalAmount", formData.totalAmount);
        data.append("startDate", formData.startDate);
        data.append("endDate", formData.endDate);
        if (image) {
            data.append("image", image);
        }

        try {
            const res = await axios.put(
                `${backend}/admin/csrdonation/${csrDonation?._id}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.status === 200 || res.status === 201) {
                alert("CSR Donation updated successfully!");
                refreshCsrDonations();
                closePopup();
            }
        } catch (error) {
            console.error("Error updating CSR Donation:", error);
            setError(error?.response?.data?.message ?? "Failed to update donation");
        }
    };

    useEffect(() => {
        if (csrDonation) {
            setFormData({
                title: csrDonation.title,
                description: csrDonation.description,
                totalAmount: csrDonation.totalAmount,
                startDate: csrDonation.startDate?.split("T")[0] || "",
                endDate: csrDonation.endDate?.split("T")[0] || "",
            });
            setImage(csrDonation.image || '');
        }
    }, [csrDonation]);

    return (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50 pt-20 font-marcellus">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Edit CSR Donation</h2>
                    <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                        {image && typeof image === "string" && (
                            <div className="mb-4">
                                <img src={image} alt="Current" className="w-48 h-32 object-cover rounded-md" />
                            </div>
                        )}
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-end space-x-4 mt-8">
                        <button
                            type="button"
                            onClick={closePopup}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCSRDonationPopup;
