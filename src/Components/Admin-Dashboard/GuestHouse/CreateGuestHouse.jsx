import React, { useState } from "react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

function CreateGuestHouse() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        bookingNo: "",
        whatsAppNo: "",
        email: "",
        reservationTime: "",
        guestHouseLink: "",
    });

    const [images, setImages] = useState([null]); // Array to hold images
    const [previews, setPreviews] = useState([""]); // Array to hold previews

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle image upload
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews((prev) => {
                    const newPreviews = [...prev];
                    newPreviews[index] = reader.result;
                    return newPreviews;
                });
            };
            reader.readAsDataURL(file);

            setImages((prev) => {
                const newImages = [...prev];
                newImages[index] = file;
                return newImages;
            });
        }
    };

    // Add more image upload fields
    const addImageField = () => {
        setPreviews((prev) => [...prev, ""]);
        setImages((prev) => [...prev, null]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, description, guestHouseLink } = formData;
        if (!title || !description || !guestHouseLink || !images[0]) {
            alert("Please fill all required fields and upload at least one image!");
            return;
        }

        const formPayload = new FormData();
        Object.keys(formData).forEach((key) => {
            formPayload.append(key, formData[key]);
        });

        images.forEach((image, index) => {
            if (image) {
                formPayload.append(`image${index}`, image);
            }
        });

        try {
            const response = await axios.post(`${backend}/api/v1/admin/create-guesthouse`, formPayload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Guest house details submitted successfully!");
            setPreviews([""]);
            setImages([null]);
            setFormData({
                title: "",
                description: "",
                bookingNo: "",
                whatsAppNo: "",
                email: "",
                reservationTime: "",
                guestHouseLink: "",
            });
        } catch (error) {
            console.error("Error submitting Guest House:", error);
            alert("Failed to submit the guest house. Please try again.");
        }
    };

    return (
        <div className="w-full h-auto flex flex-col pt-20 md:pt-24">
            <h1 className="w-full h-auto text-center font-dmSans text-3xl font-semibold md:text-4xl xl:text-5xl">
                Create <span className="text-[#d9b34b]">Guest House</span>
            </h1>

            <form onSubmit={handleSubmit} className="w-full h-auto flex flex-col items-center my-10 gap-6 font-dmSans">
                {/* Image Upload Section */}
                {previews.map((preview, index) => (
                    <div
                        key={index}
                        className="w-full max-w-2xl h-72 bg-gray-300 rounded-lg border-2 border-dashed border-gray-400 flex justify-center items-center relative group"
                    >
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ) : (
                            <div className="w-20 h-20 bg-gray-500 text-white text-4xl rounded-full flex justify-center items-center">
                                <span>+</span>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, index)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <span className="absolute bottom-4 text-white text-sm">
                            {index === 0 ? "Main Image" : `Optional Image ${index}`}
                        </span>
                    </div>
                ))}

                {/* Add More Images Button */}
                <button
                    type="button"
                    onClick={addImageField}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg mt-2"
                >
                    Add More Images
                </button>

                <div className="w-full max-w-3xl px-4">
                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter Guest House title"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter description"
                            rows="6"
                            className="w-full p-3 border resize-none border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Booking Number */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            Booking Number
                        </label>
                        <input
                            type="text"
                            name="bookingNo"
                            value={formData.bookingNo}
                            onChange={handleInputChange}
                            placeholder="Enter Booking Number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* WhatsApp Number */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            WhatsApp Number
                        </label>
                        <input
                            type="text"
                            name="whatsAppNo"
                            value={formData.whatsAppNo}
                            onChange={handleInputChange}
                            placeholder="Enter WhatsApp Number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter Email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Reservation Time */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            Reservation Time
                        </label>
                        <input
                            type="text"
                            name="reservationTime"
                            value={formData.reservationTime}
                            onChange={handleInputChange}
                            placeholder="Enter Reservation Time"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Guest House Link */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            Guest House Link
                        </label>
                        <input
                            type="url"
                            name="guestHouseLink"
                            value={formData.guestHouseLink}
                            onChange={handleInputChange}
                            placeholder="Enter Guest House Link"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-lg mt-4"
                >
                    Submit Guest House
                </button>
            </form>
        </div>
    );
}

export default CreateGuestHouse;
