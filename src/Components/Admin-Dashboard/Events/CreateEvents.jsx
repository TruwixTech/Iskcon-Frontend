import React, { useState } from "react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

function CreateEvents() {
    const [formData, setFormData] = useState({
        eventTitle: "",
        eventContent: "",
    });

    // Initialize with one image slot
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

        const { eventTitle, eventContent } = formData;
        if (!eventTitle || !eventContent || !images[0]) {
            alert("Please fill all fields and upload at least one image!");
            return;
        }

        const formPayload = new FormData();
        formPayload.append("eventTitle", eventTitle);
        formPayload.append("eventContent", eventContent);

        images.forEach((image, index) => {
            if (image) {
                formPayload.append(`image${index}`, image); // Append each image
            }
        });

        try {
            const response = await axios.post(`${backend}/api/v1/admin/create-event`, formPayload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Event submitted successfully!");
            setPreviews([""]);
            setImages([null]);
            setFormData({
                eventTitle: "",
                eventContent: "",
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
                    {/* Events Title */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            Events Title
                        </label>
                        <input
                            type="text"
                            name="eventTitle"
                            value={formData.eventTitle}
                            onChange={handleInputChange}
                            placeholder="Enter Event title"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Events Content */}
                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            Events Content
                        </label>
                        <textarea
                            name="eventContent"
                            value={formData.eventContent}
                            onChange={handleInputChange}
                            placeholder="Enter Event content"
                            rows="6"
                            className="w-full p-3 border resize-none border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
