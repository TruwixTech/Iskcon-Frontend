import React, { useState } from "react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

function CreateEvents() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
    });

    const [images, setImages] = useState([null]); // Array to hold image files
    const [previews, setPreviews] = useState([""]); // Array to hold image previews

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
                    newPreviews[index] = reader.result; // Update preview at the index
                    return newPreviews;
                });
            };
            reader.readAsDataURL(file);

            setImages((prev) => {
                const newImages = [...prev];
                newImages[index] = file; // Update image at the index
                return newImages;
            });
        }
    };

    // Add more image upload fields
    const addImageField = () => {
        setPreviews((prev) => [...prev, ""]); // Add an empty preview slot
        setImages((prev) => [...prev, null]); // Add an empty file slot
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, description, location, startDate, endDate } = formData;
        if (!title || !description || !location || !startDate || !endDate || !images[0]) {
            alert("Please fill all fields and upload at least one image!");
            return;
        }

        const formPayload = new FormData();
        formPayload.append("title", title);
        formPayload.append("description", description);
        formPayload.append("location", location);
        formPayload.append("startDate", startDate);
        formPayload.append("endDate", endDate);
        
        images.forEach((image, index) => {
            if (image) {
                formPayload.append(`image`, image); // Append each image
            }
        });

        try {
            
            const response = await axios.post(`${backend}/admin/event/create`, formPayload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Event submitted successfully!");
            // Reset form state after successful submission
            setPreviews([""]);
            setImages([null]);
            setFormData({
                title: "",
                description: "",
                location: "",
                startDate: "",
                endDate: "",
            });
        } catch (error) {
            console.error("Error submitting event:", error);
            alert("Failed to submit the event. Please try again.");
        }
    };

    return (
        <div className="w-full h-auto flex flex-col pt-20 md:pt-24">
            <h1 className="w-full h-auto text-center font-dmSans text-3xl font-semibold md:text-4xl xl:text-5xl">
                Create <span className="text-[#d9b34b]">Events</span>
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
                    {/* Event Title */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            Event Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter Event Title"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Event Description */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            Event Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter Event Description"
                            rows="6"
                            className="w-full p-3 border resize-none border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Event Location */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            Event Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Enter Event Location"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Event Start Date */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            Start Date
                        </label>
                        <input
                            type="datetime-local"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Event End Date */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            End Date
                        </label>
                        <input
                            type="datetime-local"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-lg mt-4"
                >
                    Submit Event
                </button>
            </form>
        </div>
    );
}

export default CreateEvents;
