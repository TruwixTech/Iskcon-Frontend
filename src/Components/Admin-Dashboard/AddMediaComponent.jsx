import axios from 'axios';
import React, { useState } from "react";
import { FaTrash } from 'react-icons/fa'; // Import delete icon
import { FaPlus } from 'react-icons/fa'; // Import add icon


const backend = import.meta.env.VITE_BACKEND_URL;

function AddMediaComponent() {
    const [formData, setFormData] = useState({
        title: "",
        type: "",
    });

    const [images, setImages] = useState([]); // Array to hold image files
    const [previews, setPreviews] = useState([]); // Array to hold image previews

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle image upload
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newPreviews = files.map((file) => URL.createObjectURL(file));
            setPreviews((prev) => [...prev, ...newPreviews]); // Append new previews
            setImages((prev) => [...prev, ...files]); // Append new images
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

        const { title, type } = formData;
        console.log(images)
        if (!title || !type || !images[0]) {
            alert("Please fill all fields and upload at least one image!");
            return;
        }

        const formPayload = new FormData();
        formPayload.append("title", title);
        formPayload.append("type", type);

        images.forEach((image, index) => {
            if (image) {
                formPayload.append(`image`, image); // Append each image
            }
        });

        try {
            const response = await axios.post(`${backend}/admin/media/create`, formPayload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Media submitted successfully!");
            setPreviews([""]);
            setImages([null]);
            setFormData({ title: "", type: "" });
        } catch (error) {
            console.error("Error submitting media:", error);
            alert("Failed to submit media. Please try again.");
        }
    };
    return (
        <div className="w-full h-auto mt-10 flex flex-col justify-start items-center bg-[#fff4dc]">
            <div className="w-full h-auto rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex gap-6">
                    {/* Left Section */}
                    <div className="w-1/2">
                        <h2 className="text-2xl font-semibold mb-2">Add Media</h2>

                        <div className="border border-gray-300 rounded-xl p-4">
                            {/* Image Upload */}
                            <label htmlFor="images" className="cursor-pointer">
                                <div className="grid grid-cols-3 gap-2">
                                    {previews.map((preview, index) => (
                                        <div
                                            key={index}
                                            className="h-40 bg-gray-200 rounded-lg border border-gray-300 flex justify-center items-center"
                                        >
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                    ))}
                                    {previews.length < 6 && (
                                        <div className="h-40 bg-orange-100 rounded-lg border border-orange-400 flex justify-center items-center text-xl font-bold text-orange-500 cursor-pointer">
                                            +
                                        </div>
                                    )}
                                </div>
                            </label>
                            <input
                                type="file"
                                id="images"
                                accept="image/*"
                                className="hidden"
                                multiple
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-1/2 overflow-y-scroll h-[400px]">
                        <div className="rounded-xl p-4">
                            {/* Buttons */}
                            <div className="flex justify-end gap-2 mb-4">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-orange-500 text-white px-4 py-1 rounded-lg"
                                >
                                    Save
                                </button>
                            </div>

                            {/* Form Fields */}
                            <form className="space-y-4">
                                <div className="flex gap-4">
                                    <label className="block w-[35%] text-black font-bold">
                                        Media Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full border border-orange-300 rounded-lg p-2"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <label className="block w-[35%] text-black font-bold">
                                        Media Type
                                    </label>
                                    <textarea
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddMediaComponent;
